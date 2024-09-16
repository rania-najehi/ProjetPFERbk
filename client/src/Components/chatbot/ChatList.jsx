import React from "react";
import { Grid, TextField, Pagination, Box, Typography } from "@mui/material";

const ChatList = ({ rooms, selectChat, user, selectedChatId }) => {
  return (
    <aside className="aside_chat">
      <Box>
        <Typography variant="h3" color="white" padding={3} component="h5">
          Welcome {user.firstName}
        </Typography>
      </Box>
      {/* {console.log("rooomqqqqq", rooms)} */}
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
