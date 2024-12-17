import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBraODiTSkSIgvSm5RNtkk9CO-Y8uCXDj4",
  authDomain: "signcompanion-406423.firebaseapp.com",
  databaseURL: "https://signcompanion-406423-default-rtdb.firebaseio.com",
  projectId: "signcompanion-406423",
  storageBucket: "signcompanion-406423.appspot.com",
  messagingSenderId: "676031606523",
  appId: "1:676031606523:web:cf6ddeb4bba3ef09548a5e"

};
// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

