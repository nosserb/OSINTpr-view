// =====================================================
//  OSINT CTF — Enquete Numerique (3e) — HARD MODE
//  Identite: Zoé Rouleau
// =====================================================

// ── FAKE IDENTITY (from identité.txt) ──
const SUSPECT = {
    nom: "Zoé Rouleau",
    prenom: "Zoé",
    nom_famille: "Rouleau",
    nom_jeune_fille_mere: "Larocque",
    age: 22,
    date_naissance: "25 janvier 2004",
    signe_zodiaque: "Verseau",
    adresse: "9, rue de l'Aigle",
    code_postal: "93210",
    ville: "La Plaine-Saint-Denis",
    pays: "France",
    telephone: "01.66.22.76.72",
    email: "ZoeRouleau@jourrapide.com",
    pseudo: "Geore2004",
    mot_de_passe: "Ohvaes4ipah",
    site_web: "SewingTags.fr",
    metier: "Dental ceramist (Céramicienne dentaire)",
    entreprise: "Laura Ashley",
    taille: "166 cm",
    poids: "51.5 kg",
    groupe_sanguin: "A+",
    couleur_preferee: "Vert",
    vehicule: "2012 Audi TT",
    visa: "4485 9599 6861 8473",
    gps: "48.960522, 2.432508",
};

