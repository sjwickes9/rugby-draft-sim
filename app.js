// TACTICAL NODE POSITION FAMILIES
const positionFamilies = {
    "Loosehead Prop": "Props", "Tighthead Prop": "Props", "Hooker": "Hookers",
    "Lock 4": "Locks", "Lock 5": "Locks", "Blindside Flanker": "Back Row",
    "Openside Flanker": "Back Row", "Number 8": "Back Row", "Scrum-half": "Scrum Halves",
    "Fly-half": "Fly Halves", "Inside Centre": "Centres", "Outside Centre": "Centres",
    "Left Wing": "Back Three", "Right Wing": "Back Three", "Fullback": "Back Three"
};

const displayOrder = ["Props", "Hookers", "Locks", "Back Row", "Scrum Halves", "Fly Halves", "Centres", "Back Three"];

// COMPREHENSIVE RUGBY WORLD CUP ALL-TIME COMPETITORS
// Divided by Tiers to implement the random team generator weighting
const tier1Nations = [
    { country: "New Zealand", flag: "🇳🇿", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["McCaw", "Carter", "Whitelock", "Read", "Nonu", "Smith", "Savea", "Mealamu", "Franks", "Retallick", "Barrett", "Woodcock", "Kaino", "Perenara", "Williams"] },
    { country: "South Africa", flag: "🇿🇦", years: ["1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Etzebeth", "Vermeulen", "Kolbe", "du Toit", "Habana", "de Klerk", "Pollard", "Mtawarira", "Am", "de Allende", "Marx", "Malherbe", "Kitshoff", "Mostert", "Kolisi"] },
    { country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Wilkinson", "Johnson", "Dallaglio", "Robinson", "Greenwood", "Back", "Hill", "Vickery", "Thompson", "Dawson", "Tindall", "Farrell", "Itoje", "Tuilagi", "Underhill"] },
    { country: "France", flag: "🇫🇷", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Dupont", "Alldritt", "Penaud", "Ntamack", "Fickou", "Baille", "Atonio", "Marchand", "Flament", "Ramos", "Jalibert", "Ollivon", "Cros", "Danty", "Willemse"] },
    { country: "Ireland", flag: "🇮🇪", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Sexton", "Furlong", "Aki", "van der Flier", "Porter", "Sheehan", "Ryan", "Beirne", "Doris", "Gibson-Park", "Lowe", "Keenan", "O'Mahony", "Hansen", "Ringrose"] },
    { country: "Australia", flag: "🇦🇺", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Eales", "Gregan", "Horan", "Larkham", "Mortlock", "Smith", "Kefu", "Finegan", "Sharpe", "Campese", "Hooper", "Pocock", "Genia", "Cooper", "Ashley-Cooper"] },
    { country: "Wales", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["A.W. Jones", "Warburton", "Faletau", "Halfpenny", "North", "Roberts", "Davies", "Jenkins", "Jones", "Phillips", "Williams", "Tipuric", "Biggar", "Owens", "Davies"] },
    { country: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Hogg", "Russell", "Van der Merwe", "Schoeman", "Turner", "Z. Fagerson", "Gray", "Gilchrist", "Ritchie", "Darge", "Dempsey", "Price", "Jones", "Tuipulotu", "Kinghorn"] },
    { country: "Argentina", flag: "🇦🇷", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Pichot", "Contepomi", "Hernandez", "Lobbe", "Ronceron", "Creevy", "Montoya", "Gallo", "Lavanini", "Matera", "Kremer", "Bertranou", "Carreras", "Chocobares", "Boffelli"] },
    { country: "Italy", flag: "🇮🇹", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Parisse", "Castrogiovanni", "Zanni", "Ghiraldini", "Troncon", "Dominguez", "Masi", "Fischetti", "Nicotera", "Ruzza", "Cannone", "Negri", "Lamaro", "Garbisi", "Capuozzo"] }
];

const tier2Nations = [
    { country: "Japan", flag: "🇯🇵", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Leitch", "Horie", "Inagaki", "Valu", "Dearns", "姬野", "Labuschagne", "Nagare", "Matsuda", "Nakamura", "Riley", "Naikabula", "Matsushima", "Yamanaka", "Tamura"] },
    { country: "Fiji", flag: "🇫🇯", years: ["1987", "1991", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Nayacalevu", "Radradra", "Tuisova", "Mata", "Botia", "Mawi", "Ikanivere", "Tagi", "Nasilasila", "Cirikidaveta", "Derenalagi", "Kuruvoli", "Tela", "Habosi", "Droasese"] },
    { country: "Samoa", flag: "🇼🇸", years: ["1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Tuilagi", "Alatimu", "Taumateine", "Seuteni", "Manu", "Fidow", "Lay", "Malolo", "Alaalatoa", "Vui", "McFarland", "Luatua", "Lee", "Mapusua", "Treformat"] },
    { country: "Tonga", flag: "🇹🇴", years: ["1987", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Piutau", "Fekitoa", "Ahki", "Taumalolo", "Mafi", "Fisi'ihoi", "Ngauamo", "Tameifuna", "Lousi", "Fifita", "Halaifonua", "Takulua", "Havili", "Kata", "Veainu"] },
    { country: "Georgia", flag: "🇬🇪", years: ["2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Gorgodze", "Niniashvili", "Lobzhanidze", "Sharikadze", "Abzhandadze", "Nariashvili", "Mamukashvili", "Gigashvili", "Cheishvili", "Mikautadze", "T堅持adze", "Saghinadze", "Jalagonia", "Tabutsadze", "Todua"] },
    { country: "Romania", flag: "🇷🇴", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2023"], rawNames: ["Gajion", "Cojocaru", "Gordas", "Iftimiciuc", "Motoc", "Gorcioaia", "Neculau", "Chirica", "Rupanu", "Boldor", "Tangimana", "Gafurova", "Manumua", "Simionescu", "Conache"] },
    { country: "Canada", flag: "🇨🇦", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019"], rawNames: ["Cudmore", "Ardron", "Olmstead", "Blevins", "Hearn", "Paris", "Mack", "McRorie", "Braid", "Evans", "Barkwill", "Sears", "Buydens", "Djustice", "Tierney"] },
    { country: "USA", flag: "🇺🇸", years: ["1987", "1991", "1999", "2003", "2007", "2011", "2015", "2019"], rawNames: ["Scully", "MacGinty", "Maninoa", "Lamositele", "Taufete'e", "Civetta", "Fry", "Dolan", "Blaine", "Augspurger", "Campbell", "Brache", "Iosefo", "Te'o", "Wyles"] },
    { country: "Namibia", flag: "🇳🇦", years: ["1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Burger", "Coetzee", "Deysel", "Stevens", "van Jaarsveld", "Sethie", "Nortje", "Gaoseb", "Katjijeko", "Conradie", "Loubser", "De la Harpe", "Greyling", "van der Westhuizen", "Tromp"] },
    { country: "Uruguay", flag: "🇺🇾", years: ["1999", "2003", "2015", "2019", "2023"], rawNames: ["Ormaechea", "Berchesi", "Magno", "Sanguinetti", "Kessler", "Peculo", "Aliaga", "Leindekar", "Ardao", "Civetta", "Arata", "Etcheverry", "Vilaseca", "Inciarte", "Amaya"] },
    { country: "Spain", flag: "🇪🇸", years: ["1999"], rawNames: ["Alvarado", "Zapata", "Feijoo", "Souto", "Moreno", "Guzman", "del Valle", "Bonan", "Guillaume", "Rouet", "Linklater", "Lopez", "Malie", "Gavin", "Contardi"] },
    { country: "Portugal", flag: "🇵🇹", years: ["2007", "2023"], rawNames: ["Marques", "Storti", "Tadjer", "Fernandes", "Madeira", "Martins", "Wallis", "Granate", "Simões", "Lucas", "Jerónimo", "Lima", "Bettencourt", "Marta", "Sousa"] },
    { country: "Russia", flag: "🇷🇺", years: ["2011", "2019"], rawNames: ["Artemyev", "Ostrikov", "Kushnarev", "Yanyushkin", "Galinovskiy", "Gerasimov", "Ostroushko", "Bitiev", "Matveev", "Gotovtsev", "Fedotko", "Gadjiev", "Vavilin", "Perov", "Davydov"] },
    { country: "Zimbabwe", flag: "🇿🇼", years: ["1987", "1991"], rawNames: ["Grobler", "Tsimba", "Chiutsi", "Olonga", "Mberi", "Buitendag", "Chivandire", "Mutamangira", "Makwanya", "Hondo", "Sibanda", "Nyamutsamba", "Mudariki", "Ndlovu", "Chitokwindo"] },
    { country: "Ivory Coast", flag: "🇨🇮", years: ["1995"], rawNames: ["Okou", "Dali", "Niakou", "Camara", "N'Goran", "Pere", "Kone", "Gamba", "Bile", "Quansah", "N'Guessan", "Lath", "Zahui", "Dago", "Kouassi"] },
    { country: "Chile", flag: "🇨🇱", years: ["2023"], rawNames: ["Lues", "Bohme", "Inostroza", "Eissmann", "Pedrero", "Saavedra", "Martinez", "Sigren", "Videla", "Carvallo", "Garafulic", "Fernandez", "Ayarza", "Velarde", "Larenas"] }
];

// RE-USABLE CONSTANTS FOR FORWARDS AND BACKS SPLITS
const forwardPositions = ["Loosehead Prop", "Hooker", "Tighthead Prop", "Lock 4", "Lock 5", "Blindside Flanker", "Openside Flanker", "Number 8"];
const backPositions = ["Scrum-half", "Fly-half", "Inside Centre", "Outside Centre", "Left Wing", "Right Wing", "Fullback"];

let userTeam = {};
let currentSpunSquad = [];
let selectedPlayer = null;
let respinsLeft = 0;
let isKnowledgeMode = false;
let isCareerMode = false;
let spotsFilledCount = 0;
let playerSelectedFromCurrentPool = false;
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

// GENERATOR FEATURING 75% TIER 1 / 25% TIER 2 RANDOM WEIGHTING CONTEXT
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
        
        // 75% Tier 1 powerhouse weighting constraint logic
        const isTier1 = Math.random() < 0.75;
        const targetPool = isTier1 ? tier1Nations : tier2Nations;
        const selectedNation = targetPool[Math.floor(Math.random() * targetPool.length)];
        const selectedYear = selectedNation.years[Math.floor(Math.random() * selectedNation.years.length)];
        
        flagIndicator.textContent = selectedNation.flag;
        statusText.textContent = `${selectedNation.country.toUpperCase()} (${selectedYear}) Pool opened. Choose ONE player.`;
        
        currentSpunSquad = [];
        
        // Populate exactly 23 structured positions allocated cleanly via positional brackets
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
                const baseSur = selectedNation.rawNames[nameIndex % selectedNation.rawNames.length];
                const finalName = (dist.prefixes[i] || "J. ") + baseSur;
                nameIndex++;

                // Build performance baseline indexing systems scaled safely to separate tier distributions
                let baseValue = isTier1 ? (84 + Math.floor(Math.random() * 9)) : (72 + Math.floor(Math.random() * 10));
                
                // Scale peaks uniquely whenever structural configurations switch inside setup panels
                if (isCareerMode) {
                    baseValue += Math.floor(Math.random() * 5);
                }

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
}

const runSimBtn = document.getElementById("run-sim-btn");
if (runSimBtn) {
    runSimBtn.addEventListener("click", () => {
        const squadOvr = getGlobalTeamAverage();
        const logs = document.getElementById("sim-results");
        
        runSimBtn.classList.add("disabled"); runSimBtn.disabled = true;
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
