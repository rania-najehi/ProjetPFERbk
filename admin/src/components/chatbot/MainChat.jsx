import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext,
} from "react";

import moment from "moment";
import axios from "axios";
import ChatList from "./ChatList.jsx";
import ChatMessages from "./ChatMessages.jsx";
import { SocketContext } from "../../context/socket.jsx";

import { Context } from "../../main.jsx";
import useFileUpload from "../../helpers/fileUploader.jsx";
import "./chat.css";
const MainChat = () => {
  const { token, setToken } = useContext(Context);

  const { chatSocket } = useContext(SocketContext);
  const { handleFileChangeSocket, handleSubmitFile, fileSocket } =
    useFileUpload(chatSocket);
  const [user, setUser] = useState({});
  const [uploader, setUploader] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [filePreview, setFilePreview] = useState({ file: null, type: "text" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [enableButton, setEnable] = useState(false);
  const [typingStatus, setTypingStatus] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [selectedChatId, setSelectedChatId] = useState(null);
  const fileInputRef = useRef(null);
  const messageInputRef = useRef(null);
  const messageEndRef = useRef(null);
  const [chats, setChats] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const calculateDuration = (createdAt) => {
    const now = moment();
    const created = moment(createdAt);
    return moment.duration(now.diff(created)).humanize();
  };
  useEffect(() => {
    // Scroll to the bottom of the chat when a new message is added
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);
  useEffect(() => {
    chatSocket.on("connect", () => {
      console.log("Connected", chatSocket.id);
    });
    chatSocket.on("fileUploadResponse", (response) => {
      if (response.success) {
        // alert(response.file.name);
        console.log(
          "upload filec hsdhsdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
          response
        );
        setUploader(response.file.name);
      } else {
        alert("File upload failed");
      }
    });
    // // Fetch initial chat messages and notifications
    // axios
    //   .get("http://localhost:4000/api/v1/chats")
    //   .then((response) => setMessages(response.data))
    //   .catch((error) => console.error(error));

    // axios
    //   .get("http://localhost:3001/api/notifications")
    //   .then((response) => setNotifications(response.data))
    //   .catch((error) => console.error(error));

    // Listen for chat messages
    chatSocket.on("chat_message", (msg) => {
      console.log("received data", msg);
      setChats((prevMessages) => [...prevMessages, msg]);
    });

    chatSocket.on("typing", (data) => {
      setTypingStatus(
        data.isTyping ? `${data.user.firstName} is typing...` : ""
      );
      setIsTyping(data.isTyping);
    });

    // Listen for notifications
    // socket.on("notification", (notification) => {
    //   setNotifications((prevNotifications) => [
    //     ...prevNotifications,
    //     notification,
    //   ]);
    // });

    // Clean up the effect
    return () => {
      chatSocket.off("chat_message");
      chatSocket.off("typing");
      chatSocket.off("fileUploadResponse");
    };
  }, []);
  const getCurrentUser = async () => {
    setLoadingPage(true);
    try {
      const data = await axios.get(
        "http://localhost:4000/api/v1/user/admin/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data.user", data.data.user.rooms);
      setUser(data.data.user);
      setRooms(
        data.data.user.rooms.map((room) => {
          var obj = {};
          obj._id = room._id;
          obj.user = room.users.filter((e) => e._id !== data.data.user._id)[0];
          return obj;
        })
      );
      setLoadingPage(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  const cancelFileUpload = () => {
    setFilePreview({ file: null, type: "text" });
    setSelectedFile(null);
    setEnable(false);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleFileChangeSocket(event);
    console.log("check file:", file);
    if (file.type === "application/pdf") {
      setFilePreview({ file: file, type: file.type });
      setSelectedFile(file);

      setEnable(true);
      return;
    }
    if (file) {
      setFilePreview({ file: URL.createObjectURL(file), type: file.type });
      console.log("Selected file:", file.name);
      setSelectedFile(file);
      setEnable(true);
    }
  };

  const selectChat = async (id) => {
    console.log("id", id);
    chatSocket.off("join");
    setSelectedChatId(id);
    setEnable(false);
    messageInputRef.current.value = "";
    setSelectedFile("");
    setFilePreview({ file: null, type: "text" });
    setLoading(true);
    chatSocket.emit("join", id);
    const data = await axios.get(`http://localhost:4000/api/v1/chat/${id}`);
    setChats(data.data);
    console.log(data.data);
    setLoading(false); // Set loading to false once data is fetched
  };
  const getAllMessagesForOneRooom = async () => {
    try {
      const data = await axios.get(
        `http://localhost:4000/api/v1/chat/${selectedChatId}`
      );
      setChats(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (e) => {
    // setMessage(e.target.value);
    chatSocket.emit("typing", {
      user: user,
      roomId: selectedChatId,
      isTyping: e.target.value.length > 0,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    chatSocket.emit("typing", {
      user: user,
      roomId: selectedChatId,

      isTyping: false,
    });
    const formData = new FormData();
    const text = messageInputRef.current.value;
    if (selectedFile) {
      formData.append("file", selectedFile);
      formData.append("content", text);
      formData.append("userId", user._id);
      formData.append("roomId", selectedChatId);
      formData.append(
        "media",
        selectedFile.type.includes("image") ? "image" : "pdf"
      );
    }
    if (text && !selectedFile) {
      formData.append("file", selectedFile);
      formData.append("content", text);
      formData.append("userId", user._id);
      formData.append("roomId", selectedChatId);
      formData.append("media", "text");
    }
    try {
      console.log("FormData fields:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      const formObject = {};
      formData.forEach((value, key) => {
        formObject[key] = value;
        if (key === "content") {
          formObject["message"] = value;
          if (selectedFile) {
            formObject["message"] = uploader;
          }
        }
      });
      formObject.createdAt = new Date();
      formObject.sender = user;
      chatSocket.emit("chat_message", formObject);

      const sendMessage = await axios.post(
        "http://localhost:4000/api/v1/chat/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("message send", sendMessage.data);
      getAllMessagesForOneRooom();
      messageInputRef.current.value = "";
      setSelectedFile("");
      setFilePreview({ file: null, type: "text" });
      setEnable(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const selectedChat = rooms.find((chat) => chat._id === selectedChatId);
  if (loadingPage) {
    return <div className="loader2"></div>;
  }
  return (
    <div className="container_chat">
      <div className="chat_inbox">
        <ChatList
          rooms={rooms}
          selectedChatId={selectedChatId}
          selectChat={selectChat}
          user={user}
        />
        <ChatMessages
          loading={loading}
          messageEndRef={messageEndRef}
          selectedChatId={selectedChatId}
          isTyping={typingStatus}
          typingStatus={typingStatus}
          enableButton={enableButton}
          handleInputChange={handleInputChange}
          cancelFileUpload={cancelFileUpload}
          filePreview={filePreview}
          user={user}
          handleIconClick={handleIconClick}
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
          messageInputRef={messageInputRef}
          chat={chats}
          handleFormSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export default MainChat;
