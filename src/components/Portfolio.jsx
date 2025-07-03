import React, { useEffect } from "react";
import "./Portfolio.css";

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "Personal React Dashboard",
      description: "A responsive React dashboard with real-time data visualization",
      image: "images/Screenshot 2025-03-21 213339.jpg",
      link: "https://my-skills-dashboard.vercel.app/",
    },
    {
      id: 2,
      title: "Project Two",
      description: "E-commerce platform",
      image: "path/to/project2.jpg",
      link: "https://project2.com",
    },
    {
      id: 3,
      title: "Project Three",
      description: "Portfolio showcase",
      image: "path/to/project3.jpg",
      link: "https://project3.com",
    },
  ];

  useEffect(() => {
    const circle = document.getElementById("portfolio-circle");
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    const handleScroll = () => {
      let scrollPercentage = window.scrollY / maxScroll;
      let rotation = scrollPercentage * 360 - 20;
      circle.style.transform = `rotate(${rotation}deg)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="portfolio" className="portfolio">
      <div className="circle-container">
        <div className="circle" id="portfolio-circle">
          {projects.map((_, index) => (
            <div key={index} className="segment"></div>
          ))}
        </div>
      </div>
      <div className="portfolio-content">
        <h1>Portfolio</h1>
        <div className="portfolio-grid">
          {projects.map((project) => (
            <div key={project.id} className="portfolio-card">
              <img
                src={project.image}
                alt={project.title}
                className="portfolio-image"
              />
              <div className="card-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-link"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
