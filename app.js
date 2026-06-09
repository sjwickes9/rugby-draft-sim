// TACTICAL NODE POSITION FAMILIES
const positionFamilies = {
    "Loosehead Prop": "Props", "Tighthead Prop": "Props", "Hooker": "Hookers",
    "Lock 4": "Locks", "Lock 5": "Locks", "Blindside Flanker": "Back Row",
    "Openside Flanker": "Back Row", "Number 8": "Back Row", "Scrum-half": "Scrum Halves",
    "Fly-half": "Fly Halves", "Inside Centre": "Centres", "Outside Centre": "Centres",
    "Left Wing": "Back Three", "Right Wing": "Back Three", "Fullback": "Back Three"
};

const displayOrder = ["Props", "Hookers", "Locks", "Back Row", "Scrum Halves", "Fly Halves", "Centres", "Back Three"];

// EXPANDED 7-NATION HISTORICAL DATA MATRIX (FIXES THE 5-TEAM POOL LIMIT)
const historicalNations = [
    { country: "New Zealand", year: "2015", flag: "🇳🇿", squad: [
        { name: "T. Woodcock", pos: "Props" }, { name: "O. Franks", pos: "Props" }, { name: "C. Faumuina", pos: "Props" }, { name: "W. Crockett", pos: "Props" },
        { name: "K. Mealamu", pos: "Hookers" }, { name: "D. Coles", pos: "Hookers" },
        { name: "B. Retallick", pos: "Locks" }, { name: "S. Whitelock", pos: "Locks" }, { name: "L. Romano", pos: "Locks" },
        { name: "J. Kaino", pos: "Back Row" }, { name: "R. McCaw", pos: "Back Row" }, { name: "K. Read", pos: "Back Row" }, { name: "V. Vito", pos: "Back Row" },
        { name: "A. Smith", pos: "Scrum Halves" }, { name: "T. Perenara", pos: "Scrum Halves" },
        { name: "D. Carter", pos: "Fly Halves" }, { name: "B. Barrett", pos: "Fly Halves" },
        { name: "M. Nonu", pos: "Centres" }, { name: "C. Smith", pos: "Centres" }, { name: "S.B. Williams", pos: "Centres" },
        { name: "J. Savea", pos: "Back Three" }, { name: "B. Smith", pos: "Back Three" }, { name: "W. Naholo", pos: "Back Three" }
    ], baseRatings: { "R. McCaw": 95, "D. Carter": 96, "B. Retallick": 92, "J. Savea": 91, "A. Smith": 93 }, careerRatings: { "R. McCaw": 99, "D. Carter": 98, "B. Retallick": 96, "J. Savea": 94, "A. Smith": 95 } },
    
    { country: "South Africa", year: "2019", flag: "🇿🇦", squad: [
        { name: "T. Mtawarira", pos: "Props" }, { name: "F. Malherbe", pos: "Props" }, { name: "S. Kitshoff", pos: "Props" }, { name: "V. Koch", pos: "Props" },
        { name: "B. du Plessis", pos: "Hookers" }, { name: "M. Marx", pos: "Hookers" },
        { name: "E. Etzebeth", pos: "Locks" }, { name: "R. de Jager", pos: "Locks" }, { name: "F. Mostert", pos: "Locks" },
        { name: "S. Kolisi", pos: "Back Row" }, { name: "P.S. du Toit", pos: "Back Row" }, { name: "D. Vermeulen", pos: "Back Row" }, { name: "F. Louw", pos: "Back Row" },
        { name: "F. de Klerk", pos: "Scrum Halves" }, { name: "H. Jantjies", pos: "Scrum Halves" },
        { name: "H. Pollard", pos: "Fly Halves" }, { name: "E. Jantjies", pos: "Fly Halves" },
        { name: "D. de Allende", pos: "Centres" }, { name: "L. Am", pos: "Centres" }, { name: "F. Steyn", pos: "Centres" },
        { name: "B. Habana", pos: "Back Three" }, { name: "C. Kolbe", pos: "Back Three" }, { name: "W. le Roux", pos: "Back Three" }
    ], baseRatings: { "E. Etzebeth": 93, "D. Vermeulen": 91, "C. Kolbe": 92, "P.S. du Toit": 90 }, careerRatings: { "E. Etzebeth": 96, "D. Vermeulen": 94, "C. Kolbe": 94, "P.S. du Toit": 93 } },
    
    { country: "England", year: "2003", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", squad: [
        { name: "T. Woodman", pos: "Props" }, { name: "P. Vickery", pos: "Props" }, { name: "J. Leonard", pos: "Props" }, { name: "J. White", pos: "Props" },
        { name: "S. Thompson", pos: "Hookers" }, { name: "D. West", pos: "Hookers" },
        { name: "M. Johnson", pos: "Locks" }, { name: "B. Kay", pos: "Locks" }, { name: "D. Grewcock", pos: "Locks" },
        { name: "R. Hill", pos: "Back Row" }, { name: "N. Back", pos: "Back Row" }, { name: "L. Dallaglio", pos: "Back Row" }, { name: "L. Moody", pos: "Back Row" },
        { name: "M. Dawson", pos: "Scrum Halves" }, { name: "A. Gomarsall", pos: "Scrum Halves" },
        { name: "J. Wilkinson", pos: "Fly Halves" }, { name: "P. Grayson", pos: "Fly Halves" },
        { name: "W. Greenwood", pos: "Centres" }, { name: "M. Tindall", pos: "Centres" }, { name: "S. Abbott", pos: "Centres" },
        { name: "J. Robinson", pos: "Back Three" }, { name: "B. Cohen", pos: "Back Three" }, { name: "I. Balshaw", pos: "Back Three" }
    ], baseRatings: { "J. Wilkinson": 94, "M. Johnson": 93, "L. Dallaglio": 90, "J. Robinson": 91 }, careerRatings: { "J. Wilkinson": 97, "M. Johnson": 96, "L. Dallaglio": 94, "J. Robinson": 93 } },

    { country: "France", year: "2023", flag: "🇫🇷", squad: [
        { name: "C. Baille", pos: "Props" }, { name: "U. Atonio", pos: "Props" }, { name: "R. Slimani", pos: "Props" }, { name: "S. Taofifénua", pos: "Props" },
        { name: "J. Marchand", pos: "Hookers" }, { name: "P. Bourgarit", pos: "Hookers" },
        { name: "T. Flament", pos: "Locks" }, { name: "C. Taofifénua", pos: "Locks" }, { name: "P. Willemse", pos: "Locks" },
        { name: "C. Ollivon", pos: "Back Row" }, { name: "F. Cros", pos: "Back Row" }, { name: "G. Alldritt", pos: "Back Row" }, { name: "A. Jelonch", pos: "Back Row" },
        { name: "A. Dupont", pos: "Scrum Halves" }, { name: "M. Lucu", pos: "Scrum Halves" },
        { name: "R. Ntamack", pos: "Fly Halves" }, { name: "M. Jalibert", pos: "Fly Halves" },
        { name: "G. Fickou", pos: "Centres" }, { name: "J. Danty", pos: "Centres" }, { name: "Y. Moefana", pos: "Centres" },
        { name: "D. Penaud", pos: "Back Three" }, { name: "T. Ramos", pos: "Back Three" }, { name: "G. Villière", pos: "Back Three" }
    ], baseRatings: { "A. Dupont": 95, "G. Alldritt": 90, "D. Penaud": 89 }, careerRatings: { "A. Dupont": 98, "G. Alldritt": 93, "D. Penaud": 92 } },

    { country: "Ireland", year: "2023", flag: "🇮🇪", squad: [
        { name: "A. Porter", pos: "Props" }, { name: "T. Furlong", pos: "Props" }, { name: "C. Healy", pos: "Props" }, { name: "F. Bealham", pos: "Props" },
        { name: "D. Sheehan", pos: "Hookers" }, { name: "R. Kelleher", pos: "Hookers" },
        { name: "J. Ryan", pos: "Locks" }, { name: "T. Beirne", pos: "Locks" }, { name: "I. Henderson", pos: "Locks" },
        { name: "P. O'Mahony", pos: "Back Row" }, { name: "J. van der Flier", pos: "Back Row" }, { name: "C. Doris", pos: "Back Row" }, { name: "J. Conan", pos: "Back Row" },
        { name: "J. Gibson-Park", pos: "Scrum Halves" }, { name: "C. Murray", pos: "Scrum Halves" },
        { name: "J. Sexton", pos: "Fly Halves" }, { name: "J. Crowley", pos: "Fly Halves" },
        { name: "B. Aki", pos: "Centres" }, { name: "G. Ringrose", pos: "Centres" }, { name: "S. McCloskey", pos: "Centres" },
        { name: "J. Lowe", pos: "Back Three" }, { name: "M. Hansen", pos: "Back Three" }, { name: "H. Keenan", pos: "Back Three" }
    ], baseRatings: { "J. Sexton": 92, "T. Furlong": 90, "B. Aki": 89, "J. van der Flier": 89 }, careerRatings: { "J. Sexton": 95, "T. Furlong": 94, "B. Aki": 92, "J. van der Flier": 93 } },

    { country: "Australia", year: "1999", flag: "🇦🇺", squad: [
        { name: "E. McKenzie", pos: "Props" }, { name: "A. Baxter", pos: "Props" }, { name: "G. Panoho", pos: "Props" }, { name: "D. Crowley", pos: "Props" },
        { name: "P. Kearns", pos: "Hookers" }, { name: "M. Foley", pos: "Hookers" },
        { name: "J. Eales", pos: "Locks" }, { name: "N. Sharpe", pos: "Locks" }, { name: "D. Giffin", pos: "Locks" },
        { name: "O. Finegan", pos: "Back Row" }, { name: "G. Smith", pos: "Back Row" }, { name: "T. Kefu", pos: "Back Row" }, { name: "M. Cockbain", pos: "Back Row" },
        { name: "G. Gregan", pos: "Scrum Halves" }, { name: "C. Whitaker", pos: "Scrum Halves" },
        { name: "S. Larkham", pos: "Fly Halves" }, { name: "E. Flatley", pos: "Fly Halves" },
        { name: "T. Horan", pos: "Centres" }, { name: "S. Mortlock", pos: "Centres" }, { name: "N. Grey", pos: "Centres" },
        { name: "D. Campese", pos: "Back Three" }, { name: "B. Tune", pos: "Back Three" }, { name: "C. Latham", pos: "Back Three" }
    ], baseRatings: { "J. Eales": 94, "G. Gregan": 93, "T. Horan": 92, "S. Larkham": 91 }, careerRatings: { "J. Eales": 97, "G. Gregan": 96, "T. Horan": 95, "S. Larkham": 94 } },

    { country: "Wales", year: "2012", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", squad: [
        { name: "G. Jenkins", pos: "Props" }, { name: "A. Jones", pos: "Props" }, { name: "P. James", pos: "Props" }, { name: "R. Gill", pos: "Props" },
        { name: "M. Rees", pos: "Hookers" }, { name: "R. Hibbard", pos: "Hookers" },
        { name: "A.W. Jones", pos: "Locks" }, { name: "I. Evans", pos: "Locks" }, { name: "L. Charteris", pos: "Locks" },
        { name: "D. Lydiate", pos: "Back Row" }, { name: "S. Warburton", pos: "Back Row" }, { name: "T. Faletau", pos: "Back Row" }, { name: "J. Tipuric", pos: "Back Row" },
        { name: "M. Phillips", pos: "Scrum Halves" }, { name: "L. Williams", pos: "Scrum Halves" },
        { name: "R. Priestland", pos: "Fly Halves" }, { name: "J. Hook", pos: "Fly Halves" },
        { name: "J. Roberts", pos: "Centres" }, { name: "J. Davies", pos: "Centres" }, { name: "S. Williams", pos: "Centres" },
        { name: "S. Williams ", pos: "Back Three" }, { name: "G. North", pos: "Back Three" }, { name: "L. Halfpenny", pos: "Back Three" }
    ], baseRatings: { "A.W. Jones": 91, "S. Warburton": 90, "T. Faletau": 89, "L. Halfpenny": 89 }, careerRatings: { "A.W. Jones": 95, "S. Warburton": 93, "T. Faletau": 93, "L. Halfpenny": 92 } }
];

