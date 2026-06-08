const positionFamilies = {
    "Loosehead Prop": "Props", "Tighthead Prop": "Props", "Hooker": "Hooker",
    "Lock 4": "Second Rows", "Lock 5": "Second Rows", "Blindside Flanker": "Back Row",
    "Openside Flanker": "Back Row", "Number 8": "Back Row", "Scrum-half": "Scrum Halves",
    "Fly-half": "Fly Halves", "Inside Centre": "Centres", "Outside Centre": "Centres",
    "Left Wing": "Back Three", "Right Wing": "Back Three", "Fullback": "Back Three"
};

const utilityOverrideMaps = {
    "Beauden Barrett": ["Fly Halves", "Back Three"],
    "Jason Leonard": ["Props"],
    "Frans Steyn": ["Centres", "Back Three"],
    "Matt Giteau": ["Fly Halves", "Centres"]
};

// WORLD CUP ALL-TIME TOURNAMENT DATABASE COHORT
const rugbyDatabase = [
    {
        country: "South Africa", year: 2023,
        players: [
            { name: "Steven Kitshoff", pos: "Props", rating: 92, careerRating: 93 },
            { name: "Frans Malherbe", pos: "Props", rating: 91, careerRating: 92 },
            { name: "Ox Nché", pos: "Props", rating: 90, careerRating: 91 },
            { name: "Bongi Mbonambi", pos: "Hooker", rating: 90, careerRating: 91 },
            { name: "Eben Etzebeth", pos: "Second Rows", rating: 96, careerRating: 97 },
            { name: "Franco Mostert", pos: "Second Rows", rating: 89, careerRating: 90 },
            { name: "RG Snyman", pos: "Second Rows", rating: 91, careerRating: 92 },
            { name: "Siya Kolisi", pos: "Back Row", rating: 93, careerRating: 94 },
            { name: "Pieter-Steph du Toit", pos: "Back Row", rating: 95, careerRating: 96 },
            { name: "Duane Vermeulen", pos: "Back Row", rating: 91, careerRating: 95 },
            { name: "Jasper Wiese", pos: "Back Row", rating: 88, careerRating: 89 },
            { name: "Faf de Klerk", pos: "Scrum Halves", rating: 91, careerRating: 93 },
            { name: "Handré Pollard", pos: "Fly Halves", rating: 92, careerRating: 93 },
            { name: "Manie Libbok", pos: "Fly Halves", rating: 87, careerRating: 88 },
            { name: "Damian de Allende", pos: "Centres", rating: 92, careerRating: 93 },
            { name: "Lukhanyo Am", pos: "Centres", rating: 90, careerRating: 94 },
            { name: "Jesse Kriel", pos: "Centres", rating: 89, careerRating: 90 },
            { name: "Cheslin Kolbe", pos: "Back Three", rating: 94, careerRating: 96 },
            { name: "Kurt-Lee Arendse", pos: "Back Three", rating: 92, careerRating: 92 },
            { name: "Damian Willemse", pos: "Back Three", rating: 90, careerRating: 91 },
            { name: "Willie le Roux", pos: "Back Three", rating: 86, careerRating: 91 }
        ]
    },
    {
        country: "New Zealand", year: 2015,
        players: [
            { name: "Joe Moody", pos: "Props", rating: 88, careerRating: 90 },
            { name: "Owen Franks", pos: "Props", rating: 91, careerRating: 92 },
            { name: "Charlie Faumuina", pos: "Props", rating: 86, careerRating: 88 },
            { name: "Dane Coles", pos: "Hooker", rating: 94, careerRating: 94 },
            { name: "Keven Mealamu", pos: "Hooker", rating: 85, careerRating: 93 },
            { name: "Brodie Retallick", pos: "Second Rows", rating: 97, careerRating: 97 },
            { name: "Sam Whitelock", pos: "Second Rows", rating: 95, careerRating: 95 },
            { name: "Jerome Kaino", pos: "Back Row", rating: 93, careerRating: 94 },
            { name: "Richie McCaw", pos: "Back Row", rating: 98, careerRating: 99 },
            { name: "Kieran Read", pos: "Back Row", rating: 95, careerRating: 96 },
            { name: "Sam Cane", pos: "Back Row", rating: 87, careerRating: 91 },
            { name: "Aaron Smith", pos: "Scrum Halves", rating: 96, careerRating: 96 },
            { name: "Dan Carter", pos: "Fly Halves", rating: 98, careerRating: 99 },
            { name: "Beauden Barrett", pos: "Fly Halves", rating: 91, careerRating: 96 },
            { name: "Ma'a Nonu", pos: "Centres", rating: 96, careerRating: 96 },
            { name: "Conrad Smith", pos: "Centres", rating: 92, careerRating: 93 },
            { name: "Sonny Bill Williams", pos: "Centres", rating: 90, careerRating: 92 },
            { name: "Julian Savea", pos: "Back Three", rating: 95, careerRating: 95 },
            { name: "Ben Smith", pos: "Back Three", rating: 94, careerRating: 94 },
            { name: "Nehe Milner-Skudder", pos: "Back Three", rating: 89, careerRating: 89 }
        ]
    },
    {
        country: "England", year: 2003,
        players: [
            { name: "Trevor Woodman", pos: "Props", rating: 89, careerRating: 89 },
            { name: "Phil Vickery", pos: "Props", rating: 91, careerRating: 92 },
            { name: "Jason Leonard", pos: "Props", rating: 86, careerRating: 94 },
            { name: "Steve Thompson", pos: "Hooker", rating: 91, careerRating: 91 },
            { name: "Martin Johnson", pos: "Second Rows", rating: 98, careerRating: 98 },
            { name: "Ben Kay", pos: "Second Rows", rating: 89, careerRating: 89 },
            { name: "Richard Hill", pos: "Back Row", rating: 94, careerRating: 94 },
            { name: "Neil Back", pos: "Back Row", rating: 92, careerRating: 93 },
            { name: "Lawrence Dallaglio", pos: "Back Row", rating: 95, careerRating: 96 },
            { name: "Matt Dawson", pos: "Scrum Halves", rating: 93, careerRating: 93 },
            { name: "Jonny Wilkinson", pos: "Fly Halves", rating: 99, careerRating: 99 },
            { name: "Mike Catt", pos: "Fly Halves", rating: 85, careerRating: 89 },
            { name: "Mike Tindall", pos: "Centres", rating: 90, careerRating: 90 },
            { name: "Will Greenwood", pos: "Centres", rating: 94, careerRating: 94 },
            { name: "Ben Cohen", pos: "Back Three", rating: 89, careerRating: 90 },
            { name: "Jason Robinson", pos: "Back Three", rating: 96, careerRating: 96 },
            { name: "Josh Lewsey", pos: "Back Three", rating: 91, careerRating: 92 }
        ]
    },
    {
        country: "France", year: 2011,
        players: [
            { name: "Jean-Baptiste Poux", pos: "Props", rating: 85, careerRating: 86 },
            { name: "Nicolas Mas", pos: "Props", rating: 91, careerRating: 92 },
            { name: "William Servat", pos: "Hooker", rating: 90, careerRating: 91 },
            { name: "Dimitri Szarzewski", pos: "Hooker", rating: 86, careerRating: 88 },
            { name: "Lionel Nallet", pos: "Second Rows", rating: 88, careerRating: 90 },
            { name: "Pascal Papé", pos: "Second Rows", rating: 87, careerRating: 89 },
            { name: "Thierry Dusautoir", pos: "Back Row", rating: 96, careerRating: 96 },
            { name: "Julien Bonnaire", pos: "Back Row", rating: 89, careerRating: 91 },
            { name: "Imanol Harinordoquy", pos: "Back Row", rating: 92, careerRating: 93 },
            { name: "Dimitri Yachvili", pos: "Scrum Halves", rating: 91, careerRating: 91 },
            { name: "Morgan Parra", pos: "Fly Halves", rating: 89, careerRating: 91 },
            { name: "François Trinh-Duc", pos: "Fly Halves", rating: 86, careerRating: 88 },
            { name: "Aurélien Rougerie", pos: "Centres", rating: 89, careerRating: 91 },
            { name: "Maxime Mermoz", pos: "Centres", rating: 86, careerRating: 88 },
            { name: "Vincent Clerc", pos: "Back Three", rating: 93, careerRating: 93 },
            { name: "Alexis Palisson", pos: "Back Three", rating: 84, careerRating: 85 },
            { name: "Maxime Médard", pos: "Back Three", rating: 88, careerRating: 90 }
        ]
    },
    {
        country: "Australia", year: 2003,
        players: [
            { name: "Bill Young", pos: "Props", rating: 84, careerRating: 85 },
            { name: "Al Baxter", pos: "Props", rating: 85, careerRating: 87 },
            { name: "Brendan Cannon", pos: "Hooker", rating: 86, careerRating: 87 },
            { name: "Jeremy Paul", pos: "Hooker", rating: 85, careerRating: 90 },
            { name: "Nathan Sharpe", pos: "Second Rows", rating: 90, careerRating: 92 },
            { name: "Justin Harrison", pos: "Second Rows", rating: 86, careerRating: 88 },
            { name: "George Smith", pos: "Back Row", rating: 95, careerRating: 96 },
            { name: "Phil Waugh", pos: "Back Row", rating: 90, careerRating: 91 },
            { name: "David Lyons", pos: "Back Row", rating: 87, careerRating: 89 },
            { name: "George Gregan", pos: "Scrum Halves", rating: 96, careerRating: 97 },
            { name: "Stephen Larkham", pos: "Fly Halves", rating: 95, careerRating: 96 },
            { name: "Matt Giteau", pos: "Centres", rating: 89, careerRating: 94 },
            { name: "Elton Flatley", pos: "Centres", rating: 88, careerRating: 89 },
            { name: "Stirling Mortlock", pos: "Centres", rating: 92, careerRating: 94 },
            { name: "Lote Tuqiri", pos: "Back Three", rating: 91, careerRating: 92 },
            { name: "Wendell Sailor", pos: "Back Three", rating: 88, careerRating: 89 },
            { name: "Mat Rogers", pos: "Back Three", rating: 89, careerRating: 90 }
        ]
    },
    {
        country: "Ireland", year: 2023,
        players: [
            { name: "Andrew Porter", pos: "Props", rating: 92, careerRating: 92 },
            { name: "Tadhg Furlong", pos: "Props", rating: 91, careerRating: 94 },
            { name: "Finlay Bealham", pos: "Props", rating: 85, careerRating: 85 },
            { name: "Dan Sheehan", pos: "Hooker", rating: 93, careerRating: 93 },
            { name: "Rónan Kelleher", pos: "Hooker", rating: 87, careerRating: 87 },
            { name: "Tadhg Beirne", pos: "Second Rows", rating: 92, careerRating: 92 },
            { name: "James Ryan", pos: "Second Rows", rating: 90, careerRating: 92 },
            { name: "Iain Henderson", pos: "Second Rows", rating: 86, careerRating: 89 },
            { name: "Peter O'Mahony", pos: "Back Row", rating: 90, careerRating: 91 },
            { name: "Josh van der Flier", pos: "Back Row", rating: 92, careerRating: 94 },
            { name: "Caelan Doris", pos: "Back Row", rating: 94, careerRating: 94 },
            { name: "Jamison Gibson-Park", pos: "Scrum Halves", rating: 92, careerRating: 92 },
            { name: "Johnny Sexton", pos: "Fly Halves", rating: 94, careerRating: 95 },
            { name: "Bundee Aki", pos: "Centres", rating: 94, careerRating: 94 },
            { name: "Garry Ringrose", pos: "Centres", rating: 91, careerRating: 92 },
            { name: "James Lowe", pos: "Back Three", rating: 91, careerRating: 91 },
            { name: "Mack Hansen", pos: "Back Three", rating: 90, careerRating: 90 },
            { name: "Hugo Keenan", pos: "Back Three", rating: 92, careerRating: 92 }
        ]
    }
];

