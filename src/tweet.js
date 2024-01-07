import "./tweet.css";
import React, {useState, useEffect} from "react";
import { marked } from "marked";
import Draggable from "react-draggable";
import { initial, first } from "./data/tweetList";

function ExpandingDiv({ markdownText, sender, tag }) {
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
        <span className="darker"> &#160; {tag}</span>
      </h2>
      <div
        className="email"
        dangerouslySetInnerHTML={getMarkdownHtml(markdownText)}
      />
    </div>
  );
}
function Tweet({ onMinimize, isMinimized }) {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem('tweets')) || initial
  );

  useEffect(() => {
    localStorage.setItem('tweets', JSON.stringify(data));
  }, [data]);

  const notificationPop = () => {
    const sound = new Audio('/tweet.wav'); // Path to your sound file
    sound.play();
  };

  const loadMoreData = (extraData) => {
    extraData.forEach((item, index) => {
      setTimeout(() => {
        setData((currentData) => {
          // Check if the item is already in currentData
          if (!currentData.some(existingItem => existingItem.id === item.id)) {
            return [...currentData, item];
          }
          return currentData;
        });
        notificationPop();
      }, index * 500); // 1000 milliseconds delay for each item
    });
  };
  
  const handleMore = (index) => {
    let toBeAppended = []
    if(index === 1){
      toBeAppended = first
    }
    else {
      toBeAppended = []
    }
    loadMoreData(toBeAppended);
  }

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3001/events');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
      handleMore(data.currentQuestionIndex)
    };

    return () => {
      eventSource.close();
    };
  });

 


  return (
    <Draggable handle="header " defaultPosition={{ x: 0, y: 0 }}>
      <div className="Tweeter" style={{ display: isMinimized ? 'none' : 'block' }}>
        <header className="tweetHeader">
          Tweeter
          <button className="minimize" onClick={onMinimize}>
            &times;
          </button>
        </header>
        <div className="tweetBody">
          {data.toReversed().map((item, index) => ( //to reversed so that new tweets are loaded at the top
            <ExpandingDiv
              key={item.id}
              heading={item.heading}
              markdownText={item.markdownText}
              sender={item.sender}
              tag={item.tag}
            />
          ))}
        </div>
      
      </div>
    </Draggable>
  );
}

export default Tweet;
