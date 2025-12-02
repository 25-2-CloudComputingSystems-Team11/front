const BACKEND_URL = "http://localhost:30080";

export async function getChatGptResponse(chatHistory, systemPrompt) {
  try {
    // 1. 백엔드(Python)로 요청 전송
    const response = await fetch(`${BACKEND_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatHistory: chatHistory,
        systemPrompt: systemPrompt,
      }),
    });

    if (!response.ok) {
      // 백엔드에서 에러 응답 온 경우
      const errorData = await response.json();
      throw new Error(
        errorData.detail || `HTTP error! status: ${response.status}`
      );
    }

    // 2. 백엔드 응답 처리
    const data = await response.json();

    return data.response_text;
  } catch (error) {
    console.error("백엔드 통신 오류:", error);
    return "죄송합니다. 서버와 연결할 수 없거나 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
}
