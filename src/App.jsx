import { useEffect, useRef, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import React from "react";
import * as helperFunc from "./scripts/helperFunctions";

const thinkingTime = 1000; // to pretend getting a response, for now
const getMsg = 500;
const botName = "ChatBot";

function App() {
  const btnElement = useRef(0);
  const [userName, setUserName] = useState("");
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    {
      msg: "Hey! I'm ChatBot!",
      bot: true,
      user: botName,
    },
  ]);

  const getBotResponse = async () =>
    fetch("/assets/index.json")
      .then((d) => d.json())
      .then((json) => {
        let category = Object.keys(json);
        category = category[helperFunc.getRandomNum(0, category.length)];
        return json[category][
          helperFunc.getRandomNum(0, json[category].length)
        ];
      })
      .catch((e) => {
        console.log("Error getting message");
        console.log(e);
        return "Sorry, could not understand you...";
      });

  useEffect(() => {
    //used for event listerner
    const keyEnter = document
      .getElementById("chat-msg")
      .addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          btnElement.current.click();
        }
      });

    return () => {
      removeEventListener("keydown", keyEnter);
    };
  }, []);

  useEffect(() => {
    setUserName("Guest"); //for now, later on, will add log in feature
  }, [userName]);

  const handleSendMsg = async (e) => {
    if (msg.trim() === "") return;

    e.target.disabled = true;
    setMessages((m) => [...m, { msg: msg, bot: false, user: userName }]);
    setMsg("");

    await helperFunc.waitThisLong(getMsg);
    setMessages((m) => [
      ...m,
      { msg: "Thinking...", bot: true, user: botName },
    ]);

    await helperFunc.waitThisLong(thinkingTime);
    const botMessage = await getBotResponse();
    setMessages((m) => [...m.slice(0, -1), {msg: botMessage, bot : true, user : botName}]);

    e.target.disabled = false;
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
                <Chat msg={message.msg} bot={message.bot} name={message.user} />
              </React.Fragment>
            );
          })}
        </div>
        <div id="Chat-Area">
          <textarea
            placeholder="Type something..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            id="chat-msg"
          ></textarea>
          <button onClick={handleSendMsg} id="chat-btn" ref={btnElement}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