// ── MASSIVE FAKE GOOGLE DATABASE ──
const googleDB = [
    // ── Name searches ──
    { kw: ["zoe", "rouleau"], title: "Zoé Rouleau — Profil professionnel", url: "linkedin.com/in/zoe-rouleau", snippet: `<b>Zoé Rouleau</b> — Céramicienne dentaire chez <b>Laura Ashley</b>. Localisation: <b>La Plaine-Saint-Denis (93)</b>. Diplômée en techniques dentaires. 22 ans.` },
    { kw: ["zoe", "rouleau", "linkedin"], title: "Zoé Rouleau — LinkedIn", url: "linkedin.com/in/zoe-rouleau-dental", snippet: `<b>Zoé Rouleau</b> — Dental Ceramist at Laura Ashley. La Plaine-Saint-Denis, France. Education: Institut Dentaire de Paris.` },
    { kw: ["zoe", "rouleau", "saint-denis"], title: "Zoé Rouleau — La Plaine-Saint-Denis", url: "pagesjaunes.fr/zoe-rouleau-saint-denis", snippet: `<b>Zoé Rouleau</b>, 22 ans. Adresse: <b>9, rue de l'Aigle, 93210 La Plaine-Saint-Denis</b>. Telephone: <b>01.66.22.76.72</b>. Email: <b>ZoeRouleau@jourrapide.com</b>.` },

    // ── Username searches ──
    { kw: ["geore2004", "twitter"], title: "@Geore2004 — Twitter / X", url: "x.com/Geore2004", snippet: `<b>@Geore2004</b> — "Zoé, 22 ans | La Plaine-Saint-Denis | Passionnée de géologie et de couture | Vert 💚 | Audi TT owner 🚗" — 487 abonnés.` },
    { kw: ["geore2004", "instagram"], title: "@Geore2004 — Instagram", url: "instagram.com/geore2004", snippet: `<b>@Geore2004</b> — 1 203 abonnes. Bio: "Zoé 💚 | 93 | Dental ceramist | SewingTags.fr | Vert est ma couleur préférée" — 89 publications.` },
    { kw: ["geore2004", "github"], title: "Geore2004 — GitHub", url: "github.com/Geore2004", snippet: `<b>Geore2004</b> has 7 repositories. Top languages: Python, HTML. Bio: "Zoé Rouleau — La Plaine-Saint-Denis. Geology & sewing."` },
    { kw: ["geore2004"], title: "Geore2004 — Recherche multi-plateformes", url: "namechk.com/Geore2004", snippet: `Pseudonyme <b>Geore2004</b> trouve sur: Twitter (@Geore2004), Instagram (@Geore2004), GitHub (Geore2004). Utilise par <b>Zoé Rouleau</b>.` },

    // ── Email searches ──
    { kw: ["zoerouleau", "jourrapide"], title: "ZoeRouleau@jourrapide.com — Email", url: "haveibeenpwned.com/ZoeRouleau@jourrapide.com", snippet: `Adresse email: <b>ZoeRouleau@jourrapide.com</b>. Detectee dans 2 fuites de donnees. Derniere fuite: mars 2024. Associee a <b>Zoé Rouleau</b>.` },
    { kw: ["zoerouleau", "jourrapide", "email"], title: "ZoeRouleau@jourrapide.com — Profil", url: "emailrep.io/ZoeRouleau@jourrapide.com", snippet: `Email: <b>ZoeRouleau@jourrapide.com</b>. Nom: <b>Zoé Rouleau</b>. Localisation: La Plaine-Saint-Denis, France. Compte actif depuis 2022.` },

    // ── Site web ──
    { kw: ["sewingtags", "fr"], title: "SewingTags.fr — Site de Zoé Rouleau", url: "sewingtags.fr", snippet: `<b>SewingTags.fr</b> — Blog de couture et étiquettes personnalisées. Créé par <b>Zoé Rouleau</b>, 22 ans, basée à <b>La Plaine-Saint-Denis</b>. Passion: couture, géologie, voitures.` },
    { kw: ["sewingtags", "zoe"], title: "SewingTags.fr — A propos", url: "sewingtags.fr/a-propos", snippet: `"Je suis <b>Zoé Rouleau</b>, 22 ans, basée à <b>La Plaine-Saint-Denis (93)</b>. Je travaille comme céramicienne dentaire chez <b>Laura Ashley</b>. Ma couleur préférée: <b>vert</b>. Je conduis une <b>Audi TT</b>."` },

    // ── Voiture ──
    { kw: ["zoe", "rouleau", "audi", "tt"], title: "Zoé Rouleau — Audi TT 2012", url: "cartegrise.com/zoe-rouleau", snippet: `Vehicule: <b>Audi TT 2012</b>. Proprietaire: <b>Zoé Rouleau</b>, nee le 25/01/2004 a Paris. Adresse: 9, rue de l'Aigle, 93210 La Plaine-Saint-Denis.` },
    { kw: ["audi", "tt", "2012", "zoe"], title: "Audi TT 2012 — Propriétaire identifié", url: "infoplaque.fr/audi-tt-zoe-rouleau", snippet: `Voiture: <b>Audi TT grise, 2012</b>. Proprietaire: <b>Zoé Rouleau</b>. Adresse: La Plaine-Saint-Denis. Assurance: AXA.` },

    // ── Adresse ──
    { kw: ["rue", "aigle", "saint-denis", "93210"], title: "9, rue de l'Aigle — La Plaine-Saint-Denis", url: "google-maps.fr/9-rue-aigle-93210", snippet: `Adresse: <b>9, rue de l'Aigle, 93210 La Plaine-Saint-Denis</b>. GPS: <b>48.960522, 2.432508</b>. Quartier résidentiel, proche du Stade de France.` },
    { kw: ["93210", "saint-denis", "code", "postal"], title: "93210 — La Plaine-Saint-Denis", url: "annuaire-ville.fr/93210", snippet: `Code postal <b>93210</b> — <b>La Plaine-Saint-Denis</b>, Seine-Saint-Denis (93). Habitants notables: <b>Zoé Rouleau</b>, 22 ans, rue de l'Aigle.` },

    // ── Entreprise ──
    { kw: ["laura", "ashley", "dental", "ceramist"], title: "Laura Ashley — Équipe dentaire", url: "laura-ashley-dental.fr/equipe", snippet: `Equipe <b>Laura Ashley Dental</b>. Membre: <b>Zoé Rouleau</b>, Céramicienne dentaire. Localisation: Paris / La Plaine-Saint-Denis.` },
    { kw: ["zoe", "rouleau", "laura", "ashley"], title: "Zoé Rouleau — Laura Ashley", url: "laura-ashley-dental.fr/zoe-rouleau", snippet: `<b>Zoé Rouleau</b> — Céramicienne dentaire chez Laura Ashley. Specialites: couronnes, bridges, protheses dentaires. Basee a <b>La Plaine-Saint-Denis</b>.` },

    // ── Telephone ──
    { kw: ["01", "66", "22", "76", "72"], title: "01.66.22.76.72 — Numero de telephone", url: "pagesjaunes.fr/01-66-22-76-72", snippet: `Numero: <b>01.66.22.76.72</b>. Nom: <b>Zoé Rouleau</b>. Localisation: <b>La Plaine-Saint-Denis (93)</b>. Categorie: Personnel.` },

    // ── Naissance / Age ──
    { kw: ["zoe", "rouleau", "naissance", "2004"], title: "Zoé Rouleau — État civil", url: "annuaire-ville.fr/zoe-rouleau", snippet: `<b>Zoé Rouleau</b>, née le <b>25 janvier 2004</b> à Paris. Age: <b>22 ans</b>. Signe: <b>Verseau</b>. Nationalité: française.` },
    { kw: ["zoe", "rouleau", "25", "janvier"], title: "Zoé Rouleau — Date de naissance", url: "publicrecords.fr/zoe-rouleau-2004", snippet: `Nom: <b>Zoé Rouleau</b>. Date de naissance: <b>25/01/2004</b>. Lieu: Paris, France. Age: 22 ans. Signe astrologique: <b>Verseau</b>.` },

    // ── Groupe sanguin / physique ──
    { kw: ["zoe", "rouleau", "sang", "groupe"], title: "Zoé Rouleau — Groupe sanguin", url: "dossiermedical.fr/zoe-rouleau", snippet: `<b>Zoé Rouleau</b> — Groupe sanguin: <b>A+</b>. Taille: 166 cm. Poids: 51.5 kg. Données médicales enregistrées à La Plaine-Saint-Denis.` },

    // ── Mot de passe / Securite ──
    { kw: ["ohvaes4ipah", "password"], title: "Fuite de données — Mot de passe compromis", url: "haveibeenpwned.com/passwords/ohvaes4ipah", snippet: `Le mot de passe <b>ohvaes4ipah</b> a ete trouve dans 3 fuites de donnees. Associe a l'email: <b>ZoeRouleau@jourrapide.com</b>. Risque: ÉLEVÉ.` },

    // ── Visa ──
    { kw: ["4485", "9599", "visa", "carte"], title: "Carte Visa — 4485 9599 6861 8473", url: "banque-france.fr/4485-9599", snippet: `Carte Visa securisee. Proprietaire: <b>Zoé Rouleau</b>. Date d'expiration: <b>10/2028</b>. Adresse de facturation: 9, rue de l'Aigle, 93210 La Plaine-Saint-Denis.` },

    // ── Tracking ──
    { kw: ["1z", "670", "ups", "colis"], title: "UPS — Suivi de colis 1Z 670 4A5 05 4819 435 1", url: "ups.com/tracking/1Z6704A50548194351", snippet: `Colis UPS en cours de livraison. Destinataire: <b>Zoé Rouleau</b>. Adresse: 9, rue de l'Aigle, 93210 La Plaine-Saint-Denis. Statut: Livré.` },
    { kw: ["western", "union", "9772688327"], title: "Western Union — Transfert 9772688327", url: "westernunion.fr/9772688327", snippet: `Transfert Western Union. MTCN: <b>9772688327</b>. Expediteur: <b>Zoé Rouleau</b>. Montant: 150 EUR. Destinataire: M. Larocque (famille).` },

    // ── GPS ──
    { kw: ["48.960522", "2.432508"], title: "Coordonnées GPS — 48.960522, 2.432508", url: "google-maps.fr/48.960522-2.432508", snippet: `Position GPS: <b>48.960522, 2.432508</b>. Adresse: <b>9, rue de l'Aigle, La Plaine-Saint-Denis</b>. Zone: Résidentielle, proche du Stade de France.` },

    // ── Zodiac ──
    { kw: ["zoe", "rouleau", "verseau", "zodiaque"], title: "Zoé Rouleau — Signe astrologique: Verseau", url: "horoscope.fr/zoe-rouleau", snippet: `<b>Zoé Rouleau</b>, née le 25 janvier 2004 — Signe: <b>Verseau</b> ♒. Couleur chanceuse: <b>Vert</b>. Nombre chanceux: 7.` },

    // ── Nom de jeune fille de la mère ──
    { kw: ["larocque", "rouleau", "mere"], title: "Famille Rouleau — Nom de jeune fille de la mère: Larocque", url: "genealogie.fr/rouleau-larocque", snippet: `Famille <b>Rouleau</b>. Mère de <b>Zoé Rouleau</b>: née <b>Larocque</b>. Adresse familiale: La Plaine-Saint-Denis.` },

    // ── User agent / Navigateur ──
    { kw: ["chrome", "74", "mac", "osx"], title: "Navigateur detecté — Chrome 74 sur Mac OS X", url: "whatismybrowser.com/tech/chrome-74", snippet: `User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36. Navigateur: <b>Chrome 74.0.3729.157</b> sur <b>Mac OS X</b>. Appareil: Mac.` },

    // ── GUID ──
    { kw: ["d4f359ff", "guid"], title: "GUID: d4f359ff-aa51-47cb-b920-93ce2d8178f5", url: "tracking.fr/d4f359ff", snippet: `Identifiant unique (GUID): <b>d4f359ff-aa51-47cb-b920-93ce2d8178f5</b>. Associe au compte: <b>Zoé Rouleau</b>. Cree le 25/01/2004.` },

    // ── Bonus: Flag ──
    { kw: ["osint", "flag", "ctf", "zoe"], title: "CTF OSINT — Challenge: Zoé Rouleau", url: "ctf-challenges.fr/osint/zoe-rouleau", snippet: `<span style="color:#e95420;font-weight:bold;">OSINT{zoe_rouleau_93210_verseau_2012}</span> — Challenge OSINT résolu. Identité confirmée: Zoé Rouleau, 22 ans, La Plaine-Saint-Denis, céramicienne dentaire.` },
    { kw: ["ctf", "flag", "rouleau"], title: "Flag OSINT — Zoé Rouleau", url: "ctf-challenges.fr/flags/zoe-rouleau", snippet: `<span style="color:#e95420;font-weight:bold;">OSINT{zoe_rouleau_93210_verseau_2012}</span> — Bravo! Vous avez retrouvé l'identité complète de la cible.` },
];

