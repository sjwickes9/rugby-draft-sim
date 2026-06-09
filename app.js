// Structural Position Families Mapping
const positionFamilies = {
    "Loosehead Prop": "Props", "Tighthead Prop": "Props", "Hooker": "Hookers",
    "Lock 4": "Locks", "Lock 5": "Locks", "Blindside Flanker": "Back Row",
    "Openside Flanker": "Back Row", "Number 8": "Back Row", "Scrum-half": "Scrum Halves",
    "Fly-half": "Fly Halves", "Inside Centre": "Centres", "Outside Centre": "Centres",
    "Left Wing": "Back Three", "Right Wing": "Back Three", "Fullback": "Back Three"
};

const forwardPositions = ["Loosehead Prop", "Hooker", "Tighthead Prop", "Lock 4", "Lock 5", "Blindside Flanker", "Openside Flanker", "Number 8"];
const backPositions = ["Scrum-half", "Fly-half", "Inside Centre", "Outside Centre", "Left Wing", "Right Wing", "Fullback"];

// Runtime Application Variables
let userTeam = {};
let currentSpunSquad = [];
let selectedPlayer = null;
let respinsLeft = 0;
let isKnowledgeMode = false;
let isCareerMode = false;
let spotsFilledCount = 0;
let playerSelectedFromCurrentPool = false;
let draftedPlayersBlacklist = [];

// DOM Element Targets
const setupCard = document.getElementById("setup-card");
const draftDashboard = document.getElementById("draft-dashboard");
const simDashboard = document.getElementById("sim-dashboard");
const spinBtn = document.getElementById("spin-btn");
const respinBtn = document.getElementById("respin-btn");
const respinCountText = document.getElementById("respin-count");
const rosterContainer = document.getElementById("roster-container");
const statusText = document.getElementById("status-text");
const flagIndicator = document.getElementById("flag-indicator");
const pitchCircles = document.querySelectorAll(".pitch-circle");
const runSimBtn = document.getElementById("run-sim-btn");
const simResults = document.getElementById("sim-results");
const restartBtn = document.getElementById("restart-btn");
const manifestTeamBox = document.getElementById("manifest-team-box");

// Screen Transition: Setup -> Draft
document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("start-game-btn");
    if (startGameBtn) {
        startGameBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const difficultyChecked = document.querySelector('input[name="difficulty"]:checked');
            const difficultySetting = difficultyChecked ? difficultyChecked.value : "normal";

            respinsLeft = difficultySetting === "easy" ? 3 : difficultySetting === "normal" ? 1 : 0;
            if (respinCountText) respinCountText.textContent = respinsLeft;

            if (setupCard) setupCard.classList.add("hidden");
            if (draftDashboard) draftDashboard.classList.remove("hidden");

            recalculateDashboardAverages();
        });
    }
});

// Slider Toggle Setup
const variantHint = document.getElementById("variant-hint");
setupSlider("variant-slider-track", "variant-handle", (index) => {
    isCareerMode = (index === 1);
    if (variantHint) {
        variantHint.textContent = isCareerMode
            ? "Players are rated at their personal career best, regardless of tournament year."
            : "Players are rated as they were at that specific World Cup.";
    }
});
setupSlider("rating-slider-track", "rating-handle", (index) => {
    isKnowledgeMode = (index === 1);
    if (currentSpunSquad.length > 0) renderRosterList();
});

function setupSlider(trackId, handleId, onChange) {
    const track = document.getElementById(trackId);
    if (!track) return;
    const options = track.querySelectorAll(".slider-opt");
    let activeIndex = 0;
    track.addEventListener("click", () => {
        activeIndex = activeIndex === 0 ? 1 : 0;
        if (activeIndex === 0) {
            track.classList.remove("right-state");
            options[0].classList.add("active"); options[1].classList.remove("active");
        } else {
            track.classList.add("right-state");
            options[0].classList.remove("active"); options[1].classList.add("active");
        }
        onChange(activeIndex);
    });
}

function isPositionFamilyFullyOccupied(family) {
    const spotsInFamily = Object.keys(positionFamilies).filter(pos => positionFamilies[pos] === family);
    return spotsInFamily.every(pos => userTeam[pos] !== undefined);
}

