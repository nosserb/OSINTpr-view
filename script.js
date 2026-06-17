// =====================================================
//  OSINT CTF — Enquete Numerique (3e) — SCORE MODE
//  Cible: Zoé Rouleau
// =====================================================

// ── STATE ──
let score = 100;
const found = {};
const errors = [];

// All clickable facts. Each has: id, category, label, value, isCorrect
const ALL_FACTS = [
    // Identite
    { id: "nom", cat: "identite", label: "Nom complet", value: "Zoé Rouleau", correct: true },
    { id: "prenom", cat: "identite", label: "Prenom", value: "Zoé", correct: true },
    { id: "age", cat: "identite", label: "Age", value: "22 ans", correct: true },
    { id: "naissance", cat: "identite", label: "Date de naissance", value: "25 janvier 2004", correct: true },
    { id: "zodiaque", cat: "identite", label: "Signe zodiacal", value: "Verseau", correct: true },
    { id: "adresse", cat: "identite", label: "Adresse complete", value: "9, rue de l'Aigle, 93210 La Plaine-Saint-Denis", correct: true },
    { id: "gps", cat: "identite", label: "Coordonnees GPS", value: "48.960522, 2.432508", correct: true },
    { id: "mere", cat: "identite", label: "Nom de jeune fille de la mere", value: "Larocque", correct: true },
    { id: "nirpp", cat: "identite", label: "NIRPP", value: "2040193756144 90", correct: true },
    { id: "sang", cat: "identite", label: "Groupe sanguin", value: "A+", correct: true },
    { id: "taille", cat: "identite", label: "Taille", value: "166 cm", correct: true },
    { id: "poids", cat: "identite", label: "Poids", value: "51.5 kg", correct: true },
    // Contact
    { id: "email", cat: "contact", label: "Email", value: "ZoeRouleau@jourrapide.com", correct: true },
    { id: "telephone", cat: "contact", label: "Telephone", value: "01.66.22.76.72", correct: true },
    { id: "pseudo", cat: "reseaux", label: "Pseudo / Username", value: "Geore2004", correct: true },
    { id: "site", cat: "contact", label: "Site web", value: "SewingTags.fr", correct: true },
    // Reseaux
    { id: "twitter", cat: "reseaux", label: "Compte Twitter", value: "@Geore2004", correct: true },
    { id: "instagram", cat: "reseaux", label: "Compte Instagram", value: "@Geore2004", correct: true },
    { id: "github", cat: "reseaux", label: "Compte GitHub", value: "Geore2004", correct: true },
    // Emploi
    { id: "metier", cat: "emploi", label: "Metier", value: "Ceramicienne dentaire", correct: true },
    { id: "entreprise", cat: "emploi", label: "Entreprise", value: "Laura Ashley", correct: true },
    // Vehicule
    { id: "voiture", cat: "vehicule", label: "Vehicule", value: "Audi TT 2012", correct: true },
    { id: "couleur", cat: "divers", label: "Couleur preferee", value: "Vert", correct: true },
    { id: "mdp", cat: "divers", label: "Mot de passe", value: "Ohvaes4ipah", correct: true },
    { id: "visa", cat: "divers", label: "Carte Visa", value: "4485 9599 6861 8473", correct: true },
    { id: "cvv", cat: "divers", label: "CVV2", value: "232", correct: true },
    { id: "ua", cat: "divers", label: "Navigateur", value: "Chrome 74 / Mac OS X", correct: true },
    { id: "guid", cat: "divers", label: "GUID", value: "d4f359ff-aa51-47cb", correct: true },
    { id: "ups", cat: "divers", label: "Colis UPS", value: "1Z 670 4A5 05 4819 435 1", correct: true },
    { id: "wu", cat: "divers", label: "Western Union", value: "9772688327", correct: true },
    { id: "mg", cat: "divers", label: "MoneyGram", value: "21591343", correct: true },
    { id: "flag", cat: "divers", label: "FLAG CTF", value: "OSINT{zoe_rouleau_93210_verseau_vert_audi}", correct: true },

    // FAUX (pieges) — cliquer = -10 points
    { id: "fake1", cat: "erreurs", label: "Fausse adresse", value: "15 rue du Faubourg, Paris", correct: false },
    { id: "fake2", cat: "erreurs", label: "Faux metier", value: "Infirmiere", correct: false },
    { id: "fake3", cat: "erreurs", label: "Faux email", value: "z.rouleau@gmail.com", correct: false },
    { id: "fake4", cat: "erreurs", label: "Fausse voiture", value: "Peugeot 208", correct: false },
    { id: "fake5", cat: "erreurs", label: "Faux pseudo", value: "@zrouleau2004", correct: false },
    { id: "fake6", cat: "erreurs", label: "Faux age", value: "25 ans", correct: false },
    { id: "fake7", cat: "erreurs", label: "Fausse ville", value: "Lyon", correct: false },
    { id: "fake8", cat: "erreurs", label: "Faux signe", value: "Poissons", correct: false },
    { id: "fake9", cat: "erreurs", label: "Fausse entreprise", value: "Decathlon", correct: false },
    { id: "fake10", cat: "erreurs", label: "Faux telephone", value: "06 12 34 56 78", correct: false },
];

