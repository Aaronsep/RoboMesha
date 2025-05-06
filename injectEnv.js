// injectEnv.js
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const firebaseConfigPath = path.join(__dirname, 'src', 'firebaseConfig.js');
let content = fs.readFileSync(firebaseConfigPath, 'utf8');

// Reemplaza las referencias a process.env con valores reales
content = content.replace(/process\.env\.REACT_APP_FIREBASE_API_KEY/g, `"${process.env.REACT_APP_FIREBASE_API_KEY}"`)
  .replace(/process\.env\.REACT_APP_FIREBASE_AUTH_DOMAIN/g, `"${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}"`)
  .replace(/process\.env\.REACT_APP_FIREBASE_DATABASE_URL/g, `"${process.env.REACT_APP_FIREBASE_DATABASE_URL}"`)
  .replace(/process\.env\.REACT_APP_FIREBASE_PROJECT_ID/g, `"${process.env.REACT_APP_FIREBASE_PROJECT_ID}"`)
  .replace(/process\.env\.REACT_APP_FIREBASE_STORAGE_BUCKET/g, `"${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}"`)
  .replace(/process\.env\.REACT_APP_FIREBASE_MESSAGING_SENDER_ID/g, `"${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}"`)
  .replace(/process\.env\.REACT_APP_FIREBASE_APP_ID/g, `"${process.env.REACT_APP_FIREBASE_APP_ID}"`)
  .replace(/process\.env\.REACT_APP_FIREBASE_MEASUREMENT_ID/g, `"${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}"`);

fs.writeFileSync(firebaseConfigPath, content, 'utf8');
console.log('Credenciales inyectadas en firebaseConfig.js');
