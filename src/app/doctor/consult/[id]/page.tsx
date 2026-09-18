"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { 
  ArrowLeft, 
  Stethoscope, 
  User, 
  AlertTriangle, 
  Activity, 
  Droplet, 
  Pill, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Calendar,
  Heart,
  HelpCircle,
  Save
} from 'lucide-react';
import AIReportModal from '@/components/AIReportModal';
import { MedicalReport, PrescriptionItem } from '@/lib/types';

export default function DoctorConsultationPage({ params }: { params: { id: string } }) {
  const { 
    appointments, 
    patients, 
    visits, 
    reports, 
    currentDoctor, 
    completeConsultation, 
    activeTenant 
  } = useStore();

  const router = useRouter();
  const appointmentId = params.id;

  // Find appointment & patient
  const appointment = appointments.find(a => a.id === appointmentId);
  const patient = patients.find(p => p.id === appointment?.patientId) || patients[0];
  
  // Patient historical data
  const patientPastVisits = visits.filter(v => v.patientId === patient.id);
  const patientReports = reports.filter(r => r.patientId === patient.id);

  // Selected report for AI preview
  const [previewReport, setPreviewReport] = useState<MedicalReport | null>(null);

  // SOAP State Form
  const [chiefComplaint, setChiefComplaint] = useState(appointment?.reason || '');
  const [bp, setBp] = useState('130/84 mmHg');
  const [pulse, setPulse] = useState('78 bpm');
  const [temp, setTemp] = useState('98.6 °F');
  const [spo2, setSpo2] = useState('99%');
  const [weight, setWeight] = useState('78 kg');
  const [assessment, setAssessment] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');

  // Prescription List
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>([
    {
      id: 'rx-new-1',
      medication: 'Atorvastatin 10mg',
      dosage: '1 tablet',
      frequency: 'Once daily at night (0-0-1)',
      duration: '30 days',
      instructions: 'Take after dinner',
    }
  ]);

  const [isCompleted, setIsCompleted] = useState(false);

  // Helper to add medication row
  const addPrescriptionRow = () => {
    setPrescriptions([
      ...prescriptions,
      {
        id: `rx-${Date.now()}`,
        medication: '',
        dosage: '1 tablet',
        frequency: 'Twice daily (1-0-1)',
        duration: '7 days',
        instructions: 'Take after major meals',
      }
    ]);
  };

  const removePrescriptionRow = (id: string) => {
    setPrescriptions(prescriptions.filter(rx => rx.id !== id));
  };

  const handlePrescriptionChange = (id: string, field: keyof PrescriptionItem, val: string) => {
    setPrescriptions(prescriptions.map(rx => rx.id === id ? { ...rx, [field]: val } : rx));
  };

  // Quick preset meds
  const quickAdd = (name: string, dose: string, freq: string, dur: string, instr: string) => {
    setPrescriptions([
      ...prescriptions,
      {
        id: `rx-${Date.now()}`,
        medication: name,
        dosage: dose,
        frequency: freq,
        duration: dur,
        instructions: instr,
      }
    ]);
  };

  const handleSubmitConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assessment) {
      alert('Please enter a clinical assessment / diagnosis before completing.');
      return;
    }

    completeConsultation(appointmentId, {
      patientId: patient.id,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      department: currentDoctor.department,
      hospitalName: activeTenant.name,
      visitDate: new Date().toISOString().split('T')[0],
      chiefComplaint,
      vitals: {
        bloodPressure: bp,
        pulseRate: pulse,
        temperature: temp,
        spo2,
        weightKg: weight,
      },
      clinicalAssessment: assessment,
      doctorNotes,
      prescriptions: prescriptions.filter(rx => rx.medication.trim() !== ''),
    });

    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Consultation Finished!</h2>
          <p className="text-xs text-slate-500 mt-1">
            Clinical SOAP notes &amp; digital prescription have been saved to {patient.name}&apos;s permanent health timeline.
          </p>

          <div className="my-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Diagnosis:</span>
              <strong className="text-slate-900">{assessment}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Medications Prescribed:</span>
              <strong className="text-slate-900">{prescriptions.length} items</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Consulting Specialist:</span>
              <strong className="text-slate-900">{currentDoctor.name} ({currentDoctor.department})</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/doctor"
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              Back to Patient Queue
            </Link>
            <Link
              href="/patient"
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200"
            >
              View in Patient Timeline
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/doctor"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Live Queue</span>
        </Link>

        <div className="flex items-center space-x-2">
          {appointment?.tokenNumber && (
            <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-900 font-mono font-bold text-xs border border-blue-200">
              Active Token: {appointment.tokenNumber}
            </span>
          )}
          <span className="text-xs font-semibold text-slate-500">
            Room: {currentDoctor.roomNumber}
          </span>
        </div>
      </div>

      {/* Main 2-Column Split: Dossier (Left) vs SOAP Encounter (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 5 Columns: Patient Medical Dossier */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Patient Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 leading-tight">{patient.name}</h2>
                <p className="text-xs text-slate-500">
                  {patient.gender} &bull; DOB: {patient.dob} &bull; Blood: <strong>{patient.bloodGroup}</strong>
                </p>
              </div>
            </div>

            {/* Critical Medical Alerts Banner */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              {patient.knownAllergies.length > 0 && (
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-900">
                  <span className="font-bold flex items-center space-x-1 uppercase text-[10px] text-rose-700 mb-0.5">
                    <AlertTriangle className="w-3 h-3 text-rose-600" />
                    <span>Known Drug Allergies:</span>
                  </span>
                  <p className="font-semibold">{patient.knownAllergies.join(', ')}</p>
                </div>
              )}

              {patient.chronicConditions.length > 0 && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                  <span className="font-bold flex items-center space-x-1 uppercase text-[10px] text-amber-700 mb-0.5">
                    <Activity className="w-3 h-3 text-amber-600" />
                    <span>Chronic Diagnoses:</span>
                  </span>
                  <p className="font-semibold">{patient.chronicConditions.join(', ')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Uploaded Diagnostic Reports Vault with AI Explainer */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Patient Uploaded Reports ({patientReports.length})</span>
              </h3>
              <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                AI Summary Ready
              </span>
            </div>

            <div className="space-y-2.5">
              {patientReports.map(report => (
                <div 
                  key={report.id}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex items-center justify-between hover:bg-slate-100/80 transition-colors"
                >
                  <div>
                    <strong className="text-slate-900 font-bold block">{report.title}</strong>
                    <span className="text-[11px] text-slate-500">
                      {report.category.replace('_', ' ')} &bull; {report.uploadDate}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewReport(report)}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-[11px] shadow-sm transition-all flex-shrink-0"
                  >
                    <Sparkles className="w-3 h-3 text-brand-200" />
                    <span>View AI</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Past Clinical Visits History */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Previous Hospital Visits ({patientPastVisits.length})</span>
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {patientPastVisits.map(visit => (
                <div key={visit.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <div className="flex justify-between items-center text-slate-500 mb-1">
                    <span className="font-bold text-slate-800">{visit.visitDate}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-white rounded border border-slate-200">{visit.department}</span>
                  </div>
                  <p className="font-semibold text-slate-900">{visit.clinicalAssessment}</p>
                  <p className="text-[11px] text-slate-500 mt-1 italic line-clamp-2">
                    {visit.doctorNotes}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 7 Columns: SOAP Encounter & Digital Prescription Writer */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmitConsultation} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs">
            
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Electronic Health Record (EHR)
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  Clinical Consultation Encounter
                </h2>
              </div>
              <span className="text-slate-400 text-xs font-mono">
                {new Date().toLocaleDateString()}
              </span>
            </div>

            {/* S: Subjective */}
            <div>
              <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1.5">
                S: Subjective (Chief Complaint &amp; Symptoms)
              </label>
              <textarea
                rows={2}
                required
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                placeholder="Patient's reported symptoms, duration, aggravating/relieving factors..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs font-medium"
              />
            </div>

            {/* O: Objective (Vitals) */}
            <div>
              <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1.5">
                O: Objective (Recorded Vitals &amp; Physical Exam)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">Blood Pressure</span>
                  <input
                    type="text"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">Pulse Rate</span>
                  <input
                    type="text"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">Temp</span>
                  <input
                    type="text"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">SpO2 Oxygen</span>
                  <input
                    type="text"
                    value={spo2}
                    onChange={(e) => setSpo2(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">Weight</span>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* A: Assessment / Diagnosis */}
            <div>
              <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1.5">
                A: Assessment &amp; Clinical Diagnosis *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Stage 1 Essential Hypertension with Moderate Dyslipidemia"
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs font-bold text-slate-900"
              />
            </div>

            {/* P: Plan / Advice */}
            <div>
              <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1.5">
                P: Plan (Doctor&apos;s Advice &amp; Lifestyle Directions)
              </label>
              <textarea
                rows={2}
                placeholder="Dietary recommendations, salt restriction, follow-up tests required in 3 months..."
                value={doctorNotes}
                onChange={(e) => setDoctorNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs"
              />
            </div>

            {/* Digital Prescription Builder */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <label className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                  <Pill className="w-3.5 h-3.5 text-blue-600" />
                  <span>Digital Prescription Generator ({prescriptions.length})</span>
                </label>
                <button
                  type="button"
                  onClick={addPrescriptionRow}
                  className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Medicine</span>
                </button>
              </div>

              {/* Quick Drug Presets */}
              <div className="flex flex-wrap gap-1.5 mb-3 text-[11px]">
                <span className="text-slate-400 py-0.5">Quick Presets:</span>
                <button
                  type="button"
                  onClick={() => quickAdd('Atorvastatin 10mg', '1 tab', '0-0-1 (Night)', '30 days', 'After dinner')}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                >
                  + Atorvastatin
                </button>
                <button
                  type="button"
                  onClick={() => quickAdd('Telmisartan 40mg', '1 tab', '1-0-0 (Morning)', '90 days', 'Before breakfast')}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                >
                  + Telmisartan
                </button>
                <button
                  type="button"
                  onClick={() => quickAdd('Paracetamol 650mg', '1 tab', 'As needed for fever', '3 days', 'After food')}
                  className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                >
                  + Paracetamol
                </button>
              </div>

              {/* Prescriptions Dynamic List */}
              <div className="space-y-3">
                {prescriptions.map((rx, idx) => (
                  <div key={rx.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] text-slate-500">Medication #{idx + 1}</span>
                      {prescriptions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePrescriptionRow(rx.id)}
                          className="text-rose-500 hover:text-rose-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                      <input
                        type="text"
                        placeholder="Drug Name & Strength (e.g. Metformin 500mg)"
                        required
                        value={rx.medication}
                        onChange={(e) => handlePrescriptionChange(rx.id, 'medication', e.target.value)}
                        className="sm:col-span-6 bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Frequency (e.g. 1-0-1)"
                        value={rx.frequency}
                        onChange={(e) => handlePrescriptionChange(rx.id, 'frequency', e.target.value)}
                        className="sm:col-span-3 bg-white border border-slate-200 rounded-lg p-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g. 14 days)"
                        value={rx.duration}
                        onChange={(e) => handlePrescriptionChange(rx.id, 'duration', e.target.value)}
                        className="sm:col-span-3 bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Special instructions (e.g. Take with warm water after dinner)"
                      value={rx.instructions}
                      onChange={(e) => handlePrescriptionChange(rx.id, 'instructions', e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Consultation Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Completing will push this encounter to {patient.name}&apos;s lifelong health timeline.
              </span>

              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-lg shadow-blue-500/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Complete Consultation &amp; Sign Rx</span>
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* AI Report Modal Popup */}
      <AIReportModal
        report={previewReport}
        onClose={() => setPreviewReport(null)}
      />

    </div>
  );
}