const CAT_LABELS = {
    identite: "Identite",
    contact: "Contact",
    reseaux: "Reseaux Sociaux",
    emploi: "Emploi",
    vehicule: "Vehicule",
    divers: "Divers",
    erreurs: "Erreurs",
};

const CAT_CONTAINERS = {
    identite: "info-identite",
    contact: "info-contact",
    reseaux: "info-reseaux",
    emploi: "info-emploi",
    vehicule: "info-vehicule",
    divers: "info-divers",
    erreurs: "info-erreurs",
};

// ── FAKE GOOGLE DATABASE ──
const googleDB = [
    // Main name search
    { kw: ["zoe", "rouleau", "saint-denis"], title: "Zoé Rouleau — La Plaine-Saint-Denis (93)", url: "pagesjaunes.fr/zoe-rouleau-93210", snippet: `<span class="osint-word" data-id="nom">Zoé Rouleau</span>, <span class="osint-word" data-id="age">22 ans</span>. Adresse: <span class="osint-word" data-id="adresse">9, rue de l'Aigle, 93210 La Plaine-Saint-Denis</span>. Telephone: <span class="osint-word" data-id="telephone">01.66.22.76.72</span>. Email: <span class="osint-word" data-id="email">ZoeRouleau@jourrapide.com</span>.` },

    // Email
    { kw: ["zoerouleau", "jourrapide", "mail"], title: "ZoeRouleau@jourrapide.com — Profil", url: "emailrep.io/ZoeRouleau@jourrapide.com", snippet: `Email: <span class="osint-word" data-id="email">ZoeRouleau@jourrapide.com</span>. Proprietaire: <span class="osint-word" data-id="nom">Zoé Rouleau</span>. Compte actif. Associe aux comptes: <span class="osint-word" data-id="twitter">Twitter</span>, <span class="osint-word" data-id="instagram">Instagram</span>, <span class="osint-word" data-id="github">GitHub</span>.` },
    { kw: ["zoerouleau", "jourrapide"], title: "ZoeRouleau@jourrapide.com — Fuite de donnees", url: "haveibeenpwned.com/ZoeRouleau@jourrapide.com", snippet: `<span class="osint-word" data-id="email">ZoeRouleau@jourrapide.com</span> trouve dans 2 fuites. Associe a <span class="osint-word" data-id="nom">Zoé Rouleau</span>. Mot de passe: <span class="osint-word" data-id="mdp">Ohvaes4ipah</span>.` },

    // Pseudo
    { kw: ["geore2004", "twitter", "x"], title: "@Geore2004 — Twitter / X", url: "x.com/Geore2004", snippet: `<span class="osint-word" data-id="twitter">@Geore2004</span> — "Zoé, <span class="osint-word" data-id="age">22 ans</span> | La Plaine-Saint-Denis | Passionnee de geologie et de couture | <span class="osint-word" data-id="couleur">Vert</span> | <span class="osint-word" data-id="voiture">Audi TT</span>" — 487 abonnes.` },
    { kw: ["geore2004", "instagram"], title: "@Geore2004 — Instagram", url: "instagram.com/geore2004", snippet: `<span class="osint-word" data-id="instagram">@Geore2004</span> — 1 203 abonnes. Bio: "Zoé | <span class="osint-word" data-id="age">22 ans</span> | <span class="osint-word" data-id="metier">Dental ceramist</span> | <span class="osint-word" data-id="site">SewingTags.fr</span> | <span class="osint-word" data-id="couleur">Vert</span> est ma couleur" — 89 publications.` },
    { kw: ["geore2004", "github"], title: "Geore2004 — GitHub", url: "github.com/Geore2004", snippet: `<span class="osint-word" data-id="github">Geore2004</span> — 7 repositories. Bio: "Zoé Rouleau — <span class="osint-word" data-id="gps">La Plaine-Saint-Denis</span>. Geology & sewing."` },
    { kw: ["geore2004"], title: "Geore2004 — Tous les comptes", url: "namechk.com/Geore2004", snippet: `Pseudo <span class="osint-word" data-id="pseudo">Geore2004</span> trouve sur: <span class="osint-word" data-id="twitter">Twitter</span>, <span class="osint-word" data-id="instagram">Instagram</span>, <span class="osint-word" data-id="github">GitHub</span>. Utilise par <span class="osint-word" data-id="nom">Zoé Rouleau</span>.` },

    // Metier
    { kw: ["zoe", "rouleau", "laura", "ashley", "dental"], title: "Zoé Rouleau — Laura Ashley Dental", url: "laura-ashley-dental.fr/equipe", snippet: `<span class="osint-word" data-id="metier">Zoé Rouleau — Céramicienne dentaire</span> chez <span class="osint-word" data-id="entreprise">Laura Ashley</span>. Specialites: couronnes, bridges, protheses.` },
    { kw: ["zoe", "rouleau", "dental", "ceramist"], title: "Zoé Rouleau — Dental Ceramist", url: "linkedin.com/in/zoe-rouleau-dental", snippet: `<span class="osint-word" data-id="metier">Zoé Rouleau — Dental Ceramist</span> at <span class="osint-word" data-id="entreprise">Laura Ashley</span>. La Plaine-Saint-Denis.` },

    // Voiture
    { kw: ["zoe", "rouleau", "audi", "tt"], title: "Zoé Rouleau — <span class='osint-word' data-id='voiture'>Audi TT 2012</span>", url: "cartegrise.com/zoe-rouleau", snippet: `Vehicule: <span class="osint-word" data-id="voiture">Audi TT 2012</span>. Proprietaire: <span class="osint-word" data-id="nom">Zoé Rouleau</span>. Adresse: 9, rue de l'Aigle, 93210.` },

    // GPS
    { kw: ["48.960522", "2.432508", "gps"], title: "GPS: 48.960522, 2.432508", url: "google-maps.fr/48.960522-2.432508", snippet: `Position: <span class="osint-word" data-id="gps">48.960522, 2.432508</span>. Adresse: <span class="osint-word" data-id="adresse">9, rue de l'Aigle, La Plaine-Saint-Denis</span>.` },

    // Site web
    { kw: ["sewingtags", "fr"], title: "SewingTags.fr — Blog de couture", url: "sewingtags.fr", snippet: `<span class="osint-word" data-id="site">SewingTags.fr</span> — Blog de couture. Cree par <span class="osint-word" data-id="nom">Zoé Rouleau</span>.` },
    { kw: ["sewingtags", "zoe", "a-propos"], title: "SewingTags.fr — A propos", url: "sewingtags.fr/a-propos", snippet: `"Je suis <span class="osint-word" data-id="nom">Zoé Rouleau</span>, <span class="osint-word" data-id="age">22 ans</span>. <span class="osint-word" data-id="metier">Céramicienne dentaire</span> chez <span class="osint-word" data-id="entreprise">Laura Ashley</span>. Ma couleur: <span class="osint-word" data-id="couleur">vert</span>. Je conduis une <span class="osint-word" data-id="voiture">Audi TT</span>."` },

    // Telephone
    { kw: ["01", "66", "22", "76", "72"], title: "01.66.22.76.72 — Telephone", url: "pagesjaunes.fr/01-66-22-76-72", snippet: `Numero: <span class="osint-word" data-id="telephone">01.66.22.76.72</span>. Nom: <span class="osint-word" data-id="nom">Zoé Rouleau</span>.` },

    // Naissance
    { kw: ["zoe", "rouleau", "naissance", "2004", "25", "janvier"], title: "Zoé Rouleau — Date de naissance", url: "annuaire-ville.fr/zoe-rouleau", snippet: `<span class="osint-word" data-id="nom">Zoé Rouleau</span>, nee le <span class="osint-word" data-id="naissance">25 janvier 2004</span>. Age: <span class="osint-word" data-id="age">22 ans</span>. Signe: <span class="osint-word" data-id="zodiaque">Verseau</span>.` },

    // Famille
    { kw: ["larocque", "rouleau"], title: "Famille Rouleau-Larocque", url: "genealogie.fr/rouleau-larocque", snippet: `Famille Rouleau. Mere de <span class="osint-word" data-id="nom">Zoé Rouleau</span>: nee <span class="osint-word" data-id="mere">Larocque</span>.` },

    // Couleur
    { kw: ["zoe", "rouleau", "vert", "couleur"], title: "Zoé Rouleau — Couleur preferee: Vert", url: "profil-perso.fr/zoe-rouleau", snippet: `<span class="osint-word" data-id="nom">Zoé Rouleau</span> — Couleur preferee: <span class="osint-word" data-id="couleur">Vert</span>. Signe: <span class="osint-word" data-id="zodiaque">Verseau</span>.` },

    // Visa
    { kw: ["4485", "9599", "visa"], title: "Carte Visa — 4485 9599 6861 8473", url: "banque-france.fr/4485-9599", snippet: `Carte Visa. Proprietaire: <span class="osint-word" data-id="nom">Zoé Rouleau</span>. Numero: <span class="osint-word" data-id="visa">4485 9599 6861 8473</span>. CVV: <span class="osint-word" data-id="cvv">232</span>. Expiration: 10/2028.` },

    // Tracking
    { kw: ["1z", "670", "ups", "colis"], title: "UPS — Colis", url: "ups.com/tracking/1Z6704A50548194351", snippet: `Colis livré a <span class="osint-word" data-id="nom">Zoé Rouleau</span>. Tracking: <span class="osint-word" data-id="ups">1Z 670 4A5 05 4819 435 1</span>.` },

    // Western Union
    { kw: ["western", "union", "9772688327"], title: "Western Union — Transfert", url: "westernunion.fr/9772688327", snippet: `Transfert: MTCN <span class="osint-word" data-id="wu">9772688327</span>. Expediteur: <span class="osint-word" data-id="nom">Zoé Rouleau</span>. Montant: 150 EUR. Destinataire: <span class="osint-word" data-id="mere">M. Larocque</span>.` },

    // Zodiac
    { kw: ["zoe", "rouleau", "verseau"], title: "Zoé Rouleau — Verseau", url: "horoscope.fr/zoe-rouleau", snippet: `<span class="osint-word" data-id="nom">Zoé Rouleau</span> — <span class="osint-word" data-id="zodiaque">Verseau</span>. Couleur: <span class="osint-word" data-id="couleur">Vert</span>.` },

    // Sang
    { kw: ["zoe", "rouleau", "sang", "groupe", "a+"], title: "Zoé Rouleau — Groupe sanguin A+", url: "dossiermedical.fr/zoe-rouleau", snippet: `<span class="osint-word" data-id="nom">Zoé Rouleau</span> — Groupe: <span class="osint-word" data-id="sang">A+</span>. Taille: <span class="osint-word" data-id="taille">166 cm</span>. Poids: <span class="osint-word" data-id="poids">51.5 kg</span>.` },

    // MDP
    { kw: ["ohvaes4ipah"], title: "Fuite — Mot de passe", url: "haveibeenpwned.com/passwords/ohvaes4ipah", snippet: `Mot de passe <span class="osint-word" data-id="mdp">ohvaes4ipah</span> trouvable dans 3 fuites. Associe a: <span class="osint-word" data-id="email">ZoeRouleau@jourrapide.com</span>.` },

    // NIRPP
    { kw: ["2040193756144", "nirpp"], title: "NIRPP — 2040193756144 90", url: "securite-sociale.fr/2040193756144", snippet: `NIRPP: <span class="osint-word" data-id="nirpp">2040193756144 90</span>. Proprietaire: <span class="osint-word" data-id="nom">Zoé Rouleau</span>.` },

    // GUID
    { kw: ["d4f359ff", "guid"], title: "GUID: d4f359ff-aa51-47cb", url: "tracking.fr/d4f359ff", snippet: `GUID: <span class="osint-word" data-id="guid">d4f359ff-aa51-47cb-b920-93ce2d8178f5</span>. Associe a: <span class="osint-word" data-id="nom">Zoé Rouleau</span>.` },

    // UA
    { kw: ["chrome", "74", "mac", "osx"], title: "Navigateur detecte — Chrome 74", url: "whatismybrowser.com/chrome-74", snippet: `User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5). Navigateur: <span class="osint-word" data-id="ua">Chrome 74.0.3729.157</span> sur <span class="osint-word" data-id="ua">Mac OS X</span>.` },

    // MoneyGram
    { kw: ["moneygram", "21591343"], title: "MoneyGram — 21591343", url: "moneygram.fr/21591343", snippet: `MoneyGram MTCN: <span class="osint-word" data-id="mg">21591343</span>. Expediteur: <span class="osint-word" data-id="nom">Zoé Rouleau</span>. Montant: 85 EUR.` },

    // FLAG
    { kw: ["ctf", "osint", "flag", "zoe", "rouleau"], title: "CTF OSINT — Challenge Zoé Rouleau", url: "ctf-challenges.fr/osint/zoe-rouleau", snippet: `<span class="osint-word" data-id="flag" style="color:#e95420;font-weight:bold;border-bottom:2px solid #e95420;">OSINT{zoe_rouleau_93210_verseau_vert_audi}</span> — Challenge resolu! Identite confirmee: Zoé Rouleau, 22 ans, La Plaine-Saint-Denis.` },

    // FAKE RESULTS (pieges)
    { kw: ["zoe", "rouleau", "infirmiere"], title: "Zoé Rouleau — Infirmiere a Paris", url: "linkedin.com/in/zoe-rouleau-nurse", snippet: `<span class="osint-word" data-id="fake7">Zoé Rouleau</span> — <span class="osint-word" data-id="fake2">Infirmiere</span> a <span class="osint-word" data-id="fake7">Paris</span>. Hopital Saint-Louis. 25 ans.` },
    { kw: ["zoe", "rouleau", "gmail"], title: "Zoé Rouleau — Gmail", url: "google.com/z.rouleau@gmail.com", snippet: `Adresse email: <span class="osint-word" data-id="fake3">z.rouleau@gmail.com</span>. Compte Google. <span class="osint-word" data-id="fake6">25 ans</span>.` },
    { kw: ["zrouleau2004", "pseudo"], title: "@zrouleau2004 — Profil", url: "twitter.com/zrouleau2004", snippet: `<span class="osint-word" data-id="fake5">@zrouleau2004</span> — "Zoé, etudiante a <span class="osint-word" data-id="fake7">Lyon</span>" — 234 abonnes.` },
    { kw: ["zoe", "rouleau", "peugeot", "208"], title: "Zoé Rouleau — Peugeot 208", url: "cartegrise.fr/zoe-rouleau-208", snippet: `Vehicule: <span class="osint-word" data-id="fake4">Peugeot 208</span>. Proprietaire: Zoé Rouleau. <span class="osint-word" data-id="fake6">25 ans</span>.` },
    { kw: ["zoe", "rouleau", "decathlon"], title: "Zoé Rouleau — Decathlon", url: "decathlon.fr/equipe/zoe-rouleau", snippet: `<span class="osint-word" data-id="fake9">Zoé Rouleau</span> — Vendeuse chez <span class="osint-word" data-id="fake9">Decathlon</span>. <span class="osint-word" data-id="fake7">Lyon</span>.` },
    { kw: ["06", "12", "34", "56", "78"], title: "06 12 34 56 78 — Telephone", url: "pagesjaunes.fr/06-12-34-56-78", snippet: `Numero: <span class="osint-word" data-id="fake10">06 12 34 56 78</span>. Nom: Sophie Martin. <span class="osint-word" data-id="fake7">Lyon</span>.` },
    { kw: ["zoe", "rouleau", "poissons"], title: "Zoé Rouleau — Signe: Poissons", url: "horoscope.fr/zoe-rouleau-poissons", snippet: `<span class="osint-word" data-id="fake8">Zoé Rouleau — Poissons</span>. Nee en mars 2004. Couleur: bleu.` },
];

