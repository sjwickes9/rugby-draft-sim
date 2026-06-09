// ============================================================
// RUGBY HYBRID XV DRAFT — APP LOGIC
// ============================================================

const positionFamilies = {
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

// Pitch node data-pos -> position family
const pitchNodePositions = {
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

const forwardPositions = ["Loosehead Prop","Hooker","Tighthead Prop","Lock 4","Lock 5","Blindside Flanker","Openside Flanker","Number 8"];
const backPositions    = ["Scrum-half","Fly-half","Inside Centre","Outside Centre","Left Wing","Right Wing","Fullback"];

let userTeam           = {};
let currentSpunSquad   = [];
let selectedPlayer     = null;
let respinsLeft        = 0;
let isKnowledgeMode    = false;
let isCareerMode       = false;
let spotsFilledCount   = 0;
let playerSelectedFromCurrentPool = false;
let globalDraftedNames = new Set();
let replacedTeam       = "";
let spinHasBeenLocked  = false;

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
        Object.keys(rwc2023Squads).sort().forEach(t => {
            const opt = document.createElement("option");
            opt.value = t; opt.textContent = t;
            teamSelect.appendChild(opt);
        });
        teamSelect.value = "England";
    }

    const startBtn = document.getElementById("start-game-btn");
    if (startBtn) {
        startBtn.addEventListener("click", e => {
            e.preventDefault();
            const diff = document.querySelector('input[name="difficulty"]:checked');
            const setting = diff ? diff.value : "normal";
            respinsLeft = setting === "easy" ? 3 : setting === "normal" ? 1 : 0;
            if (respinCountText) respinCountText.textContent = respinsLeft;
            replacedTeam = teamSelect ? teamSelect.value : "England";
            if (setupCard) setupCard.classList.add("hidden");
            if (draftDashboard) draftDashboard.classList.remove("hidden");
            recalculateDashboardAverages();
        });
    }
});

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

    if (typeof rwc2023Squads === "undefined") {
        statusText.textContent = "Error: data.js failed to load.";
        spinBtn.classList.remove("disabled"); spinBtn.disabled = false;
        return;
    }

    const allNations = Object.keys(rwc2023Squads).filter(n => n !== replacedTeam);
    const nation = allNations[Math.floor(Math.random() * allNations.length)];
    const squad = rwc2023Squads[nation];

    if (flagIndicator && typeof getFlagEmbed === "function") {
        flagIndicator.innerHTML = getFlagEmbed(nation);
    }
    statusText.textContent = nation.toUpperCase() + " — 2023 World Cup squad. Choose ONE player.";

    currentSpunSquad = squad.map(p => ({
        name:     p.name,
        pos:      positionFamilies[p.pos] || "Back Three",
        exactPos: p.pos,
        num:      p.num,
        rating:   isCareerMode ? p.careerRating : p.rating,
        nation:   nation
    }));

    renderRosterList();
    spinBtn.classList.remove("disabled"); spinBtn.disabled = false;
    if (respinsLeft > 0) { respinBtn.classList.remove("disabled"); respinBtn.disabled = false; }
}

// ============================================================
// RENDER ROSTER LIST
// ============================================================
function isNodeFamilyFull(family) {
    return Array.from(pitchCircles)
        .filter(c => pitchNodePositions[c.dataset.pos] === family)
        .every(c => c.classList.contains("occupied"));
}

