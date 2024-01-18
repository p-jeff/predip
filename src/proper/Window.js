import React from "react";
import "./window.css";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

const Window = ({isMinimized, onMinimize, content, name, tag, initialSize, initialPosition}) => {
  return (
    <Draggable handle="header " defaultPosition={initialPosition}>
      <div
        className={`window ${tag}`}
        style={{ display: isMinimized === true ? "none" : "block" }}
      >
        <header >
         {name}
          <button className="minimize" onClick={onMinimize}>&times;</button>
        </header>
        <Resizable
          defaultSize={initialSize}
          enable={{
            top: false,
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: true,
            bottomLeft: true,
            topLeft: false,
          }}
        >
          <div className="content">{content}</div>
        </Resizable>
      </div>
    </Draggable>
  );
};

export default Window;
