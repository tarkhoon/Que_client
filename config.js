import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbdVr-MU5PKumRJdYR2OLmoW2nAe3Nhn0",
  authDomain: "mobile-develop-97eb8.firebaseapp.com",
  projectId: "mobile-develop-97eb8",
  storageBucket: "mobile-develop-97eb8.appspot.com",
  messagingSenderId: "86354299901",
  appId: "1:86354299901:web:86adf07d65837bd08ca794",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
