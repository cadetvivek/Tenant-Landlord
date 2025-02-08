import React, { useState, useEffect, useRef } from "react";
import './Gemini.css';

const Gemini = () => {
  // State management
  const [theme, setTheme] = useState(localStorage.getItem("themeColor") || "dark_mode");
  const [chats, setChats] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isResponseGenerating, setIsResponseGenerating] = useState(false);
  const chatContainerRef = useRef(null);

  // API configuration
  const API_KEY = "AIzaSyAXXYMQpQCcpOJAbKgJQX1ArhXTk6rISRk";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  // Avatar URLs
  const AVATARS = {
    user: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png",
    bot: "https://ainav.webx32.com/wp-content/themes/nav/screenshot.jpg?v=1"
  };

  // Effects
  useEffect(() => {
    const savedChats = localStorage.getItem("saved-chats");
    if (savedChats) setChats(JSON.parse(savedChats));
  }, []);

  useEffect(() => {
    localStorage.setItem("saved-chats", JSON.stringify(chats));
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [chats]);

  // Theme handling
  const toggleTheme = () => {
    const newTheme = theme === "dark_mode" ? "light_mode" : "dark_mode";
    setTheme(newTheme);
    localStorage.setItem("themeColor", newTheme);
  };

  // Chat operations
  const handleDeleteChats = () => {
    if (window.confirm("Are you sure you want to delete all chats?")) {
      setChats([]);
      localStorage.removeItem("saved-chats");
    }
  };

  // API communication
  const generateResponse = async (message) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: message }] }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "API request failed");
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1");
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  };

  // Message handling
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userMessage.trim() || isResponseGenerating) return;

    setIsResponseGenerating(true);
    const messageContent = userMessage.trim();
    
    // Add user message
    setChats(prev => [...prev, { text: messageContent, sender: "user" }]);
    setUserMessage("");

    try {
      const apiResponse = await generateResponse(messageContent);
      setChats(prev => [...prev, { text: apiResponse, sender: "bot" }]);
    } catch (error) {
      setChats(prev => [...prev, { text: error.message, sender: "error" }]);
    } finally {
      setIsResponseGenerating(false);
    }
  };

  return (
    <div className="gemini-container">
      <div className={`app-container ${theme}`}>
        <header className="header">
          <h1 className="title">Hey let't Chat</h1>
          <div className="controls">
            <button 
              className="control-btn theme-toggle" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark_mode" ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button 
              className="control-btn delete-chats" 
              onClick={handleDeleteChats}
              aria-label="Delete all chats"
            >
              🗑️ Delete
            </button>
          </div>
        </header>

        <div className="chat-list" ref={chatContainerRef}>
          {chats.map((chat, index) => (
            <div key={index} className={`message ${chat.sender}`}>
              <div className="message-content">
                <img 
                  className="avatar" 
                  src={AVATARS[chat.sender]} 
                  alt={`${chat.sender} avatar`} 
                />
                <div className="text-bubble">
                  <p className="text">{chat.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form className="typing-form" onSubmit={handleSendMessage}>
          <div className="input-wrapper">
            <input
              type="text"
              className="typing-input"
              placeholder="Type a message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              aria-label="Type your message"
              disabled={isResponseGenerating}
            />
            <button 
              type="submit" 
              className={`send-btn ${isResponseGenerating ? "is-generating" : ""}`}
              disabled={isResponseGenerating}
              aria-label="Send message"
            >
              {isResponseGenerating ? "🌀" : "GO📜"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Gemini;