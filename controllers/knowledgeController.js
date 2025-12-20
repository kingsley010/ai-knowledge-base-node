import { ingestDocument } from "../services/documentService.js";
import { askQuestion } from "../services/ragService.js";

export async function uploadDocument(req, res) {
  try {
    await ingestDocument(req.body);
    res.json({ message: "Document ingested" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function askQuestionHandler(req, res) {
  try {
    const answer = await askQuestion(req.body.question);
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