const displayOrder = ["Props", "Hooker", "Second Rows", "Back Row", "Scrum Halves", "Fly Halves", "Centres", "Back Three"];

let userTeam = {};
let currentSpunSquad = [];
let selectedPlayer = null;
let respinsLeft = 0;
let isKnowledgeMode = false;
let isCareerMode = false;
let spotsFilledCount = 0;
let claimedGlobalRoster = new Set();
let replacedCountryTarget = "South Africa";

const setupCard = document.getElementById("setup-card");
const draftDashboard = document.getElementById("draft-dashboard");
const simDashboard = document.getElementById("sim-dashboard");
const spinBtn = document.getElementById("spin-btn");
const respinBtn = document.getElementById("respin-btn");
const respinCountText = document.getElementById("respin-count");
const rosterContainer = document.getElementById("roster-container");
const spinnerAnchor = document.getElementById("spinner-anchor");
const statusText = document.getElementById("status-text");
const pitchCircles = document.querySelectorAll(".pitch-circle");

setupSlider("variant-slider-track", "variant-handle", ["variant-comp", "variant-career"], (index) => {
    isCareerMode = (index === 1);
});

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
        if (idx === 0) {
            track.classList.remove("right-state");
            opt0.classList.add("active");
            opt1.classList.remove("active");
        } else {
            track.classList.add("right-state");
            opt0.classList.remove("active");
            opt1.classList.add("active");
        }
        onChange(activeIndex);
    }

    track.addEventListener("click", () => updateUI(activeIndex === 0 ? 1 : 0));
    opt0.addEventListener("click", (e) => { e.stopPropagation(); updateUI(0); });
    opt1.addEventListener("click", (e) => { e.stopPropagation(); updateUI(1); });
}