if (spinBtn) {
    spinBtn.addEventListener("click", () => {
        if (currentSpunSquad.length > 0 && !playerSelectedFromCurrentPool) {
            statusText.textContent = "⚠️ Selection Required! You must draft a player from this team before generating a new pool.";
            return;
        }
        triggerRosterSpinEngine();
    });
}

if (respinBtn) {
    respinBtn.addEventListener("click", () => {
        if (respinsLeft <= 0) return;
        respinsLeft--;
        respinCountText.textContent = respinsLeft;
        if (respinsLeft <= 0) { respinBtn.classList.add("disabled"); respinBtn.disabled = true; }
        triggerRosterSpinEngine();
    });
}

// Country code lookup table — maps full country name to historicNameBank key
const countryCodeMap = {
    "England": "Eng", "New Zealand": "NZ", "South Africa": "RSA",
    "France": "Fra", "Ireland": "Ire", "Australia": "Aus",
    "Wales": "Wal", "Scotland": "Sco", "Argentina": "Arg", "Italy": "Ita"
};

// ROSTER SPIN ENGINE
function triggerRosterSpinEngine() {
    selectedPlayer = null;
    playerSelectedFromCurrentPool = false;
    spinBtn.classList.add("disabled"); spinBtn.disabled = true;
    respinBtn.classList.add("disabled"); respinBtn.disabled = true;
    rosterContainer.innerHTML = "";
    statusText.textContent = "";
    if (flagIndicator) flagIndicator.innerHTML = "";

    if (typeof tier1Nations === 'undefined' || typeof tier2Nations === 'undefined') {
        statusText.textContent = "⚠️ Error: data.js arrays (tier1Nations/tier2Nations) could not be read.";
        return;
    }

    const isTier1 = Math.random() < 0.75;
    const targetPool = isTier1 ? tier1Nations : tier2Nations;
    const selectedNation = targetPool[Math.floor(Math.random() * targetPool.length)];
    const selectedYear = selectedNation.years[Math.floor(Math.random() * selectedNation.years.length)];

    statusText.textContent = `${selectedNation.country.toUpperCase()} (${selectedYear}) Pool opened. Choose ONE player.`;

    if (flagIndicator && typeof getFlagEmbed === 'function') {
        flagIndicator.innerHTML = getFlagEmbed(selectedNation.country);
    }

    currentSpunSquad = [];
    let finalSourceNames = [];

    if (selectedNation.squads && selectedNation.squads[selectedYear]) {
        finalSourceNames = selectedNation.squads[selectedYear];
    } else if (selectedNation.squads && selectedNation.squads["HISTORIC"]) {
        finalSourceNames = selectedNation.squads["HISTORIC"];
    } else {
        // Use the countryCodeMap for a reliable lookup rather than substring slicing
        const countryCode = countryCodeMap[selectedNation.country] || selectedNation.country.substring(0, 3);
        finalSourceNames = (typeof historicNameBank !== 'undefined' && historicNameBank[countryCode])
            ? historicNameBank[countryCode]
            : ["A. Player", "B. Player", "C. Player", "D. Player", "E. Player", "F. Player", "G. Player", "H. Player"];
    }

    const positionDistribution = [
        { group: "Props", count: 4 },
        { group: "Hookers", count: 2 },
        { group: "Locks", count: 3 },
        { group: "Back Row", count: 4 },
        { group: "Scrum Halves", count: 2 },
        { group: "Fly Halves", count: 2 },
        { group: "Centres", count: 3 },
        { group: "Back Three", count: 3 }
    ];

    // Shuffle the name list so repeated names aren't always the same player
    const shuffledNames = [...finalSourceNames].sort(() => Math.random() - 0.5);
    let nameIndex = 0;

    positionDistribution.forEach(dist => {
        for (let i = 0; i < dist.count; i++) {
            const chosenName = shuffledNames[nameIndex % shuffledNames.length];
            nameIndex++;

            let baseValue = isTier1 ? (84 + Math.floor(Math.random() * 9)) : (72 + Math.floor(Math.random() * 10));
            // Career Peak mode adds a boost to represent their personal best ratings
            if (isCareerMode) { baseValue += Math.floor(Math.random() * 5); }

            currentSpunSquad.push({
                name: chosenName,
                pos: dist.group,
                rating: Math.min(99, baseValue)
            });
        }
    });

    renderRosterList();
    spinBtn.classList.remove("disabled"); spinBtn.disabled = false;
    if (respinsLeft > 0) { respinBtn.classList.remove("disabled"); respinBtn.disabled = false; }
}

