const MOCK_ASSETS = [
    // Characters
    {
        id: "a1",
        title: "Stylized Panda Adventurer",
        creator: "leafwork",
        category: "characters",
        description: "A cute, low-poly stylized panda character fully rigged and ready for adventure games.",
        tags: ["lowpoly", "character", "rigged", "panda"],
        thumbnailUrl: "ai_gen_img/01-panda-adventurer.jpg",
        status: "available"
    },
    {
        id: "a2",
        title: "Mech Cat Companion",
        creator: "ironforge",
        category: "characters",
        description: "A futuristic robotic cat companion with basic animations (walk, idle, sit).",
        tags: ["mech", "companion", "cyberpunk", "cat"],
        thumbnailUrl: "ai_gen_img/02-mech-cat.jpg",
        status: "available"
    },
    {
        id: "a3",
        title: "Low Poly Forest Ranger",
        creator: "mossyman",
        category: "characters",
        description: "A low-poly forest ranger character equipped with wilderness gear, optimized for mobile.",
        tags: ["lowpoly", "ranger", "forest", "wilderness"],
        thumbnailUrl: "ai_gen_img/03-forest-ranger.jpg",
        status: "available"
    },
    {
        id: "a4",
        title: "Cyberpunk Street Mercenary",
        creator: "neonpulse",
        category: "characters",
        description: "Fully-rigged cyberpunk mercenary with high-tech modular gear and detailed emission maps.",
        tags: ["cyberpunk", "mercenary", "scifi", "rigged"],
        thumbnailUrl: "ai_gen_img/04-cyberpunk-mercenary.jpg",
        status: "available"
    },

    // Props
    {
        id: "a5",
        title: "Mushroom Potion Set",
        creator: "stonearch",
        category: "props",
        description: "A collection of colorful magic potions in glowing mushroom-themed bottles.",
        tags: ["magic", "potions", "fantasy", "props"],
        thumbnailUrl: "ai_gen_img/05-mushroom-potions.jpg",
        status: "available"
    },
    {
        id: "a6",
        title: "Cloud Tea Cup Collection",
        creator: "anya_3d",
        category: "props",
        description: "A set of high-quality porcelain tea cups with swirling cloud decals and PBR materials.",
        tags: ["stylized", "cups", "props", "tea"],
        thumbnailUrl: "ai_gen_img/06-cloud-tea-cups.jpg",
        status: "available"
    },
    {
        id: "a7",
        title: "Fantasy Treasure Chest",
        creator: "lootmaster",
        category: "props",
        description: "A locked wooden treasure chest bound in heavy iron, complete with opening animations.",
        tags: ["fantasy", "chest", "treasure", "prop"],
        thumbnailUrl: "ai_gen_img/07-treasure-chest.jpg",
        status: "available"
    },
    {
        id: "a8",
        title: "Ancient Relic Props Pack",
        creator: "relic_hunter",
        category: "props",
        description: "Mysterious artifacts from lost civilizations, perfect for detailing dungeon and ruin levels.",
        tags: ["ancient", "relic", "dungeon", "artifact"],
        thumbnailUrl: "ai_gen_img/08-ancient-relics.jpg",
        status: "available"
    },

    // Weapons
    {
        id: "a9",
        title: "Fantasy Sword Collection",
        creator: "bladesmth",
        category: "weapons",
        description: "Five legendary swords designed for heroes of fantasy RPGs. Includes hand-painted textures.",
        tags: ["weapons", "fantasy", "swords", "rpg"],
        thumbnailUrl: "ai_gen_img/09-fantasy-swords.jpg",
        status: "available"
    },
    {
        id: "a10",
        title: "Arcane Staff Bundle",
        creator: "wizardry",
        category: "weapons",
        description: "Elegant wooden and crystal staves embedded with raw elemental magical power.",
        tags: ["magic", "staves", "weapons", "mage"],
        thumbnailUrl: "ai_gen_img/10-arcane-staves.jpg",
        status: "available"
    },
    {
        id: "a11",
        title: "Sci-Fi Energy Weapons Pack",
        creator: "plasmacut",
        category: "weapons",
        description: "High-tech plasma rifles, laser pistols, and energy carbines with custom charge-up animations.",
        tags: ["weapons", "scifi", "laser", "plasma"],
        thumbnailUrl: "ai_gen_img/11-scifi-energy-weapons.jpg",
        status: "available"
    },
    {
        id: "a12",
        title: "Medieval Knight Arsenal",
        creator: "armoury",
        category: "weapons",
        description: "A comprehensive set of historic weapons: maces, halberds, longswords, and shields.",
        tags: ["medieval", "weapons", "knight", "shields"],
        thumbnailUrl: "ai_gen_img/12-knight-arsenal.jpg",
        status: "available"
    },

    // Vehicles
    {
        id: "a13",
        title: "Cartoon Airplane",
        creator: "rocketboy",
        category: "vehicles",
        description: "A toy-style cartoon propeller airplane with spinning propeller animations.",
        tags: ["vehicle", "cartoon", "toy", "airplane"],
        thumbnailUrl: "ai_gen_img/13-cartoon-airplane.jpg",
        status: "available"
    },
    {
        id: "a14",
        title: "Hover Bike Prototype",
        creator: "hovercraft",
        category: "vehicles",
        description: "Sleek aerodynamic hover bike equipped with rear thrusters and side stabilizer wings.",
        tags: ["hover", "bike", "vehicles", "cyberpunk"],
        thumbnailUrl: "ai_gen_img/14-hover-bike.jpg",
        status: "available"
    },
    {
        id: "a15",
        title: "Sci-Fi Cargo Drone",
        creator: "dronetech",
        category: "vehicles",
        description: "Heavy-duty logistics cargo drone built to carry crates through complex city grids.",
        tags: ["drone", "cargo", "scifi", "vehicles"],
        thumbnailUrl: "ai_gen_img/15-cargo-drone.jpg",
        status: "available"
    },
    {
        id: "a16",
        title: "Desert Explorer Vehicle",
        creator: "sandstorm",
        category: "vehicles",
        description: "Rugged off-road vehicle built to traverse harsh desert terrains, with working suspension.",
        tags: ["desert", "buggy", "offroad", "vehicles"],
        thumbnailUrl: "ai_gen_img/16-desert-explorer.jpg",
        status: "available"
    },

    // Environment
    {
        id: "a17",
        title: "Crystal Cave Kit",
        creator: "anya_3d",
        category: "environments",
        description: "A modular package of glowing crystals and rocks for assembling cave levels.",
        tags: ["environment", "crystals", "lowpoly", "cave"],
        thumbnailUrl: "ai_gen_img/17-crystal-cave.jpg",
        status: "available"
    },
    {
        id: "a18",
        title: "Stylized Tree Bundle",
        creator: "leafwork",
        category: "environments",
        description: "18 stylized tree models optimized for forest scenes. Includes seasonal texture variants.",
        tags: ["trees", "nature", "stylized", "environments"],
        thumbnailUrl: "ai_gen_img/18-stylized-trees.jpg",
        status: "available"
    },
    {
        id: "a19",
        title: "Ancient Ruins Pack",
        creator: "stonearch",
        category: "environments",
        description: "Stone pillars, archways, and collapsed structures from long-forgotten empires.",
        tags: ["ruins", "stone", "ancient", "environments"],
        thumbnailUrl: "ai_gen_img/19-ancient-ruins.jpg",
        status: "available"
    },
    {
        id: "a20",
        title: "Floating Island Environment",
        creator: "skybound",
        category: "environments",
        description: "Modular sky landmasses with custom grass shaders, hanging vines, and waterfalls.",
        tags: ["sky", "islands", "environments", "fantasy"],
        thumbnailUrl: "ai_gen_img/20-floating-island.jpg",
        status: "available"
    },

    // VFX
    {
        id: "a21",
        title: "Fire & Smoke VFX Pack",
        creator: "vfxlab",
        category: "vfx",
        description: "Highly optimized flipbook particle effects representing realistic campfires, explosions, and smoke trails.",
        tags: ["particles", "fire", "smoke", "vfx"],
        thumbnailUrl: "ai_gen_img/21-fire-smoke-vfx.jpg",
        status: "available"
    },
    {
        id: "a22",
        title: "Magic Spell Effects",
        creator: "wizard_vfx",
        category: "vfx",
        description: "A particle VFX bundle featuring flame bursts, healing glows, and electric arcs.",
        tags: ["vfx", "particles", "magic", "effects"],
        thumbnailUrl: "ai_gen_img/22-magic-spells.jpg",
        status: "available"
    },
    {
        id: "a23",
        title: "Lightning Impact FX",
        creator: "volt_vfx",
        category: "vfx",
        description: "Electrifying high-energy ground strikes and static storm arcs for lightning attacks.",
        tags: ["lightning", "storm", "vfx", "sparks"],
        thumbnailUrl: "ai_gen_img/23-lightning-impact.jpg",
        status: "available"
    },
    {
        id: "a24",
        title: "Sci-Fi Energy Burst FX",
        creator: "quantum_vfx",
        category: "vfx",
        description: "Energy waves, shockwaves, and portal rings suitable for sci-fi weapons and tech systems.",
        tags: ["energy", "burst", "scifi", "vfx"],
        thumbnailUrl: "ai_gen_img/24-scifi-energy-burst.jpg",
        status: "available"
    },

    // UI
    {
        id: "a25",
        title: "Neon HUD Interface Kit",
        creator: "cyberui",
        category: "ui",
        description: "Futuristic neon head-up display components, status rings, maps, and radar interfaces.",
        tags: ["hud", "neon", "ui", "cyberpunk"],
        thumbnailUrl: "ai_gen_img/25-neon-hud.jpg",
        status: "available"
    },
    {
        id: "a26",
        title: "RPG Inventory UI",
        creator: "pixelpush",
        category: "ui",
        description: "Charming inventory grids, gear slots, and detail overlays tailored for fantasy RPG interfaces.",
        tags: ["inventory", "ui", "rpg", "pixel"],
        thumbnailUrl: "ai_gen_img/26-rpg-inventory.jpg",
        status: "available"
    },
    {
        id: "a27",
        title: "Futuristic Menu Pack",
        creator: "menumaster",
        category: "ui",
        description: "Clean sci-fi main menu templates, lobby screens, and setting dashboards.",
        tags: ["menus", "scifi", "ui", "design"],
        thumbnailUrl: "ai_gen_img/27-futuristic-menu.jpg",
        status: "available"
    },
    {
        id: "a28",
        title: "Quest Log Interface",
        creator: "rpg_ui",
        category: "ui",
        description: "Clean journals, quest list layouts, and tracker panels to list adventures and goals.",
        tags: ["quest", "ui", "journal", "rpg"],
        thumbnailUrl: "ai_gen_img/28-quest-log.jpg",
        status: "available"
    },

    // Coming Soon Categories
    {
        id: "a29",
        title: "Music Pack Collection",
        creator: "synthwave",
        category: "music",
        description: "Synthesized loopable ambient tracks and epic battle scores for synthwave game vibes.",
        tags: ["music", "audio", "background", "loop"],
        thumbnailUrl: "ai_gen_img/29-music-pack.jpg",
        status: "coming-soon"
    },
    {
        id: "a30",
        title: "Animation Bundle Collection",
        creator: "rig_anim",
        category: "animations",
        description: "A package of biped combat walks, sword swings, jumps, and dodges.",
        tags: ["animation", "rigged", "combat", "movement"],
        thumbnailUrl: "ai_gen_img/30-animation-bundle.jpg",
        status: "coming-soon"
    },
    {
        id: "a31",
        title: "Shader Collection",
        creator: "shaderlab",
        category: "shaders",
        description: "Unreal Engine and Unity custom shader graphs for stylised water, shield grids, and grass.",
        tags: ["shaders", "material", "water", "stylized"],
        thumbnailUrl: "ai_gen_img/31-shader-collection.jpg",
        status: "coming-soon"
    },
    {
        id: "a32",
        title: "Texture Collection",
        creator: "texpack",
        category: "textures",
        description: "High-resolution tiling textures: stone walls, gravel pathing, and metal floor grids.",
        tags: ["textures", "tiling", "pbr", "materials"],
        thumbnailUrl: "ai_gen_img/32-texture-collection.jpg",
        status: "coming-soon"
    }
];

