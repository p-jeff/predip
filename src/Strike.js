import React, { useEffect, useState } from "react";
import "./Strike.css";
import Mail from "./Mail";
import axios from "axios";
import MatrixPlot from "./MatrixPlot";

const mails = {
  level1: {
    always: [
      {
        id: 1001,
        heading: "Strike1",
        sender: "Max Brown",
        markdownText: "Let's go bowling tonight!",
      },
    ],
  },
  level2: {
    always: [
      {
        id: 1002,
        heading: "Immediate Termination Due to AI-Law Project Misconduct",
        sender: "Emma Clark-Sunning, CEO, Ethico",
        markdownText:
          "\n\nI am writing to you with a matter of utmost urgency and seriousness. After a thorough review of the recent decisions made in our AI and legal access systems integration, it has become clear that your actions have led to a catastrophic outcome: the loss of LegalBot, one of our key clients.\n\nYour approach in handling the AI implementation in the legal domain was not only flawed but demonstrated a concerning lack of judgment and professionalism. The consequences of these actions have been severe, costing us a valuable client and significantly damaging our reputation in the industry.\n\nGiven the gravity of this situation and the irreparable damage caused, we are left with no choice but to terminate your employment effective immediately. This decision is final and non-negotiable. We expected and required a much higher standard of conduct and responsibility, especially in a project of such importance and sensitivity.\n\nYou are required to return all company property and confidential information by the end of the day. Your final paycheck will be processed according to the standard company policies.\n\nThis incident is a regrettable reminder of the critical nature of our work and the high standards we must uphold. We must part ways to protect the interests and future of our company.\n\nSincerely,\n\nEmma Clark-Sunning\nCEO, Ethico",
      },
    ],
  },
  level3: {
    always: [
      {
        id: 1003,
        heading: "Changes in Organizational Structure and Your Employment",
        sender: "Emma Clark-Sunning, CEO, Ethico",
        markdownText:
          "Hey,\n\nI hope you are well. As CEO of Ethico, I am tasked with making decisions that shape the direction and success of our company. It is in this capacity that I must address a significant change within our organization.\n\nAfter careful analysis of our operational strategies and in light of recent discussions about the future of our workplace, we have had to reevaluate our staffing needs. Regrettably, this reevaluation has led to the decision to terminate your employment with Ethico, effective immediately.\n\nThis decision is not made lightly and does not reflect on your individual performance or dedication. However, in periods of transformation, especially as we navigate through changing landscapes of workplace dynamics, tough decisions are sometimes necessary. It's about aligning our team in a manner that supports our broader company vision and operational efficacy.\n\nI want to acknowledge the perspectives and voices that have been raised in recent times, contributing to important dialogues within Ethico. While we value open discussion and diverse viewpoints, our decisions are ultimately guided by the need to uphold the company's strategic objectives and foundational principles.\n\nOur HR department will be in touch to guide you through the transition process and ensure that you receive all entitled benefits and support. We appreciate the contributions you have made during your tenure and wish you success in your future endeavors.\n\nThank you for your time with us at Ethico.\n\nSincerely,\n\nEmma Clark-Sunning\nCEO, Ethico",
      },
    ],
  },
  level4: {
    always: [
      {
        id: 1004,
        heading: "Restructuring Update: AI Ethics Team",
        sender: "Emma Clark-Sunning, CEO, Ethico",
        markdownText:
          "Hey,\n\nAs part of our strategic shift towards an open-source AI model, the role of our internal AI Ethics Team is being re-evaluated. With the community now spearheading regulation and oversight, we have made the difficult decision to disband the AI Ethics Team, including your role, effective immediately.\n\nThis action reflects our evolving approach to AI development rather than the value of your contributions. Our HR team will assist you through this transition, providing details on severance and support services.\n\nWe thank you for your dedication and efforts at Ethico.\n\nBest,\nEmma Clark-Sunning\nCEO, Ethico",
      },
    ],
  },
  level5: {
    always: [
      {
        id: 1005,
        heading: "Message from the Development Team",
        sender: "Johannes Felix Lotze",
        markdownText:
          "Hey,\n\nYou've just hit the current end of my game! It's pretty clear, right? The paths to AI regulation are anything but straightforward. These questions are at the heart of ongoing and lively debates. Dive in, get informed, and join the fight for what we believe in.\n\nThe other path? Letting AI Labs call the shots on regulation. Even if AI isn't our last great invention, this journey will definitely shed light on some of the most crucial internet debates of our time.\n\nBest,\nJohannes",
      },
    ],
  },
};

const Strike = () => {
  const [data, setData] = useState(null);
  const [compassPosition, setCompassPosition] = useState([0, 0]);
  const [isLoading, setIsLoading] = useState(true);
  const [level, setLevel] = useState("level1");

  useEffect(() => {
    handleStrikeFile();
    getCompass();
  }, []);

  const handleStrikeFile = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/getLevelId");
      let temp = mails[response.data.currentLevelId]?.always;
      setData(temp);
      setLevel(response.data.currentLevelId);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Handle error state if needed
    }
  };

  const getCompass = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/getCompass");
      setCompassPosition(response.data.compassPosition);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Handle error state if needed
    }
  };

  const onRestart = () => {
    window.location.reload(true);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <div className="strikeBody">
      <h1>Goodbye</h1>
      <img src="logo.png" className="centeredImage"/>
      {data && (
        <Mail
          isStrike={true}
          strikeFile={data}
          isMinimized={false}
          position={{ x: 50, y: 50 }}
        />
      )}
      <MatrixPlot coordinates={compassPosition} level={level} />
      <button className="restartButton" onClick={onRestart}>
        Restart
      </button>
    </div>
  );
};

export default Strike;
