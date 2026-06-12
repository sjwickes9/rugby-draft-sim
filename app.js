// ============================================================
// RUGBY HYBRID XV DRAFT — APP LOGIC
// ============================================================

const OUT_OF_POSITION_PENALTY = 10;

// Pitch node label -> position family
const pitchNodeFamily = {
    "Loosehead Prop":   "Props",
    "Hooker":           "Hookers",
    "Tighthead Prop":   "Props",
    "Lock 4":           "Locks",
    "Lock 5":           "Locks",
    "Blindside Flanker":"Back Row",
    "Openside Flanker": "Back Row",
    "Number 8":         "Back Row",
    "Scrum-half":       "Scrum Halves",
    "Fly-half":         "Fly Halves",
    "Left Wing":        "Back Three",
    "Inside Centre":    "Centres",
    "Outside Centre":   "Centres",
    "Right Wing":       "Back Three",
    "Fullback":         "Back Three"
};

// Exact position name -> family (for looking up player recognised positions)
const posFamily = {
    "Loosehead Prop":   "Props",
    "Tighthead Prop":   "Props",
    "Hooker":           "Hookers",
    "Lock":             "Locks",
    "Blindside Flanker":"Back Row",
    "Openside Flanker": "Back Row",
    "Number 8":         "Back Row",
    "Scrum-half":       "Scrum Halves",
    "Fly-half":         "Fly Halves",
    "Inside Centre":    "Centres",
    "Outside Centre":   "Centres",
    "Left Wing":        "Back Three",
    "Right Wing":       "Back Three",
    "Fullback":         "Back Three"
};

// Pitch nodes that count as "forwards" vs "backs" for average display
const forwardNodes = ["Loosehead Prop","Hooker","Tighthead Prop","Lock 4","Lock 5","Blindside Flanker","Openside Flanker","Number 8"];
const backNodes    = ["Scrum-half","Fly-half","Inside Centre","Outside Centre","Left Wing","Right Wing","Fullback"];

// Given a player and a pitch node position label, is placement in-position?
function isInPosition(player, nodePos) {
    const targetFamily = pitchNodeFamily[nodePos];
    return player.positions.some(p => posFamily[p] === targetFamily);
}

// Get the display group for a player's PRIMARY position
function primaryGroup(player) {
    return posFamily[player.positions[0]] || "Back Three";
}

// Shorten full position names to display labels in squad list
function shortenPos(pos) {
    const map = {
        "Loosehead Prop":   "Prop",
        "Tighthead Prop":   "Prop",
        "Hooker":           "Hooker",
        "Lock":             "Lock",
        "Blindside Flanker":"Flanker",
        "Openside Flanker": "Flanker",
        "Number 8":         "Number 8",
        "Scrum-half":       "Scrum-half",
        "Fly-half":         "Fly-half",
        "Inside Centre":    "Centre",
        "Outside Centre":   "Centre",
        "Left Wing":        "Wing",
        "Right Wing":       "Wing",
        "Fullback":         "Fullback",
    };
    return map[pos] || pos;
}


// All families a player is recognised in (no penalty)
function recognisedFamilies(player) {
    return [...new Set(player.positions.map(p => posFamily[p]).filter(Boolean))];
}

// ── Runtime state ──────────────────────────────────────────
let userTeam           = {};       // nodePos -> { name, score, nation, outOfPosition }
let currentSpunSquad   = [];
let selectedPlayer     = null;
let respinsLeft        = 0;
let isKnowledgeMode    = false;
let isCareerMode       = false;
let spotsFilledCount   = 0;
let playerSelectedFromCurrentPool = false;
let globalDraftedNames = new Set();
let replacedTeam       = "";

// ── DOM refs ───────────────────────────────────────────────
const setupCard       = document.getElementById("setup-card");
const draftDashboard  = document.getElementById("draft-dashboard");
const simDashboard    = document.getElementById("sim-dashboard");
const spinBtn         = document.getElementById("spin-btn");
const respinBtn       = document.getElementById("respin-btn");
const respinCountText = document.getElementById("respin-count");
const rosterContainer = document.getElementById("roster-container");
const statusText      = document.getElementById("status-text");
const flagIndicator   = document.getElementById("flag-indicator");
const pitchCircles    = document.querySelectorAll(".pitch-circle");
const runSimBtn       = document.getElementById("run-sim-btn");
const simResults      = document.getElementById("sim-results");
const restartBtn      = document.getElementById("restart-btn");
const manifestTeamBox = document.getElementById("manifest-team-box");

// ============================================================
// SETUP SCREEN
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    const teamSelect = document.getElementById("team-select");
    if (teamSelect) {
        Object.keys(allSquads).sort().forEach(t => {
            const opt = document.createElement("option");
            opt.value = t; opt.textContent = t;
            teamSelect.appendChild(opt);
        });
        // 🏴󠁧󠁢󠁷󠁬󠁳󠁿 Hidden dev mode — appears at bottom of list
        const devOpt = document.createElement("option");
        devOpt.value = "Cymru"; devOpt.textContent = "🏴󠁧󠁢󠁷󠁬󠁳󠁿 Cymru (Dev Mode)";
        teamSelect.appendChild(devOpt);
        teamSelect.value = "England";
    }

    document.getElementById("start-game-btn").addEventListener("click", e => {
        e.preventDefault();
        const diff = document.querySelector('input[name="difficulty"]:checked');
        const setting = diff ? diff.value : "normal";
        respinsLeft = setting === "easy" ? 3 : setting === "normal" ? 1 : 0;
        if (respinCountText) respinCountText.textContent = respinsLeft;
        replacedTeam = teamSelect ? teamSelect.value : "England";

        if (replacedTeam === "Cymru") {
            // Dev mode: skip straight to boss stage with a 99-rated squad
            activateCymruMode();
            return;
        }

        setupCard.classList.add("hidden");
        draftDashboard.classList.remove("hidden");
        recalculateDashboardAverages();
    });
});

