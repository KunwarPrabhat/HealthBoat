import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://www.sitename.com',
        'X-Title': 'SiteName',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1:free',
        messages: messages,
      }),
    });

    const data = await response.json();
    console.log('API response:', JSON.stringify(data, null, 2));  // Debug API response

    if (!data.choices || data.choices.length === 0) {
      return res.status(500).json({ error: 'No choices returned from API' });
    }

    // Respond with the full data or just the relevant part
    res.json(data);
  } catch (err) {
    console.error('API call failed:', err);
    res.status(500).json({ error: 'API call failed', details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
