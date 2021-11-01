import { useState, useEffect } from "react";
import firebase from "../firebase";

export const useReadOnePost = (postId) => {
  const [post, setPost] = useState({
    author: "",
    text: "",
    uid: "",
  });

  useEffect(() => {
    const readOnePost = firebase.getPost(`posts/${postId}`, (snapshot) => {
      if (snapshot) {
        const post = { id: postId, ...snapshot.val() };
        setPost(post);
      } else {
        console.log("No data available");
      }
    });
    return () => readOnePost();
  }, [postId]);

  return post;
};
