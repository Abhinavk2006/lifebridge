'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { formatINR } from '@/utils/formatters';
import { Building2, ArrowRight, ShieldCheck, Search, MapPin, Phone, Award, Sparkles, Download, CheckCircle2 } from 'lucide-react';

export default function OrganizationsDirectoryPage() {
  const { institutions } = useLifeBridgeStore();
  const [filterSector, setFilterSector] = useState<string>('all');
  const [filterCity, setFilterCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Indian Location & Branch Data Map
  const indianLocations = [
    { city: 'Mumbai', court: 'High Court of Judicature at Bombay', branch: 'Fort Main Branch (IFSC: SBIN0000300)', officer: 'Vikram Malhotra (AGM Compliance)' },
    { city: 'Bengaluru', court: 'High Court of Karnataka, Bengaluru', branch: 'MG Road Main Branch (IFSC: HDFC0000009)', officer: 'Ananya Deshmukh (Chief Registrar)' },
    { city: 'Delhi', court: 'High Court of Delhi, New Delhi', branch: 'Connaught Place Branch (IFSC: ICIC0000007)', officer: 'Rajesh Sharma (Nodal Officer)' },
    { city: 'Chennai', court: 'High Court of Judicature at Madras', branch: 'Anna Salai Main Branch (IFSC: UTIB0000005)', officer: 'K. Sundaram (Senior Manager)' }
  ];

  const filteredInsts = institutions.filter(
    (inst) =>
      (filterSector === 'all' || inst.sector === filterSector) &&
      (inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.accountNumberMasked.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* High-Impact Indian Banking Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-700 min-h-[260px] flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/indian_bank_manager.png"
            alt="Indian Institutional Registry"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b49] via-[#002b49]/90 to-transparent" />
        </div>

        <div className="relative z-10 p-8 w-full flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#B8935B]/20 text-[#B8935B] border border-[#B8935B]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <MapPin className="w-4 h-4 text-[#B8935B]" />
              <span>PAN-INDIA BANK BRANCH & REGISTRY NETWORK</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 shrink-0 bg-white/10 p-1.5 rounded-2xl border border-white/20">
                <Image
                  src="/ashoka_legal_seal.png"
                  alt="High Court Seal"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-tight text-white">
                  Organizations & Institutional Registry
                </h1>
                <p className="text-xs text-blue-200 font-mono mt-0.5">
                  28+ RBI-regulated banks, IRDAI insurers, EPFO pension trusts & sub-registrar offices across India.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/dashboard/export-certificate"
              className="px-5 py-2.5 bg-[#B8935B] text-[#002b49] font-bold text-xs font-mono rounded-xl hover:bg-white transition flex items-center gap-2 shadow-sm uppercase tracking-wider"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT STATEMENT (PDF)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Indian Location & City Jurisdiction Selector */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="font-serif font-bold text-sm text-[#002b49] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#004c8c]" />
            <span>Select Indian Jurisdiction & Branch Location</span>
          </span>
          <span className="text-xs font-mono text-slate-500">Active Location: Mumbai & Delhi Benches</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['all', 'Mumbai', 'Bengaluru', 'Delhi', 'Chennai', 'Kolkata'].map((city) => (
            <button
              key={city}
              onClick={() => setFilterCity(city)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-1.5 ${
                filterCity === city
                  ? 'bg-[#004c8c] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#B8935B]" />
              <span>{city === 'all' ? 'All Indian Locations' : city}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sector Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {['all', 'Banking', 'Insurance', 'Pension', 'Utilities', 'Government'].map((sector) => (
            <button
              key={sector}
              onClick={() => setFilterSector(sector)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterSector === sector
                  ? 'bg-[#004c8c] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sector === 'all' ? 'All Sectors' : sector}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Institution, IFSC, Branch..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#004c8c]"
          />
        </div>
      </div>

      {/* Institutions Grid with Indian Location Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInsts.map((inst, idx) => {
          const loc = indianLocations[idx % indianLocations.length];

          return (
            <div key={inst.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-blue-50 text-[#004c8c] text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                    {inst.sector}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    inst.status === 'settled' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {inst.status.replace('_', ' ')}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">{inst.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Account: <strong className="text-slate-800">{inst.accountNumberMasked}</strong>
                  </p>
                </div>

                {/* Indian Location & Branch Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1.5 font-sans">
                  <div className="flex items-center gap-1.5 text-[#004c8c] font-semibold text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-[#B8935B] shrink-0" />
                    <span>{loc.city} &bull; {loc.branch}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-mono">
                    BENCH: {loc.court}
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>Nodal Officer: <strong>{loc.officer}</strong></span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Verified Value</span>
                    <span className="font-bold text-slate-900">{formatINR(inst.estimatedValue)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Penalty Fee Saved</span>
                    <span className="font-bold text-emerald-700">+{formatINR(45000)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/dashboard/organizations/org-301"
                className="w-full py-2.5 bg-[#004c8c] hover:bg-[#002b49] text-white text-xs font-bold font-mono rounded-xl transition flex items-center justify-center gap-2 shadow-xs uppercase tracking-wider"
              >
                <span>OPEN NEGOTIATION ROOM</span>
                <ArrowRight className="w-4 h-4 text-[#B8935B]" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
