"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { 
  Building2, 
  Users, 
  DollarSign, 
  Clock, 
  Stethoscope, 
  Activity, 
  TrendingUp, 
  Calendar, 
  Plus, 
  Layers, 
  CheckCircle2,
  Building,
  ShieldCheck,
  ChevronRight,
  BarChart3
} from 'lucide-react';

export default function ManagementDashboardPage() {
  const { 
    activeTenant, 
    tenants, 
    setActiveTenant, 
    doctors, 
    appointments, 
    patients,
    visits 
  } = useStore();

  const [showDeptModal, setShowDeptModal] = useState(false);
  const [departments, setDepartments] = useState([
    { id: 'dep-1', name: 'Cardiology', head: 'Dr. Vikram Mehta', rooms: 'Rooms 201-205', activeDoctors: 1, baseFee: 65 },
    { id: 'dep-2', name: 'Pulmonology', head: 'Dr. Elena Rostova', rooms: 'Rooms 106-110', activeDoctors: 1, baseFee: 55 },
    { id: 'dep-3', name: 'Pediatrics', head: 'Dr. Ananya Iyer', rooms: 'Rooms 111-115', activeDoctors: 1, baseFee: 45 },
    { id: 'dep-4', name: 'Orthopedics', head: 'Dr. Marcus Chen', rooms: 'Rooms 301-306', activeDoctors: 1, baseFee: 75 },
  ]);

  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptHead, setNewDeptHead] = useState('');
  const [newDeptRooms, setNewDeptRooms] = useState('');
  const [newDeptFee, setNewDeptFee] = useState(50);

  // Dynamic KPI Calculations
  const totalFootfall = appointments.length;
  const waitingNow = appointments.filter(a => a.status === 'CHECKED_IN').length;
  const inConsultationNow = appointments.filter(a => a.status === 'IN_CONSULTATION').length;
  const completedToday = appointments.filter(a => a.status === 'COMPLETED').length;

  const totalRevenue = appointments
    .filter(a => a.feePaid)
    .reduce((sum, a) => sum + (a.amount || 0), 0);

  const activeDoctorsCount = doctors.filter(d => d.dutyStatus !== 'OFF_DUTY').length;

  // Department-wise distribution
  const deptCounts = {
    Cardiology: appointments.filter(a => a.department === 'Cardiology').length,
    Pulmonology: appointments.filter(a => a.department === 'Pulmonology').length,
    Pediatrics: appointments.filter(a => a.department === 'Pediatrics').length,
    Orthopedics: appointments.filter(a => a.department === 'Orthopedics').length,
  };

  // Hourly traffic simulation
  const hourlyTraffic = [
    { hour: '09:00 AM', patients: 4, height: '45%' },
    { hour: '10:00 AM', patients: 8, height: '85%' },
    { hour: '11:00 AM', patients: 7, height: '75%' },
    { hour: '12:00 PM', patients: 3, height: '35%' },
    { hour: '02:00 PM', patients: 6, height: '65%' },
    { hour: '03:00 PM', patients: 5, height: '55%' },
  ];

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName) return;

    setDepartments([
      ...departments,
      {
        id: `dep-${Date.now()}`,
        name: newDeptName,
        head: newDeptHead || 'Consultant Specialist',
        rooms: newDeptRooms || 'Room 401',
        activeDoctors: 1,
        baseFee: Number(newDeptFee),
      }
    ]);

    setNewDeptName('');
    setNewDeptHead('');
    setNewDeptRooms('');
    setShowDeptModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Executive Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-2xl flex items-center justify-center shadow-md shadow-purple-500/20 flex-shrink-0">
              <Building2 className="w-8 h-8" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Hospital Management &amp; Analytics
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  Super Admin Console
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium mt-1">
                {activeTenant.name} &bull; {activeTenant.address}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Tenant ID: <strong className="text-slate-800">{activeTenant.id}</strong></span>
                </span>
                <span>&bull;</span>
                <span>Registered Patients: {patients.length}</span>
                <span>&bull;</span>
                <span>Archived Encounters: {visits.length}</span>
              </div>
            </div>
          </div>

          {/* Multi-Tenant Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="text-xs">
              <label className="block text-slate-400 font-semibold mb-1 text-[10px] uppercase tracking-wider">
                Active Tenant / Clinic Entity:
              </label>
              <select
                value={activeTenant.id}
                onChange={(e) => {
                  const t = tenants.find(tenant => tenant.id === e.target.value);
                  if (t) setActiveTenant(t);
                }}
                className="bg-slate-50 border border-slate-200 text-slate-700 py-2 px-3 rounded-xl font-medium focus:outline-none focus:ring-1 focus:ring-purple-500 text-xs w-full"
              >
                {tenants.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowDeptModal(true)}
              className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-all self-end"
            >
              <Plus className="w-4 h-4" />
              <span>Add Department</span>
            </button>
          </div>

        </div>
      </div>

      {/* 4 Executive KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-purple-600 uppercase tracking-wider">
            <span>Today&apos;s Footfall</span>
            <Users className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 mt-2">{totalFootfall}</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            {waitingNow} waiting &bull; {inConsultationNow} in session
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-600 uppercase tracking-wider">
            <span>Revenue Collected</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 mt-2">
            {activeTenant.currency}{totalRevenue}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
            100% cashless POS reconciliation
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-blue-600 uppercase tracking-wider">
            <span>Doctors on Duty</span>
            <Stethoscope className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 mt-2">{activeDoctorsCount}</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            Across {departments.length} specialty wings
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-amber-600 uppercase tracking-wider">
            <span>Avg Consult Time</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 mt-2">14.5m</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
            Optimal turnaround efficiency
          </span>
        </div>

      </div>

      {/* Visual Analytics Grid: Hourly Traffic + Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Hourly Traffic Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">OPD Footfall Distribution by Hour</h3>
              <p className="text-xs text-slate-500">Patient arrival frequency throughout today&apos;s clinic hours</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 flex items-center space-x-1">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Peak: 10:00 AM</span>
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-200">
            {hourlyTraffic.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center group h-full justify-end">
                <span className="text-[10px] font-bold text-slate-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.patients} pts
                </span>
                <div 
                  className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-xl transition-all group-hover:brightness-110 shadow-sm"
                  style={{ height: item.height }}
                />
                <span className="text-[10px] font-semibold text-slate-400 mt-2 truncate w-full text-center">
                  {item.hour.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Department Volume Share</h3>
            <p className="text-xs text-slate-500 mb-6">Consultation load distribution across clinical departments</p>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Cardiology</span>
                  <span>{deptCounts.Cardiology} Patients ({totalFootfall > 0 ? Math.round((deptCounts.Cardiology / totalFootfall) * 100) : 0}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${totalFootfall > 0 ? (deptCounts.Cardiology / totalFootfall) * 100 : 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Pulmonology</span>
                  <span>{deptCounts.Pulmonology} Patients ({totalFootfall > 0 ? Math.round((deptCounts.Pulmonology / totalFootfall) * 100) : 0}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${totalFootfall > 0 ? (deptCounts.Pulmonology / totalFootfall) * 100 : 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Pediatrics</span>
                  <span>{deptCounts.Pediatrics} Patients ({totalFootfall > 0 ? Math.round((deptCounts.Pediatrics / totalFootfall) * 100) : 0}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${totalFootfall > 0 ? (deptCounts.Pediatrics / totalFootfall) * 100 : 0}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Orthopedics</span>
                  <span>{deptCounts.Orthopedics} Patients ({totalFootfall > 0 ? Math.round((deptCounts.Orthopedics / totalFootfall) * 100) : 0}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: `${totalFootfall > 0 ? (deptCounts.Orthopedics / totalFootfall) * 100 : 0}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Highest Revenue Department:</span>
            <strong className="text-slate-800">Cardiology ({activeTenant.currency}130)</strong>
          </div>
        </div>

      </div>

      {/* Staff & Doctor Roster Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Physician Staff Roster &amp; Utilization</h3>
            <p className="text-xs text-slate-500">Live operational status and fee schedules for active hospital practitioners</p>
          </div>
          <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-lg border border-purple-200">
            {doctors.length} Doctors Registered
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                <th className="pb-3">Doctor Name</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Room</th>
                <th className="pb-3">Qualifications</th>
                <th className="pb-3">Consult Fee</th>
                <th className="pb-3 text-right">Duty Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {doctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5">
                    <strong className="text-slate-900 font-bold block">{doc.name}</strong>
                    <span className="text-[11px] text-slate-400">{doc.title}</span>
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                      {doc.department}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono font-bold text-slate-800">{doc.roomNumber}</td>
                  <td className="py-3.5 text-slate-500">{doc.qualification}</td>
                  <td className="py-3.5 font-bold text-slate-900">{activeTenant.currency}{doc.consultationFee}</td>
                  <td className="py-3.5 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      doc.dutyStatus === 'IN_SESSION'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse'
                        : doc.dutyStatus === 'ON_BREAK'
                        ? 'bg-slate-100 text-slate-600 border border-slate-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {doc.dutyStatus.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hospital Departments Directory */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Clinical Departments &amp; Wings</h3>
            <p className="text-xs text-slate-500">Configured medical service areas at {activeTenant.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((dept) => (
            <div key={dept.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div className="flex justify-between items-start mb-2">
                <strong className="text-sm font-bold text-slate-900">{dept.name}</strong>
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200">
                  {dept.rooms}
                </span>
              </div>
              <p className="text-slate-500">Head: <strong className="text-slate-700">{dept.head}</strong></p>
              <div className="mt-3 pt-2 border-t border-slate-200/80 flex justify-between text-[11px] text-slate-500">
                <span>Base Consultation:</span>
                <strong className="text-slate-900">{activeTenant.currency}{dept.baseFee}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Department Modal */}
      {showDeptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md p-6 sm:p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">Add Clinical Department</h3>
              <button onClick={() => setShowDeptModal(false)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleAddDepartment} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Department Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dermatology / Neurology"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Head of Department (Specialist)</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Priya Nair"
                  value={newDeptHead}
                  onChange={(e) => setNewDeptHead(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Rooms</label>
                  <input
                    type="text"
                    placeholder="e.g. Room 401-404"
                    value={newDeptRooms}
                    onChange={(e) => setNewDeptRooms(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Base Fee ({activeTenant.currency})</label>
                  <input
                    type="number"
                    value={newDeptFee}
                    onChange={(e) => setNewDeptFee(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowDeptModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-colors shadow-sm"
                >
                  Create Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
