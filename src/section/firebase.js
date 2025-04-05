// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0-0Aml7xvmvAR4edZ7WYXMwll9-TtLII",
  authDomain: "laju-project.firebaseapp.com",
  projectId: "laju-project",
  storageBucket: "laju-project.firebasestorage.app",
  messagingSenderId: "1081534435760",
  appId: "1:1081534435760:web:5ef0d4ab3eb183ce864675",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
