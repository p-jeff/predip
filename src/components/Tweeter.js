import "../styling/tweet.css";
import React, { useState, useEffect } from "react";
import { marked } from "marked";
import "../data/tweetList";
import tweets from "../data/tweetList";
import Window from "../Window";

function TweetEntry({ markdownText, sender, tag }) {
 

  // Function to convert Markdown to HTML and add styling for hashtags
  const getMarkdownHtml = (markdown) => {
    const renderer = new marked.Renderer();
    // Custom renderer for text
    renderer.text = (text) => {
      // Regex to find and wrap hashtags followed by a letter
      const hashtagRegex = /(#\w*[a-zA-Z]\w*)/g;
      const newText = text.replace(
        hashtagRegex,
        '<span class="hashtag">$1</span>'
      );

      // Regex to find and wrap words after an @ symbol
      const mentionRegex = /(@\w+)/g;
      const finalText = newText.replace(
        mentionRegex,
        '<span class="hashtag">$1</span>'
      );

      return finalText;
    };

    return { __html: marked(markdown, { renderer, sanitize: false }) };
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

const TweetBody = () => {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem("tweets")) || tweets.level0.always
  );

  const sound = new Audio();
  sound.src = "./tweet.wav";
  sound.preload = "auto";

  useEffect(() => {
    localStorage.setItem("tweets", JSON.stringify(data));
  }, [data]);

  const loadMoreData = (extraData) => {
    extraData.forEach((item, index) => {
      setTimeout(() => {
        setData((currentData) => {
          // Check if the item is already in currentData
          if (
            !currentData.some((existingItem) => existingItem.id === item.id)
          ) {
    
            sound.play();
            return [...currentData, item];
          }
          return currentData;
        });
      }, index * 200); // 1000 milliseconds delay for each item
    });
  };

  const handleMore = (data) => {
    console.log(tweets[data.currentLevelId]?.always);
    loadMoreData(tweets[data.currentLevelId]?.[data.currentDecisionId]);
    loadMoreData(tweets[data.currentLevelId]?.always);
  };

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/events");

    eventSource.onmessage = (event) => {
      console.log("Tweet has received a message");
      const data = JSON.parse(event.data);

      setTimeout(() => {
        handleMore(data);
      }, 2000);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="tweetBody">
      {data.toReversed().map(
        (
          item,
          index //to reversed so that new tweets are loaded at the top
        ) => (
          <TweetEntry
            key={item.id}
            heading={item.heading}
            markdownText={item.markdownText}
            sender={item.sender}
            tag={item.tag}
          />
        )
      )}
    </div>
  );
};

const Tweeter = ({ onMinimize, isMinimized }) => {
  return (
    <Window
      isMinimized={isMinimized}
      onMinimize={onMinimize}
      content={<TweetBody />}
      name={"Y Message Board"}
      tag="tweeter"
      initialSize={{
        width: 500,
        height: 300,
      }}
      initialPosition={{ x: 200, y: 20 }}
    />
  );
};

export default Tweeter;
