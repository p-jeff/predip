import Window from "./Window";
import React, { useEffect, useState } from "react";

const EthicsDashBody = ({ event }) => {
    const [ethScore, setEthScore] = useState(50);
    const [legalBot, setLegalBot] = useState(73);
    const [digitaVida, setDigitaVida] = useState(95);

    function generateRandomWithinRange(originalNumber) {
        const variance = Math.floor(Math.random() * 11) - 5; // Generates a number between -5 and 5
        return originalNumber + variance;
    }

    useEffect(() => {
        if (event) {
            console.log(event);
            const mappedValue = Math.round((event.stockValue - (-10)) * (10 - (-10)) / (10 - (-10))) * 1;
            setEthScore(ethScore - mappedValue);
        }
        setDigitaVida(generateRandomWithinRange(digitaVida));
        setLegalBot(generateRandomWithinRange(legalBot));
    }, [event]);

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

const EthicsDash = ({ onMinimize, isMinimized, event }) => {
  return (
    <Window
      title="Ethics Dashboard"
      onMinimize={onMinimize}
      isMinimized={isMinimized}
      content={<EthicsDashBody event={event} />}
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
