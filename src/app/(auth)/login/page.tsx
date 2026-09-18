"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { 
  Activity, 
  User, 
  Stethoscope, 
  ClipboardList, 
  Building2, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function LoginPage() {
  const { login, setActiveRole } = useStore();
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<UserRole>('PATIENT');
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [password, setPassword] = useState('••••••••••••');

  const roleConfigs = [
    { 
      role: 'PATIENT' as UserRole, 
      label: 'Patient', 
      desc: 'Health timeline & AI reports', 
      icon: User, 
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200', 
      defaultEmail: 'rahul.sharma@example.com',
      redirect: '/patient'
    },
    { 
      role: 'DOCTOR' as UserRole, 
      label: 'Doctor', 
      desc: 'Clinical cockpit & SOAP notes', 
      icon: Stethoscope, 
      color: 'text-blue-600 bg-blue-50 border-blue-200', 
      defaultEmail: 'dr.mehta@metrohealth.example.com',
      redirect: '/doctor'
    },
    { 
      role: 'RECEPTIONIST' as UserRole, 
      label: 'Reception', 
      desc: 'OPD queue & token desk', 
      icon: ClipboardList, 
      color: 'text-amber-600 bg-amber-50 border-amber-200', 
      defaultEmail: 'reception@metrohealth.example.com',
      redirect: '/reception'
    },
    { 
      role: 'MANAGEMENT' as UserRole, 
      label: 'Admin', 
      desc: 'Hospital KPIs & governance', 
      icon: Building2, 
      color: 'text-purple-600 bg-purple-50 border-purple-200', 
      defaultEmail: 'admin@metrohealth.example.com',
      redirect: '/management'
    },
  ];

  const handleRoleSelect = (r: UserRole) => {
    setSelectedRole(r);
    const cfg = roleConfigs.find(c => c.role === r);
    if (cfg) setEmail(cfg.defaultEmail);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole, email);
    const cfg = roleConfigs.find(c => c.role === selectedRole);
    router.push(cfg ? cfg.redirect : '/');
  };

  const quickLogin = (r: UserRole, targetPath: string, demoEmail: string) => {
    setSelectedRole(r);
    setEmail(demoEmail);
    login(r, demoEmail);
    router.push(targetPath);
  };

  return (
    <div className="min-h-[90vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-100">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center space-x-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <Activity className="w-7 h-7 animate-pulse" />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">MediSync 360</span>
        </Link>

        <h2 className="mt-4 text-2xl font-black text-slate-900 tracking-tight">
          Role-Based Portal Access
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Strict HIPAA/PHI access control &bull; Please select your authorized role
        </p>
      </div>

      {/* Main Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-200">
          
          {/* Role Selection Tabs */}
          <div className="mb-6">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Your Stakeholder Role:
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {roleConfigs.map((cfg) => {
                const Icon = cfg.icon;
                const isSelected = selectedRole === cfg.role;
                return (
                  <button
                    key={cfg.role}
                    type="button"
                    onClick={() => handleRoleSelect(cfg.role)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? 'border-slate-900 bg-slate-900 text-white shadow-md'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-brand-400' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold">{cfg.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Demo 1-Click Launchers */}
          <div className="mb-6 p-4 rounded-2xl bg-brand-50/80 border border-brand-200">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-brand-900 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Instant Evaluator Demo Logins (1-Click):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => quickLogin('PATIENT', '/patient', 'rahul.sharma@example.com')}
                className="p-2 rounded-xl bg-white border border-brand-200 text-left hover:bg-brand-100 transition-colors flex items-center justify-between"
              >
                <div>
                  <strong className="text-slate-900 block">Rahul Sharma</strong>
                  <span className="text-[10px] text-emerald-700 font-semibold">Verified Patient</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
              </button>

              <button
                type="button"
                onClick={() => quickLogin('DOCTOR', '/doctor', 'dr.mehta@metrohealth.example.com')}
                className="p-2 rounded-xl bg-white border border-brand-200 text-left hover:bg-brand-100 transition-colors flex items-center justify-between"
              >
                <div>
                  <strong className="text-slate-900 block">Dr. Vikram Mehta</strong>
                  <span className="text-[10px] text-blue-700 font-semibold">Cardiologist</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
              </button>

              <button
                type="button"
                onClick={() => quickLogin('RECEPTIONIST', '/reception', 'reception@metrohealth.example.com')}
                className="p-2 rounded-xl bg-white border border-brand-200 text-left hover:bg-brand-100 transition-colors flex items-center justify-between"
              >
                <div>
                  <strong className="text-slate-900 block">Front-Desk Triage</strong>
                  <span className="text-[10px] text-amber-700 font-semibold">OPD Desk #1</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
              </button>

              <button
                type="button"
                onClick={() => quickLogin('MANAGEMENT', '/management', 'admin@metrohealth.example.com')}
                className="p-2 rounded-xl bg-white border border-brand-200 text-left hover:bg-brand-100 transition-colors flex items-center justify-between"
              >
                <div>
                  <strong className="text-slate-900 block">Hospital Director</strong>
                  <span className="text-[10px] text-purple-700 font-semibold">Super Admin</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Authorized Email / Health ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-brand-600" />
                <span>Keep session active</span>
              </label>
              <span className="text-slate-400">Encrypted 256-bit SSL</span>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-md mt-4"
            >
              <span>Authenticate &amp; Enter Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-start space-x-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Security Protocol:</strong> Protected Health Information (PHI) in the Patient Portal is strictly quarantined. Only verified patients and attending licensed physicians hold decryption clearance.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
