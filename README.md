# RoboMesha

RoboMesha es una mesa robótica educativa autónoma con sensores (LiDAR, ultrasónicos, etc.) y ruedas motorizadas. Permite a estudiantes programar navegación y evitar obstáculos en un entorno seguro, fomentando el aprendizaje práctico de robótica y control.

## Uso de la interfaz

### Requisitos

- **Node.js** (v18 o superior)
- **npm** (v7 o superior)

### Instalación

Desde la carpeta raíz del proyecto, ejecuta:

```bash
npm install
```

Esto descargará todas las dependencias necesarias para el proyecto.

### Ejecución

Para iniciar la interfaz en modo de desarrollo:

```bash
npm start
```

Se abrirá automáticamente en tu navegador en `http://localhost:3000/`.

---

## Crear el Build y Generar el .exe

Para empaquetar la aplicación como un archivo `.exe` de Windows, sigue estos pasos.

### 1. **Construir la aplicación para producción**

Antes de empaquetar la aplicación con Electron, debes generar una versión optimizada del frontend. Ejecuta:

```bash
npm run build
```

Esto creará una carpeta **`build/`** con los archivos listos para producción.

### 2. **Empaquetar la aplicación con Electron**

Asegúrate de que la carpeta **`build/`** esté generada correctamente. Ahora, vamos a empaquetar la aplicación en un archivo `.exe`.

#### 2.1 Instalar Electron Packager

Si aún no has instalado **Electron Packager**, ejecuta:

```bash
npm install --save-dev electron-packager
```

#### 2.2 Generar el `.exe`

Después de instalar **Electron Packager**, agrega el siguiente script en tu archivo `package.json` para empaquetar la aplicación:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject",
  "electron": "npm run build && electron .",
  "dist": "electron-packager . RoboMesha --platform=win32 --arch=x64 --out=dist --overwrite --icon=icon.ico"
}
```

#### 2.3 Crear el archivo `.exe`

Ejecuta el siguiente comando para crear el archivo `.exe`:

```bash
npm run dist
```

Esto creará una carpeta **`dist/`** y dentro de ella encontrarás una subcarpeta **`RoboMesha-win32-x64/`**. Dentro de esa carpeta estará el archivo ejecutable **`RoboMesha.exe`**.

### 3. **Cambiar el nombre del `.exe` y agregar un icono**

Si deseas cambiar el nombre del archivo `.exe` o agregar un icono, puedes hacerlo en el comando de **`electron-packager`**.

#### 3.1 Cambiar el nombre

Para cambiar el nombre del archivo `.exe`, modifica el nombre en el comando, por ejemplo:

```json
"dist": "electron-packager . MiAplicacion --platform=win32 --arch=x64 --out=dist --overwrite --icon=icon.ico"
```

Esto generará el archivo `.exe` con el nombre **`MiAplicacion.exe`**.

#### 3.2 Agregar un icono

Si deseas agregar un icono al `.exe`, coloca tu archivo `.ico` en la raíz del proyecto y modifica el comando de la siguiente manera:

```json
"dist": "electron-packager . RoboMesha --platform=win32 --arch=x64 --out=dist --overwrite --icon=icon.ico"
```

Asegúrate de que el archivo `icon.ico` esté en la raíz de tu proyecto.

---

### 4. **Probar el .exe**

Una vez que hayas generado el `.exe`, navega a la carpeta **`dist/`** y ejecuta el archivo **`RoboMesha.exe`**. La aplicación debería abrirse como una aplicación de escritorio nativa en Windows.

---

## Notas

- Si necesitas realizar alguna configuración avanzada con Electron, consulta la [documentación oficial de Electron](https://www.electronjs.org/docs).
- Si prefieres usar `electron-builder` en lugar de `electron-packager`, puedes seguir los mismos pasos pero usando los comandos específicos de `electron-builder`.
