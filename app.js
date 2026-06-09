// GLOBAL CONFIGURATION MATRIX & POSITION FAMILIES
const positionFamilies = {
    "Loosehead Prop": "Props", "Tighthead Prop": "Props", "Hooker": "Hooker",
    "Lock 4": "Second Rows", "Lock 5": "Second Rows", "Blindside Flanker": "Back Row",
    "Openside Flanker": "Back Row", "Number 8": "Back Row", "Scrum-half": "Scrum Halves",
    "Fly-half": "Fly Halves", "Inside Centre": "Centres", "Outside Centre": "Centres",
    "Left Wing": "Back Three", "Right Wing": "Back Three", "Fullback": "Back Three",
    "Repl. Hooker": "Bench Forwards", "Repl. Prop 1": "Bench Forwards", "Repl. Prop 2": "Bench Forwards",
    "Repl. Lock": "Bench Forwards", "Repl. Back Row": "Bench Forwards",
    "Repl. Scrum-half": "Bench Backs", "Repl. Back Utility 1": "Bench Backs", "Repl. Back Utility 2": "Bench Backs"
};

const forwardPositions = ["Loosehead Prop", "Tighthead Prop", "Hooker", "Lock 4", "Lock 5", "Blindside Flanker", "Openside Flanker", "Number 8", "Repl. Hooker", "Repl. Prop 1", "Repl. Prop 2", "Repl. Lock", "Repl. Back Row"];
const backPositions = ["Scrum-half", "Fly-half", "Inside Centre", "Outside Centre", "Left Wing", "Right Wing", "Fullback", "Repl. Scrum-half", "Repl. Back Utility 1", "Repl. Back Utility 2"];

