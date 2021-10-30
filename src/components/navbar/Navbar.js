import React, { useState, useContext, useEffect } from "react";
import FirebaseContext from "../../contexts/FirebaseContext";
// import { useHistory } from "react-router";
import { VerticallyCenteredModal } from "../modal/VerticallyCenteredModal";
import Button from "react-bootstrap/Button";
import { capitalize } from "../../functions/Functions";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Navbar() {
  const { user, isAuthenticated, firebase } = useContext(FirebaseContext);
  // const history = useHistory();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setModalShow(false);
    }
  }, [isAuthenticated]);

  return (
    <>
    <Container fluid style={{boxShadow: "0px 0px 5px grey", marginBottom: "20px", borderBottom: "1px solid lightgrey", backgroundColor: "white"}}>
      <Row>
        <Col md={{span: 10, offset: 1}}>

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          // border: "1px solid lightgrey",
          // borderRadius: "4px",
          padding: "20px 0px 20px 0px",
          // marginBottom: "20px",
          backgroundColor: "white",
          color: "black",
          // boxShadow: "0px 0px 5px"
        }}
      >
        {/* <div className="d-flex align-items-center">
          <Button
          style={{marginRight: '10px'}}
            variant="outline-secondary"
            onClick={() => history.push("/")}
          >
            Posts
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => history.push("/chat")}
          >
            Chat
          </Button>
        </div> */}
        <h2>
          Bienvenue{" "}
          {user !== null && user.displayName
            ? user.displayName.split(" ").map((el) => capitalize(el) + " ")
            : user !== null && !user.displayName
            ? user.email
            : "internaute"}{" "}
          !
        </h2>
        {user !== null ? (
          <div className="d-flex align-items-center">
            {/* {user.photoURL && <img src={user.photoURL} alt="user avatar" />} */}

            <Button
              variant="outline-primary"
              onClick={() => firebase.logout(user.uid)}
              style={{ cursor: "pointer" }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <button
              type="button"
              className="btn btn-primary"
              onClick={() => history.push("/signIn")}
              style={{ width: "100%", cursor: "pointer" }}
            >
              SignIn
            </button> */}
            <Button
              variant="outline-primary"
              onClick={() => setModalShow(true)}
            >
              Sign Up / Log in
            </Button>
          </div>
        )}
      </nav>
        </Col>
      </Row>
    </Container>
      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Navbar;
