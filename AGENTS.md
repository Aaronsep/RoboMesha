# Repository Guidelines

## Project Structure & Modules
- `src/`: React UI (e.g., `App.js`, `VectorVisualizer.jsx`), styles (`*.css`), and Firebase setup (`firebaseConfig.js`).
- `public/`: Static assets and Electron entry (`public/electron.js`).
- `Raspberry/`: Python control script (`firebaseconnect3.py`), service account placeholder, and `requirements_pi.txt`.
- Generated: `build/` (React build) and `dist/` (installer). Do not commit.

## Build, Test, and Development
- `npm start`: Run CRA dev server at `http://localhost:3000`.
- `npm run build`: Produce production build in `build/`.
- `npm test`: Run Jest + React Testing Library in watch mode.
- `npm run electron`: Build React then launch the Electron shell.
- `npm run dist`: Inject `.env` into `firebaseConfig.js` and build Windows installer via `electron-builder`.

## Coding Style & Naming
- JavaScript/JSX with 2‑space indentation; use semicolons; prefer ES modules.
- React components: PascalCase filenames (e.g., `BackgroundVideo.jsx`), default exports where appropriate.
- CSS: Tailwind utility classes in JSX; local styles in `*.css`. Keep class names descriptive.
- Linting: ESLint via `react-app` config. Fix warnings before submitting.

## Testing Guidelines
- Frameworks: Jest + React Testing Library.
- Location: Co‑locate tests as `*.test.js` next to source (e.g., `src/App.test.js`).
- Scope: Add tests for critical UI flows and Firebase interactions; mock network/database calls.
- Run: `npm test` (watch) or `CI=true npm test` for one‑off runs.

## Commit & Pull Requests
- Commit style: Prefer Conventional Commits (e.g., `feat:`, `fix:`, `docs:`, `refactor:`). Avoid vague messages like “Update files”.
- PR checklist:
  - Clear description and scope; link issues.
  - Screenshots/GIFs for UI changes.
  - Steps to reproduce and test results.
  - Ensure `npm run build` succeeds; no ESLint errors.

## Security & Configuration Tips
- Web app: Store Firebase creds in `.env` as `REACT_APP_FIREBASE_*`. Do not commit secrets. `injectEnv.js` embeds values for `npm run dist`.
- Raspberry: Keep service account JSON outside VCS; update `credentials.Certificate(<path>)` accordingly. Install with `pip install -r Raspberry/requirements_pi.txt` in a venv.
