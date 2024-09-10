import React from "react";

const ChatList = ({ rooms, selectChat, user, selectedChatId }) => {
  return (
    <aside className="aside_chat">
      {console.log("rooomqqqqq", rooms)}
      <ul id="chat-list">
        {rooms.map((chat) => {
          return (
            <li
              className={`chat-item ${
                selectedChatId === chat._id ? "selected" : ""
              }`}
              key={chat._id}
              onClick={() => selectChat(chat._id, chat.user)}
            >
              <img
                className="avatar"
                src={chat.user.studentAvatar}
                alt={chat.user._id}
              />
              <p className="username">{chat.user.firstName}</p>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default ChatList;
