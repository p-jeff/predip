import "./tweet.css";
import React, {useState} from "react";
import { marked } from "marked";
import Draggable from "react-draggable";

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
function Tweet({ onMinimize }) {
  const initialData = [
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

  const extraData = [
    {
      id: 201,
      sender: "Emma Clark",
      tag: "@LegalTechGuru",
      heading: "",
      markdownText:
        "AI in the courtroom? It is about time we embraced technology to make judicial processes faster and more efficient. #FutureOfLaw #AIJustice",
    },
    {
      id: 202,
      sender: "David Kim",
      tag: "@HumanRightsWatch",
      heading: "",
      markdownText:
        "Relying on AI for sentencing raises serious ethical concerns. Can we trust algorithms to understand the nuances of justice? #HumanRights #AIEthics",
    },
    {
      id: 203,
      sender: "Sophia Martinez",
      tag: "@TechPolicyExpert",
      heading: "",
      markdownText:
        "While AI can aid in lawmaking, let us not forget the importance of human oversight. Technology should assist, not replace. #TechPolicy #HumanTouch",
    },
    {
      id: 204,
      sender: "Lucas Johnson",
      tag: "@CyberSkeptic",
      heading: "",
      markdownText:
        "AI in judicial sentencing? Sounds like a dystopian novel. We need more transparency before even considering such a move. #AItransparency #TechDystopia",
    },
    {
      id: 205,
      sender: "Isabella Garcia",
      tag: "@JusticeInnovator",
      heading: "",
      markdownText:
        "Incorporating AI in lawmaking could significantly reduce biases inherent in human decision-making. #InnovativeJustice #AIFairness",
    },
    {
      id: 206,
      sender: "Michael Brown",
      tag: "@CivilLibertiesUnion",
      heading: "",
      markdownText:
        "AI in sentencing threatens to strip away the human element essential for justice. We must proceed with caution. #CivilRights #AIConcerns",
    },
    {
      id: 207,
      sender: "Olivia Wilson",
      tag: "@DigitalFuturist",
      heading: "",
      markdownText:
        "Imagine a legal system powered by AI - efficient, unbiased, and swift. The future is now! #AIRevolution #LegalTech",
    },
    {
      id: 208,
      sender: "Ethan Martinez",
      tag: "@EthicalTechie",
      heading: "",
      markdownText:
        "We must ensure AI in law does not perpetuate existing biases. Ethical considerations are key. #EthicalAI #JusticeTech",
    },
  ];

  const [data, setData] = useState(initialData);

  const notificationPop = () => {
    const sound = new Audio('/tweet.wav'); // Path to your sound file
    sound.play();
  };

  const loadMoreData = () => {
    extraData.forEach((item, index) => {
      setTimeout(() => {
        setData((currentData) => [...currentData, item]);
        notificationPop();
      }, index * 1000); // 1000 milliseconds delay for each item
    });
  };


  return (
    <Draggable handle="header " defaultPosition={{ x: 0, y: 0 }}>
      <div className="Tweeter">
        <header className="tweetHeader">
          Tweeter
          <button className="minimize" onClick={onMinimize}>
            &times;
          </button>
          <button onClick={loadMoreData}>Load More</button>
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
