"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { 
  Stethoscope, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Activity, 
  Building,
  User,
  Calendar
} from 'lucide-react';

export default function DoctorQueuePage() {
  const { 
    currentDoctor, 
    doctors, 
    setCurrentDoctor, 
    appointments, 
    startConsultation, 
    activeTenant 
  } = useStore();

  const router = useRouter();

  // Filter appointments for the current active doctor
  const doctorAppointments = appointments.filter(a => a.doctorId === currentDoctor.id);

  const waitingQueue = doctorAppointments.filter(a => a.status === 'CHECKED_IN');
  const inSessionAppointment = doctorAppointments.find(a => a.status === 'IN_CONSULTATION');
  const completedToday = doctorAppointments.filter(a => a.status === 'COMPLETED');

  const handleStartConsultation = (aptId: string) => {
    startConsultation(aptId);
    router.push(`/doctor/consult/${aptId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Doctor Cockpit Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-600 text-white font-bold text-2xl flex items-center justify-center shadow-md shadow-blue-500/20 flex-shrink-0">
              <Stethoscope className="w-8 h-8" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {currentDoctor.name}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {currentDoctor.department} Specialist
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {currentDoctor.roomNumber}
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium mt-1">
                {currentDoctor.title} &bull; {currentDoctor.qualification} &bull; {activeTenant.name}
              </p>

              <div className="mt-2 flex items-center space-x-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-700">
                  Duty Status: <strong className="text-emerald-700 uppercase tracking-wider">{currentDoctor.dutyStatus.replace('_', ' ')}</strong>
                </span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-slate-500">Consultation Fee: {activeTenant.currency}{currentDoctor.consultationFee}</span>
              </div>
            </div>
          </div>

          {/* Doctor Switcher for Testing */}
          <div className="flex items-center space-x-3">
            <div className="text-xs">
              <label className="block text-slate-400 font-semibold mb-1 text-[10px] uppercase tracking-wider">
                Switch Consulting Doctor:
              </label>
              <select
                value={currentDoctor.id}
                onChange={(e) => {
                  const doc = doctors.find(d => d.id === e.target.value);
                  if (doc) setCurrentDoctor(doc);
                }}
                className="bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-xl font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
              >
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.department})
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Operational Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">Waiting Outside</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{waitingQueue.length}</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Checked-in by reception</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Currently in Room</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{inSessionAppointment ? 1 : 0}</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Active consultation</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Completed Today</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{completedToday.length}</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">Prescriptions issued</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Scheduled</span>
          <p className="text-3xl font-black text-slate-900 mt-1">{doctorAppointments.length}</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Day&apos;s roster total</span>
        </div>
      </div>

      {/* Active Consultation Spotlight (If patient is currently in session) */}
      {inSessionAppointment && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-blue-100 border border-white/20">
              Active Patient in Consultation Room
            </span>
            <div className="flex items-center space-x-3 mt-3">
              <span className="text-3xl font-black">{inSessionAppointment.patientName}</span>
              <span className="font-mono text-sm font-bold bg-white text-blue-900 px-2.5 py-1 rounded-lg">
                {inSessionAppointment.tokenNumber}
              </span>
            </div>
            <p className="text-xs text-blue-100 mt-1">
              Chief Reason: {inSessionAppointment.reason}
            </p>
          </div>

          <Link
            href={`/doctor/consult/${inSessionAppointment.id}`}
            className="flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl bg-white text-blue-900 text-xs font-black hover:bg-blue-50 transition-all shadow-md"
          >
            <Play className="w-4 h-4 fill-blue-900" />
            <span>Resume SOAP Notes &amp; Rx</span>
          </Link>
        </div>
      )}

      {/* Live Waiting Room Queue */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Next Patients in Queue (Checked-In)</h2>
            <p className="text-xs text-slate-500">Ordered strictly by Token number issued at front desk</p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
            {waitingQueue.length} Waiting
          </span>
        </div>

        {waitingQueue.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">Queue is Clear!</h3>
            <p className="text-xs text-slate-400 mt-1">
              No patients are currently waiting in the lobby for {currentDoctor.name}.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {waitingQueue.map((apt, index) => (
              <div
                key={apt.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-300 shadow-sm transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex items-start space-x-4">
                  {/* Token Number Card */}
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 font-mono font-black text-xs flex flex-col items-center justify-center flex-shrink-0 shadow-inner">
                    <span className="text-[9px] uppercase tracking-wider text-blue-600 font-bold">Token</span>
                    <span>{apt.tokenNumber || '---'}</span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-slate-900">{apt.patientName}</h3>
                      {index === 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Next in Line
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 mt-1">
                      Reason for visit: <strong className="text-slate-800">{apt.reason}</strong>
                    </p>

                    <div className="mt-1 flex items-center space-x-3 text-[11px] text-slate-400">
                      <span>Scheduled Slot: {apt.timeSlot}</span>
                      <span>&bull;</span>
                      <span>Arrived at: {apt.checkedInAt || '10:00 AM'}</span>
                      <span>&bull;</span>
                      <span className="text-emerald-600 font-semibold">Fee Paid</span>
                    </div>
                  </div>
                </div>

                {/* Call Patient Button */}
                <button
                  onClick={() => handleStartConsultation(apt.id)}
                  className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Call Patient &amp; Start Consult</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Completed Visits Today */}
        {completedToday.length > 0 && (
          <div className="mt-10 pt-6 border-t border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Completed Consultations Today ({completedToday.length})
            </h3>

            <div className="space-y-2">
              {completedToday.map((apt) => (
                <div 
                  key={apt.id} 
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs text-slate-600"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <strong className="text-slate-900">{apt.patientName}</strong>
                    <span className="font-mono text-slate-400 text-[11px]">({apt.tokenNumber})</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-[11px] text-slate-400">Finished at {apt.completedAt || '09:50 AM'}</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Rx Dispatched</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
