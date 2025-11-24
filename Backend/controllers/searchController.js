const Course = require("../models/Course");
const { GoogleGenAI } = require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const searchWithAI = async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
You are an intelligent assistant for an LMS platform.
The user will type any learning-related query.

Return ONLY ONE keyword that best matches the user's intent from this list:
- App Development
- AI/ML
- Web development
- MongoDB
- Express.js
- Node.js
- React
- Beginner
- Intermediate
- Advanced

Rules:
- Output ONLY one exact keyword from above list.
- No punctuation.
- No extra text.

Query: ${input}
`;
    const safeInput = escapeRegex(input);

    let courses = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: safeInput, $options: "i" } },
        { subTitle: { $regex: safeInput, $options: "i" } },
        { description: { $regex: safeInput, $options: "i" } },
        { level: { $regex: safeInput, $options: "i" } },
        { category: { $regex: safeInput, $options: "i" } },
      ],
    });

    if (courses.length > 0) {
      return res.status(200).json(courses);
    }

    // Gemini AI Keyword Extraction
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const rawKeyword =
      response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const keyword = rawKeyword.trim().replace(/[^\w\s.-]/g, "");

    if (!keyword) {
      return res.status(200).json([]);
    }

    const safeKeyword = escapeRegex(keyword);

    // AI-based Search
    courses = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: safeKeyword, $options: "i" } },
        { subTitle: { $regex: safeKeyword, $options: "i" } },
        { description: { $regex: safeKeyword, $options: "i" } },
        { level: { $regex: safeKeyword, $options: "i" } },
        { category: { $regex: safeKeyword, $options: "i" } },
      ],
    });

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to find courses",
      error: error.message,
    });
  }
};

module.exports = { searchWithAI };
