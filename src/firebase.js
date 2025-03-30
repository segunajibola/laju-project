import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9gUSVkrRVDkrGtwenw28zDG3vFk2xPi4",
  authDomain: "dcm-investors.firebaseapp.com",
  projectId: "dcm-investors",
  storageBucket: "dcm-investors.firebasestorage.app",
  messagingSenderId: "411621330210",
  appId: "1:411621330210:web:38c3c9db544a60db96e97b",
  measurementId: "G-X1LWC1TR7K",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