function activateCymruMode() {
    // Fill userTeam with 99-rated Welsh legends
    const cymruSquad = [
        { pos:"Loosehead Prop",    name:"Gethin Jenkins",    nation:"WAL '11" },
        { pos:"Hooker",            name:"Ken Owens",          nation:"WAL '19" },
        { pos:"Tighthead Prop",    name:"Adam Jones",         nation:"WAL '11" },
        { pos:"Lock 4",            name:"Alun Wyn Jones",     nation:"WAL '19" },
        { pos:"Lock 5",            name:"Paul O'Connell",     nation:"IRE '11" },
        { pos:"Blindside Flanker", name:"Sam Warburton",      nation:"WAL '11" },
        { pos:"Openside Flanker",  name:"Justin Tipuric",     nation:"WAL '19" },
        { pos:"Number 8",          name:"Taulupe Faletau",    nation:"WAL '19" },
        { pos:"Scrum-half",        name:"Gareth Edwards",     nation:"Lions"   },
        { pos:"Fly-half",          name:"Barry John",         nation:"Lions"   },
        { pos:"Left Wing",         name:"Shane Williams",     nation:"WAL '07" },
        { pos:"Inside Centre",     name:"Brian O'Driscoll",   nation:"IRE '11" },
        { pos:"Outside Centre",    name:"Scott Gibbs",        nation:"WAL '99" },
        { pos:"Right Wing",        name:"Gerald Davies",      nation:"WAL '71" },
        { pos:"Fullback",          name:"JPR Williams",       nation:"WAL '71" },
    ];
    cymruSquad.forEach(p => {
        userTeam[p.pos] = { name: p.name, score: 99, nation: p.nation, outOfPosition: false };
    });
    replacedTeam = "Wales";  // replaces Wales in the bracket

    // Skip straight to simulation screen and boss stage
    setupCard.classList.add("hidden");
    draftDashboard.classList.add("hidden");
    simDashboard.classList.remove("hidden");

    // Run a fake world cup win then launch boss
    (async () => {
        await addLog("🏴󠁧󠁢󠁷󠁬󠁳󠁿 CYMRU DEV MODE ACTIVATED", "var(--brand-gold)");
        await addLog("Skipping to boss stage with a 99-rated side...", "var(--text-muted)");
        await addLog("", null);
        await addLog("=== POOL C — RESULTS ===", "var(--brand-gold)");
        await addLog("WIN  vs Fiji        45-0", "#4ade80");
        await addLog("WIN  vs Australia   38-7", "#4ade80");
        await addLog("WIN  vs Georgia     52-3", "#4ade80");
        await addLog("WIN  vs Portugal    61-0", "#4ade80");
        await addLog("QUALIFIED — 1st in Pool C", "#4ade80");
        await addLog("", null);
        await addLog("=== QUARTER-FINAL ===", "var(--brand-gold)");
        await addLog("WIN  vs Argentina   33-18", "#4ade80");
        await addLog("", null);
        await addLog("=== SEMI-FINAL ===", "var(--brand-gold)");
        await addLog("WIN  vs Ireland     27-24", "#4ade80");
        await addLog("", null);
        await addLog("=== FINAL ===", "var(--brand-gold)");
        await addLog("WIN  vs South Africa  21-18", "#4ade80");
        await addLog("", null);
        await addLog("WORLD CHAMPIONS! Your Hybrid XV wins the 2023 Rugby World Cup!", "var(--brand-gold)");
        await addLog("", null);
        await addLog("But the challenge doesn't end here...", "var(--text-muted)");
        await addLog("Three legendary teams await. Do you dare face them?", "var(--text-muted)");
        await addLog("", null);

        const bossBtn = document.createElement("button");
        bossBtn.textContent = "Accept the Ultimate Challenge";
        bossBtn.className = "btn-primary btn-full";
        bossBtn.style.cssText = "margin:12px 0;display:block;width:100%;";
        document.getElementById("sim-results").appendChild(bossBtn);
        document.getElementById("sim-results").scrollTop = document.getElementById("sim-results").scrollHeight;

        bossBtn.addEventListener("click", async () => {
            bossBtn.remove();
            await runBossStage();
        }, { once: true });

        restartBtn.classList.remove("hidden");
    })();
}

// ============================================================
// SLIDERS
// ============================================================
const variantHint = document.getElementById("variant-hint");
setupSlider("variant-slider-track", "variant-handle", idx => {
    isCareerMode = idx === 1;
    if (variantHint) variantHint.textContent = isCareerMode
        ? "Players are rated at their personal career best, regardless of tournament year."
        : "Players are rated as they were at the 2023 World Cup.";
    if (currentSpunSquad.length > 0) renderRosterList();
});
setupSlider("rating-slider-track", "rating-handle", idx => {
    isKnowledgeMode = idx === 1;
    if (currentSpunSquad.length > 0) renderRosterList();
});

function setupSlider(trackId, handleId, onChange) {
    const track = document.getElementById(trackId);
    if (!track) return;
    const opts = track.querySelectorAll(".slider-opt");
    let active = 0;
    track.addEventListener("click", () => {
        active = active === 0 ? 1 : 0;
        track.classList.toggle("right-state", active === 1);
        opts[0].classList.toggle("active", active === 0);
        opts[1].classList.toggle("active", active === 1);
        onChange(active);
    });
}

// ============================================================
// SPIN / RESPIN
// ============================================================
if (spinBtn) {
    spinBtn.addEventListener("click", () => {
        if (currentSpunSquad.length > 0 && !playerSelectedFromCurrentPool) {
            statusText.textContent = "You must select a player from this squad before spinning again.";
            return;
        }
        lockCurrentNodes();
        triggerRosterSpinEngine();
    });
}
if (respinBtn) {
    respinBtn.addEventListener("click", () => {
        if (respinsLeft <= 0) return;
        respinsLeft--;
        respinCountText.textContent = respinsLeft;
        if (respinsLeft <= 0) { respinBtn.classList.add("disabled"); respinBtn.disabled = true; }
        lockCurrentNodes();
        triggerRosterSpinEngine();
    });
}

