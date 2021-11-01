import { useState, useEffect } from "react";
import firebase from "../firebase";

const useReadAllPosts = () => {
  const [posts, setPosts] = useState([]);

  const handleSnapshot = (snapshot) => {
    let postsTemp = [];
    let previousList = snapshot.val();
    for (let id in previousList) {
      postsTemp.push({ id, ...previousList[id] });
    }
    setPosts(postsTemp);
  };

  useEffect(() => {
    const readAllPosts = firebase.getPost("posts", handleSnapshot);
    return () => readAllPosts();
  }, []);

  return posts;
};

export default useReadAllPosts;
