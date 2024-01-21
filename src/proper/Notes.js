
import Window from "./Window";
import React, { useState, useEffect } from "react";

const noteList = {
  level0: [
    "Introduce myself to Olivia",
    "Check Instructions",
    "Explore all apps",
  ],
  level1: ["Find out the uses of laws for AI", "Inform on the benefits of AI for lawmaking", "Inform about Legal Bot"],
  level2: ["A", "B"],
  level3: ["A", "B"],
  level4: ["A", "B"],
  level5: ["A", "B"],
};

const NoteBody = ({ dailyTasksCompleted }) => {
  const [items, setItems] = useState(noteList.level0);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    // Check if all items are checked
    if (items.length > 0 && items.every((item) => checkedItems[item])) {
      onAllChecked();
    }
  }, [checkedItems, items]);

  const handleCheck = (item) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const clearChecklist = () => {
    setItems([]);
    setCheckedItems({});
    dailyTasksCompleted(false);
  };

   useEffect(() => {
     const eventSource = new EventSource("http://localhost:3001/events");
     eventSource.onmessage = (event) => {
       const data = JSON.parse(event.data);
       clearChecklist();
       setItems(noteList[data.currentLevelId]);
     };
     return () => {
       eventSource.close();
     };
   }, []);

  const onAllChecked = () => {
    console.log("All items are checked!");
    dailyTasksCompleted(true);
  };

  return (
    <div>
      <h2>Todays To-Do:</h2>
      <br />
      <ul>
        {items.map((item) => (
          <li key={item} style={{ padding: "5px" }}>
            <input
              type="checkbox"
              checked={checkedItems[item] || false}
              onChange={() => handleCheck(item)}
              style={{ marginRight: "5px" }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Notes = ({ isMinimized, onMinimize, dailyTasksCompleted }) => {
  return (
    <Window
      isMinimized={isMinimized}
      initialSize={{
        width: 250,
        height: 300,
      }}
      initialPosition={{ x: 1300, y: 500 }}
      content={<NoteBody dailyTasksCompleted={dailyTasksCompleted} />}
      tag={"note"}
      name={"Notes"}
      onMinimize={onMinimize}
    />
  );
};

export default Notes;
