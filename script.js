// =====================================================
//  OSINT CTF — Enquete Numerique (3e) — HARD MODE
//  Cible: Zoé Rouleau — Les eleves doivent TROUVER les infos via Google
// =====================================================

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
    "[    0.700] 1 cible identifiee — en attente",
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
            setTimeout(() => notify("Mission chargee. Un fichier d'identite partiel a ete intercepte.", 7000), 1000);
            setTimeout(() => notify("Ouvrez le Terminal et tapez 'guide' pour commencer.", 6000), 3500);
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
  <span style="color:#f9e2af">guide</span>                — Guide pas-a-pas pour debutants`,

        "guide": `<span style="color:#89b4fa">╔══════════════════════════════════════════════╗</span>
<span style="color:#89b4fa">║     GUIDE PAS-A-PAS — DEBUTANT OSINT          ║</span>
<span style="color:#89b4fa">╚══════════════════════════════════════════════╝</span>

<span style="color:#f9e2af">ETAPE 1 — Lire le fichier intercepte:</span>
  Tapez: <b>cat identite.txt</b>
  -> Vous y trouverez un nom et une adresse

<span style="color:#f9e2af">ETAPE 2 — Ouvrir Google:</span>
  Tapez: <b>google</b>
  -> Une page de recherche s'ouvre

<span style="color:#f9e2af">ETAPE 3 — Chercher la cible sur Google:</span>
  Commencez par: <b>Zoé Rouleau La Plaine-Saint-Denis</span>
  Puis essayez d'autres recherches pour trouver:
    - Son email
    - Son pseudo / comptes reseaux
    - Son metier
    - Sa voiture
    - Ses centres d'interet
    - Sa photo
    - Le flag!

<span style="color:#f38ba8">Chaque recherche Google vous donnera des infos
supplementaires. Explorez tout!</span>

<span style="color:#f9e2af">CONSEIL:</span>
  Plus vous cherchez, plus vous en apprenez.
  Le flag se cache dans un des resultats Google.`,

        "ls": `identite.txt   briefing.txt   notes.txt   photo.jpg`,
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

<span style="color:#89b4fa">Nom de jeune fille de la mere:</b> Larocque

<span style="color:#89b4fa">Telephone:</b> 01.66.22.76.72

<span style="color:#f38ba8">⚠ Ce fichier est PARTIEL.</span>
<span style="color:#f38ba8">Beaucoup d'infos manquent!</span>

<span style="color:#f9e2af">Utilisez Google pour trouver:</span>
  - Son email
  - Son pseudo / comptes reseaux
  - Son metier / entreprise
  - Sa voiture
  - Ses centres d'interet
  - Sa date de naissance
  - Et le FLAG!

Tapez: <b>google</b>`,

        "cat briefing.txt": `<span style="color:#89b4fa">╔══════════════════════════════════════════════╗</span>
<span style="color:#89b4fa">║              MISSION BRIEFING                 ║</span>
<span style="color:#89b4fa">╚══════════════════════════════════════════════╝</span>

Agent,

Un fichier d'identite partiel a ete intercepte
concernant une cible: <b>Zoé Rouleau</b>.

Ce fichier contient: nom et adresse.
<b>Le reste est a retrouver via Google.</b>

<span style="color:#f9e2af">VOTRE MISSION:</span>
1. Lisez le fichier: <b>cat identite.txt</b>
2. Ouvrez Google: <b>google</b>
3. Cherchez: <b>Zoé Rouleau</b>
4. Explorez les resultats
5. Trouvez le <b>FLAG</b>

<span style="color:#f9e2af">CE QUE VOUS DEVEZ TROUVER:</span>
  - Son email
  - Son pseudo / comptes reseaux sociaux
  - Son metier et son entreprise
  - Sa voiture (marque et modele)
  - Sa date de naissance
  - Ses centres d'interet
  - Le FLAG (dans un resultat Google)

<span style="color:#f38ba8">Bonne chance, agent!</span>`,

        "cat notes.txt": `<span style="color:#89b4fa">=== NOTES D'ENQUETE ===</span>

Cible: <b>Zoé Rouleau</b>
Adresse: <b>9, rue de l'Aigle, 93210 La Plaine-Saint-Denis</b>

Elle a ete vue dans le quartier des Chartrons
a Bordeaux. Elle conduit une voiture.

<span style="color:#f9e2af">Indice: cherchez le nom de la cible sur Google
pour decouvrir ses comptes reseaux sociaux.</span>`,

        "cat photo.jpg": `<span style="color:#89b4fa">=== EXIF METADATA — photo.jpg ===</span>
Fichier: photo.jpg
Taille: 2.1 Mo
Date: 14/01/2024 14:22:33
Camera: iPhone 13
<span style="color:#f9e2af">GPS Latitude: 48.960522 N</span>
<span style="color:#f9e2af">GPS Longitude: 2.432508 E</span>
<span style="color:#f9e2af">Lieu: 9, rue de l'Aigle, La Plaine-Saint-Denis</span>
<span style="color:#89b4fa">Artist:</b> non renseigne
<span style="color:#89b4fa">Copyright:</b> non renseigne

<span style="color:#f38ba8">Utilisez Google pour trouver qui a pris cette photo!</span>`,
    };

    if (c === "") return null;
    if (m[c]) return m[c];
    return `<span style="color:#f38ba8">bash: ${c}: commande inconnue. Tapez 'help'.</span>`;
}

