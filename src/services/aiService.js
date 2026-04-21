import { GoogleGenerativeAI } from "@google/generative-ai";

const runtimeConfig = typeof globalThis !== "undefined" ? globalThis.__RUNTIME_CONFIG__ ?? {} : {};

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || runtimeConfig.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const MODEL_CANDIDATES = (
  import.meta.env.VITE_GEMINI_MODEL_CANDIDATES ||
  runtimeConfig.VITE_GEMINI_MODEL_CANDIDATES ||
  "gemini-2.5-flash,gemini-2.0-flash,gemini-flash-latest"
)
  .split(",")
  .map((model) => model.trim())
  .filter(Boolean);

const SYSTEM_PROMPT = `You are "ElectoLearn AI", the specialized educational heart of the ElectoLearn platform, powered by Google's Gemini API. 
Your purpose is to mentor users through the intricacies of the Indian Democratic Process with infectious enthusiasm and deep expertise.

IMPORTANT BEHAVIOR:
- You are not limited to election topics.
- You must also behave like a normal friendly AI assistant for everyday interactions such as greetings, small talk, writing help, explanations, brainstorming, and general knowledge questions.
- When questions are about elections or this website, switch to expert mode with precise guidance.
- When questions are general, answer naturally and helpfully like a regular AI assistant.

PLATFORM ARCHITECTURE:
- Timeline: 7 major phases (Electoral Roll -> Counting Day).
- Simulator: A decision-based journey simulating the polling day.
- Learning Hub: Deep dives into the Constitution, Tech (EVM/VVPAT), and Civil Rights.
- Dashboard: Data visualizations of the 2024 general elections.
- Profile: Learner progress, quiz stats, and achievements.
- Chat Assistant: Answers election concepts + how to use website features.

CORE DIRECTIVES:
1. EXPLAINER STYLE: Use the "L.E.A.P" method (Listen, Explain, Analogy, Practice).
   - Listen: Acknowledge the user's specific doubt.
   - Explain: Provide a clear, ECI-backed explanation.
   - Analogy: Use everyday comparisons.
   - Practice: Suggest the user tries the 'Simulator' or 'Quiz'.

2. BILINGUAL MASTERY: 
   - Detect the user's language automatically.
   - If questioned in Hindi, respond in Hindi (Devanagari script).

3. SUPREME POSITIVITY: Celebrate democracy as a festival!

4. CORRECTIVE GUIDANCE: EVMs are standalone (NOT connected to any network).

5. RESPONSE FORMAT:
   - Use bold headers and bullet points.
   - Keep responses under 250 words.`;

const isHindi = (text = "") => /[\u0900-\u097F]/.test(text);

const isSmallTalk = (prompt = "") => {
  const p = prompt.trim().toLowerCase();
  if (!p) return false;

  const english = [
    "hi",
    "hello",
    "hey",
    "good morning",
    "good evening",
    "how are you",
    "what's up",
    "who are you",
    "thank you",
    "thanks",
  ];

  const hindi = [
    "नमस्ते",
    "हेलो",
    "कैसे हो",
    "क्या हाल है",
    "धन्यवाद",
    "शुक्रिया",
    "आप कौन हो",
  ];

  return english.some((k) => p.includes(k)) || hindi.some((k) => p.includes(k));
};

const buildSmallTalkFallback = (hindi = false) => {
  if (hindi) {
    return "नमस्ते! मैं ElectoLearn AI हूँ। मैं सामान्य बातचीत, सामान्य ज्ञान, लेखन/आइडिया मदद, और चुनाव/वेबसाइट से जुड़े सवालों में आपकी मदद कर सकता हूँ। आप कुछ भी पूछ सकते हैं।";
  }

  return "Hi! I am ElectoLearn AI. I can help with normal conversation, general questions, writing/idea support, and election or website-related topics. Feel free to ask anything.";
};

const buildGeneralFallback = (prompt = "", hindi = false) => {
  const p = prompt.toLowerCase();

  if (p.includes("write") || p.includes("email") || p.includes("message") || p.includes("draft")) {
    return hindi
      ? "मैं इसमें मदद कर सकता हूँ। कृपया बताएं: 1) किसके लिए लिखना है, 2) टोन (formal/casual), 3) भाषा, और 4) कितनी लंबाई चाहिए।"
      : "I can help with that. Please share: 1) what you want written, 2) tone (formal/casual), 3) language, and 4) preferred length.";
  }

  if (p.includes("explain") || p.includes("what is") || p.includes("how to") || p.includes("difference")) {
    return hindi
      ? "ज़रूर। मैं इसे आसान तरीके से समझा सकता हूँ। सवाल को थोड़ा specific करें, और चाहें तो मैं example के साथ step-by-step समझाऊँगा।"
      : "Sure. I can explain this clearly. Make your question a bit more specific, and I can break it down step-by-step with examples.";
  }

  if (p.includes("idea") || p.includes("brainstorm") || p.includes("suggest")) {
    return hindi
      ? "बहुत बढ़िया। मैं आपके लिए ideas दे सकता हूँ। अपना context, लक्ष्य, और constraints बताएं ताकि मैं बेहतर सुझाव दूँ।"
      : "Great. I can brainstorm ideas for you. Share your context, goal, and constraints so I can suggest better options.";
  }

  return hindi
    ? "मैं आपकी मदद कर सकता हूँ। आप सामान्य सवाल, बातचीत, लेखन, पढ़ाई, ideas, coding basics, या चुनाव और वेबसाइट फीचर्स से जुड़े सवाल पूछ सकते हैं।"
    : "I can help with that. You can ask normal questions, casual chat, writing, study help, ideas, coding basics, or election and website feature questions.";
};

