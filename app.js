// POSITIONAL GROUP MAPPING & OUT-OF-POSITION PENALTY MATRICES
const positionFamilies = {
    "Loosehead Prop": "Props", "Tighthead Prop": "Props", "Hooker": "Hooker",
    "Lock 4": "Second Rows", "Lock 5": "Second Rows", "Blindside Flanker": "Back Row",
    "Openside Flanker": "Back Row", "Number 8": "Back Row", "Scrum-half": "Scrum Halves",
    "Fly-half": "Fly Halves", "Inside Centre": "Centres", "Outside Centre": "Centres",
    "Left Wing": "Back Three", "Right Wing": "Back Three", "Fullback": "Back Three"
};

const forwardPositions = ["Loosehead Prop", "Tighthead Prop", "Hooker", "Lock 4", "Lock 5", "Blindside Flanker", "Openside Flanker", "Number 8"];
const backPositions = ["Scrum-half", "Fly-half", "Inside Centre", "Outside Centre", "Left Wing", "Right Wing", "Fullback"];

// HISTORICAL GLOBAL MATRICES (Featuring Irish Rugby Flag Mapping & Rebalanced England 2003 Parity)
const historicalNations = [
    { country: "New Zealand", flag: "🇳🇿", tier: 1, dynamicSquad: { "Props": ["T. Woodcock", "O. Franks"], "Hooker": ["K. Mealamu"], "Second Rows": ["B. Retallick", "S. Whitelock"], "Back Row": ["J. Kaino", "R. McCaw", "K. Read"], "Scrum Halves": ["A. Smith"], "Fly Halves": ["D. Carter"], "Centres": ["M. Nonu", "C. Smith"], "Back Three": ["J. Savea", "B. Smith", "J. Lomu"] }},
    { country: "South Africa", flag: "🇿🇦", tier: 1, dynamicSquad: { "Props": ["O. du Randt", "F. Malherbe"], "Hooker": ["B. du Plessis"], "Second Rows": ["E. Etzebeth", "V. Matfield"], "Back Row": ["S. Burger", "S. Kolisi", "D. Vermeulen"], "Scrum Halves": ["F. de Klerk"], "Fly Halves": ["H. Pollard"], "Centres": ["D. de Allende", "L. Am"], "Back Three": ["B. Habana", "C. Kolbe", "P. Montgomery"] }},
    { 
        country: "England", 
        flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}", 
        tier: 1, 
        dynamicSquad: { 
            "Props": ["P. Vickery", "J. Leonard"], 
            "Hooker": ["S. Thompson"], // Corrected from P. Thompson
            "Second Rows": ["M. Johnson", "B. Kay"], 
            "Back Row": ["R. Hill", "N. Back", "L. Dallaglio"], 
            "Scrum Halves": ["M. Dawson"], 
            "Fly Halves": ["J. Wilkinson"], 
            "Centres": ["W. Greenwood", "M. Tindall"], 
            "Back Three": ["J. Robinson", "B. Cohen", "M. Cueto"] 
        },
        overrideRatings: {
            "J. Wilkinson": 97, // Set to best player apex
            "M. Johnson": 95,   // Elite leadership level
            "S. Thompson": 91,
            "J. Robinson": 93,  // Rebalanced over Cohen
            "B. Cohen": 88,
            "L. Dallaglio": 92,
            "R. Hill": 90,
            "N. Back": 91
        }
    },
    { country: "France", flag: "🇫🇷", tier: 1, dynamicSquad: { "Props": ["S. Marconnet", "N. Mas"], "Hooker": ["W. Servat"], "Second Rows": ["F. Pelous", "L. Nallet"], "Back Row": ["T. Dusautoir", "I. Harinordoquy", "G. Alldritt"], "Scrum Halves": ["A. Dupont"], "Fly Halves": ["F. Michalak"], "Centres": ["Y. Jauzion", "G. Fickou"], "Back Three": ["V. Clerc", "D. Penaud", "T. Ramos"] }},
    { country: "Ireland", flag: "☘️\u{1F3F3}\u{FE0F}", tier: 1, dynamicSquad: { "Props": ["A. Porter", "T. Furlong"], "Hooker": ["D. Sheehan"], "Second Rows": ["P. O'Connell", "J. Ryan"], "Back Row": ["P. O'Mahony", "J. van der Flier", "C. Doris"], "Scrum Halves": ["J. Gibson-Park"], "Fly Halves": ["J. Sexton"], "Centres": ["B. O'Driscoll", "B. Aki"], "Back Three": ["M. Hansen", "J. Lowe", "H. Keenan"] }},
    { country: "Australia", flag: "🇦🇺", tier: 1, dynamicSquad: { "Props": ["E. McKenzie", "A. Baxter"], "Hooker": ["P. Kearns"], "Second Rows": ["J. Eales", "N. Sharpe"], "Back Row": ["O. Finegan", "G. Smith", "T. Kefu"], "Scrum Halves": ["G. Gregan"], "Fly Halves": ["S. Larkham"], "Centres": ["T. Horan", "S. Mortlock"], "Back Three": ["D. Campese", "L. Tuqiri", "C. Latham"] }},
    { country: "Wales", flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}", tier: 1, dynamicSquad: { "Props": ["G. Jenkins", "A. Jones"], "Hooker": ["K. Owens"], "Second Rows": ["A. W. Jones", "L. Charteris"], "Back Row": ["D. Lydiate", "S. Warburton", "T. Faletau"], "Scrum Halves": ["M. Phillips"], "Fly Halves": ["D. Biggar"], "Centres": ["J. Roberts", "J. Davies"], "Back Three": ["S. Williams", "G. North", "L. Halfpenny"] }},
    { country: "Scotland", flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}", tier: 2, dynamicSquad: { "Props": ["P. Wright", "Z. Fagerson"], "Hooker": ["C. Lawson"], "Second Rows": ["R. Gray", "G. Gilchrist"], "Back Row": ["J. White", "H. Watson", "M. Leslie"], "Scrum Halves": ["G. Laidlaw"], "Fly Halves": ["F. Russell"], "Centres": ["S. Hastings", "M. Harris"], "Back Three": ["D. van der Merwe", "T. Seymour", "S. Hogg"] }},
    { country: "Argentina", flag: "🇦🇷", tier: 2, dynamicSquad: { "Props": ["R. Roncero", "M. Scelzo"], "Hooker": ["M. Ledesma"], "Second Rows": ["P. Albacete", "T. Lavanini"], "Back Row": ["P. Matera", "M. Kremer", "J.M. Leguizamón"], "Scrum Halves": ["A. Pichot"], "Fly Halves": ["F. Contepomi"], "Centres": ["J.M. Hernández", "M. Moroni"], "Back Three": ["H. Agulla", "E. Boffelli", "J.C. Mallía"] }},
    { country: "Fiji", flag: "🇫🇯", tier: 2, dynamicSquad: { "Props": ["E. Mawi", "M. Saulo"], "Hooker": ["S. Matavesi"], "Second Rows": ["L. Nakarawa", "A. Ratuniyarawa"], "Back Row": ["D. Wainiqolo", "P. Yato", "V. Mata"], "Scrum Halves": ["F. Lomani"], "Fly Halves": ["B. Volavola"], "Centres": ["S. Radradra", "W. Nayacalevu"], "Back Three": ["J. Tuisova", "M. Habosi"], "Fullback": ["K. Murimurivalu"] }},
    { country: "Japan", flag: "🇯🇵", tier: 2, dynamicSquad: { "Props": ["K. Inagaki", "Ji-won Gu"], "Hooker": ["S. Horie"], "Second Rows": ["L. Thompson", "W. Dearns"], "Back Row": ["M. Leitch", "P. Labuschagné", "K. Himeno"], "Scrum Halves": ["Y. Nagare"], "Fly Halves": ["Y. Tamura"], "Centres": ["R. Nakamura", "T. Lafaele"], "Back Three": ["K. Fukuoka", "K. Matsushima", "L. Yamanaka"] }},
    { country: "Italy", flag: "🇮🇹", tier: 2, dynamicSquad: { "Props": ["S. Perugini", "M. Castrogiovanni"], "Hooker": ["L. Ghiraldini"], "Second Rows": ["M. Bortolami", "F. Ruzza"], "Back Row": ["A. Zanni", "M. Lamaro", "S. Parisse"], "Scrum Halves": ["A. Troncon"], "Fly Halves": ["P. Garbisi"], "Centres": ["G. Canale", "J. Brex"], "Back Three": ["M. Bergamasco", "E. Ioane", "A. Capuozzo"] }},
    { country: "Samoa", flag: "🇼🇸", tier: 2, dynamicSquad: { "Props": ["C. Johnston", "L. Mulipola"], "Hooker": ["M. Schwalger"], "Second Rows": ["I. Tekori", "F. Levi"], "Back Row": ["M. Fa'asalele", "J. Lam", "S. Sione"], "Scrum Halves": ["K. Fotuali'i"], "Fly Halves": ["T. Pisi"], "Centres": ["S. Mapusua", "G. Pisi"], "Back Three": ["A. Tuilagi", "T. Nanai-Williams", "Tim Nanai"] }},
    { country: "Tonga", flag: "🇹🇴", tier: 2, dynamicSquad: { "Props": ["S. Taumalolo", "B. Tameifuna"], "Hooker": ["A. Lutui"], "Second Rows": ["S. Latu", "L. Lokotui"], "Back Row": ["S. Kalamafoni", "N. Latu", "V. Ma'afu"], "Scrum Halves": ["S. Takulua"], "Fly Halves": ["K. Morath"], "Centres": ["S. Piutau", "M. Fekitoa"], "Back Three": ["F. Vainikolo", "T. Veainu", "V. Lilo"] }},
    { country: "Georgia", flag: "🇬🇪", tier: 2, dynamicSquad: { "Props": ["D. Zirakashvili", "B. Gigashvili"], "Hooker": ["J. Bregvadze"], "Second Rows": ["K. Mikautadze", "N. Cheishvili"], "Back Row": ["M. Gorgodze", "G. Tskhadadze", "B. Saghinadze"], "Scrum Halves": ["V. Lobzhanidze"], "Fly Halves": ["L. Khmaladze"], "Centres": ["D. Kacharava", "M. Sharikadze"], "Back Three": ["A. Todua", "A. Niniashvili", "B. Tsiklauri"] }},
    { country: "Canada", flag: "🇨🇦", tier: 3, dynamicSquad: { "Props": ["R. Snow", "H. Sears-Duru"], "Hooker": ["P. Riordan"], "Second Rows": ["J. Cudmore", "B. Beukeboom"], "Back Row": ["A. Charron", "J. Moonlight", "T. Ardron"], "Scrum Halves": ["M. Williams"], "Fly Halves": ["G. Rees"], "Centres": ["C. Hearn", "D. van der Merwe"], "Back Three": ["W. Stanley", "D. Paris", "G. Pritchard"] }},
    { country: "United States", flag: "🇺🇸", tier: 3, dynamicSquad: { "Props": ["T. Lamositele", "E. Fry"], "Hooker": ["J. Taufete'e"], "Second Rows": ["S. Civetta", "G. Peterson"], "Back Row": ["T. Clever", "C. Dolan", "J. Quill"], "Scrum Halves": ["N. Augspurger"], "Fly Halves": ["A. MacGinty"], "Centres": ["P. Lasike", "M. Brache"], "Back Three": ["B. Scully", "T. Ngwenya", "C. Wyles"] }},
    { country: "Uruguay", flag: "🇺🇾", tier: 3, dynamicSquad: { "Props": ["M. Sanguinetti", "D. Arbelo"], "Hooker": ["G. Kessler"], "Second Rows": ["M. Leindekar", "I. Dotti"], "Back Row": ["M. Gaminara", "S. Civetta", "A. Ormaechea"], "Scrum Halves": ["S. Arata"], "Fly Halves": ["F. Berchesi"], "Centres": ["A. Vilaseca", "T. Inciarte"], "Back Three": ["G. Mieres", "N. Freitas", "R. Silva"] }}
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

