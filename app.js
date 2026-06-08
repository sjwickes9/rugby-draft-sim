:root {
    --rwc-navy: #0b1a30;
    --rwc-emerald: #00875a;
    --rwc-gold: #d4af37;
    --panel-blue: #13243d;
    --pitch-turf: #026642;
    --white-lines: rgba(255, 255, 255, 0.45);
    --card-bg: #091322;
    --text-white: #ffffff;
}

body, html {
    margin: 0; padding: 0;
    width: 100%; height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background-color: var(--rwc-navy); color: var(--text-white);
    overflow: hidden;
}

.app-container { display: flex; width: 100vw; height: 100vh; }

.control-panel {
    width: 35%; min-width: 410px; height: 100%;
    background-color: var(--panel-blue);
    box-sizing: border-box; padding: 20px;
    display: flex; flex-direction: column;
    border-right: 3px solid var(--rwc-emerald);
}

.logo {
    font-size: 1.7rem; font-weight: 900; margin: 0 0 20px 0;
    letter-spacing: 0.5px; border-bottom: 2px solid var(--rwc-gold);
    padding-bottom: 10px; text-transform: uppercase;
}
.highlight { color: var(--rwc-gold); }

.card {
    background: var(--card-bg); border-radius: 8px; padding: 18px;
    border: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 15px;
}
.card h2 { margin-top: 0; font-size: 1.1rem; color: var(--rwc-gold); text-transform: uppercase; }