// ── BOOT SEQUENCE ──
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
    "[    0.300] Chargement des outils de reconnaissance:",
    "[    0.301]   -> theHarvester .............. OK",
    "[    0.302]   -> Sherlock .................. OK",
    "[    0.303]   -> Maltego ................... OK",
    "[    0.304]   -> SpiderFoot ............... OK",
    "[    0.305]   -> Google Dorks ............. OK",
    "[    0.400] Reseau: eth0 — 192.168.1.47/24",
    "[    0.500] Connexion: securisee (VPN actif)",
    "[    0.600] Base de donnees d'enquete: connectee",
    "[    0.700] 47 cibles dans la base active",
    "[    0.800] Vault a flags: verrouille",
    "[    0.900] Systeme pret.",
    "",
    "  ╔══════════════════════════════════════════════╗",
    "  ║       SYSTEME D'ENQUETE OSINT v4.2          ║",
    "  ║       Mission: Retrouver la cible            ║",
    "  ║       Niveau: DEBUTANT                       ║",
    "  ╚══════════════════════════════════════════════╝",
    "",
    "  Agent, prenez connaissance du briefing...",
    "  Utilisez Google pour retrouver l'identite.",
    "",
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
            setTimeout(() => notify("Mission chargee. Lisez le fichier d'identite puis utilisez Google.", 7000), 1000);
            setTimeout(() => notify("Indice: tapez 'guide' dans le terminal pour un pas-a-pas.", 6000), 3500);
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
    d.innerHTML = `
        <div class="window-header">
            <div class="window-controls">
                <button class="window-btn btn-minimize"></button>
                <button class="window-btn btn-maximize"></button>
                <button class="window-btn btn-close"></button>
            </div>
            <span class="window-title">${title}</span>
        </div>
        <div class="window-body">${body}</div>`;
    document.getElementById("windows-container").appendChild(d);
    const hdr = d.querySelector(".window-header");
    let drag = false, ox, oy;
    hdr.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("window-btn")) return;
        drag = true; ox = e.clientX - d.offsetLeft; oy = e.clientY - d.offsetTop;
        d.style.zIndex = ++wZ;
    });
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
<div class="term-line" style="color:#89b4fa">║    Niveau agent: DEBUTANT                    ║</div>
<div class="term-line" style="color:#89b4fa">╚══════════════════════════════════════════════╝</div>
<div class="term-line"></div>
<div class="term-line">Tapez <b style="color:#f9e2af">'help'</b> pour voir les commandes.</div>
<div class="term-line">Ou tapez <b style="color:#f9e2af">'guide'</b> pour un pas-a-pas.</div>
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
            if (out !== null) {
                const ol = document.createElement("div");
                ol.className = "term-line";
                ol.innerHTML = out;
                tBody.insertBefore(ol, tBody.lastElementChild);
            }
            inp.value = "";
            tBody.scrollTop = tBody.scrollHeight;
        }
    });
    tBody.addEventListener("click", () => inp.focus());
}

