const positionFamilies = {
    "Loosehead Prop": "Props", "Tighthead Prop": "Props", "Hooker": "Hooker",
    "Lock 4": "Second Rows", "Lock 5": "Second Rows", "Blindside Flanker": "Back Row",
    "Openside Flanker": "Back Row", "Number 8": "Back Row", "Scrum-half": "Scrum Halves",
    "Fly-half": "Fly Halves", "Inside Centre": "Centres", "Outside Centre": "Centres",
    "Left Wing": "Back Three", "Right Wing": "Back Three", "Fullback": "Back Three"
};

// THE ALL-NATION HISTORICAL MATRICES (26 Certified Tournament Competitors)
const historicalNations = [
    { country: "New Zealand", flag: "🇳🇿", tier: 1, dynamicSquad: { "Props": ["T. Woodcock", "O. Franks"], "Hooker": ["K. Mealamu"], "Second Rows": ["B. Retallick", "S. Whitelock"], "Back Row": ["J. Kaino", "R. McCaw", "K. Read"], "Scrum Halves": ["A. Smith"], "Fly Halves": ["D. Carter"], "Centres": ["M. Nonu", "C. Smith"], "Back Three": ["J. Savea", "B. Smith", "J. Lomu"] }},
    { country: "South Africa", flag: "🇿🇦", tier: 1, dynamicSquad: { "Props": ["O. du Randt", "F. Malherbe"], "Hooker": ["B. du Plessis"], "Second Rows": ["E. Etzebeth", "V. Matfield"], "Back Row": ["S. Burger", "S. Kolisi", "D. Vermeulen"], "Scrum Halves": ["F. de Klerk"], "Fly Halves": ["H. Pollard"], "Centres": ["D. de Allende", "L. Am"], "Back Three": ["B. Habana", "C. Kolbe", "P. Montgomery"] }},
    { country: "England", flag: "🇬🇧", tier: 1, dynamicSquad: { "Props": ["P. Vickery", "J. Leonard"], "Hooker": ["P. Thompson"], "Second Rows": ["M. Johnson", "B. Kay"], "Back Row": ["R. Hill", "N. Back", "L. Dallaglio"], "Scrum Halves": ["M. Dawson"], "Fly Halves": ["J. Wilkinson"], "Centres": ["W. Greenwood", "M. Tindall"], "Back Three": ["B. Cohen", "J. Robinson", "M. Cueto"] }},
    { country: "France", flag: "🇫🇷", tier: 1, dynamicSquad: { "Props": ["S. Marconnet", "N. Mas"], "Hooker": ["W. Servat"], "Second Rows": ["F. Pelous", "L. Nallet"], "Back Row": ["T. Dusautoir", "I. Harinordoquy", "G. Alldritt"], "Scrum Halves": ["A. Dupont"], "Fly Halves": ["F. Michalak"], "Centres": ["Y. Jauzion", "G. Fickou"], "Back Three": ["V. Clerc", "D. Penaud", "T. Ramos"] }},
    { country: "Ireland", flag: "🇮🇪", tier: 1, dynamicSquad: { "Props": ["A. Porter", "T. Furlong"], "Hooker": ["D. Sheehan"], "Second Rows": ["P. O'Connell", "J. Ryan"], "Back Row": ["P. O'Mahony", "J. van der Flier", "C. Doris"], "Scrum Halves": ["J. Gibson-Park"], "Fly Halves": ["J. Sexton"], "Centres": ["B. O'Driscoll", "B. Aki"], "Back Three": ["M. Hansen", "J. Lowe", "H. Keenan"] }},
    { country: "Australia", flag: "🇦🇺", tier: 1, dynamicSquad: { "Props": ["E. McKenzie", "A. Baxter"], "Hooker": ["P. Kearns"], "Second Rows": ["J. Eales", "N. Sharpe"], "Back Row": ["O. Finegan", "G. Smith", "T. Kefu"], "Scrum Halves": ["G. Gregan"], "Fly Halves": ["S. Larkham"], "Centres": ["T. Horan", "S. Mortlock"], "Back Three": ["D. Campese", "L. Tuqiri", "C. Latham"] }},
    // WALES ESCAPE CODE
    { country: "Wales", flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}", tier: 1, dynamicSquad: { "Props": ["G. Jenkins", "A. Jones"], "Hooker": ["K. Owens"], "Second Rows": ["A. W. Jones", "L. Charteris"], "Back Row": ["D. Lydiate", "S. Warburton", "T. Faletau"], "Scrum Halves": ["M. Phillips"], "Fly Halves": ["D. Biggar"], "Centres": ["J. Roberts", "J. Davies"], "Back Three": ["S. Williams", "G. North", "L. Halfpenny"] }},
    // SCOTLAND ESCAPE CODE
    { country: "Scotland", flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}", tier: 2, dynamicSquad: { "Props": ["P. Wright", "Z. Fagerson"], "Hooker": ["C. Lawson"], "Second Rows": ["R. Gray", "G. Gilchrist"], "Back Row": ["J. White", "H. Watson", "M. Leslie"], "Scrum Halves": ["G. Laidlaw"], "Fly Halves": ["F. Russell"], "Centres": ["S. Hastings", "M. Harris"], "Back Three": ["D. van der Merwe", "T. Seymour", "S. Hogg"] }},
    { country: "Argentina", flag: "🇦🇷", tier: 2, dynamicSquad: { "Props": ["R. Roncero", "M. Scelzo"], "Hooker": ["M. Ledesma"], "Second Rows": ["P. Albacete", "T. Lavanini"], "Back Row": ["P. Matera", "M. Kremer", "J.M. Leguizamón"], "Scrum Halves": ["A. Pichot"], "Fly Halves": ["F. Contepomi"], "Centres": ["J.M. Hernández", "M. Moroni"], "Back Three": ["H. Agulla", "E. Boffelli", "J.C. Mallía"] }},
    { country: "Fiji", flag: "🇫🇯", tier: 2, dynamicSquad: { "Props": ["E. Mawi", "M. Saulo"], "Hooker": ["S. Matavesi"], "Second Rows": ["L. Nakarawa", "A. Ratuniyarawa"], "Back Row": ["D. Wainiqolo", "P. Yato", "V. Mata"], "Scrum Halves": ["F. Lomani"], "Fly Halves": ["B. Volavola"], "Centres": ["S. Radradra", "W. Nayacalevu"], "Back Three": ["J. Tuisova", "M. Habosi"], "Fullback": ["K. Murimurivalu"] }},
    { country: "Japan", flag: "🇯🇵", tier: 2, dynamicSquad: { "Props": ["K. Inagaki", "Ji-won Gu"], "Hooker": ["S. Horie"], "Second Rows": ["L. Thompson", "W. Dearns"], "Back Row": ["M. Leitch", "P. Labuschagné", "K. Himeno"], "Scrum Halves": ["Y. Nagare"], "Fly Halves": ["Y. Tamura"], "Centres": ["R. Nakamura", "T. Lafaele"], "Back Three": ["K. Fukuoka", "K. Matsushima", "L. Yamanaka"] }},
    { country: "Italy", flag: "🇮🇹", tier: 2, dynamicSquad: { "Props": ["S. Perugini", "M. Castrogiovanni"], "Hooker": ["L. Ghiraldini"], "Second Rows": ["M. Bortolami", "F. Ruzza"], "Back Row": ["A. Zanni", "M. Lamaro", "S. Parisse"], "Scrum Halves": ["A. Troncon"], "Fly Halves": ["P. Garbisi"], "Centres": ["G. Canale", "J. Brex"], "Back Three": ["M. Bergamasco", "E. Ioane", "A. Capuozzo"] }},
    { country: "Samoa", flag: "🇼🇸", tier: 2, dynamicSquad: { "Props": ["C. Johnston", "L. Mulipola"], "Hooker": ["M. Schwalger"], "Second Rows": ["I. Tekori", "F. Levi"], "Back Row": ["M. Fa'asalele", "J. Lam", "S. Sione"], "Scrum Halves": ["K. Fotuali'i"], "Fly Halves": ["T. Pisi"], "Centres": ["S. Mapusua", "G. Pisi"], "Back Three": ["A. Tuilagi", "T. Nanai-Williams", "Tim Nanai"] }},
    { country: "Tonga", flag: "🇹🇴", tier: 2, dynamicSquad: { "Props": ["S. Taumalolo", "B. Tameifuna"], "Hooker": ["A. Lutui"], "Second Rows": ["S. Latu", "L. Lokotui"], "Back Row": ["S. Kalamafoni", "N. Latu", "V. Ma'afu"], "Scrum Halves": ["S. Takulua"], "Fly Halves": ["K. Morath"], "Centres": ["S. Piutau", "M. Fekitoa"], "Back Three": ["F. Vainikolo", "T. Veainu", "V. Lilo"] }},
    { country: "Georgia", flag: "🇬🇪", tier: 2, dynamicSquad: { "Props": ["D. Zirakashvili", "B. Gigashvili"], "Hooker": ["J. Bregvadze"], "Second Rows": ["K. Mikautadze", "N. Cheishvili"], "Back Row": ["M. Gorgodze", "G. Tskhadadze", "B. Saghinadze"], "Scrum Halves": ["V. Lobzhanidze"], "Fly Halves": ["L. Khmaladze"], "Centres": ["D. Kacharava", "M. Sharikadze"], "Back Three": ["A. Todua", "A. Niniashvili", "B. Tsiklauri"] }},
    { country: "Canada", flag: "🇨🇦", tier: 3, dynamicSquad: { "Props": ["R. Snow", "H. Sears-Duru"], "Hooker": ["P. Riordan"], "Second Rows": ["J. Cudmore", "B. Beukeboom"], "Back Row": ["A. Charron", "J. Moonlight", "T. Ardron"], "Scrum Halves": ["G. Rees"], "Fly Halves": ["G. Pritchard"], "Centres": ["C. Hearn", "D. van der Merwe"], "Back Three": ["W. Stanley", "D. Paris", "J. Elkinson"] }},
    { country: "United States", flag: "🇺🇸", tier: 3, dynamicSquad: { "Props": ["T. Lamositele", "E. Fry"], "Hooker": ["J. Taufete'e"], "Second Rows": ["S. Civetta", "G. Peterson"], "Back Row": ["A. MacGinty", "T. Clever", "C. Dolan"], "Scrum Halves": ["N. Augspurger"], "Fly Halves": ["M. Brache"], "Centres": ["P. Lasike", "B. Campbell"], "Back Three": ["B. Scully", "T. Ngwenya"], "Fullback": ["C. Wyles"] }},
    { country: "Uruguay", flag: "🇺🇾", tier: 3, dynamicSquad: { "Props": ["M. Sanguinetti", "D. Arbelo"], "Hooker": ["G. Kessler"], "Second Rows": ["M. Leindekar", "I. Dotti"], "Back Row": ["M. Gaminara", "S. Civetta", "A. Ormaechea"], "Scrum Halves": ["S. Arata"], "Fly Halves": ["F. Berchesi"], "Centres": ["A. Vilaseca", "T. Inciarte"], "Back Three": ["G. Mieres", "N. Freitas", "R. Silva"] }},
    { country: "Namibia", flag: "🇳🇦", tier: 3, dynamicSquad: { "Props": ["J. Redelinghuys", "A. Coetzee"], "Hooker": ["T. van Jaarsveld"], "Second Rows": ["T. Uanivi", "H. Ludik"], "Back Row": ["J. Burger", "T. Forbes", "R. Kitshoff"], "Scrum Halves": ["E. Jantjies"], "Fly Halves": ["T. Kotze"], "Centres": ["D. de la Harpe", "J. Deysel"], "Back Three": ["C. Bouwer", "J. Tromp", "M. Loubser"] }},
    { country: "Portugal", flag: "🇵🇹", tier: 3, dynamicSquad: { "Props": ["F. Fernandes", "D. Costa"], "Hooker": ["M. Tadjer"], "Second Rows": ["J. Madeira", "S. Cerqueira"], "Back Row": ["D. Wallis", "N. Martins", "R. Marta"], "Scrum Halves": ["S. Marques"], "Fly Halves": ["J. Lima"], "Centres": ["T. Appleton", "P. Bettencourt"], "Back Three": ["R. Storti", "V. Pinto", "N. Guedes"] }},
    { country: "Spain", flag: "🇪🇸", tier: 3, dynamicSquad: { "Props": ["J. Zapatero", "V. Torres"], "Hooker": ["F. Velazco"], "Second Rows": ["A. Souto", "M. Auzqui"], "Back Row": ["A. Mata", "C. Gavidi", "G. Lopez"], "Scrum Halves": ["G. Rouet"], "Fly Halves": ["M. Linklater"], "Centres": ["F. Sempere", "A. Gimeno"], "Back Three": ["J. Lopez", "S. Aubanell", "C. Pinto"] }},
    { country: "Zimbabwe", flag: "🇿🇼", tier: 3, dynamicSquad: { "Props": ["A. Mutamangira", "P. Larat"], "Hooker": ["K. Barrett"], "Second Rows": ["M. Nico", "B. Brider"], "Back Row": ["S. Bera", "N. Ndlovu", "B. Tsimba"], "Scrum Halves": ["C. Makwanya"], "Fly Halves": ["G. Tsimba"], "Centres": ["O. Ndlovu", "D. Walters"], "Back Three": ["W. Mbanje", "G. Sibanda", "M. Tsimba"] }},
    { country: "Russia", flag: "🇷🇺", tier: 3, dynamicSquad: { "Props": ["A. Khrokin", "E. Pronenko"], "Hooker": ["V. Korshunov"], "Second Rows": ["A. Voytov", "D. Antonov"], "Back Row": ["A. Garbuzov", "V. Gresev", "A. Temnov"], "Scrum Halves": ["A. Shakirov"], "Fly Halves": ["Y. Kushnarev"], "Centres": ["D. Gerasimov", "M. Babaev"], "Back Three": ["V. Artemyev", "D. Simplikevich", "I. Klyuchnikov"] }},
    { country: "Chile", flag: "🇨🇱", tier: 3, dynamicSquad: { "Props": ["J. Lues", "M. Dittus"], "Hooker": ["A. Böhme"], "Second Rows": ["C. Saavedra", "P. Huete"], "Back Row": ["M. Sigren", "I. Silva", "A. Ayarza"], "Scrum Halves": ["M. Torrealba"], "Fly Halves": ["R. Fernández"], "Centres": ["D. Saavedra", "M. Garafulic"], "Back Three": ["S. Videla", "N. Garafulic", "F. Velarde"] }},
    { country: "Ivory Coast", flag: "🇨🇮", tier: 3, dynamicSquad: { "Props": ["T. Dali", "P. Kama"], "Hooker": ["E. Moni"], "Second Rows": ["G. Pere", "B. Castiglioni"], "Back Row": ["A. Lassissi", "P. Bouazo", "D. Camara"], "Scrum Halves": ["F. Castiglioni"], "Fly Halves": ["A. Chiche"], "Centres": ["L. Niakou", "D. N'Gbala"], "Back Three": ["C. Kouassi", "J. Granval", "V. Okou"] }},
    { country: "Romania", flag: "🇷🇴", tier: 3, dynamicSquad: { "Props": ["I. Paulica", "M. Lazar"], "Hooker": ["O. Tonita"], "Second Rows": ["C. Petre", "V. Poparlan"], "Back Row": ["M. Macovei", "S. Burcea", "V. Lucaci"], "Scrum Halves": ["F. Surugiu"], "Fly Halves": ["D. Dumbrava"], "Centres": ["R. Gontineac", "C. Gal"], "Back Three": ["C. Fercu", "M. Lemnaru"], "Fullback": ["I. Dumitru"] }}
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
const flagIndicator = document.getElementById("flag-indicator");
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

function triggerSpinEngineWithAnimation() {
    selectedPlayer = null;
    spinBtn.classList.add("disabled"); spinBtn.disabled = true;
    respinBtn.classList.add("disabled"); respinBtn.disabled = true;
    rosterContainer.innerHTML = "";
    rosterContainer.classList.add("locked");

    flagIndicator.textContent = "";
    statusText.textContent = "Querying historical global rosters...";
    spinnerAnchor.innerHTML = '<div class="rugby-spinner"></div>';

    setTimeout(() => {
        spinnerAnchor.innerHTML = ''; 
        spinBtn.classList.remove("disabled"); spinBtn.disabled = false;

        // TRUE RANDOM POOL PICK OUT OF ALL 26 NATIONS
        const rolledNation = historicalNations[Math.floor(Math.random() * historicalNations.length)];
        const rolledYear = 1987 + (Math.floor(Math.random() * 10) * 4);
        const actualDisplayedYear = rolledYear > 2023 ? 2023 : rolledYear;

        // VISUAL SYSTEM FLAGS UPDATE TERMINAL LATCH
        flagIndicator.textContent = rolledNation.flag;
        statusText.textContent = `${rolledNation.country.toUpperCase()} (${actualDisplayedYear}) Pool Open. Assign your player.`;
        
        currentSpunSquad = [];
        let baseRatingModifier = rolledNation.tier === 1 ? 88 : rolledNation.tier === 2 ? 79 : 68;

        displayOrder.forEach(positionGroup => {
            const availableNames = rolledNation.dynamicSquad[positionGroup] || ["H. Player", "X. Replacement"];
            
            availableNames.forEach(realName => {
                let computedBase = baseRatingModifier + Math.floor(Math.random() * 8);
                currentSpunSquad.push({
                    name: realName,
                    pos: positionGroup,
                    rating: isCareerMode ? computedBase + 4 : computedBase
                });
            });
        });

        currentSpunSquad.sort((a, b) => displayOrder.indexOf(a.pos) - displayOrder.indexOf(b.pos));
        renderRosterList();
        
        rosterContainer.classList.remove("locked");
        if (respinsLeft > 0) {
            respinBtn.classList.remove("disabled");
            respinBtn.disabled = false;
        }
    }, 1000); 
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

        if (selectedPlayer.pos === "Props" && badgePosition === "Loosehead Prop" && Math.random() > 0.6) {
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

    const match1 = calculateFixture(squadOvr, 82);
    logs.innerHTML += `[POOL FIXTURE 1] Vs Initial Challenger\nScoreline: Hybrid XV ${match1.team} - ${match1.opp} Opponent\n\n`;
    const match2 = calculateFixture(squadOvr, 76);
    logs.innerHTML += `[POOL FIXTURE 2] Vs Mid-tier Seed\nScoreline: Hybrid XV ${match2.team} - ${match2.opp} Opponent\n\n`;

    const qf = calculateFixture(squadOvr, 86);
    logs.innerHTML += `--- KNOCKOUT ROUNDS BRACKET ---\n[QUARTER FINAL] Vs Championship Contender\nScoreline: Hybrid XV ${qf.team} - ${qf.opp} Opponent\n`;
    
    if (!qf.win) {
        logs.innerHTML += `\n❌ RUN TERMINATED: Defeated in the Quarter-Finals stage.`;
    } else {
        const sf = calculateFixture(squadOvr, 89);
        logs.innerHTML += `\n[SEMI FINAL] Vs Major Superpower\nScoreline: Hybrid XV ${sf.team} - ${sf.opp} Opponent\n`;
        
        if (!sf.win) {
            logs.innerHTML += `\n❌ RUN TERMINATED: Defeated in the Semi-Finals tier.`;
        } else {
            const f = calculateFixture(squadOvr, 92);
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
