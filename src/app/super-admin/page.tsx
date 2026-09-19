"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Tenant } from '@/lib/types';
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  Stethoscope, 
  Activity, 
  Plus, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle, 
  Search, 
  KeyRound,
  ExternalLink,
  Globe,
  Database,
  Lock,
  Layers,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function SuperAdminPage() {
  const { 
    tenants, 
    provisionHospital, 
    verifyHospital, 
    setActiveTenant, 
    login, 
    doctors, 
    patients,
    appointments 
  } = useStore();

  const router = useRouter();

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Provision New Hospital Modal
  const [showModal, setShowModal] = useState(false);
  const [hospitalName, setHospitalName] = useState('');
  const [slug, setSlug] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminName, setAdminName] = useState('');
  const [address, setAddress] = useState('');
  const [tier, setTier] = useState<'ENTERPRISE' | 'REGIONAL' | 'CLINIC'>('ENTERPRISE');
  const [abdmId, setAbdmId] = useState('');
  const [phone, setPhone] = useState('+1 (555) 000-1122');
  const [isVerifiedInitial, setIsVerifiedInitial] = useState(true);

  // Auto-generate slug from hospital name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setHospitalName(name);
    setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
  };

  const handleProvisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hospitalName || !adminEmail) return;

    provisionHospital({
      name: hospitalName,
      slug: slug || `hospital-${Date.now()}`,
      tagline: 'Connected Multi-Tenant Clinical Node',
      phone: phone || '+1 (555) 456-7890',
      email: `contact@${slug || 'hospital'}.example.com`,
      address: address || 'Healthcare District, Metro Area',
      currency: '$',
      adminEmail,
      adminName: adminName || 'Clinic Director',
      isVerified: isVerifiedInitial,
      tier,
      abdmFacilityId: abdmId || `IN-MED-${Math.floor(10000 + Math.random() * 90000)}`,
    });

    // Reset Form
    setHospitalName('');
    setSlug('');
    setAdminEmail('');
    setAdminName('');
    setAddress('');
    setAbdmId('');
    setShowModal(false);
  };

  const jumpToHospitalAdmin = (tenant: Tenant) => {
    setActiveTenant(tenant);
    login('MANAGEMENT', tenant.adminEmail, tenant.isVerified);
    router.push('/management');
  };

  // Filtered tenants
  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.adminEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (t.abdmFacilityId && t.abdmFacilityId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const verifiedHospitalsCount = tenants.filter(t => t.isVerified).length;
  const verifiedDoctorsCount = doctors.filter(d => d.isVerified).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Level 1: Platform Owner Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-teal-500 text-white font-bold text-2xl flex items-center justify-center shadow-md shadow-indigo-500/20 flex-shrink-0">
              <KeyRound className="w-8 h-8" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Super Admin &bull; Platform Governance Console
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Level 1 Root Authority
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                Centralized multi-tenant orchestration &bull; Hospital provisioning &bull; ABDM M3 Facility verification
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Platform Status: <strong className="text-slate-800 dark:text-slate-200">Zero-Trust Secured</strong></span>
                </span>
                <span>&bull;</span>
                <span>Tenants Provisioned: <strong className="text-slate-800 dark:text-slate-200">{tenants.length} Hospitals</strong></span>
                <span>&bull;</span>
                <span>Total Active Doctors: <strong className="text-slate-800 dark:text-slate-200">{doctors.length}</strong></span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Provision New Hospital</span>
            </button>
          </div>

        </div>
      </div>

      {/* 4-Tier Hierarchy Breadcrumb / Banner */}
      <div className="mb-8 p-5 bg-gradient-to-r from-indigo-50 via-purple-50 to-teal-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-teal-950/30 rounded-3xl border border-indigo-100 dark:border-indigo-900/50">
        <div className="flex items-center space-x-2 text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>MediSync 360 Onboarding &amp; Verification Hierarchy</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs mt-3">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-indigo-200 dark:border-indigo-800 shadow-xs">
            <span className="text-[10px] font-bold text-indigo-600 uppercase">Step 1 &bull; Active</span>
            <strong className="block text-slate-900 dark:text-white font-bold mt-0.5">Super Admin (You)</strong>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Provisions partner hospital accounts &amp; ABDM IDs.</p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-purple-200 dark:border-purple-800 shadow-xs">
            <span className="text-[10px] font-bold text-purple-600 uppercase">Step 2 &bull; Delegation</span>
            <strong className="block text-slate-900 dark:text-white font-bold mt-0.5">Hospital Admin</strong>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Receives access &amp; provisions clinical staff.</p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-xs">
            <span className="text-[10px] font-bold text-blue-600 uppercase">Step 3 &bull; Clinical Ops</span>
            <strong className="block text-slate-900 dark:text-white font-bold mt-0.5">Doctors &amp; Staff</strong>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Verified by Admin to manage OPD queues &amp; SOAP notes.</p>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-xs">
            <span className="text-[10px] font-bold text-emerald-600 uppercase">Step 4 &bull; Patient Sovereign</span>
            <strong className="block text-slate-900 dark:text-white font-bold mt-0.5">Verified Patients</strong>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Access AI Report Explainer &amp; health timeline.</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-indigo-600 uppercase tracking-wider">
            <span>Partner Hospitals</span>
            <Building2 className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">{tenants.length}</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
            {verifiedHospitalsCount} Active &amp; Verified
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-blue-600 uppercase tracking-wider">
            <span>Verified Doctors</span>
            <Stethoscope className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">{verifiedDoctorsCount}</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            Across {tenants.length} hospital networks
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-600 uppercase tracking-wider">
            <span>Total Patients</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">{patients.length}</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">
            100% ABHA Linked Vaults
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-purple-600 uppercase tracking-wider">
            <span>System Uptime</span>
            <Activity className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-2">99.98%</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            HIPAA M3 Cloud Gateway
          </span>
        </div>

      </div>

      {/* Hospital / Tenant Provisioning Directory */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm mb-8 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Provisioned Hospital Accounts &amp; Tenant Nodes
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage clinical enterprise tenants, ABDM facility links, and hospital administrative access
            </p>
          </div>

          {/* Search Box */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search hospitals, ABDM ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-9 pr-3 py-2 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Hospital Tenants Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="pb-3 font-semibold">Hospital Name &amp; ID</th>
                <th className="pb-3 font-semibold">Tier</th>
                <th className="pb-3 font-semibold">ABDM Registry ID</th>
                <th className="pb-3 font-semibold">Assigned Hospital Admin</th>
                <th className="pb-3 font-semibold">Verification Status</th>
                <th className="pb-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 font-medium">
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4">
                    <strong className="text-slate-900 dark:text-white font-bold block text-sm">
                      {tenant.name}
                    </strong>
                    <span className="text-[11px] font-mono text-slate-400">
                      ID: {tenant.id} &bull; {tenant.address}
                    </span>
                  </td>

                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tenant.tier === 'ENTERPRISE'
                        ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                        : tenant.tier === 'REGIONAL'
                        ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {tenant.tier || 'ENTERPRISE'}
                    </span>
                  </td>

                  <td className="py-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                    {tenant.abdmFacilityId || 'IN-MH-74291'}
                  </td>

                  <td className="py-4">
                    <strong className="text-slate-900 dark:text-white block">{tenant.adminName || 'Dr. Aris Thorne'}</strong>
                    <span className="text-[11px] text-slate-400">{tenant.adminEmail}</span>
                  </td>

                  <td className="py-4">
                    {tenant.isVerified ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>VERIFIED &bull; ACTIVE</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        <AlertCircle className="w-3 h-3 text-amber-600" />
                        <span>PENDING VERIFICATION</span>
                      </span>
                    )}
                  </td>

                  <td className="py-4 text-right space-x-2">
                    <button
                      onClick={() => verifyHospital(tenant.id, !tenant.isVerified)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all cursor-pointer ${
                        tenant.isVerified 
                          ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                      }`}
                    >
                      {tenant.isVerified ? 'Suspend Access' : 'Verify Hospital'}
                    </button>

                    <button
                      onClick={() => jumpToHospitalAdmin(tenant)}
                      className="px-3 py-1.5 rounded-xl font-bold text-[11px] bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 cursor-pointer inline-flex items-center space-x-1"
                    >
                      <span>Jump to Admin</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision New Hospital Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-6 sm:p-8">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">Provision New Hospital</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Step 1 in MediSync 360 hierarchy: Create tenant &amp; assign Hospital Admin</p>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProvisionSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hospital / Clinic Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apollo Multi-Specialty Hospital"
                  value={hospitalName}
                  onChange={handleNameChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Tenant Slug / ID</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="apollo-specialty"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Subscription Tier</label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="ENTERPRISE">Enterprise Multi-Wing</option>
                    <option value="REGIONAL">Regional Specialist Centre</option>
                    <option value="CLINIC">Independent Clinic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Assigned Admin Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Sarah Jenkins"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hospital Admin Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="director@apollo.example.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">ABDM M3 Facility ID</label>
                  <input
                    type="text"
                    placeholder="e.g. IN-MH-99201"
                    value={abdmId}
                    onChange={(e) => setAbdmId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Initial Verification</label>
                  <select
                    value={isVerifiedInitial ? 'true' : 'false'}
                    onChange={(e) => setIsVerifiedInitial(e.target.value === 'true')}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="true">Verified &amp; Active</option>
                    <option value="false">Pending Verification Barrier</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Campus Address</label>
                <input
                  type="text"
                  placeholder="e.g. 100 Medical Enclave, Health City"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md shadow-indigo-500/20 cursor-pointer"
                >
                  Provision Hospital
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
