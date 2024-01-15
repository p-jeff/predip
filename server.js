const express = require("express");
const EventEmitter = require("events");
const cors = require("cors");
require("dotenv").config();
const { OpenAI } = require("openai");
const { generateSetupPromt } = require("./generateSetupPromt");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

const indexChangeEmitter = new EventEmitter();

let messages = [];
let currentQuestionIndex;
let currentLevelId = "level0";
let currentDecisionId = "decision0";
let currentStockPrice = 0;
let currentCompass = [0, 0];
let systemMessage = "";

const stockDevelopment = {
  level1: { decision0: +5, decision1: -5 },
  level2: { decision0: -20, decision1: 10, decision2: 5 },
  level3: { decision0: -20, decision1: 10, decision2: 5, decision3: 5 },
  level4: { decision0: -20, decision1: 10, decision2: 5, decision3: 5 },
  level5: { decision0: -20, decision1: 10, decision2: 5, decision3: 5 },
};
const compassDevelopment = {
  level1: { decision0: [0, 0], decision1: [0, 0] },
  level2: { decision0: [-1, -1], decision1: [0, -1], decision2: [1, 1] },
  level3: { decision0: [-1, -1], decision1: [0, -1], decision2: [1, 1], decision3: [1, 1] },
  level4: { decision0: [-1, -1], decision1: [0, -1], decision2: [1, 1], decision3: [1, 1] },
};

const calculateStock = (levelId, answerId) => {
  const stockPrice = stockDevelopment[levelId][answerId];
  currentStockPrice = currentStockPrice + stockPrice;
  return stockPrice;
};

const calculateCompass = (levelId, answerId) => {
  const compass = compassDevelopment[levelId][answerId];
  currentCompass[0] = currentCompass[0] + compass[0];
  currentCompass[1] = currentCompass[1] + compass[1];
  return compass;
};

function handleIndexChange() {
  let specialPrompt = generateSetupPromt(currentLevelId, currentDecisionId);

  const isPromptPresent = systemMessage.includes(specialPrompt);

  if (!isPromptPresent) {
    systemMessage = systemMessage + specialPrompt;
    messages.push({ role: "system", content: systemMessage });
    console.log("system message updates:", systemMessage);
  } else {
    console.log("Special Prompt Already Exists:", specialPrompt);
  }
}

const reset = () => {
  messages = [];
  currentQuestionIndex;
  currentLevelId = "level0";
  currentDecisionId = "decision0";
  currentStockPrice = 0;
  systemMessage = "";
  handleIndexChange();
};

handleIndexChange();

app.post("/api/chat", async (req, res) => {
  try {
    let userMessage = req.body.prompt;

    // Add the user's message to the conversation
    messages.push({ role: "user", content: userMessage });
    console.log(messages);
    console.log(userMessage);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
    });

    // Get the response from the AI and add it to the conversation
    const aiMessage = response.choices[0].message.content;
    messages.push({ role: "assistant", content: aiMessage });

    console.log(aiMessage);

    res.send(aiMessage.trim());
  } catch (error) {
    console.error("Error in OpenAI request:", error);
    res.status(500).send("Error communicating with OpenAI API");
  }
});

// Endpoint to receive and store the current question index
app.post("/api/questionIndex", (req, res) => {
  currentQuestionIndex = req.body.currentQuestionIndex;
  currentDecisionId = req.body.currentDecision;
  currentLevelId = req.body.currentLevel;

  console.log("Current Question Index:", currentQuestionIndex);
  console.log("Current Decision ID:", currentDecisionId);
  console.log("Current Level ID:", currentLevelId);

  let temp = calculateStock(currentLevelId, currentDecisionId);
  console.log("Judgement:", temp);

  indexChangeEmitter.emit("indexChanged"); // Emit event on change
  res.json({ message: "Data received" });
});

// Endpoint to retrieve the latest stored response
app.get("/api/getQuestionIndex", (req, res) => {
  res.json({ currentQuestionIndex });
});

app.get("/api/getLevelId", (req, res) => {
  res.json({ currentLevelId });
});

app.get("/api/getCompass", (req, res) => {
  const compassPosition = calculateCompass(currentLevelId, currentDecisionId);
  res.json({ compassPosition });
});

app.get("/api/reset", (req, res) => {
  reset();
  console.log("Reset");
  console.lo;
  res.json({ message: "Reset" });
});

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Function to send data
  const sendEvent = () => {
    const stockValue = calculateStock(currentLevelId, currentDecisionId);
    const compassPosition = calculateCompass(currentLevelId, currentDecisionId);

    res.write(
      `data: ${JSON.stringify({
        currentQuestionIndex,
        currentLevelId,
        currentDecisionId,
        stockValue,
        compassPosition,
      })}\n\n`
    );
  };

  // Listen to the event

  const listener = () => {
    console.log("Event listener added");
    sendEvent();
    handleIndexChange();
  };

  indexChangeEmitter.on("indexChanged", listener);
  // Remove listener on client disconnect
  req.on("close", () => {
    indexChangeEmitter.removeListener("indexChanged", listener);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
