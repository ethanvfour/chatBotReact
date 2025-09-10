import { useEffect, useRef, useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import React from "react";
import * as helperFunc from "./scripts/helperFunctions";
import {getTone} from "./scripts/exampleBackend";

const thinkingTime = 1000; // to pretend getting a response, for now
const getMsg = 500;
const botName = "ChatBot";

function App() {
  const btnElement = useRef(0);
  const [userName, setUserName] = useState("Guest");
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    {
      msg: "Hey! I'm ChatBot!",
      bot: true,
      user: botName,
    },
  ]);
  const [responses, setResponses] = useState(null);
  
  useEffect(() => {
    fetch("/assets/index.json")
      .then((d) => d.json())
      .then((data) => setResponses(data))
      .catch((e) => {
        console.log("Error getting message");
        console.log(e);
        setResponses(null);
      });


  }, []);

  const getBotResponse = async () => {
    console.log(responses);
    if (responses === null) return "Sorry, could you say that again?";
    //fallback in case the fetch didnt happen


    const categories = getTone(msg);
    let returner = "";

    categories["msg"].forEach(tone =>
    {
      const category = `${tone}-responses`;
      returner += `${responses[category][
        helperFunc.getRandomNum(0, responses[category].length)
      ]} `
    });

    return returner;
  };

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

    document.title = `Chatting with ${botName}`;

    return () => {
      removeEventListener("keydown", keyEnter);
    };
  }, []);

  const handleSendMsg = async (e) => {
    
    
    if (msg.trim() === "") return;
    e.target.disabled = true;
    setMessages((m) => [...m, { msg: msg, bot: false, user: userName }]);
    const botMessage = await getBotResponse(msg);
    setMsg("");

    await helperFunc.waitThisLong(getMsg);
    setMessages((m) => [
      ...m,
      { msg: "Thinking...", bot: true, user: botName },
    ]);

    await helperFunc.waitThisLong(thinkingTime);
    setMessages((m) => [
      ...m.slice(0, -1),
      { msg: botMessage, bot: true, user: botName },
    ]);

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
          <button onClick={handleSendMsg} 
                  id="chat-btn" 
                  ref={btnElement}
                  disabled={msg.trim() === ""}
                  >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