// ── BOOT ──
const bootScreen = document.getElementById("boot-screen");
const bootLines = document.getElementById("boot-lines");
const bootMsgs = [
    "[    0.000] POST en cours...",
    "[    0.001] Memoire: 16384 Mo OK",
    "[    0.002] CPU: Intel i7-13700K @ 3.40GHz",
    "[    0.003] SSD: 1 To NVMe detecte",
    "[    0.004] GPU: NVIDIA RTX 4070",
    "[    0.100] BIOS: Charger le systeme...",
    "[    0.200] Demarrage de l'environnement OSINT...",
    "[    0.300] Chargement des outils:",
    "[    0.301]   -> theHarvester .............. OK",
    "[    0.302]   -> Sherlock .................. OK",
    "[    0.303]   -> Google Dorks ............. OK",
    "[    0.400] Reseau: eth0 — 192.168.1.47/24",
    "[    0.500] Connexion: securisee (VPN actif)",
    "[    0.600] Base de donnees: connectee",
    "[    0.700] 1 cible identifiee",
    "[    0.800] Vault: verrouille",
    "[    0.900] Systeme pret.",
    "",
    "  ╔══════════════════════════════════════════════╗",
    "  ║       SYSTEME D'ENQUETE OSINT v4.2          ║",
    "  ║       Mission: Retrouver la cible            ║",
    "  ╚══════════════════════════════════════════════╝",
];
let bi = 0;
const bootTimer = setInterval(() => {
    if (bi < bootMsgs.length) {
        bootLines.textContent += bootMsgs[bi] + "\n";
        bootLines.style.opacity = "1";
        bi++;
    } else {
        clearInterval(bootTimer);
        setTimeout(() => {
            bootScreen.style.transition = "opacity 0.6s";
            bootScreen.style.opacity = "0";
            setTimeout(() => {
                bootScreen.remove();
                document.getElementById("lock-screen").style.display = "flex";
            }, 600);
        }, 800);
    }
}, 85);

