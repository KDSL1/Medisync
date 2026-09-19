"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { 
  User, 
  Stethoscope, 
  ClipboardList, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  FileText, 
  CheckCircle2, 
  Activity, 
  Lock, 
  Database,
  Layers,
  Cpu,
  RefreshCw,
  Sliders,
  ExternalLink,
  Code2,
  Terminal,
  Check,
  ShieldAlert,
  ArrowUpRight,
  Heart,
  Eye,
  ChevronRight,
  Zap,
  FolderGit2,
  Server,
  Share2,
  LockKeyhole
} from 'lucide-react';

export default function AdvancedFactBasedHomePage() {
  const { setActiveRole, login, appointments, currentPatient, currentDoctor } = useStore();
  const router = useRouter();

  // Interactive Workbench Preview Tab State
  const [activePreviewTab, setActivePreviewTab] = useState<'DOCTOR' | 'PATIENT' | 'RECEPTION' | 'MANAGEMENT'>('DOCTOR');

  // Interactive AI Sandbox State
  const [selectedLabPreset, setSelectedLabPreset] = useState<'LIPID' | 'DIABETIC' | 'CBC'>('LIPID');

  // Interactive RBAC Filter State
  const [activeRbacRole, setActiveRbacRole] = useState<'ALL' | 'PATIENT' | 'DOCTOR' | 'RECEPTIONIST' | 'MANAGEMENT'>('ALL');

  // Interactive Stepper State
  const [activeWorkflowStep, setActiveWorkflowStep] = useState<number>(1);

  // Active Terminal Tab State
  const [activeTerminalTab, setActiveTerminalTab] = useState<'FASTAPI' | 'FHIR' | 'STORE'>('FASTAPI');

  const waitingPatients = appointments.filter(a => a.status === 'CHECKED_IN').length;

  const launchPortal = (role: 'PATIENT' | 'RECEPTIONIST' | 'DOCTOR' | 'MANAGEMENT', path: string) => {
    login(role);
    router.push(path);
  };

  // Preset Data for Interactive AI Sandbox
  const labPresets = {
    LIPID: {
      title: "Fasting Lipid Profile (Serum)",
      sampleId: "LAB-8819",
      date: "Aug 10, 2026",
      biomarkers: [
        { name: "Total Cholesterol", value: "224 mg/dL", ref: "< 200 mg/dL", status: "ELEVATED", color: "text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800" },
        { name: "LDL Cholesterol", value: "147 mg/dL", ref: "< 100 mg/dL", status: "HIGH", color: "text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800" },
        { name: "HDL Cholesterol", value: "52 mg/dL", ref: "> 40 mg/dL", status: "NORMAL", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800" },
        { name: "Triglycerides", value: "165 mg/dL", ref: "< 150 mg/dL", status: "BORDERLINE", color: "text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800" },
      ],
      aiExplanation: "Your protective HDL cholesterol is healthy (52 mg/dL). However, your LDL ('bad') cholesterol is elevated at 147 mg/dL, which can gradually build fatty deposits in arteries. Your total cholesterol is mildly borderline at 224 mg/dL.",
      doctorQuestions: [
        "Do you recommend starting a mild statin like Atorvastatin 20mg?",
        "What dietary shifts (e.g. Mediterranean diet) should I adopt first?",
        "When should I repeat this fasting lipid panel to measure progress?"
      ]
    },
    DIABETIC: {
      title: "Glycemic & Metabolic Profile",
      sampleId: "LAB-9102",
      date: "Aug 14, 2026",
      biomarkers: [
        { name: "HbA1c (Glycated Hemoglobin)", value: "7.8%", ref: "< 5.7%", status: "HIGH", color: "text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800" },
        { name: "Fasting Blood Glucose", value: "142 mg/dL", ref: "70-99 mg/dL", status: "HIGH", color: "text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800" },
        { name: "Estimated Avg Glucose (eAG)", value: "177 mg/dL", ref: "< 117 mg/dL", status: "ELEVATED", color: "text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800" },
        { name: "Serum Creatinine", value: "0.9 mg/dL", ref: "0.7-1.3 mg/dL", status: "NORMAL", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800" },
      ],
      aiExplanation: "Your HbA1c of 7.8% indicates your average blood sugar over the last 90 days has been around 177 mg/dL, which is in the diabetic range. Your kidney function (Creatinine 0.9 mg/dL) remains completely healthy.",
      doctorQuestions: [
        "Should we adjust my Metformin dosage or timing?",
        "Should I begin daily continuous or fingerstick glucose monitoring?",
        "Can a consultation with a certified diabetes educator be arranged?"
      ]
    },
    CBC: {
      title: "Complete Blood Count (Automated)",
      sampleId: "LAB-7741",
      date: "Aug 18, 2026",
      biomarkers: [
        { name: "Hemoglobin", value: "10.4 g/dL", ref: "13.5-17.5 g/dL", status: "LOW", color: "text-rose-500 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800" },
        { name: "White Blood Cells (WBC)", value: "6,800 /uL", ref: "4,500-11,000 /uL", status: "NORMAL", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800" },
        { name: "Platelet Count", value: "245,000 /uL", ref: "150,000-450,000 /uL", status: "NORMAL", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800" },
        { name: "Mean Corpuscular Volume (MCV)", value: "76 fL", ref: "80-100 fL", status: "LOW", color: "text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800" },
      ],
      aiExplanation: "Your hemoglobin is 10.4 g/dL (mild anemia), and your red blood cells are slightly smaller than usual (MCV 76 fL). This pattern is most commonly associated with iron deficiency. Your immune cells (WBC) and clotting cells (platelets) are completely normal.",
      doctorQuestions: [
        "Should we run a Serum Ferritin / Iron studies panel?",
        "Do you recommend starting oral iron supplementation?",
        "Are there any specific dietary iron sources I should prioritize?"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white transition-colors duration-200 bg-grid-pattern relative">
      
      {/* Ambient Radial Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 radial-glow-teal pointer-events-none" />

      {/* Real-Time Clinical Engine Status Strip */}
      <div className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 text-xs py-2 px-4 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-bold text-slate-900 dark:text-white">MediSync 360 Engine:</span>
            <span className="text-slate-600 dark:text-slate-400">Synchronized Outpatient State Active &bull; Sub-50ms Reactivity</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <span className="flex items-center space-x-1">
              <Activity className="w-3 h-3 text-brand-600" />
              <span>Queue: <strong>{waitingPatients} Checked In</strong></span>
            </span>
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>PHI Quarantine: <strong>Enforced</strong></span>
            </span>
            <span className="hidden md:inline text-slate-400">&bull; FastAPI REST Ready</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel text-slate-800 dark:text-slate-200 text-xs font-semibold mb-6 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Multi-Tenant Clinical Operating System &bull; Next.js 14 + FastAPI</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
            Clinical operations and patient records, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-teal-500 to-indigo-600 bg-clip-text text-transparent">
              synchronized in real time.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
            Eliminates outpatient bottlenecks and fragmented paper trails. MediSync 360 coordinates <strong>Patient Health Lockers</strong>, <strong>Front-Desk OPD Tokens</strong>, <strong>Doctor SOAP Cockpits</strong>, and <strong>Executive BI Dashboards</strong> with strict role-based data governance.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold text-xs shadow-md transition-all group cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Enter System / Select Role</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <a
              href="#interactive-workbench"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3 px-6 rounded-xl glass-panel text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5 text-brand-600" />
              <span>Interactive Live Preview &darr;</span>
            </a>

            <a
              href="#ai-sandbox"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3 px-5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              <span>AI Explainer Sandbox</span>
            </a>
          </div>

        </div>

        {/* ============================================================ */}
        {/* COMPONENT 1: INTERACTIVE LIVE CLINICAL WORKBENCH PREVIEW */}
        {/* ============================================================ */}
        <div id="interactive-workbench" className="mt-14 glass-panel rounded-3xl shadow-xl overflow-hidden border border-slate-200/80 dark:border-slate-800">
          
          {/* Workbench Top Bar & Interactive Tab Switcher */}
          <div className="px-4 sm:px-6 py-3.5 bg-slate-100/70 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              </div>
              <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                active-client-state: <strong className="text-slate-800 dark:text-slate-200">Synchronized (sub-50ms)</strong>
              </span>
            </div>

            {/* Tab Switcher */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 dark:bg-slate-800/80 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActivePreviewTab('DOCTOR')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activePreviewTab === 'DOCTOR' 
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                <span>Doctor Cockpit</span>
              </button>

              <button
                onClick={() => setActivePreviewTab('PATIENT')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activePreviewTab === 'PATIENT' 
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>Patient Health Locker</span>
              </button>

              <button
                onClick={() => setActivePreviewTab('RECEPTION')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activePreviewTab === 'RECEPTION' 
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ClipboardList className="w-3.5 h-3.5 text-amber-600" />
                <span>Reception Queue</span>
              </button>

              <button
                onClick={() => setActivePreviewTab('MANAGEMENT')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer ${
                  activePreviewTab === 'MANAGEMENT' 
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Hospital BI</span>
              </button>
            </div>

            <button
              onClick={() => {
                if (activePreviewTab === 'DOCTOR') launchPortal('DOCTOR', '/doctor');
                if (activePreviewTab === 'PATIENT') launchPortal('PATIENT', '/patient');
                if (activePreviewTab === 'RECEPTION') launchPortal('RECEPTIONIST', '/reception');
                if (activePreviewTab === 'MANAGEMENT') launchPortal('MANAGEMENT', '/management');
              }}
              className="inline-flex items-center space-x-1 text-xs font-bold text-brand-600 hover:text-brand-700 dark:text-brand-400 cursor-pointer"
            >
              <span>Launch This Portal Live</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

          </div>

          {/* Workbench Body */}
          <div className="p-6 sm:p-8">
            
            {/* 1. DOCTOR PREVIEW */}
            {activePreviewTab === 'DOCTOR' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800 gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
                      VM
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Dr. Vikram Mehta &bull; Cardiology Clinical Cockpit
                      </h3>
                      <p className="text-xs text-slate-500">Active Encounter: Patient #9832-RS &bull; Room 204</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-900">
                      Token CARD-101 in Progress
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
                  {/* Left: Patient Dossier & Vitals Monitor */}
                  <div className="lg:col-span-5 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <strong className="text-slate-900 dark:text-white text-sm">Rahul Sharma, 34M</strong>
                        <p className="text-[11px] text-slate-500">ABHA Health ID: #9832-RS &bull; Blood: B+</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                        Allergy: Penicillin
                      </span>
                    </div>

                    {/* Vitals Grid with Heart Pulse */}
                    <div className="grid grid-cols-4 gap-2 text-center pt-2">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-bold">BP</span>
                        <strong className="text-slate-800 dark:text-slate-200 text-sm">128/82</strong>
                        <span className="text-[9px] text-slate-400 block">mmHg</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-bold flex items-center justify-center space-x-1">
                          <Heart className="w-2.5 h-2.5 text-rose-500 animate-pulse" />
                          <span>Pulse</span>
                        </span>
                        <strong className="text-slate-800 dark:text-slate-200 text-sm">74</strong>
                        <span className="text-[9px] text-slate-400 block">bpm</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-bold">SpO2</span>
                        <strong className="text-slate-800 dark:text-slate-200 text-sm">99%</strong>
                        <span className="text-[9px] text-emerald-500 block">Normal</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-bold">Weight</span>
                        <strong className="text-slate-800 dark:text-slate-200 text-sm">72</strong>
                        <span className="text-[9px] text-slate-400 block">kg</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/60 text-[11px] text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800">
                      <strong>Recent Lab:</strong> Fasting Lipid Profile &bull; LDL: 147 mg/dL (Elevated) &bull; Total Chol: 224 mg/dL
                    </div>
                  </div>

                  {/* Right: SOAP Notes & Digital Rx Builder */}
                  <div className="lg:col-span-7 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 space-y-3">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                      SOAP Encounter &bull; Digital Prescription Formulation
                    </span>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                        <strong className="text-slate-700 dark:text-slate-300">Assessment (Diagnosis):</strong> Mild Dyslipidemia, essential hypertension stage 1 under control.
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                        <div>
                          <strong className="text-slate-700 dark:text-slate-300">Prescribed Rx:</strong> Atorvastatin 20mg &bull; 1 tablet at bedtime &bull; 30 days
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                          Signed
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-400">Syncs immediately to Patient Health Locker on completion</span>
                      <button
                        onClick={() => launchPortal('DOCTOR', '/doctor/consult/apt-1')}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center space-x-1"
                      >
                        <span>Open Live Consult Room</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. PATIENT PREVIEW */}
            {activePreviewTab === 'PATIENT' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800 gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                      RS
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Rahul Sharma &bull; Patient Health Locker
                      </h3>
                      <p className="text-xs text-slate-500">ABHA Health ID: #9832-RS &bull; Verified Sovereign Account</p>
                    </div>
                  </div>
                  <button
                    onClick={() => launchPortal('PATIENT', '/patient/reports')}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer flex items-center space-x-1 shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open Report Vault</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Latest Clinical Encounter</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Cardiology Consult</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">Dr. Vikram Mehta &bull; Room 204</p>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-[11px] border border-slate-200/60 dark:border-slate-800">
                      Signed Rx: Atorvastatin 20mg (1-0-0)
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 space-y-2">
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>AI Explainer Summary</span>
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Fasting Lipid Profile</h4>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                      &ldquo;Your protective HDL is at a healthy level (52 mg/dL). However, your LDL is 147 mg/dL, which is above the 100 mg/dL target. Review diet and statin therapy with Dr. Mehta.&rdquo;
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Upcoming Appointment</span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Pulmonology Follow-up</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">Dr. Elena Rostova &bull; Tomorrow, 10:30 AM</p>
                    <span className="inline-block px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                      Slot Confirmed
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. RECEPTION PREVIEW */}
            {activePreviewTab === 'RECEPTION' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800 gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Front-Desk OPD Queue &amp; Token Dispatch Engine
                    </h3>
                    <p className="text-xs text-slate-500">Live Queue: {waitingPatients} checked-in patients awaiting consultation</p>
                  </div>
                  <button
                    onClick={() => launchPortal('RECEPTIONIST', '/reception/register')}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer flex items-center space-x-1 shadow-xs"
                  >
                    <span>60-Sec Walk-in Intake</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 uppercase text-[10px] font-bold">
                      <tr>
                        <th className="p-3">Token</th>
                        <th className="p-3">Patient Name</th>
                        <th className="p-3">Department &bull; Doctor</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      <tr>
                        <td className="p-3 font-bold text-brand-600 font-mono">CARD-101</td>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Rahul Sharma</td>
                        <td className="p-3">Cardiology &bull; Dr. Vikram Mehta</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">IN SESSION</span></td>
                        <td className="p-3"><span className="text-slate-400">In Doctor Room</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-amber-600 font-mono">PULM-201</td>
                        <td className="p-3 font-semibold text-slate-900 dark:text-white">Ananya Sen</td>
                        <td className="p-3">Pulmonology &bull; Dr. Elena Rostova</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold text-[10px]">WAITING IN LOBBY</span></td>
                        <td className="p-3"><span className="text-blue-600 font-bold">Next in Line</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. MANAGEMENT PREVIEW */}
            {activePreviewTab === 'MANAGEMENT' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800 gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Hospital Operations &amp; Executive Intelligence
                    </h3>
                    <p className="text-xs text-slate-500">Real-time throughput metrics across all clinical departments</p>
                  </div>
                  <button
                    onClick={() => launchPortal('MANAGEMENT', '/management')}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer flex items-center space-x-1 shadow-xs"
                  >
                    <span>Open BI Dashboard</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
                  <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">Today Footfall</span>
                    <strong className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">48</strong>
                    <span className="text-[10px] text-emerald-600 font-semibold">+12% vs last week</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">Revenue POS</span>
                    <strong className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">$3,420</strong>
                    <span className="text-[10px] text-slate-400">Consultation &amp; Vault POS</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">On-Duty Doctors</span>
                    <strong className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">4 / 4</strong>
                    <span className="text-[10px] text-emerald-600 font-semibold">100% Rostered</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 uppercase block font-bold">Avg. Turnaround</span>
                    <strong className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">14 min</strong>
                    <span className="text-[10px] text-slate-400">Intake to Rx Signed</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </section>

      {/* ============================================================ */}
      {/* COMPONENT 2: INTERACTIVE LIVE "AI REPORT EXPLAINER" SANDBOX */}
      {/* ============================================================ */}
      <section id="ai-sandbox" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* Subtle tech background glow */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 border-b border-slate-800 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Interactive Live AI Sandbox</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Test the Diagnostic Report Translation Engine
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Select a diagnostic test panel below to see how raw numerical findings are translated in real time.
              </p>
            </div>

            {/* Panel Selectors */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setSelectedLabPreset('LIPID')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  selectedLabPreset === 'LIPID'
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Lipid Panel (Cardiology)
              </button>

              <button
                onClick={() => setSelectedLabPreset('DIABETIC')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  selectedLabPreset === 'DIABETIC'
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                HbA1c (Endocrinology)
              </button>

              <button
                onClick={() => setSelectedLabPreset('CBC')}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                  selectedLabPreset === 'CBC'
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                CBC (Hematology)
              </button>
            </div>
          </div>

          {/* Interactive Sandbox Body */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Raw Lab Biomarkers Grid */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
                <span>{labPresets[selectedLabPreset].title}</span>
                <span className="font-mono">Sample #{labPresets[selectedLabPreset].sampleId}</span>
              </div>

              <div className="space-y-2.5">
                {labPresets[selectedLabPreset].biomarkers.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-center justify-between text-xs transition-all hover:border-slate-700"
                  >
                    <div>
                      <strong className="text-white block">{b.name}</strong>
                      <span className="text-[11px] text-slate-400 font-mono">Reference: {b.ref}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-sm block text-white">{b.value}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border inline-block mt-0.5 ${b.color}`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Real-time AI Plain-English Breakdown & Doctor Questions */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-950/80 border border-teal-500/30 space-y-4">
              
              <div>
                <span className="text-[11px] font-mono text-teal-400 font-bold uppercase tracking-wider flex items-center space-x-1 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Plain-English Clinical Translation</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-teal-950/30 p-4 rounded-xl border border-teal-900/50">
                  {labPresets[selectedLabPreset].aiExplanation}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block mb-2">
                  Targeted Questions Generated for Doctor Visit:
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {labPresets[selectedLabPreset].doctorQuestions.map((q, qIdx) => (
                    <li key={qIdx} className="flex items-start space-x-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-teal-400 font-bold">?</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => launchPortal('PATIENT', '/patient/reports')}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <span>Open Interactive Modal in Patient Vault</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPONENT 3: INTERACTIVE 4-STEP CLINICAL WORKFLOW STEPPER */}
      {/* ============================================================ */}
      <section className="py-16 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 font-bold">
              Interactive Outpatient Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              End-to-End Clinical Flow &amp; State Progression
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Click any stage in the clinical pipeline to inspect its underlying route, state commit, and role permissions:
            </p>
          </div>

          {/* Stepper Tabs Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <button
              onClick={() => setActiveWorkflowStep(1)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                activeWorkflowStep === 1
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md'
                  : 'glass-panel text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <span className="text-[10px] font-mono font-bold block opacity-70">STAGE 01</span>
              <strong className="text-sm block mt-1">Patient Intake &amp; Booking</strong>
              <p className="text-xs opacity-80 mt-1">Online slot booking or 60s reception walk-in</p>
            </button>

            <button
              onClick={() => setActiveWorkflowStep(2)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                activeWorkflowStep === 2
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md'
                  : 'glass-panel text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <span className="text-[10px] font-mono font-bold block opacity-70">STAGE 02</span>
              <strong className="text-sm block mt-1">Queue Token &amp; Billing POS</strong>
              <p className="text-xs opacity-80 mt-1">Check-in, fee receipt, and doctor queue ring</p>
            </button>

            <button
              onClick={() => setActiveWorkflowStep(3)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                activeWorkflowStep === 3
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md'
                  : 'glass-panel text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <span className="text-[10px] font-mono font-bold block opacity-70">STAGE 03</span>
              <strong className="text-sm block mt-1">SOAP Clinical Encounter</strong>
              <p className="text-xs opacity-80 mt-1">Dossier review, vitals, diagnosis &amp; digital Rx</p>
            </button>

            <button
              onClick={() => setActiveWorkflowStep(4)}
              className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                activeWorkflowStep === 4
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md'
                  : 'glass-panel text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <span className="text-[10px] font-mono font-bold block opacity-70">STAGE 04</span>
              <strong className="text-sm block mt-1">Timeline &amp; AI Explainer</strong>
              <p className="text-xs opacity-80 mt-1">Encrypted timeline commit &amp; lab analysis</p>
            </button>

          </div>

          {/* Stepper Details Card */}
          <div className="mt-6 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800 text-xs">
            {activeWorkflowStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                <div>
                  <span className="font-mono text-[10px] text-brand-600 font-bold uppercase">Route Implementation</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">/patient/book &amp; /reception/register</p>
                  <p className="text-slate-500 mt-2 leading-relaxed">
                    Patients can independently select a clinical department, pick an available doctor, review consultation rates, and confirm an appointment slot without phone calls.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-brand-600 font-bold uppercase">Data Mutation</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Appointment &bull; PENDING_ARRIVAL</p>
                  <p className="text-slate-500 mt-2 leading-relaxed">
                    Creates a structured appointment record with patient ID, doctor ID, date, time slot, and consultation fee, instantly updating both reception and doctor views.
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <span className="font-mono text-[10px] text-brand-600 font-bold uppercase">Try In App</span>
                  <button
                    onClick={() => launchPortal('PATIENT', '/patient/book')}
                    className="mt-3 py-2 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Launch 3-Step Booking Wizard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {activeWorkflowStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                <div>
                  <span className="font-mono text-[10px] text-amber-600 font-bold uppercase">Route Implementation</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">/reception &amp; /reception/billing</p>
                  <p className="text-slate-500 mt-2 leading-relaxed">
                    Front-desk staff view incoming arrivals, verify identity, collect fees with tax calculation, and print an itemized POS receipt.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-amber-600 font-bold uppercase">Data Mutation</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Token Issued &bull; CHECKED_IN</p>
                  <p className="text-slate-500 mt-2 leading-relaxed">
                    Generates a sequential token (e.g. CARD-101), sets status to CHECKED_IN, and increments the waiting queue count in the doctor cockpit.
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <span className="font-mono text-[10px] text-amber-600 font-bold uppercase">Try In App</span>
                  <button
                    onClick={() => launchPortal('RECEPTIONIST', '/reception')}
                    className="mt-3 py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Launch Reception Queue Desk</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {activeWorkflowStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                <div>
                  <span className="font-mono text-[10px] text-blue-600 font-bold uppercase">Route Implementation</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">/doctor &amp; /doctor/consult/[id]</p>
                  <p className="text-slate-500 mt-2 leading-relaxed">
                    Doctor clicks &ldquo;Call Patient&rdquo;, reviews historical vitals and drug allergy alerts, charts Subjective/Objective/Assessment/Plan notes, and formulates an e-Rx.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-blue-600 font-bold uppercase">Data Mutation</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Encounter Created &bull; COMPLETED</p>
                  <p className="text-slate-500 mt-2 leading-relaxed">
                    Signing the prescription marks the visit complete, commits the clinical note to the patient&apos;s timeline, and frees up the doctor&apos;s room for the next token.
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <span className="font-mono text-[10px] text-blue-600 font-bold uppercase">Try In App</span>
                  <button
                    onClick={() => launchPortal('DOCTOR', '/doctor')}
                    className="mt-3 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Launch Doctor Clinical Cockpit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {activeWorkflowStep === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                <div>
                  <span className="font-mono text-[10px] text-emerald-600 font-bold uppercase">Route Implementation</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">/patient &amp; /patient/reports</p>
                  <p className="text-slate-500 mt-2 leading-relaxed">
                    Patient immediately sees the newly signed prescription, diagnosis, and vitals strip on their permanent timeline, with zero paper folders.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-emerald-600 font-bold uppercase">Data Mutation</span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">Sovereign Timeline Commitment</p>
                  <p className="text-slate-500 mt-2 leading-relaxed">
                    The patient remains the sovereign owner of their records. Diagnostic reports uploaded by clinics can be translated through the integrated AI explainer.
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <span className="font-mono text-[10px] text-emerald-600 font-bold uppercase">Try In App</span>
                  <button
                    onClick={() => launchPortal('PATIENT', '/patient')}
                    className="mt-3 py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <span>Open Patient Health Locker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPONENT 4: INTERACTIVE RBAC GOVERNANCE INSPECTOR */}
      {/* ============================================================ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-8 border-b border-slate-800 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                HIPAA &bull; Zero Unauthorized Leakage
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-1">
                Role-Based Access Control (RBAC) Architecture
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Toggle a stakeholder role below to inspect what data is accessible vs. strictly quarantined by the PHI guard.
              </p>
            </div>

            {/* Role Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveRbacRole('ALL')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeRbacRole === 'ALL' ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Matrix
              </button>
              <button
                onClick={() => setActiveRbacRole('PATIENT')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeRbacRole === 'PATIENT' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Patient View
              </button>
              <button
                onClick={() => setActiveRbacRole('DOCTOR')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeRbacRole === 'DOCTOR' ? 'bg-blue-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Doctor View
              </button>
              <button
                onClick={() => setActiveRbacRole('RECEPTIONIST')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeRbacRole === 'RECEPTIONIST' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Receptionist View
              </button>
              <button
                onClick={() => setActiveRbacRole('MANAGEMENT')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeRbacRole === 'MANAGEMENT' ? 'bg-purple-500 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Admin View
              </button>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Clinical Data Layer</th>
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'PATIENT') && (
                    <th className="py-3 px-4 text-emerald-400">Patient</th>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'DOCTOR') && (
                    <th className="py-3 px-4 text-blue-400">Doctor</th>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'RECEPTIONIST') && (
                    <th className="py-3 px-4 text-amber-400">Receptionist</th>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'MANAGEMENT') && (
                    <th className="py-3 px-4 text-purple-400">Management</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Sovereign Medical Timeline</td>
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'PATIENT') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">Owner (Full)</span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'DOCTOR') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-blue-950 text-blue-300 border border-blue-800 font-bold">Active Consult Only</span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'RECEPTIONIST') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-rose-950 text-rose-400 border border-rose-900 font-bold flex items-center space-x-1 w-fit"><LockKeyhole className="w-3 h-3" /><span>Quarantined</span></span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'MANAGEMENT') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-rose-950 text-rose-400 border border-rose-900 font-bold flex items-center space-x-1 w-fit"><LockKeyhole className="w-3 h-3" /><span>Quarantined</span></span></td>
                  )}
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">AI Diagnostic Report Explainer</td>
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'PATIENT') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">Full Access</span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'DOCTOR') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-blue-950 text-blue-300 border border-blue-800 font-bold">Clinical Preview</span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'RECEPTIONIST') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-rose-950 text-rose-400 border border-rose-900 font-bold flex items-center space-x-1 w-fit"><LockKeyhole className="w-3 h-3" /><span>Quarantined</span></span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'MANAGEMENT') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-rose-950 text-rose-400 border border-rose-900 font-bold flex items-center space-x-1 w-fit"><LockKeyhole className="w-3 h-3" /><span>Quarantined</span></span></td>
                  )}
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">SOAP Notes &amp; Digital Rx</td>
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'PATIENT') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-semibold">Read Signed Rx</span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'DOCTOR') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-blue-950 text-blue-300 border border-blue-800 font-bold">Author &amp; Sign</span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'RECEPTIONIST') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400">No Access</span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'MANAGEMENT') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400">No Access</span></td>
                  )}
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">OPD Queue Tokens &amp; Intake</td>
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'PATIENT') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-semibold">Track Own Token</span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'DOCTOR') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-blue-950 text-blue-300 border border-blue-800 font-bold">Queue Caller</span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'RECEPTIONIST') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-800 font-bold">Dispatch &amp; Manage</span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'MANAGEMENT') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-purple-950 text-purple-300 border border-purple-800 font-bold">Aggregate Volume</span></td>
                  )}
                </tr>

                <tr>
                  <td className="py-3.5 px-4 font-semibold text-white">Billing POS &amp; Executive Revenue</td>
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'PATIENT') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-semibold">View Receipts</span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'DOCTOR') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400">No Access</span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'RECEPTIONIST') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-800 font-bold">Process Invoices</span></td>
                  )}
                  {(activeRbacRole === 'ALL' || activeRbacRole === 'MANAGEMENT') && (
                    <td className="py-3.5 px-4"><span className="px-2.5 py-1 rounded-lg bg-purple-950 text-purple-300 border border-purple-800 font-bold">Executive Analytics</span></td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPONENT 5: DEVELOPER & ARCHITECTURE TERMINAL */}
      {/* ============================================================ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 font-bold">
            Engineering Specifications
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            API &amp; Data Contract Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Inspect the live data schemas powering the frontend state and Python FastAPI backend:
          </p>
        </div>

        <div className="rounded-3xl bg-slate-950 text-slate-300 border border-slate-800 shadow-xl overflow-hidden font-mono text-xs">
          
          {/* Terminal Tabs */}
          <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-brand-400" />
              <span className="text-white font-bold">architecture-inspector.sh</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTerminalTab('FASTAPI')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTerminalTab === 'FASTAPI' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                FastAPI Router
              </button>
              <button
                onClick={() => setActiveTerminalTab('FHIR')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTerminalTab === 'FHIR' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                FHIR R4 Schema
              </button>
              <button
                onClick={() => setActiveTerminalTab('STORE')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  activeTerminalTab === 'STORE' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Client Store (Zustand)
              </button>
            </div>
          </div>

          {/* Terminal Code Body */}
          <div className="p-6 overflow-x-auto">
            {activeTerminalTab === 'FASTAPI' && (
              <pre className="text-slate-300 leading-relaxed">
{`# backend/app/main.py (FastAPI REST Service)
from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel

app = FastAPI(title="MediSync 360 Core API", version="2.4.0")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "phi_firewall": "active", "db": "connected"}

@app.post("/api/encounters/sign")
async def sign_encounter(payload: EncounterCreateSchema, doctor=Depends(verify_doctor_session)):
    # Commits clinical SOAP notes and synchronously generates signed e-Prescription
    encounter = await db.commit_encounter(payload, author_id=doctor.id)
    await timeline_queue.push(patient_id=payload.patient_id, record=encounter)
    return {"status": "signed", "encounter_id": encounter.id}`}
              </pre>
            )}

            {activeTerminalTab === 'FHIR' && (
              <pre className="text-slate-300 leading-relaxed">
{`// FHIR R4 DiagnosticReport Resource JSON
{
  "resourceType": "DiagnosticReport",
  "id": "LAB-8819",
  "status": "final",
  "category": [{ "coding": [{ "system": "http://loinc.org", "code": "LP29684-5", "display": "Lipid Panel" }] }],
  "subject": { "reference": "Patient/9832-RS", "display": "Rahul Sharma" },
  "effectiveDateTime": "2026-08-10T09:30:00Z",
  "result": [
    { "display": "Total Cholesterol", "valueQuantity": { "value": 224, "unit": "mg/dL" }, "interpretation": "High" },
    { "display": "LDL Cholesterol", "valueQuantity": { "value": 147, "unit": "mg/dL" }, "interpretation": "High" },
    { "display": "HDL Cholesterol", "valueQuantity": { "value": 52, "unit": "mg/dL" }, "interpretation": "Normal" }
  ],
  "extension": [{ "url": "http://medisync.local/ai-summary", "valueString": "Elevated LDL requires clinical review." }]
}`}
              </pre>
            )}

            {activeTerminalTab === 'STORE' && (
              <pre className="text-slate-300 leading-relaxed">
{`// src/lib/store.tsx (Reactive Multi-Tenant Client State)
interface StoreContextType {
  activeRole: 'PATIENT' | 'DOCTOR' | 'RECEPTIONIST' | 'MANAGEMENT';
  appointments: Appointment[];
  patients: Patient[];
  issueToken: (appointmentId: string) => string; // Returns CARD-101
  isAuthorizedForPatientPortal: () => boolean;    // Blocks Reception & Management
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};`}
              </pre>
            )}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPONENT 6: 4 DIRECT PORTAL LAUNCHERS */}
      {/* ============================================================ */}
      <section id="portals" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Test Drive Stakeholder Portals
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select any role to test drive live with pre-loaded demo personas:
            </p>
          </div>
          <Link
            href="/login"
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center space-x-1"
          >
            <span>Role Authentication Switcher &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Patient */}
          <div className="p-6 rounded-3xl glass-panel hover:border-emerald-500/50 hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 border border-emerald-200 dark:border-emerald-800">
                <User className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                For Patients
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 group-hover:text-emerald-600 transition-colors">
                Patient Health Locker
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Permanent medical timeline, AI diagnostic explainer, and appointment booking.
              </p>
            </div>
            <button
              onClick={() => launchPortal('PATIENT', '/patient')}
              className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-xs"
            >
              <span>Launch as Patient</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Receptionist */}
          <div className="p-6 rounded-3xl glass-panel hover:border-amber-500/50 hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-4 border border-amber-200 dark:border-amber-800">
                <ClipboardList className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                For Front-Desk
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 group-hover:text-amber-600 transition-colors">
                Reception Desk
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                60-second walk-in intake, live OPD queue tokens, and billing POS.
              </p>
            </div>
            <button
              onClick={() => launchPortal('RECEPTIONIST', '/reception')}
              className="mt-6 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-xs"
            >
              <span>Launch as Reception</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Doctor */}
          <div className="p-6 rounded-3xl glass-panel hover:border-blue-500/50 hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-4 border border-blue-200 dark:border-blue-800">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
                For Clinicians
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 group-hover:text-blue-600 transition-colors">
                Doctor Cockpit
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Token-ordered queue, clinical dossier, SOAP notes, and electronic prescriptions.
              </p>
            </div>
            <button
              onClick={() => launchPortal('DOCTOR', '/doctor')}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-xs"
            >
              <span>Launch as Doctor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Management */}
          <div className="p-6 rounded-3xl glass-panel hover:border-purple-500/50 hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-4 border border-purple-200 dark:border-purple-800">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
                For Directors
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2 group-hover:text-purple-600 transition-colors">
                Hospital BI
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Real-time footfall trends, doctor duty rosters, and revenue tracking.
              </p>
            </div>
            <button
              onClick={() => launchPortal('MANAGEMENT', '/management')}
              className="mt-6 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-xs"
            >
              <span>Launch Management</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 pb-8 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">M</div>
              <span className="font-bold text-white text-sm">MediSync 360</span>
              <span className="text-[11px]">&bull; Outpatient Clinical Operating System</span>
            </div>

            <div className="flex items-center space-x-6 text-slate-400">
              <button onClick={() => launchPortal('PATIENT', '/patient')} className="hover:text-white cursor-pointer">Patient Locker</button>
              <button onClick={() => launchPortal('DOCTOR', '/doctor')} className="hover:text-white cursor-pointer">Doctor Cockpit</button>
              <button onClick={() => launchPortal('RECEPTIONIST', '/reception')} className="hover:text-white cursor-pointer">Reception Desk</button>
              <button onClick={() => launchPortal('MANAGEMENT', '/management')} className="hover:text-white cursor-pointer">Hospital BI</button>
              <Link href="/login" className="hover:text-white font-bold text-teal-400">Sign In</Link>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
            <p>&copy; 2026 MediSync 360 &bull; Built with Next.js 14, TypeScript, Tailwind CSS &amp; FastAPI</p>
            <p className="mt-2 sm:mt-0">Academic Major Project &bull; Fact-Based Engineering Implementation</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
