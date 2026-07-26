import React, { useState } from 'react';
import { Search, Package, User, LogIn, UserPlus, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenAuth, activeTab, setActiveTab, searchQuery, setSearchQuery }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-[#fff8f1]/90 backdrop-blur-md border-b border-[#f0e7dd] px-4 md:px-8 flex items-center justify-between transition-all">
      {/* Brand Logo */}
      <div className="flex items-center gap-6">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff9f4a] to-[#e88835] flex items-center justify-center text-white shadow-md shadow-[#ff9f4a]/20 group-hover:scale-105 transition-transform">
            <Package className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-extrabold tracking-tight text-[#15110d] group-hover:text-[#ff9f4a] transition-colors">
              LootYard
            </span>
            <span className="text-[10px] font-bold text-[#8a7564] tracking-wider uppercase -mt-1">
              Asset Salvage
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1 bg-[#fff0df]/60 p-1 rounded-full border border-[#f0d8b8]/50">
          <button
            onClick={() => setActiveTab('assets')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'assets'
                ? 'bg-[#ff9f4a] text-white shadow-sm'
                : 'text-[#5c4a3c] hover:text-[#15110d]'
            }`}
          >
            Loot Library
          </button>
          <button
            onClick={() => setActiveTab('creators')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'creators'
                ? 'bg-[#ff9f4a] text-white shadow-sm'
                : 'text-[#5c4a3c] hover:text-[#15110d]'
            }`}
          >
            Talent Hub
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'about'
                ? 'bg-[#ff9f4a] text-white shadow-sm'
                : 'text-[#5c4a3c] hover:text-[#15110d]'
            }`}
          >
            About
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a7564]" />
          <input
            type="text"
            placeholder="Search 3D models, sound effects, UI kits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/80 border border-[#f0e7dd] rounded-full text-xs font-medium focus:outline-none focus:border-[#ff9f4a] focus:ring-2 focus:ring-[#ff9f4a]/20 transition-all placeholder:text-[#8a7564]/70"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={() => onOpenAuth('login')}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#15110d] hover:text-[#ff9f4a] transition-colors"
        >
          <LogIn className="w-3.5 h-3.5" />
          Log In
        </button>
        <button
          onClick={() => onOpenAuth('signup')}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#ff9f4a] hover:bg-[#e88835] text-white text-xs font-bold rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Sign Up Free
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 text-[#15110d] hover:bg-[#fff0df] rounded-lg transition-colors"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-[68px] left-0 right-0 bg-[#fff8f1] border-b border-[#f0e7dd] p-4 flex flex-col gap-3 shadow-xl md:hidden animate-in slide-in-from-top duration-200">
          <input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-[#f0e7dd] rounded-full text-xs font-medium focus:outline-none focus:border-[#ff9f4a]"
          />
          <div className="flex flex-col gap-1">
            <button
              onClick={() => { setActiveTab('assets'); setMobileMenuOpen(false); }}
              className={`text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${activeTab === 'assets' ? 'bg-[#ff9f4a] text-white' : 'text-[#15110d]'}`}
            >
              Loot Library
            </button>
            <button
              onClick={() => { setActiveTab('creators'); setMobileMenuOpen(false); }}
              className={`text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${activeTab === 'creators' ? 'bg-[#ff9f4a] text-white' : 'text-[#15110d]'}`}
            >
              Talent Hub
            </button>
            <button
              onClick={() => { setActiveTab('about'); setMobileMenuOpen(false); }}
              className={`text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${activeTab === 'about' ? 'bg-[#ff9f4a] text-white' : 'text-[#15110d]'}`}
            >
              About
            </button>
          </div>
          <div className="pt-2 border-t border-[#f0e7dd] flex gap-2">
            <button
              onClick={() => { onOpenAuth('login'); setMobileMenuOpen(false); }}
              className="flex-1 py-2 text-xs font-bold text-center border border-[#f0e7dd] rounded-full"
            >
              Log In
            </button>
            <button
              onClick={() => { onOpenAuth('signup'); setMobileMenuOpen(false); }}
              className="flex-1 py-2 text-xs font-bold text-center bg-[#ff9f4a] text-white rounded-full"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
