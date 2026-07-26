import React, { useState, useEffect } from 'react';
import { MOCK_CREATORS, MOCK_ASSETS } from '../data/mockAssets';

const API_BASE = 'http://localhost:3001/api';

const CATEGORY_FA_ICONS = {
  characters: 'fad fa-user-ninja',
  props: 'fad fa-box-open',
  weapons: 'fad fa-swords',
  vehicles: 'fad fa-plane-engines',
  environments: 'fad fa-trees',
  vfx: 'fad fa-sparkles',
  ui: 'fad fa-layer-group',
  music: 'fad fa-music',
  animations: 'fad fa-film',
  shaders: 'fad fa-wand-magic-sparkles',
  textures: 'fad fa-palette',
};

export default function PortfolioPage({ onNavigate, selectedCreator, currentUser, setCurrentUser }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredAsset, setHoveredAsset] = useState(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0, placeAbove: false });
  const [commissionModalOpen, setCommissionModalOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Avatar URL helper: Gravatar for email logins, DiceBear for username logins
  const getAvatarUrl = (user) => {
    if (!user) return '';
    const identifier = user.email || user.emailOrUsername || user.username || '';
    if (identifier.includes('@')) {
      return `https://www.gravatar.com/avatar/${btoa(identifier.toLowerCase().trim())}?d=https%3A%2F%2Fapi.dicebear.com%2F8.x%2Fthumbs%2Fsvg%3Fseed%3D${encodeURIComponent(identifier)}%26backgroundColor%3Dffd2aa%2Cfff0df`;
    }
    return `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(identifier)}&backgroundColor=ffd2aa,fff0df,ffe4c4&shapeColor=ff9f4a,c0714a`;
  };

  // Creator Profile State
  const [creatorProfile, setCreatorProfile] = useState(selectedCreator || MOCK_CREATORS[0]);
  const [creatorAssets, setCreatorAssets] = useState([]);

  // Edit Profile Form State
  const [editDisplayName, setEditDisplayName] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBio, setEditBio] = useState('');

  // Asset Editing State (CRUD UPDATE for Asset)
  const [editAssetModalOpen, setEditAssetModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [editAssetTitle, setEditAssetTitle] = useState('');
  const [editAssetCategory, setEditAssetCategory] = useState('characters');
  const [editAssetDescription, setEditAssetDescription] = useState('');
  const [editAssetTags, setEditAssetTags] = useState('');

  // Asset Deletion Confirmation Modal State (CRUD DELETE)
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);

  // Commission Form State
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cReqs, setCReqs] = useState('');
  const [commSuccess, setCommSuccess] = useState(false);

  const creatorUsername = creatorProfile?.username || creatorProfile?.name || 'neonpulse';
  const isOwnProfile = currentUser && currentUser.username === creatorUsername;

  // Fetch Creator Profile & Assets from SQLite API
  const loadCreatorData = async () => {
    try {
      const [profileRes, assetsRes] = await Promise.all([
        fetch(`${API_BASE}/creators/${creatorUsername}`),
        fetch(`${API_BASE}/assets`)
      ]);

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setCreatorProfile(profileData);
      }

      if (assetsRes.ok) {
        const allAssets = await assetsRes.json();
        const userAssets = allAssets.filter(a => a.creator === creatorUsername);
        setCreatorAssets(userAssets);
      }
    } catch (err) {
      console.warn('SQLite API error, fallback to local dataset:', err.message);
      const fallbackUserAssets = MOCK_ASSETS.filter(a => a.creator === creatorUsername);
      setCreatorAssets(fallbackUserAssets);
    }
  };

  useEffect(() => {
    loadCreatorData();
  }, [creatorUsername]);

  const filteredAssets = creatorAssets.filter(a => activeCategory === 'all' || a.category === activeCategory);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const openEditProfile = () => {
    setEditDisplayName(creatorProfile.displayName || creatorUsername);
    setEditTitle(creatorProfile.title || '3D Artist');
    setEditBio(creatorProfile.bio || 'Crafting detailed game assets.');
    setEditProfileModalOpen(true);
  };

  // CRUD UPDATE: Update Creator Profile in SQLite
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/creators/${creatorUsername}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: editDisplayName,
          title: editTitle,
          bio: editBio,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setCreatorProfile(updated);
        showToast('✏ Profile updated in SQLite database!');
      } else {
        throw new Error('Update profile failed');
      }
    } catch (err) {
      setCreatorProfile({
        ...creatorProfile,
        displayName: editDisplayName,
        title: editTitle,
        bio: editBio,
      });
      showToast('✏ Profile updated locally!');
    }

    setEditProfileModalOpen(false);
  };

  // CRUD UPDATE: Edit Asset
  const openEditAssetModal = (asset) => {
    setEditingAsset(asset);
    setEditAssetTitle(asset.title || '');
    setEditAssetCategory(asset.category || 'characters');
    setEditAssetDescription(asset.description || '');
    setEditAssetTags(Array.isArray(asset.tags) ? asset.tags.join(', ') : (asset.tags || ''));
    setEditAssetModalOpen(true);
  };

  const handleEditAssetSubmit = async (e) => {
    e.preventDefault();
    if (!editingAsset) return;

    const updatedFields = {
      title: editAssetTitle,
      category: editAssetCategory,
      description: editAssetDescription,
      tags: editAssetTags.split(',').map(t => t.trim()),
    };

    try {
      const res = await fetch(`${API_BASE}/assets/${editingAsset.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });

      if (res.ok) {
        const updated = await res.json();
        setCreatorAssets(creatorAssets.map(a => a.id === updated.id ? updated : a));
        showToast(`✏ Updated "${updated.title}" in SQLite!`);
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      setCreatorAssets(creatorAssets.map(a => a.id === editingAsset.id ? { ...a, ...updatedFields } : a));
      showToast(`✏ Updated "${editAssetTitle}" locally!`);
    }

    setEditAssetModalOpen(false);
    setEditingAsset(null);
  };

  // CRUD DELETE ASSET WITH CONFIRMATION MODAL
  const triggerDeleteAsset = (asset) => {
    setAssetToDelete(asset);
    setDeleteConfirmModalOpen(true);
  };

  const confirmDeleteAsset = async () => {
    if (!assetToDelete) return;

    const assetId = assetToDelete.id;
    const title = assetToDelete.title;

    try {
      const res = await fetch(`${API_BASE}/assets/${assetId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        showToast(`🗑 Permanently deleted "${title}" from SQLite.`);
      }
    } catch (err) {
      showToast(`🗑 Deleted "${title}" locally.`);
    }

    setCreatorAssets(creatorAssets.filter(a => a.id !== assetId));
    setDeleteConfirmModalOpen(false);
    setAssetToDelete(null);
  };

  const handleCommissionSubmit = (e) => {
    e.preventDefault();
    if (!cName || !cEmail || !cReqs) return;
    setCommSuccess(true);
    setTimeout(() => {
      setCommSuccess(false);
      setCommissionModalOpen(false);
      setCName(''); setCEmail(''); setCReqs('');
      showToast('Commission request sent!');
    }, 1800);
  };

  const handleCardMouseEnter = (e, asset) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const placeAbove = spaceBelow < 240;
    setPopupPos({
      top: placeAbove ? rect.top - 8 : rect.bottom + 8,
      left: Math.max(160, Math.min(window.innerWidth - 160, rect.left + rect.width / 2)),
      placeAbove,
    });
    setHoveredAsset(asset);
  };

  return (
    <div className="bg-cream text-bark font-body min-h-screen relative flex flex-col">
      {/* HEADER: Logo & Navigation Options Left-Aligned Together */}
      <header id="navbar" className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-cream border-b border-[#f0e7dd] px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 h-full lg:px-10">
          
          {/* LEFT GROUP: Logo + Assets/Talent Options */}
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate && onNavigate('home')} className="flex items-center gap-2">
              <img src="/lab_exercises/week2/assets/chestnobg.png" alt="LootYard" className="h-10 w-10 object-contain" />
              <span className="font-hand text-2xl font-bold leading-none text-bark [text-shadow:0.5px_0_0_currentColor]">LootYard</span>
            </button>

            <nav aria-label="Section navigation" className="flex items-center">
              <ul className="flex items-center gap-1 rounded-full bg-white/80 p-1 border border-[#f0e7dd] font-body text-xs font-bold text-bark">
                <li>
                  <button onClick={() => onNavigate && onNavigate('home')} className="px-4 py-1.5 rounded-full text-[#8a7564] hover:text-bark transition-colors">
                    Assets
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate && onNavigate('home')} className="px-4 py-1.5 rounded-full text-[#8a7564] hover:text-bark transition-colors">
                    Talent
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* RIGHT GROUP: Search + Auth */}
          <div className="flex items-center gap-3 flex-1 max-w-xl justify-end">
            <div className="search-bar flex items-center gap-2 px-3.5 py-1.5 flex-1 max-w-xs bg-white border border-[#f0e7dd] rounded-full shadow-sm">
              <svg className="w-3.5 h-3.5 text-taupe flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
              <input type="text" placeholder="Search assets…" className="text-xs flex-1 bg-transparent outline-none placeholder:text-[#bba898]" />
            </div>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-9 h-9 rounded-full border-2 border-[#ff9f4a] overflow-hidden hover:scale-105 transition-transform shadow-sm focus:outline-none"
                  title={`@${currentUser.username}`}
                >
                  <img
                    src={getAvatarUrl(currentUser)}
                    alt={currentUser.username}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(currentUser.username)}`; }}
                  />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-[40]" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#f0e7dd] rounded-2xl shadow-2xl z-[50] overflow-hidden">
                      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#f0e7dd] bg-[#fffcf8]">
                        <img
                          src={getAvatarUrl(currentUser)}
                          alt={currentUser.username}
                          className="w-9 h-9 rounded-full border border-[#ffd2aa] object-cover"
                          onError={(e) => { e.target.src = `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(currentUser.username)}`; }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-extrabold text-[#15110d] truncate">{currentUser.displayName || currentUser.username}</p>
                          <p className="text-[10px] text-[#8a7564] truncate">{currentUser.email || `@${currentUser.username}`}</p>
                        </div>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            onNavigate && onNavigate('portfolio', { username: currentUser.username, displayName: currentUser.displayName || currentUser.username });
                          }}
                          className="w-full text-left px-4 py-2.5 text-xs font-semibold text-[#15110d] hover:bg-[#fff0df] transition-colors flex items-center gap-2"
                        >
                          <svg className="w-3.5 h-3.5 text-[#8a7564]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                          View Portfolio
                        </button>
                        <button
                          onClick={() => { setUserMenuOpen(false); showToast('🔔 Notifications — coming soon!'); }}
                          className="w-full text-left px-4 py-2.5 text-xs font-semibold text-[#15110d] hover:bg-[#fff0df] transition-colors flex items-center gap-2"
                        >
                          <svg className="w-3.5 h-3.5 text-[#8a7564]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                          Notifications
                        </button>
                        <div className="border-t border-[#f0e7dd] my-1" />
                        <button
                          onClick={() => { setUserMenuOpen(false); setCurrentUser(null); showToast('Logged out successfully.'); }}
                          className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                          Log out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => onNavigate && onNavigate('home', 'login')} className="text-xs font-bold text-bark/70 hover:text-bark transition-colors px-2 py-1">Log In</button>
                <button onClick={() => onNavigate && onNavigate('home', 'signup')} className="flex items-center gap-1.5 rounded-full border border-[#f0e7dd] bg-white px-3.5 py-1.5 text-xs font-bold text-bark shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#ff9f4a]">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[#fff0df] text-[#ff9f4a]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"/></svg>
                  </span>
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main id="mainContent" className="mt-[68px] pb-[58px] flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        <div id="masterGrid" className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          {/* LEFT 2 COLUMNS */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* CREATOR BIO CARD */}
            <div className="sf-card p-5 flex flex-col gap-4 bg-[#fffcf8] border border-[#f0e7dd] rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={creatorProfile.avatar || `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(creatorUsername)}`}
                    alt={creatorProfile.displayName || creatorUsername}
                    className="w-16 h-16 rounded-2xl border-2 border-[#ffd2aa] object-cover bg-[#fff0df]"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-black text-[#ff9f4a] uppercase tracking-widest block">Creator</span>
                  <h1 className="font-display text-2xl font-extrabold text-[#15110d] leading-tight mt-0.5">{creatorProfile.displayName || creatorUsername}</h1>
                  <p className="text-xs text-[#8a7564] font-semibold mt-0.5">{creatorProfile.title || '3D Artist'}</p>
                </div>

                {/* EDIT PROFILE BUTTON (Only visible on your own profile) */}
                {isOwnProfile && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={openEditProfile} className="px-3 py-1.5 rounded-xl border border-[#ff9f4a] bg-[#fff0df] text-xs font-bold text-[#15110d] hover:bg-[#ffd2aa] transition-colors flex items-center gap-1 shadow-sm">
                      ✏ Edit Profile
                    </button>
                  </div>
                )}
              </div>

              <p className="text-xs text-[#15110d]/70 leading-relaxed">
                {creatorProfile.bio || 'Independent game developer & asset creator on LootYard.'}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="tag-chip font-bold text-xs bg-[#ffd2aa] text-[#5c4a3c] border border-[#f0d8b8] px-3 py-1 rounded-full">📦 <strong>{creatorAssets.length}</strong> assets</span>
                <span className="tag-chip font-bold text-xs bg-[#ffd2aa] text-[#5c4a3c] border border-[#f0d8b8] px-3 py-1 rounded-full">📥 <strong>{(creatorAssets.length * 1.2).toFixed(1)}k</strong> dls</span>
                <span className="tag-chip font-bold text-xs bg-[#ffd2aa] text-[#5c4a3c] border border-[#f0d8b8] px-3 py-1 rounded-full">⭐ <strong>{creatorProfile.rating || 4.8}</strong> rating</span>
              </div>
            </div>

            {/* ASSETS GRID */}
            <div className="sf-card p-5 bg-[#fffcf8] border border-[#f0e7dd] rounded-2xl space-y-4 relative">
              <div className="flex items-center justify-between border-b border-[#f0e7dd] pb-3">
                <h2 className="font-display text-base font-bold text-bark">Portfolio Assets</h2>
                <span className="text-xs text-[#8a7564] font-semibold bg-[#fff0df] px-2.5 py-0.5 rounded-full border border-[#f0d8b8]">{filteredAssets.length} assets</span>
              </div>

              {filteredAssets.length === 0 ? (
                <div className="p-8 text-center bg-cream/50 rounded-2xl border border-dashed border-[#f0e7dd] space-y-2">
                  <p className="text-xs font-bold text-[#15110d]">No assets published yet.</p>
                  <p className="text-[11px] text-[#8a7564]">This profile has 0 published assets.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredAssets.map((asset) => (
                    <div
                      key={asset.id}
                      onMouseEnter={(e) => handleCardMouseEnter(e, asset)}
                      onMouseLeave={() => setHoveredAsset(null)}
                      onClick={() => onNavigate && onNavigate('home', asset)}
                      className="product-card bg-white border border-[#f0e7dd] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:border-[#ff9f4a] hover:shadow-md transition-all p-2 space-y-1.5 group relative"
                    >
                      {/* OWNER ACTION BUTTONS OVERLAY (Pencil & Delete Trash) */}
                      {isOwnProfile && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 z-20" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => openEditAssetModal(asset)}
                            title="Edit Asset"
                            className="w-7 h-7 rounded-full bg-white/95 border border-[#ff9f4a] text-[#ff9f4a] hover:bg-[#ff9f4a] hover:text-white flex items-center justify-center text-xs shadow-md transition-all font-bold"
                          >
                            ✏
                          </button>
                          <button
                            onClick={() => triggerDeleteAsset(asset)}
                            title="Delete Asset"
                            className="w-7 h-7 rounded-full bg-white/95 border border-red-400 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center text-xs shadow-md transition-all font-bold"
                          >
                            🗑
                          </button>
                        </div>
                      )}

                      <div className="aspect-[4/3] bg-[#fff0df] rounded-lg overflow-hidden relative">
                        <img src={asset.thumbnailUrl} alt={asset.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <h3 className="font-display text-xs font-bold truncate text-[#15110d] group-hover:text-[#ff9f4a] transition-colors">{asset.title}</h3>
                      <div className="flex items-center justify-between text-[10px] text-[#8a7564]">
                        <span className="stars text-[#ff9f4a]">★★★★☆</span>
                        <span className="font-bold text-[#15110d]">{asset.rating || 4.7}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* COMMUNITY REVIEWS */}
            <div className="sf-card p-5 bg-[#fffcf8] border border-[#f0e7dd] rounded-2xl space-y-3">
              <h2 className="font-display text-base font-bold text-bark">Community Reviews</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-cream border border-[#f0e7dd] rounded-xl p-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <img src="https://api.dicebear.com/8.x/thumbs/svg?seed=cyber_dev" width="28" height="28" className="w-7 h-7 rounded-full border border-[#f0e7dd] object-cover" alt="" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#15110d]">cyber_dev</p>
                      <p className="text-[10px] text-[#8a7564]">Featured Creator Review</p>
                    </div>
                    <span className="text-[#ff9f4a] text-xs">★★★★★</span>
                  </div>
                  <p className="text-xs text-[#8a7564] leading-snug pt-1">Highly detailed emission maps! Clean topology and great rigs.</p>
                </div>

                <div className="bg-cream border border-[#f0e7dd] rounded-xl p-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <img src="https://api.dicebear.com/8.x/thumbs/svg?seed=mercury" width="28" height="28" className="w-7 h-7 rounded-full border border-[#f0e7dd] object-cover" alt="" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#15110d]">mercury</p>
                      <p className="text-[10px] text-[#8a7564]">Featured Creator Review</p>
                    </div>
                    <span className="text-[#ff9f4a] text-xs">★★★★★</span>
                  </div>
                  <p className="text-xs text-[#8a7564] leading-snug pt-1">Mixamo rigging retargeting works beautifully.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div id="rightSidebar" className="flex flex-col gap-4">
            {/* HIRE CARD (Hidden if viewing your own profile) */}
            {!isOwnProfile && (
              <div id="commissionArea" className="sf-card p-5 bg-[#f0faf2] border border-[#c2e7cd] rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] font-black text-green-800 uppercase tracking-wider">Open for hire</span>
                </div>
                <p className="text-xs text-green-900 leading-relaxed">Available for commissions, freelance projects, and custom asset creation.</p>
                <div className="text-xs space-y-1.5 border-t border-green-200/60 pt-2 text-green-900">
                  <div className="flex justify-between"><span>Response</span><strong>&lt; 24h</strong></div>
                  <div className="flex justify-between"><span>Delivery</span><strong>5–10 days</strong></div>
                  <div className="flex justify-between"><span>Starting rate</span><strong>From $30</strong></div>
                </div>
                <button
                  onClick={() => setCommissionModalOpen(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  Hire for a project
                </button>
              </div>
            )}

            {/* SOCIAL LINKS */}
            <div className="sf-card p-5 bg-[#fffcf8] border border-[#f0e7dd] rounded-2xl space-y-2.5">
              <p className="text-[10px] font-bold text-[#8a7564] uppercase tracking-wider">Social Links</p>
              <div className="space-y-2 text-xs font-semibold text-[#5c4a3c]">
                {[
                  { name: 'GitHub', handle: creatorUsername, icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z' },
                  { name: 'X / Twitter', handle: creatorUsername, icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                ].map((s, idx) => (
                  <a key={idx} href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 p-2.5 bg-cream border border-[#f0e7dd] rounded-xl hover:border-[#ff9f4a] transition-all group">
                    <span className="w-6 h-6 rounded-lg bg-[#fff0df] flex items-center justify-center text-[#5c4a3c]">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon}/></svg>
                    </span>
                    <span className="text-xs font-bold text-[#15110d] group-hover:text-[#ff9f4a] transition-colors">{s.handle}</span>
                    <svg className="w-3 h-3 text-[#8a7564] ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 17l10-10"/></svg>
                  </a>
                ))}
              </div>
            </div>

            {/* MATERIAL-UI TIMELINE */}
            <div className="sf-card p-5 bg-[#fffcf8] border border-[#f0e7dd] rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-[#8a7564] uppercase tracking-wider">Work History Timeline</p>
                <span className="text-[9px] font-bold bg-[#fff0df] text-[#ff9f4a] border border-[#f0d8b8] px-2 py-0.5 rounded-full">{creatorAssets.length} milestones</span>
              </div>

              {creatorAssets.length === 0 ? (
                <p className="text-xs text-[#8a7564] py-2">No work history recorded yet.</p>
              ) : (
                <div className="relative space-y-4 pl-3 before:absolute before:left-[17px] before:top-3 before:bottom-3 before:w-[2px] before:bg-[#f0e7dd]">
                  {creatorAssets.map((asset, idx) => {
                    const iconClass = CATEGORY_FA_ICONS[asset.category] || 'fad fa-cube';
                    return (
                      <div
                        key={asset.id || idx}
                        onClick={() => onNavigate && onNavigate('home', asset)}
                        className="relative flex items-start gap-3 pl-8 py-1 group cursor-pointer rounded-xl hover:bg-[#fff0df]/60 transition-all"
                      >
                        <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-[#fff0df] border-2 border-[#ff9f4a] group-hover:bg-[#ff9f4a] group-hover:text-white transition-all flex items-center justify-center text-xs text-[#ff9f4a] shadow-sm z-10">
                          <i className={iconClass}></i>
                        </div>

                        <div className="min-w-0 flex-1">
                          <span className="inline-block text-[9px] font-black uppercase text-[#ff9f4a] bg-[#fff0df] border border-[#f0d8b8] px-2 py-0.5 rounded-full mb-0.5 group-hover:bg-[#ff9f4a] group-hover:text-white transition-colors">
                            JAN 2028
                          </span>
                          <h4 className="text-xs font-extrabold text-[#15110d] group-hover:text-[#ff9f4a] transition-colors truncate">{asset.title}</h4>
                          <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-[#8a7564] font-semibold">
                            <span className="capitalize">{asset.category}</span>
                            <span>·</span>
                            <span className="text-[#ff9f4a] font-bold">📥 {asset.downloadsCount || 520}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* FIXED SITE FOOTER */}
      <footer id="siteFooter" className="fixed bottom-0 left-0 right-0 z-50 h-[48px] bg-cream border-t border-[#f0e7dd] px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between h-full lg:px-10">
          <div className="flex items-center gap-2">
            <img src="/lab_exercises/week2/assets/chestnobg.png" alt="" className="h-6 w-6 object-contain" />
            <span className="font-hand text-base font-bold text-bark [text-shadow:0.5px_0_0_currentColor]">LootYard</span>
            <span className="hidden sm:inline ml-1.5 text-[10px] text-bark/40">Free assets, real creators</span>
          </div>
          <p className="text-[10px] text-bark/40 hidden sm:block">© 2026 LootYard</p>
          <div className="flex gap-3 text-bark/40">
            <a href="#" className="hover:text-mango transition-colors" aria-label="X"><svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
            <a href="#" className="hover:text-mango transition-colors" aria-label="GitHub"><svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"/></svg></a>
          </div>
        </div>
      </footer>

      {/* DELETE ASSET CONFIRMATION MODAL */}
      {deleteConfirmModalOpen && assetToDelete && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="sf-card w-full max-w-sm p-6 bg-white border border-[#f0e7dd] rounded-3xl relative space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 border border-red-300 text-red-500 font-bold text-xl flex items-center justify-center mx-auto">
              ⚠️
            </div>
            <h3 className="font-display text-lg font-extrabold text-[#15110d]">Delete Asset Confirmation</h3>
            <p className="text-xs text-[#8a7564] leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-[#15110d]">"{assetToDelete.title}"</strong> from LootYard and SQLite database? This action cannot be undone.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => { setDeleteConfirmModalOpen(false); setAssetToDelete(null); }}
                className="flex-1 py-2.5 rounded-xl border border-[#f0e7dd] bg-[#fff0df] text-xs font-bold text-[#15110d] hover:bg-[#ffd2aa] transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteAsset}
                className="flex-1 py-2.5 rounded-xl border border-red-500 bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-md transition-colors"
              >
                Yes, Delete Asset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL (SQLite UPDATE for Creator Record) */}
      {editProfileModalOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <form onSubmit={handleSaveProfile} className="sf-card w-full max-w-md p-6 bg-white border border-[#f0e7dd] rounded-3xl relative space-y-4 shadow-2xl">
            <button type="button" onClick={() => setEditProfileModalOpen(false)} className="absolute top-4 right-4 text-taupe font-bold">✕</button>
            <h3 className="font-display text-xl font-extrabold text-[#15110d]">Edit Creator Profile</h3>
            <p className="text-xs text-[#8a7564]">Update your profile info in SQLite database.</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Display Name</label>
                <input type="text" required value={editDisplayName} onChange={(e) => setEditDisplayName(e.target.value)} className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
              </div>
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Title / Role</label>
                <input type="text" required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
              </div>
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Bio</label>
                <textarea rows={3} value={editBio} onChange={(e) => setEditBio(e.target.value)} className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-[#ff9f4a] hover:bg-[#f08a30] text-white text-xs font-bold rounded-xl shadow">
              Save Profile Changes
            </button>
          </form>
        </div>
      )}

      {/* EDIT ASSET MODAL (CRUD UPDATE for Creator's Asset) */}
      {editAssetModalOpen && editingAsset && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <form onSubmit={handleEditAssetSubmit} className="sf-card w-full max-w-md p-6 bg-white border border-[#f0e7dd] rounded-3xl relative space-y-4 shadow-2xl">
            <button type="button" onClick={() => setEditAssetModalOpen(false)} className="absolute top-4 right-4 text-taupe font-bold">✕</button>
            <h3 className="font-display text-xl font-extrabold text-[#15110d]">Edit Asset Details</h3>
            <p className="text-xs text-[#8a7564]">Update record for "{editingAsset.title}".</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Asset Title</label>
                <input type="text" required value={editAssetTitle} onChange={(e) => setEditAssetTitle(e.target.value)} className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
              </div>
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Category</label>
                <select value={editAssetCategory} onChange={(e) => setEditAssetCategory(e.target.value)} className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none capitalize">
                  {['characters', 'props', 'weapons', 'vehicles', 'environments', 'vfx', 'ui', 'music', 'animations', 'shaders', 'textures'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Description</label>
                <textarea rows={3} value={editAssetDescription} onChange={(e) => setEditAssetDescription(e.target.value)} className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
              </div>
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Tags (comma separated)</label>
                <input type="text" value={editAssetTags} onChange={(e) => setEditAssetTags(e.target.value)} className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-[#ff9f4a] hover:bg-[#f08a30] text-white text-xs font-bold rounded-xl shadow">
              Save Asset Changes
            </button>
          </form>
        </div>
      )}

      {/* SMART POSITIONED HOVER INFO CARD POPOVER */}
      {hoveredAsset && (
        <div
          className={`fixed z-[9999] w-72 bg-[#fffcf8] border border-[#f0e7dd] rounded-2xl shadow-2xl p-4 space-y-3 pointer-events-none -translate-x-1/2 ${
            popupPos.placeAbove ? '-translate-y-full mb-2' : 'mt-2'
          }`}
          style={{ top: `${popupPos.top}px`, left: `${popupPos.left}px` }}
        >
          <div className="flex items-center gap-3">
            <img src={hoveredAsset.thumbnailUrl} alt={hoveredAsset.title} className="w-11 h-11 rounded-xl object-cover border border-[#f0e7dd] bg-[#fff0df]" />
            <div className="min-w-0">
              <h3 className="font-display font-bold text-xs text-[#15110d] truncate">{hoveredAsset.title}</h3>
              <p className="text-[10px] text-[#8a7564] capitalize">{hoveredAsset.category || 'Character Artist'}</p>
            </div>
          </div>
          <div className="space-y-1 text-[11px] pt-1.5 border-t border-[#f0e7dd]">
            <div className="flex justify-between"><span className="text-[#8a7564]">Downloads</span><strong className="text-[#15110d]">574 downloads</strong></div>
            <div className="flex justify-between"><span className="text-[#8a7564]">Rating</span><strong className="text-[#ff9f4a]">4.4 / 5</strong></div>
            <div className="flex justify-between"><span className="text-[#8a7564]">Reviews</span><strong className="text-[#15110d]">0 reviews</strong></div>
          </div>
          <p className="text-[11px] text-[#8a7564] leading-relaxed pt-1.5 border-t border-[#f0e7dd] line-clamp-2">{hoveredAsset.description}</p>
        </div>
      )}

      {/* COMMISSION MODAL */}
      {commissionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleCommissionSubmit} className="sf-card w-full max-w-md p-6 bg-white border border-[#f0e7dd] rounded-3xl relative space-y-4">
            <button type="button" onClick={() => setCommissionModalOpen(false)} className="absolute top-4 right-4 text-taupe">✕</button>
            <h3 className="font-display text-xl font-extrabold text-[#15110d]">Commission Request</h3>
            <p className="text-xs text-[#8a7564]">Hire {creatorProfile.displayName || creatorUsername} for custom 3D asset creation.</p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Your name</label>
                <input type="text" required value={cName} onChange={(e) => setCName(e.target.value)} placeholder="Jane Smith" className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
              </div>
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Your email</label>
                <input type="email" required value={cEmail} onChange={(e) => setCEmail(e.target.value)} placeholder="jane@example.com" className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
              </div>
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Project requirements</label>
                <textarea required rows={3} value={cReqs} onChange={(e) => setCReqs(e.target.value)} placeholder="Describe what you need..." className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
              </div>
            </div>
            {commSuccess && (
              <div className="p-3 bg-green-100 border border-green-300 text-green-800 rounded-xl text-xs font-bold text-center">
                ✅ Commission request sent! You'll hear back within 24 hours.
              </div>
            )}
            <button type="submit" className="w-full py-3 bg-green-600 text-white text-xs font-bold rounded-xl">Submit Request</button>
          </form>
        </div>
      )}

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 bg-bark text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl z-[9999]">
          {toastMsg}
        </div>
      )}
    </div>
  );
}
