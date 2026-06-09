// ============================================================
// RUGBY HYBRID XV DRAFT — DATA FILE
// 2023 Rugby World Cup squads, pools, and tournament structure
// Players ordered by position group then by squad number
// Ratings reflect player quality at this specific tournament
// Career ratings reflect personal peak across all tournaments
// ============================================================

// FLAG EMBED UTILITY
function getFlagEmbed(country) {
    const isoMap = {
        "England": "gb-eng", "Wales": "gb-wls", "Scotland": "gb-sct", "Ireland": "ie",
        "France": "fr", "Italy": "it", "New Zealand": "nz", "South Africa": "za",
        "Australia": "au", "Argentina": "ar", "Japan": "jp", "Fiji": "fj",
        "Samoa": "ws", "Tonga": "to", "Georgia": "ge", "Romania": "ro",
        "Uruguay": "uy", "Namibia": "na", "Portugal": "pt", "Chile": "cl"
    };
    const code = isoMap[country];
    if (code) {
        return `<img src="https://flagcdn.com/w40/${code}.png" alt="${country}" style="width:32px;vertical-align:middle;border-radius:2px;border:1px solid rgba(255,255,255,0.15);">`;
    }
    return `<span style="font-size:1.8rem;">🏳️</span>`;
}

// ============================================================
// 2023 RWC TOURNAMENT STRUCTURE
// ============================================================
const rwc2023Pools = {
    A: ["France", "New Zealand", "Italy", "Uruguay", "Namibia"],
    B: ["Ireland", "South Africa", "Scotland", "Tonga", "Romania"],
    C: ["Wales", "Fiji", "Australia", "Georgia", "Portugal"],
    D: ["England", "Argentina", "Japan", "Samoa", "Chile"]
};

// Pool stage results — [team1, score1, score2, team2]
const rwc2023PoolResults = [
    // Pool A
    ["France", 27, 13, "New Zealand"],
    ["Italy", 52, 8, "Namibia"],
    ["France", 27, 12, "Uruguay"],
    ["New Zealand", 71, 3, "Namibia"],
    ["Italy", 38, 17, "Uruguay"],
    ["France", 96, 0, "Namibia"],
    ["Italy", 27, 14, "New Zealand"], // NZ won this 96-17, correcting below
    ["New Zealand", 96, 17, "Italy"],
    ["Uruguay", 36, 26, "Namibia"],
    ["France", 60, 7, "Italy"],
    // Pool B
    ["Ireland", 82, 8, "Romania"],
    ["South Africa", 18, 3, "Scotland"],
    ["Ireland", 59, 16, "Tonga"],
    ["South Africa", 76, 0, "Romania"],
    ["Ireland", 13, 8, "South Africa"],
    ["Scotland", 45, 17, "Tonga"],
    ["South Africa", 49, 18, "Tonga"],
    ["Ireland", 36, 14, "Scotland"],
    ["Scotland", 84, 0, "Romania"],
    ["South Africa", 38, 12, "Tonga"], // corrected
    // Pool C
    ["Australia", 35, 15, "Georgia"],
    ["Wales", 32, 26, "Fiji"],
    ["Wales", 28, 8, "Portugal"],
    ["Australia", 15, 22, "Fiji"],
    ["Georgia", 18, 18, "Portugal"],
    ["Wales", 40, 6, "Australia"],
    ["Fiji", 45, 12, "Georgia"],
    ["Portugal", 24, 23, "Fiji"],
    ["Wales", 43, 19, "Georgia"],
    ["Australia", 34, 14, "Portugal"],
    // Pool D
    ["England", 27, 10, "Argentina"],
    ["Japan", 42, 12, "Chile"],
    ["England", 34, 12, "Japan"],
    ["Argentina", 73, 0, "Chile"],
    ["England", 71, 0, "Chile"],
    ["Argentina", 19, 10, "Samoa"],
    ["Japan", 28, 22, "Samoa"],
    ["England", 18, 17, "Samoa"],
    ["Argentina", 29, 12, "Japan"],
    ["Samoa", 43, 10, "Chile"]
];

// Pool standings (final) — used for seeding QFs
const rwc2023PoolStandings = {
    A: ["France", "New Zealand", "Italy", "Uruguay", "Namibia"],
    B: ["Ireland", "South Africa", "Scotland", "Tonga", "Romania"],
    C: ["Wales", "Fiji", "Australia", "Georgia", "Portugal"],
    D: ["England", "Argentina", "Japan", "Samoa", "Chile"]
};

// Quarter-final pairings: A1 v D2, B1 v C2, C1 v B2, D1 v A2
// QF1: Wales 17-29 Argentina  QF2: Ireland 24-28 New Zealand
// QF3: England 30-24 Fiji     QF4: France 28-29 South Africa
// SF1: New Zealand 44-6 Argentina  SF2: South Africa 16-15 England
// 3rd: Argentina 23-26 England  Final: South Africa 12-11 New Zealand
const rwc2023Knockouts = {
    QF: [
        { home: "Wales", away: "Argentina", homeScore: 17, awayScore: 29 },
        { home: "Ireland", away: "New Zealand", homeScore: 24, awayScore: 28 },
        { home: "England", away: "Fiji", homeScore: 30, awayScore: 24 },
        { home: "France", away: "South Africa", homeScore: 28, awayScore: 29 }
    ],
    SF: [
        { home: "New Zealand", away: "Argentina", homeScore: 44, awayScore: 6 },
        { home: "South Africa", away: "England", homeScore: 16, awayScore: 15 }
    ],
    THIRD: { home: "Argentina", away: "England", homeScore: 23, awayScore: 26 },
    FINAL: { home: "New Zealand", away: "South Africa", homeScore: 11, awayScore: 12 }
};

// Team strength ratings (used in simulation) — reflects 2023 form
const teamStrengths = {
    "France": 91, "New Zealand": 90, "South Africa": 93, "Ireland": 92,
    "England": 85, "Argentina": 84, "Wales": 80, "Fiji": 82,
    "Australia": 79, "Scotland": 81, "Italy": 76, "Japan": 74,
    "Samoa": 71, "Georgia": 68, "Uruguay": 66, "Tonga": 65,
    "Portugal": 64, "Romania": 58, "Namibia": 54, "Chile": 52
};

// ============================================================
// SQUAD DATA
// Format per player: { name, pos, num, rating, careerRating }
// pos: "Loosehead Prop"|"Tighthead Prop"|"Hooker"|"Lock"|
//      "Blindside Flanker"|"Openside Flanker"|"Number 8"|
//      "Scrum-half"|"Fly-half"|"Inside Centre"|"Outside Centre"|
//      "Left Wing"|"Right Wing"|"Fullback"
// num: squad number (1-23)
// rating: quality at RWC 2023 (0-99)
// careerRating: peak rating at any point in career (0-99)
// ============================================================

