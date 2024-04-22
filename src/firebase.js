import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCrdXbY24tD5SSw7lLq8TJ-hQdqM3k4ok",
  authDomain: "se-league-standings.firebaseapp.com",
  projectId: "se-league-standings",
  storageBucket: "se-league-standings.appspot.com",
  messagingSenderId: "130187057791",
  appId: "1:130187057791:web:f6f321f24e0bde69a73d4a",
  measurementId: "G-LLGQD0MS38"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };