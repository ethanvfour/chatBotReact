import { useState } from "react";
import "./App.css";
import ChatArea from "./components/ChatArea";
import ChatBox from "./components/ChatBox";

function App() {
  const [msg, setMsg] = useState("");

  return (
    <div id="Screen">
      <h1 id="Title">Chat Bot!</h1>
      <div id="temp">
        <div id="Chat-Talking">
          <ChatBox newMsg={msg}/>
        </div>
        <div id="Chat-Area">
          <ChatArea setter={setMsg}/>
        </div>
      </div>
    </div>
  );
}

export default App;
