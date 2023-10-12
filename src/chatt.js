import React, { useState } from "react";
import './chatt.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([
    {
      sender: "AI Chatbot",
      message: "안녕하세요 AI챗봇입니다.",
    },
    {
      sender: "User",
      message: "안녕",
    },
  ]);
  const [input, setInput] = useState("");

  const apiKey = "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";

  const sendMessage = () => {
    // 사용자 입력 가져오기
    const userInput = input;

    // 사용자 입력을 대화창에 추가
    const userTemplate = `
        <div class="line">
          <span class="chat-box mine">${userInput}</span>
        </div>
      `;
    setMessages([...messages, { sender: "User", message: userInput }]);

    // OpenAI API 호출
    fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: userInput,
        max_tokens: 500,
        temperature: 1,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // 챗봇 응답을 대화창에 추가
        const botResponse = data.choices[0].text;
        const botTemplate = `
            <div class="line">
              <span class="chat-box">${botResponse}</span>
            </div>
          `;
        setMessages([...messages, { sender: "AI Chatbot", message: botResponse }]);
      })
      .catch(error => console.error(error));

    // 입력 필드 초기화
    setInput("");
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <div className="chat-content">
        {messages.map((message) => (
          <div className="line" key={message.sender}>
            <span className={"chat-box " + (message.sender === "User" ? "mine" : "")}>
              {message.message}
            </span>
          </div>
        ))}
      </div>
      <input className="chat-box" id="input" value={input} onChange={handleInputChange} />
      <button id="send" onClick={sendMessage}>
        전송
      </button>
    </div>
  );
};


export default ChatApp;
