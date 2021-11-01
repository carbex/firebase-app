import { useState, useEffect } from "react";
import firebase from "../firebase";

const useReadAllMessages = () => {
  const [messages, setMessages] = useState([]);

  const handleSnapshot = (snapshot) => {
    let tempMessages = [];
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added" || change.type === "modified") {
        tempMessages.push(change.doc.data());
      }
    });
    setMessages((prevState) => [...prevState, ...tempMessages]);
  };

  useEffect(() => {
    const getAllMessages = firebase.getMessage(handleSnapshot);
    return () => {
      getAllMessages();
    };
  }, []);

  return messages;
};

export default useReadAllMessages;
