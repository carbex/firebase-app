import UpdateDelete from "../updateDelete/UpdateDelete";
import usePost from "../../../hooks/usePost";

const Read = () => {
  const posts = usePost();

  return (
    <div className="container-fluid p-0">
      <div className="row">
        {posts.length > 0 &&
          posts.map((post, index) => {
            return <UpdateDelete post={post} key={index} />;
          })}
      </div>
    </div>
  );
};

export default Read;
