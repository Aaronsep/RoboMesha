
# Interfaz RoboMesha

RoboMesha es una mesa robótica educativa autónoma omnidireccional con sensores (LiDAR, ultrasónicos, etc.) y ruedas motorizadas. Permite a estudiantes programar navegación y evitar obstáculos en un entorno seguro, fomentando el aprendizaje práctico de robótica y control.

## Requisitos

- **Node.js** (v18 o superior)
- **npm** (v7 o superior)
- **Una cuenta de Firebase** para la configuración de las credenciales

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto:

### 1. Clonar el repositorio

Primero, clona el repositorio a tu máquina local:

```bash
git clone https://github.com/Aaronsep/RoboMesha.git
cd RoboMesha
```

### 2. Instalar dependencias

Desde la carpeta raíz del proyecto, ejecuta:

```bash
npm install
```

Esto descargará todas las dependencias necesarias para el proyecto.

### 3. Configurar Firebase y las credenciales

Este proyecto utiliza Firebase para interactuar con la base de datos en tiempo real. Para configurarlo:

#### 3.1 Crear un archivo `.env`

1. Crea un archivo llamado `.env` en la raíz del proyecto.
2. Dentro del archivo `.env`, agrega las siguientes variables con las credenciales de tu proyecto Firebase. Las puedes obtener desde la consola de Firebase, en la sección **Configuración del Proyecto**:

```env
REACT_APP_FIREBASE_API_KEY=tu-api-key-aqui
REACT_APP_FIREBASE_AUTH_DOMAIN=tu-auth-domain
REACT_APP_FIREBASE_DATABASE_URL=tu-database-url
REACT_APP_FIREBASE_PROJECT_ID=tu-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=tu-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=tu-measurement-id
```

#### 3.2 Configurar Firebase en el Proyecto

El archivo de configuración de Firebase está en `src/firebaseConfig.js`. Asegúrate de que esté utilizando las variables de entorno que configuraste en el archivo `.env`:

```js
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
```

---

### 4. Ejecutar el Proyecto

Para iniciar la interfaz en modo de desarrollo, ejecuta:

```bash
npm start
```

Esto abrirá la aplicación en tu navegador en `http://localhost:3000/`.

---

## Generar el Build y el .exe

Si deseas empaquetar la aplicación como un archivo `.exe` para Windows usando Electron, sigue estos pasos:

### 1. Crear el Build

Antes de empaquetar la aplicación con Electron, primero debes generar una versión optimizada del frontend:

```bash
npm run build
```

Esto creará una carpeta **`build/`** con los archivos listos para producción.

### 2. Empaquetar la Aplicación con Electron

#### 2.1 Instalar Electron Packager

Si aún no tienes instalado **Electron Packager**, ejecuta:

```bash
npm install --save-dev electron-packager
```

#### 2.2 Generar el .exe

En el archivo `package.json`, usa el siguiente script para empaquetar la aplicación con Electron:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "electron": "npm run build && electron .",
  "dist": "electron-packager . RoboMesha --platform=win32 --arch=x64 --out=dist --overwrite --icon=icon.ico"
}
```

Luego, ejecuta el siguiente comando para crear el archivo `.exe`:

```bash
npm run dist
```

Esto creará una carpeta **`dist/`** y dentro de ella encontrarás una subcarpeta **`RoboMesha-win32-x64/`**. Dentro de esa carpeta estará el archivo ejecutable **`RoboMesha.exe`**.

### 3. Cambiar el Nombre del `.exe` y Agregar un Icono

Si deseas cambiar el nombre del archivo `.exe` o agregar un icono:

#### 3.1 Cambiar el Nombre

Modifica el nombre en el comando:

```json
"dist": "electron-packager . MiAplicacion --platform=win32 --arch=x64 --out=dist --overwrite --icon=icon.ico"
```

#### 3.2 Agregar un Icono

Coloca tu archivo `icon.ico` en la raíz del proyecto y modifica el comando de la siguiente manera:

```json
"dist": "electron-packager . RoboMesha --platform=win32 --arch=x64 --out=dist --overwrite --icon=icon.ico"
```

### 4. Probar el .exe

Una vez generado el `.exe`, navega a la carpeta **`dist/`** y ejecuta el archivo **`RoboMesha.exe`**. La aplicación debería abrirse como una aplicación de escritorio nativa en Windows.

---

## Notas

- Si necesitas realizar alguna configuración avanzada con Electron, consulta la [documentación oficial de Electron](https://www.electronjs.org/docs).
- Si prefieres usar `electron-builder` en lugar de `electron-packager`, puedes seguir los mismos pasos pero usando los comandos específicos de `electron-builder`.
