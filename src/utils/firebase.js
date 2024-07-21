import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPy5S2YL03ntH02Lp0AVoq-mzFLTtTyvw",
  authDomain: "netflixgpt-119e7.firebaseapp.com",
  projectId: "netflixgpt-119e7",
  storageBucket: "netflixgpt-119e7.appspot.com",
  messagingSenderId: "261159405968",
  appId: "1:261159405968:web:bfe5fddfce933190d80b15",
  measurementId: "G-NQ39MYRB1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
