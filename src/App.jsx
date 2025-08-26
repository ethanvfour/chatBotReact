import { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import React from "react";
import * as helperFunc from "./scripts/helperFunctions";

const waitTime = 1000;// to pretend getting a response, for now

function App() {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    {
      msg: "Hey! I'm ChatBot!",
      bot: true,
    },
  ]);

  const handleSendMsg = async (e) => {
    e.target.disabled = true;

    await helperFunc.waitThisLong(waitTime);

    setMessages((m) => [...m, { msg: msg, bot: false }]);
    setMsg("");
  };

  return (
    <div id="Screen">
      <h1
        id="Title"
        onClick={() => {
          window.location.reload();
        }}
      >
        Chat Bot!
      </h1>
      <div id="temp">
        <div id="Chat-Talking">
          {messages.map((message, index) => {
            return (
              <React.Fragment key={index}>
                <Chat msg={message.msg} />
              </React.Fragment>
            );
          })}
        </div>
        <div id="Chat-Area">
          <input
            type="text"
            placeholder="Type something..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button onClick={handleSendMsg}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
