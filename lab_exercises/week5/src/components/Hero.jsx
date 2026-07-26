import React from 'react';
import { Sparkles, Download, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export default function Hero({ onExploreClick, onTalentClick }) {
  return (
    <div className="relative pt-24 pb-12 md:pt-32 md:pb-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ff9f4a]/15 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Column: Headline & CTA */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff0df] border border-[#f0d8b8] text-xs font-bold text-[#5c4a3c] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#ff9f4a]" />
            <span>Virtual Asset Salvage & Creator Talent Pipeline</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#15110d] tracking-tight leading-[1.1]">
            Engine-Ready Game Assets,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9f4a] to-[#e88835]">
              Always Free.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#8a7564] max-w-xl font-normal leading-relaxed mx-auto lg:mx-0">
            Download production-ready 3D models, sound effects, animations, and UI kits — 
            100% free with CC0/Open licensing. Need custom assets? Hire top indie game creators directly.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 bg-[#ff9f4a] hover:bg-[#e88835] text-white text-sm font-bold rounded-2xl shadow-lg shadow-[#ff9f4a]/25 hover:shadow-xl hover:shadow-[#ff9f4a]/35 flex items-center gap-2.5 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              Explore Loot Library
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onTalentClick}
              className="px-6 py-3.5 bg-white hover:bg-[#fff0df] text-[#15110d] border-2 border-[#f0e7dd] text-sm font-bold rounded-2xl shadow-sm hover:border-[#ff9f4a]/50 flex items-center gap-2 transition-all active:scale-95"
            >
              Hire a Creator
            </button>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg mx-auto lg:mx-0 border-t border-[#f0e7dd]">
            <div>
              <div className="font-display text-xl sm:text-2xl font-extrabold text-[#15110d]">12,400+</div>
              <div className="text-[11px] font-semibold text-[#8a7564]">Assets Salvaged</div>
            </div>
            <div>
              <div className="font-display text-xl sm:text-2xl font-extrabold text-[#15110d]">100% Free</div>
              <div className="text-[11px] font-semibold text-[#8a7564]">CC0 / Commercial</div>
            </div>
            <div>
              <div className="font-display text-xl sm:text-2xl font-extrabold text-[#15110d]">3,800+</div>
              <div className="text-[11px] font-semibold text-[#8a7564]">Verified Creators</div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Preview Card */}
        <div className="w-full lg:w-[480px]">
          <div className="sf-card p-4 relative shadow-2xl border-2 border-[#f0e7dd] hover:border-[#ff9f4a]/40 transition-all group">
            <div className="relative h-64 sm:h-72 rounded-xl overflow-hidden bg-gradient-to-b from-[#fff0df] to-[#fce4c8] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80"
                alt="Featured Asset"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="card-badge shadow-md">✨ Featured Loot</span>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="tag-chip">3D Model · FBX</span>
                <div className="flex items-center gap-1 text-xs font-bold text-[#ff9f4a]">
                  ★ 4.9 <span className="text-[#8a7564] font-normal">(1.2k)</span>
                </div>
              </div>
              <h3 className="font-display text-lg font-bold text-[#15110d]">
                Low-Poly Fantasy Treasure Chest
              </h3>
              <p className="text-xs text-[#8a7564]">
                Fully rigged with lid open/close animations and 4K PBR textures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
