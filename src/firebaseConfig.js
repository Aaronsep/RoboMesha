import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Aquí las credenciales ya no dependen de process.env, 
// ya que estas se inyectarán en el paso previo al empaquetado.
const firebaseConfig = {
  apiKey: "tu-api-key-aqui", // Será reemplazado en el script de inyección
  authDomain: "robomesha.firebaseapp.com", // Será reemplazado en el script de inyección
  databaseURL: "https://robomesha-default-rtdb.firebaseio.com", // Será reemplazado en el script de inyección
  projectId: "robomesha", // Será reemplazado en el script de inyección
  storageBucket: "robomesha.appspot.com", // Será reemplazado en el script de inyección
  messagingSenderId: "238819375045", // Será reemplazado en el script de inyección
  appId: "1:238819375045:web:2a46b2fd473db731277dac", // Será reemplazado en el script de inyección
  measurementId: "G-8P3S5LFPQR" // Será reemplazado en el script de inyección
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

export { database, ref, set };
