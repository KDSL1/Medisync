"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import VerificationGate from '@/components/VerificationGate';
import { 
  ClipboardList, 
  UserPlus, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  Stethoscope, 
  AlertCircle, 
  Search, 
  UserCheck,
  ChevronRight,
  Printer
} from 'lucide-react';

export default function ReceptionQueuePage() {
  const { 
    appointments, 
    doctors, 
    checkInAppointment, 
    activeTenant 
  } = useStore();

  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [justCheckedInToken, setJustCheckedInToken] = useState<string | null>(null);

  // Filter today's appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesFilter = activeFilter === 'ALL' || apt.status === activeFilter;
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (apt.tokenNumber && apt.tokenNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Calculate quick metrics
  const waitingCount = appointments.filter(a => a.status === 'CHECKED_IN').length;
  const inSessionCount = appointments.filter(a => a.status === 'IN_CONSULTATION').length;
  const bookedCount = appointments.filter(a => a.status === 'BOOKED').length;
  const completedCount = appointments.filter(a => a.status === 'COMPLETED').length;
  const totalRevenue = appointments
    .filter(a => a.feePaid)
    .reduce((sum, a) => sum + (a.amount || 0), 0);

  const handleCheckIn = (aptId: string) => {
    const updated = checkInAppointment(aptId);
    if (updated && updated.tokenNumber) {
      setJustCheckedInToken(updated.tokenNumber);
      setTimeout(() => setJustCheckedInToken(null), 5000);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CHECKED_IN':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">Waiting Outside</span>;
      case 'IN_CONSULTATION':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200 animate-pulse">In Doctor Room</span>;
      case 'COMPLETED':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Consultation Finished</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">Needs Check-In</span>;
    }
  };

  return (
    <VerificationGate requiredRole="RECEPTIONIST">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Front-Desk Operations
            </span>
            <span className="text-xs text-slate-400">&bull; Desk #1</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            OPD Triage &amp; Live Queue Manager
          </h1>
          <p className="text-xs text-slate-500">
            {activeTenant.name} &bull; Check in arriving patients, issue tokens, and monitor waiting times
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/reception/register"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Walk-in Registration (60s)</span>
          </Link>

          <Link
            href="/reception/billing"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-all"
          >
            <Receipt className="w-4 h-4 text-slate-500" />
            <span>Billing POS</span>
          </Link>
        </div>
      </div>

      {/* Just Checked In Success Toast */}
      {justCheckedInToken && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500 text-white shadow-lg flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold">Patient Checked In Successfully!</p>
              <p className="text-[11px] text-emerald-100">
                Issued Token: <strong>{justCheckedInToken}</strong>. The patient has been added to the doctor&apos;s queue.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold bg-white/20 px-2.5 py-1 rounded-lg">
            {justCheckedInToken}
          </span>
        </div>
      )}

      {/* Real-time KPI Stats Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">Waiting in Lobby</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{waitingCount}</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Estimated wait: ~{waitingCount * 12} mins</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">With Doctor</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{inSessionCount}</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Consultations in progress</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Awaiting Arrival</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{bookedCount}</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Pre-booked online slots</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Collected Fees</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{activeTenant.currency}{totalRevenue}</p>
          <span className="text-[11px] text-emerald-600 mt-0.5 block font-semibold">{completedCount} visits finalized</span>
        </div>
      </div>

      {/* Main Grid: Doctor Availability Board (Left) + OPD Queue Table (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Doctor Duty Board */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center space-x-1.5">
              <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
              <span>Doctor Duty Status Board</span>
            </h3>

            <div className="space-y-3">
              {doctors.map((doc) => {
                const isBusy = doc.dutyStatus === 'IN_SESSION';
                const isBreak = doc.dutyStatus === 'ON_BREAK';
                return (
                  <div key={doc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-slate-900 font-bold">{doc.name}</strong>
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        isBusy ? 'bg-amber-500 animate-pulse' : isBreak ? 'bg-slate-300' : 'bg-emerald-500'
                      }`} />
                    </div>
                    <p className="text-[11px] text-slate-500">{doc.department} &bull; {doc.roomNumber}</p>
                    <span className={`mt-2 inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                      isBusy ? 'bg-amber-100 text-amber-800' : isBreak ? 'bg-slate-200 text-slate-600' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {doc.dutyStatus.replace('_', ' ')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 3 Columns: Live OPD Queue Table */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Filter Bar & Search */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-1 overflow-x-auto text-xs font-semibold">
              {[
                { id: 'ALL', label: 'All Patients' },
                { id: 'CHECKED_IN', label: `In Waiting Room (${waitingCount})` },
                { id: 'BOOKED', label: `Pending Arrival (${bookedCount})` },
                { id: 'IN_CONSULTATION', label: 'In Session' },
                { id: 'COMPLETED', label: 'Done' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    activeFilter === tab.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient, doctor, token..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Patient Queue Cards */}
          <div className="space-y-3">
            {filteredAppointments.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No appointments found in this queue</p>
                <p className="text-xs text-slate-400 mt-1">Register a walk-in patient or select another filter tab.</p>
              </div>
            ) : (
              filteredAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-slate-300 shadow-sm transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex items-start space-x-4">
                    {/* Token Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-mono font-black text-xs flex flex-col items-center justify-center flex-shrink-0 shadow-inner">
                      <span className="text-[9px] uppercase tracking-wider text-amber-600 font-bold">Token</span>
                      <span>{apt.tokenNumber || '---'}</span>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-slate-900">{apt.patientName}</h4>
                        {getStatusBadge(apt.status)}
                      </div>

                      <p className="text-xs text-slate-500 mt-0.5">
                        Consulting: <strong className="text-slate-700">{apt.doctorName}</strong> &bull; {apt.department}
                      </p>

                      <p className="text-[11px] text-slate-400 mt-1 flex items-center space-x-2">
                        <span>Slot: {apt.timeSlot}</span>
                        <span>&bull;</span>
                        <span className="truncate max-w-xs">Reason: {apt.reason}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right Actions: Check-in / Fee Status */}
                  <div className="flex items-center space-x-3 sm:border-l sm:border-slate-100 sm:pl-4">
                    <div className="text-right text-xs">
                      <span className="font-bold text-slate-900 block">{activeTenant.currency}{apt.amount}</span>
                      <span className={`text-[10px] font-semibold ${apt.feePaid ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {apt.feePaid ? 'Paid' : 'Payment Pending'}
                      </span>
                    </div>

                    {apt.status === 'BOOKED' && (
                      <button
                        onClick={() => handleCheckIn(apt.id)}
                        className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Check In &amp; Issue Token</span>
                      </button>
                    )}

                    {apt.status === 'CHECKED_IN' && (
                      <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                        In Waiting Room
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
    </VerificationGate>
  );
}
