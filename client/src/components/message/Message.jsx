import "./message.css";
import { format } from "timeago.js";
export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8KPcYRT4vymoaMinR9-v9ITeekLrELdiKFMc2Z22LNqVksweSsLZoF0lEcxZmk9txtHE&usqp=CAU"
          alt=""
          className="messageImg"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
