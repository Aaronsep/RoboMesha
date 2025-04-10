import React, { useState, useRef, useEffect } from 'react';
import { ref, set } from 'firebase/database';
import { database } from './firebaseConfig';
import './CustomButtons.css';
import { RotateCcw, RotateCw } from 'lucide-react';
import VectorVisualizer from './VectorVisualizer';
import './App.css';
import BackgroundVideo from './BackgroundVideo';

export default function App() {
  const [vx, setVx] = useState(0);
  const [vy, setVy] = useState(0);
  const [w, setW] = useState(0);

  const vxRef = useRef(vx);
  const vyRef = useRef(vy);
  const wRef = useRef(w);

  const videoRef = useRef(null);

  const limitar = (valor) => Math.max(-9, Math.min(9, valor));

  const updateState = (newVx, newVy, newW) => {
    setVx(newVx);
    setVy(newVy);
    setW(newW);

    vxRef.current = newVx;
    vyRef.current = newVy;
    wRef.current = newW;

    const comando = {
      accion: newVx || newVy || newW ? 'mover' : 'detener',
      vx: vxRef.current,
      vy: vyRef.current,
      w: wRef.current,
      timestamp: Date.now(),
    };

    set(ref(database, 'comandos/robomesha'), comando)
      .then(() => {
        setTimeout(() => {
          set(ref(database, 'comandos/robomesha'), {
            ...comando,
            timestamp: comando.timestamp + 10,
          });
        }, 50);
      });
  };

  const comando = (direccion) => {
    let newVx = vx;
    let newVy = vy;
    let newW = w;

    if (direccion === 'adelante') newVx = limitar(vx + 1);
    if (direccion === 'abajo') newVx = limitar(vx - 1);

    if (direccion === 'derecha') newVy = limitar(vy + 1);
    if (direccion === 'izquierda') newVy = limitar(vy - 1);

    if (direccion === 'rot_der') newW = limitar(w + 1);
    if (direccion === 'rot_izq') newW = limitar(w - 1);

    if (direccion === 'detener') {
      newVx = 0;
      newVy = 0;
      newW = 0;
    }

    updateState(newVx, newVy, newW);
  };

  const botones = [
    { label: "rot_izq", action: "rot_izq", rotation: "45" },
    { label: "adelante", action: "adelante", rotation: "90" },
    { label: "rot_der", action: "rot_der", rotation: "135" },
    { label: "izquierda", action: "izquierda", rotation: "0" },
    { label: "detener", action: "detener", shape: "square" },
    { label: "derecha", action: "derecha", rotation: "-180"},
    { label: "abajo", action: "abajo", rotation: "-90", span: true },
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();  // Reproducir el video
    }
  }, []);

  return (
    <div className="App">
      <BackgroundVideo />

      <div className="absolute top-5 left-5 text-white text-xl z-20 hidden">
        <p>Vx = {vx} | Vy = {vy} | ω = {w}</p>
      </div>


      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-xl flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-8 tracking-tight text-white text-center">Control de Movimiento<br />RoboMesha</h1>

          <div className="grid grid-cols-3 gap-6 w-full">
          {botones.map(({ label, action, rotation, shape, span }, idx) => (
            <div key={idx} className={span ? 'col-span-3 flex justify-center' : 'flex justify-center'}>
              <button
                className={`button ${rotation ? `rotate-${rotation}` : ''} ${shape === 'square' ? 'button-stop' : ''}`}
                onClick={() => comando(action)}
              >
                <div className="button-box">
                  {shape === 'square' ? (
                    <span className="button-elem">
                      <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <mask id="hole">
                            <rect width="46" height="40" fill="white" />
                            <rect x="16" y="14" width="13" height="12" rx="2" ry="2" fill="black" />
                          </mask>
                        </defs>
                        <rect x="10" y="10" width="25" height="20" rx="2" ry="2" fill="#f0eeef" mask="url(#hole)" />
                      </svg>
                    </span>
                  ) : action === 'rot_izq' ? (
                    <span className="button-elem">
                      <RotateCcw className="rotate-180" size={20} color="#f0eeef" strokeWidth={2} />
                    </span>
                  ) : action === 'rot_der' ? (
                    <span className="button-elem">
                      <RotateCw size={20} color="#f0eeef" strokeWidth={2} />
                    </span>
                  ) : (
                    <span className="button-elem">
                      <svg
                        viewBox="0 0 46 40"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ transform: `rotate(${rotation}deg)` }}
                      >
                        <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
                      </svg>
                    </span>
                  )}
                </div>
              </button>
            </div>
          ))}

          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-300 text-center w-full">
            <div>Vx = {vx} | Vy = {vy} | ω = {w}</div>
            <div>M1: 0 | M2: 0 | M3: 0 | M4: 0</div>
            <div className="col-span-2">PWM M1: 0 | PWM M2: 0 | PWM M3: 0 | PWM M4: 0</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mt-6">
          <VectorVisualizer
            vx={vx}
            vy={vy}
            omega={w}
            onChangeVector={(newVx, newVy) => updateState(newVx, newVy, w)}
          />

          <div className="flex flex-col gap-4 p-4 bg-white/10 rounded-xl shadow-lg backdrop-blur-sm border border-white/20 w-full sm:w-60">
              {[
                { label: 'Vx', value: vx, onChange: e => updateState(parseInt(e.target.value), vy, w) },
                { label: 'Vy', value: vy, onChange: e => updateState(vx, parseInt(e.target.value), w) },
                { label: 'ω', value: w, onChange: e => updateState(vx, vy, parseInt(e.target.value)) },
              ].map(({ label, value, onChange }) => (
                <div key={label} className="flex flex-col gap-1">
                  <label className="text-white text-sm font-semibold">{label}</label>
                  <input
                    type="range"
                    min="-9"
                    max="9"
                    value={value}
                    onChange={onChange}
                    className="w-full h-2 rounded-lg appearance-none bg-gradient-to-r from-blue-500 to-white focus:outline-none accent-cyan-400"
                  />
                </div>
              ))}
            </div>

          </div>

          <button className="mt-8 px-10 py-3 text-xl font-bold rounded-xl bg-red-600 hover:bg-red-700">
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}
