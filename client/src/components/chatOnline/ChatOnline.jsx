import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({
  onlineUsers,
  currentUserId,
  setCurrentChat,
}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      try {
        console.log("currentUserId", currentUserId);
        const res = await axios.get(
          process.env.REACT_APP_API_URI + "/users/friends/" + currentUserId
        );
        console.log("friends khan", res);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentUserId]);
  useEffect(() => {
    setOnlineFriends(friends.filter((x) => onlineUsers.includes(x._id)));
  }, [friends, onlineUsers]);

  const clickHandler = async (user) => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_URI +
          `/conversations/find/${currentUserId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="chatOnline">
      {onlineFriends?.map((f, i) => (
        <div
          key={i}
          className="chatOnlineFriend"
          onClick={() => clickHandler(f)}
        >
          <div className="chatOnlineImageContainer">
            <img
              className="chatOnlineImg"
              src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{f.username}</span>
        </div>
      ))}
    </div>
  );
}