function renderRosterList() {
    rosterContainer.innerHTML = "";
    const groups = {};
    currentSpunSquad.forEach(p => {
        if (!groups[p.pos]) groups[p.pos] = [];
        groups[p.pos].push(p);
    });

    const order = ["Props","Hookers","Locks","Back Row","Scrum Halves","Fly Halves","Centres","Back Three"];
    order.forEach(g => {
        if (!groups[g] || !groups[g].length) return;
        const block = document.createElement("div"); block.className = "roster-group";
        const head = document.createElement("div"); head.className = "group-header"; head.textContent = g;
        block.appendChild(head); rosterContainer.appendChild(block);

        groups[g].sort((a,b) => a.num - b.num).forEach(player => {
            const row = document.createElement("div"); row.className = "player-row";
            const drafted = globalDraftedNames.has(player.name);
            const posFull = isNodeFamilyFull(player.pos);
            const locked  = playerSelectedFromCurrentPool;
            if (drafted || posFull || locked) row.classList.add("claimed-lockout");

            const numSpan  = document.createElement("span"); numSpan.className = "player-num";   numSpan.textContent = player.num;
            const nameSpan = document.createElement("span"); nameSpan.className = "player-name";  nameSpan.textContent = player.name;
            const posSpan  = document.createElement("span"); posSpan.className = "player-pos-label"; posSpan.textContent = player.exactPos;
            const rtgSpan  = document.createElement("span"); rtgSpan.className = "player-rating"; rtgSpan.textContent = isKnowledgeMode ? "??" : player.rating;

            row.appendChild(numSpan); row.appendChild(nameSpan); row.appendChild(posSpan); row.appendChild(rtgSpan);
            block.appendChild(row);

            if (!drafted && !posFull && !locked) {
                row.addEventListener("click", () => {
                    if (selectedPlayer && selectedPlayer.name === player.name) {
                        row.classList.remove("selected");
                        selectedPlayer = null;
                        pitchCircles.forEach(c => c.classList.remove("highlight-eligible"));
                    } else {
                        document.querySelectorAll(".player-row").forEach(r => r.classList.remove("selected"));
                        row.classList.add("selected");
                        selectedPlayer = player;
                        evaluateEligibilityCircles(player);
                    }
                });
            }
        });
    });
}

function evaluateEligibilityCircles(player) {
    pitchCircles.forEach(c => {
        c.classList.remove("highlight-eligible");
        if (!c.classList.contains("occupied") && pitchNodePositions[c.dataset.pos] === player.pos) {
            c.classList.add("highlight-eligible");
        }
    });
}

