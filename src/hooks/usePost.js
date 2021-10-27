import { useState, useEffect } from "react";
import firebase from "../firebase";
import { onValue } from "firebase/database";

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = firebase.ref("posts");
    onValue(postsRef, (snapshot) => {
      let list = [];
      let previousList = snapshot.val();
      for (let id in previousList) {
        list.push({ id, ...previousList[id] });
      }
      setPosts(list);
    });
  }, []);

  return posts;
};

export default usePosts;
