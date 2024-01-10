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
let theBusinessJudgement = 0;

const bible = {level1:{decision0: (+5), decision1:(-5)}}

const judge = (levelId, answerId) => {
  const judgement = bible[levelId][answerId]
  theBusinessJudgement = theBusinessJudgement + judgement
  return judgement
}

function handleIndexChange() {
  let specialPrompt = generateSetupPromt(currentLevelId, currentDecisionId);

  // Check if the specialPrompt is already in messages
  const isPromptPresent = messages.some(
    (message) => message.content === specialPrompt
  );

  if (!isPromptPresent) {
    messages.push({ role: "system", content: specialPrompt });
    console.log("Special Prompt Added:", specialPrompt);
  } else {
    console.log("Special Prompt Already Exists:", specialPrompt);
  }
}

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

  let temp = judge(currentLevelId, currentDecisionId);
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

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Function to send data
  const sendEvent = () => {
    const judgment = judge(currentLevelId, currentDecisionId);
    
    res.write(
      `data: ${JSON.stringify({
        currentQuestionIndex,
        currentLevelId,
        currentDecisionId,
        judgment,
      })}\n\n`
    );
  };

  // Listen to the event
  indexChangeEmitter.on("indexChanged", sendEvent);
  indexChangeEmitter.on("indexChanged", handleIndexChange);

  // Remove listener on client disconnect
  req.on("close", () => {
    indexChangeEmitter.removeListener("indexChanged", sendEvent);
    indexChangeEmitter.removeListener("indexChanged", handleIndexChange);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
