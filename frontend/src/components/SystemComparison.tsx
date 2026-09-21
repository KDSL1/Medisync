"use client";

import React, { useState } from 'react';
import Card3D from './Card3D';
import { 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Clock, 
  Lock, 
  ArrowRight, 
  AlertTriangle, 
  DollarSign, 
  HelpCircle, 
  Users, 
  ShieldCheck, 
  TrendingDown, 
  Zap, 
  Check, 
  X,
  FileQuestion,
  Activity,
  Layers,
  FileX,
  FileCheck,
  Building2,
  Stethoscope,
  HeartPulse
} from 'lucide-react';

interface PillarData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  tag: string;
  legacy: {
    badge: string;
    headline: string;
    scenarioTitle: string;
    scenarioSnippet: string;
    scenarioDetail: string;
    points: { title: string; desc: string }[];
    metric: { value: string; label: string };
  };
  medisync: {
    badge: string;
    headline: string;
    scenarioTitle: string;
    scenarioSnippet: string;
    scenarioDetail: string;
    points: { title: string; desc: string }[];
    metric: { value: string; label: string };
  };
}

const PILLARS: PillarData[] = [
  {
    id: 'records',
    title: 'Patient Health Records',
    subtitle: 'Lost Paper Binders vs. Encrypted ABDM Locker',
    icon: FileText,
    tag: 'Lifelong Records',
    legacy: {
      badge: 'FRAGILE PAPER SILO',
      headline: 'The Traditional Healthcare Dilemma',
      scenarioTitle: 'Medical Chart #409 Missing',
      scenarioSnippet: 'Paper folder lost between branches. Redundant CBC, LFT & Lipid tests re-ordered.',
      scenarioDetail: 'Patient forced to pay ₹3,500 again. Diagnosis postponed by 48 hours.',
      points: [
        {
          title: 'Lost Paper Folders & Redundant Diagnostics',
          desc: 'Patients must haul binders of physical reports. When tests go missing, clinics duplicate expensive lab orders.'
        },
        {
          title: 'No Cross-Hospital History',
          desc: 'Each clinic operates in an isolated vacuum with zero visibility into past drug allergies, vitals, or surgeries.'
        },
        {
          title: 'Paper Degradation & Wear',
          desc: 'Thermal ECG printouts fade within months; physical X-rays and lab slips are vulnerable to tears and misplacement.'
        },
        {
          title: 'Delayed Emergency Triage',
          desc: 'In acute care situations, doctors spend critical minutes questioning unconscious or distressed patients for history.'
        }
      ],
      metric: { value: '₹4,200', label: 'Avg. wasted annually per chronic patient on repeated tests' }
    },
    medisync: {
      badge: 'NEXT-GEN CLINICAL STANDARD',
      headline: 'The MediSync 360 Operating System',
      scenarioTitle: 'ABDM 256-Bit Encrypted Vault',
      scenarioSnippet: 'Lifelong health timeline synced. Past vitals, ECG waveforms & allergy tags ready instantly.',
      scenarioDetail: 'Doctor reviews 3-year trendlines in under 15 seconds. 0 repeated tests required.',
      points: [
        {
          title: 'Permanent Encrypted Health Locker',
          desc: 'Zero-friction digital vault accessible from any smartphone, preserving diagnostic history for a lifetime.'
        },
        {
          title: 'Unified Cross-Facility Sync',
          desc: 'Patients securely grant 1-click access to attending doctors across any hospital or clinic in the network.'
        },
        {
          title: 'Interactive Digital Waveforms & Scans',
          desc: 'High-fidelity storage of DICOM radiology, laboratory panels, and digital Rx with zero degradation.'
        },
        {
          title: 'Instant Emergency Care Recall',
          desc: 'Critical blood group, allergy warnings, and emergency contacts accessible via verified QR token in seconds.'
        }
      ],
      metric: { value: '0 Repeated Tests', label: '100% lifetime chronological recall across all network facilities' }
    }
  },
  {
    id: 'ai',
    title: 'AI Lab Literacy & Diagnostics',
    subtitle: 'Cryptic Jargon vs. Plain-English AI Explainer',
    icon: Sparkles,
    tag: 'Explainable AI',
    legacy: {
      badge: 'UNINTELLIGIBLE JARGON',
      headline: 'The Traditional Healthcare Dilemma',
      scenarioTitle: 'Lab Report: Serum Creatinine 1.8 mg/dL [FLAG: HIGH]',
      scenarioSnippet: 'Raw report: "eGFR: 42 mL/min/1.73m² (Grade 3a CKD?)". No clinician explanation provided.',
      scenarioDetail: 'Patient spends 3 days frantically Googling worst-case scenarios, causing severe anxiety.',
      points: [
        {
          title: 'Terrifying Clinical Terminology',
          desc: 'Dense lab reports use obscure medical codes and flags that leave 82% of patients feeling overwhelmed and panicked.'
        },
        {
          title: 'Hazardous Self-Googling',
          desc: 'Without immediate guidance, patients rely on search engine forums that often exaggerate mild benign abnormalities.'
        },
        {
          title: 'Unprepared Doctor Visits',
          desc: 'Patients arrive at appointments confused, unable to articulate the right questions during tight 5-minute consults.'
        },
        {
          title: 'Poor Preventive Follow-Through',
          desc: 'Misunderstanding the severity of border-line markers leads patients to ignore critical early-stage interventions.'
        }
      ],
      metric: { value: '82%', label: 'Of patients report acute anxiety while reading raw lab reports' }
    },
    medisync: {
      badge: 'EXPLAINABLE HEALTH INTELLIGENCE',
      headline: 'The MediSync 360 Operating System',
      scenarioTitle: 'MediSync AI Explainer: Plain-English Translation',
      scenarioSnippet: '"Your kidneys are filtering slightly slower than usual. Common with mild dehydration. Not an emergency."',
      scenarioDetail: 'Generated 3 tailored questions for Dr. Mehta: "Should I re-test hydration in 2 weeks?"',
      points: [
        {
          title: '6th-Grade Plain-English Summaries',
          desc: 'Translates complex diagnostic values, biochemical ratios, and imaging impressions into clear, compassionate insights.'
        },
        {
          title: 'Contextual Non-Alarmist Guidance',
          desc: 'Distinguishes between acute medical emergencies and routine physiological fluctuations, preventing panic.'
        },
        {
          title: 'Doctor Visit Question Generator',
          desc: 'Empowers patients with 3 precise, actionable questions to discuss during their upcoming physician consultation.'
        },
        {
          title: 'Holistic Trend Tracking',
          desc: 'Visually charts biomarker trajectories over months, helping patients celebrate lifestyle improvements.'
        }
      ],
      metric: { value: '100%', label: 'Health literacy with clinician-aligned questions generated instantly' }
    }
  },
  {
    id: 'queue',
    title: 'OPD Queue & Reception Triage',
    subtitle: 'Hallway Congestion vs. 60-Sec Live Token Buzzer',
    icon: Clock,
    tag: 'Real-Time Triage',
    legacy: {
      badge: 'CHAOTIC WAITING ROOM',
      headline: 'The Traditional Healthcare Dilemma',
      scenarioTitle: 'Lobby Status: 28 Patients Waiting',
      scenarioSnippet: 'Paper token slip crumpled in hand. Reception desk besieged by angry patients demanding updates.',
      scenarioDetail: 'Doctor running 40 mins late with zero automated alert. Hallway queue disputes erupt.',
      points: [
        {
          title: 'Uncoordinated 45–90 Min Lobby Waits',
          desc: 'Patients sit trapped in crowded, germ-filled waiting halls with zero visibility into actual queue progression.'
        },
        {
          title: 'Manual Paper Registers & Errors',
          desc: 'Receptionists spend 5–8 minutes handwriting patient details into bulky registers, causing lobby gridlock.'
        },
        {
          title: 'Queue Jumping & Friction',
          desc: 'Lack of synchronized digital displays causes persistent disputes between walk-in patients and scheduled slots.'
        },
        {
          title: 'Burned-Out Front Desk Staff',
          desc: 'Receptionists face relentless verbal complaints about delays instead of focusing on critical triage assistance.'
        }
      ],
      metric: { value: '78 Mins', label: 'Average waiting room idle delay in traditional outpatient clinics' }
    },
    medisync: {
      badge: 'ZERO-FRICTION DIGITAL DISPATCH',
      headline: 'The MediSync 360 Operating System',
      scenarioTitle: 'Smart Token #CARD-101 Active',
      scenarioSnippet: 'QR intake in 60 seconds. "2 patients ahead (est. 6 mins). Next: Dr. Vikram Mehta (Room 302)."',
      scenarioDetail: 'Live phone buzzer notification allows patient to relax in cafeteria until summoned.',
      points: [
        {
          title: '60-Second Walk-In Intake',
          desc: 'Patients scan a counter QR code or provide their mobile number; appointment token generated in 1 click.'
        },
        {
          title: 'Live Mobile Queue Buzzer',
          desc: 'Real-time SMS and web updates let patients wait comfortably in hospital gardens or cafes until their turn.'
        },
        {
          title: 'Direct Doctor Cockpit Synchronization',
          desc: 'When reception checks in patient #CARD-101, the patient profile immediately rings into the doctor’s consult screen.'
        },
        {
          title: 'Automated Billing & Digital Receipts',
          desc: 'Instant 1-click POS invoice generation with WhatsApp/SMS receipts eliminates checkout bottlenecks.'
        }
      ],
      metric: { value: '< 60 Sec', label: 'Walk-in registration time with 40% reduction in lobby wait' }
    }
  },
  {
    id: 'security',
    title: 'Protected Health Information (PHI)',
    subtitle: 'Exposed Desk Charts vs. Zero-Trust RBAC Quarantine',
    icon: Lock,
    tag: 'ABDM & HIPAA Zero-Trust',
    legacy: {
      badge: 'UNPROTECTED PHI EXPOSURE',
      headline: 'The Traditional Healthcare Dilemma',
      scenarioTitle: 'Clinical Notes Left on Open Counter',
      scenarioSnippet: 'Patient folder containing psychiatric & HIV history left open on reception desk next to POS machine.',
      scenarioDetail: 'Visitors, delivery agents, and other waiting patients can easily read confidential notes.',
      points: [
        {
          title: 'Administrative Staff Views Sensitive Notes',
          desc: 'Receptionists and billing clerks handle open paper charts containing intimate diagnoses and psychiatric history.'
        },
        {
          title: 'Zero Audit Trails for Breaches',
          desc: 'Physical folders have no access logging. Anyone can read, photocopy, or misplace confidential files undetected.'
        },
        {
          title: 'Disaster & Loss Vulnerability',
          desc: 'Clinics risk catastrophic data destruction from water leakage, fire hazards, or accidental shredding.'
        },
        {
          title: 'ABDM & HIPAA Regulatory Non-Compliance',
          desc: 'Unquarantined physical charts expose hospital directors to severe statutory fines and accreditation revocation.'
        }
      ],
      metric: { value: '1 in 3', label: 'Clinics experience accidental physical chart exposure or loss' }
    },
    medisync: {
      badge: 'CRYPTOGRAPHIC ZERO-TRUST ACCESS',
      headline: 'The MediSync 360 Operating System',
      scenarioTitle: 'Strict Role-Quarantined View Active',
      scenarioSnippet: 'Receptionists see operational Token #101 only. Clinical SOAP notes cryptographically locked.',
      scenarioDetail: 'Only authenticated attending doctor and verified patient hold decryption keys.',
      points: [
        {
          title: 'Role-Quarantined Protected Health Information',
          desc: 'Reception staff sees only queue tokens and payment status; medical SOAP notes are strictly quarantined.'
        },
        {
          title: 'Immutable Cryptographic Audit Trails',
          desc: 'Every file view, consultation note, and prescription is timestamped with actor ID and tenant signature.'
        },
        {
          title: 'Bank-Grade AES-256 Cloud Storage',
          desc: 'Redundant multi-region encrypted cloud backups guarantee zero data loss with 99.9% clinical uptime.'
        },
        {
          title: 'ABDM Milestone 3 & HIPAA Compliant',
          desc: 'Pre-certified enterprise architecture guarantees complete patient consent governance and privacy compliance.'
        }
      ],
      metric: { value: '100%', label: 'Zero-trust role isolation: zero administrative PHI leakage' }
    }
  }
];

