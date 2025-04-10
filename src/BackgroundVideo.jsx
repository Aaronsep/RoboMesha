import React, { useEffect, useState } from 'react';

function BackgroundVideo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  return (
    <video
      autoPlay
      loop
      muted
      className="absolute top-0 left-0 w-full h-full object-cover brightness-70"
    >
      <source
        src={isMobile ? '/video-vertical.mp4' : '/153957-806571952_medium.mp4'}
        type="video/mp4"
      />
      Tu navegador no soporta videos HTML5.
    </video>
  );
}

export default BackgroundVideo;
