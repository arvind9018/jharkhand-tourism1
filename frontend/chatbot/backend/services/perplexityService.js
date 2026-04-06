const axios = require("axios");

exports.askDeepSeek = async (message) => {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-3.5-turbo", // free-tier model
      messages: [
        {
          role: "system",
          content:
            "You are a Jharkhand tourism guide. Answer about places, hotels, travel tips."
        },
        {
          role: "user",
          content: message
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
};