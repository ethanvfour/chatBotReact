import { useState } from "react";

function ChatArea({ setter }) {
  const [textInChat, setText] = useState("");

  const handleMsgSubmit = (e) => {
    e.preventDefault();
    setter(textInChat);
  };

  return (
    <form onSubmit={handleMsgSubmit}>
      <input
        type="textarea"
        value={textInChat}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatArea;
