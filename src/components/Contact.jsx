import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <h1 >Contact Me</h1>
      <p>Feel free to reach out via email or social media.</p>

      {/* Contact Form */}
      <form className="contact-form" action="https://formspree.io/f/xpwqrnrz" method="POST">
        <label>Name</label>
        <input type="text" name="name" placeholder="Your Name" required />

        <label>Email</label>
        <input type="email" name="email" placeholder="Your Email" required />

        <label>Message</label>
        <textarea name="message" placeholder="Your Message" required></textarea>

        <button type="submit">Send Message</button>
      </form>

      {/* Social Media Links */}
      <div className="social-links">
      <a href="https://github.com/ss8-said"><i className="bx bxl-github"></i></a> <br />
      <a href="https://www.linkedin.com/in/said-meziani-8282a6bb/"><i className="bx bxl-linkedin-square"></i></a><br />
      <a href="meziani12345@gmail.com">Email</a>
      </div>
    </section>
  );
};

export default Contact;
