const positionFamilies = {
    "Loosehead Prop": "Props", "Tighthead Prop": "Props", "Hooker": "Hookers",
    "Lock 4": "Locks", "Lock 5": "Locks", "Blindside Flanker": "Back Row",
    "Openside Flanker": "Back Row", "Number 8": "Back Row", "Scrum-half": "Scrum Halves",
    "Fly-half": "Fly Halves", "Inside Centre": "Centres", "Outside Centre": "Centres",
    "Left Wing": "Back Three", "Right Wing": "Back Three", "Fullback": "Back Three"
};

const forwardPositions = ["Loosehead Prop", "Hooker", "Tighthead Prop", "Lock 4", "Lock 5", "Blindside Flanker", "Openside Flanker", "Number 8"];
const backPositions = ["Scrum-half", "Fly-half", "Inside Centre", "Outside Centre", "Left Wing", "Right Wing", "Fullback"];

// WORLD CUP DATA POOL SQUAD REGISTRIES
const tier1Nations = [
    { country: "New Zealand", years: ["2015", "2011"], squads: { "2015": ["McCaw", "Carter", "Nonu", "Smith", "Read", "Savea", "Whitelock", "Retallick", "Mealamu", "Woodcock"] } },
    { country: "South Africa", years: ["2019", "2023"], squads: { "2019": ["Kolisi", "Pollard", "de Klerk", "du Toit", "Vermeulen", "Etzebeth", "Mtawarira", "Am", "Mapimpi"] } },
    { country: "England", years: ["2003"], squads: { "2003": ["Wilkinson", "Johnson", "Hill", "Dallaglio", "Back", "Robinson", "Greenwood", "Cohen", "Woodman", "Thompson"] } }
];
const tier2Nations = [
    { country: "Samoa", years: ["2011"], squads: { "HISTORIC": ["Tuilagi", "Tekori", "Johnston", "Mapusua", "Pisi", "Fotuali'i", "Taulafo", "Schwalger"] } },
    { country: "Fiji", years: ["2023"], squads: { "HISTORIC": ["Radradra", "Botia", "Nayacalevu", "Lomani", "Tuisova", "Wainiqolo", "Mawi", "Ikanivere"] } }
];
const historicNameBank = {
    "New": ["McCaw", "Carter", "Nonu", "Smith", "Read", "Savea", "Whitelock", "Retallick", "Mealamu", "Woodcock"],
    "Sou": ["Kolisi", "Pollard", "de Klerk", "du Toit", "Vermeulen", "Etzebeth", "Mtawarira", "Am", "Mapimpi"],
    "Eng": ["Wilkinson", "Johnson", "Hill", "Dallaglio", "Back", "Robinson", "Greenwood", "Cohen"]
};

let userTeam = {};
let currentSpunSquad = [];
let selectedPlayer = null;
let respinsLeft = 0;
let isKnowledgeMode = false;
let isCareerMode = false;
let spotsFilledCount = 0;
let playerSelectedFromCurrentPool = false;
let draftedPlayersBlacklist = []; 

const setupCard = document.getElementById("setup-card");
const draftDashboard = document.getElementById("draft-dashboard");
const simDashboard = document.getElementById("sim-dashboard");
const spinBtn = document.getElementById("spin-btn");
const respinBtn = document.getElementById("respin-btn");
const respinCountText = document.getElementById("respin-count");
const rosterContainer = document.getElementById("roster-container");
const spinnerAnchor = document.getElementById("spinner-anchor");
const statusText = document.getElementById("status-text");
const flagIndicator = document.getElementById("flag-indicator");
const pitchCircles = document.querySelectorAll(".pitch-circle");

// APPLICATION INTERFACE INITIALIZER
document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("start-game-btn");
    if (startGameBtn) {
        startGameBtn.removeAttribute("disabled"); // Ensures button click events are never blocked dynamically
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

// Dynamic Configuration Sliders Sync Mapping
setupSlider("variant-slider-track", "variant-handle", (index) => { isCareerMode = (index === 1); });
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

function triggerRosterSpinEngine() {
    selectedPlayer = null;
    playerSelectedFromCurrentPool = false;
    spinBtn.classList.add("disabled"); spinBtn.disabled = true;
    respinBtn.classList.add("disabled"); respinBtn.disabled = true;
    rosterContainer.innerHTML = "";
    statusText.textContent = "";

    const isTier1 = Math.random() < 0.75;
    const targetPool = isTier1 ? tier1Nations : tier2Nations;
    const selectedNation = targetPool[Math.floor(Math.random() * targetPool.length)];
    const selectedYear = selectedNation.years[Math.floor(Math.random() * selectedNation.years.length)];
    
    statusText.textContent = `${selectedNation.country.toUpperCase()} (${selectedYear}) Pool opened. Choose ONE player.`;
    
    currentSpunSquad = [];
    let yearNameSource = selectedNation.squads[selectedYear] || selectedNation.squads["HISTORIC"] || historicNameBank[selectedNation.country.substring(0,3)] || ["Player"];

    const positionDistribution = [
        { group: "Props", count: 4, prefixes: ["P. ", "O. ", "M. ", "T. "] },
        { group: "Hookers", count: 2, prefixes: ["H. ", "K. "] },
        { group: "Locks", count: 3, prefixes: ["L. ", "B. ", "F. "] },
        { group: "Back Row", count: 4, prefixes: ["F. ", "N. ", "O. ", "S. "] },
        { group: "Scrum Halves", count: 2, prefixes: ["S. ", "M. "] },
        { group: "Fly Halves", count: 2, prefixes: ["F. ", "A. "] },
        { group: "Centres", count: 3, prefixes: ["C. ", "I. ", "O. "] },
        { group: "Back Three", count: 3, prefixes: ["W. ", "B. ", "F. "] }
    ];

    let nameIndex = 0;
    positionDistribution.forEach(dist => {
        for (let i = 0; i < dist.count; i++) {
            let baseSur = yearNameSource[nameIndex % yearNameSource.length];
            const finalName = (dist.prefixes[i] || "J. ") + baseSur;
            nameIndex++;

            let baseValue = isTier1 ? (84 + Math.floor(Math.random() * 9)) : (72 + Math.floor(Math.random() * 10));
            if (isCareerMode) { baseValue += Math.floor(Math.random() * 5); }

            currentSpunSquad.push({ name: finalName, pos: dist.group, rating: Math.min(99, baseValue) });
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
                draftDashboard.classList.add("hidden"); simDashboard.classList.remove("hidden");
                populateManifestPreviewWindow();
            }, 1000);
        }
    });
});

document.querySelectorAll(".abort-reset-btn").forEach(btn => { btn.addEventListener("click", () => location.reload()); });
document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    document.getElementById("theme-toggle").textContent = document.body.classList.contains("light-theme") ? "Dark Mode" : "Light Mode";
});
