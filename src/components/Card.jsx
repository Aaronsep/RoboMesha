import React from 'react';

export default function Card({ className = '', children }) {
  return (
    <div className={`glass-card ${className}`}>{children}</div>
  );
}

