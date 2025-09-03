import React from 'react';

export default function Button({ variant = 'primary', className = '', children, ...props }) {
  const base = 'px-4 py-2 inline-flex items-center justify-center select-none';
  const styles = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    estop: 'btn-estop',
  };
  return (
    <button className={`${base} ${styles[variant] || ''} ${className}`} {...props}>
      {children}
    </button>
  );
}

