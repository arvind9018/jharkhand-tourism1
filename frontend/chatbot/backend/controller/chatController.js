const { askDeepSeek } = require("../services/perplexityService");

exports.handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = await askDeepSeek(message);

    res.json({ reply });

  } catch (error) {
    console.error("Chat Error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Chatbot failed"
    });
  }
};