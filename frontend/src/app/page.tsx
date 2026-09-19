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
  ArrowUpRight
} from 'lucide-react';

export default function FactBasedHomePage() {
  const { setActiveRole, login, appointments } = useStore();
  const router = useRouter();

  const waitingPatients = appointments.filter(a => a.status === 'CHECKED_IN').length;

  const launchPortal = (role: 'PATIENT' | 'RECEPTIONIST' | 'DOCTOR' | 'MANAGEMENT', path: string) => {
    login(role);
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-brand-500 selection:text-white transition-colors duration-200">
      
      {/* System Status Banner */}
      <div className="bg-slate-900 dark:bg-slate-950 border-b border-slate-800 text-slate-300 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">System Status:</span>
            <span>All 4 Clinical Portals Operational &bull; Synchronized Client State Engine Active</span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-400">
            <span>Active Queue: <strong>{waitingPatients} Patients Checked In</strong></span>
            <span>HIPAA / PHI Quarantine: <strong>Enforced</strong></span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-6">
            <Cpu className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>Full-Stack Clinical Operating System &amp; Digital Health Record</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Synchronized Healthcare Operations for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
              Patients, Clinicians &amp; Administration
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            MediSync 360 is an integrated clinical software system connecting 4 distinct stakeholders through synchronized state: a <strong>Patient Health Locker</strong> with AI diagnostic explanations, a <strong>Front-Desk OPD Queue</strong> with 60-second intake, a <strong>Doctor Cockpit</strong> with SOAP notes &amp; digital prescriptions, and an <strong>Executive BI Portal</strong> for hospital administration.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/login"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold text-xs shadow-md transition-all group"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In / Select Stakeholder Role</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <a
              href="#portals"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs shadow-xs transition-all"
            >
              <span>Explore 4 Working Portals &darr;</span>
            </a>

            <a
              href="#tech-specs"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3 px-5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-all"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Technical Architecture</span>
            </a>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 1: THE 4 WORKING PORTALS (1-CLICK LAUNCH) (#portals) */}
      {/* ============================================================ */}
      <section id="portals" className="py-16 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 font-bold">
              Functional Implementations
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              The Four Synchronized Stakeholder Portals
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Each portal operates with dedicated permissions, clinical workflows, and live state synchronization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Patient Portal */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 border border-emerald-200 dark:border-emerald-800">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">
                    Stakeholder 1
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">/patient</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">Patient Health Locker</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Permanent chronological medical timeline, diagnostic document vault (`/reports`), AI report explanation modal, and 3-step appointment booking wizard (`/book`).
                </p>
                
                <ul className="mt-4 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <li className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>View previous consult notes &amp; vitals</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Explain lab results in plain English</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Book slots by department &amp; doctor</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => launchPortal('PATIENT', '/patient')}
                className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-xs"
              >
                <span>Launch Patient Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. Reception Desk */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-4 border border-amber-200 dark:border-amber-800">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900">
                    Stakeholder 2
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">/reception</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">Reception Desk</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Real-time outpatient queue management, one-click token dispatch (`CARD-101`), 60-second walk-in registration (`/register`), and billing POS invoice generator (`/billing`).
                </p>

                <ul className="mt-4 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <li className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>Issue sequential OPD queue tokens</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>60-second rapid walk-in intake</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                    <span>Itemized billing &amp; printable receipts</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => launchPortal('RECEPTIONIST', '/reception')}
                className="mt-6 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-xs"
              >
                <span>Launch Reception Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3. Doctor Cockpit */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-4 border border-blue-200 dark:border-blue-800">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900">
                    Stakeholder 3
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">/doctor</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">Doctor Cockpit</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Live queue caller ordered by token number, comprehensive patient dossier with allergy alerts, structured SOAP clinical notes, and digital prescription builder (`/consult/[id]`).
                </p>

                <ul className="mt-4 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <li className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>Live token-ordered patient queue</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>Structured SOAP clinical charting</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>Digital Rx builder with 1-click drug presets</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => launchPortal('DOCTOR', '/doctor')}
                className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-xs"
              >
                <span>Launch Doctor Cockpit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4. Management Portal */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-4 border border-purple-200 dark:border-purple-800">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-900">
                    Stakeholder 4
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">/management</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-2">Hospital BI</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Real-time footfall &amp; revenue metrics, hourly patient distribution analytics, doctor roster directory with duty toggles, and department rate configuration.
                </p>

                <ul className="mt-4 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <li className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                    <span>Real-time OPD revenue &amp; footfall KPIs</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                    <span>Hourly distribution &amp; specialty analytics</span>
                  </li>
                  <li className="flex items-center space-x-1.5">
                    <Check className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                    <span>Doctor duty roster &amp; department setup</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => launchPortal('MANAGEMENT', '/management')}
                className="mt-6 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer shadow-xs"
              >
                <span>Launch Management BI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: AI MEDICAL REPORT EXPLAINER (CORE FEATURE DEEP DIVE) */}
      {/* ============================================================ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Explainable AI Translation Engine</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Translating Esoteric Lab Reports into Plain English for Patients
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Diagnostic reports are dense with abbreviations, reference intervals, and clinical jargon that cause unnecessary anxiety. MediSync incorporates a structured explainer that translates raw numerical findings into understandable insights.
              </p>

              <div className="pt-2 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span><strong>Color-Coded Status Badges:</strong> Labels values as Normal, Elevated, Low, or Flagged against laboratory reference intervals.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span><strong>6th-Grade Level Translations:</strong> Explains what each biomarker does (e.g. LDL as &ldquo;bad cholesterol that forms plaque in arteries&rdquo;).</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span><strong>Doctor Visit Questions:</strong> Prepares the patient with targeted questions to ask their physician during their appointment.</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => launchPortal('PATIENT', '/patient/reports')}
                  className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <span>Open Report Vault &amp; Test AI Explainer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Actual Sample Report Visual */}
            <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="font-bold text-white text-sm">Fasting Lipid Profile (Serum)</span>
                  <p className="text-[10px] text-slate-400">Patient: Rahul Sharma &bull; Sample ID: #LAB-8819</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                  1 Flagged Value
                </span>
              </div>

              {/* Biomarkers Table */}
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <strong className="text-white">Total Cholesterol</strong>
                    <span className="text-[10px] text-slate-400 block">Ref: &lt; 200 mg/dL</span>
                  </div>
                  <div className="text-right">
                    <span className="text-amber-400 font-bold">224 mg/dL</span>
                    <span className="text-[10px] block text-amber-400 font-semibold">Borderline High</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-rose-900/60 flex items-center justify-between">
                  <div>
                    <strong className="text-white">LDL (&ldquo;Bad&rdquo; Cholesterol)</strong>
                    <span className="text-[10px] text-slate-400 block">Ref: &lt; 100 mg/dL</span>
                  </div>
                  <div className="text-right">
                    <span className="text-rose-400 font-bold">147 mg/dL</span>
                    <span className="text-[10px] block text-rose-400 font-semibold">Elevated</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <strong className="text-white">HDL (&ldquo;Good&rdquo; Protective Cholesterol)</strong>
                    <span className="text-[10px] text-slate-400 block">Ref: &gt; 40 mg/dL</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold">52 mg/dL</span>
                    <span className="text-[10px] block text-emerald-400 font-semibold">Healthy / Optimal</span>
                  </div>
                </div>
              </div>

              {/* AI Translation Snippet */}
              <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-800/80 text-[11px] text-teal-200">
                <strong className="block text-teal-300 mb-1 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Summary:</span>
                </strong>
                &ldquo;Your protective HDL is at a healthy level (52 mg/dL). However, your LDL is 147 mg/dL, which is higher than the recommended 100 mg/dL target. Discuss lifestyle adjustments and whether lipid-lowering medication is appropriate with Dr. Vikram Mehta.&rdquo;
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: TECHNICAL ARCHITECTURE & DATA GOVERNANCE (#tech-specs) */}
      {/* ============================================================ */}
      <section id="tech-specs" className="py-16 bg-white dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-brand-600 dark:text-brand-400 font-bold">
              Engineering Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Technical Stack &amp; Security Governance
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Built on Next.js 14, TypeScript, and Python FastAPI with strict clinical separation of concerns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            
            {/* Spec 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center space-x-2 text-brand-600 dark:text-brand-400 font-bold text-sm">
                <Code2 className="w-4 h-4" />
                <span>Frontend Architecture</span>
              </div>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                <li>&bull; <strong>Next.js 14 App Router:</strong> Server &amp; client components with 13 static and dynamic routes.</li>
                <li>&bull; <strong>TypeScript Strict Mode:</strong> Full type safety across patient dossiers, encounters, prescriptions, and tokens.</li>
                <li>&bull; <strong>Tailwind CSS &amp; Dark Mode:</strong> Class-based theme system synchronized via localStorage.</li>
              </ul>
            </div>

            {/* Spec 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center space-x-2 text-teal-600 dark:text-teal-400 font-bold text-sm">
                <RefreshCw className="w-4 h-4" />
                <span>State Synchronization</span>
              </div>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                <li>&bull; <strong>Client Store (`store.tsx`):</strong> Context-based reactive state synchronizing appointments, tokens, and patient dossiers in sub-50ms.</li>
                <li>&bull; <strong>Multi-Tenant Isolation:</strong> Active clinic switching between Metro Health, Apex Diagnostic, and CarePlus.</li>
                <li>&bull; <strong>Dual-Compatibility Deployment:</strong> Mirrored root and subfolder structure for zero-config Vercel deployment.</li>
              </ul>
            </div>

            {/* Spec 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>PHI Security &amp; RBAC</span>
              </div>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                <li>&bull; <strong>Role-Based Access Control:</strong> Strict boundary where only verified Patients and attending Doctors access PHI.</li>
                <li>&bull; <strong>Quarantine Enforcement:</strong> Receptionists and Hospital Management are blocked from medical timelines.</li>
                <li>&bull; <strong>Compliance Alignment:</strong> Engineered around HIPAA Security Rule principles and ABDM M3 guidelines.</li>
              </ul>
            </div>

          </div>

          {/* RBAC Matrix Table */}
          <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Data / Action Layer</th>
                  <th className="p-3 text-emerald-700 dark:text-emerald-400">Patient</th>
                  <th className="p-3 text-blue-700 dark:text-blue-400">Doctor</th>
                  <th className="p-3 text-amber-700 dark:text-amber-400">Receptionist</th>
                  <th className="p-3 text-purple-700 dark:text-purple-400">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">Medical Timeline &amp; Past Encounters</td>
                  <td className="p-3 text-emerald-600 font-bold">Full Access (Sovereign)</td>
                  <td className="p-3 text-blue-600 font-bold">Active Consultation Only</td>
                  <td className="p-3 text-rose-600 font-bold">Blocked (Quarantined)</td>
                  <td className="p-3 text-rose-600 font-bold">Blocked (Quarantined)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">AI Diagnostic Explainer</td>
                  <td className="p-3 text-emerald-600 font-bold">Full Access</td>
                  <td className="p-3 text-blue-600 font-bold">Clinical Review</td>
                  <td className="p-3 text-rose-600 font-bold">Blocked (Quarantined)</td>
                  <td className="p-3 text-rose-600 font-bold">Blocked (Quarantined)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">SOAP Clinical Notes &amp; Digital Rx</td>
                  <td className="p-3">Read-only (Signed Rx)</td>
                  <td className="p-3 text-blue-600 font-bold">Author &amp; Sign</td>
                  <td className="p-3 text-rose-600 font-bold">No Access</td>
                  <td className="p-3 text-rose-600 font-bold">No Access</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">Queue Token Dispatch &amp; Intake</td>
                  <td className="p-3">Track Own Token</td>
                  <td className="p-3 text-blue-600 font-bold">Queue Caller</td>
                  <td className="p-3 text-amber-600 font-bold">Dispatch &amp; Manage</td>
                  <td className="p-3">Aggregate Metrics</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">Billing POS &amp; Executive Revenue</td>
                  <td className="p-3">View Receipt</td>
                  <td className="p-3 text-rose-600 font-bold">No Access</td>
                  <td className="p-3 text-amber-600 font-bold">Process Invoices</td>
                  <td className="p-3 text-purple-600 font-bold">Full BI Dashboard</td>
                </tr>
              </tbody>
            </table>
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
              <span className="text-[11px]">&bull; Clinical Operating System</span>
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
