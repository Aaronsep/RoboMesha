import React, { useRef, useState, useEffect, useMemo } from 'react';

export default function Dial({ size = 160, onChange, value = 0 }) {
  const ref = useRef(null);
  const activeId = useRef(null); // dedo asignado a ESTE dial
  const [angle, setAngle] = useState(0);    // 0° = arriba
  const limit = 135;
  const ticks = useMemo(() => Array.from({ length: 21 }, (_, i) => i), []);

  const cx = size / 2, cy = size / 2;
  const rOuter = size / 2 - 8;        // radio marcas
  const rNeedle = rOuter - 6;         // radio aguja

  // sincroniza si te pasan value controlado
  useEffect(() => {
    const a = Math.max(-9, Math.min(9, value)) * (limit / 9);
    setAngle(a);
  }, [value]);

  // 0° arriba, sentido horario positivo, SIN inversión
  const compute = (clientX, clientY) => {
    const rect = ref.current.getBoundingClientRect();
    const dx = clientX - (rect.left + rect.width / 2);
    const dy = clientY - (rect.top + rect.height / 2);

    let ang = Math.atan2(dx, -dy) * (180 / Math.PI); // apunta donde tocas
    if (ang < -180) ang += 360;
    if (ang >  180) ang -= 360;
    ang = Math.max(-limit, Math.min(limit, ang));

    setAngle(ang);
    onChange?.(Math.round((ang / limit) * 9));
  };

  const snapToZero = () => {
    setAngle(0);
    onChange?.(0);
  };

  // multitouch: capturar un dedo por dial
  const onPointerDown = (e) => {
    if (activeId.current !== null) return;
    activeId.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    compute(e.clientX, e.clientY);
  };
  const onPointerMove = (e) => {
    if (e.pointerId !== activeId.current) return;
    compute(e.clientX, e.clientY);
  };
  const release = (e) => {
    if (e.pointerId !== activeId.current) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    activeId.current = null;
    snapToZero(); // soltar => ω = 0
  };

  const polar = (aDeg, r) => {
    const rad = (aDeg * Math.PI) / 180;
    return [cx + r * Math.sin(rad), cy - r * Math.cos(rad)];
  };

  return (
    <div
      ref={ref}
      className="relative rounded-full select-none shadow-2xl border border-white/10 ring-1 ring-white/10 overflow-hidden"
      style={{ width: size, height: size, touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={() => {
        // si se va el dedo fuera aún capturado, mantenemos control; si no, centra
        if (activeId.current === null) snapToZero();
      }}
    >
      {/* Fondo/aros */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800/70 to-slate-900/70" />
      <div className="absolute inset-2 rounded-full border border-white/10" />
      <div className="absolute inset-6 rounded-full border border-white/10" />

      {/* SVG centrado para ticks y aguja */}
      <svg className="absolute inset-0" width={size} height={size}>
        {/* Ticks en arco [-limit, limit] */}
        {ticks.map((i) => {
          const prog = i / (ticks.length - 1);
          const a = -limit + prog * (limit * 2);
          const major = i % 5 === 0;
          const len = major ? 14 : 8;
          const [x1, y1] = polar(a, rOuter - len);
          const [x2, y2] = polar(a, rOuter);
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={major ? 2 : 1}
              strokeLinecap="round"
            />
          );
        })}

        {/* Aguja */}
        {(() => {
          const [x2, y2] = polar(angle, rNeedle);
          return (
            <>
              <line
                x1={cx} y1={cy} x2={x2} y2={y2}
                stroke="rgb(34,211,238)"  // cyan-400
                strokeWidth={6}
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.6))' }}
              />
              <circle cx={cx} cy={cy} r={12} fill="url(#capGradient)" stroke="rgba(255,255,255,0.3)" />
              <defs>
                <radialGradient id="capGradient" cx="30%" cy="30%">
                  <stop offset="0%" stopColor="rgba(165,243,252,1)" />
                  <stop offset="100%" stopColor="rgba(34,211,238,1)" />
                </radialGradient>
              </defs>
            </>
          );
        })()}
      </svg>

      {/* Etiqueta */}
      <div className="absolute left-1/2 bottom-3 -translate-x-1/2 px-2 py-0.5 rounded-md text-xs font-semibold text-white bg-black/40 border border-white/10">
        ω = {Math.round((angle / limit) * 9)}
      </div>
    </div>
  );
}
