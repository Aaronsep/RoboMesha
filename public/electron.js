const { app, BrowserWindow } = require('electron');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      contextIsolation: true,
    },
  });

  // Cargar la aplicación desde el build
  const buildPath = path.join(__dirname, '../build/index.html');
  win.loadFile(buildPath);
  // win.webContents.openDevTools(); // Opcional, para ver errores
}

app.whenReady().then(createWindow);
app.commandLine.appendSwitch('force-device-scale-factor', '1');

