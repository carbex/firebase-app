import firebaseConfig from "./config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  onValue,
  child,
  push,
  update,
  remove,
} from "firebase/database";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getFirestore();
    this.database = getDatabase();
    this.googleProvider = new GoogleAuthProvider();
    this.facebookProvider = new FacebookAuthProvider();
  }

  ref = (collection) => {
    return ref(this.database, collection);
  };

  getDatabase = () => {
    return this.database;
  };
  // DATABASE
  // Create data
  createPosts = (item, collection) => {
    try {
      const postRef = ref(this.database, collection);
      const newPostRef = push(postRef);
      set(newPostRef, item);
    } catch (error) {
      console.log(error);
    }
  };
  // Read data
  readPosts = (collection) => {
    return new Promise((resolve, reject) => {
      const postsRef = ref(this.database, collection);
      let posts = [];
      onValue(postsRef, (snapshot) => {
        let previousList = snapshot.val();
        for (let id in previousList) {
          posts.push({ id, ...previousList[id] });
        }
      });
      console.log("posts dans la class => ", posts);
      // Succeed half of the time.
      if (posts) {
        resolve(posts);
      } else {
        reject("FAILURE");
      }
    });
    // try {
    //   const postsRef = ref(this.database, collection);
    //   return onValue(postsRef, (snapshot) => {
    //     let posts = [];
    //     let previousList = snapshot.val();
    //     for (let id in previousList) {
    //       posts.push({ id, ...previousList[id] });
    //     }
    //     console.log('posts dans la class firebase => ', posts)
    //     return posts
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };
  // Update data
  updatePost = (item, authorUpdate, textUpdate, collection) => {
    try {
      const postRef = ref(this.database, collection);
      const post = child(postRef, item.id);
      if (authorUpdate !== null) {
        update(post, {
          author: authorUpdate,
        });
      }
      if (textUpdate !== null) {
        update(post, {
          text: textUpdate,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Delete post
  deletePost = (item, collection) => {
    try {
      const postRef = ref(this.database, collection);
      const post = child(postRef, item.id);
      remove(post);
    } catch (error) {
      console.log(error);
    }
  };

  // AUTHENTICATION
  // Email sign-up
  emailInscription = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  ) => {
    if (firstName && lastName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const { user } = await createUserWithEmailAndPassword(
            this.auth,
            email,
            password
          );
          if (user) {
            updateProfile(user, {
              displayName: firstName + " " + lastName
            });
          }
          await setDoc(
            doc(collection(this.db, "users"), user.uid),
            {
              firstName,
              lastName,
              email,
              createdAt: Date.now(),
              online: true
            },
            { merge: true }
          );
        } catch (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/weak-password") {
            return { message: "The password is too weak." };
          } else if (errorCode === "auth/email-already-in-use") {
            return { message: "The email is already in use." };
          } else if (errorCode === "auth/invalid-email") {
            return { message: "The email is not valid.." };
          } else if (errorCode === "auth/operation-not-allowed") {
            return { message: "Operation not allowed !" };
          } else {
            return { message: errorMessage };
          }
        }
      } else {
        return { message: "Les mots de passe saisis ne sont pas identiques." };
      }
    } else {
      alert("Veuillez renseigner tous les champs.");
    }
  };
  // Email sign-in
  emailLogin = async (email, password) => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(this.auth, email, password);
      } catch (error) {
        // throw new Error(error.message);
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          return { message: "Mauvais mot de passe." };
        } else if (errorCode === "auth/too-many-requests") {
          return {
            message:
              "L'accès est désactivé temporairement en raison de trop nombreuses tentatives.",
          };
        }
        return { message: errorMessage };
      }
    }
  };

  // Google and facebook login
  login = async (provider) => {
    try {
      const { user } = await signInWithPopup(
        this.auth,
        this[`${provider}Provider`]
      );
      console.log(user);
      await setDoc(
        doc(collection(this.db, "users"), user.uid),
        {
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ")[1],
          email: user.email,
          createdAt: user.metadata.createdAt,
        },
        { merge: true }
      );
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/popup-blocked") {
        alert("Popup bloquée!");
      } else if (errorCode === "auth/user-disabled") {
        alert("Utilisateur désactivé.");
      } else if (errorCode === "auth/user-not-found") {
        alert("Utilisateur inconnu.");
      } else if (errorCode === "auth/wrong-password") {
        alert("Mauvais mot de passe !");
      } else {
        alert(errorMessage);
      }
    }
  };

  // Logout
  logout = async () => {
    await signOut(this.auth);
  };
}
const firebase = new Firebase();
export default firebase;