// 23-MAN HISTORIC ROSTERS W/ ELITE BALANCING OVERHAULS
const historicalNations = [
    { 
        country: "New Zealand", flag: "🇳🇿", tier: 1, 
        dynamicSquad: { 
            "Props": ["T. Woodcock", "O. Franks"], "Hooker": ["K. Mealamu"], "Second Rows": ["B. Retallick", "S. Whitelock"], "Back Row": ["J. Kaino", "R. McCaw", "K. Read"], 
            "Scrum Halves": ["A. Smith"], "Fly Halves": ["D. Carter"], "Centres": ["M. Nonu", "C. Smith"], "Back Three": ["J. Savea", "B. Smith", "J. Lomu"],
            "Bench Forwards": ["D. Coles", "W. Crockett", "C. Faumuina", "L. Romano"], "Bench Backs": ["V. Vito", "T. Perenara", "B. Barrett", "S.B. Williams"]
        },
        overrideRatings: { "R. McCaw": 98, "D. Carter": 98, "B. Retallick": 95, "J. Lomu": 96, "A. Smith": 94, "B. Barrett": 93 }
    },
    { 
        country: "South Africa", flag: "🇿🇦", tier: 1, 
        dynamicSquad: { 
            "Props": ["O. du Randt", "F. Malherbe"], "Hooker": ["B. du Plessis"], "Second Rows": ["E. Etzebeth", "V. Matfield"], "Back Row": ["S. Burger", "S. Kolisi", "D. Vermeulen"], 
            "Scrum Halves": ["F. de Klerk"], "Fly Halves": ["H. Pollard"], "Centres": ["D. de Allende", "L. Am"], "Back Three": ["B. Habana", "C. Kolbe", "P. Montgomery"],
            "Bench Forwards": ["M. Marx", "S. Kitshoff", "V. Koch", "R. Snyman"], "Bench Backs": ["P.S. du Toit", "H. Jantjies", "F. Steyn", "D. Willemse"]
        },
        overrideRatings: { "B. Habana": 95, "E. Etzebeth": 96, "V. Matfield": 95, "O. du Randt": 94, "S. Burger": 93, "C. Kolbe": 93 }
    },
    { 
        country: "England", flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E006E}\u{E0067}\u{E007F}", tier: 1, 
        dynamicSquad: { 
            "Props": ["P. Vickery", "J. Leonard"], "Hooker": ["S. Thompson"], "Second Rows": ["M. Johnson", "B. Kay"], "Back Row": ["R. Hill", "N. Back", "L. Dallaglio"], 
            "Scrum Halves": ["M. Dawson"], "Fly Halves": ["J. Wilkinson"], "Centres": ["W. Greenwood", "M. Tindall"], "Back Three": ["J. Robinson", "B. Cohen", "M. Cueto"],
            "Bench Forwards": ["D. West", "T. Woodman", "J. White", "S. Shaw"], "Bench Backs": ["L. Moody", "A. Gomarsall", "P. Grayson"], "Bench Backs": ["I. Balshaw"]
        },
        overrideRatings: { "J. Wilkinson": 97, "M. Johnson": 95, "J. Robinson": 93, "L. Dallaglio": 92, "N. Back": 91, "R. Hill": 90, "S. Thompson": 91, "B. Cohen": 88 }
    },
    { 
        country: "France", flag: "🇫🇷", tier: 1, 
        dynamicSquad: { 
            "Props": ["S. Marconnet", "N. Mas"], "Hooker": ["W. Servat"], "Second Rows": ["F. Pelous", "L. Nallet"], "Back Row": ["T. Dusautoir", "I. Harinordoquy", "G. Alldritt"], 
            "Scrum Halves": ["A. Dupont"], "Fly Halves": ["F. Michalak"], "Centres": ["Y. Jauzion", "G. Fickou"], "Back Three": ["V. Clerc", "D. Penaud", "T. Ramos"],
            "Bench Forwards": ["P. Bourgarit", "C. Baille"], "Bench Forwards": ["R. Slimani", "C. Taofifénua", "C. Ollivon"], "Bench Backs": ["M. Lucu", "R. Ntamack", "D. circuitry"]
        },
        overrideRatings: { "A. Dupont": 97, "T. Dusautoir": 94, "F. Pelous": 93, "Y. Jauzion": 92, "D. Penaud": 91 }
    },
    { 
        country: "Ireland", flag: "☘️\u{1F3F3}\u{FE0F}", tier: 1, 
        dynamicSquad: { 
            "Props": ["A. Porter", "T. Furlong"], "Hooker": ["D. Sheehan"], "Second Rows": ["P. O'Connell", "J. Ryan"], "Back Row": ["P. O'Mahony", "J. van der Flier", "C. Doris"], 
            "Scrum Halves": ["J. Gibson-Park"], "Fly Halves": ["J. Sexton"], "Centres": ["B. O'Driscoll", "B. Aki"], "Back Three": ["M. Hansen", "J. Lowe", "H. Keenan"],
            "Bench Forwards": ["R. Kelleher", "C. Healy", "Finlay Bealham", "I. Henderson"], "Bench Backs": ["Jack Conan", "C. Murray", "J. Crowley", "G. Ringrose"]
        },
        overrideRatings: { "B. O'Driscoll": 97, "J. Sexton": 95, "P. O'Connell": 94, "T. Furlong": 93, "J. van der Flier": 92, "C. Doris": 92 }
    },
    { 
        country: "Australia", flag: "🇦🇺", tier: 1, 
        dynamicSquad: { 
            "Props": ["E. McKenzie", "A. Baxter"], "Hooker": ["P. Kearns"], "Second Rows": ["J. Eales", "N. Sharpe"], "Back Row": ["O. Finegan", "G. Smith", "T. Kefu"], 
            "Scrum Halves": ["G. Gregan"], "Fly Halves": ["S. Larkham"], "Centres": ["T. Horan", "S. Mortlock"], "Back Three": ["D. Campese", "L. Tuqiri", "C. Latham"],
            "Bench Forwards": ["B. Cannon"], "Bench Forwards": ["D. Crowley", "A. Alaalatoa", "R. Simmons", "W. Palu"], "Bench Backs": ["W. Genia", "Q. Cooper", "A. Ashley-Cooper"]
        },
        overrideRatings: { "J. Eales": 96, "G. Gregan": 95, "T. Horan": 94, "S. Larkham": 93, "D. Campese": 95, "G. Smith": 92 }
    }
];

const displayOrder = ["Props", "Hooker", "Second Rows", "Back Row", "Scrum Halves", "Fly Halves", "Centres", "Back Three", "Bench Forwards", "Bench Backs"];

let userTeam = {};
let currentSpunSquad = [];
let selectedPlayer = null;
let respinsLeft = 0;
let isKnowledgeMode = false;
let isCareerMode = false;
let spotsFilledCount = 0;

// LOCK TRACKING ARRAYS: Prevents older spins from altering positions
let permanentlyLockedPositions = new Set();
let activeSpinSessionSelections = new Set();

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

// APPLICATION SETUP TRIGGERS
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
    const opt0 = document.getElementById(optionIds[0]);
    const opt1 = document.getElementById(optionIds[1]);
    let activeIndex = 0;
    function updateUI(idx) {
        activeIndex = idx;
        if (idx === 0) { track.classList.remove("right-state"); opt0.classList.add("active"); opt1.classList.remove("active"); }
        else { track.classList.add("right-state"); opt0.classList.remove("active"); opt1.classList.add("active"); }
        onChange(activeIndex);
    }
    track.addEventListener("click", () => updateUI(activeIndex === 0 ? 1 : 0));
}

