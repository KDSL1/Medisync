"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { MedicalReport } from '@/lib/types';
import { explainMedicalReport } from '@/lib/ai-explainer';
import AIReportModal from '@/components/AIReportModal';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  Calendar, 
  Building, 
  Filter, 
  Plus, 
  Loader2,
  FileCode,
  ShieldAlert
} from 'lucide-react';

export default function PatientReportsPage() {
  const { currentPatient, reports, uploadReport, activeRole, setActiveRole, isAuthorizedForPatientPortal } = useStore();

  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Security Access Guard
  if (!isAuthorizedForPatientPortal()) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200 shadow-lg">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          Security Protocol &bull; Restricted PHI Access
        </span>
        <h2 className="text-2xl font-black text-slate-900 mt-3">
          Document Vault Access Restricted
        </h2>
        <p className="text-xs text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
          Diagnostic reports and scans are quarantined under patient privacy regulations. Only verified Patients and attending Physicians may inspect these records. Current session: <strong>{activeRole}</strong>.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveRole('PATIENT')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all"
          >
            Switch to Patient View
          </button>
          <button
            onClick={() => setActiveRole('DOCTOR')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all"
          >
            Switch to Doctor View
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'BLOOD_TEST' | 'RADIOLOGY' | 'CARDIOLOGY' | 'PATHOLOGY'>('BLOOD_TEST');
  const [facilityName, setFacilityName] = useState('Metro Diagnostics Central Lab');
  const [rawText, setRawText] = useState('');

  const patientReports = reports.filter(r => r.patientId === currentPatient.id);
  const filteredReports = activeCategory === 'ALL' 
    ? patientReports 
    : patientReports.filter(r => r.category === activeCategory);

  // Helper to load realistic sample text for fast demo
  const loadPreset = (preset: 'LIPID' | 'XRAY' | 'GLUCOSE') => {
    if (preset === 'LIPID') {
      setTitle('Fast Lipid Panel & Triglyceride Analysis');
      setCategory('BLOOD_TEST');
      setFacilityName('Metro Diagnostics Central Lab');
      setRawText(`FASTING LIPID PROFILE
Total Cholesterol: 242 mg/dL [Reference: < 200 mg/dL] - HIGH
Triglycerides: 210 mg/dL [Reference: < 150 mg/dL] - HIGH
HDL Cholesterol: 38 mg/dL [Reference: > 40 mg/dL] - LOW
LDL Cholesterol: 162 mg/dL [Reference: < 100 mg/dL] - HIGH
Risk Ratio: 6.3 - ELEVATED`);
    } else if (preset === 'XRAY') {
      setTitle('Chest Radiograph PA View');
      setCategory('RADIOLOGY');
      setFacilityName('Metro Imaging Center');
      setRawText(`CHEST PA VIEW RADIOGRAPH
Lungs: Clear bilateral expansion. Mild peribronchial thickening noted. No focal lobar consolidation or pneumothorax.
Pleural Spaces: Normal, no effusion.
Heart: Normal transverse cardiac diameter, CTR < 0.50.`);
    } else {
      setTitle('Glycated Hemoglobin (HbA1c) & Fasting Glucose');
      setCategory('BLOOD_TEST');
      setFacilityName('City Endocrine Lab');
      setRawText(`DIABETES MONITORING PANEL
Fasting Blood Sugar: 138 mg/dL [Reference: 70 - 99 mg/dL] - HIGH
HbA1c (Glycated Hemoglobin): 7.2% [Reference: < 5.7% Normal, > 6.5% Diabetic] - HIGH
Estimated Average Glucose (eAG): 160 mg/dL`);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !rawText) return;

    setIsUploading(true);
    try {
      // Run AI Explainer on the raw report text
      const aiExplanation = await explainMedicalReport(title, rawText);

      // Save to store
      const newReport = uploadReport({
        patientId: currentPatient.id,
        title,
        category,
        facilityName,
        rawFindingsText: rawText,
        aiExplanation,
      });

      setShowUploadModal(false);
      setTitle('');
      setRawText('');
      setSelectedReport(newReport); // Automatically open AI summary for immediate delight!
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <Link
            href="/patient"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Health Timeline</span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Personal Medical Document Vault
          </h1>
          <p className="text-xs text-slate-500">
            Secure repository of all blood tests, radiology scans, and pathology reports for {currentPatient.name}
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
        >
          <Upload className="w-4 h-4" />
          <span>Upload &amp; Explain New Report</span>
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 mb-6 overflow-x-auto text-xs font-semibold">
        {['ALL', 'BLOOD_TEST', 'RADIOLOGY', 'CARDIOLOGY', 'PATHOLOGY'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeCategory === cat
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {cat === 'ALL' ? 'All Documents' : cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No medical reports found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Upload your first lab test or radiology scan to generate an AI-powered plain English summary.
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="mt-4 inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
          >
            <Plus className="w-4 h-4" />
            <span>Upload First Report</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-sm transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200 uppercase tracking-wider">
                    {report.category.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {report.uploadDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {report.title}
                </h3>

                <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{report.facilityName}</span>
                </p>

                {/* Raw snippet preview */}
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 font-mono text-[11px] text-slate-600 line-clamp-3">
                  {report.rawFindingsText}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>AI Analyzed</span>
                </span>

                <button
                  onClick={() => setSelectedReport(report)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-200" />
                  <span>Explain with AI</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload New Report Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl p-6 sm:p-8">
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Upload &amp; Analyze Report</h3>
                <p className="text-xs text-slate-500">The clinical AI will translate findings into plain English</p>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Quick Demo Pre-fills */}
            <div className="mb-4 bg-brand-50 p-3 rounded-xl border border-brand-100">
              <span className="text-[10px] font-bold text-brand-800 uppercase tracking-wider block mb-1.5">
                Quick Demo Presets (Click to autofill):
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => loadPreset('LIPID')}
                  className="text-[11px] px-2.5 py-1 rounded bg-white text-brand-700 border border-brand-200 hover:bg-brand-100 font-medium"
                >
                  Lipid Profile
                </button>
                <button
                  type="button"
                  onClick={() => loadPreset('XRAY')}
                  className="text-[11px] px-2.5 py-1 rounded bg-white text-brand-700 border border-brand-200 hover:bg-brand-100 font-medium"
                >
                  Chest X-Ray
                </button>
                <button
                  type="button"
                  onClick={() => loadPreset('GLUCOSE')}
                  className="text-[11px] px-2.5 py-1 rounded bg-white text-brand-700 border border-brand-200 hover:bg-brand-100 font-medium"
                >
                  HbA1c Blood Sugar
                </button>
              </div>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Report Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fasting Lipid Profile or Chest X-Ray"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-brand-500"
                  >
                    <option value="BLOOD_TEST">Blood Test</option>
                    <option value="RADIOLOGY">Radiology / Imaging</option>
                    <option value="CARDIOLOGY">Cardiology / ECG</option>
                    <option value="PATHOLOGY">Pathology / Biopsy</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Diagnostic Facility</label>
                  <input
                    type="text"
                    required
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Report Findings / Doctor Impressions Text
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Paste or type lab values, impressions, or diagnostic text here..."
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm transition-all disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>AI Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Save &amp; Explain Report</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* AI Report Modal */}
      <AIReportModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />

    </div>
  );
}
