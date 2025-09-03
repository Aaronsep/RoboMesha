import React from 'react';

function BackgroundVideo() {
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
        zIndex: -10,
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
