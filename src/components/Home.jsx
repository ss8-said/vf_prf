import React from "react";
import "./Home.css"; // Assuming your CSS is in a separate file

const Home = () => {
  return (
    <section id="home" className="home">
      <div className="home-info">
        <h1>Said Meziani</h1>
        <p>
          Je conçois et développe des chatbots intelligents <br />
          en utilisant le traitement du langage naturel (NLP) et l'intelligence artificielle.
        </p>
        <div className="btn-sci">
          <a href="/images/CV_2025-02-01_Said_Meziani.pdf" className="btn">Download CV</a>
          <div className="sci">
            <a href="https://github.com/ss8-said"><i className="bx bxl-github"></i></a>
            <a href="https://www.linkedin.com/in/said-meziani-8282a6bb/"><i className="bx bxl-linkedin-square"></i></a>
          </div>
        </div>
      </div>
      <div className="home-img">
        <div className="img-card">
          <div className="img-content">
            <img src="/images/img_pf.png" alt="Profile" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;