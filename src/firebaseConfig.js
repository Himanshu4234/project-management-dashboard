// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (Replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyCbRGs1Oym-TRnquhrWb2ug7jZztzb-0MM",
    authDomain: "projectmanagement2-746a4.firebaseapp.com",
    projectId: "projectmanagement2-746a4",
    storageBucket: "projectmanagement2-746a4.firebasestorage.app",
    messagingSenderId: "229890861892",
    appId: "1:229890861892:web:46a261dfbbe87283014511",
    measurementId: "G-TNT2S0JQFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
