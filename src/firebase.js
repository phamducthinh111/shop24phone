// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfQfrALskxRpREAl_khvsCyDn1vtgt1mE",
  authDomain: "devcamp-r27-e913b.firebaseapp.com",
  projectId: "devcamp-r27-e913b",
  storageBucket: "devcamp-r27-e913b.appspot.com",
  messagingSenderId: "203996993448",
  appId: "1:203996993448:web:4afcc147912f9764fd6f9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth