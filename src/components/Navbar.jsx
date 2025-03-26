import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to detect active section
  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    let currentSection = "home";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSection = section.id;
      }
    });

    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="nav-bar">
      <a href="#home" className="logo">Portfolio.</a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <ul className={menuOpen ? "show" : ""}>
        <li><a href="#home" className={activeSection === "home" ? "active" : ""}>Home</a></li>
        <li><a href="#about" className={activeSection === "about" ? "active" : ""}>About</a></li>
        <li><a href="#portfolio" className={activeSection === "portfolio" ? "active" : ""}>Portfolio</a></li>
        <li><a href="#contact" className={activeSection === "contact" ? "active" : ""}>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