export default function SystemComparison() {
  const [activePillarId, setActivePillarId] = useState<string>('records');
  const activePillar = PILLARS.find(p => p.id === activePillarId) || PILLARS[0];

  return (
    <div className="mt-16 bg-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 max-w-4xl mb-10 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-teal-400 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
          <Activity className="w-3.5 h-3.5 animate-pulse text-teal-400" />
          <span>System Comparison &bull; Architectural Evolution</span>
        </div>
        
        <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          The Paradigm Shift in Clinical Workflow
        </h3>
        
        <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          Compare the costly friction and privacy risks of fragmented legacy healthcare with the unified velocity, security, and intelligence of the <strong>MediSync 360 Clinical Operating System</strong>.
        </p>
      </div>

      {/* Interactive 4-Pillar Scenario Tabs */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-8">
        {PILLARS.map((pillar) => {
          const isActive = pillar.id === activePillarId;
          const IconComponent = pillar.icon;
          return (
            <button
              key={pillar.id}
              onClick={() => setActivePillarId(pillar.id)}
              className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer group ${
                isActive
                  ? 'bg-slate-800/90 border-teal-500/80 shadow-lg shadow-teal-500/10 ring-1 ring-teal-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className={`p-2 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-teal-500/20 text-teal-300' 
                    : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                }`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                )}
              </div>
              <div>
                <p className={`font-bold text-xs leading-tight transition-colors ${
                  isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                }`}>
                  {pillar.title}
                </p>
                <p className="text-[10px] text-slate-500 truncate mt-1">
                  {pillar.tag}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Side-by-Side High-Contrast Comparative Cards */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        
        {/* LEFT CARD: THE TRADITIONAL HEALTHCARE DILEMMA */}
        <Card3D maxTilt={6} scale={1.01} className="h-full">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-rose-950/20 to-slate-900 border border-rose-500/30 hover:border-rose-500/50 shadow-xl flex flex-col justify-between h-full preserve-3d transition-all">
            
            <div>
              {/* Card Header Badge */}
              <div className="flex items-center justify-between mb-4 translate-z-20">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-400 text-[10px] font-bold tracking-wider uppercase">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{activePillar.legacy.badge}</span>
                </div>
                <span className="text-[11px] font-semibold text-rose-400/80">Legacy Status Quo</span>
              </div>

              <h4 className="text-base sm:text-lg font-black text-rose-200 mb-4 translate-z-20">
                {activePillar.legacy.headline}
              </h4>

              {/* Realistic Scenario Preview Box */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-rose-500/30 mb-6 translate-z-30 shadow-inner">
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs mb-1.5">
                  <FileX className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{activePillar.legacy.scenarioTitle}</span>
                </div>
                <p className="text-[11px] text-slate-300 italic mb-2">
                  &ldquo;{activePillar.legacy.scenarioSnippet}&rdquo;
                </p>
                <div className="text-[10px] px-2.5 py-1 rounded bg-rose-950/60 text-rose-300 font-medium border border-rose-800/40">
                  {activePillar.legacy.scenarioDetail}
                </div>
              </div>

              {/* 4 Concrete Breakdown Points */}
              <div className="space-y-3.5 translate-z-20 mb-6">
                {activePillar.legacy.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs">
                    <div className="w-5 h-5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-black text-xs shadow-xs">
                      ✕
                    </div>
                    <div>
                      <p className="font-bold text-slate-200 leading-snug">{pt.title}</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dilemma Metric Footer */}
            <div className="mt-4 pt-4 border-t border-rose-500/20 flex items-center justify-between translate-z-20">
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black text-rose-400">
                  {activePillar.legacy.metric.value}
                </span>
                <span className="text-[10px] text-slate-400 max-w-[180px] leading-tight">
                  {activePillar.legacy.metric.label}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40">
                Friction Point
              </span>
            </div>

          </div>
        </Card3D>

        {/* RIGHT CARD: THE MEDISYNC 360 OPERATING SYSTEM */}
        <Card3D maxTilt={6} scale={1.01} className="h-full">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-teal-950/30 to-slate-900 border border-teal-500/40 hover:border-teal-400/70 shadow-2xl shadow-teal-500/10 flex flex-col justify-between h-full preserve-3d transition-all relative overflow-hidden">
            
            {/* Top Light Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Card Header Badge */}
              <div className="flex items-center justify-between mb-4 translate-z-20">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-950/90 border border-teal-500/50 text-teal-300 text-[10px] font-bold tracking-wider uppercase shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>{activePillar.medisync.badge}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] font-bold text-teal-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>ABDM M3 Certified</span>
                </div>
              </div>

              <h4 className="text-base sm:text-lg font-black text-white mb-4 translate-z-20">
                {activePillar.medisync.headline}
              </h4>

              {/* Realistic Scenario Solution Preview Box */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-teal-500/40 mb-6 translate-z-30 shadow-inner relative">
                <div className="flex items-center justify-between text-teal-300 font-bold text-xs mb-1.5">
                  <div className="flex items-center space-x-2">
                    <FileCheck className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    <span className="truncate">{activePillar.medisync.scenarioTitle}</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase font-mono">
                    Live Synced
                  </span>
                </div>
                <p className="text-[11px] text-slate-200 italic mb-2">
                  &ldquo;{activePillar.medisync.scenarioSnippet}&rdquo;
                </p>
                <div className="text-[10px] px-2.5 py-1 rounded bg-teal-950/70 text-teal-200 font-medium border border-teal-800/50 flex items-center justify-between">
                  <span>{activePillar.medisync.scenarioDetail}</span>
                  <Check className="w-3.5 h-3.5 text-teal-400 flex-shrink-0 ml-2" />
                </div>
              </div>

              {/* 4 Concrete Breakdown Points */}
              <div className="space-y-3.5 translate-z-20 mb-6">
                {activePillar.medisync.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs">
                    <div className="w-5 h-5 rounded-full bg-teal-950/90 border border-teal-500/50 text-teal-300 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs shadow-xs">
                      ✓
                    </div>
                    <div>
                      <p className="font-bold text-white leading-snug">{pt.title}</p>
                      <p className="text-[11px] text-slate-300 leading-relaxed mt-0.5">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MediSync Metric Footer */}
            <div className="mt-4 pt-4 border-t border-teal-500/30 flex items-center justify-between translate-z-20">
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black text-teal-400">
                  {activePillar.medisync.metric.value}
                </span>
                <span className="text-[10px] text-slate-300 max-w-[180px] leading-tight">
                  {activePillar.medisync.metric.label}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-500/40">
                Verified Outcome
              </span>
            </div>

          </div>
        </Card3D>

      </div>

      {/* Bottom Quantitative Transformation Bar */}
      <div className="relative z-10 mt-10 pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
          <p className="text-xl sm:text-2xl font-black text-teal-400">-85%</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Reception Paperwork Overhead</p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
          <p className="text-xl sm:text-2xl font-black text-brand-400">0%</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Duplicate Diagnostic Tests</p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
          <p className="text-xl sm:text-2xl font-black text-indigo-400">3.2x</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Faster Consult Triage Time</p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
          <p className="text-xl sm:text-2xl font-black text-emerald-400">100%</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Zero-Trust PHI Quarantined</p>
        </div>
      </div>

    </div>
  );
}
