import "./Mail.css";
import React, { useState } from "react";
import { marked } from "marked";
import Draggable from 'react-draggable';


function ExpandingDiv({ heading, markdownText, onDelete, sender }) {
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

function Mail({onMinimize, isMinimized}) {
  const [data, setData] = useState([
    {
      id: 1,
      heading: "Heading 1",
      sender: "May Sunning",
      markdownText:
        "Dear Ethics Department Team, \n\nI hope this message finds you well. I am writing to express some concerns that have recently come to my attention. It has been observed that the department's output has not been aligning with the established goals, a situation that is causing significant dissatisfaction among our shareholders. This misalignment not only impacts our department's performance but also affects the company's reputation and stakeholder confidence. I would appreciate it if we could urgently address these issues, ensuring our practices align with both our internal standards and shareholder expectations. Your immediate attention and action in improving our output and meeting our goals are crucial. \n\nThank you for your understanding and cooperation in this matter. \n\nBest regards,\nJohannes",
    },
    {
      id: 2,
      heading: "Immediate Action Required for Ethics Department Performance",
      sender: "May June",
      markdownText:
        "Dear Ethics Department Team,\n\nI am reaching out with an urgent matter concerning our recent departmental performance reviews. It has come to our notice that the current output levels are not meeting the expectations set forth by our shareholders. This gap in performance is becoming a critical issue that demands immediate attention and rectification. I urge the team to convene and develop a strategic plan to elevate our output to the expected standards promptly. Failure to address these concerns may have significant repercussions for our department and the company at large. Your prompt action and cooperation in this matter are highly appreciated.\n\nSincerely,\n[Your Name]",
    },
    {
      id: 3,
      heading: "Immediate Action Required for Ethics Department Performance",
      sender: "May July",
      markdownText:
        "Dear Ethics Department Team,\n\nI am reaching out with an urgent matter concerning our recent departmental performance reviews. It has come to our notice that the current output levels are not meeting the expectations set forth by our shareholders. This gap in performance is becoming a critical issue that demands immediate attention and rectification. I urge the team to convene and develop a strategic plan to elevate our output to the expected standards promptly. Failure to address these concerns may have significant repercussions for our department and the company at large. Your prompt action and cooperation in this matter are highly appreciated.\n\nSincerely,\n[Your Name]",
    },
    // ... other data entries ...
  ]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <Draggable handle="header"  defaultPosition={{x: 0, y: 0}}>
      <div className="Mail" style={{ display: isMinimized ? 'none' : 'block' }}>
        <header>
          Mail
          <button className="minimize" onClick={onMinimize}>
            &times;
          </button>
        </header>
        <div className="mailBody">
          {data.toReversed().map((item, index) => ( // to reversed so that things are added at the top
            <ExpandingDiv
              key={item.id}
              heading={item.heading}
              markdownText={item.markdownText}
              onDelete={() => handleDelete(item.id)}
              sender={item.sender}
            />
          ))}
        </div>
      </div>
    </Draggable>
  );
}

export default Mail;
