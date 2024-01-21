import Window from "./Window";
import React, { useEffect, useState } from "react";
import { notificationPop } from "../boilerplate";
import "./ethics.css";

const EthicsDashBody = ({ event, isMinimized }) => {
  const [ethScore, setEthScore] = useState(50);
  const [legalBot, setLegalBot] = useState(73);
  const [digitaVida, setDigitaVida] = useState(95);
  const [blinking, setBlinking] = useState(false);

  function generateRandomWithinRange(originalNumber) {
    const variance = Math.floor(Math.random() * 11) - 5; // Generates a number between -5 and 5
    return originalNumber + variance;
  }

  function processNumber(num) {
    if (Math.abs(num) > 5) {
        return Math.sign(num) * 7;
    }
    return num;
}


  useEffect(() => {
    if (event) {
      console.log(event);
      const mappedValue = processNumber(event.stockValue);
      console.log(mappedValue);
      const newEthScore = ethScore - mappedValue;

      if (!isMinimized && newEthScore > ethScore) {
        setBlinking(true);
        setTimeout(() => {
          notificationPop("cheer.wav");
        }, 500);
        setTimeout(() => {
          setBlinking(false);
        }, 3000);
      } else if (!isMinimized) {
        setBlinking(true);
        setTimeout(() => {
          notificationPop("boo.wav");
        }, 500);
        setTimeout(() => {
          setBlinking(false);
        }, 3000);
      }

      setEthScore(newEthScore);
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
        <span className={blinking ? "blinking" : ""}> Ethico: {ethScore} </span>
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
      content={<EthicsDashBody event={event} isMinimized={isMinimized} />}
      name={"DCP Watchdog"}
      tag={"ethics"}
      initialSize={{
        width: 320,
        height: 160,
      }}
      initialPosition={{ x: 1400, y: 50 }}
    />
  );
};

export default EthicsDash;
