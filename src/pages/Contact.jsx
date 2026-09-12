import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">

      {/* ================================
          HERO
      ================================ */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <p className="contact-hero-label">GET IN TOUCH</p>
          <h1>Contact Us</h1>
          <p className="contact-hero-sub">
            Have a question, feedback, or need help finding the right gear?
            <br />
            We&rsquo;re here to help.
          </p>
        </div>
      </section>

      {/* ================================
          INFO CARDS ROW
      ================================ */}
      <section className="contact-cards-section">
        <div className="contact-cards-container">

          <div className="contact-info-card">
            <div className="contact-card-icon">
              <i className="bi bi-geo-alt-fill"></i>
            </div>
            <h3>Visit Us</h3>
            <p>123 Main Street</p>
            <p>Siliguri, West Bengal 734001</p>
            <p>India</p>
          </div>

          <div className="contact-info-card">
            <div className="contact-card-icon">
              <i className="bi bi-telephone-fill"></i>
            </div>
            <h3>Call Us</h3>
            <p>+91 98765 43210</p>
            <p>+91 91234 56789</p>
            <p className="contact-card-note">Mon – Sat, 9 AM – 6 PM IST</p>
          </div>

          <div className="contact-info-card">
            <div className="contact-card-icon">
              <i className="bi bi-envelope-fill"></i>
            </div>
            <h3>Email Us</h3>
            <p>support@example.com</p>
            <p>sales@example.com</p>
            <p className="contact-card-note">Reply within 24 hours</p>
          </div>

          <div className="contact-info-card">
            <div className="contact-card-icon">
              <i className="bi bi-clock-fill"></i>
            </div>
            <h3>Business Hours</h3>
            <p>Monday – Friday: 9 AM – 6 PM</p>
            <p>Saturday: 10 AM – 4 PM</p>
            <p className="contact-card-note">Sunday: Closed</p>
          </div>

        </div>
      </section>

      {/* ================================
          MAIN SECTION: FORM + MAP
      ================================ */}
      <section className="contact-main-section">
        <div className="contact-main-container">

          {/* LEFT: Contact Form */}
          <div className="contact-form-wrap">
            <div className="contact-form-header">
              <h2>Send Us a Message</h2>
              <p>
                Fill out the form below and our team will get back to you as
                soon as possible.
              </p>
            </div>

            {submitted ? (
              <div className="contact-success">
                <div className="contact-success-icon">
                  <i className="bi bi-check-circle-fill"></i>
                </div>
                <h3>Message Sent!</h3>
                <p>
                  Thank you for reaching out. We&rsquo;ll get back to you
                  within 24 hours.
                </p>
                <button
                  type="button"
                  className="contact-success-btn"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {/* Row: Name + Email */}
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Row: Phone + Subject */}
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="contact-subject">Subject *</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="return">Returns &amp; Exchanges</option>
                      <option value="product">Product Question</option>
                      <option value="shipping">Shipping Information</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="contact-form-group contact-form-group--full">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="contact-submit-btn">
                  <span>Send Message</span>
                  <i className="bi bi-send"></i>
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Additional Info */}
          <div className="contact-aside">

            <div className="contact-aside-card">
              <h3>Why Contact Us?</h3>
              <ul className="contact-aside-list">
                <li>
                  <i className="bi bi-check2-circle"></i>
                  Order tracking &amp; status updates
                </li>
                <li>
                  <i className="bi bi-check2-circle"></i>
                  Returns, refunds &amp; exchanges
                </li>
                <li>
                  <i className="bi bi-check2-circle"></i>
                  Size &amp; fit guidance
                </li>
                <li>
                  <i className="bi bi-check2-circle"></i>
                  Bulk &amp; wholesale enquiries
                </li>
                <li>
                  <i className="bi bi-check2-circle"></i>
                  Product availability queries
                </li>
                <li>
                  <i className="bi bi-check2-circle"></i>
                  Feedback &amp; suggestions
                </li>
              </ul>
            </div>

            <div className="contact-aside-card contact-aside-social">
              <h3>Follow Us</h3>
              <p>Stay connected for the latest drops and offers.</p>
              <div className="contact-social-links">
                <a href="#" aria-label="Instagram" className="contact-social-link">
                  <i className="bi bi-instagram"></i>
                  <span>Instagram</span>
                </a>
                <a href="#" aria-label="Facebook" className="contact-social-link">
                  <i className="bi bi-facebook"></i>
                  <span>Facebook</span>
                </a>
                <a href="#" aria-label="Twitter/X" className="contact-social-link">
                  <i className="bi bi-twitter-x"></i>
                  <span>Twitter / X</span>
                </a>
                <a href="#" aria-label="YouTube" className="contact-social-link">
                  <i className="bi bi-youtube"></i>
                  <span>YouTube</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Contact;
