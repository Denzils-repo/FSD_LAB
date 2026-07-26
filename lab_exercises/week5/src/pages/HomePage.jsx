import React, { useState, useEffect } from 'react';
import { MOCK_ASSETS, MOCK_REVIEWS, MOCK_CREATORS } from '../data/mockAssets';

const API_BASE = 'http://localhost:3001/api';

export default function HomePage({ onNavigate, initialAuthMode, initialProduct, currentUser, setCurrentUser }) {
  const [activeTab, setActiveTab] = useState('assets');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('popular');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(initialProduct || null);
  const [preview3dOpen, setPreview3dOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(!!initialAuthMode);
  const [authMode, setAuthMode] = useState(initialAuthMode || 'login');
  const [authEmailOrUser, setAuthEmailOrUser] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authUsername, setAuthUsername] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Gravatar MD5 helper (simple hash for email avatars)
  const getAvatarUrl = (user) => {
    if (!user) return '';
    const isEmail = user.emailOrUsername?.includes('@') || user.email?.includes('@');
    const identifier = user.email || user.emailOrUsername || user.username || '';
    if (isEmail || identifier.includes('@')) {
      // Use DiceBear with email seed as Gravatar-style fallback
      return `https://www.gravatar.com/avatar/${btoa(identifier.toLowerCase().trim())}?d=https%3A%2F%2Fapi.dicebear.com%2F8.x%2Fthumbs%2Fsvg%3Fseed%3D${encodeURIComponent(identifier)}%26backgroundColor%3Dffd2aa%2Cfff0df`;
    }
    return `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(identifier)}&backgroundColor=ffd2aa,fff0df,ffe4c4&shapeColor=ff9f4a,c0714a`;
  };

  // CRUD & Upload State
  const [assetsList, setAssetsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Form Fields State for Asset Creation
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('characters');
  const [formDescription, setFormDescription] = useState('');
  const [formTags, setFormTags] = useState('3d, gameart, lowpoly');
  const [formLicense, setFormLicense] = useState('commercial');

  // Asset Editing State (CRUD UPDATE)
  const [editAssetModalOpen, setEditAssetModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [editAssetTitle, setEditAssetTitle] = useState('');
  const [editAssetCategory, setEditAssetCategory] = useState('characters');
  const [editAssetDescription, setEditAssetDescription] = useState('');
  const [editAssetTags, setEditAssetTags] = useState('');

  // Asset Deletion Confirmation Modal State (CRUD DELETE)
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);

  // Fetch Assets from SQLite API
  const fetchAssetsFromApi = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/assets`);
      if (res.ok) {
        const data = await res.json();
        setAssetsList(data);
      } else {
        throw new Error('API server error');
      }
    } catch (err) {
      console.warn('SQLite API unreachable, using local data:', err.message);
      setAssetsList(MOCK_ASSETS);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssetsFromApi();
  }, []);

  useEffect(() => {
    if (initialProduct) {
      const fullAsset = assetsList.find(a => a.id === initialProduct.id || a.title === initialProduct.title) || initialProduct;
      const revs = (MOCK_REVIEWS && MOCK_REVIEWS[fullAsset.id]) || [
        { username: 'cyber_dev', rating: 5, comment: 'Highly detailed emission maps! The neon details look killer.', createdAt: '37d ago' },
        { username: 'mercury', rating: 5, comment: 'Mixamo rigging retargeting works beautifully.', createdAt: '40d ago' }
      ];
      setSelectedProduct({
        ...fullAsset,
        rating: fullAsset.rating || 5.0,
        reviews: revs,
        reviewsCount: revs.length,
      });
      setActiveTab('assets');
    }
  }, [initialProduct, assetsList]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // SQLITE AUTH: LOGIN / SIGNUP
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!authPassword) return;

    if (authMode === 'login') {
      try {
        const res = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailOrUsername: authEmailOrUser, password: authPassword }),
        });
        const data = await res.json();
        if (res.ok) {
          setCurrentUser(data);
          setAuthModalOpen(false);
          showToast(`Logged in as @${data.username}`);
        } else {
          showToast(`❌ ${data.error || 'Login failed'}`);
        }
      } catch (err) {
        const fallbackUser = { username: authEmailOrUser.split('@')[0] || 'creator', displayName: authEmailOrUser.split('@')[0] };
        setCurrentUser(fallbackUser);
        setAuthModalOpen(false);
        showToast(`Logged in as @${fallbackUser.username}`);
      }
    } else {
      try {
        const res = await fetch(`${API_BASE}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: authUsername || authEmailOrUser.split('@')[0], email: authEmailOrUser, password: authPassword }),
        });
        const data = await res.json();
        if (res.ok) {
          setCurrentUser(data);
          setAuthModalOpen(false);
          showToast(`✅ Registered and logged in as @${data.username}`);
        } else {
          showToast(`❌ ${data.error || 'Registration failed'}`);
        }
      } catch (err) {
        const fallbackUser = { username: authUsername || 'creator', displayName: authUsername || 'Creator' };
        setCurrentUser(fallbackUser);
        setAuthModalOpen(false);
        showToast(`Registered as @${fallbackUser.username}`);
      }
    }
  };

  // UPLOAD ASSET (Only available when logged in)
  const handleUploadAsset = async (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !currentUser) return;

    const newAssetData = {
      title: formTitle,
      creator: currentUser.username || 'creator',
      category: formCategory,
      description: formDescription,
      tags: formTags.split(',').map(t => t.trim()),
      thumbnailUrl: '/lab_exercises/week2/assets/asset-sword.jpg',
      badge: 'New',
    };

    try {
      const res = await fetch(`${API_BASE}/assets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAssetData),
      });

      if (res.ok) {
        const created = await res.json();
        setAssetsList([created, ...assetsList]);
        showToast(`✅ Uploaded "${created.title}" under @${currentUser.username}`);
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      const fallbackCreated = {
        ...newAssetData,
        id: `a_${Date.now()}`,
        status: 'available',
        rating: 5.0,
        downloadsCount: 1,
      };
      setAssetsList([fallbackCreated, ...assetsList]);
      showToast(`✅ Uploaded "${fallbackCreated.title}" locally`);
    }

    setUploadModalOpen(false);
    resetFormFields();
  };

  const resetFormFields = () => {
    setFormTitle('');
    setFormCategory('characters');
    setFormDescription('');
    setFormTags('3d, gameart, lowpoly');
    setFormLicense('commercial');
  };

  // CRUD EDIT ASSET (UPDATE)
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
        setAssetsList(assetsList.map(a => a.id === updated.id ? updated : a));
        if (selectedProduct && selectedProduct.id === updated.id) {
          setSelectedProduct({ ...selectedProduct, ...updated });
        }
        showToast(`✏ Updated "${updated.title}" in SQLite!`);
      } else {
        throw new Error('Update asset failed');
      }
    } catch (err) {
      setAssetsList(assetsList.map(a => a.id === editingAsset.id ? { ...a, ...updatedFields } : a));
      if (selectedProduct && selectedProduct.id === editingAsset.id) {
        setSelectedProduct({ ...selectedProduct, ...updatedFields });
      }
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

    setAssetsList(assetsList.filter(a => a.id !== assetId));
    if (selectedProduct && selectedProduct.id === assetId) {
      setSelectedProduct(null);
    }

    setDeleteConfirmModalOpen(false);
    setAssetToDelete(null);
  };

  // Filtered Assets
  const filteredAssets = assetsList.filter(asset => {
    const matchCategory = activeCategory === 'all' || asset.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchQuery = !q ||
      asset.title.toLowerCase().includes(q) ||
      (asset.description && asset.description.toLowerCase().includes(q)) ||
      (asset.creator && asset.creator.toLowerCase().includes(q)) ||
      (Array.isArray(asset.tags) && asset.tags.some(t => t.toLowerCase().includes(q)));
    return matchCategory && matchQuery;
  });

  // Consolidate Creator Database
  const creatorsMap = {};
  MOCK_CREATORS.forEach(c => { creatorsMap[c.name] = c; });
  assetsList.forEach(a => {
    if (a.creator && !creatorsMap[a.creator]) {
      creatorsMap[a.creator] = {
        username: a.creator,
        displayName: `@${a.creator}`,
        title: `${a.category} Specialist`,
        bio: `Crafting dynamic 3D assets on LootYard.`,
        avatar: `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(a.creator)}&backgroundColor=ffd2aa,fff0df,ffe4c4&shapeColor=ff9f4a,c0714a`,
        rating: a.rating || 5.0,
      };
    }
  });

  const creatorList = Object.values(creatorsMap);

  return (
    <div className="bg-cream text-bark font-body min-h-screen relative flex flex-col">
      {/* HEADER: Logo & Navigation Options Left-Aligned Together */}
      <header id="navbar" className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-cream border-b border-[#f0e7dd] px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 h-full lg:px-10">
          
          {/* LEFT GROUP: Logo + Assets/Talent Options */}
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate && onNavigate('index')} className="flex items-center gap-2">
              <img src="/lab_exercises/week2/assets/chestnobg.png" alt="LootYard" className="h-10 w-10 object-contain" />
              <span className="font-hand text-2xl font-bold leading-none text-bark [text-shadow:0.5px_0_0_currentColor]">LootYard</span>
            </button>

            <nav aria-label="Section navigation" className="flex items-center">
              <ul className="flex items-center gap-1 rounded-full bg-white/80 p-1 border border-[#f0e7dd] font-body text-xs font-bold text-bark">
                <li>
                  <button
                    onClick={() => { setSelectedProduct(null); setActiveTab('assets'); }}
                    className={`px-4 py-1.5 rounded-full transition-all ${activeTab === 'assets' && !selectedProduct ? 'bg-[#ff9f4a] text-white shadow-sm' : 'text-[#8a7564] hover:text-bark'}`}
                  >
                    Assets
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => { setSelectedProduct(null); setActiveTab('talent'); }}
                    className={`px-4 py-1.5 rounded-full transition-all ${activeTab === 'talent' ? 'bg-[#ff9f4a] text-white shadow-sm' : 'text-[#8a7564] hover:text-bark'}`}
                  >
                    Talent
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* RIGHT GROUP: Search + Upload + User Auth */}
          <div className="flex items-center gap-3 flex-1 max-w-xl justify-end">
            <div className="search-bar flex items-center gap-2 px-3.5 py-1.5 flex-1 max-w-xs bg-white border border-[#f0e7dd] rounded-full shadow-sm">
              <svg className="w-3.5 h-3.5 text-taupe flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
              <input
                id="searchInput"
                type="text"
                placeholder="Search assets…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs flex-1 bg-transparent outline-none placeholder:text-[#bba898]"
              />
            </div>

            {/* UPLOAD ASSET BUTTON (Only visible when logged in) */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { resetFormFields(); setUploadModalOpen(true); }}
                  className="flex items-center gap-1.5 rounded-full bg-[#ff9f4a] hover:bg-[#f08a30] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:scale-105"
                >
                  <span>+</span> Upload Asset
                </button>

                {/* AVATAR BUTTON + DROPDOWN MENU */}
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

                  {/* DROPDOWN */}
                  {userMenuOpen && (
                    <>
                      {/* Backdrop to close */}
                      <div className="fixed inset-0 z-[40]" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#f0e7dd] rounded-2xl shadow-2xl z-[50] overflow-hidden">
                        {/* User Info Header */}
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

                        {/* Menu Items */}
                        <div className="py-1">
                          <button
                            onClick={() => {
                              setUserMenuOpen(false);
                              const creator = creatorsMap[currentUser.username] || { username: currentUser.username, displayName: currentUser.displayName || currentUser.username };
                              onNavigate && onNavigate('portfolio', creator);
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
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }} className="text-xs font-bold text-bark/70 hover:text-bark transition-colors px-2 py-1">Log In</button>
                <button onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }} className="flex items-center gap-1.5 rounded-full border border-[#f0e7dd] bg-white px-3.5 py-1.5 text-xs font-bold text-bark shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#ff9f4a]">
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
      <main id="mainContent" className="mt-[68px] pb-[58px] flex-1 max-w-7xl mx-auto w-full px-6 py-4 flex flex-col">
        {/* ASSETS VIEW */}
        {activeTab === 'assets' && !selectedProduct && (
          <div id="assetsView" className="flex flex-col gap-4 flex-1">
            <div className="toolbar-row flex items-center justify-between gap-3">
              <div id="categoryChips" className="flex items-center gap-1.5 overflow-x-auto pb-1 flex-1">
                {['all', 'characters', 'props', 'weapons', 'vehicles', 'environments', 'vfx', 'ui', 'music', 'animations', 'shaders', 'textures'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`cat-chip px-3 py-1 rounded-full text-xs font-semibold border transition-all whitespace-nowrap capitalize ${
                      activeCategory === cat
                        ? 'bg-[#fff0df] border-[#ffd2aa] text-[#15110d] font-bold'
                        : 'bg-white border-[#f0e7dd] text-[#8a7564] hover:bg-[#fff0df]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort Menu */}
              <div className="sort-wrap relative flex-shrink-0">
                <button onClick={() => setSortMenuOpen(!sortMenuOpen)} className="sort-btn flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#f0e7dd] bg-white text-xs font-semibold text-[#5c4a3c]">
                  <span>Sort: <strong className="text-[#15110d] uppercase">{sortOption}</strong></span>
                  <svg className="w-3.5 h-3.5 text-taupe" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                </button>
                {sortMenuOpen && (
                  <div className="sort-menu absolute right-0 top-full mt-1.5 w-44 bg-white border border-[#f0e7dd] rounded-xl shadow-xl p-1 z-50">
                    {['popular', 'downloaded', 'newest', 'oldest'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSortOption(opt); setSortMenuOpen(false); }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold capitalize ${sortOption === opt ? 'bg-[#fff0df] text-[#15110d]' : 'text-[#8a7564] hover:bg-gray-50'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="showing-label font-display text-sm font-bold text-bark flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span>All Assets ({filteredAssets.length})</span>
                <span className="text-[#ff9f4a]">›</span>
              </div>
            </div>

            {/* Asset Cards Grid */}
            <div className="card-scroll flex-1 overflow-y-auto">
              <div className="card-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => setSelectedProduct(asset)}
                    className="product-card bg-[#fffcf8] border border-[#f0e7dd] rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all relative group"
                  >
                    {asset.badge && <span className="card-badge absolute top-1.5 left-1.5 bg-[#ff9f4a] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full z-10">{asset.badge}</span>}

                    {/* OWNER ACTION BUTTONS OVERLAY (Edit Pencil & Delete Trash) */}
                    {currentUser && currentUser.username === asset.creator && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 z-20" onClick={(e) => e.stopPropagation()}>
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

                    <div className="card-img-wrap aspect-[4/3] bg-[#fff0df] overflow-hidden">
                      <img src={asset.thumbnailUrl} alt={asset.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="card-info p-2.5 space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-[#ff9f4a] capitalize">{asset.category}</span>
                        <span className="text-[#8a7564] font-semibold">★ {asset.rating}</span>
                      </div>
                      <h3 className="font-display text-xs font-bold text-[#15110d] truncate">{asset.title}</h3>
                      <div className="flex items-center justify-between text-[10px] text-[#8a7564]">
                        <span>by @{asset.creator}</span>
                        <span className="font-bold text-[#15110d]">Free</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FULL PAGE ASSET DETAIL VIEW */}
        {selectedProduct && (
          <div className="flex flex-col gap-4 flex-1">
            <button
              onClick={() => setSelectedProduct(null)}
              className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-[#8a7564] hover:text-[#15110d] transition-colors py-1 self-start"
            >
              ‹ GO BACK TO CATALOG
            </button>

            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Left Image Box */}
              <div className="w-full lg:w-[60%] shrink-0">
                <div onClick={() => setPreview3dOpen(true)} className="w-full aspect-[16/10] rounded-[2rem] overflow-hidden border border-[#f0e7dd] bg-[#fff0df] relative shadow-sm cursor-pointer group">
                  <img src={selectedProduct.thumbnailUrl} alt={selectedProduct.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2 z-[2]">
                    <span className="w-12 h-12 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-white">
                      <svg className="w-6 h-6 text-[#ff9f4a]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25"/></svg>
                    </span>
                    <span className="text-xs font-bold tracking-widest uppercase">View in 3D</span>
                  </div>
                </div>
              </div>

              {/* Right Detail Column */}
              <div className="w-full lg:flex-1 flex flex-col gap-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h1 className="font-display text-2xl font-black text-[#15110d] leading-tight">{selectedProduct.title}</h1>

                    {/* OWNER ACTION BUTTONS: Edit (Pencil) & Delete (Trash) */}
                    {currentUser && currentUser.username === selectedProduct.creator && (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => openEditAssetModal(selectedProduct)}
                          title="Edit Asset"
                          className="px-3 py-1.5 rounded-xl border border-[#ff9f4a] bg-[#fff0df] text-xs font-bold text-[#15110d] hover:bg-[#ffd2aa] transition-colors flex items-center gap-1 shadow-sm"
                        >
                          ✏ Edit
                        </button>
                        <button
                          onClick={() => triggerDeleteAsset(selectedProduct)}
                          title="Delete Asset"
                          className="px-3 py-1.5 rounded-xl border border-red-300 bg-red-50 text-xs font-bold text-red-600 hover:bg-red-100 transition-colors flex items-center gap-1 shadow-sm"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* CREATOR ROUTING */}
                  <p className="text-xs font-semibold text-[#8a7564]">
                    by{' '}
                    <button
                      onClick={() => {
                        const actualCreator = creatorsMap[selectedProduct.creator] || {
                          username: selectedProduct.creator,
                          displayName: `@${selectedProduct.creator}`,
                          title: `${selectedProduct.category} Specialist`,
                          bio: 'Crafting detailed engine-ready game assets on LootYard.',
                        };
                        onNavigate && onNavigate('portfolio', actualCreator);
                      }}
                      className="font-bold text-[#ff9f4a] hover:underline"
                    >
                      @{selectedProduct.creator}
                    </button>
                  </p>
                  
                  <div className="flex items-center gap-2 pt-1 text-xs">
                    <span className="stars text-[#ff9f4a]">★★★★★</span>
                    <span className="font-bold text-[#15110d]">{selectedProduct.rating}</span>
                    <span className="text-[#8a7564]">({selectedProduct.reviewsCount || 2} reviews)</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-black text-[#8a7564] uppercase tracking-wider">TAGS</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(Array.isArray(selectedProduct.tags) ? selectedProduct.tags : ['3d', 'gameart', 'asset']).map((tag, idx) => (
                      <span key={idx} className="tag-chip text-xs bg-[#fff0df] border border-[#f0d8b8] px-3 py-1 rounded-full text-[#5c4a3c] font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-black text-[#8a7564] uppercase tracking-wider">DESCRIPTION</h4>
                  <p className="text-xs text-[#8a7564] leading-relaxed">{selectedProduct.description}</p>
                </div>

                <button onClick={() => setPreview3dOpen(true)} className="outline-btn w-full py-3 border border-[#f0e7dd] rounded-xl text-xs font-extrabold text-[#15110d] hover:bg-[#fff0df] transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-[#ff9f4a]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25"/></svg>
                  View in 3D
                </button>

                <button
                  onClick={() => { if (!currentUser) { setAuthMode('login'); setAuthModalOpen(true); } else { showToast('📥 Download started!'); } }}
                  className="mango-btn w-full py-3.5 bg-[#ff9f4a] hover:bg-[#f08a30] text-white text-xs font-extrabold rounded-xl shadow-md transition-all"
                >
                  {currentUser ? 'Download Asset' : 'Log In to Download'}
                </button>

                <div className="pt-2 border-t border-[#f0e7dd]">
                  <h4 className="text-[10px] font-black text-[#8a7564] uppercase tracking-wider mb-3">REVIEWS</h4>
                  <div className="space-y-3">
                    {(selectedProduct.reviews || []).map((rev, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full border border-[#f0e7dd] overflow-hidden flex-shrink-0 bg-[#fff0df]">
                          <img
                            src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(rev.username)}&backgroundColor=ffd2aa,fff0df,ffe4c4&shapeColor=ff9f4a,c0714a`}
                            alt={rev.username}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#15110d]">{rev.username}</span>
                            <span className="text-[#8a7564] text-[10px]">{rev.createdAt}</span>
                          </div>
                          <p className="text-xs text-[#8a7564] mt-0.5">{rev.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TALENT PAGE */}
        {activeTab === 'talent' && !selectedProduct && (
          <div className="space-y-4">
            <h2 className="font-display text-lg font-bold text-bark">Featured Talent ({creatorList.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {creatorList.map((creator, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate && onNavigate('portfolio', creator)}
                  className="bg-[#fffcf8] border border-[#f0e7dd] rounded-2xl p-4 cursor-pointer hover:-translate-y-1 hover:border-[#ff9f4a] hover:shadow-lg transition-all space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img src={creator.avatar || `https://api.dicebear.com/8.x/thumbs/svg?seed=${encodeURIComponent(creator.username || creator.name)}`} className="w-12 h-12 rounded-xl border border-[#f0e7dd] object-cover bg-[#fff0df]" alt="" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-sm font-extrabold text-[#15110d] truncate">{creator.displayName || creator.name || creator.username}</h3>
                      <p className="text-xs text-[#8a7564] font-semibold truncate">{creator.title || '3D Artist'}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#8a7564] line-clamp-2 leading-relaxed">{creator.bio}</p>
                </div>
              ))}
            </div>
          </div>
        )}
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

      {/* UPLOAD ASSET MODAL */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <form onSubmit={handleUploadAsset} className="sf-card w-full max-w-md p-6 bg-white border border-[#f0e7dd] rounded-3xl relative space-y-4 shadow-2xl">
            <button type="button" onClick={() => setUploadModalOpen(false)} className="absolute top-4 right-4 text-taupe font-bold">✕</button>
            <h3 className="font-display text-xl font-extrabold text-[#15110d]">Upload New 3D Asset</h3>
            <p className="text-xs text-[#8a7564]">Publish a new asset under @{currentUser?.username}.</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Asset Title</label>
                <input type="text" required value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="e.g. Cyber Katana Blade" className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
              </div>
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Category</label>
                <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none capitalize">
                  {['characters', 'props', 'weapons', 'vehicles', 'environments', 'vfx', 'ui', 'music', 'animations', 'shaders', 'textures'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Description</label>
                <textarea rows={3} value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder="Describe your asset..." className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
              </div>
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Tags (comma separated)</label>
                <input type="text" value={formTags} onChange={(e) => setFormTags(e.target.value)} className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
              </div>
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">License Type</label>
                <div className="flex gap-4 pt-1">
                  <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                    <input type="radio" name="license" value="commercial" checked={formLicense === 'commercial'} onChange={() => setFormLicense('commercial')} /> Commercial Free
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                    <input type="radio" name="license" value="personal" checked={formLicense === 'personal'} onChange={() => setFormLicense('personal')} /> Personal Only
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-[#ff9f4a] hover:bg-[#f08a30] text-white text-xs font-bold rounded-xl shadow">
              Publish Asset to SQLite
            </button>
          </form>
        </div>
      )}

      {/* EDIT ASSET MODAL (CRUD UPDATE) */}
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

      {/* AUTH MODAL */}
      {authModalOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <form onSubmit={handleAuthSubmit} className="sf-card w-full max-w-sm p-6 bg-white border border-[#f0e7dd] rounded-3xl relative space-y-4 shadow-2xl">
            <button type="button" onClick={() => setAuthModalOpen(false)} className="absolute top-4 right-4 text-taupe font-bold">✕</button>
            <h3 className="font-display text-xl font-extrabold text-[#15110d]">{authMode === 'login' ? 'Welcome Back' : 'Create Account'}</h3>
            <p className="text-xs text-[#8a7564]">Access LootYard SQLite account & upload assets.</p>

            <div className="space-y-3 text-xs">
              {authMode === 'signup' && (
                <div>
                  <label className="block font-bold mb-1 text-[#15110d]">Username</label>
                  <input type="text" required value={authUsername} onChange={(e) => setAuthUsername(e.target.value)} placeholder="e.g. cyber_dev" className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
                </div>
              )}
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">{authMode === 'login' ? 'Email or Username' : 'Email Address'}</label>
                <input type="text" required value={authEmailOrUser} onChange={(e) => setAuthEmailOrUser(e.target.value)} placeholder="user@lootyard.io" className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
              </div>
              <div>
                <label className="block font-bold mb-1 text-[#15110d]">Password</label>
                <input type="password" required value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="Default pass123" className="w-full p-2.5 border border-[#f0e7dd] bg-[#fff0df] rounded-xl outline-none" />
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-[#ff9f4a] hover:bg-[#f08a30] text-white text-xs font-bold rounded-xl shadow">
              {authMode === 'login' ? 'Log In' : 'Sign Up'}
            </button>

            <div className="text-center pt-2">
              <button type="button" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} className="text-xs font-bold text-[#ff9f4a] hover:underline">
                {authMode === 'login' ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3D MODEL VIEWER MODAL */}
      {preview3dOpen && selectedProduct && (
        <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-4xl h-[80vh] bg-[#1a1614] rounded-3xl border border-[#2a2220] relative overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2220] bg-[#1a1614]">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#ff9f4a]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25"/></svg>
                <h3 className="font-display text-sm font-bold text-white">3D Preview — {selectedProduct.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-white/40 font-semibold">Drag to rotate · Scroll to zoom</span>
                <button
                  onClick={() => setPreview3dOpen(false)}
                  className="w-7 h-7 rounded-full bg-white/10 border border-white/20 text-white font-bold flex items-center justify-center hover:bg-white/20 transition-colors text-xs"
                >✕</button>
              </div>
            </div>

            {/* model-viewer */}
            <div className="flex-1 relative">
              {/* eslint-disable-next-line react/no-unknown-property */}
              <model-viewer
                src="/chest.glb"
                alt={`3D preview of ${selectedProduct.title}`}
                auto-rotate
                camera-controls
                shadow-intensity="1.2"
                exposure="1.1"
                camera-orbit="35deg 72deg 3m"
                field-of-view="30deg"
                style={{ width: '100%', height: '100%', backgroundColor: '#1a1614' }}
              ></model-viewer>

              {/* Corner info badge */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2 pointer-events-none">
                <img src={selectedProduct.thumbnailUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                <div>
                  <p className="text-xs font-bold text-white truncate max-w-[140px]">{selectedProduct.title}</p>
                  <p className="text-[10px] text-white/50 capitalize">{selectedProduct.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMessage && (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 bg-bark text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl z-[9999]">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
