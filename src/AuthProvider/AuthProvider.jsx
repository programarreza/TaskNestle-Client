import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import useAxiosLocal from "../Hooks/useAxiosLocal";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const axiosLocal= useAxiosLocal()

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user with auth", currentUser);
      if (currentUser) {

        // get token and store client
        const userInfo = { email: currentUser.email };
        axiosLocal.post("jwt", userInfo).then((res) => {
          if (res?.data?.token) {
            // Set the received token on local  storage
            localStorage.setItem("access-token", res?.data?.token);
            setLoading(false);
          }
        });

      } else {
        // TODO: remove token (if token stored in the client site: local storage, caching, in memory)
        localStorage.removeItem("access-token");
        setLoading(false);
      }
      
    });
    return () => {
      return unSubscribe();
    };
  }, [axiosLocal]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    loginWithGoogle,
    logOut,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
