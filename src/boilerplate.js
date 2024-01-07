const notificationPop = (link) => {
    const sound = new Audio(link); // Path to your sound file
    sound.play();
  };

  export {notificationPop}