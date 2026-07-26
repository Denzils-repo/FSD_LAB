import React, { useState } from 'react';
import AssetCard from './AssetCard';
import { MOCK_CATEGORIES } from '../data/mockAssets';
import { Filter, Sparkles, Box, User, Sword, Car, Layers, Music } from 'lucide-react';

const iconMap = {
  Sparkles: Sparkles,
  User: User,
  Box: Box,
  Sword: Sword,
  Car: Car,
  Layers: Layers,
  Music: Music,
};

export default function AssetGrid({ assets, onSelectAsset, searchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredAssets = assets.filter((asset) => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="assets" className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
      {/* Category Pills & Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          {MOCK_CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Box;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                  active
                    ? 'bg-[#15110d] text-white shadow-md'
                    : 'bg-white hover:bg-[#fff0df] border border-[#f0e7dd] text-[#5c4a3c]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#ff9f4a]' : 'text-[#8a7564]'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="text-xs font-semibold text-[#8a7564]">
          Showing <strong className="text-[#15110d]">{filteredAssets.length}</strong> items
        </div>
      </div>

      {/* Assets Grid */}
      {filteredAssets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} onSelect={onSelectAsset} />
          ))}
        </div>
      ) : (
        <div className="sf-card p-12 text-center space-y-3">
          <Box className="w-12 h-12 text-[#ff9f4a] mx-auto opacity-60" />
          <h3 className="font-display text-lg font-bold text-[#15110d]">No assets found</h3>
          <p className="text-xs text-[#8a7564] max-w-sm mx-auto">
            We couldn't find any assets matching your search criteria. Try selecting another category or searching for keywords like "lowpoly" or "character".
          </p>
        </div>
      )}
    </section>
  );
}