function lockCurrentNodes() {
    pitchCircles.forEach(c => { if (c.classList.contains("occupied")) c.dataset.locked = "true"; });
}

// ============================================================
// ROSTER SPIN ENGINE
// ============================================================
function triggerRosterSpinEngine() {
    selectedPlayer = null;
    playerSelectedFromCurrentPool = false;
    spinBtn.classList.add("disabled"); spinBtn.disabled = true;
    respinBtn.classList.add("disabled"); respinBtn.disabled = true;
    rosterContainer.innerHTML = "";
    statusText.textContent = "";
    if (flagIndicator) flagIndicator.innerHTML = "";

    if (typeof allSquads === "undefined") {
        statusText.textContent = "Error: data.js failed to load.";
        spinBtn.classList.remove("disabled"); spinBtn.disabled = false;
        return;
    }

    const allNations = Object.keys(allSquads).filter(n => n !== replacedTeam);

    // Weighted draw — tier 1 nations appear ~3x more often than tier 3
    const weights = {
        "New Zealand":3,"South Africa":3,"Australia":3,"England":3,"France":3,
        "Ireland":3,"Wales":3,"Scotland":3,"Argentina":3,
        "Fiji":2,"Samoa":2,"Japan":2,"Italy":2,"Tonga":2,"Georgia":2,
        "Romania":1,"Canada":1,"USA":1,"Namibia":1,"Portugal":1,
        "Russia":1,"Uruguay":1,"Chile":1,"Spain":1,"Zimbabwe":1,"Ivory Coast":1,
    };
    const pool = [];
    allNations.forEach(n => {
        const w = weights[n] || 1;
        for (let i = 0; i < w; i++) pool.push(n);
    });
    const nation = pool[Math.floor(Math.random() * pool.length)];
    const years = Object.keys(allSquads[nation]);
    // Weight recent years more heavily — older tournaments have lower ratings overall
    const yearWeights = { "1987":1,"1991":1,"1995":2,"1999":2,"2003":3,"2007":3,"2011":4,"2015":4,"2019":5,"2023":5 };
    const yearPool = [];
    years.forEach(y => {
        const w = yearWeights[y] || 2;
        for (let i = 0; i < w; i++) yearPool.push(y);
    });
    const year = yearPool[Math.floor(Math.random() * yearPool.length)];
    const squad = allSquads[nation][year];

    if (flagIndicator && typeof getFlagEmbed === "function") {
        flagIndicator.innerHTML = getFlagEmbed(nation);
    }
    statusText.textContent = nation.toUpperCase() + " — " + year + " World Cup squad. Choose ONE player.";

    currentSpunSquad = squad.map(p => ({
        name:      p.name,
        positions: p.positions,
        group:     primaryGroup(p),
        num:       p.num,
        rating:    isCareerMode ? p.careerRating : p.rating,
        nation:    nation + " '" + year.slice(2)
    }));

    renderRosterList();
    spinBtn.classList.remove("disabled"); spinBtn.disabled = false;
    if (respinsLeft > 0) { respinBtn.classList.remove("disabled"); respinBtn.disabled = false; }
}

// ============================================================
// RENDER ROSTER LIST
// ============================================================

// Check if ALL pitch nodes for a given family are occupied
function isFamilyFull(family) {
    return Array.from(pitchCircles)
        .filter(c => pitchNodeFamily[c.dataset.pos] === family)
        .every(c => c.classList.contains("occupied"));
}

function renderRosterList() {
    rosterContainer.innerHTML = "";

    const groups = {};
    currentSpunSquad.forEach(p => {
        if (!groups[p.group]) groups[p.group] = [];
        groups[p.group].push(p);
    });

    const groupOrder = ["Props","Hookers","Locks","Back Row","Scrum Halves","Fly Halves","Centres","Back Three"];
    groupOrder.forEach(g => {
        if (!groups[g] || !groups[g].length) return;
        const block = document.createElement("div"); block.className = "roster-group";
        const head = document.createElement("div"); head.className = "group-header"; head.textContent = g;
        block.appendChild(head);
        rosterContainer.appendChild(block);

        groups[g].sort((a,b) => a.num - b.num).forEach(player => {
            const row = document.createElement("div"); row.className = "player-row";

            const drafted  = globalDraftedNames.has(player.name);
            const allFamilies = recognisedFamilies(player);
            // A player is selectable if at least one of their recognised families has a free node
            const anySlotOpen = allFamilies.some(f => !isFamilyFull(f));
            const locked = playerSelectedFromCurrentPool;

            if (drafted || !anySlotOpen || locked) {
                row.classList.add("claimed-lockout");
            }

            const nameSpan = document.createElement("span"); nameSpan.className = "player-name";      nameSpan.textContent = player.name;
            const posSpan  = document.createElement("span"); posSpan.className  = "player-pos-label"; posSpan.textContent = shortenPos(player.positions[0]);
            const rtgSpan  = document.createElement("span"); rtgSpan.className  = "player-rating";    rtgSpan.textContent = isKnowledgeMode ? "" : player.rating;

            row.appendChild(nameSpan); row.appendChild(posSpan); row.appendChild(rtgSpan);
            block.appendChild(row);

            if (!drafted && anySlotOpen && !locked) {
                row.addEventListener("click", () => {
                    if (selectedPlayer && selectedPlayer.name === player.name) {
                        row.classList.remove("selected");
                        selectedPlayer = null;
                        clearPitchHighlights();
                    } else {
                        document.querySelectorAll(".player-row").forEach(r => r.classList.remove("selected"));
                        row.classList.add("selected");
                        selectedPlayer = player;
                        highlightEligibleNodes(player);
                    }
                });
            }
        });
    });
}

