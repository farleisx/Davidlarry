import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = "AIzaSyDIKc96jiFKaI2iBxe3WFa_ExZfhRpfzNU";

app.post('/api/ai-generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const response = await fetch('https://gemini.googleapis.com/v1/ai:generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gemini-1.5",
        prompt: prompt,
        max_output_tokens: 1000
      })
    });

    const data = await response.json();
    const aiCode = data.output || "<!-- No output -->";

    res.json({
      html: aiCode,
      css: "",
      js: ""
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI generation failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