// ELEMENT REGISTRY ARCHITECTURE
const setupCard = document.getElementById("setup-card");
const draftDashboard = document.getElementById("draft-dashboard");
const simDashboard = document.getElementById("sim-dashboard");
const spinBtn = document.getElementById("spin-btn");
const respinBtn = document.getElementById("respin-btn");
const respinCountText = document.getElementById("respin-count");
const rosterContainer = document.getElementById("roster-container");
const spinnerAnchor = document.getElementById("spinner-anchor");
const flagIndicator = document.getElementById("flag-indicator");
const statusText = document.getElementById("status-text");
const pitchCircles = document.querySelectorAll(".pitch-circle");

// APPLICATION EXPLICIT RESETS & THEME MANAGEMENT
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
    recalculateDashboardAverages();
});

spinBtn.addEventListener("click", triggerSpinEngineWithAnimation);
respinBtn.addEventListener("click", () => {
    if (respinsLeft > 0 && selectedPlayer === null) {
        respinsLeft--; respinCountText.textContent = respinsLeft;
        triggerSpinEngineWithAnimation();
    }
});

function triggerSpinEngineWithAnimation() {
    selectedPlayer = null;
    spinBtn.classList.add("disabled"); spinBtn.disabled = true;
    respinBtn.classList.add("disabled"); respinBtn.disabled = true;
    rosterContainer.innerHTML = ""; rosterContainer.classList.add("locked");
    flagIndicator.textContent = ""; statusText.textContent = "Querying historical global rosters...";
    spinnerAnchor.innerHTML = '<div class="rugby-spinner"></div>';

    setTimeout(() => {
        spinnerAnchor.innerHTML = ''; spinBtn.classList.remove("disabled"); spinBtn.disabled = false;
        
        const randRoll = Math.random();
        let targetTier = 1;
        if (randRoll > 0.70 && randRoll <= 0.90) targetTier = 2;
        else if (randRoll > 0.90) targetTier = 3;

        const tierCandidates = historicalNations.filter(n => n.tier === targetTier);
        const rolledNation = tierCandidates[Math.floor(Math.random() * tierCandidates.length)];
        const actualDisplayedYear = 1987 + (Math.floor(Math.random() * 10) * 4);

        flagIndicator.textContent = rolledNation.flag;
        statusText.textContent = `${rolledNation.country.toUpperCase()} (${actualDisplayedYear > 2023 ? 2023 : actualDisplayedYear}) Pool open. Assign player or select pitch item to remove.`;
        
        currentSpunSquad = [];
        let baseRatingModifier = rolledNation.tier === 1 ? 86 : rolledNation.tier === 2 ? 78 : 68;

        displayOrder.forEach(positionGroup => {
            const availableNames = rolledNation.dynamicSquad[positionGroup] || ["H. Player"];
            availableNames.forEach(realName => {
                let computedBase = baseRatingModifier + Math.floor(Math.random() * 6);
                if (rolledNation.overrideRatings && rolledNation.overrideRatings[realName] !== undefined) {
                    computedBase = rolledNation.overrideRatings[realName];
                }
                currentSpunSquad.push({
                    name: realName, pos: positionGroup,
                    rating: isCareerMode ? computedBase + 3 : computedBase
                });
            });
        });

        currentSpunSquad.sort((a, b) => displayOrder.indexOf(a.pos) - displayOrder.indexOf(b.pos));
        renderRosterList();
        rosterContainer.classList.remove("locked");
        if (respinsLeft > 0) { respinBtn.classList.remove("disabled"); respinBtn.disabled = false; }
    }, 1000);
}

