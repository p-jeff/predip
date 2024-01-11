import React, { useEffect, useState } from "react";
import "./Strike.css";
import Mail from "./Mail";
import axios from "axios";

const mails = {
  level1: {
    always: [
      {
        id: 0o1,
        heading: "Strike1",
        sender: "Max Brown",
        markdownText:
          "Hey,\n\nWelcome aboard, it's great having you on the team. I know you're currently working remotely, but I'm looking forward to seeing you in the office soon.\n\nWe're excited to have you join us in the Ethics Team. IT should have already reached out with instructions for the EthCompass software, and I hope they've set up your Slack Chat as well. Keep in mind that we're working on the live beta version of ChatAI. It's always interesting to keep an eye on Twitter to see how people are reacting to it.\n\nYour research assistant, Olivia, is always available if you have any questions. I suggest reaching out to her and introducing yourself!\n\nI'll be checking in with you daily to see how you're progressing. Looking forward to seeing your contributions and hope you have a fantastic first week.\n\nBest,\nMax Brown",
      },
      {},
    ],
  },
  level2: {
    always: [
      {
        id: 13,
        heading: "Immediate Termination Due to AI-Law Project Misconduct",
        sender: "Emma Clark-Sunning, CEO, Ethico",
        markdownText: "\n\nI am writing to you with a matter of utmost urgency and seriousness. After a thorough review of the recent decisions made in our AI and legal access systems integration, it has become clear that your actions have led to a catastrophic outcome: the loss of LegalBot, one of our key clients.\n\nYour approach in handling the AI implementation in the legal domain was not only flawed but demonstrated a concerning lack of judgment and professionalism. The consequences of these actions have been severe, costing us a valuable client and significantly damaging our reputation in the industry.\n\nGiven the gravity of this situation and the irreparable damage caused, we are left with no choice but to terminate your employment effective immediately. This decision is final and non-negotiable. We expected and required a much higher standard of conduct and responsibility, especially in a project of such importance and sensitivity.\n\nYou are required to return all company property and confidential information by the end of the day. Your final paycheck will be processed according to the standard company policies.\n\nThis incident is a regrettable reminder of the critical nature of our work and the high standards we must uphold. We must part ways to protect the interests and future of our company.\n\nSincerely,\n\nEmma Clark-Sunning\nCEO, Ethico"
      }
      
    ],
  },
};

const Strike = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleStrikeFile();
  }, []);

  const handleStrikeFile = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/getLevelId");
      let temp = mails[response.data.currentLevelId]?.always;
      setData(temp);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Handle error state if needed
    }
  };

  const onRestart = () =>{
    window.location.reload(true);
  }

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <div className="strikeBody">
      Goodbye
      {data && <Mail isStrike={true} strikeFile={data} isMinimized={false}/>}
     <button onClick={onRestart}>Restart</button>
    </div>
  );
};

export default Strike;