// ============================================================
// PITCH CIRCLE — PLACE OR UNPLACE PLAYER
// ============================================================
pitchCircles.forEach(node => {
    node.addEventListener("click", () => {
        const nodePos = node.dataset.pos;

        if (node.classList.contains("occupied")) {
            if (!node.dataset.locked) {
                // Unplace the player
                const name = node.dataset.occupant;
                delete userTeam[nodePos];
                globalDraftedNames.delete(name);
                spotsFilledCount--;
                playerSelectedFromCurrentPool = false;
                node.classList.remove("occupied");
                delete node.dataset.occupant;
                node.innerHTML = "";
                recalculateDashboardAverages();
                renderRosterList();
            }
            return;
        }

        if (!selectedPlayer || pitchNodePositions[nodePos] !== selectedPlayer.pos) return;

        userTeam[nodePos] = { name: selectedPlayer.name, score: selectedPlayer.rating, nation: selectedPlayer.nation };
        globalDraftedNames.add(selectedPlayer.name);
        spotsFilledCount++;
        playerSelectedFromCurrentPool = true;

        node.classList.add("occupied");
        node.dataset.occupant = selectedPlayer.name;
        node.innerHTML = `<div class="circle-num">${selectedPlayer.rating}</div><div class="circle-name">${selectedPlayer.name}</div>`;

        selectedPlayer = null;
        pitchCircles.forEach(c => c.classList.remove("highlight-eligible"));
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
// AVERAGES
// ============================================================
function recalculateDashboardAverages() {
    let tS=0,fS=0,bS=0,tC=0,fC=0,bC=0;
    for (let pos in userTeam) {
        const v = userTeam[pos].score; tS+=v; tC++;
        if (forwardPositions.includes(pos)) { fS+=v; fC++; }
        if (backPositions.includes(pos))    { bS+=v; bC++; }
    }
    document.getElementById("avg-global-ovr").textContent  = tC>0 ? Math.round(tS/tC)  : "--";
    document.getElementById("avg-forward-ovr").textContent = fC>0 ? Math.round(fS/fC)  : "--";
    document.getElementById("avg-back-ovr").textContent    = bC>0 ? Math.round(bS/bC)  : "--";
}

// ============================================================
// MANIFEST
// ============================================================
function populateManifestPreviewWindow() {
    if (!manifestTeamBox) return;
    const order = ["Loosehead Prop","Hooker","Tighthead Prop","Lock 4","Lock 5","Blindside Flanker","Openside Flanker","Number 8","Scrum-half","Fly-half","Left Wing","Inside Centre","Outside Centre","Right Wing","Fullback"];
    let html = `<div class="manifest-header">Your Hybrid XV — replacing ${replacedTeam}</div>`;
    order.forEach((pos, i) => {
        const p = userTeam[pos];
        if (p) html += `<div class="manifest-row"><span class="manifest-num">${i+1}</span><span class="manifest-pos">${pos}</span><span class="manifest-name">${p.name} <span class="manifest-nation">(${p.nation})</span></span><span class="player-rating">${p.score}</span></div>`;
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
    for (let p in userTeam) { s += userTeam[p].score; c++; }
    return c > 0 ? Math.round(s/c) : 80;
}

function simulateMatch(userR, oppR) {
    const diff = userR - oppR;
    const v = () => Math.floor(Math.random()*15) - 7;
    let uS = Math.max(3, Math.round(22 + diff*0.6 + v()));
    let oS = Math.max(3, Math.round(22 - diff*0.6 + v()));
    if (uS === oS) uS += 3;
    return { userScore: uS, oppScore: oS, won: uS > oS, margin: Math.abs(uS-oS) };
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function addLog(msg, colour) {
    const line = document.createElement("div");
    line.className = "sim-log-line";
    if (colour) line.style.color = colour;
    line.textContent = msg;
    simResults.appendChild(line);
    simResults.scrollTop = simResults.scrollHeight;
    await delay(950);
}

async function runTournamentSimulation() {
    const userR = getUserRating();
    const pool = getPoolFor(replacedTeam);

    await addLog("Initialising simulation...", null);
    await addLog("Your Hybrid XV (avg rating: " + userR + ") replaces " + replacedTeam + " in Pool " + pool, null);
    await addLog("--- POOL STAGE: Pool " + pool + " ---", "var(--brand-gold)");

    const poolTeams = rwc2023PoolStandings[pool].filter(t => t !== replacedTeam);
    let poolPoints = 0;
    const userVsResults = [];

    for (const opp of poolTeams) {
        const res = simulateMatch(userR, teamStrengths[opp] || 72);
        let pts = 0;
        if (res.won) { pts = res.margin > 20 ? 5 : 4; }
        else if (res.margin <= 7) { pts = 1; }
        poolPoints += pts;
        userVsResults.push({ opp, ...res, pts });
        const icon = res.won ? "WIN" : "LOSS";
        await addLog(icon + "  vs " + opp + ": " + res.userScore + "-" + res.oppScore + " (" + pts + " pts)", res.won ? "#4ade80" : "#f87171");
    }

    await addLog("Pool points total: " + poolPoints, "var(--brand-gold)");

    const qualified = determineQualification(pool, replacedTeam, userVsResults, poolPoints);
    if (!qualified) {
        await addLog("ELIMINATED — did not qualify from Pool " + pool, "#ef4444");
        restartBtn.classList.remove("hidden"); return;
    }

    await addLog("QUALIFIED from Pool " + pool + " in " + qualified + " place", "#4ade80");
    await addLog("--- QUARTER-FINAL ---", "var(--brand-gold)");

    const qfOpp = getQFOpponent(pool, qualified);
    const qf = simulateMatch(userR, teamStrengths[qfOpp] || 80);
    await addLog((qf.won ? "WIN" : "LOSS") + "  vs " + qfOpp + ": " + qf.userScore + "-" + qf.oppScore, qf.won ? "#4ade80" : "#f87171");
    if (!qf.won) { await addLog("Knocked out in the quarter-finals.", "#ef4444"); restartBtn.classList.remove("hidden"); return; }

    await addLog("--- SEMI-FINAL ---", "var(--brand-gold)");
    const sfOpp = getSFOpponent(pool);
    const sf = simulateMatch(userR, teamStrengths[sfOpp] || 86);
    await addLog((sf.won ? "WIN" : "LOSS") + "  vs " + sfOpp + ": " + sf.userScore + "-" + sf.oppScore, sf.won ? "#4ade80" : "#f87171");

    if (!sf.won) {
        await addLog("--- THIRD-PLACE PLAY-OFF ---", "var(--brand-gold)");
        const tpOpp = getThirdPlaceOpp(pool);
        const tp = simulateMatch(userR, teamStrengths[tpOpp] || 84);
        await addLog((tp.won ? "WIN" : "LOSS") + "  vs " + tpOpp + ": " + tp.userScore + "-" + tp.oppScore, tp.won ? "#4ade80" : "#f87171");
        await addLog(tp.won ? "BRONZE MEDAL — 3rd place at the World Cup!" : "4th place — so close.", tp.won ? "#4ade80" : "#c5a059");
        restartBtn.classList.remove("hidden"); return;
    }

    await addLog("--- FINAL ---", "var(--brand-gold)");
    const finOpp = getFinalOpp(pool);
    const fin = simulateMatch(userR, teamStrengths[finOpp] || 90);
    await addLog((fin.won ? "WIN" : "LOSS") + "  vs " + finOpp + ": " + fin.userScore + "-" + fin.oppScore, fin.won ? "#4ade80" : "#f87171");
    if (fin.won) {
        await addLog("WORLD CHAMPIONS! Your Hybrid XV wins the 2023 Rugby World Cup!", "var(--brand-gold)");
    } else {
        await addLog("Runners-up. A magnificent campaign — one step short of glory.", "#c5a059");
    }
    restartBtn.classList.remove("hidden");
}

function getPoolFor(team) {
    for (const [k, v] of Object.entries(rwc2023PoolStandings)) { if (v.includes(team)) return k; }
    return "A";
}

function determineQualification(pool, replaced, userResults, userPts) {
    const actual = {
        A: {"France":18,"New Zealand":15,"Italy":10,"Uruguay":5,"Namibia":0},
        B: {"Ireland":19,"South Africa":15,"Scotland":10,"Tonga":5,"Romania":0},
        C: {"Wales":16,"Fiji":15,"Australia":8,"Georgia":5,"Portugal":6},
        D: {"England":16,"Argentina":15,"Japan":12,"Samoa":8,"Chile":0}
    };
    const pts = {};
    rwc2023PoolStandings[pool].filter(t => t !== replaced).forEach(t => {
        pts[t] = Math.max(0, (actual[pool][t] || 8) - (userResults.find(r => r.opp === t) ? 2 : 0));
    });
    pts["Your XV"] = userPts;
    const sorted = Object.entries(pts).sort((a,b) => b[1]-a[1]);
    const rank = sorted.findIndex(([t]) => t === "Your XV");
    if (rank === 0) return "1st";
    if (rank === 1) return "2nd";
    return null;
}

function getQFOpponent(pool, qualified) {
    const cross = {A:"D",B:"C",C:"B",D:"A"}[pool];
    const idx = qualified === "1st" ? 1 : 0;
    return rwc2023PoolStandings[cross][idx];
}

function getSFOpponent(pool) {
    // Return the actual 2023 QF winner from the paired bracket side
    const sfOpps = {A:"New Zealand",B:"South Africa",C:"England",D:"Argentina"};
    return sfOpps[pool] || "South Africa";
}

function getThirdPlaceOpp(pool) {
    const tpOpps = {A:"Argentina",B:"England",C:"Argentina",D:"England"};
    return tpOpps[pool] || "Argentina";
}

function getFinalOpp(pool) {
    const finOpps = {A:"South Africa",B:"New Zealand",C:"South Africa",D:"New Zealand"};
    return finOpps[pool] || "South Africa";
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
