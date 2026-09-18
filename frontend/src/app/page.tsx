"use client";

import React from 'react';
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
  Layers
} from 'lucide-react';

export default function HomePage() {
  const { setActiveRole, appointments, visits, reports } = useStore();
  const router = useRouter();

  const waitingPatients = appointments.filter(a => a.status === 'CHECKED_IN').length;
  const completedToday = appointments.filter(a => a.status === 'COMPLETED').length;

  const navigateTo = (role: 'PATIENT' | 'RECEPTIONIST' | 'DOCTOR' | 'MANAGEMENT', path: string) => {
    setActiveRole(role);
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Major Project Prototype &bull; Multi-Tenant Healthcare Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Next-Gen Outpatient Operations &amp; <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-brand-600 via-teal-600 to-brand-700 bg-clip-text text-transparent">
            AI-Powered Digital Health Records
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          MediSync 360 unifies patient health ownership with real-time clinic operations. 
          Four synchronized portals, zero paper records, and built-in AI report comprehension.
        </p>

        {/* Live Operational Metrics Pill Bar */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-700">
          <div className="flex items-center space-x-1.5 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Live Sync Engine: Active</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Waiting in Queue: <strong className="text-slate-900 ml-1">{waitingPatients}</strong></span>
          </div>
          <div className="flex items-center space-x-1.5 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
            <span>Completed Today: <strong className="text-slate-900 ml-1">{completedToday}</strong></span>
          </div>
          <div className="flex items-center space-x-1.5 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Zero-Trust Patient Vault</span>
          </div>
        </div>
      </section>

      {/* The 4 Portal Launchers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Select a Portal to Launch</h2>
            <p className="text-xs text-slate-500">Each portal represents a real-world stakeholder in the clinical journey</p>
          </div>
          <span className="text-xs font-medium text-slate-400">4 Roles Configured</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. Patient Portal */}
          <div className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="absolute top-4 right-4 text-emerald-500 bg-emerald-50 p-2 rounded-xl">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Self-Service
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Patient Portal
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Personal health locker with permanent visit timeline and AI report simplification.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Interactive visit timeline</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span><strong>AI Report Explainer</strong> modal</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <span>Self-service slot booking</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigateTo('PATIENT', '/patient')}
              className="mt-6 w-full flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
            >
              <span>Launch Patient Portal</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 2. Receptionist Portal */}
          <div className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-300 hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="absolute top-4 right-4 text-amber-500 bg-amber-50 p-2 rounded-xl">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                Front-Desk
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Receptionist Desk
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                OPD triage, physical token dispatch, 60-second walk-in intake, and POS fee collection.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span>Numbered token generator</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span>One-click arrival check-in</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  <span>Instant walk-in registration</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigateTo('RECEPTIONIST', '/reception')}
              className="mt-6 w-full flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all"
            >
              <span>Launch Reception Desk</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 3. Doctor Portal */}
          <div className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="absolute top-4 right-4 text-blue-500 bg-blue-50 p-2 rounded-xl">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                Clinical Cockpit
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Doctor Portal
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Live patient queue, longitudinal patient dossiers, SOAP notes, and digital prescription builder.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span>Live waiting queue</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span>Patient medical dossier preview</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span>Structured SOAP + Rx writer</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigateTo('DOCTOR', '/doctor')}
              className="mt-6 w-full flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all"
            >
              <span>Launch Doctor Cockpit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 4. Management Portal */}
          <div className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-purple-300 hover:shadow-xl transition-all flex flex-col justify-between">
            <div className="absolute top-4 right-4 text-purple-500 bg-purple-50 p-2 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
                Governance
              </span>
              <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                Management
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Hospital KPI analytics, OPD footfall trends, revenue tracking, and doctor staff directory.
              </p>

              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                  <span>Daily footfall & revenue metrics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                  <span>Doctor duty & utilization roster</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                  <span>Multi-tenant clinic selector</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigateTo('MANAGEMENT', '/management')}
              className="mt-6 w-full flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-all"
            >
              <span>Launch Management</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* The 5-Step Presentation Story Walkthrough */}
      <section className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-brand-950/60 border border-brand-800 px-3 py-1 rounded-full">
              Demo Script for Evaluators
            </span>
            <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight">
              The Closed-Loop Outpatient Journey in 5 Steps
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              During your project defense, demonstrate how data travels through all 4 roles in real-time:
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center mb-2">1</span>
              <h4 className="text-xs font-bold text-white">Patient Books</h4>
              <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                Patient picks Dr. Mehta & uploads their recent blood report.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
              <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 font-bold text-xs flex items-center justify-center mb-2">2</span>
              <h4 className="text-xs font-bold text-white">AI Explains</h4>
              <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                Patient clicks "Explain Report" to see findings in plain English.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center mb-2">3</span>
              <h4 className="text-xs font-bold text-white">Reception Checks In</h4>
              <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                Front desk issues Token CARD-101 and marks patient arrived.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center mb-2">4</span>
              <h4 className="text-xs font-bold text-white">Doctor Prescribes</h4>
              <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                Doctor reviews history, enters SOAP notes, and generates Rx.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-2xl">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs flex items-center justify-center mb-2">5</span>
              <h4 className="text-xs font-bold text-white">Metrics Update</h4>
              <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                Rx syncs to patient timeline; Management revenue increments.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