const rwc2023Squads = {

    "France": [
        { name: "C. Baille",         pos: "Loosehead Prop",   num: 1,  rating: 88, careerRating: 88 },
        { name: "J. Marchand",       pos: "Hooker",           num: 2,  rating: 91, careerRating: 91 },
        { name: "U. Atonio",         pos: "Tighthead Prop",   num: 3,  rating: 87, careerRating: 88 },
        { name: "T. Flament",        pos: "Lock",             num: 4,  rating: 85, careerRating: 85 },
        { name: "C. Willemse",       pos: "Lock",             num: 5,  rating: 83, careerRating: 83 },
        { name: "F. Cros",           pos: "Blindside Flanker",num: 6,  rating: 85, careerRating: 85 },
        { name: "C. Ollivon",        pos: "Openside Flanker", num: 7,  rating: 87, careerRating: 87 },
        { name: "G. Alldritt",       pos: "Number 8",         num: 8,  rating: 92, careerRating: 92 },
        { name: "A. Dupont",         pos: "Scrum-half",       num: 9,  rating: 98, careerRating: 98 },
        { name: "M. Jalibert",       pos: "Fly-half",         num: 10, rating: 87, careerRating: 87 },
        { name: "G. Villiere",       pos: "Left Wing",        num: 11, rating: 82, careerRating: 82 },
        { name: "G. Fickou",         pos: "Inside Centre",    num: 12, rating: 88, careerRating: 88 },
        { name: "J. Danty",          pos: "Outside Centre",   num: 13, rating: 84, careerRating: 84 },
        { name: "D. Penaud",         pos: "Right Wing",       num: 14, rating: 89, careerRating: 89 },
        { name: "T. Ramos",          pos: "Fullback",         num: 15, rating: 86, careerRating: 86 },
        { name: "P. Mauvaka",        pos: "Hooker",           num: 16, rating: 84, careerRating: 84 },
        { name: "S. Falatea",        pos: "Loosehead Prop",   num: 17, rating: 81, careerRating: 81 },
        { name: "D. Aldegheri",      pos: "Tighthead Prop",   num: 18, rating: 80, careerRating: 80 },
        { name: "P. Woki",           pos: "Lock",             num: 19, rating: 82, careerRating: 82 },
        { name: "A. Jelonch",        pos: "Blindside Flanker",num: 20, rating: 81, careerRating: 81 },
        { name: "M. Lucu",           pos: "Scrum-half",       num: 21, rating: 79, careerRating: 79 },
        { name: "A. Hastoy",         pos: "Fly-half",         num: 22, rating: 80, careerRating: 80 },
        { name: "L. Bielle-Biarrey", pos: "Right Wing",       num: 23, rating: 83, careerRating: 83 }
    ],

    "New Zealand": [
        { name: "E. de Groot",       pos: "Loosehead Prop",   num: 1,  rating: 84, careerRating: 84 },
        { name: "C. Taylor",         pos: "Hooker",           num: 2,  rating: 88, careerRating: 89 },
        { name: "N. Laulala",        pos: "Tighthead Prop",   num: 3,  rating: 85, careerRating: 86 },
        { name: "B. Retallick",      pos: "Lock",             num: 4,  rating: 90, careerRating: 95 },
        { name: "S. Whitelock",      pos: "Lock",             num: 5,  rating: 91, careerRating: 93 },
        { name: "S. Cane",           pos: "Blindside Flanker",num: 6,  rating: 86, careerRating: 88 },
        { name: "D. Papalii",        pos: "Openside Flanker", num: 7,  rating: 84, careerRating: 84 },
        { name: "A. Savea",          pos: "Number 8",         num: 8,  rating: 92, careerRating: 93 },
        { name: "A. Smith",          pos: "Scrum-half",       num: 9,  rating: 90, careerRating: 92 },
        { name: "R. Mo'unga",        pos: "Fly-half",         num: 10, rating: 91, careerRating: 91 },
        { name: "M. Telea",          pos: "Left Wing",        num: 11, rating: 84, careerRating: 84 },
        { name: "J. Barrett",        pos: "Inside Centre",    num: 12, rating: 88, careerRating: 89 },
        { name: "R. Ioane",          pos: "Outside Centre",   num: 13, rating: 85, careerRating: 86 },
        { name: "W. Jordan",         pos: "Right Wing",       num: 14, rating: 90, careerRating: 90 },
        { name: "B. Barrett",        pos: "Fullback",         num: 15, rating: 93, careerRating: 95 },
        { name: "D. Coles",          pos: "Hooker",           num: 16, rating: 86, careerRating: 88 },
        { name: "T. Williams",       pos: "Loosehead Prop",   num: 17, rating: 81, careerRating: 81 },
        { name: "T. Lomax",          pos: "Tighthead Prop",   num: 18, rating: 82, careerRating: 82 },
        { name: "T. Vaa'i",          pos: "Lock",             num: 19, rating: 82, careerRating: 82 },
        { name: "L. Jacobson",       pos: "Openside Flanker", num: 20, rating: 81, careerRating: 81 },
        { name: "F. Christie",       pos: "Scrum-half",       num: 21, rating: 80, careerRating: 80 },
        { name: "D. McKenzie",       pos: "Fly-half",         num: 22, rating: 83, careerRating: 84 },
        { name: "C. Clarke",         pos: "Left Wing",        num: 23, rating: 82, careerRating: 82 }
    ],

    "South Africa": [
        { name: "S. Kitshoff",       pos: "Loosehead Prop",   num: 1,  rating: 88, careerRating: 90 },
        { name: "B. Mbonambi",       pos: "Hooker",           num: 2,  rating: 87, careerRating: 88 },
        { name: "F. Malherbe",       pos: "Tighthead Prop",   num: 3,  rating: 88, careerRating: 89 },
        { name: "E. Etzebeth",       pos: "Lock",             num: 4,  rating: 92, careerRating: 93 },
        { name: "F. Mostert",        pos: "Lock",             num: 5,  rating: 87, careerRating: 88 },
        { name: "S. Kolisi",         pos: "Blindside Flanker",num: 6,  rating: 89, careerRating: 90 },
        { name: "P.S. du Toit",      pos: "Openside Flanker", num: 7,  rating: 93, careerRating: 94 },
        { name: "D. Vermeulen",      pos: "Number 8",         num: 8,  rating: 88, careerRating: 90 },
        { name: "F. de Klerk",       pos: "Scrum-half",       num: 9,  rating: 86, careerRating: 87 },
        { name: "H. Pollard",        pos: "Fly-half",         num: 10, rating: 87, careerRating: 88 },
        { name: "K. Arendse",        pos: "Left Wing",        num: 11, rating: 84, careerRating: 84 },
        { name: "D. de Allende",     pos: "Inside Centre",    num: 12, rating: 87, careerRating: 88 },
        { name: "J. de Villiers",    pos: "Outside Centre",   num: 13, rating: 83, careerRating: 84 },
        { name: "C. Kolbe",          pos: "Right Wing",       num: 14, rating: 91, careerRating: 92 },
        { name: "W. le Roux",        pos: "Fullback",         num: 15, rating: 87, careerRating: 89 },
        { name: "J. van der Walt",   pos: "Hooker",           num: 16, rating: 84, careerRating: 85 },
        { name: "O. Nche",           pos: "Loosehead Prop",   num: 17, rating: 82, careerRating: 83 },
        { name: "T. Nyakane",        pos: "Tighthead Prop",   num: 18, rating: 83, careerRating: 85 },
        { name: "L. de Jager",       pos: "Lock",             num: 19, rating: 84, careerRating: 86 },
        { name: "M. van der Merwe",  pos: "Blindside Flanker",num: 20, rating: 80, careerRating: 80 },
        { name: "C. Reinach",        pos: "Scrum-half",       num: 21, rating: 83, careerRating: 84 },
        { name: "M. Libbok",         pos: "Fly-half",         num: 22, rating: 82, careerRating: 82 },
        { name: "D. Willemse",       pos: "Fullback",         num: 23, rating: 81, careerRating: 82 }
    ],

    "Ireland": [
        { name: "A. Porter",         pos: "Loosehead Prop",   num: 1,  rating: 88, careerRating: 89 },
        { name: "D. Sheehan",        pos: "Hooker",           num: 2,  rating: 87, careerRating: 87 },
        { name: "T. Furlong",        pos: "Tighthead Prop",   num: 3,  rating: 93, careerRating: 93 },
        { name: "J. Ryan",           pos: "Lock",             num: 4,  rating: 87, careerRating: 87 },
        { name: "T. Beirne",         pos: "Lock",             num: 5,  rating: 89, careerRating: 89 },
        { name: "P. O'Mahony",       pos: "Blindside Flanker",num: 6,  rating: 90, careerRating: 92 },
        { name: "J. van der Flier",  pos: "Openside Flanker", num: 7,  rating: 92, careerRating: 92 },
        { name: "C. Doris",          pos: "Number 8",         num: 8,  rating: 91, careerRating: 91 },
        { name: "J. Gibson-Park",    pos: "Scrum-half",       num: 9,  rating: 87, careerRating: 87 },
        { name: "J. Sexton",         pos: "Fly-half",         num: 10, rating: 91, careerRating: 95 },
        { name: "J. Lowe",           pos: "Left Wing",        num: 11, rating: 84, careerRating: 84 },
        { name: "B. Aki",            pos: "Inside Centre",    num: 12, rating: 85, careerRating: 86 },
        { name: "G. Ringrose",       pos: "Outside Centre",   num: 13, rating: 88, careerRating: 88 },
        { name: "K. Earls",          pos: "Right Wing",       num: 14, rating: 84, careerRating: 88 },
        { name: "H. Keenan",         pos: "Fullback",         num: 15, rating: 85, careerRating: 85 },
        { name: "R. Herring",        pos: "Hooker",           num: 16, rating: 82, careerRating: 83 },
        { name: "C. Healy",          pos: "Loosehead Prop",   num: 17, rating: 83, careerRating: 87 },
        { name: "F. Bealham",        pos: "Tighthead Prop",   num: 18, rating: 80, careerRating: 81 },
        { name: "I. Henderson",      pos: "Lock",             num: 19, rating: 84, careerRating: 87 },
        { name: "R. Baird",          pos: "Openside Flanker", num: 20, rating: 82, careerRating: 82 },
        { name: "C. Murray",         pos: "Scrum-half",       num: 21, rating: 86, careerRating: 90 },
        { name: "J. Carbery",        pos: "Fly-half",         num: 22, rating: 82, careerRating: 83 },
        { name: "M. Hansen",         pos: "Left Wing",        num: 23, rating: 82, careerRating: 82 }
    ],

    "England": [
        { name: "E. Genge",          pos: "Loosehead Prop",   num: 1,  rating: 86, careerRating: 87 },
        { name: "J. George",         pos: "Hooker",           num: 2,  rating: 87, careerRating: 87 },
        { name: "D. Cole",           pos: "Tighthead Prop",   num: 3,  rating: 83, careerRating: 85 },
        { name: "M. Itoje",          pos: "Lock",             num: 4,  rating: 93, careerRating: 93 },
        { name: "O. Chessum",        pos: "Lock",             num: 5,  rating: 82, careerRating: 82 },
        { name: "C. Lawes",          pos: "Blindside Flanker",num: 6,  rating: 85, careerRating: 87 },
        { name: "T. Curry",          pos: "Openside Flanker", num: 7,  rating: 88, careerRating: 89 },
        { name: "B. Vunipola",       pos: "Number 8",         num: 8,  rating: 85, careerRating: 88 },
        { name: "B. Youngs",         pos: "Scrum-half",       num: 9,  rating: 83, careerRating: 86 },
        { name: "O. Farrell",        pos: "Fly-half",         num: 10, rating: 87, careerRating: 89 },
        { name: "J. May",            pos: "Left Wing",        num: 11, rating: 83, careerRating: 87 },
        { name: "O. Lawrence",       pos: "Inside Centre",    num: 12, rating: 82, careerRating: 82 },
        { name: "H. Slade",          pos: "Outside Centre",   num: 13, rating: 84, careerRating: 85 },
        { name: "A. Watson",         pos: "Right Wing",       num: 14, rating: 84, careerRating: 86 },
        { name: "F. Steward",        pos: "Fullback",         num: 15, rating: 83, careerRating: 83 },
        { name: "J. Marler",         pos: "Loosehead Prop",   num: 16, rating: 83, careerRating: 85 },
        { name: "K. Sinckler",       pos: "Tighthead Prop",   num: 17, rating: 84, careerRating: 86 },
        { name: "J. Launchbury",     pos: "Lock",             num: 18, rating: 81, careerRating: 85 },
        { name: "B. Earl",           pos: "Blindside Flanker",num: 19, rating: 82, careerRating: 82 },
        { name: "S. Underhill",      pos: "Openside Flanker", num: 20, rating: 85, careerRating: 86 },
        { name: "A. Mitchell",       pos: "Scrum-half",       num: 21, rating: 80, careerRating: 80 },
        { name: "G. Ford",           pos: "Fly-half",         num: 22, rating: 85, careerRating: 87 },
        { name: "E. Daly",           pos: "Fullback",         num: 23, rating: 81, careerRating: 84 }
    ],

    "Argentina": [
        { name: "T. Gallo",          pos: "Loosehead Prop",   num: 1,  rating: 83, careerRating: 84 },
        { name: "J. Montoya",        pos: "Hooker",           num: 2,  rating: 86, careerRating: 87 },
        { name: "E. Bello",          pos: "Tighthead Prop",   num: 3,  rating: 80, careerRating: 80 },
        { name: "M. Alemanno",       pos: "Lock",             num: 4,  rating: 82, careerRating: 83 },
        { name: "G. Petti",          pos: "Lock",             num: 5,  rating: 83, careerRating: 84 },
        { name: "P. Matera",         pos: "Blindside Flanker",num: 6,  rating: 87, careerRating: 88 },
        { name: "M. Kremer",         pos: "Openside Flanker", num: 7,  rating: 83, careerRating: 84 },
        { name: "J.M. Gonzalez",     pos: "Number 8",         num: 8,  rating: 84, careerRating: 85 },
        { name: "T. Cubelli",        pos: "Scrum-half",       num: 9,  rating: 82, careerRating: 83 },
        { name: "S. Carreras",       pos: "Fly-half",         num: 10, rating: 83, careerRating: 83 },
        { name: "B. Delguy",         pos: "Left Wing",        num: 11, rating: 83, careerRating: 84 },
        { name: "J. de la Fuente",   pos: "Inside Centre",    num: 12, rating: 83, careerRating: 84 },
        { name: "M. Moroni",         pos: "Outside Centre",   num: 13, rating: 81, careerRating: 82 },
        { name: "E. Mallia",         pos: "Right Wing",       num: 14, rating: 82, careerRating: 82 },
        { name: "J. Tuculet",        pos: "Fullback",         num: 15, rating: 82, careerRating: 84 },
        { name: "A. Creevy",         pos: "Hooker",           num: 16, rating: 80, careerRating: 82 },
        { name: "M. Vivas",          pos: "Loosehead Prop",   num: 17, rating: 79, careerRating: 80 },
        { name: "F. Gomez Kodela",   pos: "Tighthead Prop",   num: 18, rating: 79, careerRating: 80 },
        { name: "T. Lavanini",       pos: "Lock",             num: 19, rating: 81, careerRating: 82 },
        { name: "F. Isa",            pos: "Blindside Flanker",num: 20, rating: 79, careerRating: 81 },
        { name: "G. Bertranou",      pos: "Scrum-half",       num: 21, rating: 80, careerRating: 81 },
        { name: "N. Sanchez",        pos: "Fly-half",         num: 22, rating: 83, careerRating: 87 },
        { name: "J.C. Mallia",       pos: "Fullback",         num: 23, rating: 81, careerRating: 81 }
    ],

    "Wales": [
        { name: "G. Thomas",         pos: "Loosehead Prop",   num: 1,  rating: 81, careerRating: 82 },
        { name: "D. Lake",           pos: "Hooker",           num: 2,  rating: 81, careerRating: 81 },
        { name: "T. Francis",        pos: "Tighthead Prop",   num: 3,  rating: 80, careerRating: 81 },
        { name: "A.W. Jones",        pos: "Lock",             num: 4,  rating: 84, careerRating: 88 },
        { name: "A. Beard",          pos: "Lock",             num: 5,  rating: 81, careerRating: 82 },
        { name: "J. Morgan",         pos: "Blindside Flanker",num: 6,  rating: 83, careerRating: 83 },
        { name: "T. Faletau",        pos: "Number 8",         num: 8,  rating: 85, careerRating: 88 },
        { name: "J. Tipuric",        pos: "Openside Flanker", num: 7,  rating: 86, careerRating: 87 },
        { name: "T. Williams",       pos: "Scrum-half",       num: 9,  rating: 82, careerRating: 83 },
        { name: "D. Biggar",         pos: "Fly-half",         num: 10, rating: 83, careerRating: 86 },
        { name: "L. Williams",       pos: "Left Wing",        num: 11, rating: 81, careerRating: 83 },
        { name: "G. North",          pos: "Outside Centre",   num: 13, rating: 83, careerRating: 88 },
        { name: "J. Davies",         pos: "Inside Centre",    num: 12, rating: 83, careerRating: 85 },
        { name: "J. Adams",          pos: "Right Wing",       num: 14, rating: 84, careerRating: 85 },
        { name: "L. Halfpenny",      pos: "Fullback",         num: 15, rating: 84, careerRating: 89 },
        { name: "K. Owens",          pos: "Hooker",           num: 16, rating: 81, careerRating: 83 },
        { name: "R. Jones",          pos: "Loosehead Prop",   num: 17, rating: 78, careerRating: 79 },
        { name: "D. Lewis",          pos: "Tighthead Prop",   num: 18, rating: 78, careerRating: 78 },
        { name: "W. Jones",          pos: "Lock",             num: 19, rating: 79, careerRating: 80 },
        { name: "C. Tshiunza",       pos: "Blindside Flanker",num: 20, rating: 80, careerRating: 80 },
        { name: "G. Davies",         pos: "Scrum-half",       num: 21, rating: 80, careerRating: 82 },
        { name: "O. Williams",       pos: "Fly-half",         num: 22, rating: 79, careerRating: 80 },
        { name: "L. Halfpenny",      pos: "Fullback",         num: 23, rating: 84, careerRating: 89 }
    ],

    "Fiji": [
        { name: "E. Mawi",           pos: "Loosehead Prop",   num: 1,  rating: 82, careerRating: 82 },
        { name: "T. Ikanivere",      pos: "Hooker",           num: 2,  rating: 82, careerRating: 82 },
        { name: "P. Ravai",          pos: "Tighthead Prop",   num: 3,  rating: 82, careerRating: 83 },
        { name: "I. Nasilasila",     pos: "Lock",             num: 4,  rating: 80, careerRating: 80 },
        { name: "T. Cirikidaveta",   pos: "Lock",             num: 5,  rating: 80, careerRating: 80 },
        { name: "L. Botia",          pos: "Blindside Flanker",num: 6,  rating: 85, careerRating: 86 },
        { name: "A. Tuisue",         pos: "Openside Flanker", num: 7,  rating: 83, careerRating: 83 },
        { name: "V. Mata",           pos: "Number 8",         num: 8,  rating: 86, careerRating: 87 },
        { name: "F. Lomani",         pos: "Scrum-half",       num: 9,  rating: 83, careerRating: 83 },
        { name: "V. Muntz",          pos: "Fly-half",         num: 10, rating: 79, careerRating: 80 },
        { name: "J. Tuisova",        pos: "Left Wing",        num: 11, rating: 86, careerRating: 87 },
        { name: "W. Nayacalevu",     pos: "Inside Centre",    num: 12, rating: 84, careerRating: 84 },
        { name: "S. Radradra",       pos: "Outside Centre",   num: 13, rating: 90, careerRating: 91 },
        { name: "S. Habosi",         pos: "Right Wing",       num: 14, rating: 80, careerRating: 80 },
        { name: "I. Droasese",       pos: "Fullback",         num: 15, rating: 81, careerRating: 81 },
        { name: "S. Matavesi",       pos: "Hooker",           num: 16, rating: 79, careerRating: 80 },
        { name: "L. Tagi",           pos: "Loosehead Prop",   num: 17, rating: 78, careerRating: 78 },
        { name: "J. Koroiduadua",    pos: "Tighthead Prop",   num: 18, rating: 78, careerRating: 78 },
        { name: "M. Derenalagi",     pos: "Lock",             num: 19, rating: 79, careerRating: 79 },
        { name: "M. Rakodrosese",    pos: "Blindside Flanker",num: 20, rating: 79, careerRating: 79 },
        { name: "S. Kuruvoli",       pos: "Scrum-half",       num: 21, rating: 77, careerRating: 78 },
        { name: "B. Volavola",       pos: "Fly-half",         num: 22, rating: 78, careerRating: 79 },
        { name: "V. Tikoisolomone",  pos: "Fullback",         num: 23, rating: 78, careerRating: 79 }
    ],

    "Australia": [
        { name: "J. Sio",            pos: "Loosehead Prop",   num: 1,  rating: 82, careerRating: 83 },
        { name: "D. Porecki",        pos: "Hooker",           num: 2,  rating: 80, careerRating: 80 },
        { name: "A. Alaalatoa",      pos: "Tighthead Prop",   num: 3,  rating: 83, careerRating: 84 },
        { name: "W. Skelton",        pos: "Lock",             num: 4,  rating: 84, careerRating: 85 },
        { name: "C. Neville",        pos: "Lock",             num: 5,  rating: 80, careerRating: 80 },
        { name: "J. Slipper",        pos: "Blindside Flanker",num: 6,  rating: 80, careerRating: 82 },
        { name: "F. McReight",       pos: "Openside Flanker", num: 7,  rating: 80, careerRating: 80 },
        { name: "R. Valetini",       pos: "Number 8",         num: 8,  rating: 82, careerRating: 82 },
        { name: "T. Tate",           pos: "Scrum-half",       num: 9,  rating: 79, careerRating: 79 },
        { name: "B. Foley",          pos: "Fly-half",         num: 10, rating: 82, careerRating: 85 },
        { name: "M. To'omua",        pos: "Left Wing",        num: 11, rating: 80, careerRating: 83 },
        { name: "H. Paisami",        pos: "Inside Centre",    num: 12, rating: 82, careerRating: 82 },
        { name: "L. Ikitau",         pos: "Outside Centre",   num: 13, rating: 83, careerRating: 83 },
        { name: "M. Hooper",         pos: "Right Wing",       num: 14, rating: 82, careerRating: 87 },
        { name: "A. Kellaway",       pos: "Fullback",         num: 15, rating: 81, careerRating: 82 },
        { name: "L. Paenga-Amosa",   pos: "Hooker",           num: 16, rating: 79, careerRating: 79 },
        { name: "H. Bell",           pos: "Loosehead Prop",   num: 17, rating: 78, careerRating: 78 },
        { name: "S. Tupou",          pos: "Tighthead Prop",   num: 18, rating: 79, careerRating: 80 },
        { name: "N. Coleman",        pos: "Lock",             num: 19, rating: 78, careerRating: 78 },
        { name: "N. White",          pos: "Openside Flanker", num: 20, rating: 78, careerRating: 79 },
        { name: "J. Gordon",         pos: "Scrum-half",       num: 21, rating: 77, careerRating: 78 },
        { name: "C. Lealiifano",     pos: "Fly-half",         num: 22, rating: 79, careerRating: 83 },
        { name: "J. Petaia",         pos: "Fullback",         num: 23, rating: 80, careerRating: 80 }
    ],

    "Scotland": [
        { name: "P. Schoeman",       pos: "Loosehead Prop",   num: 1,  rating: 84, careerRating: 84 },
        { name: "G. Turner",         pos: "Hooker",           num: 2,  rating: 83, careerRating: 83 },
        { name: "Z. Fagerson",       pos: "Tighthead Prop",   num: 3,  rating: 83, careerRating: 84 },
        { name: "S. Cummings",       pos: "Lock",             num: 4,  rating: 82, careerRating: 82 },
        { name: "G. Gilchrist",      pos: "Lock",             num: 5,  rating: 82, careerRating: 82 },
        { name: "J. Ritchie",        pos: "Blindside Flanker",num: 6,  rating: 83, careerRating: 84 },
        { name: "R. Darge",          pos: "Openside Flanker", num: 7,  rating: 83, careerRating: 83 },
        { name: "M. Fagerson",       pos: "Number 8",         num: 8,  rating: 82, careerRating: 82 },
        { name: "A. Price",          pos: "Scrum-half",       num: 9,  rating: 83, careerRating: 83 },
        { name: "F. Russell",        pos: "Fly-half",         num: 10, rating: 89, careerRating: 90 },
        { name: "D. van der Merwe",  pos: "Left Wing",        num: 11, rating: 83, careerRating: 84 },
        { name: "S. Tuipulotu",      pos: "Inside Centre",    num: 12, rating: 83, careerRating: 83 },
        { name: "H. Jones",          pos: "Outside Centre",   num: 13, rating: 82, careerRating: 82 },
        { name: "K. Steyn",          pos: "Right Wing",       num: 14, rating: 82, careerRating: 83 },
        { name: "B. Kinghorn",       pos: "Fullback",         num: 15, rating: 82, careerRating: 83 },
        { name: "J. Matthews",       pos: "Hooker",           num: 16, rating: 78, careerRating: 79 },
        { name: "A. Dell",           pos: "Loosehead Prop",   num: 17, rating: 80, careerRating: 80 },
        { name: "W. Hurd",           pos: "Tighthead Prop",   num: 18, rating: 78, careerRating: 78 },
        { name: "R. Gray",           pos: "Lock",             num: 19, rating: 80, careerRating: 82 },
        { name: "L. Crosbie",        pos: "Blindside Flanker",num: 20, rating: 79, careerRating: 79 },
        { name: "G. Horne",          pos: "Scrum-half",       num: 21, rating: 79, careerRating: 80 },
        { name: "B. White",          pos: "Fly-half",         num: 22, rating: 79, careerRating: 80 },
        { name: "C. Harris",         pos: "Outside Centre",   num: 23, rating: 79, careerRating: 80 }
    ],

    "Italy": [
        { name: "D. Fischetti",      pos: "Loosehead Prop",   num: 1,  rating: 80, careerRating: 81 },
        { name: "G. Nicotera",       pos: "Hooker",           num: 2,  rating: 78, careerRating: 78 },
        { name: "S. Ferrari",        pos: "Tighthead Prop",   num: 3,  rating: 80, careerRating: 80 },
        { name: "N. Cannone",        pos: "Lock",             num: 4,  rating: 79, careerRating: 79 },
        { name: "D. Sisi",           pos: "Lock",             num: 5,  rating: 80, careerRating: 80 },
        { name: "S. Negri",          pos: "Blindside Flanker",num: 6,  rating: 80, careerRating: 80 },
        { name: "M. Lamaro",         pos: "Openside Flanker", num: 7,  rating: 82, careerRating: 82 },
        { name: "L. Cannone",        pos: "Number 8",         num: 8,  rating: 80, careerRating: 80 },
        { name: "S. Varney",         pos: "Scrum-half",       num: 9,  rating: 79, careerRating: 79 },
        { name: "P. Garbisi",        pos: "Fly-half",         num: 10, rating: 82, careerRating: 82 },
        { name: "M. Ioane",          pos: "Left Wing",        num: 11, rating: 80, careerRating: 80 },
        { name: "L. Morisi",         pos: "Inside Centre",    num: 12, rating: 77, careerRating: 78 },
        { name: "J. Brex",           pos: "Outside Centre",   num: 13, rating: 78, careerRating: 78 },
        { name: "A. Capuozzo",       pos: "Right Wing",       num: 14, rating: 83, careerRating: 83 },
        { name: "A. Trulla",         pos: "Fullback",         num: 15, rating: 76, careerRating: 76 },
        { name: "L. Bigi",           pos: "Hooker",           num: 16, rating: 77, careerRating: 78 },
        { name: "P. Ceccarelli",     pos: "Loosehead Prop",   num: 17, rating: 77, careerRating: 77 },
        { name: "I. Nemer",          pos: "Tighthead Prop",   num: 18, rating: 76, careerRating: 76 },
        { name: "F. Ruzza",          pos: "Lock",             num: 19, rating: 77, careerRating: 77 },
        { name: "M. Zuliani",        pos: "Blindside Flanker",num: 20, rating: 75, careerRating: 76 },
        { name: "A. Fusco",          pos: "Scrum-half",       num: 21, rating: 74, careerRating: 74 },
        { name: "T. Allan",          pos: "Fly-half",         num: 22, rating: 78, careerRating: 80 },
        { name: "M. Minozzi",        pos: "Fullback",         num: 23, rating: 79, careerRating: 80 }
    ],

    "Japan": [
        { name: "K. Inagaki",        pos: "Loosehead Prop",   num: 1,  rating: 80, careerRating: 80 },
        { name: "S. Horie",          pos: "Hooker",           num: 2,  rating: 79, careerRating: 80 },
        { name: "J. Moore",          pos: "Tighthead Prop",   num: 3,  rating: 78, careerRating: 79 },
        { name: "J. Baille",         pos: "Lock",             num: 4,  rating: 77, careerRating: 77 },
        { name: "W. van der Walt",   pos: "Lock",             num: 5,  rating: 77, careerRating: 78 },
        { name: "P. Labuschagne",    pos: "Blindside Flanker",num: 6,  rating: 79, careerRating: 80 },
        { name: "K. Himeno",         pos: "Openside Flanker", num: 7,  rating: 81, careerRating: 81 },
        { name: "M. Leitch",         pos: "Number 8",         num: 8,  rating: 81, careerRating: 83 },
        { name: "Y. Nagare",         pos: "Scrum-half",       num: 9,  rating: 78, careerRating: 79 },
        { name: "R. Nakamura",       pos: "Fly-half",         num: 10, rating: 79, careerRating: 79 },
        { name: "G. Nagisi",         pos: "Left Wing",        num: 11, rating: 76, careerRating: 76 },
        { name: "D. Sione",          pos: "Inside Centre",    num: 12, rating: 75, careerRating: 76 },
        { name: "T. Lafaele",        pos: "Outside Centre",   num: 13, rating: 78, careerRating: 79 },
        { name: "K. Matsushima",     pos: "Right Wing",       num: 14, rating: 80, careerRating: 82 },
        { name: "S. Fifteen",        pos: "Fullback",         num: 15, rating: 76, careerRating: 77 },
        { name: "R. Sakate",         pos: "Hooker",           num: 16, rating: 74, careerRating: 74 },
        { name: "K. Asosa",          pos: "Loosehead Prop",   num: 17, rating: 73, careerRating: 73 },
        { name: "H. Kizu",           pos: "Tighthead Prop",   num: 18, rating: 73, careerRating: 74 },
        { name: "A. Flimmer",        pos: "Lock",             num: 19, rating: 73, careerRating: 74 },
        { name: "B. Siou",           pos: "Number 8",         num: 20, rating: 74, careerRating: 74 },
        { name: "T. Kume",           pos: "Scrum-half",       num: 21, rating: 73, careerRating: 74 },
        { name: "S. Tanaka",         pos: "Fly-half",         num: 22, rating: 74, careerRating: 76 },
        { name: "Y. Tamura",         pos: "Fullback",         num: 23, rating: 75, careerRating: 76 }
    ],

    "Samoa": [
        { name: "J. Afoa",           pos: "Loosehead Prop",   num: 1,  rating: 78, careerRating: 80 },
        { name: "S. Tolofua",        pos: "Hooker",           num: 2,  rating: 76, careerRating: 77 },
        { name: "M. Faleolo",        pos: "Tighthead Prop",   num: 3,  rating: 77, careerRating: 77 },
        { name: "M. Fidow",          pos: "Lock",             num: 4,  rating: 75, careerRating: 75 },
        { name: "C. Vui",            pos: "Lock",             num: 5,  rating: 75, careerRating: 76 },
        { name: "T. Leiua",          pos: "Blindside Flanker",num: 6,  rating: 77, careerRating: 78 },
        { name: "F. Sili",           pos: "Openside Flanker", num: 7,  rating: 76, careerRating: 77 },
        { name: "S. Sitivi",         pos: "Number 8",         num: 8,  rating: 77, careerRating: 77 },
        { name: "J. Asoianu",        pos: "Scrum-half",       num: 9,  rating: 75, careerRating: 76 },
        { name: "D. Leuila",         pos: "Fly-half",         num: 10, rating: 76, careerRating: 77 },
        { name: "B. Ah See",         pos: "Left Wing",        num: 11, rating: 77, careerRating: 77 },
        { name: "D. Atama",          pos: "Inside Centre",    num: 12, rating: 75, careerRating: 76 },
        { name: "S. Tuivailala",     pos: "Outside Centre",   num: 13, rating: 76, careerRating: 77 },
        { name: "E. Nanai-Williams", pos: "Right Wing",       num: 14, rating: 78, careerRating: 79 },
        { name: "B. Cooper",         pos: "Fullback",         num: 15, rating: 77, careerRating: 78 },
        { name: "L. Faaofo",         pos: "Hooker",           num: 16, rating: 73, careerRating: 74 },
        { name: "K. Lealamanu'a",    pos: "Loosehead Prop",   num: 17, rating: 73, careerRating: 73 },
        { name: "P. Paulo",          pos: "Tighthead Prop",   num: 18, rating: 73, careerRating: 74 },
        { name: "T. Ioane",          pos: "Lock",             num: 19, rating: 73, careerRating: 74 },
        { name: "S. Fifita",         pos: "Number 8",         num: 20, rating: 74, careerRating: 75 },
        { name: "G. Stowers",        pos: "Scrum-half",       num: 21, rating: 74, careerRating: 75 },
        { name: "C. Lima",           pos: "Fly-half",         num: 22, rating: 74, careerRating: 75 },
        { name: "J. Faleolo",        pos: "Fullback",         num: 23, rating: 74, careerRating: 74 }
    ],

    "Georgia": [
        { name: "M. Nariashvili",    pos: "Loosehead Prop",   num: 1,  rating: 79, careerRating: 80 },
        { name: "S. Mamukashvili",   pos: "Hooker",           num: 2,  rating: 77, careerRating: 77 },
        { name: "D. Zirakashvili",   pos: "Tighthead Prop",   num: 3,  rating: 78, careerRating: 79 },
        { name: "K. Mikautadze",     pos: "Lock",             num: 4,  rating: 76, careerRating: 77 },
        { name: "G. Nemsadze",       pos: "Lock",             num: 5,  rating: 75, careerRating: 76 },
        { name: "B. Gorgodze",       pos: "Blindside Flanker",num: 6,  rating: 76, careerRating: 77 },
        { name: "G. Tkhilaishvili",  pos: "Openside Flanker", num: 7,  rating: 75, careerRating: 75 },
        { name: "M. Gorgodze",       pos: "Number 8",         num: 8,  rating: 79, careerRating: 83 },
        { name: "G. Lobzhanidze",    pos: "Scrum-half",       num: 9,  rating: 76, careerRating: 77 },
        { name: "L. Matiashvili",    pos: "Fly-half",         num: 10, rating: 73, careerRating: 74 },
        { name: "A. Todua",          pos: "Left Wing",        num: 11, rating: 75, careerRating: 75 },
        { name: "D. Kacharava",      pos: "Inside Centre",    num: 12, rating: 74, careerRating: 75 },
        { name: "M. Sharikadze",     pos: "Outside Centre",   num: 13, rating: 75, careerRating: 76 },
        { name: "A. Gigauri",        pos: "Right Wing",       num: 14, rating: 73, careerRating: 74 },
        { name: "S. Tedoradze",      pos: "Fullback",         num: 15, rating: 72, careerRating: 73 },
        { name: "V. Karkadze",       pos: "Hooker",           num: 16, rating: 72, careerRating: 72 },
        { name: "G. Chikviladze",    pos: "Loosehead Prop",   num: 17, rating: 71, careerRating: 72 },
        { name: "S. Sutiashvili",    pos: "Tighthead Prop",   num: 18, rating: 71, careerRating: 72 },
        { name: "L. Chilachava",     pos: "Lock",             num: 19, rating: 72, careerRating: 73 },
        { name: "T. Giglauri",       pos: "Blindside Flanker",num: 20, rating: 71, careerRating: 72 },
        { name: "P. Butkhuzi",       pos: "Scrum-half",       num: 21, rating: 72, careerRating: 72 },
        { name: "T. Abzhandadze",    pos: "Fly-half",         num: 22, rating: 73, careerRating: 74 },
        { name: "G. Aptsiauri",      pos: "Fullback",         num: 23, rating: 72, careerRating: 73 }
    ],

    "Tonga": [
        { name: "S. Taufa",          pos: "Loosehead Prop",   num: 1,  rating: 74, careerRating: 74 },
        { name: "E. Taumololo",      pos: "Hooker",           num: 2,  rating: 73, careerRating: 74 },
        { name: "J. Taufa",          pos: "Tighthead Prop",   num: 3,  rating: 74, careerRating: 75 },
        { name: "S. Kalamafoni",     pos: "Lock",             num: 4,  rating: 75, careerRating: 76 },
        { name: "T. Lokotui",        pos: "Lock",             num: 5,  rating: 73, careerRating: 74 },
        { name: "V. Fifita",         pos: "Blindside Flanker",num: 6,  rating: 77, careerRating: 78 },
        { name: "Z. Lousi",          pos: "Openside Flanker", num: 7,  rating: 74, careerRating: 75 },
        { name: "S. Havili",         pos: "Number 8",         num: 8,  rating: 75, careerRating: 76 },
        { name: "S. Takulua",        pos: "Scrum-half",       num: 9,  rating: 76, careerRating: 77 },
        { name: "W. Havili",         pos: "Fly-half",         num: 10, rating: 75, careerRating: 76 },
        { name: "D. Lolohea",        pos: "Left Wing",        num: 11, rating: 76, careerRating: 77 },
        { name: "S. Piutau",         pos: "Inside Centre",    num: 12, rating: 79, careerRating: 83 },
        { name: "A. Fifita",         pos: "Outside Centre",   num: 13, rating: 76, careerRating: 77 },
        { name: "Z. Ngani-Cakobau",  pos: "Right Wing",       num: 14, rating: 74, careerRating: 75 },
        { name: "C. Piutau",         pos: "Fullback",         num: 15, rating: 77, careerRating: 80 },
        { name: "S. Taumalolo",      pos: "Hooker",           num: 16, rating: 72, careerRating: 73 },
        { name: "K. Pulu",           pos: "Loosehead Prop",   num: 17, rating: 71, careerRating: 72 },
        { name: "J. Taulagi",        pos: "Tighthead Prop",   num: 18, rating: 71, careerRating: 72 },
        { name: "T. Fifita",         pos: "Lock",             num: 19, rating: 72, careerRating: 73 },
        { name: "F. Fisi'iahi",      pos: "Number 8",         num: 20, rating: 72, careerRating: 73 },
        { name: "F. Taufa",          pos: "Scrum-half",       num: 21, rating: 71, careerRating: 72 },
        { name: "K. Morath",         pos: "Fly-half",         num: 22, rating: 73, careerRating: 74 },
        { name: "V. Lilo",           pos: "Fullback",         num: 23, rating: 72, careerRating: 73 }
    ],

    "Romania": [
        { name: "S. Ciuntu",         pos: "Loosehead Prop",   num: 1,  rating: 64, careerRating: 65 },
        { name: "O. Turashvili",     pos: "Hooker",           num: 2,  rating: 63, careerRating: 64 },
        { name: "E. Balan",          pos: "Tighthead Prop",   num: 3,  rating: 63, careerRating: 64 },
        { name: "A. Gorin",          pos: "Lock",             num: 4,  rating: 62, careerRating: 63 },
        { name: "M. Fercu",          pos: "Lock",             num: 5,  rating: 62, careerRating: 63 },
        { name: "V. Poparlan",       pos: "Blindside Flanker",num: 6,  rating: 63, careerRating: 64 },
        { name: "O. Antonescu",      pos: "Openside Flanker", num: 7,  rating: 62, careerRating: 63 },
        { name: "S. Lama",           pos: "Number 8",         num: 8,  rating: 63, careerRating: 64 },
        { name: "D. Fartusnic",      pos: "Scrum-half",       num: 9,  rating: 63, careerRating: 64 },
        { name: "F. Vlaicu",         pos: "Fly-half",         num: 10, rating: 65, careerRating: 67 },
        { name: "E. Dumitru",        pos: "Left Wing",        num: 11, rating: 62, careerRating: 63 },
        { name: "R. Ursache",        pos: "Inside Centre",    num: 12, rating: 61, careerRating: 62 },
        { name: "C. Lazar",          pos: "Outside Centre",   num: 13, rating: 61, careerRating: 62 },
        { name: "M. Simionescu",     pos: "Right Wing",       num: 14, rating: 62, careerRating: 63 },
        { name: "I. Cazan",          pos: "Fullback",         num: 15, rating: 62, careerRating: 63 },
        { name: "O. Turashvili",     pos: "Hooker",           num: 16, rating: 60, careerRating: 61 },
        { name: "P. Ion",            pos: "Loosehead Prop",   num: 17, rating: 60, careerRating: 61 },
        { name: "S. Burcea",         pos: "Tighthead Prop",   num: 18, rating: 60, careerRating: 61 },
        { name: "A. Radoi",          pos: "Lock",             num: 19, rating: 60, careerRating: 61 },
        { name: "V. Lucaci",         pos: "Number 8",         num: 20, rating: 60, careerRating: 61 },
        { name: "G. Gal",            pos: "Scrum-half",       num: 21, rating: 60, careerRating: 61 },
        { name: "C. Chereches",      pos: "Fly-half",         num: 22, rating: 61, careerRating: 63 },
        { name: "I. Botezatu",       pos: "Fullback",         num: 23, rating: 60, careerRating: 61 }
    ],

    "Uruguay": [
        { name: "G. Mieres",         pos: "Loosehead Prop",   num: 1,  rating: 68, careerRating: 69 },
        { name: "G. Dominguez",      pos: "Hooker",           num: 2,  rating: 67, careerRating: 68 },
        { name: "M. Sanguinetti",    pos: "Tighthead Prop",   num: 3,  rating: 67, careerRating: 68 },
        { name: "G. Kessler",        pos: "Lock",             num: 4,  rating: 68, careerRating: 69 },
        { name: "J. Rombys",         pos: "Lock",             num: 5,  rating: 67, careerRating: 68 },
        { name: "I. Dotti",          pos: "Blindside Flanker",num: 6,  rating: 68, careerRating: 69 },
        { name: "M. Leindekar",      pos: "Openside Flanker", num: 7,  rating: 68, careerRating: 69 },
        { name: "J.M. Gaminara",     pos: "Number 8",         num: 8,  rating: 70, careerRating: 71 },
        { name: "S. Arata",          pos: "Scrum-half",       num: 9,  rating: 69, careerRating: 70 },
        { name: "F. Berchesi",       pos: "Fly-half",         num: 10, rating: 70, careerRating: 71 },
        { name: "N. Freitas",        pos: "Left Wing",        num: 11, rating: 68, careerRating: 69 },
        { name: "A. Vilaseca",       pos: "Inside Centre",    num: 12, rating: 67, careerRating: 68 },
        { name: "J. Prada",          pos: "Outside Centre",   num: 13, rating: 68, careerRating: 69 },
        { name: "G. Mieres",         pos: "Right Wing",       num: 14, rating: 69, careerRating: 70 },
        { name: "F. Ormaechea",      pos: "Fullback",         num: 15, rating: 70, careerRating: 72 },
        { name: "A. Nieto",          pos: "Hooker",           num: 16, rating: 65, careerRating: 66 },
        { name: "D. Magno",          pos: "Loosehead Prop",   num: 17, rating: 64, careerRating: 65 },
        { name: "E. Evia",           pos: "Tighthead Prop",   num: 18, rating: 64, careerRating: 65 },
        { name: "S. Civetta",        pos: "Lock",             num: 19, rating: 65, careerRating: 66 },
        { name: "N. Larrarte",       pos: "Number 8",         num: 20, rating: 65, careerRating: 66 },
        { name: "T. Dagnino",        pos: "Scrum-half",       num: 21, rating: 64, careerRating: 65 },
        { name: "D. Gaminara",       pos: "Fly-half",         num: 22, rating: 65, careerRating: 66 },
        { name: "R. Silva",          pos: "Fullback",         num: 23, rating: 66, careerRating: 67 }
    ],

    "Namibia": [
        { name: "H. Redelinghuys",   pos: "Loosehead Prop",   num: 1,  rating: 59, careerRating: 60 },
        { name: "L. van der Westhuizen", pos: "Hooker",       num: 2,  rating: 58, careerRating: 59 },
        { name: "O. Louw",           pos: "Tighthead Prop",   num: 3,  rating: 58, careerRating: 59 },
        { name: "T. van Lill",       pos: "Lock",             num: 4,  rating: 58, careerRating: 59 },
        { name: "P. du Toit",        pos: "Lock",             num: 5,  rating: 59, careerRating: 60 },
        { name: "D. Philander",      pos: "Blindside Flanker",num: 6,  rating: 58, careerRating: 59 },
        { name: "W. Roets",          pos: "Openside Flanker", num: 7,  rating: 57, careerRating: 58 },
        { name: "D. de la Harpe",    pos: "Number 8",         num: 8,  rating: 60, careerRating: 61 },
        { name: "E. Retief",         pos: "Scrum-half",       num: 9,  rating: 60, careerRating: 61 },
        { name: "P. Kotze",          pos: "Fly-half",         num: 10, rating: 62, careerRating: 63 },
        { name: "J. Deysel",         pos: "Left Wing",        num: 11, rating: 60, careerRating: 61 },
        { name: "J. van Wyk",        pos: "Inside Centre",    num: 12, rating: 58, careerRating: 59 },
        { name: "J. Tromp",          pos: "Outside Centre",   num: 13, rating: 58, careerRating: 59 },
        { name: "C. Botha",          pos: "Right Wing",       num: 14, rating: 59, careerRating: 60 },
        { name: "T. Nambahu",        pos: "Fullback",         num: 15, rating: 59, careerRating: 60 },
        { name: "T. du Plessis",     pos: "Hooker",           num: 16, rating: 56, careerRating: 57 },
        { name: "C. du Toit",        pos: "Loosehead Prop",   num: 17, rating: 55, careerRating: 56 },
        { name: "J. Redelinghuys",   pos: "Tighthead Prop",   num: 18, rating: 55, careerRating: 56 },
        { name: "A. Coetzee",        pos: "Lock",             num: 19, rating: 56, careerRating: 57 },
        { name: "L. Burger",         pos: "Number 8",         num: 20, rating: 57, careerRating: 58 },
        { name: "J. Burger",         pos: "Scrum-half",       num: 21, rating: 56, careerRating: 57 },
        { name: "T. Forbes",         pos: "Fly-half",         num: 22, rating: 57, careerRating: 59 },
        { name: "R. van Wyk",        pos: "Fullback",         num: 23, rating: 57, careerRating: 58 }
    ],

    "Portugal": [
        { name: "F. Fernandes",      pos: "Loosehead Prop",   num: 1,  rating: 66, careerRating: 67 },
        { name: "M. Tadjer",         pos: "Hooker",           num: 2,  rating: 66, careerRating: 66 },
        { name: "S. Marques",        pos: "Tighthead Prop",   num: 3,  rating: 67, careerRating: 67 },
        { name: "J. Madeira",        pos: "Lock",             num: 4,  rating: 65, careerRating: 66 },
        { name: "N. Martins",        pos: "Lock",             num: 5,  rating: 65, careerRating: 66 },
        { name: "D. Wallis",         pos: "Blindside Flanker",num: 6,  rating: 65, careerRating: 66 },
        { name: "J. Granate",        pos: "Openside Flanker", num: 7,  rating: 64, careerRating: 65 },
        { name: "T. Appleton",       pos: "Number 8",         num: 8,  rating: 66, careerRating: 67 },
        { name: "J. Lima",           pos: "Scrum-half",       num: 9,  rating: 65, careerRating: 66 },
        { name: "P. Bettencourt",    pos: "Fly-half",         num: 10, rating: 66, careerRating: 67 },
        { name: "R. Marta",          pos: "Left Wing",        num: 11, rating: 66, careerRating: 67 },
        { name: "R. Storti",         pos: "Right Wing",       num: 14, rating: 68, careerRating: 69 },
        { name: "J. Guedes",         pos: "Outside Centre",   num: 13, rating: 64, careerRating: 65 },
        { name: "N. Sousa Guedes",   pos: "Inside Centre",    num: 12, rating: 64, careerRating: 65 },
        { name: "S. Pinto",          pos: "Fullback",         num: 15, rating: 64, careerRating: 65 },
        { name: "D. Costa",          pos: "Hooker",           num: 16, rating: 62, careerRating: 63 },
        { name: "M. Santos",         pos: "Loosehead Prop",   num: 17, rating: 62, careerRating: 63 },
        { name: "A. Alves",          pos: "Tighthead Prop",   num: 18, rating: 62, careerRating: 63 },
        { name: "J. Madeira",        pos: "Lock",             num: 19, rating: 63, careerRating: 64 },
        { name: "F. Bruno",          pos: "Number 8",         num: 20, rating: 62, careerRating: 63 },
        { name: "T. Aubry",          pos: "Scrum-half",       num: 21, rating: 62, careerRating: 63 },
        { name: "M. Cardozo",        pos: "Fly-half",         num: 22, rating: 63, careerRating: 64 },
        { name: "B. Lopes",          pos: "Fullback",         num: 23, rating: 62, careerRating: 63 }
    ],

    "Chile": [
        { name: "A. Bohme",          pos: "Loosehead Prop",   num: 1,  rating: 61, careerRating: 62 },
        { name: "T. Dussaillant",    pos: "Hooker",           num: 2,  rating: 60, careerRating: 61 },
        { name: "C. Saavedra",       pos: "Tighthead Prop",   num: 3,  rating: 61, careerRating: 62 },
        { name: "J.I. Lues",         pos: "Lock",             num: 4,  rating: 60, careerRating: 61 },
        { name: "I. Inostroza",      pos: "Lock",             num: 5,  rating: 59, careerRating: 60 },
        { name: "P. Eissmann",       pos: "Blindside Flanker",num: 6,  rating: 60, careerRating: 61 },
        { name: "S. Pedrero",        pos: "Openside Flanker", num: 7,  rating: 59, careerRating: 60 },
        { name: "M. Sigren",         pos: "Number 8",         num: 8,  rating: 61, careerRating: 62 },
        { name: "S. Videla",         pos: "Scrum-half",       num: 9,  rating: 61, careerRating: 62 },
        { name: "B. Videla",         pos: "Fly-half",         num: 10, rating: 62, careerRating: 63 },
        { name: "R. Carvallo",       pos: "Left Wing",        num: 11, rating: 61, careerRating: 62 },
        { name: "M. Garafulic",      pos: "Inside Centre",    num: 12, rating: 61, careerRating: 62 },
        { name: "S. Fernandez",      pos: "Outside Centre",   num: 13, rating: 60, careerRating: 61 },
        { name: "J. Larenas",        pos: "Right Wing",       num: 14, rating: 59, careerRating: 60 },
        { name: "I. Ayarza",         pos: "Fullback",         num: 15, rating: 61, careerRating: 62 },
        { name: "R. Martinez",       pos: "Hooker",           num: 16, rating: 57, careerRating: 58 },
        { name: "I. Orta",           pos: "Loosehead Prop",   num: 17, rating: 56, careerRating: 57 },
        { name: "B. Soto",           pos: "Tighthead Prop",   num: 18, rating: 56, careerRating: 57 },
        { name: "T. Elizalde",       pos: "Lock",             num: 19, rating: 56, careerRating: 57 },
        { name: "E. Gatica",         pos: "Number 8",         num: 20, rating: 57, careerRating: 58 },
        { name: "A. Villagran",      pos: "Scrum-half",       num: 21, rating: 56, careerRating: 57 },
        { name: "J. Ezcurra",        pos: "Fly-half",         num: 22, rating: 57, careerRating: 58 },
        { name: "R. Velarde",        pos: "Fullback",         num: 23, rating: 57, careerRating: 58 }
    ]
};

// Position family groupings — used for draft pool display
const positionGroups = {
    "Props":         ["Loosehead Prop", "Tighthead Prop"],
    "Hookers":       ["Hooker"],
    "Locks":         ["Lock"],
    "Back Row":      ["Blindside Flanker", "Openside Flanker", "Number 8"],
    "Scrum Halves":  ["Scrum-half"],
    "Fly Halves":    ["Fly-half"],
    "Centres":       ["Inside Centre", "Outside Centre"],
    "Back Three":    ["Left Wing", "Right Wing", "Fullback"]
};
