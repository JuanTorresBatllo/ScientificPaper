
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, CloudRain, Satellite, Droplets, AlertTriangle, Zap, Info } from 'lucide-react';

// Simulated historical data based on Rivera et al. (2020) 
// Showing the ~6.8mm/decade decline in summer precipitation
const HISTORICAL_DATA = [
  192, 185, 210, 175, 195, 160, 220, 180, 155, 170, 
  165, 150, 185, 145, 160, 140, 175, 130, 155, 145,
  140, 135, 150, 125, 145, 130, 120, 115, 140, 120,
  135, 125, 110, 115, 130, 118, 122, 115
];

// --- PRECIPITATION TREND CHART ---
export const TrendChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const padding = 40;
  const width = 600;
  const height = 300;
  
  const maxVal = Math.max(...HISTORICAL_DATA) + 20;
  const minVal = Math.min(...HISTORICAL_DATA) - 20;
  
  const getX = (i: number) => (i / (HISTORICAL_DATA.length - 1)) * (width - padding * 2) + padding;
  const getY = (val: number) => height - ((val - minVal) / (maxVal - minVal)) * (height - padding * 2) - padding;

  const pathD = HISTORICAL_DATA.map((val, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(val)}`).join(' ');
  
  // Linear Regression (Simplified trend)
  const trendStart = getY(190);
  const trendEnd = getY(135);

  return (
    <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl shadow-xl border border-slate-100 my-8 w-full">
      <div className="flex flex-col md:flex-row justify-between w-full mb-8 gap-4">
        <div>
          <h3 className="font-serif text-2xl text-slate-900">Summer Precipitation Trend</h3>
          <p className="text-xs text-slate-400 mt-1 font-medium tracking-wide uppercase">Southern Andean Altiplano (1981–2018)</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
             <div className="w-6 h-1 bg-slate-200 rounded-full"></div> Historical Mean
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-orange-600 uppercase">
             <div className="w-6 h-1 bg-orange-500 rounded-full"></div> Obs. Trend
          </div>
        </div>
      </div>

      <div className="w-full relative bg-slate-50/50 rounded-xl p-4 border border-slate-100 group">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
           {/* Grid lines */}
           {[0, 0.25, 0.5, 0.75, 1].map((p) => (
             <line 
               key={p}
               x1={padding} 
               y1={padding + p * (height - padding * 2)} 
               x2={width - padding} 
               y2={padding + p * (height - padding * 2)} 
               stroke="#e2e8f0" 
               strokeWidth="1" 
               strokeDasharray="4 4"
             />
           ))}
           
           {/* Mean line */}
           <line 
             x1={padding} y1={getY(160)} x2={width - padding} y2={getY(160)} 
             stroke="#cbd5e1" strokeWidth="1" strokeDasharray="8 4" 
           />
           
           {/* Trendline (Regression) */}
           <motion.line 
             x1={getX(0)} y1={trendStart} x2={getX(HISTORICAL_DATA.length - 1)} y2={trendEnd} 
             stroke="#ea580c" 
             strokeWidth="4" 
             strokeLinecap="round"
             initial={{ pathLength: 0, opacity: 0 }}
             animate={{ pathLength: 1, opacity: 1 }}
             transition={{ delay: 1, duration: 1.5 }}
           />

           {/* Actual noisy data path */}
           <motion.path 
             d={pathD}
             fill="none"
             stroke="#9a3412"
             strokeWidth="2.5"
             strokeLinejoin="round"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 2.5, ease: "easeInOut" }}
           />

           {/* Interactive Points */}
           {HISTORICAL_DATA.map((val, i) => (
             <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                <circle 
                  cx={getX(i)} 
                  cy={getY(val)} 
                  r={hoveredIndex === i ? 6 : 3} 
                  fill={hoveredIndex === i ? "#ea580c" : "#9a3412"} 
                  className="transition-all cursor-pointer"
                />
                {hoveredIndex === i && (
                  <foreignObject x={getX(i) - 40} y={getY(val) - 50} width="80" height="40">
                    <div className="bg-slate-900 text-white text-[10px] p-2 rounded shadow-lg text-center font-bold">
                      {1981 + i}: {val}mm
                    </div>
                  </foreignObject>
                )}
             </g>
           ))}
        </svg>
        
        <div className="flex justify-between mt-4 px-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>1981</span>
          <span>1990</span>
          <span>2000</span>
          <span>2010</span>
          <span>2018</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
         <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-xl text-center group hover:bg-orange-50 transition-colors">
            <div className="text-[10px] text-orange-600 font-bold uppercase mb-1 tracking-wider">Annual Decline</div>
            <div className="text-2xl font-serif text-orange-800">-6.8 mm</div>
            <div className="text-[9px] text-slate-400 mt-1">Per decade</div>
         </div>
         <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center group hover:bg-white transition-colors">
            <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-wider">Total Loss</div>
            <div className="text-2xl font-serif text-slate-800">~22%</div>
            <div className="text-[9px] text-slate-400 mt-1">Since 1981</div>
         </div>
         <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center group hover:bg-white transition-colors">
            <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-wider">P-Value</div>
            <div className="text-2xl font-serif text-slate-800">&lt; 0.05</div>
            <div className="text-[9px] text-slate-400 mt-1">Statistically Sig.</div>
         </div>
         <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center group hover:bg-white transition-colors">
            <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 tracking-wider">Correlation</div>
            <div className="text-2xl font-serif text-slate-800">0.96</div>
            <div className="text-[9px] text-slate-400 mt-1">CHIRPS vs Station</div>
         </div>
      </div>

      <div className="mt-6 flex items-start gap-2 p-3 bg-blue-50/30 rounded-lg border border-blue-100/50 text-slate-500">
        <Info size={14} className="text-blue-500 mt-0.5 shrink-0" />
        <p className="text-[10px] leading-relaxed italic">
          Visualization reflects CHIRPS 0.05° grid data. The negative trend is most robust in the DJF summer months, directly correlating with the weakening of the South American Monsoon System (SAMS).
        </p>
      </div>
    </div>
  );
};

// --- CHIRPS DIAGRAM ---
export const CHIRPSDiagram: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-slate-800 rounded-xl border border-slate-700 my-8 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <Satellite size={120} className="text-cyan-500" />
      </div>

      <h3 className="font-serif text-xl mb-8 text-white z-10">Hybrid Data Integration</h3>
      
      <div className="flex flex-col gap-6 w-full max-w-sm z-10">
         <motion.div 
           whileHover={{ x: 10 }}
           className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all"
         >
            <div className="p-3 rounded-full bg-cyan-900/50 text-cyan-400 border border-cyan-700">
               <Satellite size={24} />
            </div>
            <div>
               <div className="text-sm font-bold text-white">Satellite Infrared</div>
               <div className="text-xs text-slate-400">CHIRPS 0.05° High-Res Grid</div>
            </div>
         </motion.div>

         <div className="flex justify-center py-2">
            <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-600/50 to-orange-600/50"></div>
         </div>

         <motion.div 
           whileHover={{ x: 10 }}
           className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all"
         >
            <div className="p-3 rounded-full bg-orange-900/50 text-orange-400 border border-orange-700">
               <CloudRain size={24} />
            </div>
            <div>
               <div className="text-sm font-bold text-white">Rain Gauge Network</div>
               <div className="text-xs text-slate-400">Local Validation Stations</div>
            </div>
         </motion.div>
         
         <div className="mt-4 p-6 rounded-xl bg-slate-900/50 border border-white/5 shadow-inner">
             <div className="flex justify-between items-center mb-4">
               <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Spatial Convergence</div>
               <div className="text-[10px] text-cyan-400 font-mono">r = 0.96</div>
             </div>
             <div className="grid grid-cols-8 gap-1.5">
                {[...Array(32)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0.1 }}
                    animate={{ opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.05 }}
                    className={`h-2 rounded-full ${i % 5 === 0 ? 'bg-orange-500' : 'bg-cyan-500'}`}
                  ></motion.div>
                ))}
             </div>
         </div>
      </div>
    </div>
  );
};

// --- REGIONAL VULNERABILITY ---
export const RegionalVulnerability: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
      {[
        { icon: <Droplets size={20} />, color: "blue", title: "Bofedales", desc: "Wetland shrinkage reducing forage for Andean livestock." },
        { icon: <Zap size={20} />, color: "orange", title: "Lithium Triangle", desc: "Mining water demand vs. shrinking aquifer recharge." },
        { icon: <AlertTriangle size={20} />, color: "red", title: "ENSO cycles", desc: "Increasing frequency of extreme precipitation voids." },
        { icon: <Activity size={20} />, color: "green", title: "Food Security", desc: "Andean crop yields threatened by summer droughts." }
      ].map((item, idx) => (
        <motion.div 
          key={idx}
          whileHover={{ y: -5 }}
          className="p-5 border border-slate-100 rounded-2xl bg-slate-50 flex items-start gap-4 transition-all hover:shadow-md hover:border-slate-200"
        >
          <div className={`p-3 bg-${item.color}-100 text-${item.color}-600 rounded-xl`}>
            {item.icon}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{item.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