const MOCK_REVIEWS = {
    "a1": [
        { username: "john_doe", rating: 5, comment: "Amazing animations, looks super cute in-engine!", createdAt: "2026-06-15T12:00:00Z" },
        { username: "game_creator", rating: 4, comment: "Really nice rig, matches our stylized art direction perfectly.", createdAt: "2026-06-12T09:30:00Z" },
        { username: "pixel_guy", rating: 5, comment: "Rigged flawlessly, no weight painting issues.", createdAt: "2026-06-10T14:15:00Z" }
    ],
    "a2": [
        { username: "mech_fan", rating: 5, comment: "Brilliant animations! Love the idle stretch animation.", createdAt: "2026-06-18T16:00:00Z" },
        { username: "indie_coder", rating: 4, comment: "Perfect for our prototype companion mechanic.", createdAt: "2026-06-14T11:20:00Z" },
        { username: "cat_lover", rating: 5, comment: "Very cute design, runs fine on mobile target build.", createdAt: "2026-06-11T18:40:00Z" }
    ],
    "a3": [
        { username: "ranger_dave", rating: 5, comment: "Love the forest ranger asset, fits my adventure game perfectly!", createdAt: "2026-06-18T15:20:00Z" },
        { username: "unity_guru", rating: 4, comment: "Nice optimization. LOD details are clean.", createdAt: "2026-06-15T11:10:00Z" }
    ],
    "a4": [
        { username: "cyber_dev", rating: 5, comment: "Highly detailed emission maps! The neon details look killer.", createdAt: "2026-06-19T13:45:00Z" },
        { username: "mercury", rating: 5, comment: "Mixamo rigging retargeting works beautifully.", createdAt: "2026-06-16T10:05:00Z" }
    ],
    "a5": [
        { username: "potion_brewer", rating: 5, comment: "Beautiful emission maps, they glow nicely at night.", createdAt: "2026-06-17T08:00:00Z" },
        { username: "alchemy_god", rating: 5, comment: "Great modular components, easy to combine into new potions.", createdAt: "2026-06-15T10:45:00Z" },
        { username: "magical_dev", rating: 4, comment: "Hand-painted styling is gorgeous.", createdAt: "2026-06-13T13:10:00Z" }
    ],
    "a6": [
        { username: "tea_time", rating: 5, comment: "Elegant materials, PBR values are spot on.", createdAt: "2026-06-16T15:20:00Z" },
        { username: "cozy_dev", rating: 5, comment: "Looks wonderful in our cozy tea shop simulator.", createdAt: "2026-06-14T09:00:00Z" },
        { username: "cup_collector", rating: 4, comment: "Lovely texture resolution.", createdAt: "2026-06-12T11:55:00Z" }
    ],
    "a7": [
        { username: "loot_hoarder", rating: 5, comment: "Excellent keyframe animations for the chest lid opening.", createdAt: "2026-06-19T10:10:00Z" },
        { username: "dungeon_builder", rating: 4, comment: "Perfect for spawning loot drops inside chests.", createdAt: "2026-06-17T14:30:00Z" }
    ],
    "a8": [
        { username: "history_buff", rating: 5, comment: "Detailed carving textures and ancient rune details.", createdAt: "2026-06-18T09:25:00Z" },
        { username: "mystic", rating: 5, comment: "Really brings the dungeon atmosphere alive.", createdAt: "2026-06-15T16:50:00Z" }
    ],
    "a9": [
        { username: "knight_rises", rating: 5, comment: "Great sword models, polygon count is highly optimized.", createdAt: "2026-06-19T14:00:00Z" },
        { username: "rpg_builder", rating: 5, comment: "Fits right into our medieval fantasy pack.", createdAt: "2026-06-16T12:30:00Z" },
        { username: "slash_master", rating: 4, comment: "Nice custom weapon colliders included.", createdAt: "2026-06-13T08:15:00Z" }
    ],
    "a10": [
        { username: "mage_prime", rating: 5, comment: "Crystal glow effect shader fits perfectly with particle VFX.", createdAt: "2026-06-19T11:00:00Z" },
        { username: "staff_weaver", rating: 5, comment: "Splendid models, easy to customize colors.", createdAt: "2026-06-17T12:40:00Z" }
    ],
    "a11": [
        { username: "halo_fan", rating: 5, comment: "Sci-Fi vibes are very clean. The laser animations are super neat.", createdAt: "2026-06-18T07:15:00Z" },
        { username: "shotgun_jimmy", rating: 4, comment: "Awesome weapon design, optimized textures.", createdAt: "2026-06-15T16:00:00Z" }
    ],
    "a12": [
        { username: "paladin", rating: 5, comment: "High quality shield and mace meshes. Fully ready for combat system.", createdAt: "2026-06-18T10:15:00Z" },
        { username: "armor_smith", rating: 5, comment: "Excellent mesh weighting and PBR materials.", createdAt: "2026-06-16T08:35:00Z" }
    ],
    "a13": [
        { username: "propeller_pilot", rating: 5, comment: "Extremely fun cartoon styling, works with custom physics.", createdAt: "2026-06-18T10:00:00Z" },
        { username: "flight_fanatic", rating: 5, comment: "LODs are clean, runs fast even with multiple entities.", createdAt: "2026-06-15T16:40:00Z" },
        { username: "toy_box", rating: 4, comment: "Props rotate smoothly, great animations.", createdAt: "2026-06-13T11:22:00Z" }
    ],
    "a14": [
        { username: "speedster", rating: 5, comment: "Aerodynamic lines are stunning. Hover mechanics animate perfectly.", createdAt: "2026-06-19T15:20:00Z" },
        { username: "cyber_rider", rating: 4, comment: "Perfect fit for futuristic city levels.", createdAt: "2026-06-16T12:55:00Z" }
    ],
    "a15": [
        { username: "drone_pilot", rating: 5, comment: "Excellent model with functional package clamps.", createdAt: "2026-06-17T09:40:00Z" },
        { username: "logistics_sim", rating: 5, comment: "Runs smoothly in mass quantities.", createdAt: "2026-06-14T14:15:00Z" }
    ],
    "a16": [
        { username: "mad_max", rating: 5, comment: "Tire treads and dust kickers look super cool in sand levels.", createdAt: "2026-06-19T16:45:00Z" },
        { username: "dirt_racer", rating: 5, comment: "Suspension mesh coordinates are fully independent.", createdAt: "2026-06-17T11:20:00Z" }
    ],
    "a17": [
        { username: "cave_explorer", rating: 5, comment: "Massive modularity, assembled a custom level in 10 minutes.", createdAt: "2026-06-19T09:00:00Z" },
        { username: "lowpoly_king", rating: 5, comment: "Clean geometry, vertex lighting looks awesome.", createdAt: "2026-06-17T13:10:00Z" },
        { username: "spooky_dev", rating: 4, comment: "Excellent glowing crystals.", createdAt: "2026-06-14T17:50:00Z" }
    ],
    "a18": [
        { username: "foliage_fan", rating: 5, comment: "Trees sway beautifully with simple vertex displacement shaders.", createdAt: "2026-06-18T14:30:00Z" },
        { username: "woodland", rating: 5, comment: "Good organic shapes, optimized geometry.", createdAt: "2026-06-16T11:15:00Z" }
    ],
    "a19": [
        { username: "explorer_john", rating: 5, comment: "Perfect collection of collapsed masonry structures.", createdAt: "2026-06-18T10:10:00Z" },
        { username: "ruins_mapper", rating: 4, comment: "Excellent rock textures and ancient carvings.", createdAt: "2026-06-15T15:25:00Z" }
    ],
    "a20": [
        { username: "sky_captain", rating: 5, comment: "Absolutely breathtaking! Waterfalls and trees animate flawlessly.", createdAt: "2026-06-19T12:00:00Z" },
        { username: "island_dreamer", rating: 5, comment: "Fits beautifully with custom skyboxes.", createdAt: "2026-06-16T16:15:00Z" }
    ],
    "a21": [
        { username: "vfx_coder", rating: 5, comment: "Fluid particle flows, explosion bursts are incredibly crisp.", createdAt: "2026-06-19T14:30:00Z" },
        { username: "pyro_dev", rating: 5, comment: "Realistic smoke dissipation physics.", createdAt: "2026-06-17T10:50:00Z" }
    ],
    "a22": [
        { username: "particle_magician", rating: 5, comment: "Stunning magic effects, highly recommend this package.", createdAt: "2026-06-18T11:30:00Z" },
        { username: "spellcaster", rating: 5, comment: "Flame bursts look amazing in HDRP.", createdAt: "2026-06-16T15:15:00Z" },
        { username: "wizard_dev", rating: 4, comment: "Easy to customize colors in Unity/Unreal Niagara.", createdAt: "2026-06-13T12:05:00Z" }
    ],
    "a23": [
        { username: "thunder_god", rating: 5, comment: "Instant impact electricity effects. Visually spectacular.", createdAt: "2026-06-19T15:55:00Z" },
        { username: "storm_vfx", rating: 5, comment: "Excellent neon discharge frames.", createdAt: "2026-06-17T12:30:00Z" }
    ],
    "a24": [
        { username: "nova_dev", rating: 5, comment: "Shockwaves and rings have incredibly smooth fading opacity.", createdAt: "2026-06-19T11:40:00Z" },
        { username: "plasma_blast", rating: 5, comment: "Perfect for energy barrier impacts.", createdAt: "2026-06-16T14:05:00Z" }
    ],
    "a25": [
        { username: "hud_designer", rating: 5, comment: "Stunning futuristic components, highly vector-clean.", createdAt: "2026-06-18T13:40:00Z" },
        { username: "sci_fi_gamer", rating: 4, comment: "Radar map element fits perfectly with custom inputs.", createdAt: "2026-06-15T11:15:00Z" }
    ],
    "a26": [
        { username: "pixel_rpg", rating: 5, comment: "Cute inventory slots, aligns perfectly with grid styling.", createdAt: "2026-06-19T10:35:00Z" },
        { username: "item_collector", rating: 5, comment: "Brilliant detail popups included.", createdAt: "2026-06-16T14:40:00Z" }
    ],
    "a27": [
        { username: "lobby_builder", rating: 5, comment: "Very professional settings screen layouts.", createdAt: "2026-06-18T16:50:00Z" },
        { username: "menu_dev", rating: 4, comment: "Includes sound cues for hovering and clicks.", createdAt: "2026-06-15T09:10:00Z" }
    ],
    "a28": [
        { username: "quest_writer", rating: 5, comment: "Simple, scrollable Quest log template. Excellent font scaling.", createdAt: "2026-06-19T11:20:00Z" },
        { username: "journal_master", rating: 5, comment: "Exactly what our RPG project needed.", createdAt: "2026-06-16T13:15:00Z" }
    ]
};
