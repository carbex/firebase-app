import React, { useContext, useEffect, useRef } from "react";
import FirebaseContext from "../../contexts/FirebaseContext";
import useReadAllMessages from "../../hooks/useReadAllMessages";
import { AiOutlineSend } from "react-icons/ai";
import useAddMessage from "../../hooks/useAddMessage";

const Chat = () => {
  const { user } = useContext(FirebaseContext);
  const { userMessage, inputBind, messageBind } = useAddMessage("");
  const messages = useReadAllMessages();

  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
              {...inputBind}
            ></textarea>
            <div>
              <button {...messageBind} className=" btn btn-primary mt-1 ms-1">
                <AiOutlineSend />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