// ── LOCK SCREEN ──
function updateLockClock() {
    const now = new Date();
    document.getElementById("lock-time").textContent = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    document.getElementById("lock-date").textContent = now.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}
updateLockClock();
setInterval(updateLockClock, 1000);

const lockPwd = document.getElementById("lock-password");
const lockErr = document.getElementById("lock-error");

lockPwd.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && lockPwd.value.trim() === "112") {
        document.getElementById("lock-screen").style.transition = "opacity 0.5s";
        document.getElementById("lock-screen").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("lock-screen").style.display = "none";
            const dt = document.getElementById("desktop");
            dt.style.display = "block";
            dt.style.opacity = "0";
            dt.style.transition = "opacity 0.5s";
            setTimeout(() => dt.style.opacity = "1", 50);
            setTimeout(() => notify("Mission chargee. Un fichier d'identite partiel a ete intercepte.", 7000), 1000);
            setTimeout(() => notify("Ouvrez Google et cherchez 'Zoé Rouleau' pour commencer.", 6000), 3500);
        }, 500);
    } else if (e.key === "Enter") {
        lockErr.textContent = "Acces refuse. Indice: c'est le numero d'urgence europeen.";
        lockPwd.value = "";
        lockPwd.style.borderColor = "#f38ba8";
        setTimeout(() => (lockPwd.style.borderColor = "rgba(255,255,255,0.2)"), 1000);
    }
});

