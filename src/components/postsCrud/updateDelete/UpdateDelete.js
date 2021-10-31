import { capitalize } from "../../../functions/Functions";
import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";

function UpdateDelete({ post }) {
 
  return (
    <div className="col col-12 col-md-6 col-xl-4 mb-4">
      <Link style={{ textDecoration: "none" }} to={`/posts/${post.id}`}>
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
          <div style={{ width: "100%" }}>
            <MDEditor.Markdown
              source={post.text}
              style={{ marginBottom: "20px" }}
            />
            <h5>
              {post.author
                .split(" ")
                .map((el) => capitalize(el))
                .join(" ")}
            </h5>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default UpdateDelete;
