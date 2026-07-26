import React, { useEffect } from 'react';

export default function IndexPage({ onNavigate }) {
  useEffect(() => {
    // Nav indicator active state tracking
    const navIndicator = document.querySelector("#navIndicator");
    const navLinks = document.querySelectorAll("[data-section-link]");
    const sections = ["about", "how-it-works", "assets", "talent", "faq"].map(id => document.getElementById(id)).filter(Boolean);

    function updateActiveNav() {
      const offset = 120;
      let activeId = "";

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top - offset <= 0) {
          activeId = section.id;
        }
      }

      if (activeId) {
        const activeLink = document.querySelector(`[data-section-link][href="#${activeId}"]`);
        if (activeLink) {
          const activeIndex = Number(activeLink.dataset.index);
          if (navIndicator) {
            navIndicator.style.transform = `translateX(${activeIndex * 7}rem)`;
            navIndicator.style.opacity = "1";
          }
          navLinks.forEach(link => {
            const isActive = link === activeLink;
            link.classList.toggle("text-bark", isActive);
            link.classList.toggle("text-bark/50", !isActive);
          });
        }
      } else {
        if (navIndicator) navIndicator.style.opacity = "0";
        navLinks.forEach(link => {
          link.classList.remove("text-bark");
          link.classList.add("text-bark/50");
        });
      }
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("resize", updateActiveNav);

    // Hide loader slot on model-viewer load
    const viewers = document.querySelectorAll('model-viewer');
    viewers.forEach(viewer => {
      const handleLoad = () => {
        const bar = viewer.querySelector('[slot="progress-bar"]');
        if (bar) bar.classList.add('hide');
      };
      viewer.addEventListener('load', handleLoad);
    });

    updateActiveNav();

    return () => {
      window.removeEventListener("scroll", updateActiveNav);
      window.removeEventListener("resize", updateActiveNav);
    };
  }, []);

  return (
    <div className="bg-cream text-bark font-body min-h-screen relative">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-bark/5 bg-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 lg:px-10">
          <a href="#" className="flex items-center gap-2.5">
            <img
              src="/lab_exercises/week2/assets/chestnobg.png"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=100&q=80'; }}
              alt="LootYard treasure chest logo"
              className="h-12 w-12 object-contain"
            />
            <span className="font-hand text-3xl font-bold leading-none text-bark [text-shadow:0.5px_0_0_currentColor]">LootYard</span>
          </a>

          <nav aria-label="Section navigation" className="relative">
            <ul id="sectionNav" className="relative hidden items-center rounded-full bg-white/70 p-1 ring-1 ring-bark/5 font-body text-sm font-bold text-bark md:flex">
              <span id="navIndicator" style={{ width: '7rem' }}></span>
              <li className="relative z-10 text-center" style={{ width: '7rem' }}>
                <a data-section-link data-index="0" href="#about" className="block rounded-full px-4 py-2 text-bark/50 hover:text-bark transition-colors duration-300 whitespace-nowrap">About</a>
              </li>
              <li className="relative z-10 text-center" style={{ width: '7rem' }}>
                <a data-section-link data-index="1" href="#how-it-works" className="block rounded-full px-2 py-2 text-bark/50 hover:text-bark transition-colors duration-300 text-xs md:text-sm whitespace-nowrap">How it works</a>
              </li>
              <li className="relative z-10 text-center" style={{ width: '7rem' }}>
                <a data-section-link data-index="2" href="#assets" className="block rounded-full px-4 py-2 text-bark/50 hover:text-bark transition-colors duration-300 whitespace-nowrap">Assets</a>
              </li>
              <li className="relative z-10 text-center" style={{ width: '7rem' }}>
                <a data-section-link data-index="3" href="#talent" className="block rounded-full px-4 py-2 text-bark/50 hover:text-bark transition-colors duration-300 whitespace-nowrap">Talent</a>
              </li>
              <li className="relative z-10 text-center" style={{ width: '7rem' }}>
                <a data-section-link data-index="4" href="#faq" className="block rounded-full px-4 py-2 text-bark/50 hover:text-bark transition-colors duration-300 whitespace-nowrap">FAQ</a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate && onNavigate('home', 'login')} className="hidden text-sm font-bold text-bark/60 transition-colors hover:text-mango sm:inline">
              Log In
            </button>
            <button onClick={() => onNavigate && onNavigate('home', 'signup')} className="flex items-center gap-2.5 rounded-full border border-bark/10 bg-white px-4 py-2 text-sm font-bold text-bark shadow-sm transition-all hover:-translate-y-0.5 hover:border-mango hover:shadow-md">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-mango-soft">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-bark">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
                </svg>
              </span>
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ============ HERO SECTION ============ */}
        <section id="hero" className="mx-auto max-w-7xl px-6 pb-12 pt-8 lg:px-10 lg:pb-16 lg:pt-12 relative overflow-visible w-full">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>

          <div className="relative z-10 grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8 flex flex-col items-start" style={{ animation: 'fadeSlideUp 0.8s ease both 0.1s' }}>
              <span className="inline-block rounded-full border border-bark/10 bg-white px-4 py-1 text-xs font-bold uppercase tracking-widest text-mango">
                Every asset — always free
              </span>
              <h1 className="font-display text-6xl font-extrabold leading-[0.9] tracking-tight md:text-7xl lg:text-8xl text-bark max-w-xl">
                Free loot for <br />
                <span className="relative inline-block text-mango" style={{ minWidth: '14ch', verticalAlign: 'bottom', overflow: 'hidden', height: '1.15em' }}>
                  <span className="absolute left-0 bottom-0 [animation:wordSwap7_14s_infinite]" style={{ whitespace: 'nowrap' }}>Free 3D models</span>
                  <span className="absolute left-0 bottom-0 opacity-0 [animation:wordSwap7_14s_infinite_2s]" style={{ whitespace: 'nowrap' }}>Free SFX packs</span>
                  <span className="absolute left-0 bottom-0 opacity-0 [animation:wordSwap7_14s_infinite_4s]" style={{ whitespace: 'nowrap' }}>Boilerplate code</span>
                  <span className="absolute left-0 bottom-0 opacity-0 [animation:wordSwap7_14s_infinite_6s]" style={{ whitespace: 'nowrap' }}>Animations</span>
                  <span className="absolute left-0 bottom-0 opacity-0 [animation:wordSwap7_14s_infinite_8s]" style={{ whitespace: 'nowrap' }}>VFX &amp; maps</span>
                  <span className="absolute left-0 bottom-0 opacity-0 [animation:wordSwap7_14s_infinite_10s]" style={{ whitespace: 'nowrap' }}>Creator portfolios</span>
                  <span className="absolute left-0 bottom-0 opacity-0 [animation:wordSwap7_14s_infinite_12s]" style={{ whitespace: 'nowrap' }}>Indie devs</span>
                </span>
              </h1>
              <p className="max-w-md text-lg leading-relaxed text-bark/70 lg:text-xl">
                Download engine-ready 3D models, SFX, animations, scripts and UI kits — completely free, no account needed. Or hire a creator to build something custom just for your game.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a href="#assets" className="rounded-2xl bg-mango px-8 py-4 text-lg font-bold text-bark transition-all hover:-translate-y-1 hover:shadow-xl">
                  Explore Loot
                </a>
                <a href="#talent" className="rounded-2xl border-2 border-bark/10 px-8 py-4 text-lg font-bold transition-all hover:border-bark">
                  Hire a Creator
                </a>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="tag-chip"><i className="fad fa-cube"></i> 3D Models</span>
                <span className="tag-chip"><i className="fad fa-music"></i> SFX & Music</span>
                <span className="tag-chip"><i className="fad fa-sparkles"></i> Animations</span>
                <span className="tag-chip"><i className="fad fa-file-code"></i> Boilerplate Code</span>
                <span className="tag-chip"><i className="fad fa-fire-alt"></i> VFX</span>
                <span className="tag-chip"><i className="fad fa-map"></i> Maps</span>
              </div>
            </div>

            <div className="w-full flex justify-center items-center overflow-visible relative lg:translate-x-8">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[420px] h-[420px] rounded-full border border-dashed border-[#f0d8b8] opacity-60" style={{ animation: 'orb2 12s ease-in-out infinite' }}></div>
                <div className="absolute w-[320px] h-[320px] rounded-full border border-[#ffd2aa] opacity-40" style={{ animation: 'orb1 9s ease-in-out infinite' }}></div>
              </div>
              <model-viewer
                src="/lab_exercises/week2/assets/mushroom_potion.glb"
                alt="Floating mushroom potion 3D model"
                camera-orbit="35deg 72deg auto"
                camera-target="auto auto auto"
                field-of-view="20deg"
                scale="5.5 5.5 5.5"
                exposure="1.3"
                shadow-intensity="0.4"
                reveal="auto"
                loading="eager"
                interaction-prompt="none"
                disable-zoom disable-pan disable-tap
                class="relative block w-full h-[450px] sm:h-[520px] lg:h-[600px] max-h-[75vh] [animation:floatModel_3.4s_ease-in-out_infinite]">
                <div slot="progress-bar" className="absolute inset-0 flex items-center justify-center bg-cream/10 z-20">
                  <span className="loader"></span>
                </div>
              </model-viewer>

              <div className="absolute bottom-16 left-4 bg-white border border-[#f0e7dd] rounded-2xl px-3.5 py-2.5 shadow-xl flex items-center gap-2.5" style={{ animation: 'floatModelSlow 4s ease-in-out infinite 1s' }}>
                <div className="w-8 h-8 rounded-xl bg-[#fff0df] flex items-center justify-center text-base text-mango">
                  <i className="fad fa-flask-potion"></i>
                </div>
                <div>
                  <p className="text-xs font-black text-[#15110d]">Mushroom Potion</p>
                  <p className="text-[10px] font-semibold text-[#8a7564]">2.4k downloads · Free</p>
                </div>
              </div>

              <div className="absolute top-24 right-2 bg-white border border-[#f0e7dd] rounded-2xl px-3 py-2 shadow-xl" style={{ animation: 'floatModel 3.8s ease-in-out infinite 0.6s' }}>
                <p className="stars text-[#ff9f4a]">★★★★★</p>
                <p className="text-[10px] font-bold text-[#5c4a3c] mt-0.5">4.9 / 5.0</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ ABOUT SECTION ============ */}
        <section id="about" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-10 lg:py-12 lg:px-10">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-mango/15 to-transparent blur-2xl"></div>

              <div className="w-full flex justify-center items-center overflow-visible relative">
                <div className="corner-badge">Live Preview</div>
                <model-viewer
                  src="/lab_exercises/week2/assets/panda.glb"
                  alt="Animated Panda character model"
                  autoplay
                  auto-rotate
                  rotation-per-second="18deg"
                  camera-orbit="0deg 72deg auto"
                  field-of-view="18deg"
                  exposure="1.2"
                  interaction-prompt="none"
                  disable-zoom disable-pan disable-tap
                  class="relative block w-full h-[380px] sm:h-[440px] lg:h-[500px] max-h-[60vh]">
                  <div slot="progress-bar" className="absolute inset-0 flex items-center justify-center bg-cream/10 z-20">
                    <span className="loader"></span>
                  </div>
                </model-viewer>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white border border-[#f0e7dd] rounded-2xl px-4 py-2.5 shadow-xl text-center whitespace-nowrap">
                  <p className="text-xs font-black text-[#15110d]">Toy Trueno</p>
                  <div className="flex items-center justify-center gap-2 mt-0.5">
                    <span className="tag-chip" style={{ fontSize: '0.6rem', padding: '0.15rem 0.5rem' }}>Animated</span>
                    <span className="tag-chip" style={{ fontSize: '0.6rem', padding: '0.15rem 0.5rem' }}>Low Poly</span>
                  </div>
                </div>
              </div>
            </div>

            <article className="order-1 space-y-8 lg:order-2">
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-mango">
                What is LootYard?
              </p>
              <h2 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                Three things. <br />
                <span className="italic text-mango">One</span> place.
              </h2>
              <p className="max-w-lg text-lg leading-relaxed text-bark/70">
                A free game asset store, a creator portfolio hub, and a hiring marketplace — all in one. Whether you're shipping a game or showing your work, there's a spot for you here.
              </p>

              <ul className="space-y-5 pt-4">
                <li className="flex gap-5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-mango-soft font-display text-sm font-extrabold text-bark">
                    1
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-lg font-bold">Free asset store</p>
                    <p className="mt-1 text-bark/60">Every 3D model, SFX pack, script and UI kit — free to download. No subscription, no limit.</p>
                  </div>
                </li>
                <li className="flex gap-5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-mango-soft font-display text-sm font-extrabold text-bark">
                    2
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-lg font-bold">Creator portfolios</p>
                    <p className="mt-1 text-bark/60">Every account gets a public portfolio — share free assets, post previews, get discovered.</p>
                  </div>
                </li>
                <li className="flex gap-5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-mango-soft font-display text-sm font-extrabold text-bark">
                    3
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-lg font-bold">Hire for custom work</p>
                    <p className="mt-1 text-bark/60">Need something built just for your game? Message a creator and unlock the full chat.</p>
                  </div>
                </li>
              </ul>

              <div className="divider border-b border-bark/5 my-6"></div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-bold text-[#8a7564]">3D Models</span>
                    <span className="text-[10px] font-black text-[#ff9f4a]">4,800+ free</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: '80%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-bold text-[#8a7564]">SFX & Music</span>
                    <span className="text-[10px] font-black text-[#ff9f4a]">3,200+ free</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: '65%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-bold text-[#8a7564]">Scripts & UI</span>
                    <span className="text-[10px] font-black text-[#ff9f4a]">1,900+ free</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: '40%' }}></div></div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ============ HOW IT WORKS SECTION ============ */}
        <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-10 lg:py-12 lg:px-10">
          <div className="mb-16 text-center max-w-2xl mx-auto space-y-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-mango">
              How it works
            </p>
            <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
              Built for developers. <br />
              Powered by <span className="italic text-mango">creators</span>.
            </h2>
            <p className="text-base text-bark/60">
              A streamlined pipeline built to connect game creators with high-quality, verified assets.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* For Developers */}
            <div className="relative group rounded-[2.5rem] border border-bark/5 bg-white/70 p-8 md:p-10 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-bark/10">
              <div className="absolute -right-4 -top-4 text-5xl opacity-10 select-none text-bark">
                <i className="fad fa-gamepad"></i>
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mango-soft text-lg text-bark">
                    <i className="fad fa-gamepad"></i>
                  </span>
                  <h3 className="font-display text-2xl font-bold">For Game Developers</h3>
                </div>
                <p className="text-sm text-bark/60">
                  Discover engine-ready resources to accelerate your development workflow without fees or barriers.
                </p>

                <div className="space-y-6 pt-4 border-t border-bark/5">
                  <div className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bark text-xs font-bold text-cream">1</div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm">Browse & Search</h4>
                      <p className="text-xs text-bark/50">Explore a curated catalog of game assets. No signup is required to search and browse.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bark text-xs font-bold text-cream">2</div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm">Quick Login to Download</h4>
                      <p className="text-xs text-bark/50">Sign in to download zip archives. Each package includes format variations and a clear commercial license.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bark text-xs font-bold text-cream">3</div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm">Integrate & Launch</h4>
                      <p className="text-xs text-bark/50">Import assets directly into Roblox, Unity, Unreal, or Godot. Royalty-free commercial use permitted.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* For Creators */}
            <div className="relative group rounded-[2.5rem] border border-bark/5 bg-white/70 p-8 md:p-10 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-bark/10">
              <div className="absolute -right-4 -top-4 text-5xl opacity-10 select-none text-bark">
                <i className="fad fa-rocket"></i>
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mango-soft text-lg text-bark">
                    <i className="fad fa-rocket"></i>
                  </span>
                  <h3 className="font-display text-2xl font-bold">For Asset Creators</h3>
                </div>
                <p className="text-sm text-bark/60">
                  Build your audience, show off your skills, and connect with studios looking for custom work.
                </p>

                <div className="space-y-6 pt-4 border-t border-bark/5">
                  <div className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bark text-xs font-bold text-cream">1</div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm">Detail the Form</h4>
                      <p class="text-xs text-bark/50">Input the asset name, descriptions, tags, categories, and confirm AI-generation usage status.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bark text-xs font-bold text-cream">2</div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm">Upload File Formats</h4>
                      <p className="text-xs text-bark/50">Package your source formats (FBX, GLB, OBJ, Blend, WAV, etc.) inside a single ZIP file and upload.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bark text-xs font-bold text-cream">3</div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm">Pass Verification Checks</h4>
                      <p className="text-xs text-bark/50">Certify copyright ownership and confirm that the upload is not an exact copy of existing work to publish.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FREE ASSETS SECTION ============ */}
        <section id="assets" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-10 lg:py-12 lg:px-10">
          <div className="mb-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl space-y-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-mango">
                Free asset store
              </p>
              <h2 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                Every asset. <span className="italic text-mango">Free.</span>
              </h2>
              <p className="text-lg leading-relaxed text-bark/70">
                Browse freely — no account needed to look around. Sign up to download. Any engine, any language, any game.
              </p>
            </div>
            <button onClick={() => onNavigate && onNavigate('home')} className="rounded-2xl bg-mango px-7 py-3.5 text-base font-bold text-bark transition-all hover:-translate-y-0.5 hover:shadow-lg">
              Browse all assets →
            </button>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <article className="group space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-bark/5 bg-white shadow-sm">
                <img
                  src="/lab_exercises/week2/assets/asset-sword.jpg"
                  alt="Glowing low-poly sword 3D asset"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute right-5 top-5 rounded-full bg-bark text-cream px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  Featured
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 px-1">
                <div className="min-w-0">
                  <h3 className="truncate font-display text-xl font-bold transition-colors group-hover:text-mango">
                    Ember Blade
                  </h3>
                  <p className="mt-0.5 truncate text-xs font-medium text-bark/50">
                    by ForgeMaster
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-mango">Free</p>
                  <p className="text-[10px] text-bark/40">3D · FBX / GLB</p>
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="group space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-bark/5 bg-white shadow-sm">
                <img
                  src="/lab_exercises/week2/assets/asset-cloud-tea.jpg"
                  alt="Cute cup of tea with cloud foam 3D asset"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute right-5 top-5 rounded-full bg-mango text-bark px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  Top pick
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 px-1">
                <div className="min-w-0">
                  <h3 className="truncate font-display text-xl font-bold transition-colors group-hover:text-mango">
                    Cloud Tea
                  </h3>
                  <p className="mt-0.5 truncate text-xs font-medium text-bark/50">
                    by BrewLabs
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-mango">Free</p>
                  <p className="text-[10px] text-bark/40">3D · Stylized</p>
                </div>
              </div>
            </article>

            {/* Card 3 */}
            <article className="group space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-bark/5 bg-white shadow-sm">
                <img
                  src="/lab_exercises/week2/assets/asset-helmet.jpg"
                  alt="Sci-fi helmet with orange visor 3D asset"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute right-5 top-5 rounded-full bg-bark text-cream px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  New
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 px-1">
                <div className="min-w-0">
                  <h3 className="truncate font-display text-xl font-bold transition-colors group-hover:text-mango">
                    Pilot Visor X
                  </h3>
                  <p className="mt-0.5 truncate text-xs font-medium text-bark/50">
                    by VoidGear
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-mango">Free</p>
                  <p className="text-[10px] text-bark/40">3D · Wearable</p>
                </div>
              </div>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-bark/5 pt-6">
            <span className="mr-3 text-xs font-bold uppercase tracking-widest text-bark/40">
              Browse by category
            </span>
            <button className="rounded-full border border-bark/10 bg-white px-4 py-1.5 text-xs font-bold text-bark/70 transition-colors hover:border-mango hover:bg-mango-soft hover:text-bark">All</button>
            <button className="rounded-full border border-bark/10 bg-white px-4 py-1.5 text-xs font-bold text-bark/70 transition-colors hover:border-mango hover:bg-mango-soft hover:text-bark">3D Models</button>
            <button className="rounded-full border border-bark/10 bg-white px-4 py-1.5 text-xs font-bold text-bark/70 transition-colors hover:border-mango hover:bg-mango-soft hover:text-bark">SFX</button>
            <button className="rounded-full border border-bark/10 bg-white px-4 py-1.5 text-xs font-bold text-bark/70 transition-colors hover:border-mango hover:bg-mango-soft hover:text-bark">Music</button>
            <button className="rounded-full border border-bark/10 bg-white px-4 py-1.5 text-xs font-bold text-bark/70 transition-colors hover:border-mango hover:bg-mango-soft hover:text-bark">Animations</button>
            <button className="rounded-full border border-bark/10 bg-white px-4 py-1.5 text-xs font-bold text-bark/70 transition-colors hover:border-mango hover:bg-mango-soft hover:text-bark">Boilerplate</button>
            <button className="rounded-full border border-bark/10 bg-white px-4 py-1.5 text-xs font-bold text-bark/70 transition-colors hover:border-mango hover:bg-mango-soft hover:text-bark">Maps</button>
          </div>
        </section>

        {/* ============ CREATOR PORTFOLIO SECTION ============ */}
        <section id="talent" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-10 lg:py-12 lg:px-10">
          <div className="grid items-center gap-20 lg:grid-cols-2">
            <article className="space-y-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-mango">
                Creator portfolios
              </p>
              <h2 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                Every account gets a portfolio. <br />
                Hiring starts with <span className="italic text-mango">one</span> message.
              </h2>
              <p className="max-w-lg text-lg leading-relaxed text-bark/70">
                Every user — creator or not — gets a public portfolio page. Reach any creator with a single intro message. If they reply, the full chat unlocks.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button onClick={() => onNavigate && onNavigate('portfolio')} className="rounded-2xl bg-bark px-7 py-3.5 text-base font-bold text-cream transition-all hover:-translate-y-0.5 hover:bg-mango hover:text-bark">
                  Browse portfolios
                </button>
                <button onClick={() => onNavigate && onNavigate('portfolio')} className="rounded-2xl border-2 border-bark/10 px-7 py-3.5 text-base font-bold transition-colors hover:border-bark">
                  Create my portfolio
                </button>
              </div>

              <div className="grid gap-4 pt-4 sm:grid-cols-2">
                {/* Arjun Kapoor */}
                <div className="flex items-center gap-4 rounded-2xl border border-bark/5 bg-white p-4 shadow-sm">
                  <div className="grid size-12 shrink-0 place-items-center rounded-full bg-mango-soft font-display text-sm font-extrabold text-bark">
                    AK
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-display font-bold">Arjun Kapoor</p>
                      <span className="text-[10px] font-bold uppercase text-emerald-600">
                        Open
                      </span>
                    </div>
                    <p className="truncate text-xs text-bark/50">3D Artist · 34 free assets</p>
                  </div>
                </div>

                {/* Sofia Larsen */}
                <div className="flex items-center gap-4 rounded-2xl border border-bark/5 bg-white p-4 shadow-sm">
                  <div className="grid size-12 shrink-0 place-items-center rounded-full bg-mango-soft font-display text-sm font-extrabold text-bark">
                    SL
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate font-display font-bold">Sofia Larsen</p>
                      <span className="text-[10px] font-bold uppercase text-mango">
                        Busy
                      </span>
                    </div>
                    <p className="truncate text-xs text-bark/50">Sound Designer · 21 SFX packs</p>
                  </div>
                </div>
              </div>
            </article>

            <div className="relative w-full flex justify-center items-center overflow-visible">
              <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-tr from-mango/15 to-transparent blur-2xl"></div>
              <div className="corner-badge">Portfolio</div>

              <model-viewer
                src="/lab_exercises/week2/assets/cartoon_plane.glb"
                alt="Cartoon plane 3D model"
                auto-rotate
                rotation-per-second="14deg"
                camera-orbit="45deg 72deg auto"
                field-of-view="22deg"
                scale="2.2 2.2 2.2"
                exposure="1.2"
                interaction-prompt="none"
                disable-zoom disable-pan disable-tap
                class="relative block w-full h-[360px] sm:h-[420px] lg:h-[480px] max-h-[55vh] [animation:floatModelSlow_4s_ease-in-out_infinite] z-10">
                <div slot="progress-bar" className="absolute inset-0 flex items-center justify-center bg-cream/10 z-20">
                  <span className="loader"></span>
                </div>
              </model-viewer>

              <div className="absolute bottom-[-1.5rem] left-0 flex flex-col gap-2 z-20" style={{ maxWidth: '240px', animation: 'floatModel 4.5s ease-in-out infinite 1.5s' }}>
                <div className="self-end chat-bubble-user px-3.5 py-2.5 shadow-lg">
                  <p className="text-[10px] font-black text-[#ffd2aa] uppercase tracking-wider mb-1">First Message</p>
                  <p className="text-xs font-medium text-white leading-snug">"Hey, I need a low-poly aircraft for my game…"</p>
                </div>
                <div className="self-start chat-bubble-reply px-3.5 py-2.5 shadow-lg">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-4 h-4 rounded-full bg-[#ffd2aa] flex items-center justify-center text-[7px] font-black" style={{ color: '#a0522d' }}>AK</div>
                    <p className="text-[9px] font-black text-[#8a7564]">Arjun Kapoor</p>
                  </div>
                  <p className="text-xs font-medium text-[#15110d] leading-snug">"Yeah sure, I can do that! 🎉"</p>
                </div>
                <div className="self-start flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                  <p className="text-[10px] font-bold text-green-700">Creator replied — chat unlocked</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FAQ SECTION ============ */}
        <section id="faq" className="mx-auto max-w-4xl scroll-mt-20 px-6 py-10 lg:py-12">
          <div className="mb-16 text-center space-y-4">
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-mango">
              Frequently Asked Questions
            </p>
            <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
              Got questions? <br />
              We've got <span className="italic text-mango">answers</span>.
            </h2>
          </div>

          <div className="space-y-4">
            <details className="group rounded-3xl border border-bark/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 focus:outline-none">
                <span className="font-display text-lg font-bold text-bark transition-colors group-hover:text-mango">
                  Is downloading assets really free?
                </span>
                <span className="relative h-5 w-5 shrink-0">
                  <span className="absolute inset-0 m-auto h-5 w-0.5 bg-bark/40 transition-transform duration-300 group-open:rotate-90"></span>
                  <span className="absolute inset-0 m-auto h-0.5 w-5 bg-bark/40 transition-transform duration-300 group-open:rotate-90"></span>
                </span>
              </summary>
              <p className="mt-4 border-t border-bark/5 pt-4 text-sm leading-relaxed text-bark/70">
                Yes, browsing and searching our entire catalog is 100% free with no account required. To download, simply log in to your account. Each download package includes engine-ready source files and a copy of the corresponding license.
              </p>
            </details>

            <details className="group rounded-3xl border border-bark/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 focus:outline-none">
                <span className="font-display text-lg font-bold text-bark transition-colors group-hover:text-mango">
                  What engines and file formats are supported?
                </span>
                <span className="relative h-5 w-5 shrink-0">
                  <span className="absolute inset-0 m-auto h-5 w-0.5 bg-bark/40 transition-transform duration-300 group-open:rotate-90"></span>
                  <span className="absolute inset-0 m-auto h-0.5 w-5 bg-bark/40 transition-transform duration-300 group-open:rotate-90"></span>
                </span>
              </summary>
              <p className="mt-4 border-t border-bark/5 pt-4 text-sm leading-relaxed text-bark/70">
                LootYard supports all major game development platforms including Roblox, Unity, Unreal Engine, and Godot. Assets are uploaded as ZIP packages containing standard formats like GLB, FBX, OBJ, Blend (for 3D models), anim files (for animations), and WAV or MP3 (for sound effects and music).
              </p>
            </details>

            <details className="group rounded-3xl border border-bark/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 focus:outline-none">
                <span className="font-display text-lg font-bold text-bark transition-colors group-hover:text-mango">
                  What licenses are applied to the assets?
                </span>
                <span className="relative h-5 w-5 shrink-0">
                  <span className="absolute inset-0 m-auto h-5 w-0.5 bg-bark/40 transition-transform duration-300 group-open:rotate-90"></span>
                  <span className="absolute inset-0 m-auto h-0.5 w-5 bg-bark/40 transition-transform duration-300 group-open:rotate-90"></span>
                </span>
              </summary>
              <p className="mt-4 border-t border-bark/5 pt-4 text-sm leading-relaxed text-bark/70">
                We support standard and permissive licenses. Free assets are released under Creative Commons CC0 (Public Domain) or a custom Royalty-Free license, allowing you to use them in commercial and personal games with no attribution required.
              </p>
            </details>

            <details className="group rounded-3xl border border-bark/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 focus:outline-none">
                <span className="font-display text-lg font-bold text-bark transition-colors group-hover:text-mango">
                  How do creators monetize and what is the platform fee?
                </span>
                <span className="relative h-5 w-5 shrink-0">
                  <span className="absolute inset-0 m-auto h-5 w-0.5 bg-bark/40 transition-transform duration-300 group-open:rotate-90"></span>
                  <span className="absolute inset-0 m-auto h-0.5 w-5 bg-bark/40 transition-transform duration-300 group-open:rotate-90"></span>
                </span>
              </summary>
              <p className="mt-4 border-t border-bark/5 pt-4 text-sm leading-relaxed text-bark/70">
                Creators build portfolios and showcase free assets to build their brand and attract direct hire contracts. When a creator is hired for custom work through the platform, LootYard processes the agreement and charges a flat 10% platform fee on payments.
              </p>
            </details>

            <details className="group rounded-3xl border border-bark/5 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 focus:outline-none">
                <span className="font-display text-lg font-bold text-bark transition-colors group-hover:text-mango">
                  How do creators upload assets and pass verification?
                </span>
                <span className="relative h-5 w-5 shrink-0">
                  <span className="absolute inset-0 m-auto h-5 w-0.5 bg-bark/40 transition-transform duration-300 group-open:rotate-90"></span>
                  <span className="absolute inset-0 m-auto h-0.5 w-5 bg-bark/40 transition-transform duration-300 group-open:rotate-90"></span>
                </span>
              </summary>
              <p className="mt-4 border-t border-bark/5 pt-4 text-sm leading-relaxed text-bark/70">
                Creators submit a details form containing the asset name, description, tags, categories, and specify whether AI was used in generation. Creators must also certify copyright ownership and guarantee the work is not a duplicate of existing assets on the platform.
              </p>
            </details>
          </div>
        </section>

        {/* ============ CTA SECTION ============ */}
        <section className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[3rem] border border-bark/5 bg-gradient-to-br from-mango/10 via-mango-soft/5 to-transparent px-8 py-16 text-center md:py-20 backdrop-blur-sm">
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-mango/10 blur-3xl pointer-events-none"></div>
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-mango-soft/20 blur-3xl pointer-events-none"></div>

            <div className="relative max-w-2xl mx-auto space-y-8">
              <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl text-bark">
                Build faster. Dream bigger. <br />
                No <span className="italic text-mango">paywalls</span>.
              </h2>
              <p className="text-base md:text-lg text-bark/70 leading-relaxed">
                Join game creators downloading verified engine-ready assets, showcasing their portfolios, and building the future of indie games.
              </p>
              <div className="pt-4">
                <button onClick={() => onNavigate && onNavigate('home')} className="inline-flex items-center gap-2 rounded-2xl bg-bark px-8 py-4 text-lg font-extrabold text-cream shadow-lg shadow-bark/10 transition-all hover:-translate-y-1 hover:bg-mango hover:text-bark hover:shadow-xl hover:shadow-mango/15">
                  Start exploring
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============ STATS SECTION ============ */}
        <section className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="bg-white/70 border border-bark/5 backdrop-blur-sm rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <p className="font-display text-4xl lg:text-5xl font-black text-bark">12k+</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-bark/40">Free Assets</p>
            </div>
            <div className="bg-white/70 border border-bark/5 backdrop-blur-sm rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <p className="font-display text-4xl lg:text-5xl font-black text-mango">100%</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-bark/40">Always Free</p>
            </div>
            <div className="bg-white/70 border border-bark/5 backdrop-blur-sm rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <p className="font-display text-4xl lg:text-5xl font-black text-bark">2.4k</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-bark/40">Active Creators</p>
            </div>
            <div className="bg-white/70 border border-bark/5 backdrop-blur-sm rounded-3xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <p className="font-display text-4xl lg:text-5xl font-black text-bark">0</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-bark/40">Paywalls</p>
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-bark/5 bg-cream">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-10">
          <div className="flex items-center gap-2.5">
            <img src="https://raw.githubusercontent.com/Denzils-repo/FSD_LAB/main/lab_exercises/week2/assets/chestnobg.png" alt="LootYard logo" className="h-9 w-9 object-contain" />
            <span className="font-hand text-2xl font-bold text-bark [text-shadow:0.5px_0_0_currentColor]">LootYard</span>
            <span className="ml-2 text-xs text-bark/40">· Free assets, real creators</span>
          </div>
          <p className="text-xs text-bark/40">
            © 2026 LootYard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
