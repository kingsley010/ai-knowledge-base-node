import express from "express";
import dotenv from "dotenv";
import knowledgeRoutes from './routes/knowledgeRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.text({ type: "*/*" }));

app.use('/api/knowledge', knowledgeRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
