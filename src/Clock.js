import React, { useState, useEffect } from 'react';

const Clock = () => {
  // State to store the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Function to update the time
    const tick = () => {
      setCurrentTime(new Date());
    };

    // Set up an interval to update the time every minute
    const timerID = setInterval(tick, 60000); // Update every minute

    // Clean up the interval on unmount
    return () => {
      clearInterval(timerID);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Format the hours and minutes
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');

  return <div className='clock'>{`${hours}:${minutes}`}</div>;
};

export default Clock;
