import React, { useState } from 'react';
import { Calculator, ShieldAlert, CheckCircle, Flame, Leaf, Landmark } from 'lucide-react';

export default function InteractiveCalculator() {
  const [weight, setWeight] = useState<number>(5000);
  const [cargoType, setCargoType] = useState<string>('Electronic Parts');
  const [distanceKm, setDistanceKm] = useState<number>(350); // Optional distance multiplier for detail

  // IPCC Constant Factor
  const ipccFactor = 0.216; 
  // Tax rate per kg of CO2 in IDR (Rp 30,-)
  const carbonTaxRate = 30;

  // Calculations
  const carbonEmissionKg = Number((weight * ipccFactor).toFixed(2));
  const carbonTaxIdr = Math.round(carbonEmissionKg * carbonTaxRate);

  const presets = [
    { label: 'Kargo Ringan (Farming Kits)', weight: 1800, type: 'Agriculture' },
    { label: 'Suku Cadang Elektronik', weight: 4500, type: 'Electronics' },
    { label: 'Bahan Konstruksi Besi/Baja', weight: 12000, type: 'Heavy Machinery' },
  ];

  return (
    <div className="bg-emerald-950 text-emerald-100 rounded-2xl p-6 shadow-xl border border-emerald-800 relative overflow-hidden my-6">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-800/60 pb-4 mb-6 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-emerald-700 rounded-lg flex items-center justify-center text-white shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white tracking-wide">IPCC carbon & Carbon Tax Calculator Core</h4>
            <p className="text-[10px] text-emerald-400 font-medium">Simulator Otomatis Standar Green Logistics IPCC 0.216</p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-emerald-900 border border-emerald-700/60 text-emerald-300 px-2 py-1 rounded self-start sm:self-auto shrink-0">
          Status: ACTIVE FORMULA
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">Preset Muatan Praktikum</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setWeight(preset.weight);
                    setCargoType(preset.type);
                  }}
                  className="bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-800 text-left p-2.5 rounded-lg text-[10px] transition duration-150 text-white"
                >
                  <p className="font-bold truncate">{preset.label}</p>
                  <p className="text-[9px] text-emerald-400 font-mono mt-0.5">{preset.weight} Kg</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
              Berat Muatan Kargo (weightKg)
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="1000000"
                value={weight}
                onChange={(e) => setWeight(Math.max(1, Number(e.target.value)))}
                className="w-full bg-emerald-900/40 border border-emerald-800 rounded-lg py-2 pl-3 pr-12 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="absolute right-3 top-2 text-xs font-bold text-emerald-400">KG</span>
            </div>
            <p className="text-[9px] text-emerald-400 mt-1 leading-normal">
              *Masukkan bobot kargo nyata dalam Kilogram yang didaftarkan pada manifest logistik.
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
              Tipe Kargo
            </label>
            <input
              type="text"
              value={cargoType}
              onChange={(e) => setCargoType(e.target.value)}
              placeholder="e.g. Komponen Komputer"
              className="w-full bg-emerald-900/40 border border-emerald-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Right Output Calculations */}
        <div className="bg-emerald-900/40 border border-emerald-800/80 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Hasil Kalkulasi Terintegrasi</p>
            
            {/* Emission output */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-emerald-300">
                <span>Sum Carbon Emission (CO2)</span>
                <span className="font-mono bg-emerald-800/50 px-1.5 py-0.5 rounded text-emerald-300 text-[10px]">
                  Faktor IPCC: {ipccFactor} x berat
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-3xl font-extrabold text-white tracking-tight">{carbonEmissionKg.toLocaleString()}</span>
                <span className="text-xs font-bold text-emerald-400">Kg CO2</span>
              </div>
            </div>

            {/* Tax output */}
            <div className="mt-4 pt-3 border-t border-emerald-800/60">
              <div className="flex items-center justify-between text-xs text-emerald-300">
                <span>Carbon Tax Assessment (IDR)</span>
                <span className="font-mono bg-emerald-800/50 px-1.5 py-0.5 rounded text-emerald-300 text-[10px]">
                  Rp {carbonTaxRate}/kg emisi
                </span>
              </div>
              <div className="flex items-baseline gap-1 mt-1 text-emerald-300">
                <span className="text-xs font-bold">Rp</span>
                <span className="text-2xl font-extrabold text-teal-300 tracking-tight">{carbonTaxIdr.toLocaleString('id-ID')}</span>
                <span className="text-[10px] font-medium text-emerald-400">Rupiah</span>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-[10px] leading-relaxed flex gap-2">
            <Leaf className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-teal-300 font-extrabold uppercase">Metode Verifikasi Log:</span> Formula ini mengevaluasi seberapa besar kontribusi kargo terhadap ekologi. Pajak Karbon akan dicatat pada <span className="font-mono font-semibold">/api/v1/emissions</span> dan dipetakan ke status verifikasi legalitas dinas terkait.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
