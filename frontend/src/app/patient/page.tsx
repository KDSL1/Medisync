"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { 
  Calendar, 
  Clock, 
  Stethoscope, 
  Pill, 
  FileText, 
  Plus, 
  AlertTriangle, 
  Heart, 
  Activity, 
  Droplet, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import AIReportModal from '@/components/AIReportModal';
import { MedicalReport } from '@/lib/types';

export default function PatientPortalPage() {
  const { 
    currentPatient, 
    patients, 
    setCurrentPatient, 
    visits, 
    appointments, 
    reports 
  } = useStore();

  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);

  // Filter visits and appointments for the current active patient
  const patientVisits = visits.filter(v => v.patientId === currentPatient.id);
  const patientAppointments = appointments.filter(a => a.patientId === currentPatient.id);
  const patientReports = reports.filter(r => r.patientId === currentPatient.id);

  // Check if patient has an active appointment today
  const activeAppointment = patientAppointments.find(
    a => a.status === 'CHECKED_IN' || a.status === 'IN_CONSULTATION' || a.status === 'BOOKED'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Patient Profile Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-bold text-2xl flex items-center justify-center shadow-md shadow-emerald-500/20 flex-shrink-0">
              {currentPatient.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  {currentPatient.name}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
                  <UserCheck className="w-3 h-3 mr-1" /> Verified Health ID
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center space-x-1">
                  <Droplet className="w-3.5 h-3.5 text-rose-500" />
                  <span>Blood: <strong className="text-slate-800">{currentPatient.bloodGroup}</strong></span>
                </span>
                <span>&bull;</span>
                <span>DOB: {currentPatient.dob}</span>
                <span>&bull;</span>
                <span>Gender: {currentPatient.gender}</span>
                <span>&bull;</span>
                <span>Phone: {currentPatient.phone}</span>
              </div>

              {/* Medical Badges: Allergies & Chronic Conditions */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {currentPatient.knownAllergies.map((allergy, i) => (
                  <span 
                    key={i} 
                    className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 flex items-center space-x-1"
                  >
                    <AlertTriangle className="w-3 h-3 text-rose-500" />
                    <span>Allergy: {allergy}</span>
                  </span>
                ))}
                {currentPatient.chronicConditions.map((condition, i) => (
                  <span 
                    key={i} 
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 flex items-center space-x-1"
                  >
                    <Activity className="w-3 h-3 text-amber-600" />
                    <span>{condition}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Action Buttons & Patient Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/patient/book"
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>

            <Link
              href="/patient/reports"
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Report Vault ({patientReports.length})</span>
            </Link>

            {/* Switch Demo Patient */}
            <div className="text-xs">
              <select
                value={currentPatient.id}
                onChange={(e) => {
                  const p = patients.find(pat => pat.id === e.target.value);
                  if (p) setCurrentPatient(p);
                }}
                className="w-full bg-slate-50 border border-slate-200 text-slate-600 py-2 px-3 rounded-xl font-medium focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                {patients.map(p => (
                  <option key={p.id} value={p.id}>Switch: {p.name}</option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Active OPD Appointment Status (If any scheduled or in queue today) */}
      {activeAppointment && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white border border-amber-200 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  {activeAppointment.status === 'CHECKED_IN' ? 'Checked-In & Waiting in OPD Queue' : activeAppointment.status === 'IN_CONSULTATION' ? 'Currently in Doctor Room' : 'Upcoming Appointment'}
                </span>
                {activeAppointment.tokenNumber && (
                  <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-mono font-bold text-xs">
                    Token: {activeAppointment.tokenNumber}
                  </span>
                )}
              </div>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                {activeAppointment.doctorName} &bull; {activeAppointment.department}
              </p>
              <p className="text-xs text-slate-500">
                Scheduled for {activeAppointment.date} at {activeAppointment.timeSlot} &bull; Reason: {activeAppointment.reason}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-amber-200 text-amber-900 shadow-sm">
              Status: <strong className="capitalize">{activeAppointment.status.replace('_', ' ').toLowerCase()}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Main Grid: Health Timeline + AI Assistant Side Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Chronological Health Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Lifelong Health Timeline</h2>
              <p className="text-xs text-slate-500">Complete, chronological log of clinical encounters &amp; digital prescriptions</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {patientVisits.length} Recorded Visits
            </span>
          </div>

          {patientVisits.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-300">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No previous clinic visits recorded</p>
              <p className="text-xs text-slate-400 mt-1">Book an appointment or have the clinic record your first consultation.</p>
              <Link
                href="/patient/book"
                className="mt-4 inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                <span>Book your first visit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200">
              {patientVisits.map((visit) => (
                <div key={visit.id} className="relative pl-10">
                  {/* Timeline bullet dot */}
                  <div className="absolute left-2.5 top-5 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm" />

                  {/* Visit Card */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-sm transition-all">
                    
                    {/* Date and Doctor Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-md border border-brand-100">
                            {visit.department}
                          </span>
                          <span className="text-xs font-semibold text-slate-400">&bull;</span>
                          <span className="text-xs font-medium text-slate-500">{visit.hospitalName}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mt-1">
                          {visit.doctorName}
                        </h3>
                      </div>
                      <div className="text-xs font-semibold text-slate-500 flex items-center space-x-1.5 bg-slate-50 px-2.5 py-1 rounded-lg">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{visit.visitDate}</span>
                      </div>
                    </div>

                    {/* Chief Complaint */}
                    <div className="mb-3 text-xs">
                      <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Chief Complaint:</span>
                      <p className="text-slate-800 font-medium mt-0.5">{visit.chiefComplaint}</p>
                    </div>

                    {/* Vitals Strip */}
                    {visit.vitals && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl text-xs mb-4">
                        {visit.vitals.bloodPressure && (
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-semibold">Blood Pressure</span>
                            <p className="font-bold text-slate-800">{visit.vitals.bloodPressure}</p>
                          </div>
                        )}
                        {visit.vitals.pulseRate && (
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-semibold">Pulse Rate</span>
                            <p className="font-bold text-slate-800">{visit.vitals.pulseRate}</p>
                          </div>
                        )}
                        {visit.vitals.spo2 && (
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-semibold">Oxygen (SpO2)</span>
                            <p className="font-bold text-slate-800">{visit.vitals.spo2}</p>
                          </div>
                        )}
                        {visit.vitals.weightKg && (
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-semibold">Weight</span>
                            <p className="font-bold text-slate-800">{visit.vitals.weightKg}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Clinical Assessment / Diagnosis */}
                    <div className="mb-4 text-xs bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl">
                      <span className="font-bold text-emerald-800 uppercase tracking-wider text-[10px] flex items-center space-x-1 mb-1">
                        <Activity className="w-3 h-3 text-emerald-600" />
                        <span>Diagnosis &amp; Assessment</span>
                      </span>
                      <p className="text-slate-800 font-semibold leading-relaxed">
                        {visit.clinicalAssessment}
                      </p>
                      {visit.doctorNotes && (
                        <p className="text-slate-600 text-[11px] mt-1 italic">
                          Advice: {visit.doctorNotes}
                        </p>
                      )}
                    </div>

                    {/* Prescriptions Section */}
                    {visit.prescriptions && visit.prescriptions.length > 0 && (
                      <div>
                        <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] flex items-center space-x-1 mb-2">
                          <Pill className="w-3.5 h-3.5 text-brand-600" />
                          <span>Prescribed Medications ({visit.prescriptions.length})</span>
                        </span>

                        <div className="space-y-1.5">
                          {visit.prescriptions.map((rx) => (
                            <div 
                              key={rx.id} 
                              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                            >
                              <div>
                                <span className="font-bold text-slate-900">{rx.medication}</span>
                                <span className="text-slate-400 mx-1.5">&bull;</span>
                                <span className="text-slate-600 font-medium">{rx.dosage}</span>
                                <p className="text-[11px] text-slate-500 mt-0.5">{rx.instructions}</p>
                              </div>
                              <div className="text-right flex flex-col items-end">
                                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                                  {rx.frequency}
                                </span>
                                <span className="text-[10px] text-slate-400 mt-0.5">{rx.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Column: Document Vault & AI Explainer Preview */}
        <div className="space-y-6">
          
          {/* AI Medical Report Explainer Spotlight Card */}
          <div className="bg-gradient-to-br from-brand-900 via-slate-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center space-x-2 text-brand-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>AI Feature Spotlight</span>
            </div>

            <h3 className="text-lg font-bold text-white tracking-tight">
              Instant Plain-English Medical Report Translation
            </h3>

            <p className="mt-2 text-xs text-slate-300 leading-relaxed">
              Don&apos;t panic over complex lab jargon. MediSync converts your blood tests and radiology scans into 6th-grade explanations with questions for your doctor.
            </p>

            <div className="mt-4 pt-4 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Sample Reports Ready to Explain:
              </span>

              <div className="space-y-2">
                {patientReports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className="w-full text-left p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-bold text-white group-hover:text-brand-300 transition-colors">
                        {report.title}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {report.category.replace('_', ' ')} &bull; {report.uploadDate}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-brand-500/20 text-brand-300 border border-brand-400/30 flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Explain</span>
                    </span>
                  </button>
                ))}
              </div>

              <Link
                href="/patient/reports"
                className="mt-4 w-full flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors"
              >
                <span>Upload New Medical Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick FAQ / Guide Info */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 text-xs">
            <h4 className="font-bold text-slate-900 mb-2">Why Patient-Owned Records?</h4>
            <p className="text-slate-600 leading-relaxed">
              Unlike traditional hospital silos, your MediSync records remain with you permanently. You can share your timeline with any consulting doctor via our instant QR view.
            </p>
          </div>

        </div>

      </div>

      {/* AI Report Modal Popup */}
      <AIReportModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />

    </div>
  );
}
