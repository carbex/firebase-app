import React, { useContext } from "react";
import FirebaseContext from "../contexts/FirebaseContext";
import Create from "../components/postsCrud/create/Create";
import Read from "../components/postsCrud/read/Read";
import Layout from "../components/layout/Layout";
import Chat from "../components/chat/Chat";
import { MyAccordion } from "../components/accordion/MyAccordion";

function Main() {
  const { isAuthenticated } = useContext(FirebaseContext);
  console.log(isAuthenticated)

  return (
    <Layout>
      {isAuthenticated && (
        <MyAccordion direction="bottom" title="Poster une citation">
          <Create />
        </MyAccordion>
      )}
      <Read />
      {isAuthenticated && (
        <MyAccordion direction="top" title="Chat">
          <Chat />
        </MyAccordion>
      )}
    </Layout>
  );
}

export default Main;
