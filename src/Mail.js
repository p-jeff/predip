import "./Mail.css";
import React, { useState, useEffect } from "react";
import { marked } from "marked";
import Draggable from "react-draggable";
import { mailInitial, further } from "./data/mailList";
import { notificationPop } from "./boilerplate";
import { Resizable } from "re-resizable";

function MailEntry({ heading, markdownText, onDelete, sender }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Render the first few words as a preview
  const previewText = markdownText.split(" ").slice(0, 5).join(" ") + "...";

  const getMarkdownHtml = (markdown) => {
    return { __html: marked(markdown, { sanitize: true }) };
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={isExpanded ? "expanded" : "collapsed"}
      onClick={!isExpanded ? handleClick : undefined}
    >
      <h2 className="sender">{sender}</h2>
      <h2>{heading}</h2>
      {isExpanded ? (
        <div
          className="email"
          dangerouslySetInnerHTML={getMarkdownHtml(markdownText)}
        />
      ) : (
        <>
          <button className="delete-btn" onClick={onDelete}>
            &#x1F5D1;
          </button>
          <p>{previewText}</p>
        </>
      )}
      {isExpanded && (
        <>
          <span className="close-btn" onClick={handleClick}>
            &times;
          </span>
        </>
      )}
    </div>
  );
}

function Mail({ onMinimize, isMinimized }) {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem("mails")) || mailInitial
  );

  useEffect(() => {
    localStorage.setItem("mails", JSON.stringify(data));
  }, [data]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const loadMoreData = (extraData) => {
    extraData.forEach((item, index) => {
      setTimeout(() => {
        setData((currentData) => {
          // Check if the item is already in currentData
          if (
            !currentData.some((existingItem) => existingItem.id === item.id)
          ) {
            notificationPop("./mail.wav");
            return [...currentData, item];
          }
          return currentData;
        });
      }, index * 700); // 1000 milliseconds delay for each item
    });
  };

  const handleMore = (index) => {
    let toBeAppended = [];
    if (index === 1) {
      toBeAppended = further;
    } else {
      toBeAppended = [];
    }
    loadMoreData(toBeAppended);
  };

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/events");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      handleMore(data.currentQuestionIndex);
    };

    return () => {
      eventSource.close();
    };
  });

  return (
    <Draggable handle="header" defaultPosition={{ x: 0, y: 0 }}>
      <div className="Mail" style={{ display: isMinimized ? "none" : "block" }}>
        <header className="mailHeader">
          Mail
          <button className="minimize" onClick={onMinimize}>
            &times;
          </button>
        </header>
        <Resizable>
          <div className="mailBody">
            {data.toReversed().map(
              (
                item,
                index // to reversed so that things are added at the top
              ) => (
                <MailEntry
                  key={item.id}
                  heading={item.heading}
                  markdownText={item.markdownText}
                  onDelete={() => handleDelete(item.id)}
                  sender={item.sender}
                />
              )
            )}
          </div>
        </Resizable>
      </div>
    </Draggable>
  );
}

export default Mail;
