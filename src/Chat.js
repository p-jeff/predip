import React, { useState } from "react";
import axios from "axios";
import "./chat.css";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

const Chat = ({onMinimize, isMinimized}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const sendMessageToOpenAI = async (message) => {
    setIsThinking(true);
    try {
      const response = await axios.post("http://localhost:3001/api/chat", {
        prompt: message,
      });
      setIsThinking(false);
      if (response.data && response.data.length > 0) {
        return response.data;
      } else {
        console.error("Unexpected response structure:", response);
        return "Error: Unexpected response structure from API.";
      }
    } catch (error) {
      console.error("Error sending message to OpenAI:", error);
      setIsThinking(false);
      return "Error: Unable to send message.";
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const userMessage = input;
    setInput("");
    setMessages([...messages, { text: userMessage, sender: "user" }]);
    const botResponse = await sendMessageToOpenAI(userMessage);
    setMessages((messages) => [
      ...messages,
      { text: botResponse, sender: "bot" },
    ]);
  };

  return (
    <Draggable handle="header">
      <div className="chat-container" style={{ display: isMinimized ? "none" : "block" }}>
        <header className="chatHead">
          Slick - work connected
          <button className="minimize" onClick={onMinimize}>
            &times;
          </button>
        </header>
        <Resizable
          defaultSize={{
            width: 750,
            height: 500,
          }}
        >
          <div className="chatBody">
            <div className="selectionContainer">
              <div className="chatSelection current">Olivia Wilson</div>
              <div className="chatSelection not">Max Brown</div>
              <div className="chatSelection not">Tina Rodiones</div>
            </div>
            <div className="messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.text}
                </div>
              ))}
              {isThinking && <div className="thinking-animation"></div>}
            </div>
            <form onSubmit={handleSendMessage} className="input-form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
};

export default Chat;