// ============================================================
// PITCH HIGHLIGHTING — gold (in-position) or amber (out-of-position)
// ============================================================
function clearPitchHighlights() {
    pitchCircles.forEach(c => {
        c.classList.remove("highlight-eligible", "highlight-outofpos");
        c.removeAttribute("title");
    });
}

function highlightEligibleNodes(player) {
    clearPitchHighlights();
    const recognised = recognisedFamilies(player);
    pitchCircles.forEach(circle => {
        if (circle.classList.contains("occupied")) return;
        const nodeFamily = pitchNodeFamily[circle.dataset.pos];
        if (recognised.includes(nodeFamily)) {
            // In-position — gold highlight
            circle.classList.add("highlight-eligible");
        } else {
            // Out of position — amber highlight, with tooltip
            circle.classList.add("highlight-outofpos");
            circle.title = player.name + " is not recognised at " + circle.dataset.pos + ". -" + OUT_OF_POSITION_PENALTY + " rating penalty applies.";
        }
    });
}

// ============================================================
// PITCH CIRCLE CLICK — PLACE OR UNPLACE PLAYER
// ============================================================
pitchCircles.forEach(node => {
    node.addEventListener("click", () => {
        const nodePos = node.dataset.pos;

        // Clicking an occupied node — remove player if not locked
        if (node.classList.contains("occupied")) {
            if (!node.dataset.locked) {
                const name = node.dataset.occupant;
                delete userTeam[nodePos];
                globalDraftedNames.delete(name);
                spotsFilledCount--;
                playerSelectedFromCurrentPool = false;
                node.classList.remove("occupied");
                delete node.dataset.occupant;
                node.innerHTML = "";
                node.removeAttribute("title");
                recalculateDashboardAverages();
                renderRosterList();
            }
            return;
        }

        // Must have a player selected, and the node must be eligible (either in or out of position)
        if (!selectedPlayer) return;
        const nodeFamily = pitchNodeFamily[nodePos];
        const recognised = recognisedFamilies(selectedPlayer);
        const eligible = recognised.includes(nodeFamily) || true; // out-of-pos nodes are still clickable
        // But we only allow it if the node was highlighted (either colour)
        if (!node.classList.contains("highlight-eligible") && !node.classList.contains("highlight-outofpos")) return;

        const inPos = recognised.includes(nodeFamily);
        const baseRating = selectedPlayer.rating;
        const finalRating = inPos ? baseRating : Math.max(0, baseRating - OUT_OF_POSITION_PENALTY);

        userTeam[nodePos] = {
            name: selectedPlayer.name,
            score: finalRating,
            nation: selectedPlayer.nation,
            outOfPosition: !inPos,
            originalRating: baseRating
        };
        globalDraftedNames.add(selectedPlayer.name);
        spotsFilledCount++;
        playerSelectedFromCurrentPool = true;

        node.classList.add("occupied");
        node.dataset.occupant = selectedPlayer.name;

        if (!inPos) {
            node.classList.add("occupied-oop");
            node.title = selectedPlayer.name + " is out of position here. Rating reduced from " + baseRating + " to " + finalRating + ".";
            node.innerHTML = `<div class="circle-num oop-num">${finalRating}<span class="oop-icon">⚠</span></div><div class="circle-name">${selectedPlayer.name}</div>`;
        } else {
            node.innerHTML = `<div class="circle-num">${finalRating}</div><div class="circle-name">${selectedPlayer.name}</div>`;
        }

        selectedPlayer = null;
        clearPitchHighlights();
        recalculateDashboardAverages();
        renderRosterList();

        if (spotsFilledCount === 15) {
            lockCurrentNodes();
            setTimeout(() => {
                draftDashboard.classList.add("hidden");
                simDashboard.classList.remove("hidden");
                populateManifestPreviewWindow();
            }, 800);
        }
    });
});

// ============================================================
// DASHBOARD AVERAGES
// ============================================================
function recalculateDashboardAverages() {
    let tS=0,fS=0,bS=0,tC=0,fC=0,bC=0;
    for (let pos in userTeam) {
        const v = userTeam[pos].score; tS+=v; tC++;
        if (forwardNodes.includes(pos)) { fS+=v; fC++; }
        if (backNodes.includes(pos))    { bS+=v; bC++; }
    }
    document.getElementById("avg-global-ovr").textContent  = tC>0 ? Math.round(tS/tC)  : "--";
    document.getElementById("avg-forward-ovr").textContent = fC>0 ? Math.round(fS/fC)  : "--";
    document.getElementById("avg-back-ovr").textContent    = bC>0 ? Math.round(bS/bC)  : "--";
}

// ============================================================
// MANIFEST (SCREEN 3 SQUAD SUMMARY)
// ============================================================
function populateManifestPreviewWindow() {
    if (!manifestTeamBox) return;
    const order = ["Loosehead Prop","Hooker","Tighthead Prop","Lock 4","Lock 5",
                   "Blindside Flanker","Openside Flanker","Number 8",
                   "Scrum-half","Fly-half",
                   "Left Wing","Inside Centre","Outside Centre","Right Wing","Fullback"];
    const posShort = {
        "Loosehead Prop":"Prop", "Tighthead Prop":"Prop", "Hooker":"Hooker",
        "Lock 4":"Lock", "Lock 5":"Lock",
        "Blindside Flanker":"Flanker", "Openside Flanker":"Flanker", "Number 8":"No. 8",
        "Scrum-half":"Scrum-half", "Fly-half":"Fly-half",
        "Inside Centre":"Centre", "Outside Centre":"Centre",
        "Left Wing":"Wing", "Right Wing":"Wing", "Fullback":"Fullback"
    };
    let html = `<div class="manifest-header">Your Hybrid XV — replacing ${replacedTeam}</div>`;
    order.forEach((pos, i) => {
        const p = userTeam[pos];
        if (!p) return;
        const oopBadge = p.outOfPosition
            ? `<span class="manifest-oop" title="Out of position: ${p.originalRating} reduced to ${p.score}">⚠ OOP</span>`
            : "";
        html += `<div class="manifest-row">
            <span class="manifest-num">${i+1}</span>
            <span class="manifest-pos">${posShort[pos] || pos}</span>
            <span class="manifest-name">${p.name} <span class="manifest-nation">(${p.nation})</span>${oopBadge}</span>
            <span class="player-rating${p.outOfPosition ? ' oop-rating' : ''}">${p.score}</span>
        </div>`;
    });
    manifestTeamBox.innerHTML = html;
}