document.getElementById("start-game-btn").addEventListener("click", () => {
    const difficultySetting = document.querySelector('input[name="difficulty"]:checked').value;
    respinsLeft = difficultySetting === "easy" ? 3 : difficultySetting === "normal" ? 1 : 0;
    respinCountText.textContent = respinsLeft;
    replacedCountryTarget = document.getElementById("replace-team-select").value;
    
    setupCard.classList.add("hidden");
    draftDashboard.classList.remove("hidden");
});

spinBtn.addEventListener("click", triggerSpinEngineWithAnimation);
respinBtn.addEventListener("click", () => {
    if (respinsLeft > 0 && selectedPlayer === null) {
        respinsLeft--;
        respinCountText.textContent = respinsLeft;
        triggerSpinEngineWithAnimation();
    }
});

// CRITICAL ADJUSTMENT: HARD-LOCKED 1-SECOND DURATION LOOP
function triggerSpinEngineWithAnimation() {
    selectedPlayer = null;
    spinBtn.classList.add("disabled"); spinBtn.disabled = true;
    respinBtn.classList.add("disabled"); respinBtn.disabled = true;
    rosterContainer.innerHTML = "";
    rosterContainer.classList.add("locked");

    statusText.textContent = "Querying historical world cup analytics databases...";
    spinnerAnchor.innerHTML = '<div class="rugby-spinner"></div>';

    setTimeout(() => {
        spinnerAnchor.innerHTML = ''; 
        spinBtn.classList.remove("disabled"); spinBtn.disabled = false;

        const rolledIndex = Math.floor(Math.random() * rugbyDatabase.length);
        const rolledTeam = rugbyDatabase[rolledIndex];

        statusText.textContent = `Pool Active: ${rolledTeam.country} (${rolledTeam.year}). Allocate your drafting asset.`;
        
        currentSpunSquad = rolledTeam.players.map(p => ({
            name: p.name,
            pos: p.pos,
            rating: isCareerMode ? p.careerRating : p.rating
        }));

        currentSpunSquad.sort((a, b) => displayOrder.indexOf(a.pos) - displayOrder.indexOf(b.pos));
        renderRosterList();
        
        rosterContainer.classList.remove("locked");
        if (respinsLeft > 0) {
            respinBtn.classList.remove("disabled");
            respinBtn.disabled = false;
        }
    }, 1000); // 1-SECOND SPIN LIFECYCLE TARGET
}

