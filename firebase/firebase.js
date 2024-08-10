// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaPrSlfxf_2qOfkHW88NblE4IVMGocC14",
  authDomain: "codefury-86fa1.firebaseapp.com",
  projectId: "codefury-86fa1",
  storageBucket: "codefury-86fa1.appspot.com",
  messagingSenderId: "847451610796",
  appId: "1:847451610796:web:596b924d4858a39f9e8909",
  measurementId: "G-5BQ5YQRYP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
export default app;
export { auth, db };
