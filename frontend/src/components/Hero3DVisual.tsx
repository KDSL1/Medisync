"use client";

import React, { useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Heart,
  TrendingUp,
  FileText,
  User,
  Layers,
  Dna
} from 'lucide-react';

// Dynamic import for WebGL Three.js component to prevent SSR hydration mismatches
const MedicalDNA3D = dynamic(() => import('./MedicalDNA3D'), { ssr: false });

export default function Hero3DVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 6, y: -8 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<'3D_TELEMETRY' | 'OPD_QUEUE'>('3D_TELEMETRY');

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xRatio = (mouseX - width / 2) / (width / 2);
    const yRatio = (mouseY - height / 2) / (height / 2);

    // Limit tilt to smooth range
    const rotX = -yRatio * 10;
    const rotY = xRatio * 14;

    setRotation({ x: rotX, y: rotY });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Return to a gentle default perspective tilt
    setRotation({ x: 5, y: -6 });
  }, []);

  return (
    <div 
      className="relative w-full max-w-5xl mx-auto mt-10 mb-8 perspective-2000 py-6 select-none"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/25 via-teal-500/20 to-indigo-500/25 blur-3xl -z-10 rounded-full scale-90 animate-pulse-slow pointer-events-none" />

      {/* Main 3D Container with Preserve-3D */}
      <div 
        style={{
          transform: `perspective(1200px) rotateX(${rotation.x.toFixed(2)}deg) rotateY(${rotation.y.toFixed(2)}deg)`,
          transition: isHovered ? 'transform 0.1s cubic-bezier(0.2, 0, 0, 1)' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="relative w-full preserve-3d transition-transform duration-300"
      >

        {/* ----------------------------------------------------
            LAYER 0: Base Clinical Workstation Terminal Screen
           ---------------------------------------------------- */}
        <div className="relative rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 shadow-2xl backdrop-blur-2xl p-6 sm:p-8 overflow-hidden">
          
          {/* Top Window Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-amber-500 shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs" />
              <span className="ml-3 text-xs font-mono text-slate-400 dark:text-slate-500">
                medisync://clinical-cockpit.local &bull; ABDM-M3
              </span>
            </div>

            {/* 3D View Switcher Tabs */}
            <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
              <button
                onClick={() => setActiveTab('3D_TELEMETRY')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
                  activeTab === '3D_TELEMETRY'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Dna className="w-3.5 h-3.5" />
                <span>3D Genomic Twin</span>
              </button>
              <button
                onClick={() => setActiveTab('OPD_QUEUE')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'OPD_QUEUE'
                    ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>OPD Queue Telemetry</span>
              </button>
            </div>
          </div>

          {/* Interactive Dual-Panel Terminal Body */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left 3D Panel: Metrics and Queue */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Metric 3-Grid */}
              <div className="grid grid-cols-3 gap-3">
                
                {/* Metric 1 */}
                <div className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span>OPD Footfall</span>
                    <TrendingUp className="w-3.5 h-3.5 text-brand-500" />
                  </div>
                  <div className="mt-1.5 text-xl font-black text-slate-900 dark:text-white">
                    142
                  </div>
                  <div className="mt-0.5 text-[10px] text-emerald-600 font-semibold">
                    +18% today
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span>Avg Triage</span>
                    <Clock className="w-3.5 h-3.5 text-teal-500" />
                  </div>
                  <div className="mt-1.5 text-xl font-black text-slate-900 dark:text-white">
                    4m 12s
                  </div>
                  <div className="mt-0.5 text-[10px] text-teal-600 dark:text-teal-400 font-semibold">
                    Auto-Vitals
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span>ABDM Security</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="mt-1.5 text-xl font-black text-slate-900 dark:text-white">
                    99.98%
                  </div>
                  <div className="mt-0.5 text-[10px] text-slate-400">
                    M3 Encrypted
                  </div>
                </div>

              </div>

              {/* Sub-table Preview */}
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden text-xs shadow-xs">
                <div className="bg-slate-50/90 dark:bg-slate-950/80 px-4 py-2.5 font-semibold text-slate-700 dark:text-slate-300 flex justify-between items-center border-b border-slate-100 dark:border-slate-800">
                  <span className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Real-Time Triage Dispatch</span>
                  </span>
                  <span className="text-[11px] text-brand-600 dark:text-brand-400 font-mono">Live Sync</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white/60 dark:bg-slate-900/60">
                  <div className="px-4 py-2.5 flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span className="font-mono font-bold text-brand-600 dark:text-brand-400">#CARD-101</span>
                    <span>Rahul Sharma &bull; 32M</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-semibold text-[10px]">In Consultation</span>
                  </div>
                  <div className="px-4 py-2.5 flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span className="font-mono font-bold text-slate-500">#CARD-102</span>
                    <span>Priya Patel &bull; 28F</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-[10px]">Next in Lobby</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right 3D Panel: Interactive Three.js WebGL DNA Canvas */}
            <div className="lg:col-span-5 relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900 border border-slate-800/80 p-2 overflow-hidden shadow-inner flex flex-col items-center justify-center min-h-[300px]">
              <div className="absolute top-3 left-3 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                <Dna className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
                <span>3D Health Mesh &bull; Active</span>
              </div>
              <MedicalDNA3D height="280px" className="w-full" />
            </div>

          </div>

        </div>

        {/* ----------------------------------------------------
            LAYER 1: Floating 3D Vitals Card (translateZ: 35px)
           ---------------------------------------------------- */}
        <div 
          className="absolute -top-6 -left-4 sm:-left-8 sm:-top-8 w-64 sm:w-72 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-teal-500/40 dark:border-teal-500/50 shadow-2xl backdrop-blur-xl p-4 preserve-3d animate-float-3d translate-z-40 hologram-glow"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 flex items-center justify-center text-teal-600">
                <Heart className="w-4 h-4 text-rose-500 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Live Patient Vitals</div>
                <div className="text-[10px] text-slate-500">ABHA: 91-4829-1092</div>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              STABLE
            </span>
          </div>

          {/* SVG Animated Heartbeat Line */}
          <div className="mt-3 relative h-10 w-full overflow-hidden rounded-lg bg-slate-950/90 dark:bg-black/90 p-1 flex items-center">
            <svg className="w-full h-8" viewBox="0 0 200 40" fill="none">
              <path
                d="M 0 20 L 40 20 L 50 10 L 60 30 L 70 5 L 80 35 L 90 20 L 140 20 L 150 12 L 160 28 L 170 20 L 200 20"
                stroke="#14b8a6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute right-2 top-1 text-[10px] font-mono text-teal-400 font-bold">
              72 BPM
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-medium pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>BP: <strong className="text-slate-900 dark:text-white font-mono">120/80</strong></span>
            <span>SpO2: <strong className="text-teal-600 dark:text-teal-400 font-mono">99%</strong></span>
            <span>Temp: <strong className="text-slate-900 dark:text-white font-mono">98.6°F</strong></span>
          </div>
        </div>

        {/* ----------------------------------------------------
            LAYER 2: Floating 3D Token Ticket (translateZ: 55px)
           ---------------------------------------------------- */}
        <div 
          className="absolute -bottom-6 -right-4 sm:-right-8 sm:-bottom-8 w-64 sm:w-72 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-brand-500/40 dark:border-brand-500/50 shadow-2xl backdrop-blur-xl p-4 preserve-3d animate-float-3d-delayed translate-z-60 hologram-glow"
          style={{ transform: 'translateZ(60px)' }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 font-mono">
              Smart OPD Token
            </span>
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-3xl font-black font-mono text-slate-900 dark:text-white tracking-tight">
              CARD-101
            </div>
            <div className="text-right">
              <div className="text-[11px] font-bold text-slate-900 dark:text-white">Room 03</div>
              <div className="text-[10px] text-slate-500">Cardiology Dept</div>
            </div>
          </div>

          <div className="mt-3 p-2 rounded-xl bg-brand-50/80 dark:bg-brand-950/60 border border-brand-100 dark:border-brand-900 flex items-center justify-between text-[11px]">
            <span className="font-semibold text-brand-900 dark:text-brand-200">Dr. Vikram Mehta</span>
            <span className="text-brand-600 dark:text-brand-400 font-bold">Calling Now</span>
          </div>
        </div>

        {/* ----------------------------------------------------
            LAYER 3: Floating 3D AI Explainer Pill (translateZ: 65px)
           ---------------------------------------------------- */}
        <div 
          className="hidden sm:flex absolute top-1/2 -right-12 -translate-y-1/2 rounded-full bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 px-4 py-2 shadow-2xl border border-slate-700 dark:border-slate-200 items-center space-x-2.5 preserve-3d animate-float-3d"
          style={{ transform: 'translateZ(70px)' }}
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs shadow-xs">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <div className="text-xs">
            <span className="font-bold">AI Explainer: </span>
            <span className="text-slate-300 dark:text-slate-600">Hemoglobin 14.2 g/dL &bull; Normal</span>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
        </div>

      </div>
    </div>
  );
}
