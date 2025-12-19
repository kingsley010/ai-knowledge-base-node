import fetch from "node-fetch";

const GEMINI_EMBED_URL = `https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=${process.env.GEMINI_API_KEY}`;

export async function embed(text) {
  const response = await fetch(GEMINI_EMBED_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: {
        parts: [{ text }]
      }
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Gemini API error: ${data.error?.message || 'Unknown error'}`);
  }

  if (!data.embedding || !data.embedding.values) {
    throw new Error('No embedding data received from Gemini');
  }

  return data.embedding.values;
}