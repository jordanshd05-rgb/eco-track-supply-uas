import React from 'react';
import { teamMembers } from '../mockData';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="bg-white border border-[#e2e8f0] rounded-xl px-4 sm:px-6 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 select-none z-20 shadow-sm">
      <div className="flex items-start gap-3">
        {/* Hamburger Menu on mobile */}
        <button 
          onClick={onToggleSidebar} 
          className="lg:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition duration-150 shrink-0"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-600 uppercase tracking-tight bg-emerald-50 px-2 py-0.5 rounded shrink-0">
              Integrasi Sistem (3 SKS)
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">
              Semester Genap T.A. 2025/2026
            </span>
          </div>
          <h1 className="text-xs sm:text-sm md:text-base font-extrabold text-slate-800 uppercase tracking-tight leading-snug">
            LAPORAN PROJEK AKHIR: ECO-TRACK SUPPLY API
          </h1>
        </div>
      </div>
      
      <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
        {/* Table of Members with NIM */}
        <div className="hidden sm:block">
          <table className="text-[9px] text-slate-600 leading-tight">
            <thead>
              <tr>
                <th className="pr-4 pb-1 text-left font-bold text-emerald-700 text-[9px] sm:text-[10px]">KELOMPOK 4 (TIF)</th>
                <th className="pb-1 text-right font-bold text-slate-400 text-[9px]">NIM</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((m, idx) => (
                <tr key={m.nim}>
                  <td className="pr-10 font-semibold text-slate-700">{m.name}</td>
                  <td className="font-mono text-right text-slate-400 font-medium">{m.nim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>
        
        <div className="text-right">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Semester</div>
          <div className="text-xs font-extrabold text-slate-700">Genap (UTU)</div>
        </div>
      </div>
    </header>
  );
}

