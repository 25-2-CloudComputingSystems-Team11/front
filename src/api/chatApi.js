import OpenAI from "openai";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "REACT_APP_OPENAI_API_KEY is not set in the environment variables."
  );
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true,
});

export async function getChatGptResponse(chatHistory, systemPrompt) {
  const defaultSystemPrompt =
    "당신은 유능한 AI 어시스턴트입니다. 항상 한국어로 답변해주세요.";

  const messages = [
    {
      role: "system",
      content: systemPrompt || defaultSystemPrompt,
    },
    ...chatHistory.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text
        .replace(
          /^(나: |🤖 AI 멘토: |📄 README 봇: |📝 이력서 봇: |🔤 번역 봇: )/,
          ""
        )
        .replace(/^(.*: )/, ""),
    })),
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.8,
      max_tokens: 1000,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("ChatGPT API 호출 중 오류 발생:", error);
    return "죄송합니다. API 호출 중 오류가 발생했습니다. 키를 확인하거나 잠시 후 다시 시도해 주세요.";
  }
}
