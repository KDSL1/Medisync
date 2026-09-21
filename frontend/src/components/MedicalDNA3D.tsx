"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface MedicalDNA3DProps {
  className?: string;
  height?: string;
}

export default function MedicalDNA3D({ 
  className = "",
  height = "380px" 
}: MedicalDNA3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const heightPx = container.clientHeight || 380;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance" 
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D medical elements
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x0ea5e9, 3, 50);
    cyanLight.position.set(10, 10, 10);
    scene.add(cyanLight);

    const tealLight = new THREE.PointLight(0x14b8a6, 2.5, 50);
    tealLight.position.set(-10, -10, 10);
    scene.add(tealLight);

    const purpleLight = new THREE.PointLight(0x8b5cf6, 1.5, 50);
    purpleLight.position.set(0, 15, -5);
    scene.add(purpleLight);

    // Materials
    const cyanSphereMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x0369a1,
      emissiveIntensity: 0.4,
    });

    const tealSphereMat = new THREE.MeshStandardMaterial({
      color: 0x14b8a6,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x0d9488,
      emissiveIntensity: 0.4,
    });

    const rungMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.4,
      metalness: 0.6,
      transparent: true,
      opacity: 0.75,
    });

    // Build DNA Double Helix
    const sphereGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const rungGeo = new THREE.CylinderGeometry(0.06, 0.06, 1, 8);
    
    const numPairs = 24;
    const helixRadius = 2.4;
    const helixHeight = 14;
    const twistFactor = 0.35;

    for (let i = 0; i < numPairs; i++) {
      const y = (i / numPairs) * helixHeight - helixHeight / 2;
      const angle = i * twistFactor;

      const x1 = Math.cos(angle) * helixRadius;
      const z1 = Math.sin(angle) * helixRadius;

      const x2 = Math.cos(angle + Math.PI) * helixRadius;
      const z2 = Math.sin(angle + Math.PI) * helixRadius;

      // Node 1
      const sphere1 = new THREE.Mesh(sphereGeo, cyanSphereMat);
      sphere1.position.set(x1, y, z1);
      dnaGroup.add(sphere1);

      // Node 2
      const sphere2 = new THREE.Mesh(sphereGeo, tealSphereMat);
      sphere2.position.set(x2, y, z2);
      dnaGroup.add(sphere2);

      // Connecting Rung
      const rung = new THREE.Mesh(rungGeo, rungMat);
      const p1 = new THREE.Vector3(x1, y, z1);
      const p2 = new THREE.Vector3(x2, y, z2);
      
      const distance = p1.distanceTo(p2);
      rung.scale.set(1, distance, 1);
      rung.position.copy(p1).lerp(p2, 0.5);

      const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(up, dir);
      rung.setRotationFromQuaternion(quaternion);

      dnaGroup.add(rung);
    }

    // Floating Ambient Particles (Cloud of clinical data molecules)
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x0ea5e9);
    const color2 = new THREE.Color(0x14b8a6);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 12;

      const mixed = Math.random() > 0.5 ? color1 : color2;
      colors[i] = mixed.r;
      colors[i + 1] = mixed.g;
      colors[i + 2] = mixed.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Subtle 3D Pulse Rings around Helix center
    const ringGeo = new THREE.TorusGeometry(3.6, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: 0x0ea5e9, 
      transparent: true, 
      opacity: 0.4 
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2.5;
    dnaGroup.add(ring1);

    const ring2 = ring1.clone();
    ring2.rotation.x = -Math.PI / 3;
    ring2.scale.set(1.15, 1.15, 1.15);
    dnaGroup.add(ring2);

    // Tilt DNA slightly for appealing 3D isometric view
    dnaGroup.rotation.z = 0.25;

    // Mouse Interaction State
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / heightPx - 0.5;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        mouseX = x;
        mouseY = y;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 380;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous rotation
      dnaGroup.rotation.y += 0.012;

      // Parallax damping to mouse position
      if (!isDragging) {
        targetRotationY = mouseX * 0.8;
        targetRotationX = mouseY * 0.5;
      }

      dnaGroup.rotation.x += (targetRotationX - dnaGroup.rotation.x) * 0.05;
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      // Pulse floating rings
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.25;

      // Gentle wave float for particles
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      rungGeo.dispose();
      ringGeo.dispose();
      particleGeometry.dispose();
      cyanSphereMat.dispose();
      tealSphereMat.dispose();
      rungMat.dispose();
      particleMaterial.dispose();
      ringMat.dispose();
    };
  }, []);

  return (
    <div 
      className={`relative cursor-grab active:cursor-grabbing select-none flex items-center justify-center ${className}`}
      style={{ height }}
      ref={containerRef}
    >
      {/* 3D Interaction Badge */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/80 dark:bg-white/80 text-white dark:text-slate-900 text-[10px] font-mono tracking-wider shadow-lg backdrop-blur-md border border-white/20 dark:border-slate-800 pointer-events-none transition-opacity duration-300 flex items-center space-x-1.5 z-10">
        <span className={`w-1.5 h-1.5 rounded-full ${isInteracting ? 'bg-emerald-400 animate-ping' : 'bg-brand-400'}`} />
        <span>3D WEBGL &bull; DRAG TO ORBIT</span>
      </div>
    </div>
  );
}
