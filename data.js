// REGIONAL HOME NATION FLAG EMBED DECORATOR
function getFlagEmbed(country) {
    switch(country) {
        case "England":
            return `<img src="https://flagcdn.com/w40/gb-eng.png" alt="England" style="width:32px; vertical-align:middle; border-radius:2px; border:1px solid rgba(255,255,255,0.15);">`;
        case "Wales":
            return `<img src="https://flagcdn.com/w40/gb-wls.png" alt="Wales" style="width:32px; vertical-align:middle; border-radius:2px; border:1px solid rgba(255,255,255,0.15);">`;
        case "Scotland":
            return `<img src="https://flagcdn.com/w40/gb-sct.png" alt="Scotland" style="width:32px; vertical-align:middle; border-radius:2px; border:1px solid rgba(255,255,255,0.15);">`;
        default:
            const unicodeFlags = {
                "New Zealand": "🇳🇿", "South Africa": "🇿🇦", "France": "🇫🇷", "Ireland": "🇮🇪", 
                "Australia": "🇦🇺", "Argentina": "🇦🇷", "Italy": "🇮🇹", "Japan": "🇯🇵", 
                "Fiji": "🇫🇯", "Samoa": "🇼🇸", "Tonga": "🇹🇴", "Georgia": "🇬🇪", 
                "Romania": "🇷🇴", "Canada": "🇨🇦", "USA": "🇺🇸", "Namibia": "🇳🇦", 
                "Uruguay": "🇺🇾", "Spain": "🇪🇸", "Portugal": "🇵🇹", "Russia": "🇷🇺", 
                "Zimbabwe": "🇿🇼", "Ivory Coast": "🇨🇮", "Chile": "🇨🇱"
            };
            return `<span style="font-size:1.8rem;">${unicodeFlags[country] || "🏳️"}</span>`;
    }
}

