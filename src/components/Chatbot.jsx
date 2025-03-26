import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Bonjour ! Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatbotRef = useRef(null);

  // Toggle visibility when clicking the button/icon
  const toggleChatbot = () => {
    setVisible((prev) => !prev);
  };

  // Hide when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the chatbot AND not on the button
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target) &&
        !event.target.closest(".chatbot-icon") // Exclude clicks on the button
      ) {
        setVisible(false); // Hide the chatbot
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération de la réponse du bot");
      }

      const data = await response.json();
      const botResponse = { sender: "bot", text: data.response };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Une erreur est survenue. Veuillez réessayer." },
      ]);
    } finally {
      setIsLoading(false);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <button className="chatbot-icon" onClick={toggleChatbot}>
        <img className="pic" src="/images/oipp.jpg" alt="Chatbot Icon" />
      </button>

      <div className={`chatbot ${visible ? "show" : "hide"}`} ref={chatbotRef}>
        <header>
          <h2>Said's Bot</h2>
        </header>
        <ul className="conversation">
          {messages.map((msg, index) => (
            <li key={index} className={`chat ${msg.sender}`}>
              <p>{msg.text}</p>
            </li>
          ))}
          {isLoading && (
            <li className="chat bot">
              <p>⏳ Le bot réfléchit...</p>
            </li>
          )}
        </ul>
        <div className="chat-input">
          <textarea
            placeholder="Entrez un message..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          ></textarea>
          <span className="material-symbols-outlined" onClick={handleSendMessage}>
            send
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;