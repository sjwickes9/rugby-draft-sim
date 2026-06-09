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
            // Standard country fallback string array mapper
            const unicodeFlags = {
                "New Zealand": "🇳🇿", "South Africa": "🇿🇦", "France": "🇫🇷", "Ireland": "🇮🇪", 
                "Australia": "🇦🇺", "Argentina": "🇦🇦", "Italy": "🇮🇹", "Japan": "🇯🇵", 
                "Fiji": "🇫🇯", "Samoa": "🇼🇸", "Tonga": "🇹🇴", "Georgia": "🇬🇪", 
                "Romania": "🇷🇴", "Canada": "🇨🇦", "USA": "🇺🇸", "Namibia": "🇳🇦", 
                "Uruguay": "🇺🇾", "Spain": "🇪🇸", "Portugal": "🇵🇹", "Russia": "🇷🇺", 
                "Zimbabwe": "🇿🇼", "Ivory Coast": "🇨🇮", "Chile": "🇨🇱"
            };
            return `<span style="font-size:1.8rem;">${unicodeFlags[country] || "🏳️"}</span>`;
    }
}

const tier1Nations = [
    { country: "New Zealand", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["McCaw", "Carter", "Whitelock", "Read", "Nonu", "Smith", "Savea", "Mealamu", "Franks", "Retallick", "Barrett", "Woodcock", "Kaino", "Perenara", "Williams"] },
    { country: "South Africa", years: ["1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Etzebeth", "Vermeulen", "Kolbe", "du Toit", "Habana", "de Klerk", "Pollard", "Mtawarira", "Am", "de Allende", "Marx", "Malherbe", "Kitshoff", "Mostert", "Kolisi"] },
    { country: "England", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Wilkinson", "Johnson", "Dallaglio", "Robinson", "Greenwood", "Back", "Hill", "Vickery", "Thompson", "Dawson", "Tindall", "Farrell", "Itoje", "Tuilagi", "Underhill"] },
    { country: "France", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Dupont", "Alldritt", "Penaud", "Ntamack", "Fickou", "Baille", "Atonio", "Marchand", "Flament", "Ramos", "Jalibert", "Ollivon", "Cros", "Danty", "Willemse"] },
    { country: "Ireland", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Sexton", "Furlong", "Aki", "van der Flier", "Porter", "Sheehan", "Ryan", "Beirne", "Doris", "Gibson-Park", "Lowe", "Keenan", "O'Mahony", "Hansen", "Ringrose"] },
    { country: "Australia", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Eales", "Gregan", "Horan", "Larkham", "Mortlock", "Smith", "Kefu", "Finegan", "Sharpe", "Campese", "Hooper", "Pocock", "Genia", "Cooper", "Ashley-Cooper"] },
    { country: "Wales", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["A.W. Jones", "Warburton", "Faletau", "Halfpenny", "North", "Roberts", "Davies", "Jenkins", "Jones", "Phillips", "Williams", "Tipuric", "Biggar", "Owens", "Davies"] },
    { country: "Scotland", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Hogg", "Russell", "Van der Merwe", "Schoeman", "Turner", "Z. Fagerson", "Gray", "Gilchrist", "Ritchie", "Darge", "Dempsey", "Price", "Jones", "Tuipulotu", "Kinghorn"] },
    { country: "Argentina", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Pichot", "Contepomi", "Hernandez", "Lobbe", "Ronceron", "Creevy", "Montoya", "Gallo", "Lavanini", "Matera", "Kremer", "Bertranou", "Carreras", "Chocobares", "Boffelli"] },
    { country: "Italy", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Parisse", "Castrogiovanni", "Zanni", "Ghiraldini", "Troncon", "Dominguez", "Masi", "Fischetti", "Nicotera", "Ruzza", "Cannone", "Negri", "Lamaro", "Garbisi", "Capuozzo"] }
];

const tier2Nations = [
    { country: "Japan", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Leitch", "Horie", "Inagaki", "Valu", "Dearns", "Himeno", "Labuschagne", "Nagare", "Matsuda", "Nakamura", "Riley", "Naikabula", "Matsushima", "Yamanaka", "Tamura"] },
    { country: "Fiji", years: ["1987", "1991", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Nayacalevu", "Radradra", "Tuisova", "Mata", "Botia", "Mawi", "Ikanivere", "Tagi", "Nasilasila", "Cirikidaveta", "Derenalagi", "Kuruvoli", "Tela", "Habosi", "Droasese"] },
    { country: "Samoa", years: ["1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Tuilagi", "Alatimu", "Taumateine", "Seuteni", "Manu", "Fidow", "Lay", "Malolo", "Alaalatoa", "Vui", "McFarland", "Luatua", "Lee", "Mapusua", "Treformat"] },
    { country: "Tonga", years: ["1987", "1995", "1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Piutau", "Fekitoa", "Ahki", "Taumalolo", "Mafi", "Fisi'ihoi", "Ngauamo", "Tameifuna", "Lousi", "Fifita", "Halaifonua", "Takulua", "Havili", "Kata", "Veainu"] },
    { country: "Georgia", years: ["2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Gorgodze", "Niniashvili", "Lobzhanidze", "Sharikadze", "Abzhandadze", "Nariashvili", "Mamukashvili", "Gigashvili", "Cheishvili", "Mikautadze", "T堅持adze", "Saghinadze", "Jalagonia", "Tabutsadze", "Todua"] },
    { country: "Romania", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2023"], rawNames: ["Gajion", "Cojocaru", "Gordas", "Iftimiciuc", "Motoc", "Gorcioaia", "Neculau", "Chirica", "Rupanu", "Boldor", "Tangimana", "Gafurova", "Manumua", "Simionescu", "Conache"] },
    { country: "Canada", years: ["1987", "1991", "1995", "1999", "2003", "2007", "2011", "2015", "2019"], rawNames: ["Cudmore", "Ardron", "Olmstead", "Blevins", "Hearn", "Paris", "Mack", "McRorie", "Braid", "Evans", "Barkwill", "Sears", "Buydens", "Djustice", "Tierney"] },
    { country: "USA", years: ["1987", "1991", "1999", "2003", "2007", "2011", "2015", "2019"], rawNames: ["Scully", "MacGinty", "Maninoa", "Lamositele", "Taufete'e", "Civetta", "Fry", "Dolan", "Blaine", "Augspurger", "Campbell", "Brache", "Iosefo", "Te'o", "Wyles"] },
    { country: "Namibia", years: ["1999", "2003", "2007", "2011", "2015", "2019", "2023"], rawNames: ["Burger", "Coetzee", "Deysel", "Stevens", "van Jaarsveld", "Sethie", "Nortje", "Gaoseb", "Katjijeko", "Conradie", "Loubser", "De la Harpe", "Greyling", "van der Westhuizen", "Tromp"] },
    { country: "Uruguay", years: ["1999", "2003", "2015", "2019", "2023"], rawNames: ["Ormaechea", "Berchesi", "Magno", "Sanguinetti", "Kessler", "Peculo", "Aliaga", "Leindekar", "Ardao", "Civetta", "Arata", "Etcheverry", "Vilaseca", "Inciarte", "Amaya"] },
    { country: "Spain", years: ["1999"], rawNames: ["Alvarado", "Zapata", "Feijoo", "Souto", "Moreno", "Guzman", "del Valle", "Bonan", "Guillaume", "Rouet", "Linklater", "Lopez", "Malie", "Gavin", "Contardi"] },
    { country: "Portugal", years: ["2007", "2023"], rawNames: ["Marques", "Storti", "Tadjer", "Fernandes", "Madeira", "Martins", "Wallis", "Granate", "Simões", "Lucas", "Jerónimo", "Lima", "Bettencourt", "Marta", "Sousa"] },
    { country: "Russia", years: ["2011", "2019"], rawNames: ["Artemyev", "Ostrikov", "Kushnarev", "Yanyushkin", "Galinovskiy", "Gerasimov", "Ostroushko", "Bitiev", "Matveev", "Gotovtsev", "Fedotko", "Gadjiev", "Vavilin", "Perov", "Davydov"] },
    { country: "Zimbabwe", years: ["1987", "1991"], rawNames: ["Grobler", "Tsimba", "Chiutsi", "Olonga", "Mberi", "Buitendag", "Chivandire", "Mutamangira", "Makwanya", "Hondo", "Sibanda", "Nyamutsamba", "Mudariki", "Ndlovu", "Chitokwindo"] },
    { country: "Ivory Coast", years: ["1995"], rawNames: ["Okou", "Dali", "Niakou", "Camara", "N'Goran", "Pere", "Kone", "Gamba", "Bile", "Quansah", "N'Guessan", "Lath", "Zahui", "Dago", "Kouassi"] },
    { country: "Chile", years: ["2023"], rawNames: ["Lues", "Bohme", "Inostroza", "Eissmann", "Pedrero", "Saavedra", "Martinez", "Sigren", "Videla", "Carvallo", "Garafulic", "Fernandez", "Ayarza", "Velarde", "Larenas"] }
];
