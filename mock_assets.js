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

    // Coming Soon Placeholders (originally a29-a32)
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
    },

    // Characters (additional)
    {
        id: "a33",
        title: "Desert Nomad Explorer",
        creator: "sandstorm",
        category: "characters",
        description: "Hooded desert nomad with goggles, scarf and travel gear. Rigged and game-ready.",
        tags: ["character", "desert", "nomad", "explorer"],
        thumbnailUrl: "ai_gen_img/33-desert-nomad-explorer.jpg",
        status: "available"
    },
    {
        id: "a34",
        title: "Space Marine Commander",
        creator: "ironforge",
        category: "characters",
        description: "Heavy-armored space marine with rifle. Modular plates and decals.",
        tags: ["character", "scifi", "marine", "soldier"],
        thumbnailUrl: "ai_gen_img/34-space-marine-commander.jpg",
        status: "available"
    },
    {
        id: "a35",
        title: "Medieval Knight Champion",
        creator: "armoury",
        category: "characters",
        description: "Champion knight in full plate with crested helm and longsword.",
        tags: ["character", "medieval", "knight", "warrior"],
        thumbnailUrl: "ai_gen_img/35-medieval-knight-champion.jpg",
        status: "available"
    },
    {
        id: "a36",
        title: "Steampunk Engineer",
        creator: "ironforge",
        category: "characters",
        description: "Friendly engineer with brass goggles, leather apron and a wrench.",
        tags: ["character", "steampunk", "engineer", "mechanic"],
        thumbnailUrl: "ai_gen_img/36-steampunk-engineer.jpg",
        status: "available"
    },
    {
        id: "a37",
        title: "Cyber Ninja Operative",
        creator: "neonpulse",
        category: "characters",
        description: "Stealth ninja with neon visor and dual katanas. Modular armor pieces.",
        tags: ["character", "cyberpunk", "ninja", "stealth"],
        thumbnailUrl: "ai_gen_img/37-cyber-ninja-operative.jpg",
        status: "available"
    },
    {
        id: "a38",
        title: "Arctic Survival Scout",
        creator: "mossyman",
        category: "characters",
        description: "Fur-trimmed parka scout with backpack and snow gear.",
        tags: ["character", "arctic", "scout", "survival"],
        thumbnailUrl: "ai_gen_img/38-arctic-survival-scout.jpg",
        status: "available"
    },
    {
        id: "a39",
        title: "Robot Maintenance Droid",
        creator: "ironforge",
        category: "characters",
        description: "Cute wheeled droid with antenna and toolkit arms. Rigged.",
        tags: ["character", "robot", "droid", "companion"],
        thumbnailUrl: "ai_gen_img/39-robot-maintenance-droid.jpg",
        status: "available"
    },
    {
        id: "a40",
        title: "Fantasy Mage Apprentice",
        creator: "wizardry",
        category: "characters",
        description: "Young apprentice with star-patterned robe and glowing spellbook.",
        tags: ["character", "mage", "apprentice", "fantasy"],
        thumbnailUrl: "ai_gen_img/40-fantasy-mage-apprentice.jpg",
        status: "available"
    },

    // Props (additional)
    {
        id: "a41",
        title: "Alchemist Laboratory Set",
        creator: "glimmerbottle",
        category: "props",
        description: "Bubbling flasks, burner, mortar and pestle on a wooden bench.",
        tags: ["props", "alchemy", "lab", "fantasy"],
        thumbnailUrl: "ai_gen_img/41-alchemist-laboratory-set.jpg",
        status: "available"
    },
    {
        id: "a42",
        title: "Camping Equipment Bundle",
        creator: "pinewardstudio",
        category: "props",
        description: "Tent, lantern, sleeping bag, backpack and campfire kit.",
        tags: ["props", "camping", "outdoor", "survival"],
        thumbnailUrl: "ai_gen_img/42-camping-equipment-bundle.jpg",
        status: "available"
    },
    {
        id: "a43",
        title: "Fantasy Market Props",
        creator: "oakironcraft",
        category: "props",
        description: "Striped awning stall with crates of fruit and hanging lanterns.",
        tags: ["props", "market", "stall", "medieval"],
        thumbnailUrl: "ai_gen_img/43-fantasy-market-props.jpg",
        status: "available"
    },
    {
        id: "a44",
        title: "Pirate Treasure Collection",
        creator: "oakironcraft",
        category: "props",
        description: "Gem-studded chest, gold coins, compass, skull and parchment map.",
        tags: ["props", "pirate", "treasure", "gold"],
        thumbnailUrl: "ai_gen_img/44-pirate-treasure-collection.jpg",
        status: "available"
    },
    {
        id: "a45",
        title: "Blacksmith Workshop Tools",
        creator: "gildedanvil",
        category: "props",
        description: "Anvil, hammer, tongs, bellows and a glowing forge.",
        tags: ["props", "blacksmith", "tools", "forge"],
        thumbnailUrl: "ai_gen_img/45-blacksmith-workshop-tools.jpg",
        status: "available"
    },
    {
        id: "a46",
        title: "Ancient Scroll Collection",
        creator: "duststone",
        category: "props",
        description: "Rolled parchments with wax seals and runic engravings.",
        tags: ["props", "scroll", "ancient", "parchment"],
        thumbnailUrl: "ai_gen_img/46-ancient-scroll-collection.jpg",
        status: "available"
    },
    {
        id: "a47",
        title: "Crystal Artifact Set",
        creator: "geodelab",
        category: "props",
        description: "Glowing geometric crystals on stone pedestals.",
        tags: ["props", "crystal", "artifact", "magic"],
        thumbnailUrl: "ai_gen_img/47-crystal-artifact-set.jpg",
        status: "available"
    },
    {
        id: "a48",
        title: "Tavern Furniture Pack",
        creator: "oakironcraft",
        category: "props",
        description: "Wooden tables, benches, barrels and candle holders.",
        tags: ["props", "tavern", "furniture", "medieval"],
        thumbnailUrl: "ai_gen_img/48-tavern-furniture-pack.jpg",
        status: "available"
    },

    // Weapons (additional)
    {
        id: "a49",
        title: "Viking Weapon Collection",
        creator: "castlesmith",
        category: "weapons",
        description: "Battle axe, round shield, sword and spear with knotwork details.",
        tags: ["weapon", "viking", "axe", "shield"],
        thumbnailUrl: "ai_gen_img/49-viking-weapon-collection.jpg",
        status: "available"
    },
    {
        id: "a50",
        title: "Samurai Blade Pack",
        creator: "edgewright",
        category: "weapons",
        description: "Katana, wakizashi and tanto with ornate scabbards.",
        tags: ["weapon", "samurai", "katana", "sword"],
        thumbnailUrl: "ai_gen_img/50-samurai-blade-pack.jpg",
        status: "available"
    },
    {
        id: "a51",
        title: "Sci-Fi Plasma Arsenal",
        creator: "plasmacraft",
        category: "weapons",
        description: "Plasma rifle, pistol and shotgun with glowing energy cells.",
        tags: ["weapon", "scifi", "plasma", "energy"],
        thumbnailUrl: "ai_gen_img/51-scifi-plasma-arsenal.jpg",
        status: "available"
    },
    {
        id: "a52",
        title: "Hunter Weapon Bundle",
        creator: "pinewardstudio",
        category: "weapons",
        description: "Crossbow, bow with quiver, hunting knife and traps.",
        tags: ["weapon", "hunter", "crossbow", "bow"],
        thumbnailUrl: "ai_gen_img/52-hunter-weapon-bundle.jpg",
        status: "available"
    },
    {
        id: "a53",
        title: "Arcane Magic Weapons",
        creator: "runebearer",
        category: "weapons",
        description: "Rune sword, orb-tipped wand and enchanted dagger with VFX.",
        tags: ["weapon", "arcane", "magic", "rune"],
        thumbnailUrl: "ai_gen_img/53-arcane-magic-weapons.jpg",
        status: "available"
    },
    {
        id: "a54",
        title: "Assassin Equipment Set",
        creator: "shadowstep",
        category: "weapons",
        description: "Throwing knives, smoke bombs, grappling hook and dark mask.",
        tags: ["weapon", "assassin", "stealth", "knife"],
        thumbnailUrl: "ai_gen_img/54-assassin-equipment-set.jpg",
        status: "available"
    },
    {
        id: "a55",
        title: "Futuristic Combat Kit",
        creator: "orbitalforge",
        category: "weapons",
        description: "Sci-fi helmet, armored vest, energy grenades and blaster.",
        tags: ["weapon", "scifi", "combat", "armor"],
        thumbnailUrl: "ai_gen_img/55-futuristic-combat-kit.jpg",
        status: "available"
    },
    {
        id: "a56",
        title: "Royal Knight Armory",
        creator: "castlesmith",
        category: "weapons",
        description: "Ornate sword, kite shield with crest, polished helm and lance.",
        tags: ["weapon", "royal", "knight", "armory"],
        thumbnailUrl: "ai_gen_img/56-royal-knight-armory.jpg",
        status: "available"
    },

    // Vehicles (additional)
    {
        id: "a57",
        title: "Space Fighter Craft",
        creator: "orbitalforge",
        category: "vehicles",
        description: "Sleek swept-wing fighter craft with glowing engines.",
        tags: ["vehicle", "scifi", "spaceship", "fighter"],
        thumbnailUrl: "ai_gen_img/57-space-fighter-craft.jpg",
        status: "available"
    },
    {
        id: "a58",
        title: "Rescue Helicopter",
        creator: "liftgrid",
        category: "vehicles",
        description: "Red and white rescue helicopter with rotor blur and decals.",
        tags: ["vehicle", "helicopter", "rescue", "rotor"],
        thumbnailUrl: "ai_gen_img/58-rescue-helicopter.jpg",
        status: "available"
    },
    {
        id: "a59",
        title: "Fantasy Airship",
        creator: "skystone",
        category: "vehicles",
        description: "Wooden-hulled airship with sails, brass propellers and balloon.",
        tags: ["vehicle", "airship", "fantasy", "steampunk"],
        thumbnailUrl: "ai_gen_img/59-fantasy-airship.jpg",
        status: "available"
    },
    {
        id: "a60",
        title: "Racing Hovercraft",
        creator: "voidrider",
        category: "vehicles",
        description: "Aerodynamic racing hovercraft with decals and glowing thrusters.",
        tags: ["vehicle", "racing", "hovercraft", "speed"],
        thumbnailUrl: "ai_gen_img/60-racing-hovercraft.jpg",
        status: "available"
    },
    {
        id: "a61",
        title: "Military Transport Vehicle",
        creator: "ironwheel",
        category: "vehicles",
        description: "Armored 6-wheel transport truck in olive drab.",
        tags: ["vehicle", "military", "transport", "truck"],
        thumbnailUrl: "ai_gen_img/61-military-transport-vehicle.jpg",
        status: "available"
    },
    {
        id: "a62",
        title: "Mining Exploration Rover",
        creator: "duneline",
        category: "vehicles",
        description: "Chunky wheeled rover with drills, headlights and antennas.",
        tags: ["vehicle", "rover", "mining", "exploration"],
        thumbnailUrl: "ai_gen_img/62-mining-exploration-rover.jpg",
        status: "available"
    },
    {
        id: "a63",
        title: "Futuristic Taxi Drone",
        creator: "liftgrid",
        category: "vehicles",
        description: "Yellow and black hovering passenger taxi drone.",
        tags: ["vehicle", "taxi", "drone", "futuristic"],
        thumbnailUrl: "ai_gen_img/63-futuristic-taxi-drone.jpg",
        status: "available"
    },
    {
        id: "a64",
        title: "Armored Desert Truck",
        creator: "duneline",
        category: "vehicles",
        description: "Sand-worn armored truck with roof rack and oversized tires.",
        tags: ["vehicle", "desert", "armored", "truck"],
        thumbnailUrl: "ai_gen_img/64-armored-desert-truck.jpg",
        status: "available"
    },

    // Environment (additional)
    {
        id: "a65",
        title: "Desert Canyon Environment",
        creator: "duststone",
        category: "environments",
        description: "Red rock cliffs and dry riverbed diorama.",
        tags: ["environment", "desert", "canyon", "diorama"],
        thumbnailUrl: "ai_gen_img/65-desert-canyon-environment.jpg",
        status: "available"
    },
    {
        id: "a66",
        title: "Snowy Mountain Village",
        creator: "frostline",
        category: "environments",
        description: "Timber cottages with snow-capped roofs nestled in pines.",
        tags: ["environment", "village", "snow", "mountain"],
        thumbnailUrl: "ai_gen_img/66-snowy-mountain-village.jpg",
        status: "available"
    },
    {
        id: "a67",
        title: "Ancient Temple Ruins",
        creator: "mosswright",
        category: "environments",
        description: "Stone pillars, overgrown vines and broken statues.",
        tags: ["environment", "temple", "ruins", "overgrown"],
        thumbnailUrl: "ai_gen_img/67-ancient-temple-ruins.jpg",
        status: "available"
    },
    {
        id: "a68",
        title: "Fantasy Forest Clearing",
        creator: "leafrender",
        category: "environments",
        description: "Mossy stones, glowing mushrooms and soft sunbeams.",
        tags: ["environment", "forest", "clearing", "fantasy"],
        thumbnailUrl: "ai_gen_img/68-fantasy-forest-clearing.jpg",
        status: "available"
    },
    {
        id: "a69",
        title: "Cyberpunk City Block",
        creator: "neonalleyworks",
        category: "environments",
        description: "Neon signs, towering buildings and rain-slick streets.",
        tags: ["environment", "cyberpunk", "city", "neon"],
        thumbnailUrl: "ai_gen_img/69-cyberpunk-city-block.jpg",
        status: "available"
    },
    {
        id: "a70",
        title: "Volcanic Island Scene",
        creator: "emberforge",
        category: "environments",
        description: "Lava flows, black rock and a smoking volcano diorama.",
        tags: ["environment", "volcano", "lava", "island"],
        thumbnailUrl: "ai_gen_img/70-volcanic-island-scene.jpg",
        status: "available"
    },
    {
        id: "a71",
        title: "Medieval Castle Grounds",
        creator: "castlesmith",
        category: "environments",
        description: "Stone keep, gatehouse, drawbridge and banners diorama.",
        tags: ["environment", "castle", "medieval", "grounds"],
        thumbnailUrl: "ai_gen_img/71-medieval-castle-grounds.jpg",
        status: "available"
    },
    {
        id: "a72",
        title: "Underground Crystal Cavern",
        creator: "geodelab",
        category: "environments",
        description: "Glowing pink and blue crystal clusters in rocky walls.",
        tags: ["environment", "cave", "crystal", "underground"],
        thumbnailUrl: "ai_gen_img/72-underground-crystal-cavern.jpg",
        status: "available"
    },

    // VFX (additional)
    {
        id: "a73",
        title: "Fire Magic Collection",
        creator: "emberforge",
        category: "vfx",
        description: "Flame orbs, fire trails and ember bursts.",
        tags: ["vfx", "fire", "magic", "particles"],
        thumbnailUrl: "ai_gen_img/73-fire-magic-collection.jpg",
        status: "available"
    },
    {
        id: "a74",
        title: "Ice Magic Collection",
        creator: "frostline",
        category: "vfx",
        description: "Frost crystals, frozen mist and icicle shards.",
        tags: ["vfx", "ice", "magic", "particles"],
        thumbnailUrl: "ai_gen_img/74-ice-magic-collection.jpg",
        status: "available"
    },
    {
        id: "a75",
        title: "Poison Effects Pack",
        creator: "glimmerbottle",
        category: "vfx",
        description: "Toxic clouds, bubbling acid drops and slime particles.",
        tags: ["vfx", "poison", "toxic", "particles"],
        thumbnailUrl: "ai_gen_img/75-poison-effects-pack.jpg",
        status: "available"
    },
    {
        id: "a76",
        title: "Portal Transition Effects",
        creator: "glyphwell",
        category: "vfx",
        description: "Swirling magic portal with energy ribbons.",
        tags: ["vfx", "portal", "transition", "magic"],
        thumbnailUrl: "ai_gen_img/76-portal-transition-effects.jpg",
        status: "available"
    },
    {
        id: "a77",
        title: "Explosion FX Bundle",
        creator: "emberforge",
        category: "vfx",
        description: "Bright fireball with shockwave, debris and smoke.",
        tags: ["vfx", "explosion", "fire", "debris"],
        thumbnailUrl: "ai_gen_img/77-explosion-fx-bundle.jpg",
        status: "available"
    },
    {
        id: "a78",
        title: "Weather Effects Collection",
        creator: "voltarc",
        category: "vfx",
        description: "Rain, lightning, wind streams and snowflakes.",
        tags: ["vfx", "weather", "rain", "lightning"],
        thumbnailUrl: "ai_gen_img/78-weather-effects-collection.jpg",
        status: "available"
    },
    {
        id: "a79",
        title: "Energy Shield Effects",
        creator: "pulsewave",
        category: "vfx",
        description: "Hexagonal translucent dome shield with ripples.",
        tags: ["vfx", "shield", "energy", "hex"],
        thumbnailUrl: "ai_gen_img/79-energy-shield-effects.jpg",
        status: "available"
    },
    {
        id: "a80",
        title: "Healing Magic Effects",
        creator: "glyphwell",
        category: "vfx",
        description: "Soft green and gold light with floating leaves and runic circle.",
        tags: ["vfx", "healing", "magic", "runes"],
        thumbnailUrl: "ai_gen_img/80-healing-magic-effects.jpg",
        status: "available"
    },

    // UI Kits (additional)
    {
        id: "a81",
        title: "Inventory System UI",
        creator: "questframe",
        category: "ui",
        description: "Glowing holo-panel inventory with item slot icons.",
        tags: ["ui", "inventory", "system", "panel"],
        thumbnailUrl: "ai_gen_img/81-inventory-system-ui.jpg",
        status: "available"
    },
    {
        id: "a82",
        title: "Skill Tree Interface",
        creator: "glowpanel",
        category: "ui",
        description: "3D holo-panel skill tree with connected nodes and icons.",
        tags: ["ui", "skill", "tree", "rpg"],
        thumbnailUrl: "ai_gen_img/82-skill-tree-interface.jpg",
        status: "available"
    },
    {
        id: "a83",
        title: "Quest Tracker UI",
        creator: "parchmentui",
        category: "ui",
        description: "Parchment-style 3D scroll panel with markers and icons.",
        tags: ["ui", "quest", "tracker", "scroll"],
        thumbnailUrl: "ai_gen_img/83-quest-tracker-ui.jpg",
        status: "available"
    },
    {
        id: "a84",
        title: "Sci-Fi Dashboard Kit",
        creator: "glassdeck",
        category: "ui",
        description: "Floating neon glass panels with gauges and icons.",
        tags: ["ui", "dashboard", "scifi", "glass"],
        thumbnailUrl: "ai_gen_img/84-scifi-dashboard-kit.jpg",
        status: "available"
    },
    {
        id: "a85",
        title: "Mobile Game HUD",
        creator: "questframe",
        category: "ui",
        description: "Glossy 3D buttons, joystick, mini-map and health bar.",
        tags: ["ui", "mobile", "hud", "game"],
        thumbnailUrl: "ai_gen_img/85-mobile-game-hud.jpg",
        status: "available"
    },
    {
        id: "a86",
        title: "Strategy Game Interface",
        creator: "glowpanel",
        category: "ui",
        description: "Holographic map panel with unit and resource icons.",
        tags: ["ui", "strategy", "map", "rts"],
        thumbnailUrl: "ai_gen_img/86-strategy-game-interface.jpg",
        status: "available"
    },
    {
        id: "a87",
        title: "Dialogue System UI",
        creator: "parchmentui",
        category: "ui",
        description: "Floating speech bubble panel with portrait and choice buttons.",
        tags: ["ui", "dialogue", "speech", "rpg"],
        thumbnailUrl: "ai_gen_img/87-dialogue-system-ui.jpg",
        status: "available"
    },
    {
        id: "a88",
        title: "Health & Mana UI Pack",
        creator: "glowpanel",
        category: "ui",
        description: "Glowing red and blue orb bars with ornate frames.",
        tags: ["ui", "health", "mana", "rpg"],
        thumbnailUrl: "ai_gen_img/88-health-mana-ui-pack.jpg",
        status: "available"
    },

    // Music (On hold, coming-soon)
    {
        id: "a89",
        title: "Fantasy Tavern Music Pack",
        creator: "lootyard",
        category: "music",
        description: "Warm lute, flute and drum tracks for tavern scenes.",
        tags: ["music", "fantasy", "tavern", "folk"],
        thumbnailUrl: "ai_gen_img/89-fantasy-tavern-music.jpg",
        status: "coming-soon"
    },
    {
        id: "a90",
        title: "Sci-Fi Ambient Collection",
        creator: "lootyard",
        category: "music",
        description: "Ambient synth pads and waveforms for futuristic scenes.",
        tags: ["music", "scifi", "ambient", "synth"],
        thumbnailUrl: "ai_gen_img/90-scifi-ambient-music.jpg",
        status: "coming-soon"
    },
    {
        id: "a91",
        title: "Dungeon Exploration Tracks",
        creator: "lootyard",
        category: "music",
        description: "Dark exploratory tracks with low brass and percussion.",
        tags: ["music", "dungeon", "exploration", "dark"],
        thumbnailUrl: "ai_gen_img/91-dungeon-exploration-music.jpg",
        status: "coming-soon"
    },
    {
        id: "a92",
        title: "Battle Music Bundle",
        creator: "lootyard",
        category: "music",
        description: "Epic orchestral battle tracks with war drums and brass.",
        tags: ["music", "battle", "orchestral", "epic"],
        thumbnailUrl: "ai_gen_img/92-battle-music-bundle.jpg",
        status: "coming-soon"
    },
    {
        id: "a93",
        title: "Relaxing Village Themes",
        creator: "lootyard",
        category: "music",
        description: "Gentle folk themes for peaceful village scenes.",
        tags: ["music", "village", "relaxing", "folk"],
        thumbnailUrl: "ai_gen_img/93-relaxing-village-music.jpg",
        status: "coming-soon"
    },
    {
        id: "a94",
        title: "Boss Fight Soundtrack Pack",
        creator: "lootyard",
        category: "music",
        description: "Heavy, dramatic boss-fight tracks with cinematic builds.",
        tags: ["music", "boss", "soundtrack", "epic"],
        thumbnailUrl: "ai_gen_img/94-boss-fight-music.jpg",
        status: "coming-soon"
    },

    // Animations (On hold, coming-soon)
    {
        id: "a95",
        title: "Sword Combat Animations",
        creator: "motionrig",
        category: "animations",
        description: "Slashes, parries and combos for one-handed swords.",
        tags: ["animation", "sword", "combat", "rigged"],
        thumbnailUrl: "ai_gen_img/95-sword-combat-animations.jpg",
        status: "coming-soon"
    },
    {
        id: "a96",
        title: "Character Locomotion Pack",
        creator: "motionrig",
        category: "animations",
        description: "Walk, jog, run and idle cycles for humanoid rigs.",
        tags: ["animation", "locomotion", "walk", "run"],
        thumbnailUrl: "ai_gen_img/96-character-locomotion-pack.jpg",
        status: "coming-soon"
    },
    {
        id: "a97",
        title: "Magic Casting Animations",
        creator: "motionrig",
        category: "animations",
        description: "Cast, channel and release poses for spellcasters.",
        tags: ["animation", "magic", "casting", "spell"],
        thumbnailUrl: "ai_gen_img/97-magic-casting-animations.jpg",
        status: "coming-soon"
    },
    {
        id: "a98",
        title: "Parkour Movement Set",
        creator: "motionrig",
        category: "animations",
        description: "Vault, climb, slide and roll movement animations.",
        tags: ["animation", "parkour", "vault", "climb"],
        thumbnailUrl: "ai_gen_img/98-parkour-movement-set.jpg",
        status: "coming-soon"
    },
    {
        id: "a99",
        title: "NPC Interaction Animations",
        creator: "motionrig",
        category: "animations",
        description: "Greetings, conversations and friendly gestures.",
        tags: ["animation", "npc", "interaction", "dialogue"],
        thumbnailUrl: "ai_gen_img/99-npc-interaction-animations.jpg",
        status: "coming-soon"
    },
    {
        id: "a100",
        title: "Creature Animation Bundle",
        creator: "motionrig",
        category: "animations",
        description: "Idle, walk, attack and leap cycles for creatures.",
        tags: ["animation", "creature", "beast", "rigged"],
        thumbnailUrl: "ai_gen_img/100-creature-animation-bundle.jpg",
        status: "coming-soon"
    },

    // Shaders (On hold, coming-soon)
    {
        id: "a101",
        title: "Stylized Water Shader",
        creator: "shadercraft",
        category: "shaders",
        description: "Rippling glossy water surface with stylized foam edges.",
        tags: ["shader", "water", "stylized", "foam"],
        thumbnailUrl: "ai_gen_img/101-stylized-water-shader.jpg",
        status: "coming-soon"
    },
    {
        id: "a102",
        title: "Toon Lighting Shader",
        creator: "shadercraft",
        category: "shaders",
        description: "Cel-shaded lighting with clear shadow banding.",
        tags: ["shader", "toon", "cel", "lighting"],
        thumbnailUrl: "ai_gen_img/102-toon-lighting-shader.jpg",
        status: "coming-soon"
    },
    {
        id: "a103",
        title: "Crystal Refraction Shader",
        creator: "shadercraft",
        category: "shaders",
        description: "Faceted translucent crystals with colorful refractions.",
        tags: ["shader", "crystal", "refraction", "glass"],
        thumbnailUrl: "ai_gen_img/103-crystal-refraction-shader.jpg",
        status: "coming-soon"
    },
    {
        id: "a104",
        title: "Hologram Shader Pack",
        creator: "shadercraft",
        category: "shaders",
        description: "Translucent cyan hologram with scanlines and glow.",
        tags: ["shader", "hologram", "scifi", "glow"],
        thumbnailUrl: "ai_gen_img/104-hologram-shader-pack.jpg",
        status: "coming-soon"
    },
    {
        id: "a105",
        title: "Fire Material Shader",
        creator: "shadercraft",
        category: "shaders",
        description: "Flowing lava-fire texture with glowing cracks.",
        tags: ["shader", "fire", "lava", "emissive"],
        thumbnailUrl: "ai_gen_img/105-fire-material-shader.jpg",
        status: "coming-soon"
    },
    {
        id: "a106",
        title: "Magical Energy Shader",
        creator: "shadercraft",
        category: "shaders",
        description: "Flowing arcane runes wrapped around an energy aura.",
        tags: ["shader", "magic", "energy", "runes"],
        thumbnailUrl: "ai_gen_img/106-magical-energy-shader.jpg",
        status: "coming-soon"
    },

    // Textures (On hold, coming-soon)
    {
        id: "a107",
        title: "Medieval Texture Collection",
        creator: "pixelquarry",
        category: "textures",
        description: "Stone, wood, cobble and brick tileable textures.",
        tags: ["texture", "medieval", "stone", "wood"],
        thumbnailUrl: "ai_gen_img/107-medieval-texture-collection.jpg",
        status: "coming-soon"
    },
    {
        id: "a108",
        title: "Sci-Fi Surface Materials",
        creator: "pixelquarry",
        category: "textures",
        description: "Glossy metal panel samples with neon trim.",
        tags: ["texture", "scifi", "metal", "panel"],
        thumbnailUrl: "ai_gen_img/108-scifi-surface-materials.jpg",
        status: "coming-soon"
    },
    {
        id: "a109",
        title: "Nature Ground Textures",
        creator: "pixelquarry",
        category: "textures",
        description: "Grass, dirt, moss, sand and pebble ground textures.",
        tags: ["texture", "nature", "grass", "dirt"],
        thumbnailUrl: "ai_gen_img/109-nature-ground-textures.jpg",
        status: "coming-soon"
    },
    {
        id: "a110",
        title: "Dungeon Wall Textures",
        creator: "pixelquarry",
        category: "textures",
        description: "Mossy stone bricks, cracked plaster and dark masonry.",
        tags: ["texture", "dungeon", "wall", "stone"],
        thumbnailUrl: "ai_gen_img/110-dungeon-wall-textures.jpg",
        status: "coming-soon"
    },
    {
        id: "a111",
        title: "Fabric Material Collection",
        creator: "pixelquarry",
        category: "textures",
        description: "Linen, leather, silk and wool draped fabric samples.",
        tags: ["texture", "fabric", "linen", "silk"],
        thumbnailUrl: "ai_gen_img/111-fabric-material-collection.jpg",
        status: "coming-soon"
    },
    {
        id: "a112",
        title: "Weapon Material Pack",
        creator: "pixelquarry",
        category: "textures",
        description: "Polished steel, rust, gold inlay and gem facet samples.",
        tags: ["texture", "weapon", "metal", "gem"],
        thumbnailUrl: "ai_gen_img/112-weapon-material-pack.jpg",
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

window.MOCK_ASSETS = MOCK_ASSETS;
window.MOCK_REVIEWS = MOCK_REVIEWS;
