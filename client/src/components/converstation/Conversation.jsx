import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser, typing }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const friendId = conversation.members.find((x) => x !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation, currentUser]);

  useEffect(() => {
    console.log("Typing use effect", typing);
  }, [typing]);
  return (
    <div className="conversation">
      <img
        src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
        alt=""
        className="conversationImg"
      />
      <div className="typingNameBlock">
        <div className="conversationName">{user?.username}</div>
        {typing?.text &&
          typing?.receiverId === currentUser._id &&
          conversation._id === typing.conversationId && (
            <div className="typingText">is typing...</div>
          )}
      </div>
    </div>
  );
}
