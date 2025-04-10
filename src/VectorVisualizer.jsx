import React, { useRef, useState } from 'react';
import './VectorVisualizer.css';
import { RotateCcw, RotateCw } from 'lucide-react';

export default function VectorVisualizer({ vx, vy, omega, onChangeVector }) {
  const gridSize = 9;
  const cellSize = 24;
  const width = gridSize * cellSize;
  const height = gridSize * cellSize;
  const cx = width / 2;
  const cy = height / 2;
  const scale = 8;

  const [dragging, setDragging] = useState(false);
  const svgRef = useRef(null);

  const dx = vy * scale; // Intercambiado
  const dy = -vx * scale; // Intercambiado
  const endX = cx + dx;
  const endY = cy + dy;

  const animationDuration = `${Math.max(0.5, 2 - Math.abs(omega) * 0.1)}s`;
  const isRotating = omega !== 0;
  const isAtCenter = vx === 0 && vy === 0;

  const limitar = (valor) => Math.max(-9, Math.min(9, valor));

  const handleMouseDown = (e) => {
    setDragging(true);
    handleMouseMove(e);
  };

  const handleTouchMove = (e) => {
    if (!dragging || !onChangeVector) return;
    e.preventDefault();
    const touch = e.touches[0];
    if (!touch) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const touchX = touch.clientX - svgRect.left;
    const touchY = touch.clientY - svgRect.top;

    const rawDx = touchX - cx;
    const rawDy = touchY - cy;

    const newVy = limitar(Math.round(rawDx / scale));
    const newVx = limitar(Math.round(-rawDy / scale));

    onChangeVector(newVx, newVy);
  };

  const handleMouseMove = (e) => {
    if (!dragging || !onChangeVector) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - svgRect.left;
    const mouseY = e.clientY - svgRect.top;

    const rawDx = mouseX - cx;
    const rawDy = mouseY - cy;

    const newVy = limitar(Math.round(rawDx / scale));
    const newVx = limitar(Math.round(-rawDy / scale));

    onChangeVector(newVx, newVy);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div className="vector-container">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="vector-svg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={(e) => {
          setDragging(true);
          handleTouchMove(e);
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setDragging(false)}
      >
        {[...Array(gridSize)].map((_, row) =>
          [...Array(gridSize)].map((_, col) => {
            const x = col * cellSize;
            const y = row * cellSize;
            return (
              <rect
                key={`${row}-${col}`}
                x={x}
                y={y}
                width={cellSize}
                height={cellSize}
                className="grid-cell"
              />
            );
          })
        )}

        <circle cx={cx} cy={cy} r={4} className="center-dot" />

        {!isAtCenter && (
          <line
            x1={cx}
            y1={cy}
            x2={endX}
            y2={endY}
            className="vector-line"
            markerEnd="url(#arrow)"
          />
        )}

        {isAtCenter && (
          <circle cx={cx} cy={cy} r={6} fill="cyan" opacity={0.8} />
        )}

        <foreignObject
          x={cx - 12}
          y={cy - 12}
          width={24}
          height={24}
          className="omega-wrapper"
        >
          <div
            className={`omega-icon ${omega > 0 ? 'rotate-normal' : omega < 0 ? 'rotate-reverse' : ''}`}
            style={{
              animationDuration: animationDuration,
              opacity: isRotating ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            {omega >= 0 ? (
              <RotateCw size={24} color="orange" strokeWidth={2} />
            ) : (
              <RotateCcw size={24} color="orange" strokeWidth={2} />
            )}
          </div>
        </foreignObject>

        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="cyan" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}