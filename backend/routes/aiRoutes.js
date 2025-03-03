const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const auth = require("../middleware/auth");
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ AI Route Query Support ke sath
router.post("/insights", auth, async (req, res) => {
    try {
        const { query } = req.body;  // ✅ User query fetch karo
        if (!query) {
            return res.status(400).json({ msg: "Query is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent(query);  // ✅ User Query AI ko pass karo
        const response = await result.response;

        res.json({ insights: response.text() });

    } catch (err) {
        console.error("AI Error:", err);
        res.status(500).json({ msg: "AI processing failed." });
    }
});

module.exports = router;
