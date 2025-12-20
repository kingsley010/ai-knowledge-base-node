import { embed } from "./embeddingService.js";
import { addVector } from "./vectorStore.js";

export async function ingestDocument(text) {
  const chunks = chunkText(text);

  for (const chunk of chunks) {
    const embedding = await embed(chunk);
    addVector(chunk, embedding);
  }
}

function chunkText(text, size = 500) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}