.setting-group { margin-bottom: 18px; }
.setting-group label { display: block; font-size: 0.85rem; margin-bottom: 6px; color: #cbd5e1; font-weight: 600; }
.setting-group input[type="text"], .setting-group select {
    width: 100%; padding: 10px; background: var(--panel-blue); border: 1px solid rgba(255,255,255,0.2);
    border-radius: 4px; color: white; box-sizing: border-box; font-size: 0.9rem;
}

.help-text { display: block; font-size: 0.75rem; color: #94a3b8; margin-top: 4px; }
.radio-group label { display: block; margin-bottom: 8px; cursor: pointer; font-size: 0.85rem; }

/* 2-POSITION SLIDER ENGINE */
.mode-toggle-switch {
    display: flex; background: #050b14; border-radius: 20px;
    padding: 4px; align-items: center; justify-content: space-between;
    position: relative; border: 1px solid rgba(255,255,255,0.15); cursor: pointer;
}
.toggle-option {
    flex: 1; text-align: center; font-size: 0.8rem; font-weight: 700;
    z-index: 5; color: #64748b; transition: color 0.2s ease; padding: 6px 0;
}
.toggle-option.active { color: var(--rwc-navy); }
.switch-bg {
    position: absolute; top: 4px; left: 4px; bottom: 4px;
    width: calc(50% - 4px); background: var(--rwc-gold);
    border-radius: 16px; transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
}
.switch-bg.right-state { transform: translateX(100%); }

.action-buttons { display: flex; gap: 10px; margin-bottom: 15px; }
.btn {
    flex: 1; padding: 12px; border: none; border-radius: 4px; font-weight: 800;
    cursor: pointer; text-transform: uppercase; transition: 0.2s; font-size: 0.85rem;
}
.primary-btn { background: var(--rwc-gold); color: var(--rwc-navy); }
.secondary-btn { background: #334155; color: white; }
.success-btn { background: var(--rwc-emerald); color: white; width: 100%; font-size: 1rem; }
.btn.disabled, .btn:disabled { opacity: 0.25; cursor: not-allowed; }

/* STATUS CONTENT HOOKS */
.status-banner {
    background: var(--panel-blue); padding: 12px; border-radius: 4px;
    font-size: 0.85rem; border-left: 4px solid var(--rwc-gold); margin-bottom: 15px;
    display: flex; align-items: center; justify-content: center; gap: 12px;
    min-height: 44px; box-sizing: border-box;
}
#status-text { flex: 1; text-align: center; }

/* CSS SPINNING RUGBY BALL LOADER ANIMATION */
.rugby-spinner {
    width: 20px; height: 32px;
    background: var(--rwc-gold);
    border-radius: 100% / 100%; /* Creates oval profile shape */
    position: relative;
    box-shadow: inset 0 0 4px rgba(0,0,0,0.4);
    animation: rugbyRotate 0.75s linear infinite;
    flex-shrink: 0;
}
.rugby-spinner::before {
    content: ''; position: absolute;
    top: 0; left: 9px; width: 2px; height: 32px;
    background: rgba(255, 255, 255, 0.7);
}
.rugby-spinner::after {
    content: '-----'; font-size: 8px; color: rgba(255, 255, 255, 0.9);
    position: absolute; top: 10px; left: 3px; font-weight: 900;
    letter-spacing: -1px; transform: rotate(90deg);
}
@keyframes rugbyRotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* ROSTER SECTIONS - FIXES SCROLL DISAPPEARING CONFLICT */
.roster-scroll-box { 
    flex: 1; overflow-y: auto !important; padding-right: 4px;
    transition: opacity 0.2s ease;
}
.roster-group { margin-bottom: 12px; }
.group-header {
    background: var(--rwc-emerald); padding: 5px 10px; font-size: 0.75rem;
    font-weight: 800; border-radius: 3px; color: white; text-transform: uppercase; letter-spacing: 0.5px;
}

.player-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 12px; background: #0c1726; margin-top: 3px; border-radius: 3px;
    cursor: pointer; border: 1px solid transparent;
}
.player-row:hover { background: #122238; border-color: rgba(255,255,255,0.1); }
.player-row.selected { border-color: var(--rwc-gold); background: rgba(212, 175, 55, 0.12); }
.player-row.claimed-lockout { opacity: 0.2; pointer-events: none; text-decoration: line-through; }
.player-name { font-size: 0.9rem; font-weight: 600; }
.player-rating { font-size: 1rem; font-weight: 700; color: var(--rwc-gold); }

/* Lockout adjustments use safe opacity pointer mechanics without hiding scrollbars */
.roster-scroll-box.locked { opacity: 0.35; }
.roster-scroll-box.locked .player-row { pointer-events: none; }

.sim-results-box {
    background: #040810; border: 1px solid rgba(255,255,255,0.15); border-radius: 4px;
    padding: 12px; height: 260px; overflow-y: auto; font-family: monospace;
    font-size: 0.85rem; color: #e2e8f0; margin: 15px 0; line-height: 1.45;
}

/* RIGHT PITCH FIXED WINDOW & SCROLL CONTAINER */
.pitch-panel {
    flex: 1; height: 100%; 
    background: #050c14; padding: 15px; box-sizing: border-box;
    overflow-y: auto;
}
.pitch-scroll-wrapper {
    min-height: 840px;
    width: 100%; display: flex; align-items: center; justify-content: center;
}
.rugby-pitch {
    position: relative; width: 100%; max-width: 580px; height: 820px;
    background-color: var(--pitch-turf); border: 4px solid #ffffff; border-radius: 4px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.6);
}

.pitch-line { position: absolute; left: 0; width: 100%; border-top: 2px dashed var(--white-lines); }
.pitch-line.try-line { border-top-style: solid; border-top-color: #ffffff; border-top-width: 3px; }
.pitch-line.top { top: 12%; }
.pitch-line.twenty-two.top { top: 25%; }
.pitch-line.ten-meter.top { top: 38%; }
.pitch-line.half-way { top: 50%; border-top-style: solid; border-top-color: #ffffff; border-top-width: 3px; }
.pitch-line.ten-meter.bottom { top: 62%; }
.pitch-line.twenty-two.bottom { top: 75%; }
.pitch-line.try-line.bottom { top: 88%; }

/* HUGE & READABLE PITCH CIRCLES */
.grid-layer { position: absolute; top:0; left:0; width:100%; height:100%; }
.pitch-circle {
    position: absolute; width: 85px; height: 85px; border-radius: 50%;
    background: rgba(11, 26, 48, 0.95); border: 3px solid white;
    transform: translate(-50%, -50%); display: flex; flex-direction: column;
    align-items: center; justify-content: center; cursor: pointer; z-index: 10;
    box-shadow: 0 6px 12px rgba(0,0,0,0.4); transition: transform 0.2s, border-color 0.2s;
    box-sizing: border-box; padding: 4px;
}
.pitch-circle:hover { border-color: var(--rwc-gold); transform: translate(-50%, -50%) scale(1.08); }
.pitch-circle.highlight-eligible { border-color: #38bdf8; box-shadow: 0 0 15px #38bdf8; }
.pitch-circle.occupied { background: var(--rwc-navy); border-color: var(--rwc-gold); }

.circle-num { font-size: 1.3rem; font-weight: 900; color: white; line-height: 1.1; }
.circle-name { font-size: 0.65rem; font-weight: 700; text-align: center; color: #cbd5e1; margin-top: 2px; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.pitch-circle.occupied .circle-num { color: var(--rwc-gold); font-size: 1.15rem; }
.pitch-circle.occupied .circle-name { color: white; font-weight: 800; font-size: 0.62rem; }

.penalty-tag { font-size: 0.55rem; background: #dc2626; color: white; border-radius: 2px; padding: 1px 4px; margin-top: 2px; font-weight: 900; letter-spacing: 0.3px; }

.hidden { display: none !important; }
