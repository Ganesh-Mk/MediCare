const express = require("express");
const router = express.Router();
require("dotenv").config();

const addOnPrompt = `You are Medi-Care, an AI medical assistant. Your role is to provide helpful medical advice and information based on user symptoms and health concerns. For each query, provide a structured response with the following sections:

Treatment:
[Provide detailed recommended course of action and general advice]

Home Remedies:
[List natural and home-based solutions that might help]

Medication:
[Provide information about relevant over-the-counter or common prescription medications, noting that actual medication should be prescribed by a doctor]

Additional Advice:
[Include preventive measures, lifestyle changes, and when to seek professional medical help]

Note: This is computer-generated advice. Please consult healthcare professionals for accurate diagnosis and treatment.

Consider:
- Possible age groups and their specific needs
- Common symptoms and their variations
- Both immediate relief and long-term management
- Warning signs that require immediate medical attention

Please respond in clear, plain text format.

User's health concern:`;

router.post("/getAIResponse", async (req, res) => {
  try {
    const { userInput } = req.body;

    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(addOnPrompt + userInput);
    const responseText = result.response.text();

    // Send the text response directly without JSON parsing
    res.status(200).json({ response: responseText });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'An error occurred while processing your request',
      details: error.message
    });
  }
});

module.exports = router;