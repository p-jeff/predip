import "./notes.css";
import Window from "./Window";

import React, { useState, useEffect } from "react";

const ChecklistComponent = ({dailyTasksCompleted}) => {
  const [items, setItems] = useState([
    "Introduce myself to Olivia",
    "Check Instructions",
    "Explore all apps",
  ]);
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
    dailyTasksCompleted(false)
  };

  const onAllChecked = () => {
    console.log("All items are checked!");
    dailyTasksCompleted(true)
  };

  return (
    <div>
      <h2>Todays To-Do:</h2>
      <br />
      <ul>
        {items.map((item) => (
          <li key={item} style={{padding: '5px'}}>
            <input
              type="checkbox"
              checked={checkedItems[item] || false}
              onChange={() => handleCheck(item)}
              style={{marginRight: '5px'}}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Notes = ({ isMinimized, onMinimize, dailyTasksCompleted}) => {
  return (
    <Window
      isMinimized={isMinimized}
      initialSize={{
        width: 250,
        height: 300,
      }}
      initialPosition={{ x: 20, y: 500 }}
      content={<ChecklistComponent dailyTasksCompleted={dailyTasksCompleted}/>}
      tag={"note"}
      name={"Notes"}
      onMinimize={onMinimize}
    />
  );
};

export default Notes;