// ── CLOCK ──
function updateClock() {
    const now = new Date();
    document.getElementById("panel-clock").textContent = now.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}
updateClock();
setInterval(updateClock, 1000);

// ── WINDOW MANAGER ──
let wZ = 100;
function makeWin(title, body, w, h) {
    const d = document.createElement("div");
    d.className = "window";
    d.style.width = (w || 700) + "px";
    d.style.height = (h || 450) + "px";
    d.style.left = (120 + Math.random() * 200) + "px";
    d.style.top = (60 + Math.random() * 100) + "px";
    d.style.zIndex = ++wZ;
    d.innerHTML = `<div class="window-header"><div class="window-controls"><button class="window-btn btn-minimize"></button><button class="window-btn btn-maximize"></button><button class="window-btn btn-close"></button></div><span class="window-title">${title}</span></div><div class="window-body">${body}</div>`;
    document.getElementById("windows-container").appendChild(d);
    const hdr = d.querySelector(".window-header");
    let drag = false, ox, oy;
    hdr.addEventListener("mousedown", (e) => { if (e.target.classList.contains("window-btn")) return; drag = true; ox = e.clientX - d.offsetLeft; oy = e.clientY - d.offsetTop; d.style.zIndex = ++wZ; });
    document.addEventListener("mousemove", (e) => { if (drag) { d.style.left = (e.clientX - ox) + "px"; d.style.top = (e.clientY - oy) + "px"; } });
    document.addEventListener("mouseup", () => (drag = false));
    d.querySelector(".btn-close").addEventListener("click", () => d.remove());
    d.querySelector(".btn-maximize").addEventListener("click", () => d.classList.toggle("window-max"));
    d.querySelector(".btn-minimize").addEventListener("click", () => (d.style.display = "none"));
    d.addEventListener("mousedown", () => (d.style.zIndex = ++wZ));
    return d;
}

