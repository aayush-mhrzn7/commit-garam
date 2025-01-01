import { GoogleGenerativeAI } from "@google/generative-ai";
import { commitlyPromt as generateCommitPrompt } from "../constants/constants.js";

const generateCommit = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const { userMessage } = req.body;
    const commitPrompt = generateCommitPrompt(userMessage);
    const result = await model.generateContent(commitPrompt);
    return res.status(200).json({ commitMessages: result.response.text() });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      message: "An error occurred while generating commit messages",
    });
  }
};

export { generateCommit };
