import React, { useState } from 'react';
import './index.css';
import Mail from './Mail';
import Tweet from './tweet';
import AIApp from './AIApp';

const Desktop = () => {
    const [isTweetMinimized, setTweetMinimized] = useState(false);
    const [isMailMinimized, setMailMinimized] = useState(false);
    const [isAIAppMinimized, setAIAppMinimized] = useState(false);
  
    // Toggle functions
    const toggleTweet = () => setTweetMinimized(!isTweetMinimized);
    const toggleMail = () => setMailMinimized(!isMailMinimized);
    const toggleAIApp = () => setAIAppMinimized(!isAIAppMinimized);
  
    return (
      <>
        {isTweetMinimized ? <Icon name="Tweeter" onClick={toggleTweet} /> : <Tweet onMinimize={toggleTweet} />}
        {isMailMinimized ? <Icon name="mail" onClick={toggleMail} /> : <Mail onMinimize={toggleMail} />}
        {isAIAppMinimized ? <Icon name="aiapp" onClick={toggleAIApp} /> : <AIApp onMinimize={toggleAIApp} />}
      </>
    );
  };
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
  
  const Icon = ({ name, onClick }) => {
    return <div onClick={onClick}>{name}</div>;
  };