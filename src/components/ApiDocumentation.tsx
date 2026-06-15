import React, { useState } from 'react';
import { practiceSteps, initialSupplies } from '../mockData';
import { PracticeStep, SupplyItem } from '../types';
import { 
  Terminal, 
  Play, 
  Check, 
  Copy, 
  Send, 
  AlertCircle, 
  Database, 
  RefreshCw,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  Key
} from 'lucide-react';

interface ApiDocumentationProps {
  supplies: SupplyItem[];
  setSupplies: React.Dispatch<React.SetStateAction<SupplyItem[]>>;
}

export default function ApiDocumentation({
  supplies,
  setSupplies
}: ApiDocumentationProps) {
  // Clipboard copying state
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  
  // Interactive sandbox state for each practice card
  const [sandboxInputs, setSandboxInputs] = useState<Record<string, string>>({
    'step-4': JSON.stringify({
      id: "TRK-003",
      namaBarang: "Palet Kayu Sertifikasi FSC",
      vendor: "PT Logistik Hijau Nusantara",
      jumlah: 350,
      lokasiGudang: "Gudang Distribusi Barat"
    }, null, 2),
    'step-5': JSON.stringify({
      jumlah: 450,
      lokasiGudang: "Gudang Pusat Meulaboh"
    }, null, 2),
    'step-9': JSON.stringify({
      id: "INVALID-ID",
      namaBarang: "Kardus Bekas",
      statusEmisi: "Low Carbon",
      jejakKarbonKg: -10
    }, null, 2),
    'step-10': JSON.stringify({
      id: "TRK-004",
      namaBarang: "Kertas Selongsong",
      statusEmisi: "Low Carbon",
      jejakKarbonKg: 45.2
    }, null, 2),
    'step-11': JSON.stringify({
      statusEmisi: "Net Zero Emission",
      jejakKarbonKg: 0.0
    }, null, 2)
  });

  // State to hold output results of live virtual API executions
  const [sandboxOutputs, setSandboxOutputs] = useState<Record<string, { status: number; body: string; timeMs: number }>>({});
  const [activeTab, setActiveTab] = useState<'all' | 'shipment' | 'emission'>('all');

  const filteredSteps = practiceSteps.filter(step => {
    if (activeTab === 'all') return true;
    if (activeTab === 'shipment') return step.endpoint.includes('/shipments');
    if (activeTab === 'emission') return step.endpoint.includes('/tracks');
    return true;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInputChange = (stepId: string, value: string) => {
    setSandboxInputs(prev => ({ ...prev, [stepId]: value }));
  };

  // Live in-memory Express / API Virtual Simulator Engine
  const executeSandboxSimulation = (step: PracticeStep) => {
    const startTime = performance.now();
    let status = 200;
    let responseBody = "";

    try {
      const inputJson = sandboxInputs[step.id] ? JSON.parse(sandboxInputs[step.id]) : null;

      switch (step.id) {
        case 'step-1': // GET /api/shipments - Scenario Error (Non x-api-key)
          status = 401;
          responseBody = JSON.stringify({
            success: false,
            message: "Unauthorized: x-api-key header is missing or invalid!"
          }, null, 2);
          break;

        case 'step-2': // GET /api/shipments - Success
          status = 200;
          // Filter to show only shipment/physical related properties
          const physicalShipments = supplies.map(s => ({
            id: s.id,
            namaBarang: s.namaBarang,
            vendor: s.vendor,
            kategori: s.kategori ?? "Logistics Unit",
            jumlah: s.jumlah,
            lokasiGudang: s.lokasiGudang
          }));
          responseBody = JSON.stringify(physicalShipments, null, 2);
          break;

        case 'step-3': // GET /api/shipments/:id
          {
            const targetId = "TRK-001";
            const found = supplies.find(s => s.id === targetId);
            if (found) {
              status = 200;
              responseBody = JSON.stringify({
                success: true,
                data: {
                  id: found.id,
                  namaBarang: found.namaBarang,
                  vendor: found.vendor,
                  kategori: found.kategori ?? "Packaging",
                  jumlah: found.jumlah,
                  lokasiGudang: found.lokasiGudang
                },
                message: "Shipment info retrieved successfully."
              }, null, 2);
            } else {
              status = 404;
              responseBody = JSON.stringify({
                success: false,
                message: `Shipment with ID '${targetId}' was not found in the Database.`
              }, null, 2);
            }
          }
          break;

        case 'step-4': // POST /api/shipments
          if (!inputJson || !inputJson.id || !inputJson.namaBarang || !inputJson.vendor || inputJson.jumlah === undefined) {
            status = 400;
            responseBody = JSON.stringify({
              success: false,
              message: "Bad Request. Required parameters: 'id', 'namaBarang', 'vendor', 'jumlah' must be present."
            }, null, 2);
          } else {
            const newItem: SupplyItem = {
              id: inputJson.id,
              namaBarang: inputJson.namaBarang,
              vendor: inputJson.vendor,
              kategori: inputJson.kategori ?? "Distribution Unit",
              jumlah: Number(inputJson.jumlah),
              statusEmisi: "Pending Audit",
              jejakKarbonKg: 0,
              lokasiGudang: inputJson.lokasiGudang ?? "Gudang Distribusi Barat",
              createdAt: new Date().toISOString()
            };
            // Append or replace if already exists to keep it robust
            setSupplies(prev => {
              const cleaned = prev.filter(s => s.id !== newItem.id);
              return [...cleaned, newItem];
            });
            status = 201;
            responseBody = JSON.stringify({
              success: true,
              message: "New shipment manifest successfully registered",
              data: newItem
            }, null, 2);
          }
          break;

        case 'step-5': // PUT /api/shipments/:id
          {
            const targetId = "TRK-003";
            const found = supplies.find(s => s.id === targetId);
            if (!found) {
              status = 404;
              responseBody = JSON.stringify({
                success: false,
                message: `Update target shipment '${targetId}' not found in database.`
              }, null, 2);
            } else {
              const updatedList = supplies.map(s => {
                if (s.id === targetId) {
                  return {
                    ...s,
                    jumlah: inputJson.jumlah !== undefined ? Number(inputJson.jumlah) : s.jumlah,
                    lokasiGudang: inputJson.lokasiGudang || s.lokasiGudang
                  };
                }
                return s;
              });
              setSupplies(updatedList);
              const updatedItem = updatedList.find(s => s.id === targetId);
              status = 200;
              responseBody = JSON.stringify({
                success: true,
                message: "Shipment physical details successfully updated",
                data: updatedItem
              }, null, 2);
            }
          }
          break;

        case 'step-6': // DELETE /api/shipments/:id
          {
            const targetId = "TRK-003";
            const found = supplies.find(s => s.id === targetId);
            if (!found) {
              status = 404;
              responseBody = JSON.stringify({
                success: false,
                message: `Delete target shipment '${targetId}' could not be located.`
              }, null, 2);
            } else {
              setSupplies(prev => prev.filter(s => s.id !== targetId));
              status = 200;
              responseBody = JSON.stringify({
                success: true,
                message: `Shipment ${targetId} has been successfully removed from storage.`,
                deletedId: targetId
              }, null, 2);
            }
          }
          break;

        case 'step-7': // GET /api/tracks
          status = 200;
          // Filter to show only tracks/carbon-related properties
          const carbonTracks = supplies.map(s => ({
            id: s.id,
            namaBarang: s.namaBarang,
            statusEmisi: s.statusEmisi,
            jejakKarbonKg: s.jejakKarbonKg
          }));
          responseBody = JSON.stringify(carbonTracks, null, 2);
          break;

        case 'step-8': // GET /api/tracks/:id
          {
            const targetId = "TRK-001";
            const found = supplies.find(s => s.id === targetId);
            if (found) {
              status = 200;
              responseBody = JSON.stringify({
                success: true,
                data: {
                  id: found.id,
                  namaBarang: found.namaBarang,
                  statusEmisi: found.statusEmisi,
                  jejakKarbonKg: found.jejakKarbonKg
                }
              }, null, 2);
            } else {
              status = 404;
              responseBody = JSON.stringify({
                success: false,
                message: `Carbon tracking audit target '${targetId}' was not found.`
              }, null, 2);
            }
          }
          break;

        case 'step-9': // POST /api/tracks - Error Scenario
          {
            if (!inputJson || !inputJson.id || inputJson.id === 'INVALID-ID' || (inputJson.jejakKarbonKg !== undefined && inputJson.jejakKarbonKg < 0)) {
              status = 400;
              responseBody = JSON.stringify({
                success: false,
                error: "VALIDATION_ERROR",
                message: "ID format must be TRK-XXX and emission output cannot be negative."
              }, null, 2);
            } else {
              status = 200;
              responseBody = JSON.stringify({
                success: true,
                message: "Payload validated successfully (contradicts error-validation scenario). Try editing inputs with ID 'INVALID-ID' or negative emissions.",
                data: inputJson
              }, null, 2);
            }
          }
          break;

        case 'step-10': // POST /api/tracks - Success Scenario
          if (!inputJson || !inputJson.id || !inputJson.namaBarang) {
            status = 400;
            responseBody = JSON.stringify({
              success: false,
              message: "Missing 'id' or 'namaBarang' parameters for Carbon Track registration."
            }, null, 2);
          } else {
            const newTrack: SupplyItem = {
              id: inputJson.id,
              namaBarang: inputJson.namaBarang,
              vendor: "Pending Registry",
              kategori: "Biodegradable Unit",
              jumlah: 0,
              statusEmisi: inputJson.statusEmisi || "Low Carbon",
              jejakKarbonKg: Number(inputJson.jejakKarbonKg ?? 0),
              lokasiGudang: "Unassigned Lokasi",
              createdAt: new Date().toISOString()
            };
            setSupplies(prev => {
              const cleaned = prev.filter(s => s.id !== newTrack.id);
              return [...cleaned, newTrack];
            });
            status = 201;
            responseBody = JSON.stringify({
              success: true,
              message: "New sustainability track record filed successfully",
              data: newTrack
            }, null, 2);
          }
          break;

        case 'step-11': // PUT /api/tracks/:id
          {
            const targetId = "TRK-001";
            const found = supplies.find(s => s.id === targetId);
            if (!found) {
              status = 404;
              responseBody = JSON.stringify({
                success: false,
                message: `Carbon audit target '${targetId}' could not be located.`
              }, null, 2);
            } else {
              const updatedList = supplies.map(s => {
                if (s.id === targetId) {
                  return {
                    ...s,
                    statusEmisi: inputJson.statusEmisi || s.statusEmisi,
                    jejakKarbonKg: inputJson.jejakKarbonKg !== undefined ? Number(inputJson.jejakKarbonKg) : s.jejakKarbonKg
                  };
                }
                return s;
              });
              setSupplies(updatedList);
              const updatedItem = updatedList.find(s => s.id === targetId);
              status = 200;
              responseBody = JSON.stringify({
                success: true,
                message: "Audit carbon emissions and status successfully registered",
                data: updatedItem
              }, null, 2);
            }
          }
          break;

        case 'step-12': // DELETE /api/tracks/:id
          {
            const targetId = "TRK-001";
            const found = supplies.find(s => s.id === targetId);
            if (!found) {
              status = 404;
              responseBody = JSON.stringify({
                success: false,
                message: `Audit target '${targetId}' could not be found to delete.`
              }, null, 2);
            } else {
              // The spec says "Mengatur ulang (reset) atau menghapus log emisi barang kembali ke default ("Pending Audit", karbon: 0)"
              const updatedList = supplies.map(s => {
                if (s.id === targetId) {
                  return {
                    ...s,
                    statusEmisi: "Pending Audit",
                    jejakKarbonKg: 0
                  };
                }
                return s;
              });
              setSupplies(updatedList);
              const updatedItem = updatedList.find(s => s.id === targetId);
              status = 200;
              responseBody = JSON.stringify({
                success: true,
                message: `Carbon status for ${targetId} has been reset to default Pending Audit.`,
                data: updatedItem
              }, null, 2);
            }
          }
          break;

        default:
          status = 200;
          responseBody = "No specific simulation mapped.";
      }
    } catch (e: any) {
      status = 400;
      responseBody = JSON.stringify({
        error: "JSON_PARSING_FAILED",
        message: "Request input isn't a valid JSON structure.",
        details: e.message
      }, null, 2);
    }

    const duration = Math.round(performance.now() - startTime);
    setSandboxOutputs(prev => ({
      ...prev,
      [step.id]: {
        status,
        body: responseBody,
        timeMs: duration
      }
    }));
  };

  const getMethodBadgeColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-emerald-500 text-white';
      case 'POST': return 'bg-orange-500 text-white';
      case 'PUT': return 'bg-blue-500 text-white';
      case 'DELETE': return 'bg-red-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const getStatusBadgeColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-emerald-400 bg-emerald-950/40 border-emerald-900';
    if (status >= 400) return 'text-red-400 bg-red-950/40 border-red-900';
    return 'text-blue-400 bg-blue-950/40 border-blue-900';
  };

  return (
    <div className="space-y-6">
      {/* Search & Tabs control */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row shadow-slate-100 sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-slate-800">Filter Modul Utama:</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 self-stretch sm:self-auto shrink-0">
          {(['all', 'shipment', 'emission'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none text-center px-3.5 py-1.5 rounded-lg text-xs font-bold transition duration-150 capitalize whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
              }`}
            >
              <span className="hidden sm:inline">
                {tab === 'all' ? 'Semua Berkas' : tab === 'shipment' ? 'Shipments (Pintu 1)' : 'Carbon Tracking (Pintu 2)'}
              </span>
              <span className="inline sm:hidden">
                {tab === 'all' ? 'Semua' : tab === 'shipment' ? 'Shipments' : 'Carbon'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Steps Loop */}
      <div className="space-y-8">
        {filteredSteps.map((step) => {
          const hasInput = step.hasOwnProperty('requestBody');
          const stepOutput = sandboxOutputs[step.id];

          return (
            <div 
              key={step.id} 
              id={step.id} 
              className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden scroll-mt-24 hover:shadow-md transition-shadow"
            >
              {/* Header card banner */}
              <div className="p-5 border-b border-slate-200/60 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 font-extrabold flex items-center justify-center text-xs">
                    {step.stepNumber}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 tracking-tight">{step.title}</h3>
                    <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-0.5">MODUL TESTING UAS - ECO-TRACK API</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 text-[10px] font-extrabold font-mono tracking-widest rounded-md ${getMethodBadgeColor(step.method)}`}>
                    {step.method}
                  </span>
                  <span className="px-2 py-0.5 border border-slate-200 bg-white rounded text-[9px] font-mono font-bold text-slate-500 uppercase">
                    Expected: {step.expectedResponseStatus}
                  </span>
                </div>
              </div>

              {/* Endpoint route copy container with headers warning */}
              <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/40 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                  <div className="flex items-center gap-2 text-slate-700 font-bold overflow-x-auto select-all">
                    <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-500 font-sans tracking-wide">Base URL</span>
                    <span className="text-slate-400">http://localhost:3001</span>
                    <span className="text-slate-800 font-extrabold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">{step.endpoint}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(`http://localhost:3001${step.endpoint}`, step.id)}
                    className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-700 font-sans font-semibold text-[11px] self-end sm:self-auto shrink-0 transition"
                  >
                    {copiedId === step.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                        <span className="text-emerald-600 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Route</span>
                      </>
                    )}
                  </button>
                </div>

                {/* API Key Header Reminder */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5 font-sans">
                  <Key className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Postman Required Header:</span>
                  <code className="text-[10px] bg-emerald-50 border border-emerald-200/60 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">
                    x-api-key : ecotrack2026uas
                  </code>
                </div>
              </div>

              {/* Content body */}
              <div className="p-5 space-y-6">
                {/* Desks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 leading-relaxed">
                  <div className="bg-emerald-50/20 p-4 rounded-lg border border-emerald-100/50">
                    <h4 className="text-[11px] font-bold uppercase text-emerald-800 tracking-wider mb-1.5">Deskripsi Pengujian</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{step.description}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h4 className="text-[11px] font-bold uppercase text-slate-700 tracking-wider mb-1.5">Analisis Teknis Respon</h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{step.technicalAnalysis}</p>
                  </div>
                </div>

                {/* Sub UI: Request Parameters / Body (If Exists) */}
                {hasInput && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-800 tracking-wider uppercase flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                        Payload Request Input Body (JSON)
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono">Editable sandbox input</span>
                    </div>
                    <textarea
                      value={sandboxInputs[step.id] || ""}
                      onChange={(e) => handleInputChange(step.id, e.target.value)}
                      className="w-full h-24 bg-slate-900 text-slate-100 p-3.5 rounded-lg font-mono text-[11px] focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                )}

                {/* Expected response vs live simulation toggle */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <div className="text-[11px] font-extrabold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Payload Struktur Data Pelaporan</span>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => executeSandboxSimulation(step)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-4 rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-transform active:scale-[98%]"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Uji Live Simulator</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Expected Box */}
                    <div className="space-y-2">
                      <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                        <div className="bg-slate-950/80 px-4 py-2 text-slate-400 font-mono text-[10px] flex items-center justify-between border-b border-slate-800">
                          <span className="text-emerald-400 font-bold">➜ Expected Response (Status {step.expectedResponseStatus}):</span>
                          <span>JSON</span>
                        </div>
                        <pre className="p-4 overflow-x-auto text-slate-200 font-mono text-[11px] leading-relaxed max-h-64">
                          <code>{step.expectedResponseJson}</code>
                        </pre>
                      </div>
                    </div>

                    {/* Live response block */}
                    <div className="space-y-2">
                      {stepOutput ? (
                        <div className="bg-slate-900 rounded-lg overflow-hidden border border-emerald-950">
                          <div className="bg-slate-950/80 px-4 py-2 font-mono text-[10px] flex items-center justify-between border-b border-slate-850">
                            <span className="text-teal-300 font-bold flex items-center gap-1.5 animate-pulse">
                              <Sparkles className="w-3 h-3 text-teal-400" />
                              Live Sandbox Response:
                            </span>
                            <div className="flex items-center gap-2 font-mono">
                              <span className={`px-2 py-0.5 rounded border text-[9px] ${getStatusBadgeColor(stepOutput.status)}`}>
                                Status {stepOutput.status}
                              </span>
                              <span className="text-slate-500 font-medium">{stepOutput.timeMs}ms</span>
                            </div>
                          </div>
                          <pre className="p-4 overflow-x-auto text-teal-200 font-mono text-[11px] leading-relaxed max-h-64">
                            <code>{stepOutput.body}</code>
                          </pre>
                        </div>
                      ) : (
                        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg h-full min-h-[160px] p-5 flex flex-col items-center justify-center text-center">
                          <HelpCircle className="w-8 h-8 text-slate-300 mb-2" />
                          <p className="text-xs font-bold text-slate-500">Live Simulator Belum Dijalankan</p>
                          <p className="text-[10px] text-slate-400 max-w-xs mt-1">
                            Klik tombol <strong className="text-emerald-700">"Uji Live Simulator"</strong> untuk mencoba rute ini secara instan pada basis data in-memory di report ini.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Postman Screenshot Image (Important for UAS editing later) */}
                <div className="border-t border-slate-100 pt-4 space-y-2">
                  <div className="flex items-center justify-between bg-emerald-50/10 px-3 py-2 rounded border border-emerald-100/30">
                    <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Attachment Gambar Pengujian Postman (File System)
                    </span>
                    <span className="text-[9px] font-mono text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-full font-bold">
                      {step.imageFileName}
                    </span>
                  </div>
                  
                  <div className="relative group">
                    <img 
                      src={step.imageFileName} 
                      className="postman-screenshot rounded-lg border border-slate-200 shadow-sm max-w-full" 
                      alt={`Dokumentasi Postman ${step.stepNumber}`}
                      onLoad={() => {
                        setLoadedImages(prev => ({ ...prev, [step.id]: true }));
                      }}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                        setLoadedImages(prev => ({ ...prev, [step.id]: false }));
                      }}
                    />
                    
                    {!loadedImages[step.id] && (
                      <div className="bg-slate-100 rounded-lg p-4 border border-dashed border-slate-300/80 text-center relative pointer-events-none mt-2 animate-fade-in">
                        <p className="text-[11px] font-bold text-slate-600">
                          🖼️ Image Finder Helper: <code className="bg-white px-1 py-0.5 rounded border text-[#059669]">{step.imageFileName}</code>
                        </p>
                        <p className="text-[9px] text-slate-400 mt-1 max-w-xl mx-auto leading-relaxed">
                          Menunggu file gambar diunggah. Ketika Anda menaruh file screenshot Postman asli dengan nama file <strong className="text-slate-600">"{step.imageFileName}"</strong> di folder <code className="bg-slate-200 px-1 py-0.5 rounded text-xs font-mono">public/</code>, gambar asli otomatis tampil menggantikan card placeholder ini!
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
