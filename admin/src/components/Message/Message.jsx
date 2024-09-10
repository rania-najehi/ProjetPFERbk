import React, { useContext, useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const { token } = useContext(Context);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:4000/api/v1/message/getAllMessage",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(data.allMessage);
      } catch (error) {
        console.log("un erreur au niveau de message:", error);
      }
    };
    fetchMessages();
  }, []);
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page messages">
      <h1>Message</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    Nom: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Prénom: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Mobile: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>Aucun Message!</h1>
        )}
      </div>
    </section>
  );
};

export default Message;
