⭐ README.md — Minimalist YouTube Engine
Minimalist YouTube Engine
A clean, modular YouTube micro‑app featuring real search, autocomplete suggestions, a 16:9 embedded player, a dynamic queue system, and minimalist UI components — all running locally with no backend required.
This project is built as a fully client‑side YouTube engine with a focus on clarity, modularity, and mechanical reliability. Every component is isolated, reusable, and designed to work together without cracks.

🚀 Features
🔍 YouTube Search
Fetches real YouTube results using the YouTube Data API v3.
Displays thumbnails, titles, channels, and descriptions in a clean list.
✨ Autocomplete Suggestions
Real‑time suggestions powered by YouTube’s suggestion endpoint.
Dropdown updates as you type, with click‑to‑search behavior.
▶️ Embedded YouTube Player
- 16:9 responsive iframe
- Play / Pause
- Previous / Next
- Volume control
- Smooth transitions between videos
📦 Queue System
- Adds selected videos to an internal queue
- Automatically appends related videos
- Supports next/previous navigation
🎨 Minimalist UI
- Clean, near‑white aesthetic
- Soft shadows
- Thin borders
- 12–16px rounding
- Inter / SF Pro typography
- Zero gradients, zero neon, zero clutter
🧩 Modular Architecture
Separated into HTML, CSS, and JS modules for clarity and scalability.

/
├── index.html          # Landing page
├── frame.html          # Main YouTube engine UI
│
├── styles.css          # Global styling + typography + spacing
├── search.css          # Search bar, autocomplete, results
├── player.css          # Player wrapper + controls
├── components.css      # Shared UI components
│
├── utils.js            # Debounce, DOM helpers, Queue class
├── api.js              # YouTube API integrations
├── engine.js           # Main logic engine
│
└── README.md

🔧 Tech Stack
- HTML5
- CSS3 (modular, minimalist, component‑driven)
- JavaScript (ES Modules)
- YouTube Data API v3
- YouTube Suggest API
- YouTube IFrame Player API
No frameworks. No build tools. Pure browser‑native execution.
🧱 Architecture Overview
utils.js
- debounce(fn, delay)
- DOM helpers (qs, qsa, on, createEl)
- Queue class with:
- unique push
- index tracking
- prev/next navigation
api.js
- searchYouTube(query)
- getSuggestions(query)
- getRelated(videoId)
- Normalizes all responses into clean objects
engine.js
- Loads YouTube IFrame Player API
- Initializes YT.Player
- Handles:
- Autocomplete
- Search
- Rendering results
- Queue logic
- Playback controls
- Volume updates

🧭 Design Philosophy
- Minimalist
- Modular
- Mechanically reliable
- Zero visual noise
- Zero unnecessary dependencies
- Everything isolated and upgrade‑ready
This project is intentionally engineered to be readable, maintainable, and expandable.

📌 Status
✔️ Fully functional
✔️ Stable on localhost
✔️ Ready for GitHub release
⬜ Optional enhancements planned (playlists, history, themes, filters etc.)

