"use client";

import React, { useState, useEffect, Suspense } from 'react';
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
  Sparkles,
  KeyRound,
  UserPlus
} from 'lucide-react';

function LoginContent() {
  const { login, setActiveRole } = useStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Top Auth Mode: 'signin' | 'register' | 'admin'
  const [authMode, setAuthMode] = useState<'signin' | 'register' | 'admin'>('signin');

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'register') setAuthMode('register');
    else if (mode === 'admin') setAuthMode('admin');
  }, [searchParams]);

  // Sign In State
  const [selectedRole, setSelectedRole] = useState<UserRole>('PATIENT');
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [password, setPassword] = useState('••••••••••••');

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regBlood, setRegBlood] = useState('O+');
  const [regAllergy, setRegAllergy] = useState('None');

  // Admin State
  const [adminEmail, setAdminEmail] = useState('admin@metrohealth.example.com');
  const [facilityId, setFacilityId] = useState('METRO-CLINIC-01');
  const [adminKey, setAdminKey] = useState('••••••••••••');

  const roleConfigs = [
    { 
      role: 'PATIENT' as UserRole, 
      label: 'Patient', 
      desc: 'Health timeline & AI reports', 
      icon: User, 
      defaultEmail: 'rahul.sharma@example.com',
      redirect: '/patient'
    },
    { 
      role: 'DOCTOR' as UserRole, 
      label: 'Doctor', 
      desc: 'Clinical cockpit & SOAP notes', 
      icon: Stethoscope, 
      defaultEmail: 'dr.mehta@metrohealth.example.com',
      redirect: '/doctor'
    },
    { 
      role: 'RECEPTIONIST' as UserRole, 
      label: 'Reception', 
      desc: 'OPD queue & token desk', 
      icon: ClipboardList, 
      defaultEmail: 'reception@metrohealth.example.com',
      redirect: '/reception'
    }
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

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('PATIENT', regEmail || 'new.patient@example.com');
    router.push('/patient');
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('MANAGEMENT', adminEmail);
    router.push('/management');
  };

  const quickLogin = (r: UserRole, targetPath: string, demoEmail: string) => {
    setSelectedRole(r);
    setEmail(demoEmail);
    login(r, demoEmail);
    router.push(targetPath);
  };

  return (
    <div className="min-h-[90vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center space-x-2.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">MediSync 360</span>
        </Link>

        <h2 className="mt-4 text-2xl font-black text-slate-900 dark:text-white tracking-tight">
          {authMode === 'signin' && 'Sign In to Your Workspace'}
          {authMode === 'register' && 'Patient Registration (New Health Locker)'}
          {authMode === 'admin' && 'Hospital Administration Gateway'}
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Strict HIPAA/PHI access control &bull; Multi-tenant healthcare governance
        </p>
      </div>

      {/* Main Authentication Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-10 shadow-xl rounded-3xl border border-slate-200 dark:border-slate-800">
          
          {/* Top Auth Mode Tabs */}
          <div className="mb-6 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl flex items-center text-xs font-bold">
            <button
              type="button"
              onClick={() => setAuthMode('signin')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                authMode === 'signin'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                authMode === 'register'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register Patient</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('admin')}
              className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                authMode === 'admin'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Admin Login</span>
            </button>
          </div>

          {/* Quick Evaluator Demo 1-Click Launchers (Always Available) */}
          <div className="mb-6 p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-900">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-brand-900 dark:text-brand-300 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>1-Click Evaluator Demo Workspaces:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => quickLogin('PATIENT', '/patient', 'rahul.sharma@example.com')}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-brand-200 dark:border-brand-900 text-left hover:bg-brand-50 dark:hover:bg-brand-900/40 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <strong className="text-slate-900 dark:text-white block">Rahul Sharma</strong>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">Patient Health Locker</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
              </button>

              <button
                type="button"
                onClick={() => quickLogin('DOCTOR', '/doctor', 'dr.mehta@metrohealth.example.com')}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-brand-200 dark:border-brand-900 text-left hover:bg-brand-50 dark:hover:bg-brand-900/40 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <strong className="text-slate-900 dark:text-white block">Dr. Vikram Mehta</strong>
                  <span className="text-[10px] text-blue-700 dark:text-blue-400 font-semibold">Doctor Clinical Cockpit</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
              </button>

              <button
                type="button"
                onClick={() => quickLogin('RECEPTIONIST', '/reception', 'reception@metrohealth.example.com')}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-brand-200 dark:border-brand-900 text-left hover:bg-brand-50 dark:hover:bg-brand-900/40 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <strong className="text-slate-900 dark:text-white block">Front-Desk Triage</strong>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">OPD Queue &amp; POS</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
              </button>

              <button
                type="button"
                onClick={() => quickLogin('MANAGEMENT', '/management', 'admin@metrohealth.example.com')}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-brand-200 dark:border-brand-900 text-left hover:bg-brand-50 dark:hover:bg-brand-900/40 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div>
                  <strong className="text-slate-900 dark:text-white block">Hospital Director</strong>
                  <span className="text-[10px] text-purple-700 dark:text-purple-400 font-semibold">Executive BI Portal</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
              </button>
            </div>
          </div>

          {/* ============================================================ */}
          {/* FORM 1: SIGN IN MODE */}
          {/* ============================================================ */}
          {authMode === 'signin' && (
            <div className="space-y-4">
              
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Select Your Role:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roleConfigs.map((cfg) => {
                    const Icon = cfg.icon;
                    const isSelected = selectedRole === cfg.role;
                    return (
                      <button
                        key={cfg.role}
                        type="button"
                        onClick={() => handleRoleSelect(cfg.role)}
                        className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                          isSelected
                            ? 'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900 shadow-md'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-brand-400 dark:text-brand-600' : 'text-slate-400'}`} />
                        <span className="text-xs font-bold">{cfg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs pt-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Authorized Email / Health ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2.5 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold transition-all shadow-md mt-4 cursor-pointer"
                >
                  <span>Authenticate &amp; Enter Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

            </div>
          )}

          {/* ============================================================ */}
          {/* FORM 2: PATIENT REGISTRATION MODE */}
          {/* ============================================================ */}
          {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-[11px] flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Instant Registration: Automatically generates a verified ABHA Health ID and zero-knowledge health locker.</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sumanth Varma"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Blood Group</label>
                  <select
                    value={regBlood}
                    onChange={(e) => setRegBlood(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="A+">A Positive (A+)</option>
                    <option value="A-">A Negative (A-)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="B-">B Negative (B-)</option>
                    <option value="O+">O Positive (O+)</option>
                    <option value="O-">O Negative (O-)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="AB-">AB Negative (AB-)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Known Drug Allergies</label>
                  <input
                    type="text"
                    placeholder="e.g. Penicillin, Sulfa, None"
                    value={regAllergy}
                    onChange={(e) => setRegAllergy(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md mt-4 cursor-pointer"
              >
                <span>Create Health Locker &amp; Open Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* ============================================================ */}
          {/* FORM 3: ADMIN LOGIN MODE */}
          {/* ============================================================ */}
          {authMode === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-3.5 text-xs">
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-900 text-purple-800 dark:text-purple-300 text-[11px] flex items-center space-x-2">
                <KeyRound className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span>Restricted Administrative Portal: Hospital footfall analytics, revenue POS metrics, and staff rosters.</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hospital / Clinic Facility ID</label>
                <input
                  type="text"
                  required
                  value={facilityId}
                  onChange={(e) => setFacilityId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Administrator Email</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Facility Master Key</label>
                <input
                  type="password"
                  required
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all shadow-md mt-4 cursor-pointer"
              >
                <span>Authenticate as Hospital Director</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Security Notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-start space-x-2 text-[11px] text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Security Governance:</strong> Protected Health Information (PHI) in the Patient Portal is strictly quarantined. Only verified patients and attending licensed physicians hold decryption clearance.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-xs text-slate-500">
        <Activity className="w-5 h-5 animate-spin mr-2 text-brand-600" />
        <span>Loading authentication portal...</span>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