function renderRosterList() {
    rosterContainer.innerHTML = "";
    let trackingCategory = ""; let targetBlock = null;

    currentSpunSquad.forEach(player => {
        if (player.pos !== trackingCategory) {
            trackingCategory = player.pos;
            const container = document.createElement("div"); container.className = "roster-group";
            const head = document.createElement("div"); head.className = "group-header"; head.textContent = trackingCategory;
            container.appendChild(head); rosterContainer.appendChild(container); targetBlock = container;
        }

        const cardRow = document.createElement("div"); cardRow.className = "player-row";
        if (claimedGlobalRoster.has(player.name)) cardRow.classList.add("claimed-lockout");
        
        const labelName = document.createElement("span"); labelName.className = "player-name"; labelName.textContent = player.name;
        const valRating = document.createElement("span"); valRating.className = "player-rating"; valRating.textContent = isKnowledgeMode ? "??" : player.rating;

        cardRow.appendChild(labelName); cardRow.appendChild(valRating); targetBlock.appendChild(cardRow);

        if (!claimedGlobalRoster.has(player.name)) {
            cardRow.addEventListener("click", () => {
                document.querySelectorAll(".player-row").forEach(r => r.classList.remove("selected"));
                cardRow.classList.add("selected"); selectedPlayer = player;
                evaluateEligibilityCircles(player);
            });
        }
    });
}