// ============================================================
// SIMULATION ENGINE
// ============================================================
if (runSimBtn) {
    runSimBtn.addEventListener("click", () => {
        runSimBtn.disabled = true; runSimBtn.classList.add("disabled");
        simResults.innerHTML = "";
        runTournamentSimulation();
    });
}

function getUserRating() {
    let s=0, c=0;
    for (let p in userTeam) { s+=userTeam[p].score; c++; }
    return c>0 ? Math.round(s/c) : 80;
}

// Analytical win probability derived from the simulateMatch distribution
function winProbability(userR, oppR) {
    const diff = userR - oppR;
    const prob = Math.round(100 / (1 + Math.exp(-diff * 0.13)));
    return Math.min(95, Math.max(5, prob));
}

function oddsText(prob) {
    if (prob >= 90) return "Your team are overwhelming favourites.";
    if (prob >= 78) return "Your team are strong favourites.";
    if (prob >= 65) return "Your team are slight favourites.";
    if (prob >= 47) return "This is too close to call.";
    if (prob >= 35) return "Your team are slight underdogs.";
    if (prob >= 22) return "Your team are significant underdogs.";
    return "Your team are heavy underdogs — an upset would be historic.";
}

function simulateMatch(userR, oppR) {
    const diff = userR - oppR;
    // Variance ±10 makes upsets genuinely possible — rugby is unpredictable
    const v = () => Math.floor(Math.random()*21)-10;
    // Multiplier 0.35 dampens the rating gap so a 10-pt deficit isn't a death sentence
    let uS = Math.max(3, Math.round(22 + diff*0.35 + v()));
    let oS = Math.max(3, Math.round(22 - diff*0.35 + v()));
    if (uS === oS) uS += 3;
    const won = uS > oS;
    const margin = Math.abs(uS-oS);
    // bonus point: 4+ tries approximated as margin > 21; losing bonus: margin <=7
    const pts = won ? (margin>21 ? 5 : 4) : (margin<=7 ? 1 : 0);
    return { userScore:uS, oppScore:oS, won, margin, pts };
}

function delay(ms) { return new Promise(r => setTimeout(r,ms)); }

async function addLog(msg, colour) {
    const line = document.createElement("div");
    line.className = "sim-log-line";
    if (colour) line.style.color = colour;
    line.textContent = msg;
    simResults.appendChild(line);
    simResults.scrollTop = simResults.scrollHeight;
    await delay(900);
}

