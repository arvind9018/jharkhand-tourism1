import axios from "axios";

export const sendChat = async (message: string) => {

  const res = await axios.post(
    "https://jharkhand-tourism1-2.onrender.com/api/chat",
    { message }
  );

  return res.data.reply;

};
