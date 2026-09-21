import React from 'react';
import Link from 'next/link';
import { Stethoscope, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6 shadow-sm">
        <Stethoscope className="w-8 h-8" />
      </div>
      <span className="text-xs uppercase font-mono font-semibold tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800 mb-3">
        404 — Clinical Route Not Found
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
        Page Not Found
      </h1>
      <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
        The clinical portal, patient record, or operational view you are attempting to access does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to MediSync 360 Hub
      </Link>
    </div>
  );
}