function runCmd(c) {
    const m = {
        "help": `Commandes disponibles:
  <span style="color:#f9e2af">ls</span>                   — Lister les fichiers
  <span style="color:#f9e2af">cat &lt;fichier&gt;</span>        — Lire un fichier
  <span style="color:#f9e2af">whoami</span>               — Qui suis-je?
  <span style="color:#f9e2af">pwd</span>                  — Repertoire courant
  <span style="color:#f9e2af">date</span>                 — Date et heure
  <span style="color:#f9e2af">clear</span>                — Vider le terminal
  <span style="color:#f9e2af">google</span>               — Ouvrir Google (recherche web)
  <span style="color:#f9e2af">guide</span>                — Guide pas-a-pas pour debutants
  <span style="color:#f9e2af">nmap 192.168.1.0/24</span> — Scanner le reseau
  <span style="color:#f9e2af">theharvester &lt;nom&gt;</span>  — Outil OSINT (emails)
  <span style="color:#f9e2af">sherlock &lt;pseudo&gt;</span>   — Chercher un pseudo en ligne
  <span style="color:#f9e2af">exif &lt;image&gt;</span>        — Lire les metadata d'une photo`,

        "guide": `<span style="color:#89b4fa">╔══════════════════════════════════════════════╗</span>
<span style="color:#89b4fa">║     GUIDE PAS-A-PAS — DEBUTANT OSINT          ║</span>
<span style="color:#89b4fa">╚══════════════════════════════════════════════╝</span>

<span style="color:#f9e2af">ETAPE 1 — Lire le fichier d'identite:</span>
  Tapez: <b>cat identite.txt</b>
  -> Vous verrez toutes les infos de la cible

<span style="color:#f9e2af">ETAPE 2 — Ouvrir Google:</span>
  Tapez: <b>google</b>
  -> Une page de recherche s'ouvre

<span style="color:#f9e2af">ETAPE 3 — Chercher la cible:</span>
  Dans Google, essayez ces recherches:
  - <b>Zoé Rouleau</b> (le nom complet)
  - <b>@Geore2004</b> (le pseudo)
  - <b>ZoeRouleau@jourrapide.com</b> (l'email)
  - <b>SewingTags.fr</b> (le site web)
  - <b>Laura Ashley dental</b> (l'entreprise)
  - <b>Audi TT 2012</b> (la voiture)

<span style="color:#f9e2af">ETAPE 4 — Utiliser les outils OSINT:</span>
  <b>theharvester Zoé Rouleau</b>  -> emails
  <b>sherlock Geore2004</b>          -> pseudos
  <b>exif photo.jpg</b>             -> metadata photo

<span style="color:#f9e2af">ETAPE 5 — Trouver le flag:</span>
  Le flag se cache dans un resultat Google!
  Cherchez: <b>CTF OSINT Zoé Rouleau</b>

<span style="color:#f38ba8">Bonne chance, agent!</span>`,

        "ls": `identite.txt   briefing.txt   notes.txt   photo.jpg`,
        "whoami": "detective_osint",
        "pwd": "/home/detective",
        "date": new Date().toString(),
        "clear": "__CLEAR__",

        "cat identite.txt": `<span style="color:#f9e2af">╔══════════════════════════════════════════════╗</span>
<span style="color:#f9e2af">║       FICHIER D'IDENTITE — CIBLE              ║</span>
<span style="color:#f9e2af">╚══════════════════════════════════════════════╝</span>

<span style="color:#89b4fa">Nom:</b> Zoé Rouleau
<span style="color:#89b4fa">Adresse:</b> 9, rue de l'Aigle, 93210 La Plaine-Saint-Denis
<span style="color:#89b4fa">Nom de jeune fille de la mère:</b> Larocque
<span style="color:#89b4fa">NIRPP:</b> 2040193756144 90
<span style="color:#89b4fa">GPS:</b> 48.960522, 2.432508

<span style="color:#89b4fa">Telephone:</b> 01.66.22.76.72
<span style="color:#89b4fa">Date de naissance:</b> January 25, 2004
<span style="color:#89b4fa">Age:</b> 22 ans
<span style="color:#89b4fa">Signe:</b> Verseau

<span style="color:#89b4fa">Email:</b> ZoeRouleau@jourrapide.com
<span style="color:#89b4fa">Pseudo:</b> Geore2004
<span style="color:#89b4fa">Mot de passe:</b> Ohvaes4ipah
<span style="color:#89b4fa">Site web:</b> SewingTags.fr

<span style="color:#89b4fa">Visa:</b> 4485 9599 6861 8473
<span style="color:#89b4fa">Expire:</b> 10/2028
<span style="color:#89b4fa">CVV2:</b> 232

<span style="color:#89b4fa">Entreprise:</b> Laura Ashley
<span style="color:#89b4fa">Metier:</b> Dental ceramist

<span style="color:#89b4fa">Taille:</b> 166 cm
<span style="color:#89b4fa">Poids:</b> 51.5 kg
<span style="color:#89b4fa">Groupe sanguin:</b> A+

<span style="color:#89b4fa">Couleur preferee:</b> Vert
<span style="color:#89b4fa">Vehicule:</b> 2012 Audi TT

<span style="color:#f38ba8">Utilisez Google pour retrouver plus d'infos!</span>
Tapez: <b>google</b>`,

        "cat briefing.txt": `<span style="color:#89b4fa">╔══════════════════════════════════════════════╗</span>
<span style="color:#89b4fa">║              MISSION BRIEFING                 ║</span>
<span style="color:#89b4fa">╚══════════════════════════════════════════════╝</span>

Agent,

Nous avons intercepte un fichier d'identite
concernant une cible: <b>Zoé Rouleau</b>.

Ce fichier contient beaucoup d'informations.
Votre mission: <b>confirmer ces donnees via Google</b>

<span style="color:#f9e2af">ETAPES:</span>
1. Lisez le fichier: <b>cat identite.txt</b>
2. Ouvrez Google: <b>google</b>
3. Cherchez: <b>Zoé Rouleau</b>
4. Verifiez: email, pseudo, metier, voiture...
5. Trouvez le <b>flag</b> dans les resultats!

<span style="color:#f9e2af">OUTILS:</span>
- <b>google</b> : recherche web simulee
- <b>theharvester Zoé Rouleau</b> : emails
- <b>sherlock Geore2004</b> : pseudos
- <b>exif photo.jpg</b> : metadata image

<span style="color:#f38ba8">Le flag se trouve dans les resultats Google.</span>

Bonne enquete, agent!`,

        "cat notes.txt": `<span style="color:#89b4fa">=== NOTES D'ENQUETE ===</span>

Cible identifiee: <b>Zoé Rouleau</b>
Adresse: 9, rue de l'Aigle, 93210 La Plaine-Saint-Denis
Pseudo: <b>Geore2004</b>
Email: <b>ZoeRouleau@jourrapide.com</b>

Elle travaille chez <b>Laura Ashley</b> comme
céramicienne dentaire.

Elle conduit une <b>Audi TT 2012</b>.

Sa couleur préférée est le <b>vert</b>.

<span style="color:#f9e2af">Indice: cherchez le pseudo Geore2004 sur
differentes plateformes.</span>`,

        "nmap 192.168.1.0/24": `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for 192.168.1.0/24
HOST           PORT     STATE  SERVICE
192.168.1.1    80/tcp   open   http    (Routeur)
192.168.1.42   22/tcp   open   ssh     (Recon-station)
192.168.1.42   80/tcp   open   http    (Web server)
192.168.1.42   443/tcp  open   https
192.168.1.100  3306/tcp open   mysql   (Base de donnees)`,

        "theharvester zoe rouleau": `TheHarvester v3.2 — OSINT Email Collector
Searching for: Zoé Rouleau
Domain: gmail.com
----------------------
Found: <b>ZoeRouleau@jourrapide.com</b>
Found: z.rouleau@laura-ashley.fr (pro)
Results: 2 emails found`,

        "sherlock geore2004": `Sherlock — Search username across platforms
Username: Geore2004
---------------------------------------
[+] Twitter/X: x.com/Geore2004
[+] Instagram: instagram.com/geore2004
[+] GitHub: github.com/Geore2004
[+] Facebook: PAS TROUVE
Result: 3/4 plateformes trouvees`,

        "exif photo.jpg": `<span style="color:#f9e2af">=== EXIF METADATA — photo.jpg ===</span>
Fichier: photo.jpg
Taille: 2.1 Mo
Date: 14/01/2024 14:22:33
Camera: iPhone 13
<span style="color:#f9e2af">GPS Latitude: 48.960522 N</span>
<span style="color:#f9e2af">GPS Longitude: 2.432508 E</span>
<span style="color:#f9e2af">Lieu: 9, rue de l'Aigle, La Plaine-Saint-Denis</span>
Artist: <b>Zoé Rouleau</b>
Copyright: <b>ZoeRouleau@jourrapide.com</b>`,

        "cat photo.jpg": "Fichier binaire. Utilisez: <b>exif photo.jpg</b>",
    };

    if (c === "") return null;
    if (m[c]) return m[c];
    if (c.startsWith("sherlock ")) return `<span style="color:#f38ba8">Utilisez le pseudo du fichier: sherlock Geore2004</span>`;
    if (c.startsWith("theharvester ")) return `<span style="color:#f38ba8">Utilisez le nom de la cible: theharvester Zoé Rouleau</span>`;
    if (c.startsWith("nmap")) return `<span style="color:#f38ba8">Syntaxe: nmap 192.168.1.0/24</span>`;
    if (c.startsWith("exif")) return `<span style="color:#f38ba8">Syntaxe: exif photo.jpg</span>`;
    if (c === "cat identite") return m["cat identite.txt"];
    return `<span style="color:#f38ba8">bash: ${c}: commande inconnue. Tapez 'help'.</span>`;
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
document.getElementById("google-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") doSearch();
});

