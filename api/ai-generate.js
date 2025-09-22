import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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
    res.status(200).json({ html: data.output || "<!-- no output -->", css: "", js: "" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI generation failed" });
  }
}
