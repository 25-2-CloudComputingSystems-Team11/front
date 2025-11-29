import React, { useEffect, useRef } from "react";

const ChatWindow = ({ chatLog }) => {
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  const getWrapperStyle = (sender) => ({
    alignSelf: sender === "user" ? "flex-end" : "flex-start",
    maxWidth: "70%",
    marginBottom: "10px",
  });

  const getBubbleStyle = (sender) => ({
    backgroundColor: sender === "user" ? "#3498db" : "#f1f0f0",
    color: sender === "user" ? "white" : "#333",
    padding: "12px 18px",
    borderRadius: "18px",
    borderTopRightRadius: sender === "user" ? "4px" : "18px",
    borderTopLeftRadius: sender === "bot" ? "4px" : "18px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    lineHeight: "1.5",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
  });

  return (
    <main className="chat-window">
      <div className="chat-log">
        {chatLog.map((msg, index) => (
          <div key={index} style={getWrapperStyle(msg.sender)}>
            <div style={getBubbleStyle(msg.sender)}>{msg.text}</div>
          </div>
        ))}

        {/* 스크롤 기준점 */}
        <div ref={messageEndRef} />
      </div>
    </main>
  );
};

export default ChatWindow;
