import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import './AIAssistant.css';

function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://edutech-login-backend.onrender.com/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: newMessages,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error?.message || "Something went wrong!");
      }

      const data = await res.json();
      const reply = data.choices[0].message;
      setMessages([...newMessages, reply]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !loading) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="ai-assistant-container">
      <h2 className="ai-assistant-header">AI Assistant</h2>

      <div className="ai-assistant-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`ai-assistant-message ${msg.role === "user" ? "user" : "assistant"}`}
          >
            <div className="message-role">{msg.role === "user" ? "You" : "Assistant"}</div>
            <div className="message-content">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && <p className="ai-assistant-loading">Thinking...</p>}
        <div ref={messagesEndRef} />
      </div>

      {error && <p className="ai-assistant-error">{error}</p>}

      <textarea
        className="ai-assistant-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        rows={3}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />

      <button
        className="ai-assistant-button"
        onClick={sendMessage}
        disabled={loading || !input.trim()}
      >
        Send
      </button>
    </div>
  );
}

export default AIAssistant;
