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
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

class Firebase {
  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.db = getFirestore();
    this.database = getDatabase();
    this.googleProvider = new GoogleAuthProvider();
    this.facebookProvider = new FacebookAuthProvider();
    this.uid = "";
  }

  // FIRESTORE DATABASE /////////////////////////////////////////

  addMessage = async (message, userUid) =>
    await setDoc(doc(collection(this.db, "messages"), userUid), message);

  getMessage = (handleSnapshot) =>
    onSnapshot(collection(this.db, "messages"), handleSnapshot);

  deleteMessage = async (userUid) =>
    await deleteDoc(doc(this.db, "messages", userUid));

  // REALTIME DATABASE //////////////////////////////////////////
  // Create data
  addPost = (collection, item) =>
    set(push(ref(this.database, collection)), item);

  // Read data
  getPost = (collection, handleSnapshot) =>
    onValue(ref(this.database, collection), handleSnapshot);

  // Update data
  updatePost = (collection, item, authorUpdate, textUpdate ) => {
    const post = child(ref(this.database, collection), item.id);
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
  };

  // Delete post
  deletePost = (collection, item) =>
    remove(child(ref(this.database, collection), item.id));

  // AUTHENTICATION ////////////////////////////////
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
              displayName: firstName + " " + lastName,
            });
          }
          await setDoc(
            doc(collection(this.db, "users"), user.uid),
            {
              firstName,
              lastName,
              email,
              createdAt: Date.now(),
              online: true,
              type: 1,
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
      await setDoc(
        doc(collection(this.db, "users"), user.uid),
        {
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ")[1],
          email: user.email,
          createdAt: user.metadata.createdAt,
          online: true,
        },
        { merge: true }
      );
      this.uid = user.uid;
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
  logout = async (userUid) => {
    try {
      this.deleteMessage(userUid);
      await signOut(this.auth);
    } catch (error) {
      console.log(error);
    }
  };
}
const firebase = new Firebase();
export default firebase;
