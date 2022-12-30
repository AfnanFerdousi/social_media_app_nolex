// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs htmlFor Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWhMb6H1IQ-eUQoBb8fM1Ln51-lFmEG5o",
    authDomain: "jkkjk-e51d4.firebaseapp.com",
    projectId: "jkkjk-e51d4",
    storageBucket: "jkkjk-e51d4.appspot.com",
    messagingSenderId: "561126639366",
    appId: "1:561126639366:web:1267b4133df02fdb3c0087"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;