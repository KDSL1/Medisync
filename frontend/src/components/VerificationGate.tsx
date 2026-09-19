"use client";

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Building2, 
  Stethoscope, 
  User, 
  ClipboardList,
  Sparkles,
  KeyRound
} from 'lucide-react';

interface VerificationGateProps {
  requiredRole?: UserRole;
  children: React.ReactNode;
}

export default function VerificationGate({ requiredRole, children }: VerificationGateProps) {
  const { currentUser, verifyCurrentUser, activeTenant, login } = useStore();

  // If user is verified, render the protected workspace directly
  if (currentUser && currentUser.isVerified) {
    return <>{children}</>;
  }

  // Role details mapping
  const roleLabels: Record<UserRole, { label: string; authority: string; desc: string }> = {
    DOCTOR: {
      label: 'Physician / Doctor',
      authority: 'Hospital Administration (Level 2)',
      desc: 'Your clinical privileges must be validated by the Hospital Admin before accessing Patient Health Information (PHI), diagnostic lab records, and digital prescription issuance.',
    },
    RECEPTIONIST: {
      label: 'Front-Desk Receptionist',
      authority: 'Hospital Administration (Level 2)',
      desc: 'Front-desk credentials must be verified by the Hospital Admin to issue OPD queue tokens and collect patient registration fees.',
    },
    PATIENT: {
      label: 'Patient Health Locker',
      authority: 'Hospital Clinic / ABHA Registry (Level 2 & 4)',
      desc: 'Under ABDM M3 and HIPAA privacy standards, patient digital health lockers require sovereign verification via ABHA ID or clinic reception check-in before historical medical records are unlocked.',
    },
    MANAGEMENT: {
      label: 'Hospital Administrator',
      authority: 'Platform Super Admin (Level 1)',
      desc: 'This hospital enterprise node is pending platform activation and ABDM facility registry verification by the MediSync 360 Super Admin.',
    },
    SUPER_ADMIN: {
      label: 'Super Admin',
      authority: 'Root Authority',
      desc: 'Platform Owner root verification.',
    }
  };

  const activeRoleInfo = currentUser ? roleLabels[currentUser.role] : roleLabels.DOCTOR;

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-2xl w-full">
        
        {/* Security Alert Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-amber-200 dark:border-amber-900/60 p-6 sm:p-10 shadow-xl relative overflow-hidden">
          
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

          {/* Top Status Badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse" />
              <span>Zero-Trust Access Control &bull; Verification Pending</span>
            </div>

            <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase">
              Hierarchy Tier: {currentUser?.role || 'USER'}
            </span>
          </div>

          {/* Alert Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Account Pending Verification
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {activeRoleInfo.desc}
          </p>

          {/* Account Details Capsule */}
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Logged in User:</span>
              <strong className="text-slate-900 dark:text-white">{currentUser?.name || 'Unknown User'}</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Assigned Role:</span>
              <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-semibold text-slate-800 dark:text-slate-200">
                {activeRoleInfo.label}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Hospital Tenant:</span>
              <strong className="text-slate-800 dark:text-slate-200">{activeTenant.name}</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Verifying Authority:</span>
              <span className="text-amber-700 dark:text-amber-400 font-bold">{activeRoleInfo.authority}</span>
            </div>
          </div>

          {/* Visual 4-Level Delegation Flow */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
              MediSync 360 Chain of Trust:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 block">Level 1</span>
                <strong className="text-slate-800 dark:text-slate-200 text-[11px] block mt-0.5">Super Admin</strong>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">&check; Platform Root</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 block">Level 2</span>
                <strong className="text-slate-800 dark:text-slate-200 text-[11px] block mt-0.5">Hospital Admin</strong>
                <span className="text-[9px] text-purple-600 dark:text-purple-400 font-semibold">Clinic Director</span>
              </div>

              <div className={`p-2.5 rounded-xl border ${
                currentUser?.role === 'DOCTOR' || currentUser?.role === 'RECEPTIONIST'
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}>
                <span className="text-[10px] font-bold text-slate-400 block">Level 3</span>
                <strong className="text-slate-800 dark:text-slate-200 text-[11px] block mt-0.5">Doctor &amp; Staff</strong>
                <span className="text-[9px] text-amber-600 dark:text-amber-400 font-semibold">
                  {currentUser?.role === 'DOCTOR' || currentUser?.role === 'RECEPTIONIST' ? 'Pending Approval' : 'Clinical Ops'}
                </span>
              </div>

              <div className={`p-2.5 rounded-xl border ${
                currentUser?.role === 'PATIENT'
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}>
                <span className="text-[10px] font-bold text-slate-400 block">Level 4</span>
                <strong className="text-slate-800 dark:text-slate-200 text-[11px] block mt-0.5">Patient Locker</strong>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {currentUser?.role === 'PATIENT' ? 'Pending ABHA' : 'ABHA Verified'}
                </span>
              </div>

            </div>
          </div>

          {/* Action CTAs: 1-Click Simulator Override + Switch Roles */}
          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={verifyCurrentUser}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Simulate Administrative Approval (Unlock Workspace)</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <Link
                href="/management"
                onClick={() => login('MANAGEMENT')}
                className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 text-center font-bold flex items-center justify-center space-x-1"
              >
                <Building2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Open Hospital Admin Desk</span>
              </Link>

              <Link
                href="/super-admin"
                onClick={() => login('SUPER_ADMIN')}
                className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 text-center font-bold flex items-center justify-center space-x-1"
              >
                <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                <span>Open Super Admin Portal</span>
              </Link>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium"
              >
                &larr; Return to Sign In Portal
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
