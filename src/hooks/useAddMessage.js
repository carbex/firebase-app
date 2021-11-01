import { useState, useContext } from "react";
import FirebaseContext from "../contexts/FirebaseContext";

const useAddMessage = (initialValue) => {
  const { user, firebase } = useContext(FirebaseContext);
  const [userMessage, setUserMessage] = useState(initialValue);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userMessage) {
      const message = {
        sender: user.uid,
        senderName: user.displayName,
        message: userMessage,
        createdAt: Date.now(),
      };
      firebase.addMessage(message, user.uid);
      setUserMessage("");
    }
  };

  const handleChange = (e) => setUserMessage(e.target.value);

  return {
    userMessage,
    inputBind: {
      onChange: handleChange,
    },
    messageBind: {
      onClick: handleSendMessage,
    },
  };
};

export default useAddMessage;