function renderRosterList() {
    rosterContainer.innerHTML = "";
    let trackingCategory = "";
    let targetBlock = null;

    currentSpunSquad.forEach(player => {
        if (player.pos !== trackingCategory) {
            trackingCategory = player.pos;
            const container = document.createElement("div");
            container.className = "roster-group";
            
            const head = document.createElement("div");
            head.className = "group-header";
            head.textContent = trackingCategory;
            container.appendChild(head);
            rosterContainer.appendChild(container);
            targetBlock = container;
        }

        const cardRow = document.createElement("div");
        cardRow.className = "player-row";
        if (claimedGlobalRoster.has(player.name)) cardRow.classList.add("claimed-lockout");
        
        const labelName = document.createElement("span");
        labelName.className = "player-name";
        labelName.textContent = player.name;

        const valRating = document.createElement("span");
        valRating.className = "player-rating";
        valRating.textContent = isKnowledgeMode ? "??" : player.rating;

        cardRow.appendChild(labelName);
        cardRow.appendChild(valRating);
        targetBlock.appendChild(cardRow);

        if (!claimedGlobalRoster.has(player.name)) {
            cardRow.addEventListener("click", () => {
                document.querySelectorAll(".player-row").forEach(r => r.classList.remove("selected"));
                cardRow.classList.add("selected");
                selectedPlayer = player;
                evaluateEligibilityCircles(player);
            });
        }
    });
}