async function runTournamentSimulation() {
    const userR = getUserRating();
    const pool = getPoolFor(replacedTeam);
    const poolTeams = rwc2023PoolStandings[pool].filter(t => t !== replacedTeam);

    await addLog("=== POOL STAGE — Pool " + pool + " ===", "var(--brand-gold)");
    await addLog("Your Hybrid XV (avg: " + userR + ") replaces " + replacedTeam, null);
    await addLog("", null);

    // ── Run user's pool matches ──
    let userPoolPts = 0;
    for (const opp of poolTeams) {
        const res = simulateMatch(userR, teamStrengths[opp] || 72);
        userPoolPts += res.pts;
        const icon = res.won ? "WIN " : "LOSS";
        const colour = res.won ? "#4ade80" : "#f87171";
        await addLog(icon + "  vs " + opp + "  " + res.userScore + "-" + res.oppScore + "  (" + (res.pts>0?"+":"") + res.pts + " pts)", colour);
    }

    // ── Simulate other pool matches ──
    const otherPtsClean = {};
    poolTeams.forEach(t => { otherPtsClean[t] = 0; });
    for (let i = 0; i < poolTeams.length; i++) {
        for (let j = i+1; j < poolTeams.length; j++) {
            const t1 = poolTeams[i], t2 = poolTeams[j];
            const res = simulateMatch(teamStrengths[t1]||72, teamStrengths[t2]||72);
            otherPtsClean[t1] += res.won ? (res.margin>21?5:4) : (res.margin<=7?1:0);
            otherPtsClean[t2] += res.won ? (res.margin<=7?1:0) : (res.margin>21?5:4);
        }
    }

    // ── Pool standings ──
    await addLog("", null);
    await addLog("--- Pool " + pool + " Standings ---", "var(--brand-gold)");
    const table = [["Your XV", userPoolPts]];
    poolTeams.forEach(t => table.push([t, otherPtsClean[t]]));
    table.sort((a,b) => b[1]-a[1]);
    for (let i = 0; i < table.length; i++) {
        const isUser = table[i][0] === "Your XV";
        const marker = ["1st","2nd","3rd","4th","5th"][i] || (i+1)+"th";
        await addLog(marker + "  " + table[i][0] + "  —  " + table[i][1] + " pts", isUser ? "#f3f4f6" : "var(--text-muted)");
    }

    const rank = table.findIndex(([t]) => t === "Your XV");
    if (rank > 1) {
        await addLog("", null);
        await addLog("ELIMINATED — Your Hybrid XV did not qualify from Pool " + pool + ".", "#ef4444");
        restartBtn.classList.remove("hidden"); return;
    }

    const qualified = rank === 0 ? "1st" : "2nd";
    await addLog("", null);
    await addLog("QUALIFIED — " + qualified + " in Pool " + pool, "#4ade80");

    // ── Simulate ALL pools to get real pool standings ──
    // Then build a bracket from the actual finishes
    const allStandings = simulateAllPools();
    // Overwrite user's pool with the real results from above
    const userPoolOrder = table.map(([t]) => t === "Your XV" ? replacedTeam : t);
    allStandings[pool] = userPoolOrder;

    // 2023 QF bracket: A1vD2, B1vC2, C1vB2, D1vA2
    // SF1: winner(A1vD2) v winner(B1vC2)
    // SF2: winner(C1vB2) v winner(D1vA2)
    const qfPairings = [
        { id:0, home: allStandings.A[0], away: allStandings.D[1], sf: "SF1" },
        { id:1, home: allStandings.B[0], away: allStandings.C[1], sf: "SF1" },
        { id:2, home: allStandings.C[0], away: allStandings.B[1], sf: "SF2" },
        { id:3, home: allStandings.D[0], away: allStandings.A[1], sf: "SF2" },
    ];

    // Find which QF the user is in
    const userQF = qfPairings.find(qf => qf.home === replacedTeam || qf.away === replacedTeam);
    const qfOpp = userQF.home === replacedTeam ? userQF.away : userQF.home;
    const userSF = userQF.sf;

    // Small knockout boost — crowd factor / tournament momentum for the user's team
    const koBoost = 3;
    const effectiveR = userR + koBoost;

    // ── Quarter-final ──
    await addLog("", null);
    await addLog("=== QUARTER-FINAL vs " + qfOpp + " ===", "var(--brand-gold)");
    const qfOppR = teamStrengths[qfOpp]||80;
    const qfProb = winProbability(effectiveR, qfOppR);
    await addLog(oddsText(qfProb) + " (" + qfProb + "% chance of winning)", "var(--text-muted)");
    const qf = simulateMatch(effectiveR, qfOppR);
    await addLog((qf.won?"WIN ":"LOSS") + "  " + qf.userScore + "-" + qf.oppScore, qf.won?"#4ade80":"#f87171");
    if (!qf.won) {
        await addLog("KNOCKED OUT at the quarter-final stage.", "#ef4444");
        restartBtn.classList.remove("hidden"); return;
    }

    // Simulate the other QF in the same semi bracket → SF opponent
    const otherQFSameSide = qfPairings.find(qf2 => qf2.sf === userSF && qf2.id !== userQF.id);
    const oqRes = simulateMatch(teamStrengths[otherQFSameSide.home]||80, teamStrengths[otherQFSameSide.away]||80);
    const sfOpp = oqRes.won ? otherQFSameSide.home : otherQFSameSide.away;

    // Simulate both QFs on the other side → final opponent and 3rd place opponent
    const otherSideQFs = qfPairings.filter(qf2 => qf2.sf !== userSF);
    const os0Res = simulateMatch(teamStrengths[otherSideQFs[0].home]||80, teamStrengths[otherSideQFs[0].away]||80);
    const os1Res = simulateMatch(teamStrengths[otherSideQFs[1].home]||80, teamStrengths[otherSideQFs[1].away]||80);
    const otherSF_A = os0Res.won ? otherSideQFs[0].home : otherSideQFs[0].away;
    const otherSF_B = os1Res.won ? otherSideQFs[1].home : otherSideQFs[1].away;
    const otherSFRes = simulateMatch(teamStrengths[otherSF_A]||86, teamStrengths[otherSF_B]||86);
    const finOpp  = otherSFRes.won ? otherSF_A : otherSF_B;
    const tpOpp   = otherSFRes.won ? otherSF_B : otherSF_A;

    // ── Semi-final ──
    await addLog("", null);
    await addLog("=== SEMI-FINAL vs " + sfOpp + " ===", "var(--brand-gold)");
    const sfOppR = teamStrengths[sfOpp]||86;
    const sfProb = winProbability(effectiveR, sfOppR);
    await addLog(oddsText(sfProb) + " (" + sfProb + "% chance of winning)", "var(--text-muted)");
    const sf = simulateMatch(effectiveR, sfOppR);
    await addLog((sf.won?"WIN ":"LOSS") + "  " + sf.userScore + "-" + sf.oppScore, sf.won?"#4ade80":"#f87171");

    if (!sf.won) {
        await addLog("", null);
        await addLog("=== THIRD-PLACE PLAY-OFF vs " + tpOpp + " ===", "var(--brand-gold)");
        const tpOppR = teamStrengths[tpOpp]||84;
        const tpProb = winProbability(effectiveR, tpOppR);
        await addLog(oddsText(tpProb) + " (" + tpProb + "% chance of winning)", "var(--text-muted)");
        const tp = simulateMatch(effectiveR, tpOppR);
        await addLog((tp.won?"WIN ":"LOSS") + "  " + tp.userScore + "-" + tp.oppScore, tp.won?"#4ade80":"#f87171");
        await addLog(tp.won ? "BRONZE — 3rd place at the 2023 Rugby World Cup!" : "4th place — agonisingly close.", tp.won?"#4ade80":"#c5a059");
        restartBtn.classList.remove("hidden"); return;
    }

    // ── Final ──
    await addLog("", null);
    await addLog("=== FINAL vs " + finOpp + " ===", "var(--brand-gold)");
    const finOppR = teamStrengths[finOpp]||90;
    const finProb = winProbability(effectiveR, finOppR);
    await addLog(oddsText(finProb) + " (" + finProb + "% chance of winning)", "var(--text-muted)");
    const fin = simulateMatch(effectiveR, finOppR);
    await addLog((fin.won?"WIN ":"LOSS") + "  " + fin.userScore + "-" + fin.oppScore, fin.won?"#4ade80":"#f87171");
    if (fin.won) {
        await addLog("WORLD CHAMPIONS! Your Hybrid XV wins the 2023 Rugby World Cup!", "var(--brand-gold)");
        await addLog("", null);
        await addLog("But the challenge doesn't end here...", "var(--text-muted)");
        await addLog("Three legendary teams await. Do you dare face them?", "var(--text-muted)");
        await addLog("", null);

        // Show boss challenge button — appended to sim-results (the terminal viewport)
        const bossBtn = document.createElement("button");
        bossBtn.textContent = "Accept the Ultimate Challenge";
        bossBtn.className = "btn-primary btn-full";
        bossBtn.style.cssText = "margin:12px 0;display:block;width:100%;";
        document.getElementById("sim-results").appendChild(bossBtn);
        document.getElementById("sim-results").scrollTop = document.getElementById("sim-results").scrollHeight;

        bossBtn.addEventListener("click", async () => {
            bossBtn.remove();
            await runBossStage();
        }, { once: true });

        // Also show play again
        restartBtn.classList.remove("hidden");
    } else {
        await addLog("Runners-up. A magnificent campaign — one step short of glory.", "#c5a059");
        restartBtn.classList.remove("hidden");
    }
}

