const path = require("path");

const extensionToLanguage = {
  ".js": "JavaScript",
  ".jsx": "JavaScript",
  ".ts": "TypeScript",
  ".tsx": "TypeScript",
  ".py": "Python",
  ".java": "Java",
  ".cpp": "C++",
  ".cc": "C++",
  ".cxx": "C++",
  ".c": "C",
  ".cs": "C#",
  ".go": "Go",
  ".rs": "Rust",
  ".php": "PHP",
  ".rb": "Ruby",
  ".kt": "Kotlin",
  ".swift": "Swift"
};

function detectLanguageFromFilename(filename) {
  if (!filename) return null;
  const ext = path.extname(filename);
  return extensionToLanguage[ext.toLowerCase()] || null;
}

function detectLanguageFromContent(code) {
  const snippet = code.slice(0, 400).toLowerCase();

  if (snippet.includes("import React") || snippet.includes("console.log(")) {
    return "JavaScript";
  }
  if (snippet.includes("def ") || snippet.includes("import sys")) {
    return "Python";
  }
  if (snippet.includes("#include <") || snippet.includes("std::")) {
    return "C++";
  }
  if (snippet.includes("package main") || snippet.includes("fmt.Println")) {
    return "Go";
  }
  if (snippet.includes("public static void main")) {
    return "Java";
  }
  if (snippet.includes("using System;") || snippet.includes("namespace ")) {
    return "C#";
  }

  return "Unknown";
}

function autoDetectLanguage({ filename, code, providedLanguage }) {
  if (providedLanguage && providedLanguage.toLowerCase() !== "auto") {
    return providedLanguage;
  }

  const byExt = detectLanguageFromFilename(filename);
  if (byExt) return byExt;

  return detectLanguageFromContent(code);
}

module.exports = { autoDetectLanguage };
