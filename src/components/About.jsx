import React from "react";


const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <p>
          Passionné par les technologies modernes, je suis spécialisé dans le développement de solutions conversationnelles et d'applications web.
        </p>
        <div className="skills">
          <h3>My Skills</h3>
          <ul>
            <li><strong>Chatbot</strong> Development</li>
            <li>Natural Language Processing <strong>(NLP)</strong></li>
            <li><strong>Front-End</strong> Development</li>
            <li><strong>Back-End</strong> Development</li>
            <li><strong>API</strong> Integration</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
