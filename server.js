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
let systemMessage = generateSetupPromt('level0', 'decision0');;

messages.push({ role: "system", content: systemMessage });

const stockDevelopment = {
  level1: { decision0: +5, decision1: -5 },
  level2: { decision0: -30, decision1: 5, decision2: 2 },
  level3: { decision0: +25, decision1: -5, decision2: 10, decision3: -40 },
  level4: { decision0: -20, decision1: 10, decision2: 5, decision3: 5 },
  level5: { decision0: 0, decision1: 0, decision2: 0, decision3:  0},
};
const compassDevelopment = {
  level1: { decision0: [0, 0], decision1: [0, 0] },
  level2: { decision0: [-1, -1], decision1: [1, -1], decision2: [1, 1] },
  level3: {
    decision0: [1, 1],
    decision1: [0, 1],
    decision2: [0, -1],
    decision3: [0, 0],
  },
  level4: {
    decision0: [1, -1],
    decision1: [0, 1],
    decision2: [1, 1],
    decision3: [1, 2],
  },
  level5: {
    decision0: [1, -1],
    decision1: [-1, -1],
    decision2: [1, -1],
    decision3: [0, -1],
  },
};

const calculateStock = (levelId, answerId) => {
  const stockPrice = stockDevelopment[levelId][answerId];
  currentStockPrice = currentStockPrice + stockPrice;
  return currentStockPrice;
};

const calculateCompass = (levelId, answerId) => {
  const compass = compassDevelopment[levelId][answerId];
 
  currentCompass[0] = currentCompass[0] + compass[0];
  currentCompass[1] = currentCompass[1] + compass[1];
  console.log("Compass number Added", currentCompass);
  return compass;
};

const pushSystemMessage = () => {
  let specialPrompt = generateSetupPromt(currentLevelId, currentDecisionId);

  const isPromptPresent = systemMessage.includes(specialPrompt);

  if (!isPromptPresent) {
    systemMessage = systemMessage + specialPrompt;
    messages.push({ role: "system", content: systemMessage });
    console.log("System message updates:", systemMessage);
  } else {
    console.log("Special Prompt Already Exists:", specialPrompt);
    messages.push({ role: "system", content: systemMessage });
  }
};


const reset = () => {
  messages = [];
  currentQuestionIndex;
  currentLevelId = "level0";
  currentDecisionId = "decision0";
  currentStockPrice = 0;
  systemMessage = generateSetupPromt('level0', 'decision0');;
  currentCompass = [0, 0];
  console.log(messages)
};

app.post("/api/chat", async (req, res) => {
  try {
    let userMessage = req.body.prompt;

    // Add the user's message to the conversation
    messages.push({ role: "user", content: userMessage });
    pushSystemMessage();
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
  const compassPosition = currentCompass;
  res.json({ compassPosition });
});

app.get("/api/reset", (req, res) => {
  reset();
  console.log("Reset");
  res.json({ message: "Reset" });
});


const connectedClients = [];

app.get("/events", (req, res) => {
  // Setup for Server-Sent Events
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Add this client to the list of connected clients
  connectedClients.push(res);
  console.log("Client connected, total clients:", connectedClients.length);

  // Cleanup on client disconnect
  req.on("close", () => {
    console.log("Client disconnected");
    // Remove the response object from the connected clients list
    const index = connectedClients.indexOf(res);
    if (index > -1) {
      connectedClients.splice(index, 1);
      console.log("Client removed, total clients:", connectedClients.length);
    }
  });
});

indexChangeEmitter.on("indexChanged", () => {
  console.log("Event listener triggered, broadcasting to clients");
  // Call sendEvent once and broadcast the data to all connected clients
  const eventData = sendEvent();
  connectedClients.forEach(clientRes => {
    console.log("Sending data to a client");
    clientRes.write(`data: ${JSON.stringify(eventData)}\n\n`);
  });
});

const sendEvent = () => {
  // Calculate and prepare the data to be sent
  const stockValue = calculateStock(currentLevelId, currentDecisionId);
  const compassPosition = calculateCompass(currentLevelId, currentDecisionId);

  const eventData = {
    currentQuestionIndex,
    currentLevelId,
    currentDecisionId,
    stockValue,
    compassPosition,
  };

  console.log("Event data prepared:", eventData);
  return eventData;
};



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
