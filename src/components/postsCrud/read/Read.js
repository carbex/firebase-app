// import React, { useState, useContext, useEffect } from "react";
// import FirebaseContext from "../../../contexts/FirebaseContext";
import UpdateDelete from "../updateDelete/UpdateDelete";
import usePost from "../../../hooks/usePost";

const Read = () => {
  const posts = usePost();
  // const { user, firebase } = useContext(FirebaseContext);
  // const [posts, setPosts] = useState([])

  // console.log('posts dans le composant read => ', posts)

  // useEffect(() => {
  //   const read = () => {
  //     firebase.readPosts('posts').then(posts => {
  //       setTimeout(() => {
  //         setPosts(posts)
  //       }, 500);
  //     })
  //     // const response = [{author: 'hdsoda', text: 'dhaod', uid: 'nknkdq'}, {author: 'hdsoda', text: 'dhaod', uid: 'nknkdq'}]
  //     // console.log('posts dans le useEffect => ', response)
  //     // setPosts(response)
  //   }
  //   read()
  // }, [])

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
