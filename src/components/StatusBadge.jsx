import React from 'react';

export default function StatusBadge({ connected }) {
  return (
    <span className="status-badge">
      <span className={`w-2.5 h-2.5 rounded-full ${connected ? 'bg-green-400' : 'bg-red-500'}`} />
      {connected ? 'Conectado' : 'Desconectado'}
    </span>
  );
}

