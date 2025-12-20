import express from 'express';
import { uploadDocument, askQuestionHandler } from '../controllers/knowledgeController.js';

const router = express.Router();

router.post('/upload', uploadDocument);
router.post('/ask', askQuestionHandler);

export default router;
