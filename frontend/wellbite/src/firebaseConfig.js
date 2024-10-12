// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD31mBCN0Ln4LhoVxIhUQe08p9uTqBeBrI",
  authDomain: "hhack-b0022.firebaseapp.com",
  projectId: "hhack-b0022",
  storageBucket: "hhack-b0022.appspot.com",
  messagingSenderId: "692353864549",
  appId: "1:692353864549:web:3f53c82a6ff1a7ee40c78c",
  measurementId: "G-BWP2QCZNZM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };