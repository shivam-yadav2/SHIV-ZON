import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCqitciIrmLVjYf0T3jwMUgrVWjZF1NqCY",
    authDomain: "shivzon-64074.firebaseapp.com",
    projectId: "shivzon-64074",
    storageBucket: "shivzon-64074.appspot.com",
    messagingSenderId: "1045950014422",
    appId: "1:1045950014422:web:638f37f43bd604c15b3a77"
};

export const ShivZonApp = initializeApp(firebaseConfig);
const fireDB = getFirestore(ShivZonApp)
const auth = getAuth(ShivZonApp)

export  {fireDB , auth} 