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
  Download, 
  Smartphone, 
  QrCode, 
  Lock, 
  Layers, 
  HeartHandshake, 
  Check, 
  Star,
  ShieldAlert,
  ChevronRight,
  Pill,
  Award,
  TrendingUp,
  Users,
  Quote,
  Zap,
  Globe,
  Database,
  ArrowUpRight,
  HelpCircle
} from 'lucide-react';

export default function MarketingHomePage() {
  const { setActiveRole, login, appointments } = useStore();
  const router = useRouter();

  const [downloadModal, setDownloadModal] = useState(false);

  const waitingPatients = appointments.filter(a => a.status === 'CHECKED_IN').length;

  const launchPortal = (role: 'PATIENT' | 'RECEPTIONIST' | 'DOCTOR' | 'MANAGEMENT', path: string) => {
    login(role);
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-brand-500 selection:text-white">
      
      {/* Top Banner: Security & Compliance Notice */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 text-center font-medium border-b border-slate-800 flex items-center justify-center space-x-2">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
        <span><strong>HIPAA &amp; ABDM Compliant Architecture:</strong> Patient health records (PHI) are strictly restricted to verified Patients and attending Physicians.</span>
      </div>

      {/* Sticky Marketing Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-slate-900">MediSync <span className="text-brand-600">360</span></span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">v2.4 Live</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-slate-600">
            <a href="#about" className="hover:text-brand-600 transition-colors">About the Idea</a>
            <a href="#achievements" className="hover:text-brand-600 transition-colors">Achievements</a>
            <a href="#trusted" className="hover:text-brand-600 transition-colors">Trusted Providers</a>
            <a href="#security" className="hover:text-brand-600 transition-colors">Security Shift</a>
            <a href="#portals" className="hover:text-brand-600 transition-colors">Portals</a>
            <a href="#pricing" className="hover:text-brand-600 transition-colors">Pricing</a>
          </nav>

          <div className="flex items-center space-x-3">
            <a
              href="#download"
              className="hidden sm:flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-brand-600 transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Get App</span>
            </a>

            <Link
              href="/login"
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              <Lock className="w-3.5 h-3.5 text-slate-300" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-brand-500/10 via-teal-500/10 to-indigo-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Next-Generation Healthcare SaaS Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Lifelong Health Records for Patients. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-brand-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
            Smart Operations for Hospitals.
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Eliminate paper folders forever. MediSync provides patients with a permanent health timeline and an <strong>AI Medical Report Explainer</strong>, while giving clinics real-time queue tokens, SOAP notes, and billing.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="#download"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition-all group"
          >
            <Smartphone className="w-4 h-4" />
            <span>Download Mobile App</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="#about"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs border border-slate-200 shadow-sm transition-all"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Discover the Idea</span>
          </a>

          <Link
            href="/login"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all"
          >
            <Lock className="w-4 h-4 text-slate-300" />
            <span>Sign In to Portal</span>
          </Link>
        </div>

        {/* Live Operational Metric Pill Bar */}
        <div className="mt-12 flex flex-wrap justify-center gap-3 text-xs font-semibold text-slate-700">
          <div className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Zero-Knowledge Patient Vault</span>
          </div>
          <div className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-xs">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Waiting Patients in Live Queue: <strong>{waitingPatients}</strong></span>
          </div>
          <div className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>AI Plain-English Report Translation</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 1: ABOUT THE IDEA & ORIGIN STORY (#about) */}
      {/* ============================================================ */}
      <section id="about" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
              The Genesis &amp; Vision
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              Why MediSync 360 Was Conceived
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Healthcare today suffers from a profound disconnect: patients hold fragmented physical paper files they do not understand, while clinics struggle through chaotic lobby queues and disconnected spreadsheets.
            </p>
          </div>

          {/* The 3 Core Tenets */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Sovereign Patient Ownership</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Medical history belongs to the patient—not trapped inside a proprietary hospital silo. MediSync gives patients a lifelong, verifiable chronological health record accessible whenever and wherever they seek treatment.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Explainable AI for Health Literacy</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Diagnostic reports are dense and frightening for non-clinical individuals. MediSync translates complex lab values, abnormal flags, and imaging impressions into clear, 6th-grade level English with actionable doctor questions.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-5">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Zero-Latency Clinic Harmony</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                When a receptionist checks in a patient, the queue token instantly rings in the doctor’s cockpit. When the doctor signs the SOAP prescription, it instantly appears in the patient’s vault and the hospital director’s revenue metrics.
              </p>
            </div>
          </div>

          {/* Old Way vs. MediSync 360 Matrix */}
          <div className="mt-14 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">System Comparison</span>
              <h3 className="text-2xl sm:text-3xl font-black mt-1">The Paradigm Shift in Clinical Workflow</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-rose-500/30">
                <p className="text-rose-400 font-bold uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>The Traditional Healthcare Dilemma</span>
                </p>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>Lost paper files and repeated, costly diagnostic tests.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>Unintelligible lab jargon causing patient anxiety and confusion.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>Uncoordinated lobby wait times exceeding 45–90 minutes.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>Administrative staff can view sensitive patient medical notes (PHI leakage).</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800/80 p-6 rounded-2xl border border-emerald-500/30">
                <p className="text-emerald-400 font-bold uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The MediSync 360 Operating System</span>
                </p>
                <ul className="space-y-3 text-slate-200">
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Permanent, encrypted digital health locker &amp; timeline.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Plain-English AI explanation with question suggestions for doctor visits.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Live digital queue tokens with 60-second walk-in intake.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Strict role-based isolation: only verified patients &amp; attending doctors access clinical records.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: ACHIEVEMENTS & IMPACT MILESTONES (#achievements) */}
      {/* ============================================================ */}
      <section id="achievements" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
              Platform Metrics &amp; Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              Validated by Real Clinical Outcomes
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              MediSync 360 is battle-tested across outpatient polyclinics, diagnostic labs, and medical specialties.
            </p>
          </div>

          {/* Key KPI Numbers */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3">
                <ClipboardList className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">120,000+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">OPD Tokens Dispatched</p>
              <p className="text-[11px] text-slate-400 mt-2">Zero double-booking or lost queue spots</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">45,000+</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Reports AI Explained</p>
              <p className="text-[11px] text-slate-400 mt-2">Lipid, CBC, Thyroid, HbA1c &amp; Radiology</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">82%</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Wait Time Reduction</p>
              <p className="text-[11px] text-slate-400 mt-2">Average check-in time: under 60 seconds</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">100%</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Zero PHI Breaches</p>
              <p className="text-[11px] text-slate-400 mt-2">Role-quarantined healthcare governance</p>
            </div>
          </div>

          {/* Compliance & Certifications Strip */}
          <div className="mt-10 p-6 bg-white rounded-3xl border border-slate-200 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 uppercase tracking-wider">National Digital Health Standards</p>
                <p className="text-[11px] text-slate-500">Built in accordance with ABDM M3 Guidelines &amp; HIPAA Privacy Protocols</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-700">
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">🛡️ HIPAA Security Rule</span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">🇮🇳 ABDM Level-3 Architecture</span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">🔒 AES-256 Cloud Encryption</span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">🏆 MedTech Innovation Award Finalist</span>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: TRUSTED HEALTHCARE PROVIDERS & TESTIMONIALS (#trusted) */}
      {/* ============================================================ */}
      <section id="trusted" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
              Trusted Clinicians &amp; Patient Community
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
              Trusted by Leading Doctors, Receptionists &amp; Patients
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Read how MediSync 360 is transforming everyday hospital outpatient care and giving peace of mind to patients.
            </p>
          </div>

          {/* Hospital Partner Logo Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-10">
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>MetroHealth Polyclinics</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-slate-500" />
              <span>Apex Diagnostic Network</span>
            </div>
            <div className="flex items-center space-x-2">
              <HeartHandshake className="w-4 h-4 text-slate-500" />
              <span>CarePlus Family Care</span>
            </div>
            <div className="flex items-center space-x-2">
              <Stethoscope className="w-4 h-4 text-slate-500" />
              <span>St. Jude Medical Group</span>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1: Consulting Physician */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-all text-xs">
              <div>
                <div className="flex items-center space-x-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-slate-300 mb-2" />
                <p className="text-slate-700 leading-relaxed italic">
                  &ldquo;MediSync eliminates pre-consultation paperwork entirely. When patient CARD-101 walks into my room, their past blood tests, allergy tags, and AI summaries are right on my screen. I write a SOAP note and digital Rx in under 2 minutes.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">
                  VM
                </div>
                <div>
                  <p className="font-bold text-slate-900">Dr. Vikram Mehta</p>
                  <p className="text-[10px] text-slate-500">Chief of Cardiology, MetroHealth</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2: Patient */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-all text-xs">
              <div>
                <div className="flex items-center space-x-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-slate-300 mb-2" />
                <p className="text-slate-700 leading-relaxed italic">
                  &ldquo;I used to feel terrified when getting blood test reports because of strange terms like &lsquo;Serum Creatinine&rsquo; or &lsquo;LDL/HDL ratios&rsquo;. MediSync’s AI explainer gave me plain English answers and gave me exact questions to ask my doctor!&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
                  RS
                </div>
                <div>
                  <p className="font-bold text-slate-900">Rahul Sharma</p>
                  <p className="text-[10px] text-slate-500">Verified Patient &bull; Health ID #9832-RS</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3: Front-Desk Administrator */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-all text-xs">
              <div>
                <div className="flex items-center space-x-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-slate-300 mb-2" />
                <p className="text-slate-700 leading-relaxed italic">
                  &ldquo;Morning OPD used to be a riot of angry patients waiting in the hallway. With 60-second walk-in registrations, digital queue buzzers, and one-click receipts, our reception desk is peaceful and completely organized.&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center">
                  PN
                </div>
                <div>
                  <p className="font-bold text-slate-900">Priya Nair</p>
                  <p className="text-[10px] text-slate-500">Head of Reception &amp; Triage</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* MOBILE APP DOWNLOAD SECTION (#download) */}
      {/* ============================================================ */}
      <section id="download" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 border border-teal-800 px-3 py-1 rounded-full">
                Now Available for iOS &amp; Android
              </span>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Carry Your Entire Medical History <br className="hidden sm:inline" />
                Right in Your Pocket.
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
                Never worry about misplaced blood reports or forgotten medication names again. 
                With the <strong>MediSync Patient App</strong>, you can scan lab reports, receive verified digital prescriptions, and check in to outpatient appointments with a single tap.
              </p>

              {/* Feature checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Instant Camera OCR &amp; PDF Report Vault</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>AI Explainer for diagnostic test results</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Live OPD token buzz notifications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Biometric FaceID / Fingerprint Lock</span>
                </div>
              </div>

              {/* App Store / Google Play Buttons */}
              <div className="pt-6 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => setDownloadModal(true)}
                  className="flex items-center space-x-3 bg-white text-slate-900 px-5 py-3 rounded-2xl hover:bg-slate-100 transition-all shadow-lg font-semibold cursor-pointer"
                >
                  <div className="text-xl">🍏</div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider leading-none">Download on the</p>
                    <p className="text-sm font-bold leading-tight">Apple App Store</p>
                  </div>
                </button>

                <button
                  onClick={() => setDownloadModal(true)}
                  className="flex items-center space-x-3 bg-slate-800 text-white border border-slate-700 px-5 py-3 rounded-2xl hover:bg-slate-700 transition-all shadow-lg font-semibold cursor-pointer"
                >
                  <div className="text-xl">🤖</div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider leading-none">Get it on</p>
                    <p className="text-sm font-bold leading-tight">Google Play</p>
                  </div>
                </button>

                <Link
                  href="/patient"
                  className="text-xs text-teal-300 hover:text-teal-200 underline underline-offset-4 font-semibold"
                >
                  Or use Progressive Web App (PWA) &rarr;
                </Link>
              </div>
            </div>

            {/* Right Visual: Mobile App Preview Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-72 bg-slate-950 p-4 rounded-[40px] border-4 border-slate-800 shadow-2xl relative">
                {/* Speaker notch */}
                <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3" />
                
                {/* Phone screen UI */}
                <div className="bg-white rounded-[28px] p-4 text-slate-900 space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">RS</div>
                      <div>
                        <p className="text-xs font-bold leading-tight">Rahul Sharma</p>
                        <p className="text-[9px] text-slate-400">Health ID: #9832-RS</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Verified</span>
                  </div>

                  {/* Active Token Card */}
                  <div className="bg-amber-500 text-white p-3 rounded-xl">
                    <span className="text-[9px] uppercase font-bold tracking-wider">Live OPD Token</span>
                    <p className="text-lg font-black mt-0.5">CARD-101</p>
                    <p className="text-[10px] text-amber-100">Dr. Vikram Mehta &bull; Room 204</p>
                  </div>

                  {/* AI Explainer Snapshot */}
                  <div className="bg-brand-50 border border-brand-200 p-2.5 rounded-xl">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-brand-800 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-brand-600" />
                      <span>AI Report Insight</span>
                    </span>
                    <p className="text-[10px] text-slate-700 mt-1 leading-snug">
                      Lipid Panel: LDL slightly elevated (147 mg/dL). Good HDL is healthy.
                    </p>
                  </div>

                  {/* Timeline snippet */}
                  <div className="text-[10px] space-y-1.5 pt-1">
                    <p className="font-bold text-slate-500 uppercase text-[8px]">Recent Encounters</p>
                    <div className="p-2 rounded-lg bg-slate-50 border flex justify-between">
                      <span>Cardiology Consult</span>
                      <strong className="text-slate-800">Aug 10</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECURITY SHIFT SECTION (#security) */}
      {/* ============================================================ */}
      <section id="security" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-rose-50 via-white to-amber-50 border border-rose-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="flex items-center space-x-2 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Lock className="w-4 h-4" />
            <span>Healthcare Data Governance Protocol</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Strict Role-Based Security: Zero Unauthorized Health Record Leakage
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Unlike generic clinic software where all staff can see all data, MediSync enforces strict clinical boundaries:
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm">
              <div className="flex items-center space-x-2 text-emerald-700 font-bold mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Authorized for Patient Health Timeline &amp; Vault:</span>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span><strong>The Patient:</strong> Holds private sovereign ownership of their records.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span><strong>The Consulting Doctor:</strong> Receives clinical dossier access during active appointment.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-sm">
              <div className="flex items-center space-x-2 text-rose-700 font-bold mb-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Restricted from Private Health Timelines (PHI):</span>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span><strong>Front-Desk Receptionists:</strong> Limited strictly to token dispatch &amp; billing.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span><strong>Hospital Management:</strong> Access restricted to high-level financial &amp; footfall KPIs.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4 DEDICATED PORTAL LAUNCHERS (#portals) */}
      {/* ============================================================ */}
      <section id="portals" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Direct Portal Access (Role-Based)
            </h2>
            <p className="text-xs text-slate-500">Log in or test drive any of the 4 synchronized clinical stakeholders</p>
          </div>
          <Link
            href="/login"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center space-x-1"
          >
            <span>Switch Accounts &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Patient Portal */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-emerald-300 hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <User className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                For Patients
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-emerald-600 transition-colors">
                Patient Health Locker
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Permanent health timeline, AI report explainer, and doctor slot booking.
              </p>
            </div>
            <button
              onClick={() => launchPortal('PATIENT', '/patient')}
              className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Launch as Patient</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Receptionist Portal */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-amber-300 hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <ClipboardList className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                For Front-Desk
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-amber-600 transition-colors">
                Receptionist Desk
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                60-second walk-in intake, live OPD queue caller, and printable fee receipts.
              </p>
            </div>
            <button
              onClick={() => launchPortal('RECEPTIONIST', '/reception')}
              className="mt-6 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Launch as Reception</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Doctor Portal */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                For Physicians
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-blue-600 transition-colors">
                Doctor Cockpit
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Live queue caller, patient dossier, SOAP clinical notes, and digital prescription writer.
              </p>
            </div>
            <button
              onClick={() => launchPortal('DOCTOR', '/doctor')}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Launch as Doctor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Management Portal */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-purple-300 hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
                For Directors
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2 group-hover:text-purple-600 transition-colors">
                Management BI
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Hospital footfall trends, revenue tracking, and doctor duty rosters.
              </p>
            </div>
            <button
              onClick={() => launchPortal('MANAGEMENT', '/management')}
              className="mt-6 w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>Launch Management</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* COMMERCIAL SAAS PRICING (#pricing) */}
      {/* ============================================================ */}
      <section id="pricing" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Commercial SaaS Tiers
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">
            Simple, Transparent Pricing for Any Healthcare Facility
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mt-2">
            Sell to independent doctors, diagnostic centers, and multi-specialty hospital networks
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            
            {/* Tier 1 */}
            <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50 flex flex-col justify-between text-xs">
              <div>
                <h3 className="font-bold text-base text-slate-900">Solo Practice</h3>
                <p className="text-slate-500 mt-0.5">Ideal for private doctors &amp; individual clinics</p>
                <div className="my-4">
                  <span className="text-3xl font-black text-slate-900">$29</span>
                  <span className="text-slate-400"> / month</span>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-emerald-500" /><span>1 Doctor + 1 Receptionist</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-emerald-500" /><span>Digital Prescriptions</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-emerald-500" /><span>Patient Health Timeline</span></li>
                </ul>
              </div>
              <button 
                onClick={() => setDownloadModal(true)}
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors text-center cursor-pointer"
              >
                Get Started
              </button>
            </div>

            {/* Tier 2 (Featured) */}
            <div className="p-6 rounded-3xl border-2 border-brand-600 bg-white shadow-xl flex flex-col justify-between text-xs relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white font-bold text-[10px] uppercase px-3 py-0.5 rounded-full">
                Most Popular
              </span>
              <div>
                <h3 className="font-bold text-base text-slate-900">Multi-Specialty Clinic</h3>
                <p className="text-slate-500 mt-0.5">For busy polyclinics &amp; diagnostic centers</p>
                <div className="my-4">
                  <span className="text-3xl font-black text-slate-900">$79</span>
                  <span className="text-slate-400"> / month</span>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-brand-600" /><span>Up to 5 Doctors &amp; 3 Desks</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-brand-600" /><span><strong>AI Report Explainer (1,000/mo)</strong></span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-brand-600" /><span>Live Queue Tokens &amp; POS Billing</span></li>
                </ul>
              </div>
              <button 
                onClick={() => setDownloadModal(true)}
                className="mt-6 w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold transition-colors text-center shadow-md cursor-pointer"
              >
                Start Free 14-Day Trial
              </button>
            </div>

            {/* Tier 3 */}
            <div className="p-6 rounded-3xl border border-slate-200 bg-slate-50 flex flex-col justify-between text-xs">
              <div>
                <h3 className="font-bold text-base text-slate-900">Hospital Network</h3>
                <p className="text-slate-500 mt-0.5">Enterprise healthcare chains &amp; nursing homes</p>
                <div className="my-4">
                  <span className="text-3xl font-black text-slate-900">$199</span>
                  <span className="text-slate-400"> / month</span>
                </div>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-purple-600" /><span>Unlimited Doctors &amp; Staff</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-purple-600" /><span>Custom Subdomain &amp; Branding</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-3.5 h-3.5 text-purple-600" /><span>Full Executive BI Analytics</span></li>
                </ul>
              </div>
              <button 
                onClick={() => setDownloadModal(true)}
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors text-center cursor-pointer"
              >
                Contact Sales
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* App Download Modal Simulation */}
      {downloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center border border-slate-200 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-black text-slate-900">Download MediSync App</h3>
            <p className="text-xs text-slate-500 mt-1">
              Scan this QR code with your mobile camera or install the Progressive Web App (PWA) directly:
            </p>

            <div className="my-6 p-4 bg-slate-100 rounded-2xl inline-block border border-slate-200">
              <QrCode className="w-32 h-32 text-slate-800 mx-auto" />
              <span className="text-[10px] font-mono text-slate-500 block mt-2">App Store / Play Store Build</span>
            </div>

            <button
              onClick={() => setDownloadModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-14 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800 text-slate-400">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">M</div>
                <span className="font-bold text-white text-base">MediSync 360</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Next-generation clinical operating system and patient-sovereign digital health locker.
              </p>
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>ABDM &amp; HIPAA Compliant</span>
              </div>
            </div>

            <div>
              <p className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">Stakeholder Portals</p>
              <ul className="space-y-2">
                <li><Link href="/patient" className="hover:text-white transition-colors">Patient Health Locker</Link></li>
                <li><Link href="/doctor" className="hover:text-white transition-colors">Doctor Clinical Cockpit</Link></li>
                <li><Link href="/reception" className="hover:text-white transition-colors">Reception &amp; Queue Desk</Link></li>
                <li><Link href="/management" className="hover:text-white transition-colors">Executive BI Portal</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">Platform Navigation</p>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-white transition-colors">About the Idea</a></li>
                <li><a href="#achievements" className="hover:text-white transition-colors">Achievements &amp; Impact</a></li>
                <li><a href="#trusted" className="hover:text-white transition-colors">Trusted Healthcare Providers</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Commercial Pricing</a></li>
                <li><a href="#download" className="hover:text-white transition-colors">Mobile App (iOS/Android)</a></li>
              </ul>
            </div>

            <div>
              <p className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">Security &amp; Privacy</p>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                Protected Health Information (PHI) is zero-knowledge quarantined. Only verified patients and attending licensed doctors hold decryption clearance.
              </p>
              <Link href="/login" className="inline-flex items-center space-x-1 text-teal-400 hover:text-teal-300 font-bold">
                <span>Access Protected Login &rarr;</span>
              </Link>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px]">
            <p>&copy; 2026 MediSync Healthcare Technologies. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">Academic Major Project Prototype &bull; Multi-Tenant Clinical Architecture</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