// ── TERMINAL ──
function openTerminal() {
    const body = `<div class="terminal-body">
<div class="term-line" style="color:#89b4fa">╔══════════════════════════════════════════════╗</div>
<div class="term-line" style="color:#89b4fa">║    SYSTEME D'ENQUETE OSINT — Terminal v4.2  ║</div>
<div class="term-line" style="color:#89b4fa">╚══════════════════════════════════════════════╝</div>
<div class="term-line"></div>
<div class="term-line">Tapez <b style="color:#f9e2af">'guide'</b> pour commencer.</div>
<div class="term-line"></div>
<div class="term-input-row">
<span class="term-prompt">detective@osint:~$</span>
<input class="term-input" type="text" spellcheck="false">
</div></div>`;
    const w = makeWin("Terminal OSINT", body, 740, 440);
    const inp = w.querySelector(".term-input");
    const tBody = w.querySelector(".terminal-body");
    inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const cmd = inp.value.trim();
            const ln = document.createElement("div");
            ln.className = "term-line";
            ln.textContent = "detective@osint:~$ " + cmd;
            tBody.insertBefore(ln, tBody.lastElementChild);
            const out = runCmd(cmd);
            if (out !== null) { const ol = document.createElement("div"); ol.className = "term-line"; ol.innerHTML = out; tBody.insertBefore(ol, tBody.lastElementChild); }
            inp.value = "";
            tBody.scrollTop = tBody.scrollHeight;
        }
    });
    tBody.addEventListener("click", () => inp.focus());
}

