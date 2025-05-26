// src/pages/About.jsx
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About EduTest</h1>

        <p className="text-lg text-gray-700 mb-8">
          EduTest is a modern online examination platform built to make test-taking smarter,
          faster, and more accessible. Whether you're a student, teacher, or institution, our
          platform delivers seamless, secure, and scalable solutions for conducting online exams.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">🎯 Our Mission</h2>
            <p className="text-gray-700">
              We aim to redefine how assessments are conducted by offering a fast, user-friendly,
              and secure testing experience. Our goal is to empower learners and educators alike
              through technology.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">💡 Key Features</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Clean and responsive UI with React.js</li>
              <li>Secure authentication and anti-cheat features</li>
              <li>Real-time exam timing and auto submission</li>
              <li>Instant results and performance analytics</li>
              <li>Admin panel for exam and user management</li>
              <li>Mobile-friendly experience</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🛠 Tech Stack</h2>
          <p className="text-gray-700">
            <strong>Frontend:</strong> React.js, Tailwind CSS<br />
            <strong>Backend:</strong> Node.js / Firebase / Django (as per configuration)<br />
            <strong>Database:</strong> MongoDB / Firestore / MySQL<br />
            <strong>Hosting:</strong> Vercel, Netlify, or AWS
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">📬 Contact Us</h2>
          <p className="text-gray-700">
            Need help or have a question? Reach out to our team:
          </p>
          <p className="mt-2 text-blue-600 font-medium">support@edutest.com</p>
        </div>
      </div>
    </div>
  );
};

export default About;
