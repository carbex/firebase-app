import React, { useContext } from "react";
import FirebaseContext from "../contexts/FirebaseContext";
import Create from "../components/postsCrud/create/Create";
import Read from "../components/postsCrud/read/Read";
import Layout from "../components/layout/Layout";
import Chat from "../components/chat/Chat";
import { MyAccordion } from "../components/accordion/MyAccordion";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Main() {
  const { isAuthenticated } = useContext(FirebaseContext);

  return (
    <Layout>
    <Container fluid>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
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
        </Col>
      </Row>
    </Container>
    </Layout>
  );
}

export default Main;
