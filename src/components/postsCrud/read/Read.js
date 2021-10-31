import UpdateDelete from "../updateDelete/UpdateDelete";
import usePosts from "../../../hooks/usePosts";

const Read = () => {
  const posts = usePosts();

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
