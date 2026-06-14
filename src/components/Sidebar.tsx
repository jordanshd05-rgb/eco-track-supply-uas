import React, { useState, useEffect } from 'react';
import { teamMembers } from '../mockData';
import { 
  BookOpen, 
  Layers, 
  Compass, 
  Terminal, 
  Award, 
  User, 
  ArrowRight,
  Calculator,
  ChevronDown,
  GraduationCap,
  X
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ activeSection, onNavigate, isOpen = false, onClose }: SidebarProps) {
  const [openSectionId, setOpenSectionId] = useState<string | null>(null);

  const menuItems = [
    { id: 'bab1', label: 'BAB 1: PENDAHULUAN', icon: BookOpen, detail: 'Green Logistics & Carbon' },
    { id: 'bab2', label: 'BAB 2: ARSITEKTUR & STRUKTUR', icon: Layers, detail: 'Node.js, Express & Trees' },
    { id: 'bab3', label: 'BAB 3: DAFTAR ENDPOINT', icon: Compass, detail: 'Skema Rute Lengkap API' },
    { id: 'bab4', label: 'BAB 4: PRAKTIKUM & TESTING', icon: Terminal, detail: '12 Uji Coba Laporan Full CRUD' },
    { id: 'bab5', label: 'BAB 5: KESIMPULAN', icon: Award, detail: 'Pernyataan Keberhasilan UAS' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop overlay for mobile viewers */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-200"
          onClick={onClose}
        />
      )}

      {/* Navigation Drawer Menu */}
      <aside className={`
        fixed inset-y-0 left-0 w-[280px] bg-white border-r border-[#e2e8f0] h-screen flex flex-col z-50 select-none shrink-0
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:z-30
        ${isOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Custom UTU Shield Badge */}
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
  <img 
    src="/UTU.png" 
    alt="Logo UTU" 
    className="w-full h-full object-contain"
    onError={(e) => {
      // Jaga-jaga kalau path salah, teks placeholder tetap muncul
      e.currentTarget.style.display = 'none';
    }}
  />
</div>
              <div className="min-w-0">
                <h1 className="text-md font-extrabold text-[#059669] tracking-tight leading-none truncate">INTEGRASI SISTEM</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 truncate">Portfolio & Dokumentasi UAS</p>
              </div>
            </div>

            {/* Mobile close trigger button */}
            {onClose && (
              <button 
                onClick={onClose}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition shrink-0"
                aria-label="Close Navigation Menu"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="mt-3.5 pt-3 border-t border-slate-100">
            <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">MATA KULIAH</h2>
            <p className="text-xs font-semibold text-slate-700 mt-1">Integrasi Sistem (3 SKS) - IT</p>
          </div>
        </div>

        {/* Navigation Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          <div>
            <h3 className="px-2 text-[11px] font-bold text-[#059669] uppercase tracking-widest mb-4">NAVIGASI LAPORAN</h3>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full text-left px-3 py-2 rounded transition-all duration-150 flex items-start gap-2.5 group relative ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 font-semibold'
                        : 'text-slate-600 hover:bg-emerald-50/50 hover:text-emerald-700'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <div className="min-w-0">
                      <p className="text-xs font-medium">{item.label}</p>
                      <p className="text-[9px] text-slate-400 tracking-tight mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Lecturer Info */}
          <div className="px-2">
            <h4 className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-3">DOSEN PENGAMPU</h4>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs border border-slate-200 shrink-0">
                RS
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-700 leading-tight truncate">Rivansyah Suhendra, S.Kom., M.T</p>
                <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">NIDN. 0006099502</p>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-emerald-700 font-semibold group cursor-pointer hover:text-emerald-800">
              <span>Lihat Profil Akademis</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Team Members in Sidebar */}
          <div className="pt-2">
            <h3 className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">ANGGOTA KELOMPOK 4</h3>
            <div className="space-y-1.5">
              {teamMembers.map((member, i) => (
                <div key={member.nim} className="px-2 py-1.5 bg-white hover:bg-slate-50/50 rounded border border-slate-100 transition-all flex items-start gap-2">
                  <div className="w-4 h-4 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center text-[9px] font-mono font-bold mt-0.5 shrink-0 animate-fade-in">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-700 truncate leading-tight">{member.name}</p>
                    <p className="text-[9px] font-mono text-slate-400 leading-none mt-0.5">{member.nim}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* University Branding Bottom footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 shrink-0">
          <p className="text-[10px] font-extrabold text-[#059669] tracking-tight uppercase">UNIVERSITAS TEUKU UMAR</p>
          <p className="text-[9px] text-slate-400 font-medium leading-relaxed uppercase">Fakultas Teknik | TI</p>
        </div>
      </aside>
    </>
  );
}
