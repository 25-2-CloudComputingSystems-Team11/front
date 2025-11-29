import React, { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import NewsSection from "./components/NewsSection";
import ChatWindow from "./components/ChatWindow";
import ButtonArea from "./components/ButtonArea";
import { getChatGptResponse } from "./api/chatApi";

function App() {
  const [inputText, setInputText] = useState("");
  const [mode, setMode] = useState("basic");
  const [chatLog, setChatLog] = useState([
    {
      text: "🤖 AI 멘토: 안녕하세요! 궁금한 점을 물어보거나, 아래 버튼을 눌러 기능을 선택해주세요.",
      sender: "bot",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const modeMessages = {
    basic: "🤖 AI 멘토: [기본 모드] 무엇이든 물어보세요.",
    readme:
      "📄 README 봇: 프로젝트 개요를 입력해주세요. README 작성을 도와드립니다.",
    resume:
      "📝 이력서 봇: 경력 사항을 자유롭게 입력해주세요. 이력서 형식으로 변경해드립니다.",
    translate: "🔤 번역 봇: 영문으로 번역할 내용을 입력해주세요.",
  };

  const changeMode = (newMode) => {
    setMode(newMode);
    setChatLog([{ text: modeMessages[newMode] || "", sender: "bot" }]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();

    // 1. 사용자 메시지 로깅 및 상태 업데이트
    const newUserLog = { text: `나: ${userMessage}`, sender: "user" };
    setChatLog((prev) => [...prev, newUserLog]);
    setInputText("");
    setIsLoading(true);

    try {
      let systemPrompt = "";
      let botResponsePrefix = "";

      // 2. 모드에 따른 프롬프트 엔지니어링 설정
      switch (mode) {
        case "basic":
          systemPrompt =
            "당신은 개발자 취업을 목표로 하는 사용자에게 유용한 정보를 제공하는 친절하고 유능한 AI 멘토입니다. 클라우드 컴퓨팅, 개발자 로드맵, 기술 면접 질문 등 사용자의 질문에 항상 한국어로 전문적인 답변을 해주세요. 답변은 명료하고 실용적이어야 합니다.";
          botResponsePrefix = "🤖 AI 멘토: ";
          break;

        case "readme":
          // README 생성을 유도하는 프롬프트
          systemPrompt =
            "당신은 GitHub 프로젝트의 README.md 파일을 전문적으로 작성해주는 봇입니다. 사용자가 입력한 내용을 바탕으로 프로젝트명, 개요, 기술 스택, 설치 및 실행 방법, 기여 방법 등을 포함한 마크다운(Markdown) 형식의 README 파일을 생성해 주세요. 다른 설명 없이 완성된 마크다운 텍스트만 출력해야 합니다.";
          botResponsePrefix = "📄 README 봇: \n";
          break;

        case "resume":
          // 이력서 경력 생성 프롬프트
          systemPrompt =
            "당신은 사용자가 입력한 경력 사항을 HR 담당자에게 매력적으로 보일 수 있도록 전문적인 이력서 형식으로 다듬어주는 AI 에디터입니다. 입력된 내용을 바탕으로 성과 중심의 간결하고 명료한 문장으로 수정하고, 핵심 키워드를 강조하여 출력해 주세요. 출력 시에는 '경력 요약', '주요 성과'와 같은 목차를 포함하여 한국어로 작성해야 합니다.";
          botResponsePrefix = "📝 이력서 봇: \n";
          break;

        case "translate":
          // 이력서 영문 번역 프롬프트
          systemPrompt =
            "당신은 한국어 경력/이력 내용을 전문적이고 자연스러운 영어 이력서 문장으로 번역해주는 전문가입니다. 입력된 한국어 텍스트를 영어로 번역하고, 이력서에 적합한 간결한 액션 동사(e.g., Developed, Managed, Implemented)로 시작하는 구문을 사용해야 합니다. 번역된 영어 문장만 출력해야 합니다.";
          botResponsePrefix = "🔤 번역 봇: ";
          break;

        default:
          // 기본값
          systemPrompt =
            "당신은 개발자를 준비하는 사람들을 위한 유능한 AI 어시스턴트입니다. 항상 한국어로 답변해주세요.";
          botResponsePrefix = "🤖 AI 멘토: ";
      }

      // 3. API 호출 (모든 모드가 API 사용)
      const botResponseText = await getChatGptResponse(
        [...chatLog, newUserLog], // 현재 로그와 사용자 메시지 전달
        systemPrompt // 설정한 시스템 프롬프트 전달
      );

      // 4. 챗봇 응답 로그에 추가
      const finalBotResponse = botResponsePrefix + botResponseText;

      setChatLog((prev) => [
        ...prev,
        { text: finalBotResponse, sender: "bot" },
      ]);
    } catch (error) {
      console.error("메시지 전송 중 오류 발생:", error);
      setChatLog((prev) => [
        ...prev,
        {
          text: "🤖 AI 멘토: 죄송합니다. 메시지 처리 중 오류가 발생했습니다.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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
              {/* 로딩 인디케이터 추가 */}
              {isLoading && (
                <div className="loading-indicator">
                  ... AI 멘토가 응답을 준비 중입니다.
                </div>
              )}
              <input
                type="text"
                placeholder="내용을 입력하세요..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isLoading} // 로딩 중일 때 입력 비활성화
              />
              <button onClick={handleSendMessage} disabled={isLoading}>
                {isLoading ? "전송 중..." : "전송"}
              </button>
            </div>

            <ButtonArea changeMode={changeMode} mode={mode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
