// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAtVscDeiwmdjLea2QzdqC8iOPhhSllOWU",
    authDomain: "grip-7a7d6.firebaseapp.com",
    projectId: "grip-7a7d6",
    storageBucket: "grip-7a7d6.firebasestorage.app",
    messagingSenderId: "574685380915",
    appId: "1:574685380915:web:e5fd96393a4336a908be46",
    measurementId: "G-LRE7JBEYX5"
};

// Initialize Firebases
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
