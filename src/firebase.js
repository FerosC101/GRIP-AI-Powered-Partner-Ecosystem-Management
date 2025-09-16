import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAtVscDeiwmdjLea2QzdqC8iOPhhSllOWU",
    authDomain: "grip-7a7d6.firebaseapp.com",
    projectId: "grip-7a7d6",
    storageBucket: "grip-7a7d6.firebasestorage.app",
    messagingSenderId: "574685380915",
    appId: "1:574685380915:web:e5fd96393a4336a908be46",
    measurementId: "G-LRE7JBEYX5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;