import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styling/chat.css";
import Window from "../Window.js";

const ChatBody = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(0);

  const people = [
    { index: 0, name: "Olivia Wilson", adress: "/olivia", available: true },
    { index: 1, name: "Max Brown", adress: "/max", available: true },
    { index: 2, name: "Tina Rodiones", adress: "/tina", available: false },
  ];

  const sendMessageToOpenAI = async (message) => {
    setIsThinking(true);
    try {
      const currentPersonEndpoint = people[currentPerson].adress;
      const response = await axios.post(
        `http://localhost:3001/api${currentPersonEndpoint}`,
        {
          prompt: message,
        }
      );

      if (response.data && response.data.length > 0) {
        setIsThinking(false);
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
    setMessages([...messages, { content: userMessage, role: "user" }]);
    const botResponse = await sendMessageToOpenAI(userMessage);
    setMessages((messages) => [
      ...messages,
      { content: botResponse, role: "assistant" },
    ]);
  };

  useEffect(() => {
    fetchMessagesForChat(people[0].index); // Assuming the first person is selected initially
  }, []);

  const fetchMessagesForChat = async (personIndex) => {
    setIsThinking(true);
    setMessages([]); // Clear existing messages before fetching new ones
    try {
      const personEndpoint = people[personIndex].adress;
      const response = await axios.get(
        `http://localhost:3001/api${personEndpoint}/messages`
      );
      console.log(response);
      setIsThinking(false);
      if (response.data && response.data.messages) {
        setMessages(response.data.messages);
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setIsThinking(false);
    }
  };

  const handleChatSwitch = async (index) => {
    setCurrentPerson(index);
    await fetchMessagesForChat(index);
  };
  return (
    <div className="chatBody">
      <div className="selectionContainer">
        {people.map((person, index) => (
          <div
            key={index}
            className={`chatSelection ${
              currentPerson === person.index ? "current" : "not"
            } ${person.available ? "" : "unavailable"}`}
            onClick={() => person.available && handleChatSwitch(index)}
          >
            {person.name}
          </div>
        ))}
      </div>
      <div className="messages">
        {messages
          .filter((message) => message.role !== "system") // Exclude system messages
          .map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.content}
            </div>
          ))}
        {isThinking && (
          <div className="message assistant">
            {" "}
            <div className="thinking-animation"></div>{" "}
          </div>
        )}
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
  );
};

const Chat = ({ isMinimized, onMinimize }) => {
  return (
    <Window
      isMinimized={isMinimized}
      initialSize={{
        width: 800,
        height: 500,
      }}
      initialPosition={{ x: 200, y: 200 }}
      content={<ChatBody />}
      tag={"chat"}
      name={"Chat"}
      onMinimize={onMinimize}
    />
  );
};

export default Chat;
