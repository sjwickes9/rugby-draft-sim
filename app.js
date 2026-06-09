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

const forwardPositions = ["Loosehead Prop", "Tighthead Prop", "Hooker", "Lock 4", "Lock 5", "Blindside Flanker", "Openside Flanker", "Number 8"];
const backPositions = ["Scrum-half", "Fly-half", "Inside Centre", "Outside Centre", "Left Wing", "Right Wing", "Fullback"];

// 23-MAN ROSTERS W/ MASTER ROLES
const historicalNations = [
    { 
        country: "New Zealand", flag: "[NZ]", tier: 1, 
        dynamicSquad: { 
            "Props": ["T. Woodcock", "O. Franks"], "Hooker": ["K. Mealamu"], "Second Rows": ["B. Retallick", "S. Whitelock"], "Back Row": ["J. Kaino", "R. McCaw", "K. Read"], 
            "Scrum Halves": ["A. Smith"], "Fly Halves": ["D. Carter"], "Centres": ["M. Nonu", "C. Smith"], "Back Three": ["J. Savea", "B. Smith", "J. Lomu"],
            "Bench Forwards": ["D. Coles", "W. Crockett", "C. Faumuina", "L. Romano"], "Bench Backs": ["V. Vito", "T. Perenara", "B. Barrett", "S.B. Williams"]
        },
        baseRatings: { "R. McCaw": 94, "D. Carter": 95, "B. Retallick": 91, "J. Lomu": 93, "A. Smith": 90, "B. Barrett": 89 },
        careerRatings: { "R. McCaw": 98, "D. Carter": 98, "B. Retallick": 95, "J. Lomu": 96, "A. Smith": 94, "B. Barrett": 93 },
        canPlayAllBackRow: ["R. McCaw", "K. Read"]
    },
    { 
        country: "South Africa", flag: "[RSA]", tier: 1, 
        dynamicSquad: { 
            "Props": ["O. du Randt", "F. Malherbe"], "Hooker": ["B. du Plessis"], "Second Rows": ["E. Etzebeth", "V. Matfield"], "Back Row": ["S. Burger", "S. Kolisi", "D. Vermeulen"], 
            "Scrum Halves": ["F. de Klerk"], "Fly Halves": ["H. Pollard"], "Centres": ["D. de Allende", "L. Am"], "Back Three": ["B. Habana", "C. Kolbe", "P. Montgomery"],
            "Bench Forwards": ["M. Marx", "S. Kitshoff", "V. Koch", "R. Snyman"], "Bench Backs": ["P.S. du Toit", "H. Jantjies", "F. Steyn", "D. Willemse"]
        },
        baseRatings: { "B. Habana": 91, "E. Etzebeth": 92, "V. Matfield": 91, "O. du Randt": 90, "S. Burger": 89, "C. Kolbe": 89 },
        careerRatings: { "B. Habana": 95, "E. Etzebeth": 96, "V. Matfield": 95, "O. du Randt": 94, "S. Burger": 93, "C. Kolbe": 93 },
        canPlayAllBackRow: ["P.S. du Toit", "S. Burger"]
    },
    { 
        country: "England", flag: "[ENG]", tier: 1, 
        dynamicSquad: { 
            "Props": ["P. Vickery", "J. Leonard"], "Hooker": ["S. Thompson"], "Second Rows": ["M. Johnson", "B. Kay"], "Back Row": ["R. Hill", "N. Back", "L. Dallaglio"], 
            "Scrum Halves": ["M. Dawson"], "Fly Halves": ["J. Wilkinson"], "Centres": ["W. Greenwood", "M. Tindall"], "Back Three": ["J. Robinson", "B. Cohen", "M. Cueto"],
            "Bench Forwards": ["D. West", "T. Woodman", "J. White", "S. Shaw"], "Bench Backs": ["L. Moody", "A. Gomarsall", "P. Grayson", "I. Balshaw"]
        },
        baseRatings: { "J. Wilkinson": 93, "M. Johnson": 91, "J. Robinson": 89, "L. Dallaglio": 89, "N. Back": 88, "R. Hill": 87 },
        careerRatings: { "J. Wilkinson": 97, "M. Johnson": 95, "J. Robinson": 93, "L. Dallaglio": 94, "N. Back": 91, "R. Hill": 90 },
        canPlayAllBackRow: ["L. Dallaglio"]
    },
    { 
        country: "France", flag: "[FRA]", tier: 1, 
        dynamicSquad: { 
            "Props": ["S. Marconnet", "N. Mas"], "Hooker": ["W. Servat"], "Second Rows": ["F. Pelous", "L. Nallet"], "Back Row": ["T. Dusautoir", "I. Harinordoquy", "G. Alldritt"], 
            "Scrum Halves": ["A. Dupont"], "Fly Halves": ["F. Michalak"], "Centres": ["Y. Jauzion", "G. Fickou"], "Back Three": ["V. Clerc", "D. Penaud", "T. Ramos"],
            "Bench Forwards": ["P. Bourgarit", "C. Baille", "R. Slimani", "C. Taofifénua"], "Bench Backs": ["C. Ollivon", "M. Lucu", "R. Ntamack", "D. Yachvili"]
        },
        baseRatings: { "A. Dupont": 94, "T. Dusautoir": 90, "F. Pelous": 89, "Y. Jauzion": 88, "D. Penaud": 87 },
        careerRatings: { "A. Dupont": 97, "T. Dusautoir": 94, "F. Pelous": 93, "Y. Jauzion": 92, "D. Penaud": 91 },
        canPlayAllBackRow: ["T. Dusautoir", "G. Alldritt"]
    },
    { 
        country: "Ireland", flag: "[IRE]", tier: 1, 
        dynamicSquad: { 
            "Props": ["A. Porter", "T. Furlong"], "Hooker": ["D. Sheehan"], "Second Rows": ["P. O'Connell", "J. Ryan"], "Back Row": ["P. O'Mahony", "J. van der Flier", "C. Doris"], 
            "Scrum Halves": ["J. Gibson-Park"], "Fly Halves": ["J. Sexton"], "Centres": ["B. O'Driscoll", "B. Aki"], "Back Three": ["M. Hansen", "J. Lowe", "H. Keenan"],
            "Bench Forwards": ["R. Kelleher", "C. Healy", "F. Bealham", "I. Henderson"], "Bench Backs": ["J. Conan", "C. Murray", "J. Crowley", "G. Ringrose"]
        },
        baseRatings: { "B. O'Driscoll": 93, "J. Sexton": 91, "P. O'Connell": 90, "T. Furlong": 89, "J. van der Flier": 88 },
        careerRatings: { "B. O'Driscoll": 97, "J. Sexton": 95, "P. O'Connell": 94, "T. Furlong": 93, "J. van der Flier": 92 },
        canPlayAllBackRow: ["C. Doris", "J. Conan"]
    },
    { 
        country: "Australia", flag: "[AUS]", tier: 1, 
        dynamicSquad: { 
            "Props": ["E. McKenzie", "A. Baxter"], "Hooker": ["P. Kearns"], "Second Rows": ["J. Eales", "N. Sharpe"], "Back Row": ["O. Finegan", "G. Smith", "T. Kefu"], 
            "Scrum Halves": ["G. Gregan"], "Fly Halves": ["S. Larkham"], "Centres": ["T. Horan", "S. Mortlock"], "Back Three": ["D. Campese", "L. Tuqiri", "C. Latham"],
            "Bench Forwards": ["B. Cannon", "D. Crowley", "A. Alaalatoa", "R. Simmons"], "Bench Backs": ["W. Palu", "W. Genia", "Q. Cooper", "A. Ashley-Cooper"]
        },
        baseRatings: { "J. Eales": 92, "G. Gregan": 91, "T. Horan": 90, "S. Larkham": 89, "D. Campese": 91 },
        careerRatings: { "J. Eales": 96, "G. Gregan": 95, "T. Horan": 94, "S. Larkham": 93, "D. Campese": 95 },
        canPlayAllBackRow: ["G. Smith"]
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
let playerSelectedFromCurrentPool = false;

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

// Make sure setup button text matches prompt updates
const startGameBtn = document.getElementById("start-game-btn");
if (startGameBtn) {
    startGameBtn.textContent = "Draft my team";
}

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
    track.addEventListener("click", () => {
        activeIndex = activeIndex === 0 ? 1 : 0;
        if (activeIndex === 0) { track.classList.remove("right-state"); opt0.classList.add("active"); opt1.classList.remove("active"); }
        else { track.classList.add("right-state"); opt0.classList.remove("active"); opt1.classList.add("active"); }
        onChange(activeIndex);
    });
}

if (startGameBtn) {
    startGameBtn.addEventListener("click", () => {
        const difficultySetting = document.querySelector('input[name="difficulty"]:checked').value;
        respinsLeft = difficultySetting === "easy" ? 3 : difficultySetting === "normal" ? 1 : 0;
        respinCountText.textContent = respinsLeft;
        setupCard.classList.add("hidden");
        draftDashboard.classList.remove("hidden");
        recalculateDashboardAverages();
    });
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
    rosterContainer.innerHTML = ""; rosterContainer.classList.add("locked");
    
    flagIndicator.textContent = ""; 
    statusText.textContent = "";
    spinnerAnchor.innerHTML = '<div class="rugby-ball-spinner">🏉</div>';

    setTimeout(() => {
        spinnerAnchor.innerHTML = ''; 
        spinBtn.classList.remove("disabled"); spinBtn.disabled = false;
        
        const rolledNation = historicalNations[Math.floor(Math.random() * historicalNations.length)];
        flagIndicator.textContent = rolledNation.flag;
        statusText.textContent = `${rolledNation.country.toUpperCase()} Pool opened. Select exactly ONE player to claim.`;
        
        currentSpunSquad = [];
        let baseMod = rolledNation.tier === 1 ? 84 : 74;

        displayOrder.forEach(posGroup => {
            const names = rolledNation.dynamicSquad[posGroup] || [];
            names.forEach(realName => {
                let rating = baseMod + Math.floor(Math.random() * 4);
                const ratingMatrix = isCareerMode ? rolledNation.careerRatings : rolledNation.baseRatings;
                if (ratingMatrix && ratingMatrix[realName] !== undefined) {
                    rating = ratingMatrix[realName];
                }

                currentSpunSquad.push({
                    name: realName, 
                    pos: posGroup,
                    rating: rating,
                    crossFunctionalBackRow: (rolledNation.canPlayAllBackRow && rolledNation.canPlayAllBackRow.includes(realName))
                });
            });
        });

        renderRosterList();
        rosterContainer.classList.remove("locked");
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
        if (playerSelectedFromCurrentPool) {
            row.classList.add("claimed-lockout");
        }

        const n = document.createElement("span"); n.className = "player-name"; n.textContent = player.name;
        const r = document.createElement("span"); r.className = "player-rating"; r.textContent = isKnowledgeMode ? "??" : player.rating;

        row.appendChild(n); row.appendChild(r); block.appendChild(row);

        row.addEventListener("click", () => {
            if (playerSelectedFromCurrentPool) return;
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
        if (circle.classList.contains("occupied")) return;
        const bPos = circle.dataset.pos;
        if (positionFamilies[bPos] === player.pos) {
            circle.classList.add("highlight-eligible");
        }
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
            penaltyDesc = "Loosehead Prop tactical offset adjustment: OVR drops by 4.";
        }
        
        if (selectedPlayer.pos === "Back Row" && bPos === "Number 8") {
            if (!selectedPlayer.crossFunctionalBackRow) {
                finalValue -= 5; penaltyActive = true;
                penaltyDesc = "Specialist flanker moved out of position to Number 8: OVR drops by 5.";
            }
        }

        userTeam[bPos] = { name: selectedPlayer.name, score: finalValue };
        spotsFilledCount++;
        playerSelectedFromCurrentPool = true;

        node.classList.add("occupied");
        node.innerHTML = `<div class="circle-num">${finalValue}</div><div class="circle-name">${selectedPlayer.name}</div>`;

        if (penaltyActive) {
            const badge = document.createElement("div"); badge.className = "penalty-tag"; badge.textContent = "OVR -";
            const box = document.createElement("span"); box.className = "tooltip-box"; box.textContent = penaltyDesc;
            badge.appendChild(box); node.appendChild(badge);
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

function populateManifestPreviewWindow() {
    const windowContainer = document.getElementById("manifest-team-box");
    windowContainer.innerHTML = "<h3>Your Final Drafted XV</h3>";
    
    const table = document.createElement("table");
    table.style.width = "100%"; table.style.borderCollapse = "collapse"; table.style.fontSize = "0.8rem";

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

function generateLawfulRugbyScore(weightSpread, isUser) {
    let baseChance = isUser ? 20 + (weightSpread * 1.1) : 15 - (weightSpread * 0.7);
    let scoreTarget = Math.max(0, Math.round(baseChance + (Math.random() * 12 - 6)));
    
    if (scoreTarget < 3) return 0;
    
    let totalScore = 0;
    let tries = 0;
    
    while (scoreTarget >= 5) {
        tries++;
        totalScore += 5;
        scoreTarget -= 7; 
        if (Math.random() > 0.4) {
            totalScore += 2;
        }
    }
    
    while (scoreTarget >= 3) {
        totalScore += 3;
        scoreTarget -= 3;
    }
    
    if (totalScore === 1 || totalScore === 2 || totalScore === 4) {
        return tries > 0 ? 5 : 3;
    }
    
    return totalScore;
}

document.getElementById("run-sim-btn").addEventListener("click", () => {
    let sum = 0; for (let k in userTeam) sum += userTeam[k].score;
    const squadOvr = Math.round(sum / 15);
    const logs = document.getElementById("sim-results");
    
    document.getElementById("run-sim-btn").classList.add("disabled");
    document.getElementById("run-sim-btn").disabled = true;
    logs.innerHTML = `<span class="sim-log-line">Kicking off World Cup Tournament finals stream... [Match Rating: OVR ${squadOvr}]</span><br>`;

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
            logs.innerHTML += `<br><span class="sim-log-line" style="color:#c99738; font-weight:bold;">🏆 THE FINAL WHISTLE: YOU ARE THE WORLD CUP CHAMPIONS!</span>`;
            document.getElementById("restart-btn").classList.remove("hidden");
            return;
        }

        const m = matches[currentStep];
        logs.innerHTML += `<span class="sim-log-line" style="color:var(--text-muted);">Running ${m.name} vs ${m.opp}...</span>`;
        logs.scrollTop = logs.scrollHeight;

        setTimeout(() => {
            const spread = squadOvr - m.rtg;
            let userScore = generateLawfulRugbyScore(spread, true);
            let oppScore = generateLawfulRugbyScore(spread, false);

            if (userScore === oppScore) userScore += Math.random() > 0.5 ? 3 : 5;

            logs.innerHTML += `<span class="sim-log-line" style="color:#f8fafc; font-weight:bold;">FT: Drafted Hybrid XV ${userScore} - ${oppScore} ${m.opp}</span>`;
            
            if (userScore <= oppScore) {
                logs.innerHTML += `<br><span class="sim-log-line" style="color:#ef4444; font-weight:bold;">❌ KNOCKOUT DEFEAT. Your tournament is over.</span>`;
                document.getElementById("restart-btn").classList.remove("hidden");
                return;
            }

            currentStep++;
            executeStep();
        }, 1200);
    }
    executeStep();
});

document.getElementById("restart-btn").addEventListener("click", () => { location.reload(); });
