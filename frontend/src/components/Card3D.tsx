"use client";

import React, { useRef, useState, useCallback } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glare?: boolean;
  scale?: number;
  onClick?: () => void;
}

export default function Card3D({
  children,
  className = "",
  maxTilt = 10,
  perspective = 1000,
  glare = true,
  scale = 1.02,
  onClick
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const percentX = (mouseX / width) * 100;
    const percentY = (mouseY / height) * 100;

    const xRatio = (mouseX - width / 2) / (width / 2);
    const yRatio = (mouseY - height / 2) / (height / 2);

    const rotateX = -yRatio * maxTilt;
    const rotateY = xRatio * maxTilt;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s cubic-bezier(0.2, 0, 0, 1)',
    });

    if (glare) {
      setGlareStyle({
        opacity: 1,
        background: `radial-gradient(circle at ${percentX.toFixed(1)}% ${percentY.toFixed(1)}%, rgba(255, 255, 255, 0.18) 0%, transparent 65%)`,
      });
    }
  }, [maxTilt, perspective, glare, scale]);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    });
    if (glare) {
      setGlareStyle({
        opacity: 0,
        transition: 'opacity 0.4s ease',
      });
    }
  }, [perspective, glare]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={style}
      className={`card-3d-wrapper preserve-3d cursor-pointer ${className}`}
    >
      {/* Specular Glare Reflection */}
      {glare && (
        <div
          style={glareStyle}
          className="card-3d-glare"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
