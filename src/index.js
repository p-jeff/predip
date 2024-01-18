import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Desktop from "./Desktop";
import Notes from "./proper/Notes";

function App() {
  localStorage.clear(); // the App component just insures that local storage is cleared on the initial launch of the App, without triggering through updates int he Desktop component

  return <Desktop />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