let userTeam = {};
let currentSpunSquad = [];
let selectedPlayer = null;
let respinsLeft = 0;
let isKnowledgeMode = false;
let isCareerMode = false;
let spotsFilledCount = 0;
let playerSelectedFromCurrentPool = false;

// Keeps track of already drafted players to prevent duplicates
let draftedPlayersBlacklist = [];

// DOM Element Selectors
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

document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("start-game-btn");
    
    if (startGameBtn) {
        startGameBtn.textContent = "Start drafting my team";

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

// Check if all spots for a general position family are full
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
    
    flagIndicator.textContent = ""; 
    statusText.textContent = "";
    spinnerAnchor.innerHTML = '<div class="rugby-ball-spinner">🏉</div>';

    setTimeout(() => {
        spinnerAnchor.innerHTML = ''; 
        spinBtn.classList.remove("disabled"); spinBtn.disabled = false;
        
        const rolledNation = historicalNations[Math.floor(Math.random() * historicalNations.length)];
        flagIndicator.textContent = rolledNation.flag;
        
        // Output detailed branding info
        statusText.textContent = `${rolledNation.country.toUpperCase()} (${rolledNation.year}) Pool opened. Choose ONE player.`;
        
        currentSpunSquad = [];
        
        displayOrder.forEach(posGroup => {
            const rawMembers = rolledNation.squad.filter(p => p.pos === posGroup);
            rawMembers.forEach(member => {
                let rating = 82 + Math.floor(Math.random() * 5);
                const rMatrix = isCareerMode ? rolledNation.careerRatings : rolledNation.baseRatings;
                if (rMatrix && rMatrix[member.name] !== undefined) {
                    rating = rMatrix[member.name];
                }

                currentSpunSquad.push({
                    name: member.name,
                    pos: posGroup,
                    rating: rating
                });
            });
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
        
        // Lockout rule 1: Player already selected previously
        const isBlacklisted = draftedPlayersBlacklist.includes(player.name);
        // Lockout rule 2: Position category filled entirely on user pitch
        const isRoleGroupFull = isPositionFamilyFullyOccupied(player.pos);

        if (playerSelectedFromCurrentPool) {
            row.classList.add("claimed-lockout");
        } else if (isBlacklisted) {
            row.classList.add("claimed-lockout");
            row.title = "Player already drafted in your squad";
        } else if (isRoleGroupFull) {
            row.classList.add("position-filled-lockout");
            row.title = `Your team's ${player.pos} slots are already fully occupied`;
        }

        const n = document.createElement("span"); n.className = "player-name"; n.textContent = player.name;
        const r = document.createElement("span"); r.className = "player-rating"; r.textContent = isKnowledgeMode ? "??" : player.rating;

        row.appendChild(n); row.appendChild(r); block.appendChild(row);

        row.addEventListener("click", () => {
            if (playerSelectedFromCurrentPool || isBlacklisted || isRoleGroupFull) return;
            
            // Toggle Deselection System Strategy
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
        let penaltyDesc = "";

        if (selectedPlayer.pos === "Props" && bPos === "Loosehead Prop" && Math.random() > 0.7) {
            finalValue -= 4; penaltyActive = true;
            penaltyDesc = "Tactical adjustment: Loosehead offset drops OVR by 4.";
        }

        userTeam[bPos] = { name: selectedPlayer.name, score: finalValue };
        draftedPlayersBlacklist.push(selectedPlayer.name); // Avoid duplicate picks
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

// Structural Order mapping to sort the final list output by position chronology
const chronologicalFieldPositions = [
    "Loosehead Prop", "Hooker", "Tighthead Prop",
    "Lock 4", "Lock 5",
    "Blindside Flanker", "Openside Flanker", "Number 8",
    "Scrum-half", "Fly-half",
    "Left Wing", "Inside Centre", "Outside Centre", "Right Wing", "Fullback"
];

function populateManifestPreviewWindow() {
    const windowContainer = document.getElementById("manifest-team-box");
    if (!windowContainer) return;
    
    windowContainer.innerHTML = "";
    
    // Add overall layout average header metrics block
    const avgScore = getGlobalTeamAverage();
    const summaryHeader = document.createElement("div");
    summaryHeader.className = "manifest-summary-header";
    summaryHeader.innerHTML = `<h3>Final Draft Summary</h3> <span>OVR: ${avgScore}</span>`;
    windowContainer.appendChild(summaryHeader);
    
    const table = document.createElement("table");
    table.style.width = "100%"; table.style.borderCollapse = "collapse"; table.style.fontSize = "0.9rem";

    // Loop using chronological ordered arrays to keep rows fixed cleanly
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
}

const runSimBtn = document.getElementById("run-sim-btn");
if (runSimBtn) {
    runSimBtn.addEventListener("click", () => {
        const squadOvr = getGlobalTeamAverage();
        const logs = document.getElementById("sim-results");
        
        runSimBtn.classList.add("disabled"); runSimBtn.disabled = true;
        // Adjusted branding names for compliance logs stream
        if (logs) logs.innerHTML = `<span class="sim-log-line">Kicking off World Cup Finals stream... [Draft XV Rating: OVR ${squadOvr}]</span><br>`;

        const matches = [
            { name: "POOL STAGE MATCH", opp: "Samoa", rtg: 75 },
            { name: "POOL STAGE FIXTURE", opp: "USA", rtg: 72 },
            { name: "QUARTER FINAL", opp: "England", rtg: 89 },
            { name: "SEMI FINAL", opp: "Ireland", rtg: 92 },
            { name: "WORLD CUP FINAL", opp: "New Zealand", rtg: 95 }
        ];

        let currentStep = 0;
        function executeStep() {
            if (currentStep >= matches.length) {
                if (logs) logs.innerHTML += `<br><span class="sim-log-line" style="color:var(--brand-gold); font-weight:bold;">🏆 THE FINAL WHISTLE: DRAFT XV WINS THE WORLD CUP!</span>`;
                const rBtn = document.getElementById("restart-btn");
                if (rBtn) rBtn.classList.remove("hidden");
                return;
            }

            const m = matches[currentStep];
            if (logs) {
                logs.innerHTML += `<span class="sim-log-line" style="color:var(--text-muted);">Running ${m.name} vs ${m.opp}...</span>`;
                logs.scrollTop = logs.scrollHeight;
            }

            setTimeout(() => {
                const spread = squadOvr - m.rtg;
                let userScore = generateLawfulRugbyScore(spread, true);
                let oppScore = generateLawfulRugbyScore(spread, false);

                if (userScore === oppScore) userScore += Math.random() > 0.5 ? 3 : 5;
                
                // Realigned team output designation to "Draft XV"
                if (logs) logs.innerHTML += `<span class="sim-log-line" style="color:#ffffff; font-weight:bold;">FT: Draft XV ${userScore} - ${oppScore} ${m.opp}</span>`;
                
                if (userScore <= oppScore) {
                    if (logs) logs.innerHTML += `<br><span class="sim-log-line" style="color:#ef4444; font-weight:bold;">❌ KNOCKOUT DEFEAT. Your tournament is over.</span>`;
                    const rBtn = document.getElementById("restart-btn");
                    if (rBtn) rBtn.classList.remove("hidden");
                    return;
                }

                currentStep++;
                executeStep();
            }, 1200);
        }
        executeStep();
    });
}

const restartBtn = document.getElementById("restart-btn");
if (restartBtn) {
    restartBtn.addEventListener("click", () => { location.reload(); });
}
