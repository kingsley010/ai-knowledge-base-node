import express from "express";
import dotenv from "dotenv";
import knowledgeRoutes from './routes/knowledgeRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.text({ type: "*/*" }));

app.use('/api/knowledge', knowledgeRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
