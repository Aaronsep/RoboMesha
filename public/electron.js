const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
          contextIsolation: true
        }
      });
      

  win.loadFile(path.join(__dirname, '../build/index.html'));
  //win.webContents.openDevTools(); // Opcional, para ver errores
}

app.whenReady().then(createWindow);