// ── FAKE GOOGLE DATABASE ──
// Les eleves cherchent, et Google leur renvoie des resultats
// qui revelent des infos PAS dans le fichier identite
const googleDB = [
    // ── Recherche principale: le nom ──
    { kw: ["zoe", "rouleau", "saint-denis"], title: "Zoé Rouleau — La Plaine-Saint-Denis (93)", url: "pagesjaunes.fr/zoe-rouleau-93210", snippet: `<b>Zoé Rouleau</b>, 22 ans. Adresse: <b>9, rue de l'Aigle, 93210 La Plaine-Saint-Denis</b>. Telephone: <b>01.66.22.76.72</b>. Email: <b>ZoeRouleau@jourrapide.com</b>.` },

    // ── Email ──
    { kw: ["zoerouleau", "jourrapide", "mail"], title: "ZoeRouleau@jourrapide.com — Profil", url: "emailrep.io/ZoeRouleau@jourrapide.com", snippet: `Email: <b>ZoeRouleau@jourrapide.com</b>. Proprietaire: <b>Zoé Rouleau</b>. Compte actif. Associe aux comptes: Twitter, Instagram, GitHub.` },
    { kw: ["zoerouleau", "jourrapide"], title: "ZoeRouleau@jourrapide.com — Fuite de donnees", url: "haveibeenpwned.com/ZoeRouleau@jourrapide.com", snippet: `<b>ZoeRouleau@jourrapide.com</b> trouve dans 2 fuites. Derniere fuite: mars 2024. Associe a <b>Zoé Rouleau</b>.` },

    // ── Pseudo: Geore2004 ──
    { kw: ["geore2004", "twitter", "x"], title: "@Geore2004 — Twitter / X", url: "x.com/Geore2004", snippet: `<b>@Geore2004</b> — "Zoé, 22 ans | La Plaine-Saint-Denis | Passionnee de geologie et de couture | Vert | Audi TT" — 487 abonnes. Dernier tweet: "Belle journee a La Plaine! Geologie walk 🌿"` },
    { kw: ["geore2004", "instagram"], title: "@Geore2004 — Instagram", url: "instagram.com/geore2004", snippet: `<b>@Geore2004</b> — 1 203 abonnes. Bio: "Zoé | 93 | Dental ceramist | SewingTags.fr | Vert est ma couleur" — 89 publications. Photos de roches, couture, et La Plaine-Saint-Denis.` },
    { kw: ["geore2004", "github"], title: "Geore2004 — GitHub", url: "github.com/Geore2004", snippet: `<b>Geore2004</b> — 7 repositories. Languages: Python, HTML. Bio: "Zoé Rouleau — La Plaine-Saint-Denis. Geology & sewing."` },
    { kw: ["geore2004"], title: "Geore2004 — Tous les comptes", url: "namechk.com/Geore2004", snippet: `Pseudo <b>Geore2004</b> trouve sur: Twitter (@Geore2004), Instagram (@Geore2004), GitHub (Geore2004). Utilise par <b>Zoé Rouleau</b>.` },

    // ── Metier ──
    { kw: ["zoe", "rouleau", "laura", "ashley", "dental"], title: "Zoé Rouleau — Laura Ashley Dental", url: "laura-ashley-dental.fr/equipe", snippet: `<b>Zoé Rouleau</b> — Céramicienne dentaire chez Laura Ashley. Specialites: couronnes, bridges, protheses. Basee a La Plaine-Saint-Denis.` },
    { kw: ["zoe", "rouleau", "dental", "ceramist"], title: "Zoé Rouleau — Dental Ceramist", url: "linkedin.com/in/zoe-rouleau-dental", snippet: `<b>Zoé Rouleau</b> — Dental Ceramist at Laura Ashley. La Plaine-Saint-Denis. Education: Institut Dentaire de Paris.` },

    // ── Voiture ──
    { kw: ["zoe", "rouleau", "audi", "tt"], title: "Zoé Rouleau — Audi TT 2012", url: "cartegrise.com/zoe-rouleau", snippet: `Vehicule: <b>Audi TT 2012</b>. Proprietaire: <b>Zoé Rouleau</b>. Adresse: 9, rue de l'Aigle, 93210 La Plaine-Saint-Denis.` },

    // ── GPS ──
    { kw: ["48.960522", "2.432508", "gps"], title: "GPS: 48.960522, 2.432508", url: "google-maps.fr/48.960522-2.432508", snippet: `Position: <b>48.960522, 2.432508</b>. Adresse: <b>9, rue de l'Aigle, La Plaine-Saint-Denis</b>. Zone residentielle, proche du Stade de France.` },

    // ── Site web ──
    { kw: ["sewingtags", "fr"], title: "SewingTags.fr — Blog de couture", url: "sewingtags.fr", snippet: `<b>SewingTags.fr</b> — Blog de couture. Cree par <b>Zoé Rouleau</b>, 22 ans, La Plaine-Saint-Denis. Passion: couture, geologie.` },
    { kw: ["sewingtags", "zoe", "a-propos"], title: "SewingTags.fr — A propos", url: "sewingtags.fr/a-propos", snippet: `"Je suis <b>Zoé Rouleau</b>, 22 ans. Céramicienne dentaire chez Laura Ashley. Ma couleur préférée: <b>vert</b>. Je conduis une <b>Audi TT</b>."` },

    // ── Telephone ──
    { kw: ["01", "66", "22", "76", "72"], title: "01.66.22.76.72 — Telephone", url: "pagesjaunes.fr/01-66-22-76-72", snippet: `Numero: <b>01.66.22.76.72</b>. Nom: <b>Zoé Rouleau</b>. La Plaine-Saint-Denis. Categorie: Personnel.` },

    // ── Naissance ──
    { kw: ["zoe", "rouleau", "naissance", "2004", "25", "janvier"], title: "Zoé Rouleau — Date de naissance", url: "annuaire-ville.fr/zoe-rouleau", snippet: `<b>Zoé Rouleau</b>, nee le <b>25 janvier 2004</b> a Paris. Age: <b>22 ans</b>. Signe: <b>Verseau</b>.` },

    // ── Famille ──
    { kw: ["larocque", "rouleau"], title: "Famille Rouleau-Larocque", url: "genealogie.fr/rouleau-larocque", snippet: `Famille <b>Rouleau</b>. Mere de <b>Zoé Rouleau</b>: nee <b>Larocque</b>. Adresse: La Plaine-Saint-Denis.` },

    // ── Naissance / Age ──
    { kw: ["zoe", "rouleau", "25", "janvier", "2004"], title: "Zoé Rouleau — 25 janvier 2004", url: "publicrecords.fr/zoe-rouleau-2004", snippet: `<b>Zoé Rouleau</b>, nee le <b>25/01/2004</b> a Paris. 22 ans. Nationalite: francaise.` },

    // ── Couleur preferee ──
    { kw: ["zoe", "rouleau", "vert", "couleur"], title: "Zoé Rouleau — Couleur preferee: Vert", url: "profil-perso.fr/zoe-rouleau", snippet: `<b>Zoé Rouleau</b> — Couleur preferee: <b>Vert</b>. Signe: Verseau. Signe chinois: Cheval de feu.` },

    // ── Visa ──
    { kw: ["4485", "9599", "visa"], title: "Carte Visa — 4485 9599 6861 8473", url: "banque-france.fr/4485-9599", snippet: `Carte Visa. Proprietaire: <b>Zoé Rouleau</b>. Expiration: <b>10/2028</b>. Adresse: 9, rue de l'Aigle, 93210.` },

    // ── Tracking ──
    { kw: ["1z", "670", "ups", "colis"], title: "UPS — Colis livré", url: "ups.com/tracking/1Z6704A50548194351", snippet: `Colis livré. Destinataire: <b>Zoé Rouleau</b>. Adresse: 9, rue de l'Aigle, 93210 La Plaine-Saint-Denis.` },

    // ── Western Union ──
    { kw: ["western", "union", "9772688327"], title: "Western Union — Transfert", url: "westernunion.fr/9772688327", snippet: `Transfert: MTCN <b>9772688327</b>. Expediteur: <b>Zoé Rouleau</b>. Montant: 150 EUR. Destinataire: M. Larocque.` },

    // ── Zodiac ──
    { kw: ["zoe", "rouleau", "verseau"], title: "Zoé Rouleau — Verseau", url: "horoscope.fr/zoe-rouleau", snippet: `<b>Zoé Rouleau</b> — Verseau. Couleur: <b>Vert</b>. Nombre: 7.` },

    // ── Groupe sanguin ──
    { kw: ["zoe", "rouleau", "sang", "groupe", "a+"], title: "Zoé Rouleau — Groupe sanguin A+", url: "dossiermedical.fr/zoe-rouleau", snippet: `<b>Zoé Rouleau</b> — Groupe: <b>A+</b>. Taille: 166 cm. Poids: 51.5 kg.` },

    // ── Mot de passe ──
    { kw: ["ohvaes4ipah"], title: "Fuite — Mot de passe", url: "haveibeenpwned.com/passwords/ohvaes4ipah", snippet: `Mot de passe <b>ohvaes4ipah</b> trouvable dans 3 fuites. Associe a: <b>ZoeRouleau@jourrapide.com</b>.` },

    // ── GUID ──
    { kw: ["d4f359ff", "guid"], title: "GUID: d4f359ff-aa51-47cb", url: "tracking.fr/d4f359ff", snippet: `GUID: <b>d4f359ff-aa51-47cb-b920-93ce2d8178f5</b>. Associe a: <b>Zoé Rouleau</b>.` },

    // ── FLAG ──
    { kw: ["ctf", "osint", "flag", "zoe", "rouleau"], title: "CTF OSINT — Challenge Zoé Rouleau", url: "ctf-challenges.fr/osint/zoe-rouleau", snippet: `<span style="color:#e95420;font-weight:bold;">OSINT{zoe_rouleau_93210_verseau_vert_audi}</span> — Challenge resolu! Identite confirmee: Zoé Rouleau, 22 ans, La Plaine-Saint-Denis, Verseau, vert, Audi TT.` },
    { kw: ["ctf", "flag", "rouleau"], title: "Flag OSINT — Zoé Rouleau", url: "ctf-challenges.fr/flags/zoe-rouleau", snippet: `<span style="color:#e95420;font-weight:bold;">OSINT{zoe_rouleau_93210_verseau_vert_audi}</span> — Bravo agent!` },
];

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
                <span style="color:#888">Essayez:</span><br>
                - <b>Zoé Rouleau</b><br>
                - <b>Geore2004</b><br>
                - <b>ZoeRouleau@jourrapide.com</b><br>
                - <b>SewingTags.fr</b><br>
                - <b>Audi TT 2012</b><br>
                - <b>CTF OSINT Zoé Rouleau</b><br>
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

Elle a ete vue dans le quartier des Chartrons
a Bordeaux. Elle conduit une voiture.

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
