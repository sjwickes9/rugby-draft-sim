// RESTORED: Base Positional Validation Rules Structure
const positionFamilies = {
    "Loosehead Prop": "Props", "Tighthead Prop": "Props", "Hooker": "Hookers",
    "Lock 4": "Locks", "Lock 5": "Locks", "Blindside Flanker": "Back Row",
    "Openside Flanker": "Back Row", "Number 8": "Back Row", "Scrum-half": "Scrum Halves",
    "Fly-half": "Fly Halves", "Inside Centre": "Centres", "Outside Centre": "Centres",
    "Left Wing": "Back Three", "Right Wing": "Back Three", "Fullback": "Back Three"
};

const forwardPositions = ["Loosehead Prop", "Hooker", "Tighthead Prop", "Lock 4", "Lock 5", "Blindside Flanker", "Openside Flanker", "Number 8"];
const backPositions = ["Scrum-half", "Fly-half", "Inside Centre", "Outside Centre", "Left Wing", "Right Wing", "Fullback"];

// Mock Squad Registry Banks (Placeholder arrays to map out structural layouts safely)
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
    "New": ["McCaw", "Carter", "Nonu", "Smith", "Read", "Savea", "Whitelock", "Retallick", "Mealamu", "Woodcock", "Franks", "Kaino", "Aaron Smith"],
    "Sou": ["Kolisi", "Pollard", "de Klerk", "du Toit", "Vermeulen", "Etzebeth", "Mtawarira", "Am", "Mapimpi", "Marx", "Kitshoff", "Malherbe"],
    "Eng": ["Wilkinson", "Johnson", "Hill", "Dallaglio", "Back", "Robinson", "Greenwood", "Cohen", "Woodman", "Thompson", "Leonard", "Kay"]
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

// DOM Element Selectors Map
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

function getFlagEmbed(country) {
    const maps = { "New Zealand": "🇳🇿", "South Africa": "🇿🇦", "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Samoa": "🇼🇸", "Fiji": "🇫🇯" };
    return maps[country] || "🏳️";
}

document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("start-game-btn");
    if (startGameBtn) {
        startGameBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const difficultyChecked = document.querySelector('input[name="difficulty"]:checked');
            const difficultySetting = difficultyChecked ? difficultyChecked.value : "normal";
            
            respinsLeft = difficultySetting === "easy" ? 3 : difficultySetting === "normal" ? 1 : 0;
            if (respinCountText) respinCountText.textContent = respinsLeft;
            
            if (setupCard) setupCard.style.display = "none";
            if (draftDashboard) draftDashboard.classList.remove("hidden");
            
            recalculateDashboardAverages();
        });
    }
});

document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    document.getElementById("theme-toggle").textContent = document.body.classList.contains("light-theme") ? "Dark Mode" : "Light Mode";
});

document.querySelectorAll(".abort-reset-btn").forEach(btn => {
    btn.addEventListener("click", () => { location.reload(); });
});

setupSlider("variant-slider-track", "variant-handle", ["variant-comp", "variant-career"], (index) => { isCareerMode = (index === 1); });
setupSlider("rating-slider-track", "rating-handle", ["lbl-reveal", "lbl-knowledge"], (index) => {
    isKnowledgeMode = (index === 1);
    if (currentSpunSquad.length > 0) renderRosterList();
});

function setupSlider(trackId, handleId, optionIds, onChange) {
    const track = document.getElementById(trackId);
    if (!track) return;
    const opt0 = document.getElementById(optionIds[0]);
    const opt1 = document.getElementById(optionIds[1]);
    let activeIndex = 0;
    track.addEventListener("click", () => {
        activeIndex = activeIndex === 0 ? 1 : 0;
        if (activeIndex === 0) { track.classList.remove("right-state"); if(opt0) opt0.classList.add("active"); if(opt1) opt1.classList.remove("active"); }
        else { track.classList.add("right-state"); if(opt0) opt0.classList.remove("active"); if(opt1) opt1.classList.add("active"); }
        onChange(activeIndex);
    });
}

function isPositionFamilyFullyOccupied(family) {
    const spotsInFamily = Object.keys(positionFamilies).filter(pos => positionFamilies[pos] === family);
    return spotsInFamily.every(pos => userTeam[pos] !== undefined);
}

spinBtn.addEventListener("click", () => {
    if (currentSpunSquad.length > 0 && !playerSelectedFromCurrentPool) {
        statusText.textContent = "⚠️ Selection Required! You must draft a player from this team before spinning. Use 'Respin' if you want a fresh pool.";
        return;
    }
    triggerRosterSpinEngine();
});

