"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { 
  ArrowLeft, 
  UserPlus, 
  CheckCircle2, 
  Printer, 
  Clock, 
  Stethoscope, 
  Ticket,
  ChevronRight
} from 'lucide-react';

export default function WalkInRegistrationPage() {
  const { doctors, registerWalkIn, activeTenant } = useStore();
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'MALE' | 'FEMALE' | 'OTHER'>('MALE');
  const [dob, setDob] = useState('1992-05-10');
  const [bloodGroup, setBloodGroup] = useState('O Positive (O+)');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [complaint, setComplaint] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || '');

  // Issued Token Result
  const [issuedResult, setIssuedResult] = useState<{
    token: string;
    patientName: string;
    doctorName: string;
    room: string;
    department: string;
    fee: number;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !complaint) return;

    const selectedDoc = doctors.find(d => d.id === selectedDoctorId) || doctors[0];

    const result = registerWalkIn(
      {
        name,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        phone,
        gender,
        dob,
        bloodGroup,
        emergencyContact: emergencyContact || 'Self / Relative',
        knownAllergies: [],
        chronicConditions: [],
      },
      selectedDoc.id,
      complaint
    );

    setIssuedResult({
      token: result.appointment.tokenNumber || 'OPD-101',
      patientName: result.patient.name,
      doctorName: selectedDoc.name,
      room: selectedDoc.roomNumber,
      department: selectedDoc.department,
      fee: selectedDoc.consultationFee,
    });
  };

  // If token is issued, show printable token slip
  if (issuedResult) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        
        {/* Printable Token Slip Card */}
        <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-amber-300 shadow-2xl text-center relative overflow-hidden">
          
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold uppercase tracking-wider mb-4 border border-amber-200">
            <Ticket className="w-3.5 h-3.5" />
            <span>Official OPD Token Slip</span>
          </div>

          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            {activeTenant.name}
          </h2>

          <div className="my-6 py-4 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">Token Number</span>
            <span className="text-4xl font-black text-amber-950 font-mono tracking-wider">
              {issuedResult.token}
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-700 text-left mb-6 border-b border-slate-100 pb-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Patient Name:</span>
              <strong className="text-slate-900">{issuedResult.patientName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Consulting Specialist:</span>
              <strong className="text-slate-900">{issuedResult.doctorName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Department / Room:</span>
              <strong className="text-slate-900">{issuedResult.department} &bull; {issuedResult.room}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Consultation Fee:</span>
              <strong className="text-emerald-700 font-bold">{activeTenant.currency}{issuedResult.fee} (Paid)</strong>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mb-6">
            Please proceed to {issuedResult.room} waiting area. Your token will be called shortly on the display screen.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => window.print()}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Token Slip</span>
            </button>
            <button
              onClick={() => router.push('/reception')}
              className="flex-1 py-2.5 px-4 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-colors"
            >
              Back to Live Queue
            </button>
          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <Link
        href="/reception"
        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-4 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Queue Desk</span>
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Fast Walk-in Patient Registration
        </h1>
        <p className="text-xs text-slate-500">
          60-second intake for unregistered patients arriving directly at {activeTenant.name}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 text-xs">
        
        {/* Patient Details */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
            1. Patient Demographics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Patient Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Chandra"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="O Positive (O+)">O+</option>
                <option value="O Negative (O-)">O-</option>
                <option value="A Positive (A+)">A+</option>
                <option value="B Positive (B+)">B+</option>
                <option value="AB Positive (AB+)">AB+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clinical Triage */}
        <div className="space-y-4 pt-3">
          <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
            2. Triage &amp; Doctor Assignment
          </h3>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Chief Complaint / Symptoms *</label>
            <textarea
              rows={2}
              required
              placeholder="e.g. Acute stomach ache since morning, fever 101F, seasonal wheezing..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Assign Consulting Doctor</label>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} ({doc.department}) &bull; {doc.roomNumber} &bull; Fee: {activeTenant.currency}{doc.consultationFee}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/reception')}
            className="px-4 py-2 text-slate-600 font-semibold"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register &amp; Issue OPD Token</span>
          </button>
        </div>

      </form>

    </div>
  );
}
