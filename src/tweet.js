import "./tweet.css";
import React, {useState} from "react";
import { marked } from "marked";

function ExpandingDiv({ markdownText, sender }) {
  // Function to convert Markdown to HTML and add styling for hashtags
  const getMarkdownHtml = (markdown) => {
    const renderer = new marked.Renderer();

    // Custom renderer for text
    renderer.text = (text) => {
      // Regex to find and wrap hashtags
      const hashtagRegex = /(#\w+)/g;
      const newText = text.replace(
        hashtagRegex,
        '<span class="hashtag">$1</span>'
      );
      return newText;
    };

    return { __html: marked(markdown, { renderer, sanitize: true }) };
  };

  return (
    <div className="tweet">
      <h2>
        {sender}
        <span className="darker"> &#160; @{sender}</span>
      </h2>
      <div
        className="email"
        dangerouslySetInnerHTML={getMarkdownHtml(markdownText)}
      />
    </div>
  );
}
function Tweet({ onMinimize }) {
  const data = [
    {
      id: 101,
      sender: "Alexa",
      heading: "",
      markdownText:
        "Thrilled to announce that our team just won the regional tech innovation award! Hard work truly pays off. #TeamSuccess #Innovation",
    },
    {
      id: 102,
      sender: "Jordan",
      heading: "",
      markdownText:
        "Reflecting on this weeks conference: fantastic discussions and groundbreaking ideas. Cant wait to implement these. #FutureIsNow",
    },
    {
      id: 103,
      sender: "Taylor",
      heading: "",
      markdownText:
        "Big shoutout to our customer support team for handling the recent surge in queries with utmost professionalism. #CustomerFirst",
    },
    {
      id: 104,
      sender: "Riley",
      heading: "",
      markdownText:
        "Just completed a marathon coding session. New features rolling out next week! #DevLife #TechUpdates",
    },
    {
      id: 105,
      sender: "Morgan",
      heading: "",
      markdownText:
        "Dear Community, please be aware of phishing emails pretending to be from our company. Stay safe online! #CyberSecurityAlert",
    },
  ];
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onMouseDown = (e) => {
    setIsDragging(true);
    setPosition({
      ...position,
      startX: e.clientX - position.x,
      startY: e.clientY - position.y,
    });
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      ...position,
      x: e.clientX - position.startX,
      y: e.clientY - position.startY,
    });
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="Tweeter"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: 'absolute',
      }}
      onMouseUp={onMouseUp}
      onMouseMove={isDragging ? onMouseMove : null}
    >
      <header
        className="tweetHeader"
        onMouseDown={onMouseDown}
      >
        Tweeter
        <button className="minimize" onClick={onMinimize}>
          &times;
        </button>
      </header>
      <div className="tweetBody">
      {data.map((item, index) => (
          <ExpandingDiv
            key={item.id}
            heading={item.heading}
            markdownText={item.markdownText}
            sender={item.sender}
          />))}
      </div>
    </div>
  );
}

export default Tweet;


