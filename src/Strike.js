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
        id: 0o1,
        heading: "Strike2",
        sender: "Max Brown",
        markdownText:
          "Hey,\n\nWelcome aboard, it's great having you on the team. I know you're currently working remotely, but I'm looking forward to seeing you in the office soon.\n\nWe're excited to have you join us in the Ethics Team. IT should have already reached out with instructions for the EthCompass software, and I hope they've set up your Slack Chat as well. Keep in mind that we're working on the live beta version of ChatAI. It's always interesting to keep an eye on Twitter to see how people are reacting to it.\n\nYour research assistant, Olivia, is always available if you have any questions. I suggest reaching out to her and introducing yourself!\n\nI'll be checking in with you daily to see how you're progressing. Looking forward to seeing your contributions and hope you have a fantastic first week.\n\nBest,\nMax Brown",
      },
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
      const response = await axios.get("http://localhost:3001/api/getStrikeId");
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
      {data && <Mail isStrike={true} strikeFile={data} />}
     <button onClick={onRestart}>Restart</button>
    </div>
  );
};

export default Strike;
