import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is working!");
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" });

app.post("/generate-quiz", async (req, res) => {
  const { topic, numQuestions, difficulty } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    const prompt = `Create a ${numQuestions || 20}-question multiple choice quiz on the topic "${topic}" with difficulty "${difficulty || "medium"}".
      Return the response as a JSON object with the following structure:
      {
        "title": "A short title for the quiz",
        "summary": "A brief 2–3 sentence summary describing the quiz",
        "questions": [
          {
            "question": "Example question?",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "answer": "Correct Option"
          }
        ]
      }
      Make sure the response is only valid JSON with no extra text, explanations, or formatting outside the JSON object.`;

    const result = await model.generateContent(prompt);
    const textResponse = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!textResponse) {
      throw new Error("No content returned from Gemini");
    }

    const cleanedResponse = textResponse.replace(/```json|```/g, "").trim();

    let quizData;
    try {
      quizData = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return res.status(500).json({
        error: "Failed to parse Gemini response as JSON",
        raw: cleanedResponse,
      });
    }

    res.json({ quiz: quizData });
  } catch (error) {
    console.error("Error generating quiz:", error.message);
    res.status(500).json({ error: "Failed to generate quiz", details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
