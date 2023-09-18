// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app'
import { getFirestore , collection, addDoc } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain: "fluyo-43dde.firebaseapp.com",
  projectId: "fluyo-43dde",
  storageBucket: "fluyo-43dde.appspot.com",
  messagingSenderId: "420342927606",
  appId: "1:420342927606:web:1fae761bf863035ea99cd7",
  measurementId: "G-JBZ6EJCPQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app);

export const db = getFirestore(app)