respinBtn.addEventListener("click", () => {
    if (respinsLeft <= 0) return;
    respinsLeft--;
    respinCountText.textContent = respinsLeft;
    if (respinsLeft <= 0) { respinBtn.classList.add("disabled"); respinBtn.disabled = true; }
    triggerRosterSpinEngine();
});

function triggerRosterSpinEngine() {
    selectedPlayer = null;
    playerSelectedFromCurrentPool = false;
    spinBtn.classList.add("disabled"); spinBtn.disabled = true;
    respinBtn.classList.add("disabled"); respinBtn.disabled = true;
    rosterContainer.innerHTML = "";
    
    flagIndicator.innerHTML = ""; 
    statusText.textContent = "";
    spinnerAnchor.innerHTML = '<div class="rugby-ball-spinner">🏉</div>';

    setTimeout(() => {
        spinnerAnchor.innerHTML = ''; 
        spinBtn.classList.remove("disabled"); spinBtn.disabled = false;
        
        const isTier1 = Math.random() < 0.75;
        const targetPool = isTier1 ? tier1Nations : tier2Nations;
        const selectedNation = targetPool[Math.floor(Math.random() * targetPool.length)];
        const selectedYear = selectedNation.years[Math.floor(Math.random() * selectedNation.years.length)];
        
        flagIndicator.innerHTML = getFlagEmbed(selectedNation.country);
        statusText.textContent = `${selectedNation.country.toUpperCase()} (${selectedYear}) Pool opened. Choose ONE player.`;
        
        currentSpunSquad = [];
        
        let yearNameSource = [];
        if (selectedNation.squads && selectedNation.squads[selectedYear]) {
            yearNameSource = selectedNation.squads[selectedYear];
        } else if (selectedNation.squads && selectedNation.squads["HISTORIC"]) {
            yearNameSource = selectedNation.squads["HISTORIC"];
        } else {
            const key = selectedNation.country.substring(0, 3);
            yearNameSource = historicNameBank[key] || ["Jones", "Smith", "Williams", "Brown"];
        }

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
                baseSur = baseSur.trim();
                
                const finalName = (baseSur.includes(". ")) ? baseSur : (dist.prefixes[i] || "J. ") + baseSur;
                nameIndex++;

                let baseValue = isTier1 ? (84 + Math.floor(Math.random() * 9)) : (72 + Math.floor(Math.random() * 10));
                if (isCareerMode) { baseValue += Math.floor(Math.random() * 5); }

                currentSpunSquad.push({
                    name: finalName,
                    pos: dist.group,
                    rating: Math.min(99, baseValue)
                });
            }
        });

        renderRosterList();
        if (respinsLeft > 0) { respinBtn.classList.remove("disabled"); respinBtn.disabled = false; }
    }, 850);
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

        if (playerSelectedFromCurrentPool || isBlacklisted) {
            row.classList.add("claimed-lockout");
        } else if (isRoleGroupFull) {
            row.classList.add("position-filled-lockout");
        }

        const n = document.createElement("span"); n.className = "player-name"; n.textContent = player.name;
        const r = document.createElement("span"); r.className = "player-rating"; r.textContent = isKnowledgeMode ? "??" : player.rating;

        row.appendChild(n); row.appendChild(r); block.appendChild(row);

        row.addEventListener("click", () => {
            if (playerSelectedFromCurrentPool || isBlacklisted || isRoleGroupFull) return;
            
            if (selectedPlayer && selectedPlayer.name === player.name) {
                row.classList.remove("selected");
                selectedPlayer = null;
                pitchCircles.forEach(c => c.classList.remove("highlight-eligible"));
            } else {
                document.querySelectorAll(".player-row").forEach(el => el.classList.remove("selected"));
                row.classList.add("selected"); 
                selectedPlayer = player;
                evaluateEligibilityCircles(player);
            }
        });
    });
}

function evaluateEligibilityCircles(player) {
    pitchCircles.forEach(circle => {
        circle.classList.remove("highlight-eligible");
        if (circle.classList.contains("occupied")) return;
        if (positionFamilies[circle.dataset.pos] === player.pos) {
            circle.classList.add("highlight-eligible");
        }
    });
}

function getGlobalTeamAverage() {
    let sum = 0, count = 0;
    for (let pos in userTeam) { sum += userTeam[pos].score; count++; }
    return count > 0 ? Math.round(sum / count) : 0;
}

function recalculateDashboardAverages() {
    let tSum = 0, fSum = 0, bSum = 0;
    let tCount = 0, fCount = 0, bCount = 0;

    for (let pos in userTeam) {
        let val = userTeam[pos].score;
        tSum += val; tCount++;
        if (forwardPositions.includes(pos)) { fSum += val; fCount++; }
        if (backPositions.includes(pos)) { bSum += val; bCount++; }
    }

    const gOvr = document.getElementById("avg-global-ovr");
    const fOvr = document.getElementById("avg-forward-ovr");
    const bOvr = document.getElementById("avg-back-ovr");

    if (gOvr) gOvr.textContent = tCount > 0 ? Math.round(tSum / tCount) : "--";
    if (fOvr) fOvr.textContent = fCount > 0 ? Math.round(fSum / fCount) : "--";
    if (bOvr) bOvr.textContent = bCount > 0 ? Math.round(bSum / bCount) : "--";
}

