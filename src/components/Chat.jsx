import "./Chat.css";

function Chat(props) {
  return (
    <div className={`chatMsg ${!props.bot ? "person" : ""}`}>
      {/* only name for now */}
      <div id="Image_Portion">
        {props.name}
      </div>
      <hr></hr>
      <br></br>
      {props.msg}
    </div>
  );
}

export default Chat;
