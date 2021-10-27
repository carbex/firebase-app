import { useState, useEffect } from "react";
import firebase from "../firebase";
import { onSnapshot } from "firebase/firestore";

const useMessage = ({ query }) => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data().idField);
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  });

  console.log('messages dans le useMessage => ', messages)

  return messages;
};

export default useMessage;
