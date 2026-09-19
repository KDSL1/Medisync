"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import VerificationGate from '@/components/VerificationGate';
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
  ShieldCheck, 
  ChevronRight, 
  BarChart3,
  UserCheck,
  AlertCircle,
  ClipboardList,
  User,
  KeyRound,
  ShieldAlert,
  Search
} from 'lucide-react';

export default function ManagementDashboardPage() {
  return (
    <VerificationGate>
      <ManagementContent />
    </VerificationGate>
  );
}

function ManagementContent() {
  const { 
    activeTenant, 
    tenants, 
    setActiveTenant, 
    doctors, 
    provisionDoctor,
    verifyDoctor,
    receptionists,
    verifyReceptionist,
    provisionReceptionist,
    appointments, 
    patients,
    verifyPatient,
    visits 
  } = useStore();

  // Active View Tab: 'analytics' | 'access-desk' | 'departments'
  const [activeTab, setActiveTab] = useState<'analytics' | 'access-desk' | 'departments'>('access-desk');

  // Modals
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  // Departments State
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

  // Doctor Form State
  const [docName, setDocName] = useState('');
  const [docEmail, setDocEmail] = useState('');
  const [docDept, setDocDept] = useState('Cardiology');
  const [docQual, setDocQual] = useState('MD, FACC');
  const [docRoom, setDocRoom] = useState('Room 205');
  const [docFee, setDocFee] = useState(60);

  // Dynamic KPI Calculations
  const totalFootfall = appointments.length;
  const waitingNow = appointments.filter(a => a.status === 'CHECKED_IN').length;
  const inConsultationNow = appointments.filter(a => a.status === 'IN_CONSULTATION').length;

  const totalRevenue = appointments
    .filter(a => a.feePaid)
    .reduce((sum, a) => sum + (a.amount || 0), 0);

  const activeDoctorsCount = doctors.filter(d => d.dutyStatus !== 'OFF_DUTY').length;
  const verifiedDoctorsCount = doctors.filter(d => d.isVerified).length;
  const verifiedPatientsCount = patients.filter(p => p.isVerified).length;

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

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName) return;

    provisionDoctor({
      name: docName,
      email: docEmail || `${docName.toLowerCase().replace(/[^a-z0-9]+/g, '.')}@${activeTenant.slug}.example.com`,
      title: `Consultant ${docDept}`,
      department: docDept,
      qualification: docQual,
      roomNumber: docRoom,
      consultationFee: Number(docFee),
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      dutyStatus: 'ON_DUTY',
      hospitalId: activeTenant.id,
      isVerified: true,
      verificationStatus: 'VERIFIED'
    });

    setDocName('');
    setDocEmail('');
    setShowDoctorModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Executive Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-2xl flex items-center justify-center shadow-md shadow-purple-500/20 flex-shrink-0">
              <Building2 className="w-8 h-8" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Hospital Administration &amp; Access Desk
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  Level 2 Authority &bull; {activeTenant.adminName || 'Clinic Director'}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                {activeTenant.name} &bull; {activeTenant.address}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Tenant ID: <strong className="text-slate-800 dark:text-slate-200">{activeTenant.id}</strong></span>
                </span>
                <span>&bull;</span>
                <span>ABDM Node: <strong className="text-slate-800 dark:text-slate-200">{activeTenant.abdmFacilityId || 'IN-MH-74291'}</strong></span>
                <span>&bull;</span>
                <span>Verified Doctors: <strong className="text-slate-800 dark:text-slate-200">{verifiedDoctorsCount}/{doctors.length}</strong></span>
                <span>&bull;</span>
                <span>Patients: <strong className="text-slate-800 dark:text-slate-200">{patients.length}</strong></span>
              </div>
            </div>
          </div>

          {/* Multi-Tenant Switcher & Quick Super Admin Link */}
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
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2 px-3 rounded-xl font-medium focus:outline-none focus:ring-1 focus:ring-purple-500 text-xs w-full"
              >
                {tenants.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <Link
              href="/super-admin"
              className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all self-end border border-slate-200 dark:border-slate-700"
            >
              <KeyRound className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Super Admin</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Top View Mode Navigation Tabs */}
      <div className="mb-8 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl flex items-center text-xs font-bold max-w-xl">
        <button
          type="button"
          onClick={() => setActiveTab('access-desk')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === 'access-desk'
              ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-400 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Staff &amp; Patient Access Desk</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-400 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Hospital Analytics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('departments')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 cursor-pointer ${
            activeTab === 'departments'
              ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-400 shadow-xs'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Departments ({departments.length})</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: STAFF & PATIENT ACCESS & VERIFICATION DESK */}
      {/* ============================================================ */}
      {activeTab === 'access-desk' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Hierarchy Delegation Notice */}
          <div className="p-5 rounded-3xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-purple-900 dark:text-purple-200 text-xs font-bold block">
                  Level 2 Governance: Clinical Privilege Delegation
                </strong>
                <p className="text-xs text-purple-800/80 dark:text-purple-300/80 mt-0.5 leading-relaxed">
                  As the Hospital Administrator authorized by Super Admin, you are responsible for provisioning and verifying 
                  Doctors, Receptionists, and Patient Health Lockers for <strong>{activeTenant.name}</strong>. Unverified accounts encounter a security barrier until approved below.
                </p>
              </div>
            </div>
          </div>

          {/* 1. Doctor Privileges Desk */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Physician Clinical Privileges</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Approve and verify doctors to grant access to the Doctor Cockpit (`/doctor`) and Patient PHI
                </p>
              </div>

              <button
                onClick={() => setShowDoctorModal(true)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add Doctor Credentials</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="pb-3 font-semibold">Doctor Name</th>
                    <th className="pb-3 font-semibold">Department &amp; Room</th>
                    <th className="pb-3 font-semibold">Qualifications</th>
                    <th className="pb-3 font-semibold">Consult Fee</th>
                    <th className="pb-3 font-semibold">Verification Status</th>
                    <th className="pb-3 text-right font-semibold">Access Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 font-medium">
                  {doctors.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5">
                        <strong className="text-slate-900 dark:text-white font-bold block">{doc.name}</strong>
                        <span className="text-[11px] text-slate-400">{doc.email || 'dr.mehta@metrohealth.example.com'}</span>
                      </td>

                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                          {doc.department}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 ml-1.5">{doc.roomNumber}</span>
                      </td>

                      <td className="py-3.5 text-slate-500 dark:text-slate-400">{doc.qualification}</td>

                      <td className="py-3.5 font-bold text-slate-900 dark:text-white">
                        {activeTenant.currency}{doc.consultationFee}
                      </td>

                      <td className="py-3.5">
                        {doc.isVerified ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>VERIFIED</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            <AlertCircle className="w-3 h-3 text-amber-600" />
                            <span>PENDING APPROVAL</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => verifyDoctor(doc.id, !doc.isVerified)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                            doc.isVerified
                              ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                          }`}
                        >
                          {doc.isVerified ? 'Revoke Privileges' : 'Verify Doctor'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Receptionist Desks */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center space-x-2 mb-4">
              <ClipboardList className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Front-Desk Triage &amp; Intake Desks</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Receptionists authorized to issue queue tokens and register walk-ins</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="pb-3 font-semibold">Staff Name</th>
                    <th className="pb-3 font-semibold">Counter / Desk</th>
                    <th className="pb-3 font-semibold">Email</th>
                    <th className="pb-3 font-semibold">Verification Status</th>
                    <th className="pb-3 text-right font-semibold">Access Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 font-medium">
                  {receptionists.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5">
                        <strong className="text-slate-900 dark:text-white font-bold block">{rec.name}</strong>
                      </td>
                      <td className="py-3.5 font-semibold text-slate-800 dark:text-slate-200">{rec.counterNumber}</td>
                      <td className="py-3.5 text-slate-500 dark:text-slate-400">{rec.email}</td>
                      <td className="py-3.5">
                        {rec.isVerified ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>VERIFIED</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            <AlertCircle className="w-3 h-3 text-amber-600" />
                            <span>PENDING</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => verifyReceptionist(rec.id, !rec.isVerified)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                            rec.isVerified
                              ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                          }`}
                        >
                          {rec.isVerified ? 'Revoke Access' : 'Verify Staff'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Patient Health Lockers */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center space-x-2 mb-4">
              <User className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Registered Patient Health Lockers</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">ABDM M3 sovereign health records &bull; Verified patient enrollment</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="pb-3 font-semibold">Patient Name</th>
                    <th className="pb-3 font-semibold">ABHA Health ID</th>
                    <th className="pb-3 font-semibold">Blood Group</th>
                    <th className="pb-3 font-semibold">Contact</th>
                    <th className="pb-3 font-semibold">Verification Status</th>
                    <th className="pb-3 text-right font-semibold">Access Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 font-medium">
                  {patients.map((pat) => (
                    <tr key={pat.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5">
                        <strong className="text-slate-900 dark:text-white font-bold block">{pat.name}</strong>
                        <span className="text-[11px] text-slate-400">{pat.email}</span>
                      </td>

                      <td className="py-3.5 font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        {pat.abhaId || '91-4829-1029-4820'}
                      </td>

                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                          {pat.bloodGroup}
                        </span>
                      </td>

                      <td className="py-3.5 text-slate-500 dark:text-slate-400">{pat.phone}</td>

                      <td className="py-3.5">
                        {pat.isVerified ? (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>VERIFIED VAULT</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                            <AlertCircle className="w-3 h-3 text-amber-600" />
                            <span>PENDING ABHA</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => verifyPatient(pat.id, !pat.isVerified)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                            pat.isVerified
                              ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100'
                              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                          }`}
                        >
                          {pat.isVerified ? 'Suspend Locker' : 'Verify Patient'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: HOSPITAL ANALYTICS & KPIS */}
      {/* ============================================================ */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* 4 Executive KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-purple-600 uppercase tracking-wider">
                <span>Today&apos;s Footfall</span>
                <Users className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">{totalFootfall}</p>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                {waitingNow} waiting &bull; {inConsultationNow} in session
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-600 uppercase tracking-wider">
                <span>Revenue Collected</span>
                <DollarSign className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">
                {activeTenant.currency}{totalRevenue}
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
                100% cashless POS reconciliation
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-blue-600 uppercase tracking-wider">
                <span>Doctors on Duty</span>
                <Stethoscope className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">{activeDoctorsCount}</p>
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Across {departments.length} specialty wings
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-amber-600 uppercase tracking-wider">
                <span>Avg Consult Time</span>
                <Clock className="w-4 h-4 text-amber-500" />
              </div>
              <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">14.5m</p>
              <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
                Optimal turnaround efficiency
              </span>
            </div>

          </div>

          {/* Visual Analytics Grid: Hourly Traffic + Department Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Hourly Traffic Chart (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">OPD Footfall Distribution by Hour</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Patient arrival frequency throughout today&apos;s clinic hours</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Peak: 10:00 AM</span>
                </span>
              </div>

              {/* Bar Chart Visualization */}
              <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2 border-b border-slate-200 dark:border-slate-800">
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
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Department Volume Share</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Consultation load distribution across clinical departments</p>

                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200 mb-1">
                      <span>Cardiology</span>
                      <span>{deptCounts.Cardiology} Patients ({totalFootfall > 0 ? Math.round((deptCounts.Cardiology / totalFootfall) * 100) : 0}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${totalFootfall > 0 ? (deptCounts.Cardiology / totalFootfall) * 100 : 0}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200 mb-1">
                      <span>Pulmonology</span>
                      <span>{deptCounts.Pulmonology} Patients ({totalFootfall > 0 ? Math.round((deptCounts.Pulmonology / totalFootfall) * 100) : 0}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${totalFootfall > 0 ? (deptCounts.Pulmonology / totalFootfall) * 100 : 0}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200 mb-1">
                      <span>Pediatrics</span>
                      <span>{deptCounts.Pediatrics} Patients ({totalFootfall > 0 ? Math.round((deptCounts.Pediatrics / totalFootfall) * 100) : 0}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${totalFootfall > 0 ? (deptCounts.Pediatrics / totalFootfall) * 100 : 0}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200 mb-1">
                      <span>Orthopedics</span>
                      <span>{deptCounts.Orthopedics} Patients ({totalFootfall > 0 ? Math.round((deptCounts.Orthopedics / totalFootfall) * 100) : 0}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: `${totalFootfall > 0 ? (deptCounts.Orthopedics / totalFootfall) * 100 : 0}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Highest Revenue Department:</span>
                <strong className="text-slate-800 dark:text-slate-200">Cardiology ({activeTenant.currency}130)</strong>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: DEPARTMENTS DIRECTORY */}
      {/* ============================================================ */}
      {activeTab === 'departments' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Clinical Departments &amp; Wings</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Configured medical service areas at {activeTenant.name}</p>
            </div>
            <button
              onClick={() => setShowDeptModal(true)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Department</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept) => (
              <div key={dept.id} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
                <div className="flex justify-between items-start mb-2">
                  <strong className="text-sm font-bold text-slate-900 dark:text-white">{dept.name}</strong>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {dept.rooms}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400">Head: <strong className="text-slate-700 dark:text-slate-200">{dept.head}</strong></p>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Base Consultation:</span>
                  <strong className="text-slate-900 dark:text-white">{activeTenant.currency}{dept.baseFee}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Department Modal */}
      {showDeptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 sm:p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add Clinical Department</h3>
              <button onClick={() => setShowDeptModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleAddDepartment} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Department Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dermatology / Neurology"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Head of Department (Specialist)</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Priya Nair"
                  value={newDeptHead}
                  onChange={(e) => setNewDeptHead(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Assigned Rooms</label>
                  <input
                    type="text"
                    placeholder="e.g. Room 401-404"
                    value={newDeptRooms}
                    onChange={(e) => setNewDeptRooms(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Base Fee ({activeTenant.currency})</label>
                  <input
                    type="number"
                    value={newDeptFee}
                    onChange={(e) => setNewDeptFee(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowDeptModal(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
                >
                  Create Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showDoctorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 sm:p-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Provision Physician Credentials</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Step 3 in hierarchy: Hospital Admin grants doctor access</p>
              </div>
              <button onClick={() => setShowDoctorModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleAddDoctor} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Doctor Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Khanna"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Official Clinical Email</label>
                <input
                  type="email"
                  placeholder="e.g. dr.khanna@metrohealth.example.com"
                  value={docEmail}
                  onChange={(e) => setDocEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Specialty Wing</label>
                  <select
                    value={docDept}
                    onChange={(e) => setDocDept(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Consultation Fee ({activeTenant.currency})</label>
                  <input
                    type="number"
                    value={docFee}
                    onChange={(e) => setDocFee(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Qualifications</label>
                  <input
                    type="text"
                    placeholder="e.g. MBBS, MD, DM"
                    value={docQual}
                    onChange={(e) => setDocQual(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Assigned OPD Room</label>
                  <input
                    type="text"
                    placeholder="e.g. Room 204"
                    value={docRoom}
                    onChange={(e) => setDocRoom(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowDoctorModal(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors shadow-sm cursor-pointer"
                >
                  Grant &amp; Verify Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
