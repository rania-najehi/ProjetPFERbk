import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import PdfPreview from "./pdf.jsx";
import Loading from "./loading.jsx";
import PdfMessage from "./pdf-message.jsx";
// import { byPrefixAndName } from "@awesome.me/kit-KIT_CODE/icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
const ChatMessages = ({
  loading,
  messageEndRef,
  selectedChatId,
  isTyping,
  typingStatus,
  enableButton,
  handleInputChange,
  cancelFileUpload,
  filePreview,
  user,
  chat,
  handleFormSubmit,
  messageInputRef,
  handleIconClick,
  fileInputRef,
  handleFileChange,
}) => {
  const messageWrapRef = useRef(null);
  console.log("file preview", filePreview);
  //   const messageInputRef = useRef(null);
  const calculateDuration = (createdAt) => {
    const now = moment();
    const created = moment(createdAt);
    return moment.duration(now.diff(created)).humanize();
  };

  useEffect(() => {
    if (messageWrapRef.current) {
      messageWrapRef.current.scrollTop = messageWrapRef.current.scrollHeight;
    }
  }, [chat]);
  // const backgroundColor =selectedChatId
  return (
    <main className="main_chat">
      {loading ? (
        <Loading />
      ) : (
        // <div className="init_chat">
        //   <i className="fa fa-inbox"></i>
        //   <h4>Choose a conversation from the left</h4>
        // </div>
        // <div className="loader" style={{ opacity: 0 }}>
        //   <p></p>
        //   <h4>Loading</h4>
        // </div>
        <>
          <div className="message-wrap" id="message-wrap" ref={messageWrapRef}>
            {chat.map((message, index) => {
              return (
                <div
                  ref={messageEndRef}
                  className={
                    message.sender._id === user._id
                      ? "message myMessage fade-in"
                      : "message fade-in"
                  }
                  id={
                    message.media === "image" || message.media === "pdf"
                      ? "removeBg"
                      : ""
                  }
                  key={message._id}
                >
                  <div className="avatar_date">
                    <img
                      className="avatar_chat"
                      src={message.sender.studentAvatar}
                      alt={index}
                    />
                    <p className="chat_date">
                      {calculateDuration(message.createdAt)}
                    </p>
                  </div>
                  {message.media === "text" && (
                    <p className="chat_message">{message.message}</p>
                  )}
                  {message.media === "image" && (
                    <img
                      className="chat_media"
                      src={`http://localhost:4000/uploads/${message.message}`}
                      alt={index}
                    />
                  )}
                  {message.media === "pdf" && (
                    <PdfMessage pdfUrl={message.message} />
                  )}
                </div>
              );
            })}
          </div>
          <div className="footer_chat">
            {isTyping && (
              <div className="typing-container">
                <div className="typing">{typingStatus}</div>
              </div>
            )}
            {filePreview.file && filePreview.type.includes("/pdf") && (
              <PdfPreview
                pdfUrl={filePreview.file}
                cancelFileUpload={cancelFileUpload}
              />
            )}
            {filePreview.file && filePreview.type.includes("image") && (
              <div className="pdf_holder">
                <img
                  className="preview_img"
                  src={filePreview.file}
                  alt="Preview"
                />
                <button className="close-button" onClick={cancelFileUpload}>
                  ×
                </button>
              </div>
            )}
            <form id="chat-form" onSubmit={handleFormSubmit}>
              <textarea
                type="text"
                id="message-input"
                placeholder="Enter a message"
                ref={messageInputRef}
                autoComplete="off"
                onChange={handleInputChange}
                disabled={enableButton}
              />
              <div>
                <FontAwesomeIcon
                  icon={faUpload}
                  style={{ color: "#ffb6c1", fontSize: "3rem" }}
                  onClick={handleIconClick}
                />
                <input
                  accept=".pdf,image/*"
                  type="file"
                  ref={fileInputRef}
                  className="hidden-file-input"
                  onChange={handleFileChange}
                />
              </div>
              <input type="submit" value="Send" />
            </form>
          </div>
        </>
      )}
    </main>
  );
};

export default ChatMessages;
