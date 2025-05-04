import React, { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const generateCaption = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic!");
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: topic }]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/generate-caption", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      setMessages((prev) => [...prev, { role: "assistant", content: data.caption }]);
    } catch (error) {
      console.error("Error generating caption:", error);
      alert("Failed to generate caption. Try again.");
    } finally {
      setLoading(false);
      setTopic("");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "15px 30px",
          borderBottom: darkMode ? "1px solid #333" : "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        }}
      >
        <h2 style={{ margin: 0 }}>AI Caption Chat</h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "5px 10px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            backgroundColor: darkMode ? "#fff" : "#333",
            color: darkMode ? "#000" : "#fff",
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Chat Box */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          border: darkMode ? "1px solid #333" : "1px solid #ccc",
          margin: "20px",
          borderRadius: "10px",
          backgroundColor: darkMode ? "#1e1e1e" : "#fff",
          boxShadow: darkMode
            ? "0 0 10px rgba(0,0,0,0.6)"
            : "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: msg.role === "user" ? "#0b93f6" : darkMode ? "#2e2e2e" : "#e5e5ea",
                color: msg.role === "user" ? "#fff" : darkMode ? "#fff" : "#000",
                padding: "10px 15px",
                borderRadius: "20px",
                maxWidth: "70%",
                textAlign: "left",
                lineHeight: "1.4",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "10px" }}>
            <div
              style={{
                backgroundColor: darkMode ? "#2e2e2e" : "#e5e5ea",
                color: darkMode ? "#fff" : "#000",
                padding: "10px 15px",
                borderRadius: "20px",
                maxWidth: "70%",
                textAlign: "left",
              }}
            >
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          padding: "10px 20px",
          borderTop: darkMode ? "1px solid #333" : "1px solid #ddd",
          backgroundColor: darkMode ? "#1e1e1e" : "#fff",
          display: "flex",
        }}
      >
        <input
          type="text"
          placeholder="Enter topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            marginRight: "10px",
            backgroundColor: darkMode ? "#2e2e2e" : "#fff",
            color: darkMode ? "#fff" : "#000",
          }}
          onKeyDown={(e) => e.key === "Enter" && generateCaption()}
          disabled={loading}
        />
        <button
          onClick={generateCaption}
          style={{
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            backgroundColor: "#0b93f6",
            color: "white",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;