import React, { useState, useRef, useEffect } from "react";
import "./ChatBot.css";
import { RiRobot2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Form from "./form";

const ChatBot = ({ ageGroup, gender }) => {
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const bottomRef = useRef(null);

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const sendMessageToBot = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput.trim();
    const prompt = `User is a ${gender}, age group ${ageGroup}. Respond kindly to: ${userMessage}`;

    setChatMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setUserInput("");

    setChatMessages((prev) => [...prev, { sender: "bot", text: "Loading..." }]);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const result = await response.json();
      const botReply = result.choices?.[0]?.message?.content || "No response.";

      setChatMessages((prev) =>
        prev.filter((msg) => msg.text !== "Loading...").concat({ sender: "bot", text: botReply })
      );
    } catch (error) {
      setChatMessages((prev) =>
        prev.filter((msg) => msg.text !== "Loading...").concat({ sender: "bot", text: "Error: " + error.message })
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageToBot();
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const doctors = [
    { name: "Dr. James Miller", years: 10, img: "pic1.jpg" },
    { name: "Dr. Liam Brooks", years: 8, img: "pic2.jpg" },
    { name: "Dr. Sophia Brown", years: 12, img: "pic3.jpg" },
    { name: "Dr. Daniel Johnson", years: 7, img: "pic4.jpg" },
    { name: "Dr. Jack Morgan", years: 9, img: "pic5.jpg" },
    { name: "Dr. Emily Carter", years: 15, img: "pic6.jpg" },
    { name: "Dr. James Miller", years: 9, img: "pic7.jpg" },
    { name: "Dr. Hanna smith", years: 15, img: "pic8.jpg" },
  ];

  return (
    <>
      <header
        style={{
          marginBottom: "10px",
          marginTop: "-6vh",
          width: "100vw",
          backgroundColor: "#413c58",
          padding: "15px 30px",
          textAlign: "left",
          cursor: "none",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            marginLeft: "10px",
          cursor: "none",
          }}
        >
          Home
        </Link>
      </header>
      <div className="chatbot-container">
        <div className="chatbot-header">
          <RiRobot2Fill
            style={{
              fontSize: "30px",
              verticalAlign: "top",
              marginRight: "10px",
            }}
          />
          Mental Health ChatBot
        </div>

        <div className="chatbot-messages">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`chatbot-message ${msg.sender}`}>
              <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <textarea
          className="chatbot-textarea"
          rows={2}
          placeholder="Type your message and press Enter..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button className="chatbot-button" onClick={sendMessageToBot}>
          Send ↵
        </button>
      </div>
      <div className="pixelThoughts">
        <h2 className="pt-heading">One on one talk to our psychiatrists</h2>
        <div className="pt-profiles">
          {doctors.map((doc, i) => (
            <div
              className="pt-profile"
              key={i}
              onClick={() => setSelectedDoctor(doc)}
              style={{ cursor: "none" }}
            >
              <img src={`/HealthBoat/images/${doc.img}`} alt={doc.name} />
              <h4>{doc.name}</h4>
              <p>{doc.years}+ years experience</p>
            </div>
          ))}
        </div>
      </div>
      {selectedDoctor && (
        <Form doctor={selectedDoctor} onClose={() => setSelectedDoctor(null)} />
      )}
    </>
  );
};

export default ChatBot;
