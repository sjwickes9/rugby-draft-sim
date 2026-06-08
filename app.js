const positionFamilies = {
    "Loosehead Prop": "Props", "Tighthead Prop": "Props", "Hooker": "Hooker",
    "Lock 4": "Second Rows", "Lock 5": "Second Rows", "Blindside Flanker": "Back Row",
    "Openside Flanker": "Back Row", "Number 8": "Back Row", "Scrum-half": "Scrum Halves",
    "Fly-half": "Fly Halves", "Inside Centre": "Centres", "Outside Centre": "Centres",
    "Left Wing": "Back Three", "Right Wing": "Back Three", "Fullback": "Back Three"
};

// FULL ELIGIBLE COUNTRY LOG: Contains all 26 historic qualified nations split into competitive tiers
const historicalNations = [
    { country: "New Zealand", tier: 1, surnamePool: ["Retallick", "McCaw", "Read", "Smith", "Barrett", "Carter", "Nonu", "Whitelock", "Mealamu", "Franks", "Savea", "Lomu", "Fitzpatrick", "Jones", "Umaga"] },
    { country: "South Africa", tier: 1, surnamePool: ["Etzebeth", "du Toit", "Vermeulen", "Kolisi", "de Klerk", "Pollard", "de Allende", "Am", "Kolbe", "Malherbe", "Mbonambi", "Kitshoff", "Nché", "Steyn", "Habana"] },
    { country: "England", tier: 1, surnamePool: ["Johnson", "Wilkinson", "Dallaglio", "Hill", "Back", "Greenwood", "Robinson", "Vickery", "Thompson", "Dawson", "Tindall", "Cohen", "Farrell", "Itoje", "Underhill"] },
    { country: "France", tier: 1, surnamePool: ["Dusautoir", "Mas", "Yachvili", "Clerc", "Harinordoquy", "Parra", "Servat", "Nallet", "Dupont", "Ntamack", "Penaud", "Alldritt", "Fickou", "Baille", "Marchand"] },
    { country: "Ireland", tier: 1, surnamePool: ["Sexton", "O'Driscoll", "Aki", "Porter", "Furlong", "Sheehan", "Beirne", "Ryan", "van der Flier", "Doris", "Gibson-Park", "Ringrose", "Lowe", "Keenan", "O'Connell"] },
    { country: "Australia", tier: 1, surnamePool: ["Gregan", "Larkham", "Smith", "Mortlock", "Giteau", "Tuqiri", "Sharpe", "Sailor", "Rogers", "Horan", "Eales", "Campese", "Pocock", "Genia", "Hooper"] },
    { country: "Wales", tier: 1, surnamePool: ["Jones", "Warburton", "Tipuric", "Faletau", "Williams", "Biggar", "Davies", "Roberts", "North", "Halfpenny", "Jenkins", "Owens", "Adam Jones", "Rees-Zammit"] },
    { country: "Scotland", tier: 2, surnamePool: ["Hogg", "Russell", "Van der Merwe", "Ritchie", "Watson", "Price", "Harris", "Sutherland", "Turner", "Zander Fagerson", "Gray", "Gilchrist", "Laidlaw", "Hastings"] },
    { country: "Argentina", tier: 2, surnamePool: ["Pichot", "Contepomi", "Hernández", "Lobbe", "Materas", "Kremer", "Montoya", "Boffelli", "Sánchez", "Cubelli", "Gallo", "Lavanini", "Moroni", "Mallía"] },
    { country: "Fiji", tier: 2, surnamePool: ["Radradra", "Nakarawa", "Botia", "Tuisova", "Mata", "Lomani", "Volavola", "Wainiqolo", "Nayacalevu", "Maqala", "Ravai", "Matavesi", "Habosi"] },
    { country: "Japan", tier: 2, surnamePool: ["Leitch", "Matsushima", "Tamura", "Fukuoka", "Himeno", "Inagaki", "Horie", "Labuschagné", "Nakamura", "Yamanaka", "Gu", "Dearns", "Naoto Saito"] },
    { country: "Italy", tier: 2, surnamePool: ["Parisse", "Castrogiovanni", "Garbisi", "Capuozzo", "Negri", "Lamaro", "Cannone", "Fischetti", "Ruzza", "Ioane", "Brex", "Varney", "Allan"] },
    { country: "Samoa", tier: 2, surnamePool: ["Tuilagi", "Mapusua", "Taulafo", "Tekori", "Fa'asalele", "Lee-Lo", "Nanai-Williams", "Luatua", "Sopoaga", "Seuteni", "Lay", "McFarlane"] },
    { country: "Tonga", tier: 2, surnamePool: ["Lilo", "Taufa", "Piutau", "Fisilau", "Fekitoa", "Mounga", "Taumalolo", "Latu", "Kafatolu", "Takulua", "Halaifonua", "Fifita"] },
    { country: "Georgia", tier: 2, surnamePool: ["Gorgodze", "Zirakashvili", "Niniashvili", "Abzhandadze", "Lobzhanidze", "Sharikadze", "Gigashvili", "Chachua", "Saghinadze", "Mamukashvili"] },
    { country: "Romania", tier: 3, surnamePool: ["Sursen", "Fercu", "Calafeteanu", "Vlaicu", "Macovei", "Gajion", "Chirica", "Surugiu", "Gorcioaia", "Savzu", "Popa", "Rupanu"] },
    { country: "Canada", tier: 3, surnamePool: ["Cudmore", "Ardron", "Pritchard", "Paris", "Hearn", "Blevins", "Olmstead", "Mack", "Barkwill", "Sears-Duru", "Rumball", "Nelson"] },
    { country: "United States", tier: 3, surnamePool: ["Scully", "MacGinty", "Wyles", "Lamositele", "Maninoa", "Civetta", "Taufete'e", "Dolan", "Augspurger", "Campbell", "Iscaro"] },
    { country: "Uruguay", tier: 3, surnamePool: ["Ormaechea", "Berchesi", "Diana", "Arata", "Vilaseca", "Freitas", "Mieres", "Kessler", "Dotti", "Gaminara", "Pujadas", "Amaya"] },
    { country: "Namibia", tier: 3, surnamePool: ["Burger", "Botha", "Deysel", "Kitshoff", "Stevens", "Jantjies", "Greyling", "Coetzee", "van Jaarsveld", "Katjijeko", "Louw"] },
    { country: "Portugal", tier: 3, surnamePool: ["Marques", "Storti", "Marta", "Tadjer", "Fernandes", "Madeira", "Martins", "Granate", "Appleton", "Lima", "Bento", "Sousa"] },
    { country: "Spain", tier: 3, surnamePool: ["Feijoo", "Heredia", "Rouet", "Auzqui", "del Hoyo", "Mora", "Pinto", "Gimeno", "Linklater", "Lopez", "Bartere"] },
    { country: "Zimbabwe", tier: 3, surnamePool: ["Groenewald", "Tsimba", "Chivanga", "Mutamangira", "Mudariki", "Makwanya", "Nyakanyanga", "Breslin"] },
    { country: "Russia", tier: 3, surnamePool: ["Artemyev", "Oosthuizen", "Kushnarev", "Galinovskiy", "Gerasimov", "Ostroushko", "Garbuzov", "Selyutin"] },
    { country: "Chile", tier: 3, surnamePool: ["Sigren", "Fernández", "Ayarza", "Lues", "Dittus", "Bohme", "Saavedra", "Torrealba", "Garafulic", "Casas"] },
    { country: "Ivory Coast", tier: 3, surnamePool: ["Camara", "Dali", "Niakou", "Okou", "N'Gbala", "Gachon", "Konan", "Lassissi"] }
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

// ANIMATION TIMELINE ENGINE (HARD-LOCKED TO EXACTLY 1-SECOND LATCH TIME)
function triggerSpinEngineWithAnimation() {
    selectedPlayer = null;
    spinBtn.classList.add("disabled"); spinBtn.disabled = true;
    respinBtn.classList.add("disabled"); respinBtn.disabled = true;
    rosterContainer.innerHTML = "";
    rosterContainer.classList.add("locked");

    statusText.textContent = "Querying global tournament data vaults...";
    spinnerAnchor.innerHTML = '<div class="rugby-spinner"></div>';

    setTimeout(() => {
        spinnerAnchor.innerHTML = ''; 
        spinBtn.classList.remove("disabled"); spinBtn.disabled = false;

        // Draw an absolute random configuration out of all 26 world cup nations
        const rolledNation = historicalNations[Math.floor(Math.random() * historicalNations.length)];
        const rolledYear = 1987 + (Math.floor(Math.random() * 10) * 4); // Contextual year bracket generator

        statusText.textContent = `Pool Opened: ${rolledNation.country} (${rolledYear > 2023 ? 2023 : rolledYear}). Assign your asset.`;
        
        // DYNAMIC ALGORITHMIC GENERATION ENGINE FOR THE 26 WORLD CUP TEAMS
        currentSpunSquad = [];
        let baseRatingModifier = rolledNation.tier === 1 ? 90 : rolledNation.tier === 2 ? 82 : 72;

        displayOrder.forEach(positionGroup => {
            // Populate two competitive choices per positional family tree block
            for (let variant = 1; variant <= 2; variant++) {
                let uniqueSurname = rolledNation.surnamePool[Math.floor(Math.random() * rolledNation.surnamePool.length)];
                let randomInitials = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + ".";
                let computedBase = baseRatingModifier + Math.floor(Math.random() * 7);
                
                currentSpunSquad.push({
                    name: `${randomInitials} ${uniqueSurname}`,
                    pos: positionGroup,
                    rating: isCareerMode ? computedBase + Math.floor(Math.random() * 3) : computedBase
                });
            }
        });

        currentSpunSquad.sort((a, b) => displayOrder.indexOf(a.pos) - displayOrder.indexOf(b.pos));
        renderRosterList();
        
        rosterContainer.classList.remove("locked");
        if (respinsLeft > 0) {
            respinBtn.classList.remove("disabled");
            respinBtn.disabled = false;
        }
    }, 1000); // 1 SEC SPIN WINDOW EFFECTIVELY PARSES THE DRAW INTERFACE
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
        
        if (targetFamily === player.pos) {
            circle.classList.add("highlight-eligible");
        }
    });
}

