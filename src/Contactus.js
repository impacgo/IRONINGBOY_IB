// ContactUs.js
import React, { useState } from "react";
import "./Trail.css"; // ✅ Only if needed, otherwise remove

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <section className="contact-section" id="contact">
      <h2 className="section-title">Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input 
          required 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Your Name"
        />

        <label htmlFor="email">Email</label>
        <input 
          required 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="Your Email"
        />

        <label htmlFor="message">Message</label>
        <textarea 
          required 
          id="message" 
          name="message" 
          rows="5"
          value={formData.message} 
          onChange={handleChange} 
          placeholder="Write your message here"
        />

        <button type="submit">Send Message</button>
        {submitted && <p className="success-message">Thank you! Your message has been sent.</p>}
      </form>
    </section>
  );
};

export default ContactUs;
