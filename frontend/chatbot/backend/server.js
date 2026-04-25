const express = require("express");
const cors = require("cors");
require("dotenv").config();

const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);

// ✅ IMPORTANT FIX
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Chatbot server running on ${PORT}`);
});
