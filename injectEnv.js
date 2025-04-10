// injectEnv.js
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Cargar las variables de entorno del archivo .env

// Define el archivo de configuración de Firebase
const firebaseConfigPath = path.join(__dirname, 'src', 'firebaseConfig.js');

// Lee el archivo de configuración original
let configFileContent = fs.readFileSync(firebaseConfigPath, 'utf8');

// Reemplaza las credenciales en el archivo de configuración con las variables de entorno
configFileContent = configFileContent.replace(
  /"TU_API_KEY_AQUI"/g, 
  `"${process.env.REACT_APP_FIREBASE_API_KEY}"`
)
.replace(
  /"TU_AUTH_DOMAIN_AQUI"/g, 
  `"${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}"`
)
.replace(
  /"TU_DATABASE_URL_AQUI"/g, 
  `"${process.env.REACT_APP_FIREBASE_DATABASE_URL}"`
)
.replace(
  /"TU_PROJECT_ID_AQUI"/g, 
  `"${process.env.REACT_APP_FIREBASE_PROJECT_ID}"`
)
.replace(
  /"TU_STORAGE_BUCKET_AQUI"/g, 
  `"${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}"`
)
.replace(
  /"TU_MESSAGING_SENDER_ID_AQUI"/g, 
  `"${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}"`
)
.replace(
  /"TU_APP_ID_AQUI"/g, 
  `"${process.env.REACT_APP_FIREBASE_APP_ID}"`
)
.replace(
  /"TU_MEASUREMENT_ID_AQUI"/g, 
  `"${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}"`
);

// Escribe el archivo actualizado de configuración
fs.writeFileSync(firebaseConfigPath, configFileContent, 'utf8');

console.log('Credenciales inyectadas en firebaseConfig.js');
