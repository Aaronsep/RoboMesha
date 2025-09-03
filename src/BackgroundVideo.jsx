import React, { useEffect, useState, useRef } from 'react';

function BackgroundVideo() {
  const [isMobileUI, setIsMobileUI] = useState(false);

  useEffect(() => {
    const mqWidth = window.matchMedia('(max-width: 639.98px)');
    const mqTouch = window.matchMedia('(pointer: coarse)');
    const onChange = () => setIsMobileUI(mqWidth.matches || mqTouch.matches);
    onChange();
    mqWidth.addEventListener ? mqWidth.addEventListener('change', onChange) : mqWidth.addListener(onChange);
    mqTouch.addEventListener ? mqTouch.addEventListener('change', onChange) : mqTouch.addListener(onChange);
    return () => {
      mqWidth.removeEventListener ? mqWidth.removeEventListener('change', onChange) : mqWidth.removeListener(onChange);
      mqTouch.removeEventListener ? mqTouch.removeEventListener('change', onChange) : mqTouch.removeListener(onChange);
    };
  }, []);

  const [needsPermission, setNeedsPermission] = useState(false);
  const [motionActive, setMotionActive] = useState(false);
  const [motionError, setMotionError] = useState(null);
  const orientationHandlerRef = useRef(null);

  useEffect(() => {
    if (!isMobileUI) return;
    const el = document.body;
    el.classList.add('gyro-gradient');
    el.classList.add('lock-scroll');

    const setVars = (x, y) => {
      el.style.setProperty('--posX', String(x));
      el.style.setProperty('--posY', String(y));
    };

    const handleOrientation = (e) => {
      const beta = e.beta || 0;
      const gamma = e.gamma || 0;
      const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
      const nx = clamp(gamma / 45, -1, 1);
      const ny = clamp(beta / 45, -1, 1);
      const amplitude = Math.min(window.innerWidth, window.innerHeight) * 0.12;
      setVars((nx * amplitude).toFixed(2), (ny * amplitude).toFixed(2));
      setMotionActive(true);
    };
    orientationHandlerRef.current = handleOrientation;

    const iOSNeedsPermission = typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function';
    if (iOSNeedsPermission) {
      setNeedsPermission(true);
    } else if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
      setNeedsPermission(false);
      // If no events arrive within 2s, keep static background
      setTimeout(() => {
        if (!motionActive) setMotionError('Sin datos del giroscopio');
      }, 2000);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      el.classList.remove('gyro-gradient');
      el.classList.remove('lock-scroll');
      el.style.removeProperty('--posX');
      el.style.removeProperty('--posY');
    };
  }, [isMobileUI]);

  const requestMotion = async () => {
    try {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        const res = await DeviceOrientationEvent.requestPermission();
        if (res === 'granted') {
          if (orientationHandlerRef.current) {
            window.addEventListener('deviceorientation', orientationHandlerRef.current, true);
          }
          setNeedsPermission(false);
          setMotionError(null);
          // If still no events after 2s, inform but keep UI
          setTimeout(() => {
            if (!motionActive) setMotionError('Sin datos del giroscopio');
          }, 2000);
        }
      }
    } catch (_) { /* ignore */ }
  };

  if (isMobileUI) {
    return (
      <>
        {needsPermission && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <div className="glass-card max-w-sm w-full p-5 text-center pointer-events-auto">
              <h2 className="text-white text-lg font-semibold mb-2">Habilitar movimiento</h2>
              <p className="text-white/70 text-sm mb-4">Para animar el fondo con el giroscopio, permite el acceso al sensor.</p>
              <button onClick={requestMotion} className="btn-primary w-full">Permitir</button>
              {motionError && <p className="mt-3 text-xs text-white/50">Si no aparece el diálogo, activa “Motion & Orientation Access” en Safari y recarga.</p>}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        objectFit: 'cover',
        pointerEvents: 'none',
      }}
    >
      <source src="153957-806571952_medium.mp4" type="video/mp4" />
      Tu navegador no soporta videos HTML5.
    </video>
  );
}

export default BackgroundVideo;
