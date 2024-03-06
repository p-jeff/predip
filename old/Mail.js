
import React, { useState, useEffect } from "react";
import { marked } from "marked";
import Draggable from "react-draggable";
import mails from "../src/data/mailList";
import { notificationPop } from "../src/boilerplate";
import { Resizable } from "re-resizable";

let isFirstRender = true;

function MailEntry({ heading, markdownText, onDelete, sender }) {
  const [isExpanded, setIsExpanded] = useState(isFirstRender);

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
    }
  }, []);

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

function Mail({ onMinimize, isMinimized, isStrike, strikeFile, position }) {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem("mails")) || mails.level0.always
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

  const handleMore = (data) => {
    loadMoreData(mails[data.currentLevelId]?.[data.currentDecisionId]);
    loadMoreData(mails[data.currentLevelId]?.always);
  };

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/events");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleMore(data);
    };

    return () => {
      eventSource.close();
    };
  }, []) ;

  useEffect(() => {
    if (isStrike) {
      setData(strikeFile);
    }
  }, [isStrike]);
  
  return (
    <Draggable handle="header" defaultPosition={position}>
      <div className="Mail" style={{ display: isMinimized ? "none" : "block" }}>
        <header className="mailHeader">
          <i className="bi bi-envelope-heart headerIcon" style={{color:"red"}}/>
          Mail
          <button className="minimize" onClick={onMinimize}>
            &times;
          </button>
        </header>
        <Resizable
          defaultSize={{
            width: 700,
            height: 500,
          }}
        >
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
