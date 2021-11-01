import UpdateDelete from "../updateDelete/UpdateDelete";
import useReadAllPosts from "../../../hooks/useReadAllPosts";

const Read = () => {
  const posts = useReadAllPosts();

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
