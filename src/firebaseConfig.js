import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCiEZPwvi5ng43ZcYNBFRdOqctt4Tgia4c",
  authDomain: "robomesha.firebaseapp.com",
  databaseURL: "https://robomesha-default-rtdb.firebaseio.com",
  projectId: "robomesha",
  storageBucket: "robomesha.appspot.com", // ← ojo: aquí tenía un error, debe ser .appspot.com
  messagingSenderId: "238819375045",
  appId: "1:238819375045:web:2a46b2fd473db731277dac",
  measurementId: "G-8P3S5LFPQR"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

export { database, ref, set };
