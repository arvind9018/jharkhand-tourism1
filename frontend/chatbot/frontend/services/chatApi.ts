import axios from "axios";

export const sendChat = async (message: string) => {

  const res = await axios.post(
    "http://localhost:5000/api/chat",
    { message }
  );

  return res.data.reply;

};