import { useParams, Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import MDEditor from "@uiw/react-md-editor";
import { capitalize } from "../../functions/Functions";
import { usePost } from "../../hooks/usePost";
import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../../contexts/FirebaseContext";

const Post = () => {
  const { postId } = useParams();
  const post = usePost(postId);
  const { user, firebase } = useContext(FirebaseContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [update, setUpdate] = useState(false);
  const [authorUpdate, setAuthorUpdate] = useState(null);
  const [textUpdate, setTextUpdate] = useState(null);

  useEffect(() => {
    const addText = () => setTextUpdate(post.text);
    addText();
  }, [post]);

  const handleUpdate = async () => {
    await firebase.updatePost("posts", post, authorUpdate, textUpdate);
    setUpdate(false);
  };

  const handleDelete = async () => {
    const collection = "posts";
    await firebase.deletePost(collection, post);
    setIsDeleted(true);
  };

  const authorCheck = () =>
    user !== null && (user.uid === post.uid || user.type === 0);

  if (isDeleted) return <Redirect to="/posts" />;

  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col col-12 px-4 col-md-10 offset-md-1">
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
              boxShadow: "2px 2px 5px lightgrey",
            }}
          >
            {update === false && post ? (
              <>
                <div className="container-fluid p-0">
                  <div
                    className="d-flex flex-column align-items-center mb-4"
                    style={{
                      borderBottom: "1px solid lightgrey",
                    }}
                  >
                    <h2>
                      {post.author &&
                        post.author
                          .split(" ")
                          .map((el) => capitalize(el))
                          .join(" ")}
                    </h2>
                    <div className="d-flex" style={{ fontSize: "10px" }}>
                      <span style={{ marginRight: "20px" }}>
                        Posté le {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span>
                        Mis à jour le{" "}
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <MDEditor.Markdown
                    source={post.text}
                    style={{ marginBottom: "20px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    width: "100%",
                  }}
                >
                  {authorCheck() && (
                    <>
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
                    </>
                  )}
                </div>
              </>
            ) : (
              <div style={{ width: "100%" }}>
                <input
                  className="mb-4"
                  type="text"
                  defaultValue={post.author
                    .split(" ")
                    .map((el) => capitalize(el))
                    .join(" ")}
                  onChange={(e) => setAuthorUpdate(e.target.value)}
                />
                <div className="container-fluid p-0 m-0 mb-4 w-100">
                  <MDEditor value={textUpdate} onChange={setTextUpdate} />
                </div>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
