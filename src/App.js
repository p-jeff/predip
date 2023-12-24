import "./App.css";
import React, { useState } from "react";
import { marked } from "marked";

function ExpandingDiv({ heading, markdownText }) {
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
      <h2>{heading}</h2>
      {isExpanded ? (
        <div
          className="email"
          dangerouslySetInnerHTML={getMarkdownHtml(markdownText)}
        />
      ) : (
        <p>{previewText}</p>
      )}
      {isExpanded && (
        <span className="close-btn" onClick={handleClick}>
          &times;
        </span>
      )}
    </div>
  );
}

function App() {
  const data = [
    {
      heading: "Heading 1",
      markdownText:
        "Dear Ethics Department Team, \n\nI hope this message finds you well. I am writing to express some concerns that have recently come to my attention. It has been observed that the department's output has not been aligning with the established goals, a situation that is causing significant dissatisfaction among our shareholders. This misalignment not only impacts our department's performance but also affects the company's reputation and stakeholder confidence. I would appreciate it if we could urgently address these issues, ensuring our practices align with both our internal standards and shareholder expectations. Your immediate attention and action in improving our output and meeting our goals are crucial. \n\nThank you for your understanding and cooperation in this matter. \n\nBest regards,\nJohannes",
    },
    // ... other data entries ...
  ];

  return (
    <div className="App">
      <header>Mail</header>
      <div className="mailBody">
        {data.map((item, index) => (
          <ExpandingDiv
            key={index}
            heading={item.heading}
            markdownText={item.markdownText}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