function evaluateEligibilityCircles(player) {
    pitchCircles.forEach(circle => {
        circle.classList.remove("highlight-eligible");
        if (circle.classList.contains("occupied")) return;

        const badgePosition = circle.dataset.pos;
        const targetFamily = positionFamilies[badgePosition];
        
        let isEligible = (targetFamily === player.pos);
        if (utilityOverrideMaps[player.name] && utilityOverrideMaps[player.name].includes(targetFamily)) {
            isEligible = true;
        }

        if (isEligible) circle.classList.add("highlight-eligible");
    });
}

pitchCircles.forEach(node => {
    node.addEventListener("click", () => {
        if (!selectedPlayer) return;

        const badgePosition = node.dataset.pos;
        const targetFamily = positionFamilies[badgePosition];

        let isMatch = (targetFamily === selectedPlayer.pos);
        if (utilityOverrideMaps[selectedPlayer.name] && utilityOverrideMaps[selectedPlayer.name].includes(targetFamily)) {
            isMatch = true;
        }

        if (!isMatch) {
            alert(`Structural Conflict: Strategy constraints deny this slot configuration.`);
            return;
        }

        let calculatedValue = selectedPlayer.rating;
        let requiresTag = false;

        if (selectedPlayer.pos === "Props" && badgePosition === "Loosehead Prop" && !selectedPlayer.name.includes("Mtawarira") && !selectedPlayer.name.includes("Woodman") && !selectedPlayer.name.includes("Leonard") && !selectedPlayer.name.includes("Porter") && !selectedPlayer.name.includes("Kitshoff") && !selectedPlayer.name.includes("Nché")) {
            calculatedValue -= 4; requiresTag = true;
        }
        if (selectedPlayer.pos === "Back Three" && badgePosition === "Fullback" && !selectedPlayer.name.includes("Smith") && !selectedPlayer.name.includes("Lewsey") && !selectedPlayer.name.includes("Barrett") && !selectedPlayer.name.includes("Keenan") && !selectedPlayer.name.includes("Willemse")) {
            calculatedValue -= 4; requiresTag = true;
        }

        userTeam[badgePosition] = { name: selectedPlayer.name, score: calculatedValue };
        claimedGlobalRoster.add(selectedPlayer.name);

        node.classList.add("occupied");
        node.classList.remove("highlight-eligible");
        node.innerHTML = `<div class="circle-num">${calculatedValue}</div><div class="circle-name">${selectedPlayer.name}</div>`;

        if (requiresTag) {
            const shiftBadge = document.createElement("div");
            shiftBadge.className = "penalty-tag";
            shiftBadge.textContent = "-4 OVR";
            node.appendChild(shiftBadge);
        }

        spotsFilledCount++;
        selectedPlayer = null;
        currentSpunSquad = [];
        rosterContainer.classList.add("locked");
        respinBtn.classList.add("disabled"); respinBtn.disabled = true;
        
        pitchCircles.forEach(c => c.classList.remove("highlight-eligible"));

        if (spotsFilledCount === 15) {
            statusText.textContent = "Roster optimized. System prepared for tournament sim.";
            draftDashboard.classList.add("hidden");
            simDashboard.classList.remove("hidden");
        } else {
            statusText.textContent = "Selection processed. Run SPIN SQUAD for alternative options.";
        }
    });
});

