import React, { useState, useContext, useEffect } from "react";
import FirebaseContext from "../../contexts/FirebaseContext";
// import { useHistory } from "react-router";
import { VerticallyCenteredModal } from "../modal/VerticallyCenteredModal";
import Button from "react-bootstrap/Button";
import { capitalize } from "../../functions/Functions";

function Navbar() {
  const { user, isAuthenticated, firebase } = useContext(FirebaseContext);
  // const history = useHistory();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setModalShow(false);
    }
  });

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          border: "1px solid lightgrey",
          borderRadius: "4px",
          padding: "20px",
          marginBottom: "20px",
          backgroundColor: "white",
          color: "black",
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
          {isAuthenticated && user.displayName
            ? user.displayName.split(" ").map((el) => capitalize(el) + " ")
            : isAuthenticated && !user.displayName
            ? user.email
            : "internaute"}{" "}
          !
        </h2>
        {user !== null ? (
          <div className="d-flex align-items-center">
            {/* {user.photoURL && <img src={user.photoURL} alt="user avatar" />} */}

            <Button
              variant="outline-primary"
              onClick={() => firebase.logout()}
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
              SignIn
            </Button>
          </div>
        )}
      </nav>
      <VerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Navbar;
