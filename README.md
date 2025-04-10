
# Interfaz RoboMesha

RoboMesha es una mesa robótica educativa autónoma omnidireccional con sensores (LiDAR, ultrasónicos, etc.) y ruedas motorizadas. Permite a estudiantes programar navegación y evitar obstáculos en un entorno seguro, fomentando el aprendizaje práctico de robótica y control.

## Requisitos

- **Node.js** (v18 o superior)
- **npm** (v7 o superior)
- **Una cuenta de Firebase** para la configuración de las credenciales

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto:

### 1. Clonar el repositorio

```bash
git clone https://github.com/Aaronsep/RoboMesha.git
cd RoboMesha
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

#### 3.1 Crear un archivo `.env` en la raíz:

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

#### 3.2 El archivo `src/firebaseConfig.js` ya está listo para usar estas variables.

---

## Ejecutar en modo desarrollo

```bash
npm start
```

Abre automáticamente en `http://localhost:3000/`.

---

## Generar el Build y el `.exe`

### 1. Crear el build de React

```bash
npm run build
```

### 2. Empaquetar la app usando `electron-builder`

```bash
npm run dist
```

Este script ejecuta `injectEnv.js` para insertar las credenciales del `.env` y luego empaqueta todo en un instalador `.exe` listo para distribución.

---

## Salida del ejecutable

El instalador `.exe` se encuentra en la carpeta `dist/`. Al ejecutar el instalador, la aplicación se instalará en Windows y se generará un acceso directo.

---

## Notas

- Se utiliza `electron-builder`, no `electron-packager`.
- Revisa la documentación oficial de [electron-builder](https://www.electron.build/) para más personalización.

---

## Personalización del instalador `.exe`

La sección `"build"` en tu `package.json` controla cómo se genera el instalador con `electron-builder`. Aquí una breve explicación de los campos más relevantes:

```json
"build": {
  "appId": "com.robomesha.app", // Identificador único de la app
  "productName": "RoboMesha",   // Nombre que se mostrará en el instalador y en el sistema
  "win": {
    "target": "nsis",           // Usamos NSIS para crear instaladores .exe
    "icon": "icon.ico",         // Icono que tendrá el ejecutable
    "extraResources": [
      "path/to/.env"            // Recursos extra que quieres incluir, como archivos de config
    ],
    "directories": {
      "output": "dist"          // Carpeta de salida del ejecutable generado
    },
    "fileAssociations": [
      {
        "ext": "exe",
        "name": "RoboMesha"     // Asociación de archivos, útil para abrir tipos de archivo específicos
      }
    ]
  },
  "nsis": {
    "oneClick": true,                    // Instalación en un solo clic (sin asistente)
    "perMachine": true,                  // Instalación para todos los usuarios del sistema
    "allowToChangeInstallationDirectory": true, // Permite al usuario elegir la carpeta de instalación
    "createDesktopShortcut": true,       // Crea acceso directo en el escritorio
    "createStartMenuShortcut": true      // Crea acceso directo en el menú de inicio
  }
}
```

Puedes modificar estos valores para personalizar el comportamiento y presentación de tu instalador. Más opciones están disponibles en la [documentación oficial](https://www.electron.build/configuration/configuration).