document.getElementById("run-sim-btn").addEventListener("click", () => {
    let globalSum = 0;
    for (let k in userTeam) globalSum += userTeam[k].score;
    const squadOvr = Math.round(globalSum / 15);
    const logs = document.getElementById("sim-results");
    
    logs.innerHTML = `[CONFIG] Injecting team into bracket replacing: ${replacedCountryTarget}\n`;
    logs.innerHTML += `[RATING] Evaluated Squad Strength: ${squadOvr} OVR\n\n`;

    function calculateFixture(teamRating, opponentRating) {
        const spread = teamRating - opponentRating;
        const baseVariance = Math.floor(Math.random() * 12) - 6; 
        let teamScore = Math.max(3, Math.round(24 + (spread * 1.6) + baseVariance));
        let oppScore = Math.max(0, Math.round(17 - (spread * 1.0) - baseVariance));
        if (teamScore === oppScore) Math.random() > 0.5 ? teamScore += 3 : oppScore += 3;
        return { team: teamScore, opp: oppScore, win: teamScore > oppScore };
    }

    const match1 = calculateFixture(squadOvr, 86);
    logs.innerHTML += `[POOL MATCH 1] Vs Scotland\nPredicted Score: Your Team ${match1.team} - ${match1.opp} Scotland\n\n`;
    const match2 = calculateFixture(squadOvr, 70);
    logs.innerHTML += `[POOL MATCH 2] Vs Romania\nPredicted Score: Your Team ${match2.team} - ${match2.opp} Romania\n\n`;
    const match3 = calculateFixture(squadOvr, 78);
    logs.innerHTML += `[POOL MATCH 3] Vs Tonga\nPredicted Score: Your Team ${match3.team} - ${match3.opp} Tonga\n\n`;

    const qf = calculateFixture(squadOvr, 92);
    logs.innerHTML += `--- KNOCKOUT PHASE ---\n[QUARTER FINAL] Vs France\nPredicted Score: Your Team ${qf.team} - ${qf.opp} France\n`;
    
    if (!qf.win) {
        logs.innerHTML += `\n❌ TOURNAMENT RESULT: Eliminated in the Quarter-Finals by France.`;
    } else {
        const sf = calculateFixture(squadOvr, 94);
        logs.innerHTML += `\n[SEMI FINAL] Vs New Zealand\nPredicted Score: Your Team ${sf.team} - ${sf.opp} New Zealand\n`;
        
        if (!sf.win) {
            logs.innerHTML += `\n❌ TOURNAMENT RESULT: Eliminated in the Semi-Finals by New Zealand.`;
        } else {
            const f = calculateFixture(squadOvr, 95);
            logs.innerHTML += `\n[WORLD CUP FINAL] Vs South Africa\nPredicted Score: Your Team ${f.team} - ${f.opp} South Africa\n`;
            
            if (f.win) {
                logs.innerHTML += `\n🏆 TOURNAMENT RESULT: WORLD CUP CHAMPIONS!`;
            } else {
                logs.innerHTML += `\n❌ TOURNAMENT RESULT: Runners-Up. Defeated in the Final.`;
            }
        }
    }
    document.getElementById("restart-btn").classList.remove("hidden");
    document.getElementById("run-sim-btn").classList.add("hidden");
});

document.getElementById("restart-btn").addEventListener("click", () => { location.reload(); });
