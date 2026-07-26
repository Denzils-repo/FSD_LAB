import React from 'react';
import { Package, Heart, Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#fff8f1] border-t border-[#f0e7dd] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand info */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#ff9f4a] flex items-center justify-center text-white">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="font-display font-extrabold text-base text-[#15110d] block">LootYard</span>
            <span className="text-xs text-[#8a7564]">Open Virtual Asset Marketplace</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[#5c4a3c]">
          <a href="#assets" className="hover:text-[#ff9f4a] transition-colors">Assets</a>
          <a href="#creators" className="hover:text-[#ff9f4a] transition-colors">Creators</a>
          <a href="#about" className="hover:text-[#ff9f4a] transition-colors">Documentation</a>
          <a href="#license" className="hover:text-[#ff9f4a] transition-colors">CC0 License</a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-[#8a7564] text-center md:text-right">
          <p>© 2026 LootYard. Built with React & Vite for FSD Lab Week 5.</p>
        </div>
      </div>
    </footer>
  );
}