function evaluateEligibilityCircles(player) {
    pitchCircles.forEach(circle => {
        circle.classList.remove("highlight-eligible");
        if (circle.classList.contains("occupied")) return;
        if (positionFamilies[circle.dataset.pos] === player.pos) circle.classList.add("highlight-eligible");
    });
}

// REAL-TIME STATISTICAL RECALCULATION ENGINE
function recalculateDashboardAverages() {
    let totalSum = 0, forwardSum = 0, backSum = 0;
    let totalCount = 0, forwardCount = 0, backCount = 0;

    for (let pos in userTeam) {
        let val = userTeam[pos].score;
        totalSum += val; totalCount++;
        if (forwardPositions.includes(pos)) { forwardSum += val; forwardCount++; }
        if (backPositions.includes(pos)) { backSum += val; backCount++; }
    }

    document.getElementById("avg-global-ovr").textContent = totalCount > 0 ? Math.round(totalSum / totalCount) : "--";
    document.getElementById("avg-forward-ovr").textContent = forwardCount > 0 ? Math.round(forwardSum / forwardCount) : "--";
    document.getElementById("avg-back-ovr").textContent = backCount > 0 ? Math.round(backSum / backCount) : "--";
}

// INTERACTIVE ASSIGNMENT AND REMOVAL INTERFACE
pitchCircles.forEach(node => {
    node.addEventListener("click", () => {
        const badgePosition = node.dataset.pos;

        // REMOVAL PROCESS: Rollback assigned player before spinning again
        if (node.classList.contains("occupied")) {
            const removedPlayerName = userTeam[badgePosition].name;
            claimedGlobalRoster.delete(removedPlayerName);
            delete userTeam[badgePosition];
            spotsFilledCount--;

            node.classList.remove("occupied");
            node.innerHTML = "";
            node.removeAttribute("title");
            
            recalculateDashboardAverages();
            statusText.textContent = `Removed ${removedPlayerName}. Slot ${badgePosition} is now open for reassignment.`;
            if (currentSpunSquad.length > 0) renderRosterList();
            return;
        }

        if (!selectedPlayer) return;
        if (positionFamilies[badgePosition] !== selectedPlayer.pos) return;

        let calculatedValue = selectedPlayer.rating;
        let requiresTag = false;
        let penaltyExplanation = "";

        // POSITION PENALTY RULES (Props and Back Row Variant Configurations)
        if (selectedPlayer.pos === "Props" && badgePosition === "Loosehead Prop" && Math.random() > 0.5) {
            calculatedValue -= 4; requiresTag = true;
            penaltyExplanation = "Secondary Prop Assignment Penalty: Rating reduced by 4 points due to non-specialist loosehead adjustment variance.";
        }
        if (selectedPlayer.pos === "Back Row") {
            if ((badgePosition === "Blindside Flanker" || badgePosition === "Openside Flanker") && Math.random() > 0.6) {
                calculatedValue -= 3; requiresTag = true;
                penaltyExplanation = "Flanker Specialization Shift: Rating reduced by 3 points due to strategic flank deployment variance.";
            } else if (badgePosition === "Number 8" && Math.random() > 0.5) {
                calculatedValue -= 5; requiresTag = true;
                penaltyExplanation = "Spine Anchoring Shift: Rating reduced by 5 points due to moving a natural flanker to Number 8.";
            }
        }

        userTeam[badgePosition] = { name: selectedPlayer.name, score: calculatedValue };
        claimedGlobalRoster.add(selectedPlayer.name);

        node.classList.add("occupied");
        node.classList.remove("highlight-eligible");
        node.innerHTML = `<div class="circle-num">${calculatedValue}</div><div class="circle-name">${selectedPlayer.name}</div>`;

        if (requiresTag) {
            const shiftBadge = document.createElement("div");
            shiftBadge.className = "penalty-tag"; shiftBadge.textContent = "OVR -";
            const tooltip = document.createElement("span");
            tooltip.className = "tooltip-box"; tooltip.textContent = penaltyExplanation;
            shiftBadge.appendChild(tooltip); node.appendChild(shiftBadge);
        }

        spotsFilledCount++;
        selectedPlayer = null;
        currentSpunSquad = [];
        rosterContainer.classList.add("locked");
        respinBtn.classList.add("disabled"); respinBtn.disabled = true;
        
        pitchCircles.forEach(c => c.classList.remove("highlight-eligible"));
        recalculateDashboardAverages();

        if (spotsFilledCount === 15) {
            statusText.textContent = "Roster optimized. System prepared for tournament sim.";
            draftDashboard.classList.add("hidden"); simDashboard.classList.remove("hidden");
        } else {
            statusText.textContent = "Selection processed. Run SPIN SQUAD to roll alternative options.";
        }
    });
});

