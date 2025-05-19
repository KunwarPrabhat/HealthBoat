import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: messages,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      console.error("Invalid DeepSeek response:", data);
      return res.status(500).json({ error: "Invalid response from DeepSeek" });
    }

    res.json({ message: data.choices[0].message.content });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Failed to connect to DeepSeek API" });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Diagnosis server running on port ${PORT}`);
});
