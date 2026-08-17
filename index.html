// ============================================
// SomaSmart — API Logic (api.js)
// ============================================

const CONFIG = {
  model: "claude-sonnet-4-6",
  max_tokens: 1000,
  endpoint: "https://api.anthropic.com/v1/messages",
};

function buildPrompt(question, level, subject) {
  return `You are SomaSmart — an expert exam tutor for Kenyan students.
Solve this ${level} ${subject} question step by step.

Question: ${question}

Rules:
1. Start with: ✅ Topic: [topic name]
2. Number every step clearly
3. Show all working and formulas
4. State the final answer clearly
5. End with: 💡 Exam Tip: [one useful tip]
6. Use simple English
7. Be concise but complete`;
}

function validateInput(question) {
  if (!question || question.trim() === "") {
    return { isValid: false, error: "Please paste your question first." };
  }
  if (question.trim().length < 10) {
    return { isValid: false, error: "Question is too short. Paste the full question." };
  }
  if (question.trim().length > 3000) {
    return { isValid: false, error: "Too long. Paste one question at a time." };
  }
  return { isValid: true, error: null };
}

async function solveQuestion(question, level, subject) {
  const validation = validateInput(question);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  try {
    const response = await fetch(CONFIG.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: CONFIG.model,
        max_tokens: CONFIG.max_tokens,
        messages: [
          {
            role: "user",
            content: buildPrompt(question, level, subject),
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) return { success: false, error: "Too many requests. Wait a moment and try again." };
      if (response.status === 401) return { success: false, error: "API key error. Contact support." };
      return { success: false, error: `Error ${response.status}. Please try again.` };
    }

    const data = await response.json();
    const answer = data.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    if (!answer) return { success: false, error: "Empty response. Please try again." };

    return { success: true, answer };

  } catch (error) {
    return { success: false, error: "Network error. Check your internet and try again." };
  }
}

window.SomaSmart = { solveQuestion };