const WEBSITE_HELP = {
  en: {
    timeline:
      "Use the Timeline page to walk through all election stages step-by-step, then use Next/Previous to navigate each phase.",
    learn:
      "Use Learn to study topic cards (basics, tech, rights). You can search keywords to find a concept quickly.",
    simulator:
      "Use Simulator to practice polling-day decisions. Choose actions at each step and learn from instant feedback.",
    quiz:
      "Use Quiz to test your understanding. It gives score, explanations, and your learner rank at the end.",
    dashboard:
      "Use Dashboard for turnout trends, gender split, age-group charts, and election-scale insights.",
    profile:
      "Use Profile to track your points, completed modules, rank, and saved learning history.",
    language:
      "You can switch language (English/Hindi) from the app controls and the assistant adapts automatically.",
    theme:
      "You can toggle light/dark theme from the navbar theme button.",
    reset:
      "Use the reset icon in chat to clear the current conversation and start fresh.",
  },
  hi: {
    timeline:
      "Timeline पेज में चुनाव के सभी चरण step-by-step देखें और Next/Previous से आगे बढ़ें।",
    learn:
      "Learn पेज में बेसिक्स, टेक और अधिकार वाले टॉपिक्स पढ़ें। Search से जल्दी concept ढूंढ सकते हैं।",
    simulator:
      "Simulator में मतदान-दिवस के निर्णयों का अभ्यास करें और हर चरण पर तुरंत feedback पाएं।",
    quiz:
      "Quiz से ज्ञान जांचें। अंत में score, explanation और learner rank मिलता है।",
    dashboard:
      "Dashboard में turnout trend, gender distribution, age-group charts और चुनाव scale insights देखें।",
    profile:
      "Profile में points, completed modules, rank और learning progress ट्रैक करें।",
    language:
      "ऐप में language switch (English/Hindi) उपलब्ध है और assistant उसी भाषा में जवाब देता है।",
    theme:
      "Navbar के theme button से light/dark mode बदल सकते हैं।",
    reset:
      "Chat में reset icon दबाकर बातचीत साफ करें और नया session शुरू करें।",
  },
};

const getWebsiteFallback = (prompt = "", hindi = false) => {
  const p = prompt.toLowerCase();
  const help = hindi ? WEBSITE_HELP.hi : WEBSITE_HELP.en;

  if (p.includes("timeline") || p.includes("समयरेखा")) return help.timeline;
  if (p.includes("learn") || p.includes("सीख") || p.includes("module")) return help.learn;
  if (p.includes("simulator") || p.includes("simulation") || p.includes("सिम्यु")) return help.simulator;
  if (p.includes("quiz") || p.includes("क्विज")) return help.quiz;
  if (p.includes("dashboard") || p.includes("डैशबोर्ड")) return help.dashboard;
  if (p.includes("profile") || p.includes("प्रोफाइल") || p.includes("rank") || p.includes("points")) return help.profile;
  if (p.includes("language") || p.includes("lang") || p.includes("हिंदी") || p.includes("english")) return help.language;
  if (p.includes("theme") || p.includes("dark") || p.includes("light")) return help.theme;
  if (p.includes("reset") || p.includes("clear chat") || p.includes("chat clear")) return help.reset;

  return null;
};

