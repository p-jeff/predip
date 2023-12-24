import "./tweet.css";
import React from "react";
import { marked } from "marked";

function ExpandingDiv({  markdownText, sender }) {

  // Render the first few words as a preview

  const getMarkdownHtml = (markdown) => {
    return { __html: marked(markdown, { sanitize: true }) };
  };

  return (
    <div className="tweet">
      <h2>{sender}</h2>
        <div
          className="email"
          dangerouslySetInnerHTML={getMarkdownHtml(markdownText)}
        />
    </div>
  );
}

function Tweet() {
  const data =[
    {
      "id": 101,
      "sender": "Alexa",
      "heading": "",
      "markdownText": "Thrilled to announce that our team just won the regional tech innovation award! Hard work truly pays off. #TeamSuccess #Innovation"
    },
    {
      "id": 102,
      "sender": "Jordan",
      "heading": "",
      "markdownText": "Reflecting on this week's conference: fantastic discussions and groundbreaking ideas. Can't wait to implement these. #FutureIsNow"
    },
    {
      "id": 103,
      "sender": "Taylor",
      "heading": "",
      "markdownText": "Big shoutout to our customer support team for handling the recent surge in queries with utmost professionalism. #CustomerFirst"
    },
    {
      "id": 104,
      "sender": "Riley",
      "heading": "",
      "markdownText": "Just completed a marathon coding session. New features rolling out next week! #DevLife #TechUpdates"
    },
    {
      "id": 105,
      "sender": "Morgan",
      "heading": "",
      "markdownText": "Dear Community, please be aware of phishing emails pretending to be from our company. Stay safe online! #CyberSecurityAlert"
    }
  ];

  return (
    <div className="Tweeter">
      <header className="tweetHeader">Tweeter</header>
      <div className="tweetBody">
        {data.map((item, index) => (
          <ExpandingDiv
            key={item.id}
            heading={item.heading}
            markdownText={item.markdownText}
            sender={item.sender}
          />
        ))}
      </div>
    </div>
  );
}

export default Tweet;
