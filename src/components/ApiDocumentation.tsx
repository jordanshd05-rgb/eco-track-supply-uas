import React, { useState } from 'react';
import { practiceSteps, initialShipments, initialEmissions } from '../mockData';
import { PracticeStep, Shipment, EmissionAudit } from '../types';
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
  HelpCircle
} from 'lucide-react';

interface ApiDocumentationProps {
  shipments: Shipment[];
  setShipments: React.Dispatch<React.SetStateAction<Shipment[]>>;
  emissions: EmissionAudit[];
  setEmissions: React.Dispatch<React.SetStateAction<EmissionAudit[]>>;
}

export default function ApiDocumentation({
  shipments,
  setShipments,
  emissions,
  setEmissions
}: ApiDocumentationProps) {
  // Clipboard copying state
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  
  // Interactive sandbox state for each practice card
  const [sandboxInputs, setSandboxInputs] = useState<Record<string, string>>({
    'step-4': JSON.stringify({
      origin: "Semarang (Tanjung Emas)",
      destination: "Meulaboh (Pelabuhan Bubon)",
      weightKg: 6200,
      cargoType: "Medical Protection Kits & Vaccines"
    }, null, 2),
    'step-5': JSON.stringify({
      weightKg: 12500,
      status: "IN_TRANSIT",
      cargoType: "Heavy Machinery Parts, Steel & Zinc Sheets"
    }, null, 2),
    'step-9': JSON.stringify({
      shipmentId: "SHIP-999"
    }, null, 2),
    'step-10': JSON.stringify({
      shipmentId: "SHIP-001"
    }, null, 2),
    'step-11': JSON.stringify({
      verified: true
    }, null, 2)
  });

  // State to hold output results of live virtual API executions
  const [sandboxOutputs, setSandboxOutputs] = useState<Record<string, { status: number; body: string; timeMs: number }>>({});
  const [activeTab, setActiveTab] = useState<'all' | 'shipment' | 'emission'>('all');

  const filteredSteps = practiceSteps.filter(step => {
    if (activeTab === 'all') return true;
    if (activeTab === 'shipment') return step.endpoint.includes('/shipments');
    if (activeTab === 'emission') return step.endpoint.includes('/emissions') || step.id === 'step-9' || step.id === 'step-10';
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
        case 'step-1': // GET /api/docs
          status = 200;
          responseBody = JSON.stringify({
            status: "online",
            app: "Eco-Track Supply API",
            version: "1.0.0",
            course: "Integrasi Sistem (3 SKS)",
            semester: "Genap T.A. 2025/2026",
            institution: "Universitas Teuku Umar",
            developer: "Kelompok 2 - Teknologi Informasi",
            uptimeSeconds: Math.floor(Math.random() * 50000) + 10000,
            endpointsCount: 11,
            serverTime: new Date().toISOString()
          }, null, 2);
          break;

        case 'step-2': // GET /api/v1/shipments
          status = 200;
          responseBody = JSON.stringify(shipments, null, 2);
          break;

        case 'step-3': // GET /api/v1/shipments/:id
          {
            // Parse target shipment
            const targetId = "SHIP-001";
            const found = shipments.find(s => s.id === targetId);
            if (found) {
              status = 200;
              responseBody = JSON.stringify({
                success: true,
                data: found,
                message: "Shipment found successfully"
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

        case 'step-4': // POST /api/v1/shipments
          if (!inputJson || !inputJson.origin || !inputJson.destination || !inputJson.weightKg) {
            status = 400;
            responseBody = JSON.stringify({
              success: false,
              message: "Bad Request. Required parameters: 'origin', 'destination', 'weightKg' must be present."
            }, null, 2);
          } else {
            const newId = `SHIP-0${shipments.length + 1}`;
            const newShipment: Shipment = {
              id: newId,
              origin: inputJson.origin,
              destination: inputJson.destination,
              weightKg: Number(inputJson.weightKg),
              cargoType: inputJson.cargoType || "Unclassified Cargo",
              status: "PENDING",
              createdAt: new Date().toISOString()
            };
            setShipments(prev => [...prev, newShipment]);
            status = 201;
            responseBody = JSON.stringify({
              success: true,
              message: "New shipment manifest successfully registered in memory database",
              data: newShipment
            }, null, 2);
          }
          break;

        case 'step-5': // PUT /api/v1/shipments/:id
          {
            const targetId = "SHIP-002";
            const found = shipments.find(s => s.id === targetId);
            if (!found) {
              status = 404;
              responseBody = JSON.stringify({
                success: false,
                message: `Update target shipment '${targetId}' not found.`
              }, null, 2);
            } else {
              const updatedList = shipments.map(s => {
                if (s.id === targetId) {
                  return {
                    ...s,
                    weightKg: inputJson.weightKg ? Number(inputJson.weightKg) : s.weightKg,
                    status: inputJson.status || s.status,
                    cargoType: inputJson.cargoType || s.cargoType
                  };
                }
                return s;
              });
              setShipments(updatedList);
              const updatedItem = updatedList.find(s => s.id === targetId);
              status = 200;
              responseBody = JSON.stringify({
                success: true,
                message: "Shipment status and weight successfully updated in memory DB",
                data: updatedItem
              }, null, 2);
            }
          }
          break;

        case 'step-6': // DELETE /api/v1/shipments/:id
          {
            const targetId = "SHIP-003";
            const found = shipments.find(s => s.id === targetId);
            if (!found) {
              status = 404;
              responseBody = JSON.stringify({
                success: false,
                message: `Delete target shipment '${targetId}' could not be located.`
              }, null, 2);
            } else {
              setShipments(prev => prev.filter(s => s.id !== targetId));
              // Cascade delete from emissions
              setEmissions(prev => prev.filter(e => e.shipmentId !== targetId));
              status = 200;
              responseBody = JSON.stringify({
                success: true,
                message: `Shipment ${targetId} has been deleted, associated emission audit reports have been purged cascadeally`,
                deletedId: targetId
              }, null, 2);
            }
          }
          break;

        case 'step-7': // GET /api/v1/emissions
          status = 200;
          responseBody = JSON.stringify(emissions, null, 2);
          break;

        case 'step-8': // GET /api/v1/emissions/:id
          {
            const targetId = "EMI-201";
            const found = emissions.find(e => e.id === targetId);
            if (found) {
              status = 200;
              responseBody = JSON.stringify({
                success: true,
                data: found
              }, null, 2);
            } else {
              status = 404;
              responseBody = JSON.stringify({
                success: false,
                message: `Emission log audit ID '${targetId}' was not found.`
              }, null, 2);
            }
          }
          break;

        case 'step-9': // POST /api/v1/emissions - Error Scenario
          {
            const shipmentId = inputJson?.shipmentId || "SHIP-999";
            const foundShipment = shipments.find(s => s.id === shipmentId);
            if (!foundShipment) {
              status = 404;
              responseBody = JSON.stringify({
                success: false,
                error: "FOREIGN_KEY_VIOLATION",
                message: `Referenced Shipment ID '${shipmentId}' is not registered in the system. Audit aborted.`
              }, null, 2);
            } else {
              status = 200;
              responseBody = JSON.stringify({
                success: true,
                message: "You submitted a valid shipmentId which contradicts this error-simulation step. Try running with SHIP-999.",
                data: foundShipment
              }, null, 2);
            }
          }
          break;

        case 'step-10': // POST /api/v1/emissions - Success Scenario
          {
            const shipmentId = inputJson?.shipmentId || "SHIP-001";
            const foundShipment = shipments.find(s => s.id === shipmentId);
            if (!foundShipment) {
              status = 404;
              responseBody = JSON.stringify({
                success: false,
                message: `Could not log carbon emission. Referenced Shipment ID '${shipmentId}' does not exist.`
              }, null, 2);
            } else {
              // Formula: carbonOutputKg = weightKg * 0.216
              // carbonTaxIdr = carbonOutputKg * 30
              const carbonOutputKg = Number((foundShipment.weightKg * 0.216).toFixed(2));
              const carbonTaxIdr = Math.round(carbonOutputKg * 30);
              
              const newEmitId = `EMI-20${emissions.length + 1}`;
              const newEmission: EmissionAudit = {
                id: newEmitId,
                shipmentId: shipmentId,
                carbonOutputKg,
                carbonTaxIdr,
                verified: false,
                auditedAt: new Date().toISOString()
              };
              
              setEmissions(prev => [...prev, newEmission]);
              status = 201;
              responseBody = JSON.stringify({
                success: true,
                message: "Emission audit calculated and logged successfully with Green Logistics multi-module cascade engine",
                data: newEmission
              }, null, 2);
            }
          }
          break;

        case 'step-11': // PUT /api/v1/emissions/:id
          {
            const targetId = "EMI-202";
            const found = emissions.find(e => e.id === targetId);
            if (!found) {
              status = 404;
              responseBody = JSON.stringify({
                success: false,
                message: `Emission record '${targetId}' could not be located.`
              }, null, 2);
            } else {
              const verifiedVal = inputJson && typeof inputJson.verified === 'boolean' ? inputJson.verified : true;
              setEmissions(prev => prev.map(e => {
                if (e.id === targetId) {
                  return { ...e, verified: verifiedVal };
                }
                return e;
              }));
              
              status = 200;
              responseBody = JSON.stringify({
                success: true,
                message: `Emission audit verification status successfully updated to ${verifiedVal ? 'VERIFIED' : 'UNVERIFIED'}`,
                data: {
                  ...found,
                  verified: verifiedVal
                }
              }, null, 2);
            }
          }
          break;

        case 'step-12': // DELETE /api/v1/emissions/:id
          {
            const targetId = "EMI-202";
            const found = emissions.find(e => e.id === targetId);
            if (!found) {
              status = 404;
              responseBody = JSON.stringify({
                success: false,
                message: `Target resource '${targetId}' not found.`
              }, null, 2);
            } else {
              setEmissions(prev => prev.filter(e => e.id !== targetId));
              status = 200;
              responseBody = JSON.stringify({
                success: true,
                message: `Emission audit record '${targetId}' has been permanently deleted from storage in-memory structure.`,
                deletedId: targetId
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
                {tab === 'all' ? 'Semua' : tab === 'shipment' ? 'Manifest Shipments (CRUD 1)' : 'Audit Emissions (CRUD 2)'}
              </span>
              <span className="inline sm:hidden">
                {tab === 'all' ? 'Semua' : tab === 'shipment' ? 'Shipments' : 'Emissions'}
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
                    <p className="text-[10px] text-slate-400 font-medium tracking-wide mt-0.5">MODUL UJI COBA - ECO-TRACK SUPPLY</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 text-[10px] font-extrabold font-mono tracking-widest rounded-md ${getMethodBadgeColor(step.method)}`}>
                    {step.method}
                  </span>
                  <span className="px-2 py-0.5 border border-slate-200 bg-white rounded text-[9px] font-mono font-bold text-slate-500 uppercase">
                    Status: {step.expectedResponseStatus} Expected
                  </span>
                </div>
              </div>

              {/* Endpoint route copy container */}
              <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-slate-700 font-bold overflow-x-auto select-all">
                  <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-500 font-sans tracking-wide">URL Target</span>
                  <span className="text-slate-400">http://localhost:3000</span>
                  <span className="text-slate-800 font-extrabold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">{step.endpoint}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(`http://localhost:3000${step.endpoint}`, step.id)}
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
                    {/* Dracula Expected Box */}
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
                        <div className="bg-slate-900 rounded-lg overflow-hidden border border-emerald-900">
                          <div className="bg-slate-950/80 px-4 py-2 font-mono text-[10px] flex items-center justify-between border-b border-slate-800">
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
                            Klik tombol <strong className="text-emerald-700">"Uji Live Simulator"</strong> untuk menguji rute endpoint secara instan pada basis data memori lokal report ini.
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
                      Attachment Gambar Pengujian Postman (VS Code Template)
                    </span>
                    <span className="text-[9px] font-mono text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-full font-bold">
                      {step.imageFileName}
                    </span>
                  </div>
                  
                  <div className="relative group">
                    {/* Real Image tag styled properly. Will fallback gracefully if file not found */}
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
                    
                    {/* Helper placeholder for user edit awareness. Hidden when image loads successfully */}
                    {!loadedImages[step.id] && (
                      <div className="bg-slate-100 rounded-lg p-4 border border-dashed border-slate-300/80 text-center relative pointer-events-none mt-2 animate-fade-in">
                        <p className="text-[11px] font-bold text-slate-600">
                          🖼️ Image Finder Helper: <code className="bg-white px-1 py-0.5 rounded border text-[#059669]">{step.imageFileName}</code>
                        </p>
                        <p className="text-[9px] text-slate-400 mt-1 max-w-xl mx-auto leading-relaxed">
                          Menunggu file gambar diunggah. Ketika Anda meletakkan file screenshot Postman asli Anda dengan nama file <strong className="text-slate-600">"{step.imageFileName}"</strong> di folder <code className="bg-slate-200 px-1 py-0.5 rounded text-xs font-mono">public/</code>, gambar asli otomatis tampil menggantikan pengingat ini!
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
