// DATABASE TRACKING TOURNAMENT RATING VS CAREER HISTORIC PEAK
const rugbyDatabase = [
    {
        country: "England", year: 2003,
        players: [
            { name: "Trevor Woodman", pos: "Props", rating: 89, careerRating: 89 },
            { name: "Phil Vickery", pos: "Props", rating: 91, careerRating: 92 },
            { name: "Jason Leonard", pos: "Props", rating: 87, careerRating: 94 },
            { name: "Steve Thompson", pos: "Hooker", rating: 90, careerRating: 90 },
            { name: "Dorian West", pos: "Hooker", rating: 82, careerRating: 84 },
            { name: "Martin Johnson", pos: "Second Rows", rating: 97, careerRating: 98 },
            { name: "Ben Kay", pos: "Second Rows", rating: 88, careerRating: 89 },
            { name: "Simon Shaw", pos: "Second Rows", rating: 85, careerRating: 91 },
            { name: "Richard Hill", pos: "Back Row", rating: 93, careerRating: 94 },
            { name: "Neil Back", pos: "Back Row", rating: 91, careerRating: 93 },
            { name: "Lawrence Dallaglio", pos: "Back Row", rating: 94, careerRating: 96 },
            { name: "Joe Worsley", pos: "Back Row", rating: 83, careerRating: 86 },
            { name: "Lewis Moody", pos: "Back Row", rating: 86, careerRating: 89 },
            { name: "Matt Dawson", pos: "Scrum Halves", rating: 92, careerRating: 93 },
            { name: "Kyran Bracken", pos: "Scrum Halves", rating: 81, careerRating: 84 },
            { name: "Jonny Wilkinson", pos: "Fly Halves", rating: 98, careerRating: 98 },
            { name: "Mike Catt", pos: "Fly Halves", rating: 86, careerRating: 89 },
            { name: "Mike Tindall", pos: "Centres", rating: 89, careerRating: 90 },
            { name: "Will Greenwood", pos: "Centres", rating: 93, careerRating: 93 },
            { name: "Ben Cohen", pos: "Back Three", rating: 88, careerRating: 90 },
            { name: "Jason Robinson", pos: "Back Three", rating: 96, careerRating: 96 },
            { name: "Josh Lewsey", pos: "Back Three", rating: 91, careerRating: 92 },
            { name: "Iain Balshaw", pos: "Back Three", rating: 83, careerRating: 86 }
        ]
    },
    {
        country: "South Africa", year: 2019,
        players: [
            { name: "Tendai Mtawarira", pos: "Props", rating: 91, careerRating: 93 },
            { name: "Frans Malherbe", pos: "Props", rating: 90, careerRating: 92 },
            { name: "Steven Kitshoff", pos: "Props", rating: 91, careerRating: 93 },
            { name: "Vincent Koch", pos: "Props", rating: 88, careerRating: 90 },
            { name: "Bongi Mbonambi", pos: "Hooker", rating: 89, careerRating: 91 },
            { name: "Malcolm Marx", pos: "Hooker", rating: 93, careerRating: 94 },
            { name: "Eben Etzebeth", pos: "Second Rows", rating: 95, careerRating: 97 },
            { name: "Lood de Jager", pos: "Second Rows", rating: 89, careerRating: 91 },
            { name: "RG Snyman", pos: "Second Rows", rating: 90, careerRating: 92 },
            { name: "Franco Mostert", pos: "Second Rows", rating: 88, careerRating: 90 },
            { name: "Siya Kolisi", pos: "Back Row", rating: 92, careerRating: 94 },
            { name: "Pieter-Steph du Toit", pos: "Back Row", rating: 96, careerRating: 96 },
            { name: "Duane Vermeulen", pos: "Back Row", rating: 94, careerRating: 95 },
            { name: "Francois Louw", pos: "Back Row", rating: 86, careerRating: 90 },
            { name: "Faf de Klerk", pos: "Scrum Halves", rating: 92, careerRating: 93 },
            { name: "Herschel Jantjies", pos: "Scrum Halves", rating: 84, careerRating: 86 },
            { name: "Handré Pollard", pos: "Fly Halves", rating: 91, careerRating: 93 },
            { name: "Damian de Allende", pos: "Centres", rating: 91, careerRating: 92 },
            { name: "Lukhanyo Am", pos: "Centres", rating: 93, careerRating: 94 },
            { name: "Makazole Mapimpi", pos: "Back Three", rating: 93, careerRating: 93 },
            { name: "Cheslin Kolbe", pos: "Back Three", rating: 96, careerRating: 96 },
            { name: "Willie le Roux", pos: "Back Three", rating: 87, careerRating: 91 },
            { name: "Frans Steyn", pos: "Back Three", rating: 88, careerRating: 94 }
        ]
    },
    {
        country: "New Zealand", year: 2015,
        players: [
            { name: "Joe Moody", pos: "Props", rating: 87, careerRating: 90 },
            { name: "Owen Franks", pos: "Props", rating: 90, careerRating: 92 },
            { name: "Ben Franks", pos: "Props", rating: 83, careerRating: 85 },
            { name: "Charlie Faumuina", pos: "Props", rating: 85, careerRating: 88 },
            { name: "Dane Coles", pos: "Hooker", rating: 93, careerRating: 94 },
            { name: "Keven Mealamu", pos: "Hooker", rating: 86, careerRating: 93 },
            { name: "Brodie Retallick", pos: "Second Rows", rating: 96, careerRating: 96 },
            { name: "Sam Whitelock", pos: "Second Rows", rating: 94, careerRating: 95 },
            { name: "Jerome Kaino", pos: "Back Row", rating: 92, careerRating: 94 },
            { name: "Richie McCaw", pos: "Back Row", rating: 98, careerRating: 99 },
            { name: "Kieran Read", pos: "Back Row", rating: 94, careerRating: 96 },
            { name: "Victor Vito", pos: "Back Row", rating: 84, careerRating: 85 },
            { name: "Sam Cane", pos: "Back Row", rating: 86, careerRating: 91 },
            { name: "Aaron Smith", pos: "Scrum Halves", rating: 95, careerRating: 95 },
            { name: "Tawera Kerr-Barlow", pos: "Scrum Halves", rating: 82, careerRating: 84 },
            { name: "Dan Carter", pos: "Fly Halves", rating: 97, careerRating: 99 },
            { name: "Ma'a Nonu", pos: "Centres", rating: 96, careerRating: 96 },
            { name: "Conrad Smith", pos: "Centres", rating: 92, careerRating: 93 },
            { name: "Julian Savea", pos: "Back Three", rating: 94, careerRating: 94 },
            { name: "Nehe Milner-Skudder", pos: "Back Three", rating: 90, careerRating: 90 },
            { name: "Ben Smith", pos: "Back Three", rating: 94, careerRating: 94 },
            { name: "Beauden Barrett", pos: "Back Three", rating: 92, careerRating: 96 },
            { name: "Sonny Bill Williams", pos: "Centres", rating: 90, careerRating: 92 }
        ]
    }
];

