import React, { useState, useContext } from "react";
import FirebaseContext from "../../../contexts/FirebaseContext";
import Button from "react-bootstrap/Button";
import {capitalize} from '../../../functions/Functions'

function UpdateDelete({ post }) {
  const { user, firebase } = useContext(FirebaseContext);
  const [update, setUpdate] = useState(false);
  const [authorUpdate, setAuthorUpdate] = useState(null);
  const [textUpdate, setTextUpdate] = useState(null);

  const handleUpdate = async () => {
    await firebase.updatePost("posts", post, authorUpdate, textUpdate);
    setUpdate(false);
  };

  const handleDelete = async () => {
    const collection = "posts";
    await firebase.deletePost(collection, post);
  };

  const authorCheck = () => (user !== null && (user.uid === post.uid || user.type === 0));

  return (
    <div className="col col-12 col-md-6 col-xl-4 mb-4">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "space-between",
          marginBottom: "20px",
          padding: "20px",
          border: "1px solid lightgrey",
          color: "black",
          borderRadius: "4px",
          backgroundColor: "white",
          height: "100%",
          boxShadow: "2px 2px 5px lightgrey"
        }}
      >
        {update === false ? (
          <>
            <div style={{ textAlign: "center", width: "100%" }}>
              <p>{`" ${post.text} "`}</p>
              <h5>{post.author.split(' ').map((el) => capitalize(el)).join(' ')}</h5>
            </div>
            {authorCheck() && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                }}
              >
                <Button
                  type="button"
                  variant="outline-primary"
                  style={{ marginRight: "10px" }}
                  onClick={() => setUpdate(!update)}
                >
                  Update
                </Button>
                <Button
                  type="button"
                  variant="outline-danger"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            )}
          </>
        ) : (
          <>
            <input
              type="text"
              defaultValue={post.author.split(' ').map((el) => capitalize(el)).join(' ')}
              onChange={(e) => setAuthorUpdate(e.target.value)}
            />
            <textarea
              style={{ width: "100%" }}
              defaultValue={post.text}
              onChange={(e) => setTextUpdate(e.target.value)}
            />
            <div
              style={{ display: "flex", justifyContent: "end", width: "100%" }}
            >
              <Button
                type="button"
                variant="outline-primary"
                style={{ marginRight: "10px" }}
                onClick={handleUpdate}
              >
                Update
              </Button>
              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => setUpdate(!update)}
              >
                Leave
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UpdateDelete;
