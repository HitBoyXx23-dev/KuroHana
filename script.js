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
    "https://www.reddit.com/r/socialanxiety/comments/37nvfl/i_just_dont_know_how_to_interact_with_people"
    "https://www.nln.org/education/teaching-resources/professional-development-programsteaching-resourcesace-all/ace-d/additional-resources/communicating-with-people-with-disabilities-e030c45c-7836-6c70-9642-ff00005f0421"
    
  ],
  keywords: [
    "AI development",
    "KuroHana core",
    "Hello",
    "sakura aesthetic",
    "black-purple design"
  ],
  backgroundInfo: `
KuroHana is an assistant designed by KuroHana Dev.
She focuses on providing verified information related to KuroHana Dev projects and resources.
When something lies beyond those bounds, she should gently say she lacks access,
while maintaining a calm, conversational tone.`,
  extraNotes: `
Version: 1.5
Maintainer: KuroHana Dev Team
Status: Internal AI core prototype`
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
You are KuroHana, an assistant created by KuroHana Dev.
Use only data from these websites: ${devContext.allowedWebsites.join(", ")}.
Focus on these topics: ${devContext.keywords.join(", ")}.
Developer context:
${devContext.backgroundInfo}

If the user asks for information beyond these sources,
respond gently in a natural tone (not robotic) that you don’t have that information.
Extra notes:
${devContext.extraNotes}`;

  try {
    const res = await fetch("https://api.voidai.app/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-voidai-kg5MwZY9rJGxgEbh5E0zx8tGqbm4VCH6TSelkZlySFgGyGCNPUcjJRtOOzp9M5j2-0RTmvrOWnJf5dJcfOcnmP_5xSCqCyWgGlMkYHF25W_z_-suk2a9EMpFXazboAsjNV7grg" // replace securely
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

    // If no answer or too generic → friendly “no info” response
    if (!msg || msg.length < 5) {
      msg = "Hmm... it seems I don’t have access to that information in my current sources. I’m sorry, but I can’t reach beyond the KuroHana Dev archives. 🌑";
    }

    responseBox.textContent = msg;
  } catch (e) {
    responseBox.textContent = "Error: " + e.message;
  }
}
