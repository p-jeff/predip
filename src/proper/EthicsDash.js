import Window from "./Window";
import React, { useEffect, useState } from "react";

const EthicsDashBody = () => {
  const [ethScore, setEthScore] = useState(50);
  const [legalBot, setLegalBot] = useState(73);
  const [digitaVida, setDigitaVida] = useState(95);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/events");
    eventSource.onmessage = (event) => {
      console.log(event);
    };
    return () => {
        eventSource.close();
      };
  }, []);

  return (
    <div>
      Department of Consumer Protection <br />
      <h2>Watchdog responsible AI</h2>
      <br />
      <h3>
        Ethico: {ethScore}
        <br />
        Legal Bot: {legalBot}
        <br />
        DigitaVida: {digitaVida}
      </h3>
    </div>
  );
};

const EthicsDash = ({ onMinimize, isMinimized }) => {
  return (
    <Window
      title="Ethics Dashboard"
      onMinimize={onMinimize}
      isMinimized={isMinimized}
      content={<EthicsDashBody />}
      name={"DCP Watchdog"}
      tag={"ethics"}
      initialSize={{
        width: 250,
        height: 300,
      }}
      initialPosition={{ x: 1300, y: 500 }}
    />
  );
};

export default EthicsDash;
