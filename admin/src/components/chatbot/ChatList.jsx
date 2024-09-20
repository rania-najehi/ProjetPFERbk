import React from "react";
import {
  Grid,
  TextField,
  Pagination,
  Box,
  Typography,
  Avatar,
} from "@mui/material";

const ChatList = ({ rooms, selectChat, user, selectedChatId }) => {
  return (
    <aside className="aside_chat">
      <Box
        padding={1}
        minHeight={100}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Avatar
          alt="Avatar Preview"
          src={`http://localhost:4000/uploads/${user.studentAvatar}`}
          sx={{ width: 70, height: 70 }}
        />
        <Typography variant="h6" color="white" component="h5">
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