function renderRosterList() {
    rosterContainer.innerHTML = "";
    let currentCategory = ""; let block = null;

    currentSpunSquad.forEach(player => {
        if (player.pos !== currentCategory) {
            currentCategory = player.pos;
            block = document.createElement("div"); block.className = "roster-group";
            const head = document.createElement("div"); head.className = "group-header"; head.textContent = currentCategory;
            block.appendChild(head); rosterContainer.appendChild(block);
        }

        const row = document.createElement("div"); row.className = "player-row";
        const isBlacklisted = draftedPlayersBlacklist.includes(player.name);
        const isRoleGroupFull = isPositionFamilyFullyOccupied(player.pos);

        if (playerSelectedFromCurrentPool || isBlacklisted) row.classList.add("claimed-lockout");
        else if (isRoleGroupFull) row.classList.add("position-filled-lockout");

        const n = document.createElement("span"); n.className = "player-name"; n.textContent = player.name;
        const r = document.createElement("span"); r.className = "player-rating"; r.textContent = isKnowledgeMode ? "??" : player.rating;

        row.appendChild(n); row.appendChild(r); block.appendChild(row);

        row.addEventListener("click", () => {
            if (playerSelectedFromCurrentPool || isBlacklisted || isRoleGroupFull) return;
            if (selectedPlayer && selectedPlayer.name === player.name) {
                row.classList.remove("selected"); selectedPlayer = null;
                pitchCircles.forEach(c => c.classList.remove("highlight-eligible"));
            } else {
                document.querySelectorAll(".player-row").forEach(el => el.classList.remove("selected"));
                row.classList.add("selected"); selectedPlayer = player;
                evaluateEligibilityCircles(player);
            }
        });
    });
}

function evaluateEligibilityCircles(player) {
    pitchCircles.forEach(circle => {
        circle.classList.remove("highlight-eligible");
        if (circle.classList.contains("occupied")) return;
        if (positionFamilies[circle.dataset.pos] === player.pos) circle.classList.add("highlight-eligible");
    });
}

function recalculateDashboardAverages() {
    let tSum = 0, fSum = 0, bSum = 0, tCount = 0, fCount = 0, bCount = 0;
    for (let pos in userTeam) {
        let val = userTeam[pos].score; tSum += val; tCount++;
        if (forwardPositions.includes(pos)) { fSum += val; fCount++; }
        if (backPositions.includes(pos)) { bSum += val; bCount++; }
    }
    document.getElementById("avg-global-ovr").textContent = tCount > 0 ? Math.round(tSum / tCount) : "--";
    document.getElementById("avg-forward-ovr").textContent = fCount > 0 ? Math.round(fSum / fCount) : "--";
    document.getElementById("avg-back-ovr").textContent = bCount > 0 ? Math.round(bSum / bCount) : "--";
}

pitchCircles.forEach(node => {
    node.addEventListener("click", () => {
        const bPos = node.dataset.pos;
        if (node.classList.contains("occupied") || !selectedPlayer || positionFamilies[bPos] !== selectedPlayer.pos) return;

        let finalValue = selectedPlayer.rating;
        userTeam[bPos] = { name: selectedPlayer.name, score: finalValue };
        draftedPlayersBlacklist.push(selectedPlayer.name);
        spotsFilledCount++; playerSelectedFromCurrentPool = true;

        node.classList.add("occupied");
        node.innerHTML = `<div class="circle-num">${finalValue}</div><div class="circle-name">${selectedPlayer.name}</div>`;

        selectedPlayer = null;
        pitchCircles.forEach(c => c.classList.remove("highlight-eligible"));
        recalculateDashboardAverages(); renderRosterList();

        if (spotsFilledCount === 15) {
            setTimeout(() => {
                if (draftDashboard) draftDashboard.classList.add("hidden");
                if (simDashboard) simDashboard.classList.remove("hidden");
                populateManifestPreviewWindow();
            }, 800);
        }
    });
});

