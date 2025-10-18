// ─────────── Sakura Petals ───────────
function createPetal() {
  const p = document.createElement("div");
  p.classList.add("petal");
  document.body.appendChild(p);
  const left = Math.random() * window.innerWidth;
  const size = Math.random() * 8 + 8;
  const dur = Math.random() * 5 + 7;
  p.style.left = `${left}px`;
  p.style.width = `${size}px`;
  p.style.height = `${size * 1.4}px`;
  p.style.animationDuration = `${dur}s`;
  setTimeout(() => p.remove(), dur * 1000);
}
setInterval(createPetal, 400);

// ─────────── Transition ───────────
const intro = document.getElementById('intro');
const chatBox = document.getElementById('chatBox');
document.getElementById('enter').addEventListener('click', () => {
  intro.style.display = 'none';
  chatBox.style.display = 'flex';
});

// ─────────── Developer Context ───────────
const devContext = {
  allowedWebsites: [
    "https://kurohana.dev",
    "https://docs.kurohana.dev",
    "https://voidai.app"
  ],
  keywords: [
    "AI development",
    "KuroHana core",
    "VoidAI API",
    "sakura aesthetic",
    "black-purple design"
  ],
  backgroundInfo: `
KuroHana is an internal assistant created by KuroHana Dev. 
It merges artful minimalism with structured logic, focusing on VoidAI integrations, 
creative UX, and cyber-aesthetic research. 
All factual answers must originate from verified KuroHana Dev data or the listed websites.
If uncertain, KuroHana must politely explain that the information isn't in its available sources.`,
  extraNotes: `
Version: 1.4
Maintainer: KuroHana Dev Core Team
Status: Internal experimental build`
};

// ─────────── Chat Logic ───────────
const sendBtn = document.getElementById('send');
const responseBox = document.getElementById('response');

sendBtn.addEventListener('click', sendMessage);

async function sendMessage() {
  const userInput = document.getElementById('userInput').value.trim();
  if (!userInput) return;
  responseBox.textContent = "KuroHana is thinking... 🌸";

  const systemMsg = `
You are KuroHana, a helpful assistant created by KuroHana Dev.
Use only data from these websites: ${devContext.allowedWebsites.join(", ")}.
Focus on these topics: ${devContext.keywords.join(", ")}.
Developer background:
${devContext.backgroundInfo}

Extra notes:
${devContext.extraNotes}`;

  try {
    const res = await fetch("https://api.voidai.app/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer https://www.google.com/search?q=sk-voidai-kg5MwZY9rJGxgEbh5E0zx8tGqbm4VCH6TSelkZlySFgGyGCNPUcjJRtOOzp9M5j2-0RTmvrOWnJf5dJcfOcnmP_5xSCqCyWgGlMkYHF25W_z_-suk2a9EMpFXazboAsjNV7grg&oq=sk-voidai-kg5MwZY9rJGxgEbh5E0zx8tGqbm4VCH6TSelkZlySFgGyGCNPUcjJRtOOzp9M5j2-0RTmvrOWnJf5dJcfOcnmP_5xSCqCyWgGlMkYHF25W_z_-suk2a9EMpFXazboAsjNV7grg&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBBzE4OWowajeoAgCwAgA&sourceid=chrome&ie=UTF-8" // replace securely
      },
      body: JSON.stringify({
        model: "gpt-5-chat",
        messages: [
          { role: "system", content: systemMsg },
          { role: "user", content: userInput }
        ]
      })
    });

    const data = await res.json();
    let msg = data.choices?.[0]?.message?.content?.trim();

    // If no content or it seems out of scope:
    if (!msg || msg === "" || msg.toLowerCase().includes("as an ai")) {
      msg = "I’m sorry, but that information isn’t part of my available KuroHana Dev sources or approved data. 🌑";
    }

    responseBox.textContent = msg;
  } catch (e) {
    responseBox.textContent = "Error: " + e.message;
  }
}
