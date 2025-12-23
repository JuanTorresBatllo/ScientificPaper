
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, AltiplanoVisualizer } from './components/HydrologyScene';
import { TrendChart, CHIRPSDiagram, RegionalVulnerability } from './components/Diagrams';
import { ArrowDown, Menu, X, CloudRain, Mountain, Map, Info } from 'lucide-react';

const AuthorCard = ({ name, role, delay }: { name: string, role: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-orange-500/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-2xl text-slate-900 text-center mb-3">{name}</h3>
      <div className="w-12 h-0.5 bg-orange-600 mb-4 opacity-60"></div>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 selection:bg-orange-600 selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-orange-700 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm"><Mountain size={18} /></div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              ALTIPLANO-CHIRPS <span className="font-normal text-slate-500">2024</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-600">
            <a href="#context" onClick={scrollToSection('context')} className="hover:text-orange-700 transition-colors cursor-pointer uppercase">The Region</a>
            <a href="#trends" onClick={scrollToSection('trends')} className="hover:text-orange-700 transition-colors cursor-pointer uppercase">Precipitation Trends</a>
            <a href="#methods" onClick={scrollToSection('methods')} className="hover:text-orange-700 transition-colors cursor-pointer uppercase">Methodology</a>
            <a href="#impact" onClick={scrollToSection('impact')} className="hover:text-orange-700 transition-colors cursor-pointer uppercase">Impact</a>
            <a 
              href="https://doi.org/10.1016/j.jhydrol.2020.125316" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2 bg-orange-900 text-white rounded-full hover:bg-orange-800 transition-colors shadow-sm cursor-pointer"
            >
              Read Paper
            </a>
          </div>

          <button className="md:hidden text-slate-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-100">
        <HeroScene />
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(253,252,251,0.8)_0%,rgba(253,252,251,0.3)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-orange-500 text-orange-700 text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            Journal of Hydrology • 1981 — 2018
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-8 text-slate-900">
            The Drying <br/><span className="italic font-normal text-orange-800">Andean Altiplano</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-12">
            Analyzing 38 years of precipitation trends over the southern Andean plateau using CHIRPS satellite data and station records.
          </p>
          
          <div className="flex justify-center">
             <a href="#context" onClick={scrollToSection('context')} className="group flex flex-col items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors cursor-pointer">
                <span>EXPLORE THE TRENDS</span>
                <span className="p-2 border border-slate-300 rounded-full group-hover:border-slate-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Context */}
        <section id="context" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-400 uppercase">Geographical Context</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-slate-900">The SAA <br/>High Plateau</h2>
              <div className="w-16 h-1 bg-orange-500 mb-6"></div>
              <div className="space-y-4 text-sm text-slate-500">
                <div className="flex items-center gap-3"><Map size={16} className="text-orange-600" /> 21°S — 26°S Latitude</div>
                <div className="flex items-center gap-3"><Mountain size={16} className="text-orange-600" /> 3,500m — 6,000m Elevation</div>
                <div className="flex items-center gap-3"><CloudRain size={16} className="text-orange-600" /> Arid & Semi-Arid Climates</div>
              </div>
            </div>
            <div className="md:col-span-8 text-lg text-slate-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-orange-700">T</span>he Southern Andean Altiplano (SAA) is a unique environment where water is the most precious resource. Bordering Chile, Bolivia, and Argentina, this high-altitude region relies on summer precipitation driven by the South American Monsoon System (SAMS).
              </p>
              <p>
                In recent decades, this fragile balance has been disrupted. This study identifies a significant <strong className="text-slate-900">reduction in precipitation</strong>, with severe implications for the region's lithium mining operations, indigenous agriculture, and endemic biodiversity.
              </p>
            </div>
          </div>
        </section>

        {/* Trends Visualization */}
        <section id="trends" className="py-24 bg-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-orange-700 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-slate-200 shadow-sm">
                            <Info size={14}/> KEY FINDINGS
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-slate-900">Decadal Decline</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                           Our analysis reveals a significant negative trend in annual precipitation across the SAA. The most pronounced drying occurs in the <strong className="text-slate-900">summer months (DJF)</strong>, traditionally the peak rainy season.
                        </p>
                        <ul className="space-y-4 text-slate-600 mb-8">
                          <li className="flex gap-3"><span className="text-orange-600 font-bold">•</span> Average decrease of 5-10mm per decade.</li>
                          <li className="flex gap-3"><span className="text-orange-600 font-bold">•</span> Increasing frequency of extreme drought years.</li>
                          <li className="flex gap-3"><span className="text-orange-600 font-bold">•</span> Strong correlation with ENSO phases and Antarctic Oscillation.</li>
                        </ul>
                    </div>
                    <div>
                        <TrendChart />
                    </div>
                </div>
            </div>
        </section>

        {/* CHIRPS Methodology */}
        <section id="methods" className="py-24 bg-slate-900 text-slate-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-orange-600 blur-[100px] absolute top-[-100px] right-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-blue-500 blur-[100px] absolute bottom-[-100px] left-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                     <div className="order-2 lg:order-1">
                        <CHIRPSDiagram />
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 text-orange-400 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-slate-700">
                            REMOTE SENSING
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">CHIRPS Validation</h2>
                        <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                            Hydrological monitoring in the Andes is hindered by sparse and hard-to-maintain weather stations. We leveraged <strong>CHIRPS</strong> (Climate Hazards Group InfraRed Precipitation with Station data) to bridge this gap.
                        </p>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            By validating satellite infrared data against the available ground stations, we achieved a high-resolution 0.05° grid, allowing for the first comprehensive spatial analysis of trends across the entire Southern Altiplano.
                        </p>
                     </div>
                </div>
            </div>
        </section>

        {/* Regional Impact */}
        <section id="impact" className="py-24 bg-white">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200 shadow-inner">
                        <AltiplanoVisualizer />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-slate-400 font-serif italic">Topographic Model of the Salar de Atacama Region</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-400 uppercase">VULNERABILITY</div>
                    <h2 className="font-serif text-4xl mb-6 text-slate-900">Ecosystems at Risk</h2>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                        The decline in precipitation directly impacts <strong>Bofedales</strong> (high-altitude wetlands), which serve as critical habitats for Andean flamingos and vicuñas.
                    </p>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        Furthermore, the region is central to the "Lithium Triangle." Decreased water availability increases conflict between industrial extraction and the survival of local communities who rely on seasonal recharge.
                    </p>
                    
                    <RegionalVulnerability />
                </div>
             </div>
        </section>

        {/* Authors */}
        <section id="authors" className="py-24 bg-white border-t border-slate-100">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-slate-400 uppercase">RESEARCH TEAM</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-slate-900">Key Contributors</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">Interdisciplinary research from South American climate institutes.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <AuthorCard name="Juan Antonio Rivera" role="IANIGLA-CONICET, Argentina" delay="0s" />
                    <AuthorCard name="Marianela Pesce" role="CCT Mendoza, Argentina" delay="0.1s" />
                    <AuthorCard name="Diego Araneo" role="IANIGLA-CONICET" delay="0.2s" />
                    <AuthorCard name="Maximilian Viale" role="IANIGLA-CONICET" delay="0.3s" />
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2 flex items-center gap-2"><Mountain size={24} className="text-orange-500" /> ALTIPLANO-CHIRPS</div>
                <p className="text-sm max-w-sm">Climate research on the Southern Andean Altiplano. Based on "Precipitation trends over the southern Andean Altiplano from 1981 to 2018."</p>
            </div>
            <div className="text-xs text-slate-500 text-center md:text-right">
                Published in Journal of Hydrology (2020).<br/>Interactive data narrative developed for educational exploration.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
