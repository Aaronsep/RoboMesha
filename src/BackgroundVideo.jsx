import React, { useEffect, useState } from 'react';

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

  if (isMobileUI) {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-900 via-surface-800 to-surface-900" />
        <div className="absolute -top-10 -left-10 w-[65vw] h-[65vw] bg-primary/25 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-[-8%] right-[-8%] w-[55vw] h-[55vw] bg-cyan-300/20 rounded-full blur-3xl animate-float-slower" />
      </div>
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
