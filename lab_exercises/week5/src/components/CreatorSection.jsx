import React from 'react';
import { MOCK_CREATORS } from '../data/mockAssets';
import { Star, MapPin, Briefcase, ExternalLink, CheckCircle } from 'lucide-react';

export default function CreatorSection() {
  return (
    <section id="creators" className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-8 border-t border-[#f0e7dd]">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#ff9f4a]">
          Creator Talent Pipeline
        </span>
        <h2 className="font-display text-3xl font-extrabold text-[#15110d]">
          Hire Verified Indie 3D & Technical Artists
        </h2>
        <p className="text-xs sm:text-sm text-[#8a7564]">
          Need custom 3D models, shaders, or level design? Work directly with verified creators from the LootYard community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_CREATORS.map((creator) => (
          <div key={creator.id} className="sf-card p-6 flex flex-col justify-between space-y-4 hover:border-[#ff9f4a]/50 transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#ff9f4a]"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-display font-bold text-base text-[#15110d]">@{creator.name}</h3>
                    <CheckCircle className="w-3.5 h-3.5 text-[#ff9f4a]" />
                  </div>
                  <p className="text-xs text-[#8a7564]">{creator.role}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#5c4a3c]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8a7564]" />
                  <span>{creator.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-[#8a7564]" />
                  <span>Specialty: <strong>{creator.specialty}</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#f0e7dd] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#15110d] block">{creator.hourlyRate}</span>
                <span className="text-[10px] text-[#8a7564]">{creator.completedJobs} projects completed</span>
              </div>
              <button className="px-4 py-2 bg-[#ff9f4a] hover:bg-[#e88835] text-white text-xs font-bold rounded-full transition-all shadow-sm">
                Hire Creator
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
