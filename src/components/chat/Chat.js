import React, { useState, useContext, useEffect, useRef } from "react";
import FirebaseContext from "../../contexts/FirebaseContext";

import {
  collection,
  setDoc,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

const Chat = () => {
  const { user, firebase } = useContext(FirebaseContext);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = collection(firebase.db, "messages");
  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getAllMessages = onSnapshot(messageRef, (doc) => {
      let tempMessages = [];
      doc.docChanges().forEach((change) => {
        if (change.type === "added" || change.type === "modified") {
          tempMessages.push(change.doc.data());
        }
      });
      setMessages((prevState) => [...prevState, ...tempMessages]);
    });

    return () => {
      getAllMessages();
      if (user !== null) {
        deleteDoc(doc(firebase.db, "messages", user.uid));
      }
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (userMessage) {
      await setDoc(doc(messageRef, user.uid), {
        sender: user.uid,
        senderName: user.displayName,
        message: userMessage,
        createdAt: Date.now(),
      });
      setUserMessage("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        style={{ maxWidth: 600, width: "100%", background: "white" }}
        className="rounded shadow p-2 text-black"
      >
        <div className="text-center">
          <h1>Chat</h1>
          <p>
            Welcome{" "}
            <span className="text-warning">
              {user !== null && user.displayName}
            </span>{" "}
            !
          </p>
        </div>
        <div
          className="rounded "
          style={{ height: 350, overflowY: "auto", background: "#e4e4e4" }}
        >
          {messages.length ? (
            messages.map((message, i) => (
              <div className="d-flex" key={i}>
                <div
                  className={`m-2 p-2 rounded w-75 ${
                    user !== null && message.sender === user.uid
                      ? "ms-auto text-dark"
                      : "text-dark"
                  }`}
                  style={
                    user !== null && message.sender === user.uid
                      ? { background: "#E8F6EF" }
                      : { background: "#FFFFFF" }
                  }
                >
                  <div style={{ fontSize: 11 }}>
                    <span className="text-muted">{message.senderName}</span>
                    <span className="float-end text-muted">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  {message.message}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center pt-5">No message found!</div>
          )}
          <span ref={dummy}></span>
        </div>
        <div>
          <form className="d-flex ">
            <textarea
              className="form-control mt-1 bg-light"
              placeholder="Ecrire un message"
              rows={1}
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
            ></textarea>
            <div>
              <button
                onClick={handleSendMessage}
                className=" btn btn-primary mt-1 ms-1"
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
