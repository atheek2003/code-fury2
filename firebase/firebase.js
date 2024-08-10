// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-Pa3ele_NoO2Mlu7fttSJddYU7hPF1A4",
  authDomain: "code-9eeaf.firebaseapp.com",
  projectId: "code-9eeaf",
  storageBucket: "code-9eeaf.appspot.com",
  messagingSenderId: "63132725297",
  appId: "1:63132725297:web:b22635a1ba6bf52608a510",
  measurementId: "G-5RKHL217SX"
};


let app;
let auth;
let db;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

auth = getAuth();
db = getFirestore();

export default app;
export { app, auth, db };
