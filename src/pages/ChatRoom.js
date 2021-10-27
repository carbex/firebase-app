import React, { useContext } from "react";
import FirebaseContext from "../contexts/FirebaseContext";

import Layout from "../components/layout/Layout";
import Chat from "../components/chat/Chat";
import { Redirect } from "react-router";

function ChatRoom() {
  const { user, isAuthenticated } = useContext(FirebaseContext);

  if (user === null) {
    return <Redirect to="/" />;
  }

  return <Layout>{user !== null && <Chat />}</Layout>;
}

export default ChatRoom;