const positionFamilies = {
    "Loosehead Prop": "Props", "Tighthead Prop": "Props", "Hooker": "Hooker",
    "Lock 4": "Second Rows", "Lock 5": "Second Rows", "Blindside Flanker": "Back Row",
    "Openside Flanker": "Back Row", "Number 8": "Back Row", "Scrum-half": "Scrum Halves",
    "Fly-half": "Fly Halves", "Inside Centre": "Centres", "Outside Centre": "Centres",
    "Left Wing": "Back Three", "Right Wing": "Back Three", "Fullback": "Back Three"
};

const displayOrder = ["Props", "Hooker", "Second Rows", "Back Row", "Scrum Halves", "Fly Halves", "Centres", "Back Three"];

// STATE CONSTANTS
let userTeam = {};
let currentSpunSquad = [];
let selectedPlayer = null;
let respinsLeft = 0;
let isKnowledgeMode = false;
let isCareerMode = false;
let spotsFilledCount = 0;

// UI ATTACHMENTS
const setupCard = document.getElementById("setup-card");
const draftDashboard = document.getElementById("draft-dashboard");
const simDashboard = document.getElementById("sim-dashboard");
const spinBtn = document.getElementById("spin-btn");
const respinBtn = document.getElementById("respin-btn");
const respinCountText = document.getElementById("respin-count");
const rosterContainer = document.getElementById("roster-container");
const statusBanner = document.getElementById("status-banner");
const pitchCircles = document.querySelectorAll(".pitch-circle");

// SLIDER LOGIC
setupSlider("variant-slider-track", "variant-handle", ["variant-comp", "variant-career"], (index) => {
    isCareerMode = (index === 1);
});

setupSlider("rating-slider-track", "rating-handle", ["lbl-reveal", "lbl-knowledge"], (index) => {
    isKnowledgeMode = (index === 1);
    if (currentSpunSquad.length > 0) renderRosterList();
});

function setupSlider(trackId, handleId, optionIds, onChange) {
    const track = document.getElementById(trackId);
    const handle = document.getElementById(handleId);
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

// INITIALIZATION
document.getElementById("start-game-btn").addEventListener("click", () => {
    const difficultySetting = document.querySelector('input[name="difficulty"]:checked').value;
    respinsLeft = difficultySetting === "easy" ? 3 : difficultySetting === "normal" ? 1 : 0;
    respinCountText.textContent = respinsLeft;
    
    setupCard.classList.add("hidden");
    draftDashboard.classList.remove("hidden");
});

// CORE ENGINE ACTIONS
spinBtn.addEventListener("click", spinNewSquadPool);
respinBtn.addEventListener("click", () => {
    if (respinsLeft > 0 && selectedPlayer === null) {
        respinsLeft--;
        respinCountText.textContent = respinsLeft;
        spinNewSquadPool();
    }
});

function spinNewSquadPool() {
    selectedPlayer = null;
    respinBtn.classList.add("disabled");
    respinBtn.disabled = true;

    const rolledIndex = Math.floor(Math.random() * rugbyDatabase.length);
    const rolledTeam = rugbyDatabase[rolledIndex];

    statusBanner.textContent = `Pool Open: ${rolledTeam.country} (${rolledTeam.year}). Select one player.`;
    
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
        
        const labelName = document.createElement("span");
        labelName.className = "player-name";
        labelName.textContent = player.name;

        const valRating = document.createElement("span");
        valRating.className = "player-rating";
        valRating.textContent = isKnowledgeMode ? "??" : player.rating;

        cardRow.appendChild(labelName);
        cardRow.appendChild(valRating);
        targetBlock.appendChild(cardRow);

        cardRow.addEventListener("click", () => {
            document.querySelectorAll(".player-row").forEach(r => r.classList.remove("selected"));
            cardRow.classList.add("selected");
            selectedPlayer = player;
            evaluateEligibilityCircles(player.pos);
        });
    });
}

