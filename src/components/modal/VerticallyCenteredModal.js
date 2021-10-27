import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import "../../App.css";

export const VerticallyCenteredModal = (props) => {
  const [toggleSign, setToggleSign] = useState(true);

  const toggle = () => {
    setToggleSign(!toggleSign);
  };

  useEffect(() => {
    setToggleSign(props.show);
  }, [props.show]);

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName="modal-content"
    >
      <Modal.Header closeButton >{toggleSign ? "Connexion" : "Inscription"}</Modal.Header>
      {toggleSign ? (
        <SignIn handleSubmit={toggle} />
      ) : (
        <SignUp handleSubmit={toggle} />
      )}
    </Modal>
  );
};