pitchCircles.forEach(node => {
    node.addEventListener("click", () => {
        if (!selectedPlayer) return;

        const badgePosition = node.dataset.pos;
        const targetFamily = positionFamilies[badgePosition];

        if (targetFamily !== selectedPlayer.pos) {
            alert(`Structural Conflict: Strategy constraints deny this slot configuration.`);
            return;
        }

        let calculatedValue = selectedPlayer.rating;
        let requiresTag = false;

        // Penalize out-of-position cross alignments inside complex groupings
        if (selectedPlayer.pos === "Props" && badgePosition === "Loosehead Prop" && Math.random() > 0.6) {
            calculatedValue -= 4; requiresTag = true;
        }
        if (selectedPlayer.pos === "Back Three" && badgePosition === "Fullback" && Math.random() > 0.6) {
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
    
    logs.innerHTML = `[CONFIG] Injecting hybrid squad into world tournament replacement matrix...\n`;
    logs.innerHTML += `[RATING] Finalized Combined Squad Level: ${squadOvr} OVR\n\n`;

    function calculateFixture(teamRating, opponentRating) {
        const spread = teamRating - opponentRating;
        const baseVariance = Math.floor(Math.random() * 12) - 6; 
        let teamScore = Math.max(3, Math.round(24 + (spread * 1.6) + baseVariance));
        let oppScore = Math.max(0, Math.round(17 - (spread * 1.0) - baseVariance));
        if (teamScore === oppScore) Math.random() > 0.5 ? teamScore += 3 : oppScore += 3;
        return { team: teamScore, opp: oppScore, win: teamScore > oppScore };
    }

    const match1 = calculateFixture(squadOvr, 84);
    logs.innerHTML += `[POOL FIXTURE 1] Vs Initial Challenger\nScoreline: Hybrid XV ${match1.team} - ${match1.opp} Opponent\n\n`;
    const match2 = calculateFixture(squadOvr, 74);
    logs.innerHTML += `[POOL FIXTURE 2] Vs Mid-tier Seed\nScoreline: Hybrid XV ${match2.team} - ${match2.opp} Opponent\n\n`;

    const qf = calculateFixture(squadOvr, 88);
    logs.innerHTML += `--- KNOCKOUT ROUNDS BRACKET ---\n[QUARTER FINAL] Vs Championship Contender\nScoreline: Hybrid XV ${qf.team} - ${qf.opp} Opponent\n`;
    
    if (!qf.win) {
        logs.innerHTML += `\n❌ RUN TERMINATED: Defeated in the Quarter-Finals stage.`;
    } else {
        const sf = calculateFixture(squadOvr, 91);
        logs.innerHTML += `\n[SEMI FINAL] Vs Major Superpower\nScoreline: Hybrid XV ${sf.team} - ${sf.opp} Opponent\n`;
        
        if (!sf.win) {
            logs.innerHTML += `\n❌ RUN TERMINATED: Defeated in the Semi-Finals tier.`;
        } else {
            const f = calculateFixture(squadOvr, 93);
            logs.innerHTML += `\n[RUGBY WORLD CUP FINAL] Vs Grand Finalist\nScoreline: Hybrid XV ${f.team} - ${f.opp} Opponent\n`;
            
            if (f.win) {
                logs.innerHTML += `\n🏆 TOURNAMENT COMPLETE: WORLD CUP BRACKET CONQUERED!`;
            } else {
                logs.innerHTML += `\n❌ RUN TERMINATED: Silver Medal Finish. Lost in the Final match.`;
            }
        }
    }
    document.getElementById("restart-btn").classList.remove("hidden");
    document.getElementById("run-sim-btn").classList.add("hidden");
});

document.getElementById("restart-btn").addEventListener("click", () => { location.reload(); });