function runCmd(c) {
    const m = {
        "help": `Commandes: <span style="color:#f9e2af">ls, cat, whoami, pwd, date, clear, google, guide</span>`,
        "guide": `<span style="color:#89b4fa">╔══════════════════════════════════════════════╗</span>
<span style="color:#89b4fa">║     GUIDE PAS-A-PAS — DEBUTANT OSINT          ║</span>
<span style="color:#89b4fa">╚══════════════════════════════════════════════╝</span>

<span style="color:#f9e2af">1.</span> Lisez le fichier: <b>cat identite.txt</b>
<span style="color:#f9e2af">2.</span> Ouvrez Google: <b>google</b>
<span style="color:#f9e2af">3.</span> Cherchez: <b>Zoé Rouleau</b>
<span style="color:#f9e2af">4.</span> <b>CLIQUEZ</b> sur les mots importants dans les resultats!
   -> Les mots bleus souslignes sont cliquables
   -> Bonne info = +10 points (vert)
   -> Fausse info = -10 points (rouge)
<span style="color:#f9e2af">5.</span> La barre a droite montre vos progres

<span style="color:#f38ba8">Le but: accumuler le MAX d'infos correctes!</span>
<span style="color:#f38fa8">Attention aux pieges!</span>`,
        "ls": `identite.txt   briefing.txt   notes.txt`,
        "whoami": "detective_osint",
        "pwd": "/home/detective",
        "date": new Date().toString(),
        "clear": "__CLEAR__",
        "cat identite.txt": `<span style="color:#f9e2af">╔══════════════════════════════════════════════╗</span>
<span style="color:#f9e2af">║       FICHIER INTERCEPTE — PARTIEL            ║</span>
<span style="color:#f9e2af">╚══════════════════════════════════════════════╝</span>

<span style="color:#89b4fa">Nom:</b> Zoé Rouleau
<span style="color:#89b4fa">Adresse:</b> 9, rue de l'Aigle
<span style="color:#89b4fa">Code postal:</b> 93210
<span style="color:#89b4fa">Ville:</b> La Plaine-Saint-Denis

<span style="color:#f38ba8">⚠ Ce fichier est PARTIEL.</span>
<span style="color:#f9e2af">Utilisez Google pour trouver le reste!</span>
Tapez: <b>google</b>`,
        "cat briefing.txt": `<span style="color:#89b4fa">╔══════════════════════════════════════════════╗</span>
<span style="color:#89b4fa">║              MISSION BRIEFING                 ║</span>
<span style="color:#89b4fa">╚══════════════════════════════════════════════╝</span>

Agent,

Un fichier d'identite partiel a ete intercepte.
<b>Vous devez retrouver TOUT via Google.</b>

<span style="color:#f9e2af">INSTRUCTIONS:</span>
1. Ouvrez Google: <b>google</b>
2. Cherchez: <b>Zoé Rouleau</b>
3. <b>CLIquez</b> sur les mots bleus cliquables
4. Chaque clic correct = +10 points
5. Chaque mauvais clic = -10 points
6. La fiche enquete a droite suit vos progres

<span style="color:#f38ba8">ATTENTION aux pieges! Tous les resultats
ne sont pas vrais. Reflexionnez avant de cliquer!</span>`,
        "cat notes.txt": `<span style="color:#89b4fa">=== NOTES D'ENQUETE ===</span>

Cible: <b>Zoé Rouleau</b>
Adresse: <b>9, rue de l'Aigle, 93210 La Plaine-Saint-Denis</span>

<span style="color:#f9e2af">Utilisez Google pour en savoir plus!</span>`,
    };
    if (c === "") return null;
    if (m[c]) return m[c];
    return `<span style="color:#f38ba8">bash: ${c}: commande inconnue. Tapez 'help'.</span>`;
}

// ── CLICKABLE WORD HANDLER ──
function handleWordClick(e) {
    const el = e.target.closest(".osint-word");
    if (!el || el.classList.contains("clicked-correct") || el.classList.contains("clicked-wrong")) return;

    const id = el.dataset.id;
    const fact = ALL_FACTS.find(f => f.id === id);
    if (!fact) return;

    if (fact.correct) {
        if (!found[id]) {
            score += 10;
            found[id] = fact;
            addSidebarItem(fact);
            updateScore();
            notify(`+10  ${fact.label}: ${fact.value}`, "notif-success");
        } else {
            notify("Deja trouve!", "notif-success");
        }
        el.classList.add("clicked-correct");
    } else {
        score = Math.max(0, score - 10);
        errors.push(fact);
        addErrorItem(fact);
        updateScore();
        notify(`-10  PIGEGE: ${fact.value}`, "notif-error");
        el.classList.add("clicked-wrong");
    }
}

// ── SIDEBAR ──
function addSidebarItem(fact) {
    const container = document.getElementById(CAT_CONTAINERS[fact.cat]);
    const item = document.createElement("div");
    item.className = "sidebar-item";
    item.innerHTML = `<b>${fact.label}:</b> ${fact.value}`;
    container.appendChild(item);
}

function addErrorItem(fact) {
    const container = document.getElementById("info-erreurs");
    const item = document.createElement("div");
    item.className = "sidebar-item error";
    item.innerHTML = `<b>${fact.label}:</b> ${fact.value}`;
    container.appendChild(item);
}

function updateScore() {
    document.getElementById("score-display").textContent = score;
    const correctCount = Object.keys(found).length;
    const totalCorrect = ALL_FACTS.filter(f => f.correct).length;
    const pct = (correctCount / totalCorrect) * 100;
    document.getElementById("progress-fill").style.width = pct + "%";
    document.getElementById("progress-text").textContent = `${correctCount} / ${totalCorrect} infos`;

    if (score < 50) {
        document.getElementById("score-display").style.color = "#f38ba8";
    } else {
        document.getElementById("score-display").style.color = "#a6e3a1";
    }
}

