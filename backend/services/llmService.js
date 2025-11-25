const axios = require("axios");

// 🧵 Wrap after N words
function wrapWords(text, wordsPerLine = 15) {
  if (!text) return "";
  return text
    .split(/\s+/) // split into words
    .reduce((result, word, index) => {
      const isNewLine = index % wordsPerLine === 0;
      result += (isNewLine ? "\n" : " ") + word;
      return result;
    }, "")
    .trim();
}


async function reviewCodeWithLLM(code, language = "unknown") {
  try {
    const prompt = `
You are an expert ${language} software engineer.
Review the code and respond ONLY using this exact format (no extra explanations):

🛑 Errors:
- error1
- error2

🔧 Fixes:
- fix1
- fix2

💡 Suggestions:
- suggestion1
- suggestion2

📦 Corrected Code:
<only corrected code without comments>

Code:
${code}
`;

    console.log("📌 Prompt sent to LLM:", prompt);

    const response = await axios.post(
      `${process.env.OLLAMA_BASE_URL}/api/chat`,
      {
        model: process.env.LLM_MODEL || "phi3",
        messages: [
          {
            role: "system",
            content:
              "You are a strict code reviewer. Respond ONLY in the given format. No additional text allowed."
          },
          { role: "user", content: prompt }
        ],
        stream: false
      },
      // { timeout: 120000 }
    );

    const responseText = response?.data?.message?.content?.trim() || "";
    console.log("🧠 Raw LLM Response:", responseText);

    if (!responseText) {
      throw new Error("❌ No response received from LLM");
    }

    // 🔍 Proper extraction using refined regex (no self-matching issue)
    const extractSection = (label, nextLabels) => {
      const regex = new RegExp(
        `${label}([\\s\\S]*?)(?=${nextLabels.join("|")}|$)`,
        "i"
      );
      const match = responseText.match(regex);
      return match ? match[1].trim() : "No details provided.";
    };

    let errors = extractSection("🛑 Errors:", ["🔧 Fixes:", "💡 Suggestions:", "📦 Corrected Code:"]);
    let fixes = extractSection("🔧 Fixes:", ["💡 Suggestions:", "📦 Corrected Code:"]);
    let suggestions = extractSection("💡 Suggestions:", ["📦 Corrected Code:"]);
    let correctedCode = extractSection("📦 Corrected Code:", []);

    // 🧼 Clean bullet format
    const cleanList = (text) =>
      text
        .split("\n")
        .map((line) => line.replace(/^[-•*]+/, "").trim())
        .filter(Boolean)
        .map((line) => `- ${line}`)
        .join("\n");

    errors = cleanList(errors);
    fixes = cleanList(fixes);
    suggestions = cleanList(suggestions);

    correctedCode = correctedCode.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "").trim();

    return {
      fullReview: responseText,
      errors: wrapWords(errors),
      fixes: wrapWords(fixes),
      suggestions: wrapWords(suggestions),
      correctedCode: wrapWords(correctedCode),
    };

  } catch (error) {
    console.error("🔥 LLM Processing Error:", error);
    throw new Error("Failed to get LLM review. " + error.message);
  }
}

module.exports = { reviewCodeWithLLM };
