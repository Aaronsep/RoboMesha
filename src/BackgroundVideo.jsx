import React, { useEffect, useState } from 'react';

function BackgroundVideo() {
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });

  // Actualiza el tamaño del video al cambiar el tamaño de la ventana
  useEffect(() => {
    const updateVideoSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setVideoSize({ width, height });
    };

    // Inicializar el tamaño del video al cargar
    updateVideoSize();

    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener('resize', updateVideoSize);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', updateVideoSize);
    };
  }, []);

  return (
    <video
      autoPlay
      loop
      muted
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${videoSize.width}px`,
        height: `${videoSize.height}px`,
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