function populateManifestPreviewWindow() {
    if (!manifestTeamBox) return;
    let htmlContent = `<div class="manifest-header">Drafted Squad Roster Summary</div>`;

    const positionOrder = [
        "Loosehead Prop", "Hooker", "Tighthead Prop", "Lock 4", "Lock 5",
        "Blindside Flanker", "Openside Flanker", "Number 8", "Scrum-half",
        "Fly-half", "Left Wing", "Inside Centre", "Outside Centre", "Right Wing", "Fullback"
    ];

    positionOrder.forEach(pos => {
        const player = userTeam[pos];
        if (player) {
            htmlContent += `
                <div class="manifest-row">
                    <span class="manifest-pos">${pos}</span>
                    <span>${player.name}</span>
                    <span class="player-rating">${player.score}</span>
                </div>`;
        }
    });
    manifestTeamBox.innerHTML = htmlContent;
}

// SIMULATION ENGINE
if (runSimBtn) {
    runSimBtn.addEventListener("click", () => {
        runSimBtn.disabled = true;
        runSimBtn.classList.add("disabled");
        simResults.innerHTML = "";

        let tSum = 0; let count = 0;
        for (let pos in userTeam) { tSum += userTeam[pos].score; count++; }
        const squadRating = count > 0 ? Math.round(tSum / count) : 80;

        const simulationStages = [
            { text: "⏳ Initializing Simulation Matrix Engine...", time: 600 },
            { text: "🏉 Quarter-Finals: Matchup VS Australia (2003 Classic Lineup)", time: 1400, oppRating: 86 },
            { text: "🏉 Semi-Finals: Matchup VS France (2023 Campaign Squad)", time: 2600, oppRating: 89 },
            { text: "🏆 Grand Final Championship: Matchup VS Classic Barbarians", time: 3800, oppRating: 92 }
        ];

        simulationStages.forEach((stage, idx) => {
            setTimeout(() => {
                if (idx === 0) {
                    simResults.innerHTML += `<div class="sim-log-line">${stage.text}</div>`;
                } else {
                    const winVariance = (squadRating - stage.oppRating) * 2;
                    const rng = Math.floor(Math.random() * 20) - 10 + winVariance;
                    const userScore = Math.max(10, 24 + Math.round(rng / 2));
                    const oppScore = Math.max(6, 21 - Math.round(rng / 2));

                    if (userScore >= oppScore) {
                        simResults.innerHTML += `<div class="sim-log-line" style="color: #4ade80;">✅ ${stage.text} -> WON ${userScore} - ${oppScore}</div>`;
                        if (idx === simulationStages.length - 1) {
                            simResults.innerHTML += `<div class="sim-log-line" style="color: var(--brand-gold); font-weight: bold; margin-top: 10px;">🎉 TOURNAMENT VICTOR! Your hybrid squad has successfully conquered the simulation!</div>`;
                            if (restartBtn) restartBtn.classList.remove("hidden");
                        }
                    } else {
                        simResults.innerHTML += `<div class="sim-log-line" style="color: #f87171;">❌ ${stage.text} -> LOST ${userScore} - ${oppScore}</div>`;
                        simResults.innerHTML += `<div class="sim-log-line" style="color: #ef4444; font-weight: bold; margin-top: 10px;">💀 Campaign Defeat. Your team was knocked out of the tournament bracket.</div>`;
                        if (restartBtn) restartBtn.classList.remove("hidden");
                    }
                }
                simResults.scrollTop = simResults.scrollHeight;
            }, stage.time);
        });
    });
}

if (restartBtn) { restartBtn.addEventListener("click", () => location.reload()); }
document.querySelectorAll(".abort-reset-btn").forEach(btn => { btn.addEventListener("click", () => location.reload()); });

document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const btn = document.getElementById("theme-toggle");
    btn.textContent = document.body.classList.contains("light-theme") ? "Dark Mode" : "Light Mode";
});
