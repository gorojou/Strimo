import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";
// import "firebase/functions";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVZBpImImjl5NUPjOeTxoXvybRXrUP2to",
  authDomain: "strimo-9e1a1.firebaseapp.com",
  projectId: "strimo-9e1a1",
  storageBucket: "strimo-9e1a1.appspot.com",
  messagingSenderId: "947032620004",
  appId: "1:947032620004:web:3c571845061d83670da5f1",
  measurementId: "G-MFM7MBW4B9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
  return messaging
    .getToken({
      vapidKey:
        "BIgup2-RCuyJiNQAtbTeZ37xmX4HX8IPn3h7YdONdzN_qozTDv1Zwc0YNtG6po-JVQzoVRwwM13ykE6l_uU1dVw",
    })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
export const auth = firebase.auth();
// export const functions = firebase.functions();
export default firebase;