pitchCircles.forEach(node => {
    node.addEventListener("click", () => {
        const bPos = node.dataset.pos;
        if (node.classList.contains("occupied")) return;
        if (!selectedPlayer) return;
        if (positionFamilies[bPos] !== selectedPlayer.pos) return;

        let finalValue = selectedPlayer.rating;
        let penaltyActive = false;

        if (selectedPlayer.pos === "Props" && bPos === "Loosehead Prop" && Math.random() > 0.7) {
            finalValue -= 4; penaltyActive = true;
        }

        userTeam[bPos] = { name: selectedPlayer.name, score: finalValue };
        draftedPlayersBlacklist.push(selectedPlayer.name); 
        spotsFilledCount++;
        playerSelectedFromCurrentPool = true;

        node.classList.add("occupied");
        node.innerHTML = `<div class="circle-num">${finalValue}</div><div class="circle-name">${selectedPlayer.name}</div>`;

        if (penaltyActive) {
            const badge = document.createElement("div"); badge.className = "penalty-tag"; badge.textContent = "-4";
            node.appendChild(badge);
        }

        selectedPlayer = null;
        pitchCircles.forEach(c => c.classList.remove("highlight-eligible"));
        recalculateDashboardAverages();
        renderRosterList();

        if (spotsFilledCount === 15) {
            statusText.textContent = "All 15 field nodes assigned! Generating rosters...";
            setTimeout(() => {
                draftDashboard.classList.add("hidden");
                simDashboard.classList.remove("hidden");
                populateManifestPreviewWindow();
            }, 1200);
        }
    });
});

const chronologicalFieldPositions = [
    "Loosehead Prop", "Hooker", "Tighthead Prop", "Lock 4", "Lock 5",
    "Blindside Flanker", "Openside Flanker", "Number 8", "Scrum-half", "Fly-half",
    "Left Wing", "Inside Centre", "Outside Centre", "Right Wing", "Fullback"
];

function populateManifestPreviewWindow() {
    const windowContainer = document.getElementById("manifest-team-box");
    if (!windowContainer) return;
    
    windowContainer.innerHTML = "";
    
    const avgScore = getGlobalTeamAverage();
    const summaryHeader = document.createElement("div");
    summaryHeader.className = "manifest-summary-header";
    summaryHeader.innerHTML = `<h3>Final Draft Summary</h3> <span>OVR: ${avgScore}</span>`;
    windowContainer.appendChild(summaryHeader);
    
    const table = document.createElement("table");
    table.style.width = "100%"; table.style.borderCollapse = "collapse"; table.style.fontSize = "0.9rem";

    chronologicalFieldPositions.forEach(pos => {
        if (!userTeam[pos]) return;
        const row = document.createElement("tr");
        row.style.borderBottom = "1px solid var(--border-color)";
        
        const tdPos = document.createElement("td");
        tdPos.style.padding = "8px 4px"; tdPos.style.color = "var(--brand-gold)"; tdPos.style.fontWeight = "bold";
        tdPos.textContent = pos;
        
        const tdName = document.createElement("td");
        tdName.style.padding = "8px 4px"; tdName.textContent = userTeam[pos].name;
        
        const tdScore = document.createElement("td");
        tdScore.style.padding = "8px 4px"; tdScore.style.textAlign = "right"; tdScore.style.fontWeight = "bold";
        tdScore.textContent = userTeam[pos].score;

        row.appendChild(tdPos); row.appendChild(tdName); row.appendChild(tdScore);
        table.appendChild(row);
    });
    
    windowContainer.appendChild(table);
}

function generateLawfulRugbyScore(weightSpread, isUser) {
    let baseChance = isUser ? 22 + (weightSpread * 1.1) : 14 - (weightSpread * 0.7);
    let scoreTarget = Math.max(0, Math.round(baseChance + (Math.random() * 12 - 6)));
    if (scoreTarget < 3) return 0;
    
    let totalScore = 0; let tries = 0;
    while (scoreTarget >= 5) {
        tries++; totalScore += 5; scoreTarget -= 7; 
        if (Math.random() > 0.4) totalScore += 2;
    }
    while (scoreTarget >= 3) { totalScore += 3; scoreTarget -= 3; }
    if (totalScore === 1 || totalScore === 2 || totalScore === 4) return tries > 0 ? 5 : 3;
    return totalScore;
