// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP81akMmvCTDgxl3ZluvNpGy8csrVwduY",
  authDomain: "fir-9448f.firebaseapp.com",
  projectId: "fir-9448f",
  storageBucket: "fir-9448f.firebasestorage.app",
  messagingSenderId: "969870985858",
  appId: "1:969870985858:web:c83d0373dbc7461bfb829b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth, provider};