// ERA-SPECIFIC ROSTER BLUEPRINTS
const tier1Nations = [
    {
        country: "England",
        squads: {
            "2003": ["J. Wilkinson", "M. Johnson", "L. Dallaglio", "J. Robinson", "W. Greenwood", "N. Back", "R. Hill", "P. Vickery", "S. Thompson", "M. Dawson", "W. Tindall", "T. Woodman", "B. Kay", "J. Lewsey", "I. Balshaw"],
            "2015": ["O. Farrell", "M. Itoje", "C. Robshaw", "G. Ford", "M. Brown", "B. Vunipola", "M. Vunipola", "T. Youngs", "D. Cole", "J. Launchbury", "C. Lawes", "T. Wood", "B. Youngs", "J. Joseph", "A. Watson"],
            "2019": ["O. Farrell", "M. Itoje", "T. Curry", "S. Underhill", "B. Vunipola", "K. Sinckler", "M. George", "M. Vunipola", "C. Lawes", "G. Ford", "M. Tuilagi", "H. Slade", "J. May", "A. Watson"],
            "2023": ["O. Farrell", "M. Itoje", "C. Lawes", "B. Earl", "J. George", "E. Genge", "D. Cole", "O. Chessum", "J. Marler", "A. Mitchell", "G. Ford", "M. Tuilagi", "J. Marchant", "E. Daly", "F. Steward"],
            "HISTORIC": ["W. Carling", "R. Underwood", "J. Guscott", "D. Richards", "P. Ackford", "M. Bayfield", "J. Leonard", "B. Moore", "J. Webb", "R. Hill", "P. de Glanville", "T. Rodber", "K. Bracken", "✈️ T. Underwood", "⚓ J. Olver"]
        },
        years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"]
    },
    {
        country: "New Zealand",
        squads: {
            "1987": ["D. Kirk", "M. Jones", "G. Fox", "J. Kirwan", "W. Shelford", "S. Fitzpatrick", "G. Whetton", "A. Earl", "R. Loe", "S. McDowell", "A. Anderson", "⚡ J. Stanley", "T. Wright", "K. Crowley", "B. McCahill"],
            "2011": ["R. McCaw", "D. Carter", "M. Nonu", "C. Smith", "K. Read", "B. Thorn", "A. Williams", "O. Franks", "K. Mealamu", "T. Woodcock", "S. Whitelock", "J. Kaino", "P. Weepu", "C. Jane", "I. Dagg"],
            "2015": ["R. McCaw", "D. Carter", "M. Nonu", "C. Smith", "K. Read", "B. Retallick", "S. Whitelock", "O. Franks", "D. Coles", "T. Woodcock", "J. Kaino", "A. Smith", "B. Barrett", "J. Savea", "B. Smith"],
            "2019": ["K. Read", "B. Barrett", "A. Smith", "S. Whitelock", "B. Retallick", "A. Savea", "S. Cane", "J. Moody", "C. Taylor", "N. Laulala", "📋 S. Lienert-Brown", "R. Mo'unga", "R. Ioane", "G. Bridge", "B. Smith"],
            "2023": ["S. Cane", "A. Savea", "B. Barrett", "A. Smith", "S. Whitelock", "B. Retallick", "S. Barrett", "E. de Groot", "C. Taylor", "T. Lomax", "R. Mo'unga", "J. Barrett", "R. Ioane", "W. Jordan", "B. Barrett"]
        },
        years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"]
    },
    {
        country: "South Africa",
        squads: {
            "1995": ["F. Pienaar", "J. de Beer", "J. van der Westhuizen", "C. Williams", "H. le Roux", "M. Joubert", "K. Stransky", "O. du Randt", "C. Rossouw", "B. Swart", "K. Wiese", "H. Strydom", "R. Straeuli", "R. Kruger", "A. Joubert"],
            "2007": ["J. Smit", "V. Matfield", "B. Botha", "B. Habana", "J. de Villiers", "F. du Preez", "P. Spies", "S. Burger", "D. Rossouw", "O. du Randt", "C. van der Linde", "G. Steyn", "J. Montgomery", "J. Pietersen", "A. Jacobs"],
            "2019": ["S. Kolisi", "P.S. du Toit", "D. Vermeulen", "E. Etzebeth", "L. de Jager", "F. Malherbe", "B. Mbonambi", "T. Mtawarira", "F. de Klerk", "H. Pollard", "D. de Allende", "L. Am", "C. Kolbe", "M. Mapimpi", "W. le Roux"],
            "2023": ["S. Kolisi", "P.S. du Toit", "D. Vermeulen", "E. Etzebeth", "F. Mostert", "F. Malherbe", "B. Mbonambi", "S. Kitshoff", "F. de Klerk", "H. Pollard", "D. de Allende", "L. Am", "C. Kolbe", "K. Arendse", "D. Willemse"]
        },
        years: ["1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"]
    },
    {
        country: "France",
        squads: {
            "2011": ["T. Dusautoir", "📋 F. Trinh-Duc", "📋 M. Parra", "📋 V. Clerc", "A. Rougerie", "📋 I. Harinordoquy", "📋 J. Bonnaire", "📋 L. Nallet", "📋 P. Pape", "📋 N. Mas", "📋 W. Servat", "📋 J. Poux", "📋 M. Mermoz", "📋 A. Palisson", "📋 C. Heymans"],
            "2023": ["A. Dupont", "G. Alldritt", "D. Penaud", "R. Ntamack", "G. Fickou", "C. Baille", "U. Atonio", "J. Marchand", "T. Flament", "T. Ramos", "M. Jalibert", "C. Ollivon", "F. Cros", "J. Danty", "C. Willemse"]
        },
        years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"]
    },
    {
        country: "Ireland",
        squads: {
            "2015": ["P. O'Connell", "J. Sexton", "C. Murray", "R. Henshaw", "J. Payne", "📌 S. O'Brien", "📌 P. O'Mahony", "📌 J. Heaslip", "📌 D. Toner", "📌 P. O'Mahony", "📌 M. Ross", "📌 R. Best", "📌 J. McGrath", "📌 K. Earls", "📌 R. Kearney"],
            "2023": ["J. Sexton", "T. Furlong", "B. Aki", "J. van der Flier", "A. Porter", "D. Sheehan", "J. Ryan", "T. Beirne", "C. Doris", "J. Gibson-Park", "J. Lowe", "H. Keenan", "P. O'Mahony", "M. Hansen", "G. Ringrose"]
        },
        years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"]
    },
    {
        country: "Australia",
        squads: {
            "1999": ["J. Eales", "G. Gregan", "T. Horan", "S. Larkham", "M. Burke", "📌 D. Herbert", "📌 B. Tune", "📌 T. Kefu", "📌 D. Finegan", "📌 M. Cockbain", "📌 D. Giffin", "📌 A. Blades", "📌 M. Foley", "📌 R. Harry", "📌 C. Latham"],
            "2015": ["S. Moore", "M. Hooper", "D. Pocock", "B. Foley", "M. Giteau", "📋 T. Kuridrani", "📋 A. Ashley-Cooper", "📋 D. Mitchell", "📋 I. Folau", "📋 W. Genia", "📋 S. Fardy", "📋 K. Douglas", "📋 R. Simmons", "📋 S. Kepu", "📋 S. Sio"]
        },
        years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"]
    },
    {
        country: "Wales",
        squads: {
            "2011": ["S. Warburton", "📋 M. Phillips", "📋 J. Hook", "📋 J. Roberts", "📋 J. Davies", "📋 G. North", "📋 S. Williams", "📋 T. Faletau", "📋 D. Lydiate", "📋 A.W. Jones", "📋 L. Charteris", "📋 Adam Jones", "📋 H. Bennett", "📋 G. Jenkins", "📋 L. Halfpenny"],
            "2019": ["A.W. Jones", "📋 J. Tipuric", "📋 T. Faletau", "📋 D. Biggar", "📋 J. Davies", "📋 H. Amos", "📋 G. North", "📋 L. Halfpenny", "📋 G. Davies", "📋 Josh Adams", "📋 A. Beard", "📋 J. Navidi", "📋 T. Francis", "📋 K. Owens", "📋 W. Jones"]
        },
        years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"]
    },
    {
        country: "Scotland",
        squads: {
            "2023": ["J. Ritchie", "F. Russell", "D. van der Merwe", "P. Schoeman", "G. Turner", "Z. Fagerson", "R. Gray", "G. Gilchrist", "📋 R. Darge", "📋 J. Dempsey", "📋 A. Price", "📋 H. Jones", "📋 S. Tuipulotu", "📋 D. Graham", "📋 B. Kinghorn"]
        },
        years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"]
    },
    {
        country: "Argentina",
        squads: {
            "2007": ["A. Pichot", "F. Contepomi", "J.M. Hernandez", "J.M. Fernandez Lobbe", "📋 L. Borges", "📋 M. Carizza", "📋 P. Albacete", "📋 R. Roncero", "📋 M. Ledesma", "📋 O. Hasan", "📋 J. Leguizamon", "📋 G. Longo", "📋 N. Corleto", "📋 H. Agulla", "📋 F. Todeschini"]
        },
        years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"]
    },
    {
        country: "Italy",
        squads: {
            "2015": ["S. Parisse", "📋 M. Castrogiovanni", "📋 A. Zanni", "📋 L. Ghiraldini", "📋 Q. Geldenhuys", "📋 M. Aguero", "📋 L. Cittadini", "📋 F. Minto", "📋 A. Zanni", "📋 E. Gori", "📋 T. Allan", "📋 G. Venditti", "📋 L. McLean", "📋 M. Campagnaro", "📋 G. Palazzani"]
        },
        years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"]
    }
];