// Simulate all four pool round-robins, return ordered standings {A:[1st,2nd,...], ...}
function simulateAllPools() {
    const standings = {};
    for (const [p, teams] of Object.entries(rwc2023PoolStandings)) {
        const pts = {};
        teams.forEach(t => { pts[t] = 0; });
        for (let i = 0; i < teams.length; i++) {
            for (let j = i+1; j < teams.length; j++) {
                const res = simulateMatch(teamStrengths[teams[i]]||65, teamStrengths[teams[j]]||65);
                pts[teams[i]] += res.won ? (res.margin>21?5:4) : (res.margin<=7?1:0);
                pts[teams[j]] += res.won ? (res.margin<=7?1:0) : (res.margin>21?5:4);
            }
        }
        standings[p] = [...teams].sort((a,b) => pts[b]-pts[a]);
    }
    return standings;
}

// ============================================================
// BRACKET HELPERS
// ============================================================
function getPoolFor(team) {
    for (const [k,v] of Object.entries(rwc2023PoolStandings)) { if (v.includes(team)) return k; }
    return "A";
}

// ============================================================
// MISC
// ============================================================
if (restartBtn) restartBtn.addEventListener("click", () => location.reload());
document.querySelectorAll(".abort-reset-btn").forEach(b => b.addEventListener("click", () => location.reload()));
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    document.getElementById("theme-toggle").textContent =
        document.body.classList.contains("light-theme") ? "Dark Mode" : "Light Mode";
});

// ============================================================
// BOSS STAGE — SANZAAR, LIONS, ALL TIME XV
// ============================================================

const BOSS_TEAMS = {

  // ── SANZAAR Barbarians ──────────────────────────────────────
  // Greatest specialist in each position from NZ, SA & Australia
  // Deliberately spread across all three nations
  sanzaar: {
    name: "SANZAAR Barbarians",
    flavour: "The greatest specialist in every position from New Zealand, South Africa and Australia — the most powerful rugby nations on earth.",
    players: [
      { pos:"Loosehead Prop",    name:"Os Du Randt",                 nation:"SA '99",   r:92 },
      { pos:"Hooker",            name:"Sean Fitzpatrick",             nation:"NZ '95",   r:97 },
      { pos:"Tighthead Prop",    name:"Carl Hayman",                  nation:"NZ '07",   r:94 },
      { pos:"Lock",              name:"Victor Matfield",              nation:"SA '07",   r:97 },
      { pos:"Lock",              name:"John Eales",                   nation:"AUS '99",  r:96 },
      { pos:"Blindside Flanker", name:"Michael Jones",                nation:"NZ '87",   r:95 },
      { pos:"Openside Flanker",  name:"Richie McCaw",                 nation:"NZ '11",   r:99 },
      { pos:"Number 8",          name:"Kieran Read",                  nation:"NZ '15",   r:96 },
      { pos:"Scrum-half",        name:"Joost van der Westhuizen",     nation:"SA '95",   r:96 },
      { pos:"Fly-half",          name:"Dan Carter",                   nation:"NZ '15",   r:99 },
      { pos:"Left Wing",         name:"Jonah Lomu",                   nation:"NZ '95",   r:97 },
      { pos:"Inside Centre",     name:"Tim Horan",                    nation:"AUS '99",  r:95 },
      { pos:"Outside Centre",    name:"Jean de Villiers",             nation:"SA '07",   r:92 },
      { pos:"Right Wing",        name:"Bryan Habana",                 nation:"SA '07",   r:97 },
      { pos:"Fullback",          name:"Christian Cullen",             nation:"NZ '99",   r:94 },
    ]
  },

  // ── British & Irish Lions All Time ──────────────────────────
  // Pre-RWC legends alongside the modern greats — a genuine all-time XV
  lions: {
    name: "British & Irish Lions All Time",
    flavour: "From the 1971 Invincibles to the modern era — the finest specialist in every position from England, Wales, Scotland and Ireland.",
    players: [
      { pos:"Loosehead Prop",    name:"Fran Cotton",                  nation:"ENG '74",  r:94 },
      { pos:"Hooker",            name:"Keith Wood",                   nation:"IRE '03",  r:93 },
      { pos:"Tighthead Prop",    name:"Graham Price",                 nation:"WAL '77",  r:93 },
      { pos:"Lock",              name:"Willie John McBride",           nation:"IRE '74",  r:97 },
      { pos:"Lock",              name:"Martin Johnson",                nation:"ENG '97",  r:97 },
      { pos:"Blindside Flanker", name:"Richard Hill",                 nation:"ENG '03",  r:94 },
      { pos:"Openside Flanker",  name:"Sam Warburton",                nation:"WAL '11",  r:93 },
      { pos:"Number 8",          name:"Mervyn Davies",                nation:"WAL '71",  r:95 },
      { pos:"Scrum-half",        name:"Gareth Edwards",               nation:"WAL '71",  r:99 },
      { pos:"Fly-half",          name:"Barry John",                   nation:"WAL '71",  r:97 },
      { pos:"Left Wing",         name:"Gerald Davies",                nation:"WAL '71",  r:95 },
      { pos:"Inside Centre",     name:"Mike Gibson",                  nation:"IRE '71",  r:94 },
      { pos:"Outside Centre",    name:"Brian O'Driscoll",             nation:"IRE '01",  r:96 },
      { pos:"Right Wing",        name:"Jason Robinson",               nation:"ENG '03",  r:93 },
      { pos:"Fullback",          name:"JPR Williams",                 nation:"WAL '71",  r:96 },
    ]
  },

  // ── All Time World XV ───────────────────────────────────────
  // The single greatest specialist at every position in rugby history
  // Spans pre-RWC greats through to the modern era
  alltimexv: {
    name: "All Time World XV",
    flavour: "The single greatest specialist at every position across all of rugby history. From Gareth Edwards to Dan Carter, from Colin Meads to Richie McCaw.",
    players: [
      { pos:"Loosehead Prop",    name:"Ian McLauchlan",               nation:"SCO '74",  r:94 },
      { pos:"Hooker",            name:"Sean Fitzpatrick",             nation:"NZ '95",   r:97 },
      { pos:"Tighthead Prop",    name:"Os Du Randt",                  nation:"SA '99",   r:93 },
      { pos:"Lock",              name:"Colin Meads",                  nation:"NZ '67",   r:98 },
      { pos:"Lock",              name:"Victor Matfield",              nation:"SA '07",   r:97 },
      { pos:"Blindside Flanker", name:"Willie John McBride",          nation:"IRE '74",  r:97 },
      { pos:"Openside Flanker",  name:"Richie McCaw",                 nation:"NZ '11",   r:99 },
      { pos:"Number 8",          name:"Mervyn Davies",                nation:"WAL '71",  r:95 },
      { pos:"Scrum-half",        name:"Gareth Edwards",               nation:"WAL '71",  r:99 },
      { pos:"Fly-half",          name:"Dan Carter",                   nation:"NZ '15",   r:99 },
      { pos:"Left Wing",         name:"Jonah Lomu",                   nation:"NZ '95",   r:97 },
      { pos:"Inside Centre",     name:"Tim Horan",                    nation:"AUS '99",  r:95 },
      { pos:"Outside Centre",    name:"Brian O'Driscoll",             nation:"IRE '11",  r:96 },
      { pos:"Right Wing",        name:"David Campese",                nation:"AUS '91",  r:96 },
      { pos:"Fullback",          name:"Serge Blanco",                 nation:"FRA '87",  r:97 },
    ]
  }
};

