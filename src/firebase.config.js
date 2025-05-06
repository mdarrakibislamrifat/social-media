
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAxyUO9WCsbvE-kmGXvRqc8px-YlyFxroI",
  authDomain: "simple-firebase-57ac2.firebaseapp.com",
  projectId: "simple-firebase-57ac2",
  storageBucket: "simple-firebase-57ac2.firebasestorage.app",
  messagingSenderId: "803656064227",
  appId: "1:803656064227:web:facf4e8e37491e3e6f39d6"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
