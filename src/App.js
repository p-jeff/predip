import "./App.css";
import React, { useState } from "react";

function ExpandingDiv({ heading, text }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewText = text.split(' ').slice(0, 5).join(' ') + '...';

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={isExpanded ? "expanded" : "collapsed"} 
      onClick={!isExpanded ? handleClick : undefined} // Prevent toggle when expanded
    >
      {isExpanded && (
        <span className="close-btn" onClick={handleClick}>
          &times;
        </span>
      )}
      <h3>{heading}</h3>
      <p>{isExpanded ? text : previewText}</p>
    </div>
  );
}

function App() {
  const data = [
    { heading: "Concerns Regarding Meeting Shareholder Expectations in the Ethics Department", text: "Dear Ethics Department Team,I hope this message finds you well. I am writing to express some concerns that have recently come to my attention. It has been observed that the department's output has not been aligning with the established goals, a situation that is causing significant dissatisfaction among our shareholders. This misalignment not only impacts our department's performance but also affects the company's reputation and stakeholder confidence. I would appreciate it if we could urgently address these issues, ensuring our practices align with both our internal standards and shareholder expectations. Your immediate attention and action in improving our output and meeting our goals are crucial. Thank you for your understanding and cooperation in this matter. Best regards,[Your Name]" },
    { heading: "Heading 2", text: "Text for heading 2..." },
    // Add more objects for each heading and text
  ];

  return (
    <div className="App">
      <header>Mail</header>
      <div className="mailBody">
        {data.map((item, index) => (
          <ExpandingDiv key={index} heading={item.heading} text={item.text} />
        ))}
      </div>
    </div>
  );
}

export default App;
