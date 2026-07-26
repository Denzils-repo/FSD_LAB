import React, { useState } from 'react';
import { Download, Star, CheckCircle, Tag } from 'lucide-react';

export default function AssetCard({ asset, onSelect }) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = (e) => {
    e.stopPropagation();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div
      onClick={() => onSelect(asset)}
      className="asset-card flex flex-col justify-between group"
    >
      {/* Badge */}
      {asset.badge && (
        <span className="card-badge shadow-sm">
          {asset.badge}
        </span>
      )}

      {/* Image Preview Container */}
      <div className="relative h-48 w-full bg-[#fff0df] overflow-hidden">
        <img
          src={asset.thumbnailUrl}
          alt={asset.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
          <span className="text-[11px] font-bold text-white tracking-wide">
            Format: {asset.format || 'FBX / GLTF'}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-[#8a7564] mb-1">
            <span className="font-semibold text-[#ff9f4a] capitalize">{asset.category}</span>
            <div className="flex items-center gap-1 font-bold text-[#15110d]">
              <Star className="w-3.5 h-3.5 fill-[#ff9f4a] text-[#ff9f4a]" />
              <span>{asset.rating}</span>
            </div>
          </div>

          <h3 className="font-display font-bold text-base text-[#15110d] group-hover:text-[#ff9f4a] transition-colors line-clamp-1">
            {asset.title}
          </h3>

          <p className="text-xs text-[#8a7564] line-clamp-2 mt-1 leading-relaxed">
            {asset.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {asset.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="tag-chip text-[10px]">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer info & CTA */}
        <div className="pt-3 border-t border-[#f0e7dd] flex items-center justify-between">
          <span className="text-[11px] font-medium text-[#8a7564]">
            by <strong className="text-[#15110d]">@{asset.creator}</strong>
          </span>

          <button
            onClick={handleDownload}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
              downloaded
                ? 'bg-green-600 text-white'
                : 'bg-[#fff0df] hover:bg-[#ff9f4a] text-[#5c4a3c] hover:text-white'
            }`}
          >
            {downloaded ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                Downloaded!
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                Free ({asset.downloads})
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
