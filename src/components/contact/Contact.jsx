import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert("✅ Your message sent successfully. Our team will reach out to you!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
      navigate("/");
    }, 1000);
  };

  return (
    <section className="contacts padding" aria-label="Contact section">
      <div className="container shadow flexSB">
        <div className="left row">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d904726.6131739549!2d85.24565535!3d27.65273865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1652535615693!5m2!1sen!2snp"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Company Location on Map"
          ></iframe>
        </div>

        <div className="right row">
          <h1>Contact us</h1>
          <p>We're open for any suggestion or just to have a chat</p>

          <div
            className="items grid2"
            role="contentinfo"
            aria-label="Contact information"
          >
            <div className="box">
              <h4>ADDRESS:</h4>
              <p>Street 31, Hsr Layout, Bangalore, Karnataka, India</p>
            </div>
            <div className="box">
              <h4>EMAIL:</h4>
              <p>akashk1712@gmail.com</p>
            </div>
            <div className="box">
              <h4>PHONE:</h4>
              <p>+91 9651 9060 55</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} aria-label="Contact form">
            <div className="flexSB">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
                aria-label="Name"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                aria-label="Email"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              aria-required="true"
              aria-label="Subject"
            />
            <textarea
              rows="10"
              name="message"
              placeholder="Create a message here..."
              value={formData.message}
              onChange={handleChange}
              required
              aria-required="true"
              aria-label="Message"
            ></textarea>
            <button
              type="submit"
              className="primary-btn"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
