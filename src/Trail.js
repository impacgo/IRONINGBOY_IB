// Trail.js
import React, { useState, useEffect, useRef } from "react";
import "./Trail.css";
import img1 from "../src/images/Bg1.jpg";
import img2 from "../src/images/img2.jpg";
import Logo from "../src/images/logo1.svg";
import img3 from "../src/images/img3.jpg";

const Trail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const featuresRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const subtitles = [
    "Fresh Clothes. Fresh Start.",
    "Hassle-Free Laundry.",
    "We Care for Every Fabric.",
  ];

  const faqs = [
    { question: "How do I schedule a laundry pickup?", answer: "You can schedule a pickup via our website or mobile app by selecting a convenient time slot." },
    { question: "What types of fabrics do you handle?", answer: "We care for all kinds of fabrics including delicate silks, cotton, wool, and synthetic blends." },
    { question: "How long does laundry service take?", answer: "Typically, laundry is processed and delivered within 24-48 hours after pickup." },
    { question: "What if I have special care instructions?", answer: "You can add special instructions during booking and our team will handle your fabrics with caution." },
    { question: "Do you use eco-friendly products?", answer: "Yes! We use eco-friendly, non-toxic detergents that are safe for you, your clothes, and the environment." },
    { question: "Can you handle delicate or specialty fabrics?", answer: "Yes! Our team is trained to handle delicate items like silk, wool, and lace, using fabric-safe processes." },
    { question: "Is my data and order information secure?", answer: "Yes. We use industry-standard encryption to keep your personal and payment information safe." },
  ];

  const toggleFAQ = (index) => setActiveIndex(prev => (prev === index ? null : index));
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setFeaturesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (featuresRef.current) observer.observe(featuresRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [subtitles.length]);

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="laundry-website" style={{overflow:"hidden"}}>
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="nav-container">
          <div className="logo-container">
            <div className="logo"><img src={Logo} alt="logo" /></div>
          </div>
          <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
            <a href="#home" className="nav-link">Home</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#whyus" className="nav-link">Why Us</a>
            <a href="#faqs" className="nav-link">FAQ's</a>
            <a href="#login" className="nav-link">Login</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <div className="menu-toggle" onClick={toggleMenu}>
            <span className="bar"></span><span className="bar"></span><span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          backgroundImage: `url(${img1})`, backgroundPosition: "center", backgroundSize: "cover",
          filter: "blur(6px)", transform: "scale(1.05)", zIndex: 0
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1
        }} />
        <div className="hero-content" style={{ position: "relative", zIndex: 2 }}>
          <h1 className="hero-title">We Wash. We Iron. We Care.</h1>
          <h2 key={subtitleIndex} className="hero-subtitle animate-subtitle">{subtitles[subtitleIndex]}</h2>
          <p className="hero-description">From your daily wear to your finest fabrics, we combine modern technology with expert care—delivering laundry that feels brand new.</p>
          <button className="cta-button">Schedule a Pickup</button>
          <div className="marqcon">
            <marquee>
              <span id="spn">☑️ Free Pickup & Delivery</span>
              <span id="spn">☑️ Easy Online Booking</span>
              <span id="spn">☑️ Real-Time Order Tracking</span>
              <span id="spn">☑️ Stain Removal Specialists</span>
              <span id="spn">☑️ Clothes Packed with Care</span>
            </marquee>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="features" id="services" ref={featuresRef}>
        <h2 className="section-title">Our Services</h2>
        <div className="feature-container">
          <div className={`feature ${featuresVisible ? "visible" : ""}`}>
            <div className="feature-icon">🚚</div>
            <h3 className="feature-title">Pickup & Delivery</h3>
            <p className="feature-description">We collect and deliver your laundry—completely hassle-free.</p>
          </div>
          <div className={`feature ${featuresVisible ? "visible" : ""}`}>
            <div className="feature-icon">📅</div>
            <h3 className="feature-title">Easy Online Booking</h3>
            <p className="feature-description">Schedule pickups in just a few clicks from any device.</p>
          </div>
          <div className={`feature ${featuresVisible ? "visible" : ""}`}>
            <div className="feature-icon">📍</div>
            <h3 className="feature-title">Live Order Tracking</h3>
            <p className="feature-description">Stay updated in real-time from pickup to doorstep delivery.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faqs" style={{
        backgroundImage: `url(${img2})`, backgroundSize: "cover", backgroundPosition: "center",
        minHeight: "100vh", padding: "4rem 1.5rem", color: "#fff", position: "relative"
      }}>
        <div className="faq-overlay" />
        <div className="faq-content" style={{ position: "relative", zIndex: 2, maxWidth: "800px", margin: "auto" }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "2rem", color: "#FFA726" }}>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button className={`faq-question ${activeIndex === index ? "active" : ""}`} onClick={() => toggleFAQ(index)}>
                  {faq.question}
                  <span className="faq-icon">{activeIndex === index ? "−" : "+"}</span>
                </button>
                <div className={`faq-answer ${activeIndex === index ? "show" : ""}`}>{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      {/* Why Choose Us Section */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Blurred background image */}
        <div
          style={{
            backgroundImage: `url(${img2})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            filter: "blur(6px)",
            transform: "scale(1.05)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        />
        {/* Foreground content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <section className="why-us" id="whyus">
            <h2 className="section-title">Why Choose Us?</h2>
            <div className="why-horizontal">
              <div className="why-item">🌿 Eco-Friendly Cleaning</div>
              <div className="why-item">⚡ Fast Turnaround</div>
              <div className="why-item">💎 Fabric-Safe Process</div>
              <div className="why-item">📞 24/7 Customer Support</div>
            </div>
          </section>
        </div>
      </div>

      
{/* Contact Section */}
<section className="contact-section" id="contact" style={{
        backgroundImage: `url(${img3})`, backgroundSize: "cover", backgroundPosition: "center",
        minHeight: "100vh", padding: "4rem 1.5rem", color: "#fff", position: "relative",width:"100%"
      }}>
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
    {submitted && (
      <p className="success-message">
        Thank you! Your message has been sent.
      </p>
    )}
  </form>
</section>
<footer className="site-footer">
  <div className="footer-container">
    <div className="footer-brand">
      <span className="footer-logo">Ironing Boy</span>
      <span>We Wash. We Iron. We Care.</span>
    </div>

    <div className="footer-social">
      <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>

    <div className="footer-payments">
      <span>We Accept:</span>
      <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" />
    </div>
  </div>

  <div className="footer-bottom">
    <span>© {new Date().getFullYear()} Ironing Boy. All rights reserved.</span>
  </div>
</footer>



    </div>
  );
};

export default Trail;
