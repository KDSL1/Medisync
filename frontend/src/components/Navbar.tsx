"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { 
  Activity, 
  User, 
  Stethoscope, 
  Building2, 
  ClipboardList, 
  RotateCcw, 
  Sparkles,
  ChevronDown,
  Calendar,
  Building
} from 'lucide-react';

export default function Navbar() {
  const { 
    activeRole, 
    setActiveRole, 
    activeTenant, 
    tenants, 
    setActiveTenant,
    currentPatient, 
    currentDoctor,
    resetDemoData,
    appointments 
  } = useStore();

  const pathname = usePathname();
  const router = useRouter();

  // Roles configuration for rapid switching during presentations
  const roles: { role: UserRole; label: string; icon: React.ElementType; path: string; color: string }[] = [
    { role: 'PATIENT', label: 'Patient Portal', icon: User, path: '/patient', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { role: 'RECEPTIONIST', label: 'Reception Desk', icon: ClipboardList, path: '/reception', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { role: 'DOCTOR', label: 'Doctor Cockpit', icon: Stethoscope, path: '/doctor', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { role: 'MANAGEMENT', label: 'Management', icon: Building2, path: '/management', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  ];

  const handleRoleChange = (newRole: UserRole, targetPath: string) => {
    setActiveRole(newRole);
    router.push(targetPath);
  };

  const todayStr = new Date().toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });

  const waitingCount = appointments.filter(a => a.status === 'CHECKED_IN').length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Clinic Info */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-lg text-slate-900 tracking-tight">MediSync</span>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-brand-100 text-brand-700 border border-brand-200">360</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium truncate max-w-[170px] sm:max-w-xs">
                  {activeTenant.name}
                </p>
              </div>
            </Link>

            {/* Tenant switcher dropdown (Multi-tenancy demo) */}
            <div className="hidden lg:flex items-center pl-3 border-l border-slate-200 text-xs">
              <Building className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
              <select
                value={activeTenant.id}
                onChange={(e) => {
                  const selected = tenants.find(t => t.id === e.target.value);
                  if (selected) setActiveTenant(selected);
                }}
                className="bg-slate-50 border border-slate-200 text-slate-700 py-1 px-2 rounded-md font-medium hover:bg-slate-100 transition-colors focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {tenants.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Center: Presentation Persona Switcher */}
          <div className="hidden md:flex items-center p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 shadow-inner">
            {roles.map(({ role, label, icon: Icon, path }) => {
              const isActive = activeRole === role || pathname.startsWith(path);
              return (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role, path)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                  <span>{label}</span>
                  {role === 'DOCTOR' && waitingCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white animate-pulse">
                      {waitingCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action: Active User Persona & Reset Demo */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{todayStr}</span>
            </div>

            {/* Active User Card based on role */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-700 border border-brand-200 flex items-center justify-center font-bold text-xs">
                {activeRole === 'PATIENT' ? 'RS' : activeRole === 'DOCTOR' ? 'VM' : activeRole === 'RECEPTIONIST' ? 'FD' : 'AD'}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-semibold text-slate-800 leading-tight">
                  {activeRole === 'PATIENT' && currentPatient.name}
                  {activeRole === 'DOCTOR' && currentDoctor.name}
                  {activeRole === 'RECEPTIONIST' && 'Front Desk (Desk 1)'}
                  {activeRole === 'MANAGEMENT' && 'Hospital Administrator'}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">
                  {activeRole === 'PATIENT' && `${currentPatient.bloodGroup}`}
                  {activeRole === 'DOCTOR' && `${currentDoctor.department}`}
                  {activeRole === 'RECEPTIONIST' && 'OPD Triage'}
                  {activeRole === 'MANAGEMENT' && 'Super Admin'}
                </p>
              </div>
            </div>

            {/* Reset Demo Button */}
            <button
              onClick={() => {
                if (confirm('Reset demo data to initial state?')) {
                  resetDemoData();
                  router.push('/');
                }
              }}
              title="Reset sample data"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Role Switcher Bar */}
      <div className="md:hidden flex items-center justify-around py-1.5 bg-slate-50 border-t border-slate-200 px-2 text-xs">
        {roles.map(({ role, label, icon: Icon, path }) => {
          const isActive = activeRole === role || pathname.startsWith(path);
          return (
            <button
              key={role}
              onClick={() => handleRoleChange(role, path)}
              className={`flex flex-col items-center py-1 px-2 rounded font-medium ${
                isActive ? 'text-brand-600 font-bold' : 'text-slate-500'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="text-[10px]">{label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
