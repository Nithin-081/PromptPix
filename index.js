require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const DEEPAI_API_KEY = process.env.DEEPAI_API_KEY;

app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      'https://api.deepai.org/api/text2img',
      new URLSearchParams({ text: prompt }).toString(),
      {
        headers: {
          'Api-Key': DEEPAI_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    res.json({ output_url: response.data.output_url });
  } catch (error) {
    console.error('DeepAI error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