document.getElementById("start-game-btn").addEventListener("click", () => {
    const difficultySetting = document.querySelector('input[name="difficulty"]:checked').value;
    respinsLeft = difficultySetting === "easy" ? 3 : difficultySetting === "normal" ? 1 : 0;
    respinCountText.textContent = respinsLeft;
    setupCard.classList.add("hidden");
    draftDashboard.classList.remove("hidden");
    recalculateDashboardAverages();
});

// CORE SPIN ENGINE W/ SPINNING BALL VISUAL EFFECTS
spinBtn.addEventListener("click", () => {
    // Commit previous picks permanently so they can no longer be modified
    activeSpinSessionSelections.forEach(pos => {
        permanentlyLockedPositions.add(pos);
    });
    activeSpinSessionSelections.clear();

    selectedPlayer = null;
    spinBtn.classList.add("disabled"); spinBtn.disabled = true;
    respinBtn.classList.add("disabled"); respinBtn.disabled = true;
    rosterContainer.innerHTML = ""; rosterContainer.classList.add("locked");
    
    flagIndicator.textContent = ""; 
    statusText.textContent = "Spinning the historic registry...";
    spinnerAnchor.innerHTML = '<div class="rugby-ball-spinner">🏉</div>';

    setTimeout(() => {
        spinnerAnchor.innerHTML = ''; 
        spinBtn.classList.remove("disabled"); spinBtn.disabled = false;
        
        const rolledNation = historicalNations[Math.floor(Math.random() * historicalNations.length)];
        flagIndicator.textContent = rolledNation.flag;
        statusText.textContent = `${rolledNation.country.toUpperCase()} Pool opened. Select one player to place into an eligible slot.`;
        
        currentSpunSquad = [];
        let baseMod = rolledNation.tier === 1 ? 86 : 76;

        displayOrder.forEach(posGroup => {
            const names = rolledNation.dynamicSquad[posGroup] || [];
            names.forEach(realName => {
                let rating = baseMod + Math.floor(Math.random() * 5);
                if (rolledNation.overrideRatings && rolledNation.overrideRatings[realName] !== undefined) {
                    rating = rolledNation.overrideRatings[realName];
                }
                currentSpunSquad.push({
                    name: realName, 
                    pos: posGroup,
                    rating: isCareerMode ? rating + 3 : rating
                });
            });
        });

        renderRosterList();
        rosterContainer.classList.remove("locked");
        if (respinsLeft > 0) { respinBtn.classList.remove("disabled"); respinBtn.disabled = false; }
    }, 900);
});

function renderRosterList() {
    rosterContainer.innerHTML = "";
    let currentCategory = ""; let block = null;

    // Filter out players already taken in the final team line-up
    const takenNames = Object.values(userTeam).map(p => p.name);
    const availablePlayers = currentSpunSquad.filter(p => !takenNames.includes(p.name));

    availablePlayers.forEach(player => {
        if (player.pos !== currentCategory) {
            currentCategory = player.pos;
            block = document.createElement("div"); block.className = "roster-group";
            const head = document.createElement("div"); head.className = "group-header"; head.textContent = currentCategory;
            block.appendChild(head); rosterContainer.appendChild(block);
        }

        const row = document.createElement("div"); row.className = "player-row";
        const n = document.createElement("span"); n.className = "player-name"; n.textContent = player.name;
        const r = document.createElement("span"); r.className = "player-rating"; r.textContent = isKnowledgeMode ? "??" : player.rating;

        row.appendChild(n); row.appendChild(r); block.appendChild(row);

        row.addEventListener("click", () => {
            document.querySelectorAll(".player-row").forEach(el => el.classList.remove("selected"));
            row.classList.add("selected"); 
            selectedPlayer = player;
            evaluateEligibilityCircles(player);
        });
    });
}

function evaluateEligibilityCircles(player) {
    pitchCircles.forEach(circle => {
        circle.classList.remove("highlight-eligible");
        const bPos = circle.dataset.pos;
        if (permanentlyLockedPositions.has(bPos)) return; // Lock check
        if (positionFamilies[bPos] === player.pos) circle.classList.add("highlight-eligible");
    });
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

    document.getElementById("avg-global-ovr").textContent = tCount > 0 ? Math.round(tSum / tCount) : "--";
    document.getElementById("avg-forward-ovr").textContent = fCount > 0 ? Math.round(fSum / fCount) : "--";
    document.getElementById("avg-back-ovr").textContent = bCount > 0 ? Math.round(bSum / bCount) : "--";
}