// MULTI-LINE LINEAR LIVE TOURNAMENT ENGINE
document.getElementById("run-sim-btn").addEventListener("click", () => {
    let globalSum = 0;
    for (let k in userTeam) globalSum += userTeam[k].score;
    const squadOvr = Math.round(globalSum / 15);
    const logs = document.getElementById("sim-results");
    const simBtn = document.getElementById("run-sim-btn");
    
    simBtn.classList.add("disabled"); simBtn.disabled = true;
    logs.innerHTML = `<span class="sim-log-line system-meta">[CONFIG] Injecting hybrid squad into world tournament...</span>`;
    logs.innerHTML += `<span class="sim-log-line system-meta">[RATING] Finalized Combined Squad Level: ${squadOvr} OVR</span><br>`;

    function calculateFixture(teamRating, opponentRating) {
        const spread = teamRating - opponentRating;
        const baseVariance = Math.floor(Math.random() * 12) - 6; 
        let teamScore = Math.max(3, Math.round(24 + (spread * 1.5) + baseVariance));
        let oppScore = Math.max(0, Math.round(16 - (spread * 0.9) - baseVariance));
        if (teamScore === oppScore) Math.random() > 0.5 ? teamScore += 3 : oppScore += 3;
        return { team: teamScore, opp: oppScore, win: teamScore > oppScore };
    }

    function getOpponent(tier) {
        const pool = historicalNations.filter(n => n.tier === tier && n.country !== replacedCountryTarget);
        const match = pool[Math.floor(Math.random() * pool.length)];
        return `${match.flag} ${match.country}`;
    }

    const matchSchedule = [
        { name: "POOL FIXTURE 1", opp: getOpponent(3), rtg: 72 },
        { name: "POOL FIXTURE 2", opp: getOpponent(2), rtg: 79 },
        { name: "QUARTER FINAL", opp: getOpponent(1), rtg: 85 },
        { name: "SEMI FINAL", opp: getOpponent(1), rtg: 88 },
        { name: "WORLD CUP GRAND FINAL", opp: getOpponent(1), rtg: 92 }
    ];

    let currentStep = 0;

    function runNextFixture() {
        if (currentStep >= matchSchedule.length) {
            logs.innerHTML += `<br><span class="sim-log-line victory-status">🏆 Congratulations, you won the World Cup!</span>`;
            logs.scrollTop = logs.scrollHeight;
            document.getElementById("restart-btn").classList.remove("hidden");
            return;
        }

        const match = matchSchedule[currentStep];
        if (currentStep === 2) {
            logs.innerHTML += `<span class="sim-log-line header-bracket">--- KNOCKOUT ROUNDS BRACKET ---</span>`;
        }

        logs.innerHTML += `<span class="sim-log-line">⏳ Simulating ${match.name} vs ${match.opp}...</span>`;
        logs.scrollTop = logs.scrollHeight;

        setTimeout(() => {
            const res = calculateFixture(squadOvr, match.rtg);
            
            // Re-formatting string to put every outcome strictly onto an isolated, independent line element
            logs.innerHTML += `<span class="sim-log-line">🏉 Result: Hybrid XV ${res.team} - ${res.opp} (${match.opp})</span>`;
            logs.scrollTop = logs.scrollHeight;

            if (!res.win) {
                logs.innerHTML += `<br><span class="sim-log-line defeat-status">❌ Unlucky, you didn't win this time. Why don't you try again?</span>`;
                logs.scrollTop = logs.scrollHeight;
                document.getElementById("restart-btn").classList.remove("hidden");
                return;
            }

            currentStep++;
            runNextFixture();
        }, 2000);
    }

    runNextFixture();
});

document.getElementById("restart-btn").addEventListener("click", () => { location.reload(); });