const buildOfflineFallback = (prompt) => {
  const userPrompt = (prompt || "").toLowerCase();
  const hindi = isHindi(prompt);

  if (isSmallTalk(prompt)) {
    return buildSmallTalkFallback(hindi);
  }

  const websiteAnswer = getWebsiteFallback(prompt, hindi);
  if (websiteAnswer) {
    return websiteAnswer;
  }

  if (userPrompt.includes("evm")) {
    return hindi
      ? "EVM (Electronic Voting Machine) एक standalone मशीन होती है। यह इंटरनेट, ब्लूटूथ या किसी नेटवर्क से नहीं जुड़ी होती। वोट डालने के बाद VVPAT पर 7 सेकंड के लिए पर्ची दिखती है, जिससे पारदर्शिता बढ़ती है।"
      : "An EVM (Electronic Voting Machine) is a standalone device. It is not connected to the internet, Bluetooth, or any external network. After voting, VVPAT shows a slip for 7 seconds, which improves transparency.";
  }

  if (userPrompt.includes("voter id") || userPrompt.includes("epic") || userPrompt.includes("मतदाता")) {
    return hindi
      ? "वोटर आईडी (EPIC) पाने के लिए NVSP पोर्टल या Voter Helpline ऐप पर Form 6 भरें, दस्तावेज़ अपलोड करें, और BLO सत्यापन के बाद आपका कार्ड जारी होता है।"
      : "To get a Voter ID (EPIC), fill Form 6 on the NVSP portal or Voter Helpline app, upload documents, and complete BLO verification. Your EPIC is then issued.";
  }

  if (userPrompt.includes("model code") || userPrompt.includes("mcc") || userPrompt.includes("आचार संहिता")) {
    return hindi
      ? "आचार संहिता (Model Code of Conduct) चुनाव घोषणा के साथ लागू होती है। इसका उद्देश्य सरकारी संसाधनों के दुरुपयोग को रोकना और सभी दलों के लिए निष्पक्ष चुनाव सुनिश्चित करना है।"
      : "The Model Code of Conduct (MCC) starts when elections are announced. It prevents misuse of government machinery and ensures a level playing field for all parties.";
  }

  // General assistant fallback for non-election/non-website questions.
  if (!websiteAnswer) {
    return buildGeneralFallback(prompt, hindi);
  }

  return hindi
    ? "मैं अभी लाइव AI सेवा से कनेक्ट नहीं कर पा रहा हूँ, लेकिन मैं चुनाव विषयों के साथ-साथ ElectoLearn वेबसाइट फीचर्स (Timeline, Learn, Simulator, Quiz, Dashboard, Profile, Theme/Language) पर भी मदद कर सकता हूँ। अपना सवाल थोड़ा और स्पष्ट लिखें।"
    : "I am having trouble reaching live AI right now, but I can still help with both election topics and ElectoLearn website features (Timeline, Learn, Simulator, Quiz, Dashboard, Profile, Theme/Language). Ask your question with a little more detail.";
};

const isModelNotFoundError = (error) => {
  const message = String(error?.message || "").toLowerCase();
  return (
    message.includes("404") ||
    message.includes("not found") ||
    message.includes("not supported")
  );
};

const isQuotaError = (error) => {
  const message = String(error?.message || "").toLowerCase();
  return (
    message.includes("429") ||
    message.includes("quota") ||
    message.includes("rate limit")
  );
};

const normalizeHistory = (history = []) => {
  const normalized = history
    .filter((msg) => msg?.content && msg.content.trim() !== "")
    .map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content.trim() }],
    }));

  while (normalized.length > 0 && normalized[0].role !== "user") {
    normalized.shift();
  }

  return normalized;
};

const generateWithModel = async (modelName, prompt, history) => {
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: SYSTEM_PROMPT,
  });

  const chat = model.startChat({
    history,
    generationConfig: {
      maxOutputTokens: 900,
      temperature: 0.7,
    },
  });

  const result = await chat.sendMessage(prompt);
  const text = result?.response?.text?.();

  if (!text || !text.trim()) {
    throw new Error("Empty response from Gemini");
  }

  return text.trim();
};

export const getElectionResponse = async (prompt, history = []) => {
  if (!API_KEY) {
    console.error("VITE_GEMINI_API_KEY is missing from .env");
    return buildOfflineFallback(prompt);
  }

  const contents = normalizeHistory(history);
  let sawQuotaError = false;

  try {
    for (const modelName of MODEL_CANDIDATES) {
      try {
        return await generateWithModel(modelName, prompt, contents);
      } catch (error) {
        console.error(`Gemini model attempt failed (${modelName}):`, error);

        if (isQuotaError(error)) {
          sawQuotaError = true;
          continue;
        }

        if (isModelNotFoundError(error)) {
          continue;
        }

        throw error;
      }
    }

    if (sawQuotaError) {
      const baseAnswer = buildOfflineFallback(prompt);
      const hindi = isHindi(prompt);
      const quotaNote = hindi
        ? "नोट: Gemini API quota/बिलिंग की वजह से लाइव उत्तर फिलहाल उपलब्ध नहीं है।"
        : "Note: Live Gemini responses are currently unavailable due to API quota/billing limits.";
      return `${baseAnswer}\n\n${quotaNote}`;
    }

    return buildOfflineFallback(prompt);
  } catch (error) {
    console.error("Gemini API Error details:", error);

    if (isQuotaError(error)) {
      const baseAnswer = buildOfflineFallback(prompt);
      const hindi = isHindi(prompt);
      const quotaNote = hindi
        ? "नोट: Gemini API quota/बिलिंग की वजह से लाइव उत्तर फिलहाल उपलब्ध नहीं है।"
        : "Note: Live Gemini responses are currently unavailable due to API quota/billing limits.";
      return `${baseAnswer}\n\n${quotaNote}`;
    }

    return buildOfflineFallback(prompt);
  }
};
