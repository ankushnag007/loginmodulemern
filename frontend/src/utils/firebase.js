import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "roma1-64fc2.firebaseapp.com",
  projectId: "roma1-64fc2",
  storageBucket: "roma1-64fc2.firebasestorage.app",
  messagingSenderId: "592606364166",
  appId: "1:592606364166:web:7e046ec3b0bc72cc17f987",
  measurementId: "G-H2RVPJD77B",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
