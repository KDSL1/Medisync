"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { 
  ArrowLeft, 
  Receipt, 
  Printer, 
  CheckCircle2, 
  Clock, 
  Building, 
  User, 
  CreditCard,
  Search
} from 'lucide-react';
import { Appointment } from '@/lib/types';

export default function ReceptionBillingPage() {
  const { appointments, activeTenant } = useStore();

  const [selectedApt, setSelectedApt] = useState<Appointment>(appointments[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAppointments = appointments.filter(a => 
    a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.tokenNumber && a.tokenNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const subtotal = selectedApt ? selectedApt.amount : 0;
  const facilityFee = 10;
  const total = subtotal + facilityFee;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <Link
            href="/reception"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Queue Desk</span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Consultation Billing &amp; Invoices
          </h1>
          <p className="text-xs text-slate-500">
            {activeTenant.name} &bull; Front-desk consultation fee collection &amp; printable receipts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: List of Appointments */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Select Patient Invoice
            </h3>

            <div className="relative mb-3">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search patient or token..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredAppointments.map((apt) => {
                const isSelected = selectedApt?.id === apt.id;
                return (
                  <button
                    key={apt.id}
                    onClick={() => setSelectedApt(apt)}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                      isSelected
                        ? 'bg-amber-50 border-amber-300 shadow-sm'
                        : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="font-bold text-slate-900">{apt.patientName}</strong>
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200">
                        {apt.tokenNumber || 'NO TOKEN'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 mt-1">
                      <span>{apt.doctorName}</span>
                      <strong className="text-slate-800">{activeTenant.currency}{apt.amount}</strong>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Printable Official Invoice Receipt */}
        <div className="lg:col-span-2">
          {selectedApt ? (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg print:shadow-none print:border-none">
              
              {/* Action bar (Hidden when printing) */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 print:hidden">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Invoice Preview
                </span>
                <button
                  onClick={() => window.print()}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
              </div>

              {/* Hospital Header */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-6 mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    {activeTenant.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">{activeTenant.address}</p>
                  <p className="text-xs text-slate-500">{activeTenant.phone} &bull; {activeTenant.email}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-700">
                    TAX INVOICE
                  </span>
                  <p className="text-xs font-mono text-slate-500 mt-2">
                    #INV-2026-0918-{selectedApt.id.slice(-4)}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Date: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Patient & Doctor Metadata Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl mb-6">
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Billed To:</span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedApt.patientName}</p>
                  <p className="text-slate-500">Patient ID: {selectedApt.patientId}</p>
                  {selectedApt.tokenNumber && (
                    <p className="text-amber-800 font-bold mt-1">OPD Token: {selectedApt.tokenNumber}</p>
                  )}
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase text-[10px]">Medical Service:</span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedApt.doctorName}</p>
                  <p className="text-slate-500">Department: {selectedApt.department}</p>
                  <p className="text-slate-500 mt-1">Time Slot: {selectedApt.timeSlot}</p>
                </div>
              </div>

              {/* Line Items Table */}
              <table className="w-full text-xs mb-6">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] text-left">
                    <th className="pb-2">Description</th>
                    <th className="pb-2 text-center">Qty</th>
                    <th className="pb-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                  <tr>
                    <td className="py-3">
                      <strong>Specialist Outpatient Consultation</strong>
                      <p className="text-[11px] text-slate-400">Clinical examination &amp; prescription management</p>
                    </td>
                    <td className="py-3 text-center">1</td>
                    <td className="py-3 text-right font-bold">{activeTenant.currency}{selectedApt.amount}</td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      <strong>Digital Record Maintenance &amp; Health Locker Facility</strong>
                      <p className="text-[11px] text-slate-400">Lifelong timeline hosting &amp; AI explainer access</p>
                    </td>
                    <td className="py-3 text-center">1</td>
                    <td className="py-3 text-right font-bold">{activeTenant.currency}{facilityFee}</td>
                  </tr>
                </tbody>
              </table>

              {/* Totals Calculation */}
              <div className="border-t border-slate-200 pt-4 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900">{activeTenant.currency}{subtotal + facilityFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (GST / VAT 0% on Outpatient Care):</span>
                  <span>{activeTenant.currency}0.00</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-2">
                  <span>Grand Total:</span>
                  <span className="text-base text-emerald-700">{activeTenant.currency}{total}</span>
                </div>
              </div>

              {/* Payment Status Badge */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Paid in Full &bull; Cash/UPI/Card POS</span>
                </div>
                <span className="text-slate-400 text-[11px] italic">
                  Thank you for visiting {activeTenant.name}
                </span>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-400 text-xs">
              Select an appointment from the left list to view invoice.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
