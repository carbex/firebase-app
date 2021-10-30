import { useState, useEffect } from "react";
import firebase from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (user) => {
      if (user) {
        const email = user.email;

        const userRef = doc(firebase.db, "users", user.uid);
        setDoc(userRef, { email }, { merge: true });

        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return { user, isAuthenticated };
};

export default useAuth;