const tier2Nations = [
    { country: "Japan", squads: { "2015": ["M. Leitch", "📋 F. Tanaka", "📋 A. Goromaru", "📋 S. Horie", "📋 K. Hatakeyama", "📋 M. Mikamie", "📋 L. Thompson", "📋 H. Ono", "📋 M. Broadhurst", "📋 H. Tui", "📋 H. Yamada", "📋 C. Wing", "📋 Y. Tamura", "📋 K. Matsushima", "📋 T. Broadhurst"], "2019": ["M. Leitch", "📋 K. Matsushima", "📋 S. Horie", "📋 K. Inagaki", "📋 J. Moore", "📋 W. van der Walt", "📋 P. Labuschagne", "📋 K. Himeno", "📋 Y. Nagare", "📋 Y. Tamura", "📋 R. Nakamura", "📋 T. Lafaele", "📋 K. Fukuoka", "📋 L. Lemeki", "📋 W. Tupou"] }, years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"] },
    { country: "Fiji", squads: { "2023": ["W. Nayacalevu", "📋 S. Radradra", "📋 J. Tuisova", "📋 V. Mata", "📋 L. Botia", "📋 E. Mawi", "📋 T. Ikanivere", "📋 L. Tagi", "📋 I. Nasilasila", "📋 T. Cirikidaveta", "📋 M. Derenalagi", "📋 F. Kuruvoli", "📋 T. Tela", "📋 S. Habosi", "📋 I. Droasese"] }, years: ["1987", "1991", "1999", "2003", "2007", "2011", "2015", "2019", "2023"] },
    { country: "Samoa", squads: { "1991": ["P. Fatialofa", "📋 B. Lima", "📋 F. Bunce", "📋 S. Bachop", "📋 T. Vaega", "📋 A. Aiolupo", "📋 M. Birtwistle", "📋 D. Kaleopa", "📋 S. Toomalatai", "📋 E. Ioane", "📋 P. Lam", "📋 J. Tagaloa", "📋 T. Toomalatai", "📋 F. Toomalatai", "📋 M. Ialam"] }, years: ["1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"] },
    { country: "Tonga", squads: { "2011": ["📋 F. Maka", "📋 S. Kalamafoni", "📋 T. Filise", "📋 S. Taumalolo", "📋 A. Lutu", "📋 J. Fonua", "📋 S. Timani", "📋 K. Pasuka", "📋 T. Palu", "📋 K. Morath", "📋 S. Piutau", "📋 A. Fekitoa", "📋 S. Hufanga", "📋 F. Vainikolo", "📋 V. Lilo"] }, years: ["1987", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"] },
    { country: "Georgia", squads: { "2015": ["M. Gorgodze", "📋 M. Nariashvili", "📋 J. Bregvadze", "📋 D. Zirakashvili", "📋 G. Chkhaidze", "📋 K. Mikautadze", "📋 V. Kolelishvili", "📋 G. T堅持adze", "📋 V. Lobzhanidze", "📋 L. Malaghuradze", "📋 M. Sharikadze", "📋 D. Kacharava", "📋 G. Aptsiauri", "📋 T. Mchedlidze", "📋 M. Kvirikashvili"] }, years: ["2003", "2007", "2011", "2015", "2019", "2023"] },
    { country: "Romania", squads: { "1987": ["📋 M. Murariu", "📋 I. Bucan", "📋 G. Leonte", "📋 N. Radecan", "📋 E. Dumitru", "📋 F. Radu", "📋 S. Tofan", "📋 H. Dumitras", "📋 A. Podarascu", "📋 V. Pascu", "📋 M. Toader", "📋 L. Constantin", "📋 R. Lazăr", "📋 A. Lungu", "📋 V. Ion"] }, years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2023"] },
    { country: "Canada", squads: { "1991": ["📋 G. Rees", "📋 A. Charron", "📋 J. Sarpalius", "📋 N. Hadley", "📋 E. Evans", "📋 J. Lecky", "📋 G. MacKinnon", "📋 B. Braid", "📋 C. Tynan", "📋 G. Stewart", "📋 S. Gray", "📋 C. Lougheed", "📋 D. Lougheed", "📋 P. Palmer", "📋 M. Williams"] }, years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019"] },
    { country: "USA", squads: { "2019": ["📋 B. MacGinty", "📋 C. Dolan", "📋 T. Lamositele", "📋 J. Taufete'e", "📋 P. Mullen", "📋 N. Civetta", "📋 G. Peterson", "📋 H. Germishuys", "📋 M. Iosefo", "📋 S. Davies", "📋 R. de Haas", "📋 P. Campbell", "📋 M. Brache", "📋 B. Scully", "📋 W. Hooley"] }, years: ["1987", "1991", "1999", "2003", "2007", "2011", "2015", "2019"] },
    { country: "Namibia", squads: { "2015": ["J. Burger", "📋 T. du Plessis", "📋 R. Kitshoff", "📋 T. Forbes", "📋 J. Engels", "📋 T. Hoyleck", "📋 A. Coetzee", "📋 PJ. van Lill", "📋 E. Buitendag", "📋 T. Kotze", "📋 D. de la Harpe", "📋 J. Deysel", "📋 J. Tromp", "📋 C. Botha", "📋 R. van Wyk"] }, years: ["1999", "2003", "2007", "2011", "2015", "2019", "2023"] },
    { country: "Uruguay", squads: { "2019": ["F. Ormaechea", "📋 R. Silva", "📋 M. Sanguinetti", "📋 G. Kessler", "📋 J. Rombys", "📋 I. Dotti", "📋 M. Leindekar", "📋 J.M. Gaminara", "📋 S. Civetta", "📋 S. Arata", "📋 F. Berchesi", "📋 A. Vilaseca", "📋 J. Prada", "📋 N. Freitas", "📋 G. Mieres"] }, years: ["1999", "2003", "2015", "2019", "2023"] },
    { country: "Spain", squads: { "1999": ["📋 A. Feijoo", "📋 F. Puertas", "📋 V. Torres", "📋 J. Gutierrez", "📋 J. Camps", "📋 A. Malo", "📋 C. Souto", "📋 S. Souto", "📋 O. Ripol", "📋 A. Socino", "📋 F. Diez", "📋 R. Bastide", "📋 S. Loubsens", "📋 J. Zapatero", "📋 M. Auzmendi"] }, years: ["1999"] },
    { country: "Portugal", squads: { "2023": ["S. Marques", "📋 R. Storti", "📋 M. Tadjer", "📋 F. Fernandes", "📋 J. Madeira", "📋 N. Martins", "📋 D. Wallis", "📋 J. Granate", "📋 T. Appleton", "📋 J. Lima", "📋 P. Bettencourt", "📋 R. Marta", "📋 N. Sousa Guedes", "📋 M. Cardozo Pinto", "📋 J. Guedes"] }, years: ["2007", "2023"] },
    { country: "Russia", squads: { "2011": ["📋 V. Artemyev", "📋 K. Kushnarev", "📋 A. Shakirov", "📋 V. Korshunov", "📋 E. Pronenko", "📋 D. Antonov", "📋 A. Voytov", "📋 V. Gresev", "📋 A. Yanyushkin", "📋 K. Rachkov", "📋 S. Trishin", "📋 M. Babaev", "📋 V. Ostroushko", "📋 I. Galinovskiy", "📋 S. Atamanchuk"] }, years: ["2011", "2019"] },
    { country: "Zimbabwe", squads: { "1987": ["📋 M. Martin", "📋 K. Barrett", "📋 M. Grobler", "📋 R. Snyder", "📋 A. Ferreira", "📋 B. Currin", "📋 S. Buitendag", "📋 A. Milton", "📋 C. Malcolm", "📋 G. Holshausen", "📋 P. Kaulback", "📋 M. Ferguson", "📋 C. Brown", "📋 R. Tsimba", "📋 J. Ewing"] }, years: ["1987", "1991"] },
    { country: "Ivory Coast", squads: { "1995": ["📋 E. Camara", "📋 T. Lasme", "📋 P. Diallo", "📋 S. Brito", "📋 C. Niakou", "📋 G. Bile", "📋 I. Ozoukou", "📋 A. Pere", "📋 F. Kone", "📋 M. Dali", "📋 A. Quansah", "📋 P. N'Goran", "📋 J. Zahui", "📋 L. Lath", "📋 V. Kouassi"] }, years: ["1995"] },
    { country: "Chile", squads: { "2023": ["📋 S. Videla", "📋 M. Sigren", "📋 R. Martinez", "📋 C. Saavedra", "📋 J.I. Lues", "📋 A. Bohme", "📋 I. Inostroza", "📋 P. Eissmann", "📋 S. Pedrero", "📋 B. Videla", "📋 R. Carvallo", "📋 M. Garafulic", "📋 S. Fernandez", "📋 J. Larenas", "📋 I. Ayarza"] }, years: ["2023"] }
];

// ERA GENERATOR BASELINES (Fallback system if precise database match is skipped)
const historicNameBank = {
    Eng: ["Guscott", "Carling", "Underwood", "Back", "Dallaglio", "Corry", "Cohen", "Robinson"],
    NZ: ["Lomu", "Umaga", "Cullen", "Marshall", "Mehrtens", "Fitzpatrick", "Brooke", "Jones"],
    RSA: ["Habana", "Montgomery", "du Preez", "Burger", "Matfield", "Botha", "Smit", "James"],
    Fra: ["Blanco", "Sella", "Camba", "Benazzi", "Pelous", "Ibanez", "Magne", "Michalak"],
    Ire: ["O'Driscoll", "O'Gara", "Wood", "Clohessy", "Galway", "Foley", "Hickie", "Girvan"],
    Aus: ["Campese", "Horan", "Gregan", "Larkham", "Eales", "Little", "Kefu", "Burke"],
    Wal: ["Gibbs", "Jenkins", "Howley", "Quinnell", "Charvis", "Williams", "Jones", "Thomas"],
    Sco: ["Hastings", "Sole", "Lineen", "Armstrong", "Jeffrey", "Chalmers", "Townsend", "Leslie"],
    Arg: ["Pichot", "Contepomi", "Albanese", "Ledesma", "Roncero", "Grau", "Allub", "Martin"],
    Ita: ["Dominguez", "Troncon", "Vaccari", "Stoica", "Cuttitta", "Gardner", "Checchinato", "Giacheri"]
};