function doSearch() {
    const q = document.getElementById("google-input").value.trim().toLowerCase();
    const res = document.getElementById("google-results");

    if (!q) { res.innerHTML = ""; return; }

    const words = q.split(/\s+/).filter(w => w.length > 1);
    let results = googleDB.filter((entry) =>
        words.some((w) => entry.kw.some((k) => k.includes(w) || w.includes(k)))
    );

    const seen = new Set();
    results = results.filter((r) => {
        if (seen.has(r.title)) return false;
        seen.add(r.title);
        return true;
    });

    if (results.length === 0) {
        res.innerHTML = `
            <div class="g-no-results">
                Aucun resultat pour "<b>${q}</b>".<br><br>
                <span style="color:#888">Conseils:</span><br>
                - Essayez: <b>Zoé Rouleau</b><br>
                - Essayez: <b>Geore2004</b><br>
                - Essayez: <b>ZoeRouleau@jourrapide.com</b><br>
                - Essayez: <b>SewingTags.fr</b><br>
                - Essayez: <b>Laura Ashley dental</b><br>
                - Essayez: <b>Audi TT 2012</b><br>
                - Essayez: <b>CTF OSINT Zoé Rouleau</b> (pour le flag!)<br>
            </div>`;
        return;
    }

    let html = `<div style="color:#70757a;font-size:13px;margin-bottom:16px;">Environ ${results.length * 123000} resultats (${(Math.random()*0.5+0.2).toFixed(2)} secondes)</div>`;
    results.forEach((r) => {
        html += `
        <div class="g-result">
            <div class="g-result-url">${r.url}</div>
            <a class="g-result-title" href="#">${r.title}</a>
            <div class="g-result-snippet">${r.snippet}</div>
        </div>`;
    });

    res.innerHTML = html;
}

