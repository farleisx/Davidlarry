const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('prompt');
const outputHtml = document.getElementById('outputHtml');
const preview = document.getElementById('preview');

generateBtn.addEventListener('click', async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return alert("Please enter a prompt");

  try {
    const res = await fetch('http://localhost:3000/api/ai-generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    outputHtml.value = data.html;
    preview.srcdoc = data.html;

  } catch (err) {
    console.error(err);
    alert("AI generation failed");
  }
});
