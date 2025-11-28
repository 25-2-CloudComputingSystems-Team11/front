import React, { useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import NewsSection from './components/NewsSection';
import ChatWindow from './components/ChatWindow';
import ButtonArea from './components/ButtonArea';

function App() {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState('basic');
  const [chatLog, setChatLog] = useState([
    {
      text: '🤖 AI 멘토: 안녕하세요! 궁금한 점을 물어보거나, 아래 버튼을 눌러 기능을 선택해주세요.',
      sender: 'bot'
    }
  ]);

  const modeMessages = {
    basic: '🤖 AI 멘토: [기본 모드] 무엇이든 물어보세요.',
    readme: '📄 README 봇: 프로젝트 개요를 알려주세요.',
    resume: '📝 이력서 봇: 경력 사항을 입력해주세요.',
    translate: '🔤 번역 봇: 번역할 내용을 입력해주세요.'
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setChatLog([{ text: modeMessages[newMode] || '', sender: 'bot' }]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newLog = [...chatLog, { text: `나: ${inputText}`, sender: 'user' }];
    setChatLog(newLog);
    setInputText('');

    // TODO: [API] 실제 백엔드 연결 예정
    setTimeout(() => {
      const botResponses = {
        basic: `🤖 [기본 챗봇] "${inputText}"에 대해 답변해 드릴게요. (API 연결 대기 중)`,
        readme: `📄 [README 생성 완료]\n\n# 프로젝트: ${inputText}\n\n## 1. 개요\n생성된 내용입니다.\n\n## 2. 사용법\n문서를 참고하세요.`,
        resume: `📝 [이력서 다듬기]\n\n"${inputText}" 내용을 더 전문적인 문장으로 수정했습니다.`,
        translate: `🔤 [번역 결과]\n\n"${inputText}"\n\n➔ Translated text will appear here.`
      };

      const botResponse = botResponses[mode];

      setChatLog((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="App">
      <Navbar />

      <div className="main-layout">
        <Sidebar />

        <div className="content-area">
          <div className="container">

            {/* TODO: [API] 뉴스 데이터 연동 후 NewsSection에 props 전달 */}
            <NewsSection />

            <ChatWindow chatLog={chatLog} />

            <div className="input-area">
              <input
                type="text"
                placeholder="내용을 입력하세요..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>전송</button>
            </div>

            <ButtonArea changeMode={changeMode} mode={mode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
