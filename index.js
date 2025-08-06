import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt || "Hai!";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ reply: text });
  } catch (err) {
    res.status(500).json({ error: "Error processing your request." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
