import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../utils/firebase";
import { useHistory } from "react-router-dom";
const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const logIn = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
    // .then(history.push("/"));
    history.push("/");
  };
  const signUp = async (email, password, displayName) => {
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (user) => {
        if (user.user) {
          await user.user.updateProfile({
            displayName: displayName,
          });
          history.push("/");
        }
      });
  };
  const logOut = () => {
    history.push("/login");
    return auth.signOut();
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    logIn,
    logOut,
    signUp,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading || children}
    </AuthContext.Provider>
  );
}
