import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import InteractiveCalculator from './components/InteractiveCalculator';
import ApiDocumentation from './components/ApiDocumentation';
import { initialSupplies, endpoints, projectFolderTree, teamMembers } from './mockData';
import { SupplyItem } from './types';
import {
  FileText,
  FolderOpen,
  Compass,
  Code2,
  BookmarkCheck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Database,
  ArrowDownToLine,
  Leaf,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Monitor,
  Terminal
} from 'lucide-react';

export default function App() {
  // Shared state for the in-memory simulator database
  const [supplies, setSupplies] = useState<SupplyItem[]>(initialSupplies);

  // Active section tracking for Sidebar highlight
  const [activeSection, setActiveSection] = useState<string>('bab1');

  // Mobile sidebar visibility state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // References to track scrolling intersection
  const sectionRefs = {
    bab1: useRef<HTMLElement>(null),
    bab2: useRef<HTMLElement>(null),
    bab3: useRef<HTMLElement>(null),
    bab4: useRef<HTMLElement>(null),
    bab5: useRef<HTMLElement>(null),
  };


  // Reset database state back to clean initial values
  const handleResetDatabase = () => {
    setSupplies(JSON.parse(JSON.stringify(initialSupplies)));
  };

  // Custom IntersectionObserver scroll tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (const [sectionId, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const top = ref.current.offsetTop;
          const height = ref.current.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans text-slate-800 relative">
      {/* 2-Column Sidebar (Fixed Left) */}
      <Sidebar 
        activeSection={activeSection} 
        onNavigate={(sectionId) => setActiveSection(sectionId)} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area (Scrollable Right) */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10 overflow-y-auto space-y-8 md:space-y-12">
        {/* Top-level Academic header credentials details */}
        <Header onToggleSidebar={() => setIsSidebarOpen(true)} />

        {/* ==================== BAB 1: PENDAHULUAN & STUDI KASUS ==================== */}
        <section 
          id="bab1" 
          ref={sectionRefs.bab1}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 md:p-8 scroll-mt-6 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
              Bab I
            </span>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600 animate-pulse" />
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                PENDAHULUAN & STUDI KASUS (GREEN LOGISTICS)
              </h2>
            </div>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-medium">
            <p>
              Perkembangan industri logistik global saat ini tidak hanya dituntut untuk cepat dan ekonomis, 
              melainkan juga wajib berkompromi terhadap kelestarian lingkungan hidup. Integrasi sistem logistik modern harus mampu memediasi 
              pencatatan pergerakan kargo dengan akuntansi gas efek rumah kaca. Projek akhir <strong className="text-emerald-700 font-extrabold">ECO-TRACK SUPPLY API</strong> hadir sebagai solusi konkret 
              dalam menguji integrasi logistik berwawasan ekologis (<em className="italic text-emerald-800">Green Logistics Initiative</em>) berbasis standar internasional.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-5 space-y-3.5">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  Kalkulasi Otomatis Koefisien IPCC
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Sistem mengekstraksi parameter data berat (<code className="bg-white border rounded px-1 text-emerald-700 font-mono">weightKg</code>) 
                  dari manifest pengiriman yang tervalidasi secara real-time, lalu memfaktorkannya dengan koefisien gas buang global standar 
                  IPCC (Intergovernmental Panel on Climate Change) senilai <code className="bg-emerald-950 text-emerald-300 font-mono px-1.5 py-0.5 rounded font-bold">0.216</code>. 
                  Formula ini menghasilkan sumbangan besaran emisi karbon dioksida CO2 murni berbanding lurus dengan beban kargo logistik.
                </p>
              </div>

              <div className="bg-teal-50/40 border border-teal-100 rounded-xl p-5 space-y-3.5">
                <h4 className="text-xs font-bold text-teal-800 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  Modul Carbon Tax Assessment
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Selain pencatatan jumlah emisi karbon, API ini mengintegrasikan sanksi kompensasi lingkungan hidup 
                  berbentuk <strong className="text-teal-700 font-bold">Pajak Emisi Karbon (Carbon Tax Assessment)</strong> senilai 
                  <strong className="text-teal-700 font-mono bg-teal-50 px-1 py-0.5 rounded">Rp 30,- per kilogram gas buang CO2</strong>. 
                  Log pelaporan pajak ini dipetakan ke dalam database transaksi emisi dengan validasi relasional asing terhadap status status manifest pengiriman kargo.
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 font-medium">
              *Di bawah bimbingan penuh Bapak <strong className="text-slate-600">Rivansyah Suhendra, M.T.</strong>, 
              sistem ini didesain memenuhi kriteria fungsional integrasi industri, memisahkan fungsionalitas pendataan operasional logistik 
              (Manifest) dan kewajiban audit ekologis (Emissions audit trail) dalam model arsitektur 2-Endpoint Full CRUD.
            </p>

            {/* Injected Interactive Calculator inside Bab 1 to demonstrate proof of algorithm */}
            <div className="pt-4">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">DEMO FORMULA INTERAKTIF (IPCC CORE ENGINES)</span>
              <InteractiveCalculator />
            </div>
          </div>
        </section>

        {/* ==================== BAB 2: ARSITEKTUR SISTEM & FOLDER TREE ==================== */}
        <section 
          id="bab2" 
          ref={sectionRefs.bab2}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 md:p-8 scroll-mt-6 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
              Bab II
            </span>
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                ARSITEKTUR SISTEM & STRUKTUR FOLDER PROYEK
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">NODE.JS RUNTIME</span>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Menawarkan kinerja asinkronus non-blocking I/O yang andal untuk lalu lintas integrasi berskala masif.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">EXPRESS.JS FRAMEWORK</span>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Sebagai pengendali rute HTTP, menyusun middleware proteksi CORS, otorisasi token, serta error-handling terpusat.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">CONCURRENT IN-MEMORY DB</span>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Penyimpanan relasional tangguh yang mensimulasikan Foreign Key cascade constraint secara asinkron.
                </p>
              </div>
            </div>

            {/* Folder structure Tree with Dracula design theme */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-emerald-600" />
                  Hierarki File Struktur Proyek (eco-track-supply-api)
                </span>
                <span className="text-[9px] text-slate-400 font-mono">DRACULA COLOR THEME</span>
              </div>
              
              <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-sm">
                <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                  <span className="text-emerald-400 font-mono text-[10px] font-bold">➜ Project Workspace Directory Tree</span>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                  </div>
                </div>
                <pre className="p-5 overflow-x-auto text-emerald-200 font-mono text-xs leading-relaxed">
                  <code>{projectFolderTree}</code>
                </pre>
              </div>
            </div>

            <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-normal">
              <strong>Penjelasan Komponen Arsitektural:</strong> Seluruh modul bisnis logistik diletakkan secara terpisah, mematuhi kaidah OOP. <code className="text-emerald-700 bg-emerald-50 px-1 rounded font-mono text-[11px]">database.js</code> bertindak sebagai pangkalan data instan, sedangkan utilities <code className="text-emerald-700 bg-emerald-50 px-1 rounded font-mono text-[11px]">carbonCalculator.js</code> bertugas untuk melakukan kalkulasi berat dikali koefisien IPCC secara murni tanpa ada intervensi manual dari client.
            </p>
          </div>
        </section>

        {/* ==================== BAB 3: DAFTAR ENDPOINT API (TABEL LENGKAP) ==================== */}
        <section 
          id="bab3" 
          ref={sectionRefs.bab3}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 md:p-8 scroll-mt-6 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
              Bab III
            </span>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                DAFTAR ENDPOINT API (TABEL RUTE INTEGRASI)
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Sistem backend mencakup registrasi rute terpadu untuk menyajikan manajemen penuh terhadap manifest kiriman (<em className="italic">shipments</em>) 
              maupun berkas emisi lingkungan (<em className="italic">emissions</em>). Berikut adalah pemaparan kontrak integrasi seluruh rute API yang tersedia dalam platform:
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200/80 bg-white">
              <table className="w-full text-left font-medium border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    <th className="py-3 px-4">METHOD</th>
                    <th className="py-3 px-4">ENDPOINT ROUTE</th>
                    <th className="py-3 px-4">AUTH SCOPE</th>
                    <th className="py-3 px-4">KETERANGAN OPERASIONAL API</th>
                    <th className="py-3 px-4 text-center">STATUS SUCCESS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {endpoints.map((ep) => {
                    const isGet = ep.method === 'GET';
                    const isPost = ep.method === 'POST';
                    const isPut = ep.method === 'PUT';
                    const isDelete = ep.method === 'DELETE';

                    return (
                      <tr key={ep.path} className="hover:bg-slate-50/50 transition">
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-extrabold tracking-wide ${
                            isGet ? 'bg-emerald-100 text-emerald-800' :
                            isPost ? 'bg-orange-100 text-orange-800' :
                            isPut ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {ep.method}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-800 tracking-tight text-[11px]">
                          {ep.path}
                        </td>
                        <td className="py-3 px-4 font-sans text-slate-500 font-bold whitespace-nowrap text-[10px]">
                          {ep.auth}
                        </td>
                        <td className="py-3 px-4 text-slate-600 text-[11px] leading-relaxed">
                          {ep.description}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">
                            {ep.status.split(' ')[0]}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ==================== BAB 4: HASIL TESTING & DOKUMENTASI API ==================== */}
        <section 
          id="bab4" 
          ref={sectionRefs.bab4}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 md:p-8 scroll-mt-6 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                Bab IV
              </span>
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  HASIL TESTING & DOKUMENTASI API (2 ENDPOINT FULL CRUD)
                </h2>
              </div>
            </div>

            {/* In-Memory database tools reset to support better testing */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleResetDatabase}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-200 px-3 py-1.5 rounded-lg transition active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Database Praktikum</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-xs text-slate-600 leading-relaxed font-medium space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold uppercase tracking-wider text-[10px]">
                <Database className="w-3.5 h-3.5" />
                Sirkulasi Basis Data In-Memory Terkini
              </div>
              <p>
                Platform report ini memprogram state basis data tiruan secara langsung di browser Anda. Ketika Anda mengaktifkan tombol 
                <strong className="text-emerald-800"> "Uji Live Simulator"</strong> di bawah masing-masing praktik pengujian, database lokal akan mengupdate secara langsung.
              </p>
              <div className="flex flex-wrap gap-4 pt-1 font-mono text-[10px] text-slate-500 font-bold">
                <span className="bg-white px-2 py-1 rounded border">📦 Total Supplies (In-Memory Database): {supplies.length} records</span>
                <span className="bg-white px-2 py-1 rounded border">🍃 Audited Carbon Footprints: {supplies.filter(s => s.statusEmisi !== 'Pending Audit').length} items</span>
              </div>
            </div>

            <ApiDocumentation 
              supplies={supplies} 
              setSupplies={setSupplies} 
            />
          </div>
        </section>

        {/* ==================== BAB 5: KESIMPULAN AKHIR ==================== */}
        <section 
          id="bab5" 
          ref={sectionRefs.bab5}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-6 md:p-8 scroll-mt-6 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
            <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
              Bab V
            </span>
            <div className="flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
                KESIMPULAN & PENYATAAN KEBERHASILAN UAS
              </h2>
            </div>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed font-medium">
            <p>
              Berdasarkan rujukan 12 langkah praktikum integrasi sistem logistik hijau pada platform <strong className="text-emerald-800 font-bold">Eco-Track Supply API</strong>, 
              kami menyimpulkan bahwa sistem integrasi 2-Endpoint Full CRUD (Manifest Pengiriman & Pelaporan Audit Emisi Karbon) telah sepenuhnya 
              berhasil bekerja secara terstruktur, aman, serta siap dideploy untuk meniru standar dunia kerja logistik professional.
            </p>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-700" />
                Pemenuhan Parameter Standarisasi Maksimal UAS
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600 pl-1">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-slate-800">Integritas Relasional Asinkron Teruji:</strong> Sistem sukses mendeteksi kegagalan masukan kargo non-aktif pada audit emisi (FOREIGN KEY VIOLATION guard) dengan status 404, memvalidasi relasi kargo secara absolut.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-slate-800">Formulasi Otomatis Berbasis IPCC Standard:</strong> Perhitungan berat dikali konstanta 0.216 serta pencatatan denda Rp 30 per kg emisi telah terkonfirmasi tepat guna lewat simulator interaktif terintegrasi.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-slate-800">Cascade Deletion Efektif:</strong> Operasi penghapusan dokumen logistik berhasil meneruskan efek cascade dinamis guna memusnahkan log emisi sekunder secara aman tanpa korupsi berkas.
                  </div>
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-200/60 pt-5 text-center space-y-2 text-xs font-semibold text-slate-400">
              <p className="text-slate-500 font-bold leading-relaxed">
                Di bawah bimbingan penuh Bapak <span className="text-emerald-700">Rivansyah Suhendra, M.T.</span>, Kelompok 2 Universitas Teuku Umar mempersembahkan laporan ulasan integrasi sistem logistik berkelanjutan ini sebagai syarat kelayakan penilaian maksimal akademis.
              </p>
              <p className="text-[10px] font-mono mt-1 text-slate-400">
                Laporan diterbitkan & diverifikasi: 2026-06-12 UTU Campus. All Rights Reserved.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Back to Top floating-ish elements */}
        <footer className="text-center pt-8 border-t border-slate-200/50 pb-4 text-[10px] font-medium text-slate-400 select-none">
          <p>© 2026 Kelompok 2. Laporan Praktikum UAS Integrasi Sistem | Fakultas Teknik, Universitas Teuku Umar.</p>
          <p className="mt-1">Pristine typographic layout engineered under guidelines of rivansyah.com styling.</p>
        </footer>
      </main>
    </div>
  );
}
