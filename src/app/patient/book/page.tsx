"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Stethoscope, 
  CheckCircle2, 
  User, 
  ArrowRight,
  Heart,
  Wind,
  Baby,
  Bone,
  Check
} from 'lucide-react';

export default function BookAppointmentPage() {
  const { currentPatient, doctors, bookAppointment, activeTenant } = useStore();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDept, setSelectedDept] = useState<string>('Cardiology');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM');
  const [reason, setReason] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [bookedAppointmentId, setBookedAppointmentId] = useState('');

  // Department definitions
  const departments = [
    { name: 'Cardiology', icon: Heart, desc: 'Heart, hypertension & chest symptoms', color: 'from-rose-500 to-red-600' },
    { name: 'Pulmonology', icon: Wind, desc: 'Lungs, cough, asthma & breathing', color: 'from-blue-500 to-indigo-600' },
    { name: 'Pediatrics', icon: Baby, desc: 'Child healthcare & vaccination', color: 'from-amber-500 to-orange-600' },
    { name: 'Orthopedics', icon: Bone, desc: 'Bones, joints, spine & fractures', color: 'from-teal-500 to-emerald-600' },
  ];

  const availableDoctors = doctors.filter(d => d.department === selectedDept);
  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId) || availableDoctors[0];

  const slots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM'
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    const apt = bookAppointment(
      currentPatient.id,
      selectedDoctor.id,
      selectedDate,
      selectedSlot,
      reason || 'General clinical consultation'
    );

    setBookedAppointmentId(apt.id);
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Appointment Confirmed!</h2>
          <p className="text-xs text-slate-500 mt-1">
            Your booking request has been sent to {activeTenant.name}
          </p>

          <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Patient:</span>
              <strong className="text-slate-900">{currentPatient.name}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Doctor:</span>
              <strong className="text-slate-900">{selectedDoctor?.name} ({selectedDept})</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date &amp; Slot:</span>
              <strong className="text-slate-900">{selectedDate} at {selectedSlot}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Consultation Fee:</span>
              <strong className="text-slate-900">{activeTenant.currency}{selectedDoctor?.consultationFee}</strong>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 mb-6">
            When you arrive at the clinic, the receptionist will check you in and issue your OPD token.
          </p>

          <Link
            href="/patient"
            className="w-full inline-flex items-center justify-center py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            Return to Health Timeline
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Back link */}
      <Link
        href="/patient"
        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-4 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Patient Portal</span>
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Book Outpatient Doctor Consultation
        </h1>
        <p className="text-xs text-slate-500">
          Select a medical specialty, doctor, and convenient time slot
        </p>
      </div>

      {/* Stepper Wizard Indicator */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 text-xs font-bold">
        <div className={`p-3 rounded-xl border flex items-center space-x-2 ${
          step >= 1 ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-white text-slate-400 border-slate-200'
        }`}>
          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">1</span>
          <span>Department</span>
        </div>
        <div className={`p-3 rounded-xl border flex items-center space-x-2 ${
          step >= 2 ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-white text-slate-400 border-slate-200'
        }`}>
          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
          <span>Doctor</span>
        </div>
        <div className={`p-3 rounded-xl border flex items-center space-x-2 ${
          step === 3 ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-white text-slate-400 border-slate-200'
        }`}>
          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">3</span>
          <span>Date &amp; Slot</span>
        </div>
      </div>

      {/* Step 1: Select Department */}
      {step === 1 && (
        <div>
          <h2 className="text-sm font-bold text-slate-800 mb-4">Step 1: Choose Medical Department</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {departments.map((d) => {
              const Icon = d.icon;
              const isSelected = selectedDept === d.name;
              return (
                <button
                  key={d.name}
                  onClick={() => {
                    setSelectedDept(d.name);
                    const firstDoc = doctors.find(doc => doc.department === d.name);
                    if (firstDoc) setSelectedDoctorId(firstDoc.id);
                    setStep(2);
                  }}
                  className={`p-5 rounded-2xl border text-left transition-all flex items-start space-x-4 ${
                    isSelected 
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-md' 
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${d.color} text-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{d.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{d.desc}</p>
                    <span className="mt-3 inline-flex items-center space-x-1 text-xs font-semibold text-emerald-600">
                      <span>Select Specialist</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 2: Choose Doctor */}
      {step === 2 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800">
              Step 2: Select {selectedDept} Specialist
            </h2>
            <button
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Change Department
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableDoctors.map((doc) => {
              const isSelected = selectedDoctorId === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => {
                    setSelectedDoctorId(doc.id);
                    setStep(3);
                  }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/40 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                        {doc.roomNumber}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm mt-1">{doc.name}</h3>
                      <p className="text-xs text-slate-500">{doc.title}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{doc.qualification}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-slate-900">
                        {activeTenant.currency}{doc.consultationFee}
                      </span>
                      <span className="text-[10px] text-slate-400 block">Consultation Fee</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Days: {doc.availableDays.join(', ')}</span>
                    <span className="font-semibold text-emerald-600 flex items-center space-x-1">
                      <span>Pick Date</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Pick Date, Time Slot & Reason */}
      {step === 3 && selectedDoctor && (
        <form onSubmit={handleConfirmBooking} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Step 3 &bull; Final Step</span>
              <h2 className="text-lg font-bold text-slate-900">Select Date &amp; Time Slot</h2>
            </div>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Change Doctor
            </button>
          </div>

          {/* Selected Doctor Summary Pill */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <Stethoscope className="w-5 h-5 text-brand-600" />
              <div>
                <strong className="text-slate-900">{selectedDoctor.name}</strong>
                <p className="text-slate-500">{selectedDoctor.department} &bull; {selectedDoctor.roomNumber}</p>
              </div>
            </div>
            <span className="font-bold text-slate-900">{activeTenant.currency}{selectedDoctor.consultationFee}</span>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Preferred Consultation Date</label>
            <input
              type="date"
              required
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>

          {/* Slots Grid */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Available OPD Slots</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {slots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    selectedSlot === slot
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Reason for Visit */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Chief Reason for Consultation</label>
            <textarea
              rows={3}
              placeholder="e.g. Mild palpitations after workout, blood pressure medication renewal, persistent cough..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Back
            </button>

            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all"
            >
              <span>Confirm &amp; Schedule Appointment</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
