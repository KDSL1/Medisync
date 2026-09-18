"use client";

import React from 'react';
import { MedicalReport } from '@/lib/types';
import { 
  Sparkles, 
  X, 
  HelpCircle, 
  HeartPulse, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowDownCircle, 
  ArrowUpCircle,
  FileText
} from 'lucide-react';

interface AIReportModalProps {
  report: MedicalReport | null;
  onClose: () => void;
}

export default function AIReportModal({ report, onClose }: AIReportModalProps) {
  if (!report) return null;

  const explanation = report.aiExplanation;

  const getUrgencyBadge = (urgency?: string) => {
    switch (urgency) {
      case 'ATTENTION_REQUIRED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">Requires Medical Attention</span>;
      case 'MODERATE':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">Moderate Findings &bull; Non-Urgent</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Normal Baseline &bull; Reassuring</span>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'HIGH':
        return <ArrowUpCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />;
      case 'LOW':
        return <ArrowDownCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />;
      case 'FLAGGED':
        return <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'HIGH':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">HIGH</span>;
      case 'LOW':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">LOW</span>;
      case 'FLAGGED':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">NOTED</span>;
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">NORMAL</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/30 border border-brand-400/40 flex items-center justify-center flex-shrink-0 text-brand-300">
              <Sparkles className="w-5 h-5 text-brand-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-300">
                  AI Medical Explainer
                </span>
                <span className="text-[10px] bg-brand-700/60 px-2 py-0.5 rounded text-slate-200 font-mono">
                  6th-Grade Plain English
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                {report.title}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {report.facilityName} &bull; Uploaded on {report.uploadDate}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-800">
          
          {/* Plain Summary Banner */}
          <div className="bg-brand-50/80 border border-brand-200 p-4 sm:p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>What This Report Means in Simple Terms</span>
              </span>
              {getUrgencyBadge(explanation?.urgencyLevel)}
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {explanation?.plainSummary || "Your report has been received and parsed for key metabolic parameters."}
            </p>
          </div>

          {/* Key Findings List */}
          {explanation?.findings && explanation.findings.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Key Numbers &amp; Observations Explained</span>
              </h4>

              <div className="space-y-2.5">
                {explanation.findings.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 hover:bg-white transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        <span className="text-xs font-bold text-slate-900">{item.metric}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-semibold text-slate-700">{item.value}</span>
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                    {item.referenceRange && (
                      <p className="text-[11px] text-slate-400 pl-6 mb-1">
                        Healthy reference: {item.referenceRange}
                      </p>
                    )}
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      {item.laymanExplanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Questions to Ask Doctor */}
          {explanation?.questionsForDoctor && explanation.questionsForDoctor.length > 0 && (
            <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2.5 flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Questions to Ask Your Doctor at Your Next Visit</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-950">
                {explanation.questionsForDoctor.map((q, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="font-bold text-amber-700">&bull;</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Lifestyle & Wellness Tips */}
          {explanation?.actionableTips && explanation.actionableTips.length > 0 && (
            <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2.5 flex items-center space-x-1.5">
                <HeartPulse className="w-4 h-4 text-emerald-600" />
                <span>Healthy Next Steps &amp; Suggestions</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-950">
                {explanation.actionableTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="font-bold text-emerald-600">&bull;</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer Alert */}
          <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start space-x-2">
            <ShieldAlert className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <p>
              {explanation?.disclaimer || "This AI explanation is an educational aid. Always discuss diagnostic reports directly with your healthcare provider."}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors"
          >
            Close Summary
          </button>
        </div>

      </div>
    </div>
  );
}
