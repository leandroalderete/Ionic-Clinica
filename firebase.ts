// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBy7tIABdmwwcN3PgHZKSz8y2Pg_BJwrOo",
  authDomain: "turnosmedicos-2024.firebaseapp.com",
  projectId: "turnosmedicos-2024",
  storageBucket: "turnosmedicos-2024.appspot.com",
  messagingSenderId: "915040551022",
  appId: "1:915040551022:web:af343443b7c96a9e35667f",
  measurementId: "G-LVRG2VV72J",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
