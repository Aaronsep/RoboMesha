import React, { useRef, useState, useEffect, useMemo } from 'react';

export default function Joystick({ size = 200, onChange, value = { vx: 0, vy: 0 } }) {
  const containerRef = useRef(null);
  const activeId = useRef(null); // dedo asignado a ESTE joystick
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const padding = 14;
  const radius = size / 2 - padding;
  const deadzone = 0.08; // 8%

  // reflejar cambios controlados
  useEffect(() => {
    const nx = Math.max(-1, Math.min(1, value.vy / 9));
    const ny = Math.max(-1, Math.min(1, -value.vx / 9));
    setPos({ x: nx * radius, y: ny * radius });
  }, [value.vx, value.vy, radius]);

  const ticks = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  const handleXY = (clientX, clientY) => {
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    let dx = clientX - cx;
    let dy = clientY - cy;

    const dist = Math.hypot(dx, dy) || 1;
    const max = radius;
    if (dist > max) {
      dx = (dx / dist) * max;
      dy = (dy / dist) * max;
    }
    setPos({ x: dx, y: dy });

    // normalizar a [-1,1]
    let nx = dx / max;
    let ny = dy / max;
    if (Math.hypot(nx, ny) < deadzone) nx = ny = 0;

    // mapear a [-9, 9]
    const vy = Math.round(nx * 9);   // derecha positivo
    const vx = Math.round(-ny * 9);  // arriba positivo
    onChange?.(vx, vy);
    if (navigator?.vibrate && vx === 0 && vy === 0) navigator.vibrate(10);
  };

  // multitouch: capturar un dedo por joystick
  const onPointerDown = (e) => {
    if (activeId.current !== null) return;
    activeId.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    handleXY(e.clientX, e.clientY);
  };
  const onPointerMove = (e) => {
    if (e.pointerId !== activeId.current) return;
    handleXY(e.clientX, e.clientY);
  };
  const release = (e) => {
    if (e.pointerId !== activeId.current) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    activeId.current = null;
    setPos({ x: 0, y: 0 });
    onChange?.(0, 0);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      style={{ width: size, height: size, touchAction: 'none' }}
      className="relative select-none rounded-full shadow-2xl border border-white/10 ring-1 ring-white/10 overflow-hidden"
    >
      {/* Fondo y aros */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800/70 to-slate-900/70" />
      <div className="absolute inset-2 rounded-full border border-white/10" />

      {/* Cruz */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-0.5 h-[88%] bg-white/10" />
        <div className="h-0.5 w-[88%] bg-white/10 absolute" />
      </div>

      {/* Marcas */}
      {ticks.map((i) => {
        const major = i % 6 === 0;
        const len = major ? 14 : 8;
        const thickness = major ? 2 : 1;
        const angle = (i / ticks.length) * 360;
        const offset = radius - len - 4;
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 origin-center"
            style={{ transform: `rotate(${angle}deg) translate(${offset}px)` }}
          >
            <div className="bg-white/30 rounded" style={{ width: thickness, height: len }} />
          </div>
        );
      })}

      {/* Punto centro */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40" />

      {/* Thumb circular semitransparente */}
      <div
        className="absolute rounded-full"
        style={{
          left: '50%',
          top: '50%',
          width: size / 2,                 // el diámetro lo haces proporcional al joystick
          height: size / 2,
          transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
          backgroundColor: 'rgba(0,0,0,0.4)',  // color oscuro semitransparente
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500" />
        <div
          className="absolute inset-0 rounded-full mix-blend-overlay"
          style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.35), transparent 60%)' }}
        />
      </div>
    </div>
  );
}
