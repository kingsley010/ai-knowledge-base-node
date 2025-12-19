import fetch from "node-fetch";
import { embed } from "./embeddingService.js";
import { searchVectors } from "./vectorStore.js";

const GEMINI_CHAT_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

export async function askQuestion(question) {
  const qEmbedding = await embed(question);
  const results = searchVectors(qEmbedding, 5);

  const context = results.map(r => r.text).join("\n---\n");

  const prompt = `
Answer ONLY using the context below.
If the answer is not in the context, say "I don’t know".

Context:
${context}

Question:
${question}
`;

  const response = await fetch(GEMINI_CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }]
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Gemini API error: ${data.error?.message || 'Unknown error'}`);
  }

  if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content || !data.candidates[0].content.parts || data.candidates[0].content.parts.length === 0) {
    throw new Error('No response received from Gemini');
  }

  return data.candidates[0].content.parts[0].text;
}