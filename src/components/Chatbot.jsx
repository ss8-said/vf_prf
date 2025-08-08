import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

// Change cette URL ici selon ton déploiement
const API_URL = "https://mon-assistant-minirag.onrender.com";

const Chatbot = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Bonjour ! Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatbotRef = useRef(null);
  const conversationRef = useRef(null);

  const toggleChatbot = () => {
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target) &&
        !event.target.closest(".chatbot-icon")
      ) {
        setVisible(false);
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "" || isLoading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération de la réponse du bot");
      }

      const data = await response.json();
      const botResponse = { sender: "bot", text: data.response };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Une erreur est survenue. Veuillez réessayer." },
      ]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
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
          <button onClick={() => setVisible(false)}>✖️</button>
        </header>
        <ul className="conversation" ref={conversationRef}>
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
            disabled={isLoading}
          ></textarea>
          <span
            className="material-symbols-outlined"
            onClick={handleSendMessage}
            style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
          >
            send
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
