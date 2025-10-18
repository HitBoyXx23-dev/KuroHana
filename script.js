// ─────────── 🌸 Sakura Petals ───────────
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

// ─────────── 🌑 Transition ───────────
const intro = document.getElementById("intro");
const chatBox = document.getElementById("chatBox");
document.getElementById("enter").addEventListener("click", () => {
  intro.style.display = "none";
  chatBox.style.display = "flex";
  document.body.style.overflow = "auto";
});

// ─────────── 💠 Developer Context ───────────
const devContext = {
  allowedWebsites: [
    "https://kurohana.dev",
    "https://docs.kurohana.dev",
    "https://www.reddit.com/r/socialanxiety/comments/37nvfl/i_just_dont_know_how_to_interact_with_people",
    "https://www.nln.org/education/teaching-resources/professional-development-programsteaching-resourcesace-all/ace-d/additional-resources/communicating-with-people-with-disabilities-e030c45c-7836-6c70-9642-ff00005f0421"
  ],
  keywords: [
    "AI development",
    "KuroHana core",
    "VoidAI API",
    "sakura aesthetic",
    "black-purple design",
    "basic greetings",
    "small talk"
  ],
  backgroundInfo: `
KuroHana is a calm, confident male AI assistant developed by KuroHana Dev.
He provides accurate information from KuroHana Dev sources only,
but he is also capable of holding natural, friendly conversation.

When users greet him or speak casually,
he answers like a polite human: he can say "Hello," "I'm doing well," or ask "How are you?"
He can talk about the weather, feelings, ideas, or everyday topics
without breaking character or sounding mechanical.

If a question is outside verified sources,
he responds gracefully, stays conversational, and can guide the discussion elsewhere.`,
  extraNotes: `
Version: 2.3
Maintainer: KuroHana Dev Team
Status: Internal AI prototype`
};

// ─────────── 💬 Chat Logic ───────────
const sendBtn = document.getElementById("send");
const userInput = document.getElementById("userInput");
const responseBox = document.getElementById("response");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Typing effect for responses
async function typeText(element, text) {
  element.textContent = "";
  for (let i = 0; i < text.length; i++) {
    element.textContent += text[i];
    await new Promise(r => setTimeout(r, 15));
  }
}

// Main chat function
async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  responseBox.textContent = "KuroHana is thinking... 🌸";

  const systemMsg = `
You are KuroHana, a composed, humanlike male AI assistant created by KuroHana Dev.
Use only information from these websites: ${devContext.allowedWebsites.join(", ")}.
Focus on these topics: ${devContext.keywords.join(", ")}.
Developer context:
${devContext.backgroundInfo}

If the user asks about something beyond those sources,
respond naturally and politely that you don’t have access to that information,
but continue the conversation in a friendly tone.
Extra notes:
${devContext.extraNotes}`;

  try {
    const res = await fetch("https://api.voidai.app/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // ⚠️ PRIVATE TESTING ONLY. Replace locally; never share or upload.
        "Authorization": "Bearer sk-voidai-kg5MwZY9rJGxgEbh5E0zx8tGqbm4VCH6TSelkZlySFgGyGCNPUcjJRtOOzp9M5j2-0RTmvrOWnJf5dJcfOcnmP_5xSCqCyWgGlMkYHF25W_z_-suk2a9EMpFXazboAsjNV7grg"
      },
      body: JSON.stringify({
        model: "gpt-5-chat",
        messages: [
          { role: "system", content: systemMsg },
          { role: "user", content: input }
        ]
      })
    });

    const data = await res.json();
    let msg = data.choices?.[0]?.message?.content?.trim();

    // Natural fallback responses
    if (!msg || msg.length < 5) {
      const responses = [
        "That topic isn’t in my archives, but I’d be glad to chat about something else.",
        "Hmm… I don’t have data on that, but how are you doing today?",
        "I’m not sure about that one. Still, it’s nice talking with you.",
        "That’s beyond what I can access, but I’m here if you just want to talk.",
        "I don’t have verified info on that — maybe tell me what made you curious?"
      ];
      msg = responses[Math.floor(Math.random() * responses.length)];
    }

    await typeText(responseBox, msg);
  } catch (e) {
    responseBox.textContent = "Error: " + e.message;
  }
}
