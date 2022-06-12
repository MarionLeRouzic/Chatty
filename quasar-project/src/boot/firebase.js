// Import the functions you need from the SDKs you need
//import firebase from "firebase/app";
//import "firebase/auth";
//import "firebase/database";
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1OyhumChHDEH7nuDYDDDMyjomPqtYDdE",
  authDomain: "chatty-a8954.firebaseapp.com",
  databaseURL: "https://chatty-a8954-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatty-a8954",
  storageBucket: "chatty-a8954.appspot.com",
  messagingSenderId: "655565323018",
  appId: "1:655565323018:web:768753fe4b9c583b6d58f3"
};

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
//let firebaseAuth = firebase.auth();
//let firebaseDb = firebase.database();
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDb = getDatabase(firebaseApp);

export { firebaseAuth, firebaseDb }
