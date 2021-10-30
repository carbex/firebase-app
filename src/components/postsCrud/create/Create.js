import React, { useState, useContext } from "react";
import FirebaseContext from "../../../contexts/FirebaseContext";
import Button from "react-bootstrap/Button";
import MDEditor from "@uiw/react-md-editor";

function Create() {
  const { user, firebase } = useContext(FirebaseContext);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (author && text) {
      const item = {
        author,
        text,
        uid: user.uid,
        createdAt: Date.now(),
      };
      await firebase.addPost("posts", item);
      setAuthor("");
      setText("");
    } else {
      setMessage("Veuillez compléter tous les champs.");
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        backgroundColor: "white",
        padding: "20px",
        boxShadow: "2px 2px 5px lightgrey",
      }}
    >
      <input
        style={{ marginBottom: "10px" }}
        type="text"
        placeholder="Auteur*"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <div className="container p-0 mt-3 mb-4">
        <MDEditor value={text} onChange={setText} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ color: "lightcoral" }}>{message}</div>
        <Button
          type="button"
          variant="outline-primary"
          style={{ width: "200px" }}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

export default Create;