function getBossRating(team) {
    return Math.round(team.players.reduce((s,p) => s + p.r, 0) / team.players.length);
}

async function runBossStage() {
    const userR = getUserRating();
    const bossOrder = ["sanzaar","lions","alltimexv"];
    const bossLabels = {
        sanzaar:    "⚫ BONUS MATCH — SANZAAR BARBARIANS",
        lions:      "🔴 BONUS MATCH — BRITISH & IRISH LIONS ALL TIME",
        alltimexv:  "🏆 BONUS MATCH — ALL TIME WORLD XV"
    };

    for (const bossKey of bossOrder) {
        const boss = BOSS_TEAMS[bossKey];
        const bossR = getBossRating(boss);

        await addLog("", null);
        await addLog("─────────────────────────────────────", "var(--text-muted)");
        await addLog(bossLabels[bossKey], "var(--brand-gold)");
        await addLog(boss.flavour, "var(--text-muted)");
        await addLog("", null);

        // Show their lineup
        await addLog("Their XV:", "var(--brand-gold)");
        for (const p of boss.players) {
            const shortPos = {
                "Loosehead Prop":"Prop","Tighthead Prop":"Prop","Hooker":"Hooker",
                "Lock":"Lock","Blindside Flanker":"Flanker","Openside Flanker":"Flanker",
                "Number 8":"No.8","Scrum-half":"SH","Fly-half":"FH",
                "Inside Centre":"Centre","Outside Centre":"Centre",
                "Left Wing":"Wing","Right Wing":"Wing","Fullback":"FB"
            }[p.pos] || p.pos;
            await addLog(
                shortPos.padEnd(8) + "  " + p.name.padEnd(28) + "  " + p.nation + "  (" + p.r + ")",
                "var(--text-muted)"
            );
        }

        await addLog("", null);
        await addLog("Their average rating: " + bossR + "  |  Your rating: " + userR, null);
        await addLog("", null);
        const bossProb = winProbability(userR, bossR);
        await addLog(oddsText(bossProb) + " (" + bossProb + "% chance of winning)", "var(--text-muted)");
        await addLog("", null);
        await addLog("=== KICK OFF ===", "var(--brand-gold)");

        const res = simulateMatch(userR, bossR);
        await addLog(
            (res.won ? "WIN " : "LOSS") + "  " + res.userScore + "-" + res.oppScore,
            res.won ? "#4ade80" : "#f87171"
        );

        if (!res.won) {
            await addLog("", null);
            if (bossKey === "sanzaar") {
                await addLog("The SANZAAR Barbarians were too strong. A valiant effort against the best of the Southern Hemisphere.", "#c5a059");
            } else if (bossKey === "lions") {
                await addLog("The Lions held firm. You pushed the greatest British & Irish players in history to the limit.", "#c5a059");
            } else {
                await addLog("The All Time XV prevail. No team in history has beaten this side — and yours came closer than most.", "#c5a059");
            }
            restartBtn.classList.remove("hidden");
            return;
        }

        if (bossKey === "sanzaar") {
            await addLog("The SANZAAR Barbarians are beaten! Extraordinary. Now face the Lions...", "#4ade80");
        } else if (bossKey === "lions") {
            await addLog("The Lions fall! Your Hybrid XV has conquered British & Irish rugby royalty. One final challenge awaits...", "#4ade80");
        } else {
            await addLog("", null);
            await addLog("THE ALL TIME XV ARE BEATEN.", "var(--brand-gold)");
            await addLog("Your Hybrid XV has done the impossible. World Champions, and conquerors of the greatest teams ever assembled. Legendary.", "var(--brand-gold)");
            restartBtn.classList.remove("hidden");
            return;
        }
    }
}
