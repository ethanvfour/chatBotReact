import { useEffect, useState } from "react";
import Chat from "./Chat";
import "./Chat.css";

function ChatBox() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages((prev) => [...prev, "Hey!, I'm ChatBot!"]);
    console.log("hi");
  }, []);

  return (
    <>
      {messages.map((curr, i) => {
        return <Chat key={i} msg={curr} />;
      })}
    </>
  );
}

export default ChatBox;
