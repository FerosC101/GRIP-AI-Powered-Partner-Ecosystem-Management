// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtVscDeiwmdjLea2QzdqC8iOPhhSllOWU",
    authDomain: "grip-7a7d6.firebaseapp.com",
    projectId: "grip-7a7d6",
    storageBucket: "grip-7a7d6.firebasestorage.app",
    messagingSenderId: "574685380915",
    appId: "1:574685380915:web:e5fd96393a4336a908be46",
    measurementId: "G-LRE7JBEYX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

export default app;