// ── APP LAUNCHER ──
function openApp(app) {
    switch (app) {
        case "browser": openGoogle(); break;
        case "terminal": openTerminal(); break;
        case "files": makeWin("Fichiers", `<div class="text-view">identite.txt
briefing.txt
notes.txt
photo.jpg</div>`, 360, 260); break;
        case "notes": makeWin("Notes", `<div class="text-view"><span style="color:#89b4fa">=== NOTES D'ENQUETE ===</span>

Cible: <b>Zoé Rouleau</b>
Adresse: 9, rue de l'Aigle, 93210 La Plaine-Saint-Denis
Pseudo: <b>Geore2004</b>
Email: <b>ZoeRouleau@jourrapide.com</b>

Elle travaille chez <b>Laura Ashley</b>.
Elle conduit une <b>Audi TT 2012</b>.
Sa couleur preferee: <b>vert</b>.

<span style="color:#f9e2af">Utilisez Google pour confirmer!</span></div>`, 520, 380); break;
        case "dossier": makeWin("Dossier Suspect", `<div class="text-view"><span style="color:#89b4fa">╔══════════════════════════════════╗</span>
<span style="color:#89b4fa">║       DOSSIER SUSPECT            ║</span>
<span style="color:#89b4fa">╚══════════════════════════════════╝</span>

Nom: <b>Zoé Rouleau</b>
Adresse: <b>9, rue de l'Aigle, 93210 La Plaine-Saint-Denis</b>
Pseudo: <b>Geore2004</b>
Email: <b>ZoeRouleau@jourrapide.com</b>

<span style="color:#f9e2af">Utilisez Google pour retrouver plus d'infos!</span></div>`, 520, 380); break;
    }
}

// ── DESKTOP EVENTS ──
document.querySelectorAll("[data-app]").forEach((el) => {
    el.addEventListener("dblclick", () => openApp(el.dataset.app));
    el.addEventListener("click", () => {
        if (el.dataset.app === "browser") openApp("browser");
    });
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
function notify(msg, dur) {
    const c = document.getElementById("notifications");
    const n = document.createElement("div");
    n.className = "notif";
    n.textContent = msg;
    c.appendChild(n);
    setTimeout(() => {
        n.style.transition = "opacity 0.3s";
        n.style.opacity = "0";
        setTimeout(() => n.remove(), 300);
    }, dur || 4000);
}

console.log("OSINT CTF loaded — Zoé Rouleau Edition");
