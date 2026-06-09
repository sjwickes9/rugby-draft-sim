// Structural Position Families Mapping
const positionFamilies = {
    "Loosehead Prop": "Props", "Tighthead Prop": "Props", "Hooker": "Hookers",
    "Lock 4": "Locks", "Lock 5": "Locks", "Blindside Flanker": "Back Row",
    "Openside Flanker": "Back Row", "Number 8": "Back Row", "Scrum-half": "Scrum Halves",
    "Fly-half": "Fly Halves", "Inside Centre": "Centres", "Outside Centre": "Centres",
    "Left Wing": "Back Three", "Right Wing": "Back Three", "Fullback": "Back Three"
};

const forwardPositions = ["Loosehead Prop", "Hooker", "Tighthead Prop", "Lock 4", "Lock 5", "Blindside Flanker", "Openside Flanker", "Number 8"];
const backPositions = ["Scrum-half", "Fly-half", "Inside Centre", "Outside Centre", "Left Wing", "Right Wing", "Fullback"];

// Runtime Application Variables
let userTeam = {};
let currentSpunSquad = [];
let selectedPlayer = null;
let respinsLeft = 0;
let isKnowledgeMode = false;
let isCareerMode = false;
let spotsFilledCount = 0;
let playerSelectedFromCurrentPool = false;
let draftedPlayersBlacklist = []; 

// DOM Element Targets
const setupCard = document.getElementById("setup-card");
const draftDashboard = document.getElementById("draft-dashboard");
const simDashboard = document.getElementById("sim-dashboard");
const spinBtn = document.getElementById("spin-btn");
const respinBtn = document.getElementById("respin-btn");
const respinCountText = document.getElementById("respin-count");
const rosterContainer = document.getElementById("roster-container");
const statusText = document.getElementById("status-text");
const flagIndicator = document.getElementById("flag-indicator");
const pitchCircles = document.querySelectorAll(".pitch-circle");
const runSimBtn = document.getElementById("run-sim-btn");
const simResults = document.getElementById("sim-results");
const restartBtn = document.getElementById("restart-btn");
const manifestTeamBox = document.getElementById("manifest-team-box");

// APPLICATION INTERFACE INITIALIZER
document.addEventListener("DOMContentLoaded", () => {
    const startGameBtn = document.getElementById("start-game-btn");
    if (startGameBtn) {
        startGameBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const difficultyChecked = document.querySelector('input[name="difficulty"]:checked');
            const difficultySetting = difficultyChecked ? difficultyChecked.value : "normal";
            
            respinsLeft = difficultySetting === "easy" ? 3 : difficultySetting === "normal" ? 1 : 0;
            if (respinCountText) respinCountText.textContent = respinsLeft;
            
            if (setupCard) setupCard.classList.add("hidden");
            if (draftDashboard) draftDashboard.classList.remove("hidden");
            
            recalculateDashboardAverages();
        });
    }
});

// Setting Up Config Selection Matrix Controls
setupSlider("variant-slider-track", "variant-handle", (index) => { isCareerMode = (index === 1); });
setupSlider("rating-slider-track", "rating-handle", (index) => {
    isKnowledgeMode = (index === 1);
    if (currentSpunSquad.length > 0) renderRosterList();
});

function setupSlider(trackId, handleId, onChange) {
    const track = document.getElementById(trackId);
    if (!track) return;
    const options = track.querySelectorAll(".slider-opt");
    let activeIndex = 0;
    track.addEventListener("click", () => {
        activeIndex = activeIndex === 0 ? 1 : 0;
        if (activeIndex === 0) {
            track.classList.remove("right-state");
            options[0].classList.add("active"); options[1].classList.remove("active");
        } else {
            track.classList.add("right-state");
            options[0].classList.remove("active"); options[1].classList.add("active");
        }
        onChange(activeIndex);
    });
}

function isPositionFamilyFullyOccupied(family) {
    const spotsInFamily = Object.keys(positionFamilies).filter(pos => positionFamilies[pos] === family);
    return spotsInFamily.every(pos => userTeam[pos] !== undefined);
}

if (spinBtn) {
    spinBtn.addEventListener("click", () => {
        if (currentSpunSquad.length > 0 && !playerSelectedFromCurrentPool) {
            statusText.textContent = "⚠️ Selection Required! You must draft a player from this team before generating a new pool.";
            return;
        }
        triggerRosterSpinEngine();
    });
}

if (respinBtn) {
    respinBtn.addEventListener("click", () => {
        if (respinsLeft <= 0) return;
        respinsLeft--;
        respinCountText.textContent = respinsLeft;
        if (respinsLeft <= 0) { respinBtn.classList.add("disabled"); respinBtn.disabled = true; }
        triggerRosterSpinEngine();
    });
}

// ROSTER SPIN ENGINE - LINKED DIRECTLY TO YOUR SEPARATE GLOBAL VARIABLES
function triggerRosterSpinEngine() {
    selectedPlayer = null;
    playerSelectedFromCurrentPool = false;
    spinBtn.classList.add("disabled"); spinBtn.disabled = true;
    respinBtn.classList.add("disabled"); respinBtn.disabled = true;
    rosterContainer.innerHTML = "";
    statusText.textContent = "";
    if (flagIndicator) flagIndicator.innerHTML = "";

    // Double check that data lists loaded globally from your data.js
    if (typeof tier1Nations === 'undefined' || typeof tier2Nations === 'undefined') {
        statusText.textContent = "⚠️ Error: data.js arrays (tier1Nations/tier2Nations) could not be resolved.";
        return;
    }

    const isTier1 = Math.random() < 0.75;
    const targetPool = isTier1 ? tier1Nations : tier2Nations;
    const selectedNation = targetPool[Math.floor(Math.random() * targetPool.length)];
    
    // Pick a random available year configured for that specific nation
    const selectedYear = selectedNation.years[Math.floor(Math.random() * selectedNation.years.length)];
    
    // Render status messages alongside your flag graphics embedding function
    statusText.textContent = `${selectedNation.country.toUpperCase()} (${selectedYear}) Pool opened. Choose ONE player.`;
    if (flagIndicator && typeof getFlagEmbed === 'function') {
        flagIndicator.innerHTML = getFlagEmbed(selectedNation.country);
    }
    
    currentSpunSquad = [];
    
    // Check if the exact chosen year blueprint roster exists, otherwise fallback intelligently
    let finalSourceNames = [];
    if (selectedNation.squads && selectedNation.squads[selectedYear]) {
        finalSourceNames = selectedNation.squads[selectedYear];
    } else if (selectedNation.squads && selectedNation.squads["HISTORIC"]) {
        finalSourceNames = selectedNation.squads["HISTORIC"];
    } else {
        // Ultimate safe fallback using the local historic prefix dictionary or generic names
        const keyPrefix = selectedNation.country.substring(0, 3);
        finalSourceNames = (typeof historicNameBank !== 'undefined' && historicNameBank[keyPrefix]) 
            ? historic