// CLICK INTERACTION: SELECTION AND ROLLBACK MECHANICS
pitchCircles.forEach(node => {
    node.addEventListener("click", () => {
        const bPos = node.dataset.pos;

        // PERMANENT LOCK CHECK
        if (permanentlyLockedPositions.has(bPos)) {
            statusText.textContent = "This player was locked in from a previous spin and cannot be changed.";
            return;
        }

        // ROLLBACK / UNSELECT: Allowed since player belongs to the current spin pool
        if (node.classList.contains("occupied")) {
            const removedName = userTeam[bPos].name;
            delete userTeam[bPos];
            spotsFilledCount--;
            activeSpinSessionSelections.delete(bPos);

            node.classList.remove("occupied");
            node.innerHTML = "";
            
            recalculateDashboardAverages();
            statusText.textContent = `Returned ${removedName} to selection list.`;
            renderRosterList();
            return;
        }

        if (!selectedPlayer) return;
        if (positionFamilies[bPos] !== selectedPlayer.pos) return;

        let finalValue = selectedPlayer.rating;
        let penaltyTag = false;
        let penaltyDesc = "";

        // Positional variance calculation offsets
        if (selectedPlayer.pos === "Props" && bPos === "Loosehead Prop" && Math.random() > 0.6) {
            finalValue -= 4; penaltyTag = true;
            penaltyDesc = "Loosehead Prop offset variance: OVR drops by 4.";
        }
        if (selectedPlayer.pos === "Back Row") {
            if (bPos === "Number 8" && Math.random() > 0.5) {
                finalValue -= 5; penaltyTag = true;
                penaltyDesc = "Flanker shifted to Number 8 core anchor: OVR drops by 5.";
            }
        }

        userTeam[bPos] = { name: selectedPlayer.name, score: finalValue };
        activeSpinSessionSelections.add(bPos);
        spotsFilledCount++;

        node.classList.add("occupied");
        node.innerHTML = `<div class="circle-num">${finalValue}</div><div class="circle-name">${selectedPlayer.name}</div>`;

        if (penaltyTag) {
            const badge = document.createElement("div"); badge.className = "penalty-tag"; badge.textContent = "OVR -";
            const box = document.createElement("span"); box.className = "tooltip-box"; box.textContent = penaltyDesc;
            badge.appendChild(box); node.appendChild(badge);
        }

        selectedPlayer = null;
        pitchCircles.forEach(c => c.classList.remove("highlight-eligible"));
        recalculateDashboardAverages();
        renderRosterList(); // Redraw menu cleanly to obscure selected options

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

// SIMULATION ENGINE WINDOW RENDERING
function populateManifestPreviewWindow() {
    const windowContainer = document.getElementById("manifest-team-box");
    windowContainer.innerHTML = "<h3>Your Selected XV Lineup</h3>";
    
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";
    table.style.fontSize = "0.8rem";

    for (let pos in userTeam) {
        const row = document.createElement("tr");
        row.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
        
        const tdPos = document.createElement("td");
        tdPos.style.padding = "4px"; tdPos.style.color = "#c99738"; tdPos.textContent = pos;
        
        const tdName = document.createElement("td");
        tdName.style.padding = "4px"; tdName.textContent = userTeam[pos].name;
        
        const tdScore = document.createElement("td");
        tdScore.style.padding = "4px"; tdScore.style.textAlign = "right"; tdScore.textContent = userTeam[pos].score;

        row.appendChild(tdPos); row.appendChild(tdName); row.appendChild(tdScore);
        table.appendChild(row);
    }
    windowContainer.appendChild(table);
}

document.getElementById("run-sim-btn").addEventListener("click", () => {
    let sum = 0; for (let k in userTeam) sum += userTeam[k].score;
    const squadOvr = Math.round(sum / 15);
    const logs = document.getElementById("sim-results");
    
    document.getElementById("run-sim-btn").classList.add("disabled");
    logs.innerHTML = `<span class="sim-log-line">Starting Tournament Schedule with ${squadOvr} OVR Match Weight...</span><br>`;

    const matches = [
        { name: "POOL FIXTURE 1", opp: "🇼🇸 Samoa", rtg: 74 },
        { name: "POOL FIXTURE 2", opp: "🇫🇷 France", rtg: 88 },
        { name: "QUARTER FINAL", opp: "🇦🇺 Australia", rtg: 89 },
        { name: "SEMI FINAL", opp: "🇮🇪 Ireland", rtg: 92 },
        { name: "WORLD CUP FINAL", opp: "🇳🇿 New Zealand", rtg: 95 }
    ];

    let currentStep = 0;
    function executeStep() {
        if (currentStep >= matches.length) {
            logs.innerHTML += `<br><span class="sim-log-line" style="color:#