function evaluateEligibilityCircles(groupKey) {
    pitchCircles.forEach(circle => {
        circle.classList.remove("highlight-eligible");
        if (positionFamilies[circle.dataset.pos] === groupKey && !circle.classList.contains("occupied")) {
            circle.classList.add("highlight-eligible");
        }
    });
}

// POPULATE FIELD SELECTIONS
pitchCircles.forEach(node => {
    node.addEventListener("click", () => {
        if (!selectedPlayer) return;

        const badgePosition = node.dataset.pos;
        if (positionFamilies[badgePosition] !== selectedPlayer.pos) {
            alert(`Position Violation: Structural lockout rules block assignment.`);
            return;
        }

        let calculatedValue = selectedPlayer.rating;
        let requiresTag = false;

        if (selectedPlayer.pos === "Props" && badgePosition === "Loosehead Prop" && !selectedPlayer.name.includes("Mtawarira") && !selectedPlayer.name.includes("Woodman")) {
            calculatedValue -= 4; requiresTag = true;
        }
        if (selectedPlayer.pos === "Back Three" && badgePosition === "Fullback" && !selectedPlayer.name.includes("Smith") && !selectedPlayer.name.includes("Lewsey")) {
            calculatedValue -= 4; requiresTag = true;
        }

        userTeam[badgePosition] = { name: selectedPlayer.name, score: calculatedValue };
        
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
        respinBtn.classList.add("disabled");
        respinBtn.disabled = true;
        
        pitchCircles.forEach(c => c.classList.remove("highlight-eligible"));

        if (spotsFilledCount === 15) {
            statusBanner.textContent = "Draft complete. Ready for tournament kickoff.";
            draftDashboard.classList.add("hidden");
            simDashboard.classList.remove("hidden");
        } else {
            statusBanner.textContent = "Player locked in. Spin for your next team pool.";
        }
    });
});

// TOURNAMENT MATHEMATICAL SIM ENGINE
document.getElementById("run-sim-btn").addEventListener("click", () => {
    let globalSum = 0;
    for (let k in userTeam) globalSum += userTeam[k].score;
    const squadOvr = Math.round(globalSum / 15);
    
    const logs = document.getElementById("sim-results");
    const replacedUnit = document.getElementById("replace-team-select").value;
    
    logs.innerHTML = `[CONFIG] Injecting team into bracket replacing: ${replacedUnit}\n`;
    logs.innerHTML += `[RATING] Evaluated Squad Strength: ${squadOvr} OVR\n\n`;

    // Algorithmic Score Engine
    function calculateFixture(teamRating, opponentRating) {
        const spread = teamRating - opponentRating;
        const baseVariance = Math.floor(Math.random() * 12) - 6; 
        
        let teamScore = Math.max(3, Math.round(22 + (spread * 1.5) + baseVariance));
        let oppScore = Math.max(0, Math.round(19 - (spread * 1.1) - baseVariance));
        
        if (teamScore === oppScore) { 
            Math.random() > 0.5 ? teamScore += 3 : oppScore += 3;
        }
        return { team: teamScore, opp: oppScore, win: teamScore > oppScore };
    }

    // Fixture Sequence
    const match1 = calculateFixture(squadOvr, 86);
    logs.innerHTML += `[POOL MATCH 1] Vs Scotland\nPredicted Score: Your Team ${match1.team} - ${match1.opp} Scotland\n\n`;
    
    const match2 = calculateFixture(squadOvr, 70);
    logs.innerHTML += `[POOL MATCH 2] Vs Romania\nPredicted Score: Your Team ${match2.team} - ${match2.opp} Romania\n\n`;

    const match3 = calculateFixture(squadOvr, 78);
    logs.innerHTML += `[POOL MATCH 3] Vs Tonga\nPredicted Score: Your Team ${match3.team} - ${match3.opp} Tonga\n\n`;

    // Knockout Bracket Calculations
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
                logs.innerHTML += `\n🥈 TOURNAMENT RESULT: Runners-Up. Defeated in the Final.`;
            }
        }
    }
    document.getElementById("restart-btn").classList.remove("hidden");
    document.getElementById("run-sim-btn").classList.add("hidden");
});

document.getElementById("restart-btn").addEventListener("click", () => { location.reload(); });
