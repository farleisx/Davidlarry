// Select DOM elements
const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('prompt');
const outputHtml = document.getElementById('outputHtml');
const preview = document.getElementById('preview');

// Click event for Generate button
generateBtn.addEventListener('click', async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) return alert("Please enter a prompt");

  try {
    // Call backend API (relative path for Vercel)
    const res = await fetch('/api/ai-generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    // Parse JSON response
    const data = await res.json();

    if (res.ok) {
      // Display generated code
      outputHtml.value = data.html || "<!-- No output -->";

      // Update live preview
      preview.srcdoc = data.html || "<!-- No output -->";
    } else {
      // Show error message
      alert(data.error || "AI generation failed");
      console.error(data);
    }

  } catch (err) {
    console.error("Fetch failed:", err);
    alert("AI generation request failed. Check console for details.");
  }
});