// ── GOOGLE SEARCH ──
function openGoogle() {
    const overlay = document.getElementById("google-overlay");
    overlay.style.display = "flex";
    const input = document.getElementById("google-input");
    input.value = "";
    input.focus();
    document.getElementById("google-results").innerHTML = "";
}

document.getElementById("google-close").addEventListener("click", () => {
    document.getElementById("google-overlay").style.display = "none";
});

document.getElementById("google-search-btn").addEventListener("click", doSearch);
document.getElementById("google-input").addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });

document.getElementById("sidebar-toggle").addEventListener("click", () => {
    document.getElementById("google-sidebar").classList.toggle("collapsed");
    const toggle = document.getElementById("sidebar-toggle");
    toggle.textContent = toggle.textContent === "▲" ? "▼" : "▲";
});

function doSearch() {
    const q = document.getElementById("google-input").value.trim().toLowerCase();
    const res = document.getElementById("google-results");
    if (!q) { res.innerHTML = ""; return; }

    const words = q.split(/\s+/).filter(w => w.length > 1);
    let results = googleDB.filter((entry) => words.some((w) => entry.kw.some((k) => k.includes(w) || w.includes(k))));
    const seen = new Set();
    results = results.filter((r) => { if (seen.has(r.title)) return false; seen.add(r.title); return true; });

    if (results.length === 0) {
        res.innerHTML = `<div class="g-no-results">Aucun resultat pour "<b>${q}</b>".<br><br><span style="color:#888">Essayez:</span><br>- <b>Zoé Rouleau</b><br>- <b>Geore2004</b><br>- <b>SewingTags.fr</b><br>- <b>Audi TT</b><br>- <b>CTF OSINT Zoé Rouleau</b></div>`;
        return;
    }

    let html = `<div style="color:#70757a;font-size:13px;margin-bottom:16px;">Environ ${results.length * 123000} resultats (${(Math.random()*0.5+0.2).toFixed(2)} secondes)</div>`;
    results.forEach((r) => {
        html += `<div class="g-result"><div class="g-result-url">${r.url}</div><a class="g-result-title" href="#">${r.title}</a><div class="g-result-snippet">${r.snippet}</div></div>`;
    });
    res.innerHTML = html;

    // Bind click handlers on all osint-word elements
    res.querySelectorAll(".osint-word").forEach(w => w.addEventListener("click", handleWordClick));
}

// ── APP LAUNCHER ──
function openApp(app) {
    switch (app) {
        case "browser": openGoogle(); break;
        case "terminal": openTerminal(); break;
        case "notes": makeWin("Notes", `<div class="text-view"><span style="color:#89b4fa">=== NOTES D'ENQUETE ===</span>

Cible: <b>Zoé Rouleau</b>
Adresse: 9, rue de l'Aigle, 93210 La Plaine-Saint-Denis

<span style="color:#f9e2af">Utilisez Google pour en savoir plus!</span></div>`, 520, 380); break;
        case "dossier": makeWin("Dossier Suspect", `<div class="text-view"><span style="color:#89b4fa">╔══════════════════════════════════╗</span>
<span style="color:#89b4fa">║       DOSSIER SUSPECT            ║</span>
<span style="color:#89b4fa">╚══════════════════════════════════╝</span>

Nom: <b>Zoé Rouleau</b>
Adresse: <b>9, rue de l'Aigle, 93210 La Plaine-Saint-Denis</b>

<span style="color:#f9e2af">Utilisez Google pour trouver le reste!</span></div>`, 520, 380); break;
    }
}

// ── DESKTOP EVENTS ──
document.querySelectorAll("[data-app]").forEach((el) => {
    el.addEventListener("dblclick", () => openApp(el.dataset.app));
    el.addEventListener("click", () => { if (el.dataset.app === "browser") openApp("browser"); });
});

const dt = document.getElementById("desktop");
dt.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const m = document.getElementById("context-menu");
    m.style.display = "block";
    m.style.left = e.clientX + "px";
    m.style.top = e.clientY + "px";
});
document.addEventListener("click", () => (document.getElementById("context-menu").style.display = "none"));
document.querySelectorAll(".ctx-item").forEach((i) => {
    i.addEventListener("click", () => {
        if (i.dataset.action === "browser") openGoogle();
        if (i.dataset.action === "terminal") openTerminal();
    });
});

// ── NOTIFICATIONS ──
function notify(msg, cls) {
    const c = document.getElementById("notifications");
    const n = document.createElement("div");
    n.className = "notif" + (cls ? " " + cls : "");
    n.textContent = msg;
    c.appendChild(n);
    setTimeout(() => {
        n.style.transition = "opacity 0.3s";
        n.style.opacity = "0";
        setTimeout(() => n.remove(), 300);
    }, 3000);
}

console.log("OSINT CTF loaded — Score Mode");
