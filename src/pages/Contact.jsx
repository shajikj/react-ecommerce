import "./Contact.css";

function Contact() {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We would love to hear from you</p>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          {/* Contact Information */}
          <div className="contact-info">
            <h2>Get In Touch</h2>

            <p>
              Have a question about our products? Feel free to contact us. We
              are always happy to help.
            </p>

            <div className="contact-item">
              <h3>
                <i class="bi bi-geo-alt"> Address</i>
              </h3>
              <p>123 Main Street, Siliguri, West Bengal, India</p>
            </div>

            <div className="contact-item">
              <h3>
                <i class="bi bi-telephone"> Call</i>
              </h3>
              <p>+91 98765 43210</p>
            </div>

            <div className="contact-item">
              <h3>
                <i class="bi bi-envelope"></i> Email
              </h3>
              <p>info@example.com</p>
            </div>

            <div className="contact-item">
              <h3>
                <i class="bi bi-calendar"></i> Business Hours
              </h3>
              <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h2>Send Us A Message</h2>

            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter your name" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="6"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
