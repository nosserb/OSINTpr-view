// =====================================================
//  OSINT CTF — Enquete Numerique (3e)
// =====================================================

// ── FAKE IDENTITY (the target) ──
const SUSPECT = {
    nom: "Sophie Martin",
    age: 28,
    ville: "Lyon",
    metier: "Developpeuse Web",
    pseudo_twitter: "@sophie_codes",
    pseudo_insta: "@sophie.martin.dev",
    email: "sophie.martin.dev@gmail.com",
    bio_twitter: "Dev Web | Lyon | Passionnee de photo et de voyage | #OSINT",
    photo_description: "Femme brune, 28 ans, souriante, devant un mur graffite a Lyon",
    github: "sophie-dev",
    linkedin: "Sophie Martin - Developpeuse Web a Lyon",
    date_naissance: "15/03/1996",
    ecole: "Universite Lyon 1 - Informatique",
    animal: "Un chat nomme Pixel",
    marque: "Conductrice d'une Clio grise",
};

// ── FAKE GOOGLE DATABASE ──
const googleDB = [
    {
        keywords: ["sophie martin", "lyon", "dev"],
        title: "Sophie Martin - Developpeuse Web - Lyon | LinkedIn",
        url: "linkedin.com/in/sophie-martin-dev",
        snippet: `<b>Sophie Martin</b> - Developpeuse Web a <b>Lyon</b>, France. Diplomee de l'Universite Lyon 1. Specialisee en JavaScript et React. Experience de 5 ans.`,
    },
    {
        keywords: ["sophie", "martin", "twitter"],
        title: "@sophie_codes — Twitter",
        url: "twitter.com/sophie_codes",
        snippet: `<b>@sophie_codes</b> : "Dev Web | Lyon | Passionnee de photo et de voyage | #OSINT" — 1 234 abonnes. Dernier tweet: "Belle journee a Lyon! 📸"`,
    },
    {
        keywords: ["sophie", "martin", "instagram"],
        title: "@sophie.martin.dev — Instagram",
        url: "instagram.com/sophie.martin.dev",
        snippet: `Photo de profil: femme brune devant un mur graffite a <b>Lyon</b>. 567 publications. Bio: "Code & Coffee ☕ | Lyon 🇫🇷"`,
    },
    {
        keywords: ["sophie", "martin", "github"],
        title: "sophie-dev (Sophie Martin) · GitHub",
        url: "github.com/sophie-dev",
        snippet: `<b>sophie-dev</b> has 42 repositories. Top languages: JavaScript, Python, HTML. Member of Lyon Tech Community.`,
    },
    {
        keywords: ["sophie", "martin", "email"],
        title: "sophie.martin.dev@gmail.com — Gmail",
        url: "support.google.com",
        snippet: `Adresse email trouvee: <b>sophie.martin.dev@gmail.com</b>. Compte actif. Utilise pour LinkedIn, Twitter et GitHub.`,
    },
    {
        keywords: ["sophie", "martin", "lyon", "ecole", "universite"],
        title: "Sophie Martin — Promotion 2018 — Universite Lyon 1",
        url: "univ-lyon1.fr/alumni/sophie-martin",
        snippet: `Diplomee en 2018 — Licence Informatique. <b>Sophie Martin</b> a ete major de sa promotion. Currently works as a web developer in Lyon.`,
    },
    {
        keywords: ["sophie", "chat", "pixel", "animal"],
        title: "Sophie et son chat Pixel — Album photo",
        url: "photos.google.com/share/sophie-pixel",
        snippet: `Album partage: <b>Sophie Martin</b> et son chat <b>Pixel</b>. Derniere photo: "Mon Pixel adore la fenetre du 3e etage 🐱"`,
    },
    {
        keywords: ["sophie", "voiture", "clio", "grise"],
        title: "Clio grise — Contrat d'assurance",
        url: "assurance-auto.fr/sophie-m",
        snippet: `Vehicule: Renault <b>Clio grise</b>, immatriculation: <b>AB-123-CD</b>. Conducteur: <b>Sophie Martin</b>, nee le 15/03/1996 a Lyon.`,
    },
    {
        keywords: ["sophie", "naissance", "date"],
        title: "Sophie Martin — Etat civil",
        url: "annuaire-ville.fr/etat-civil",
        snippet: `<b>Sophie Martin</b>, nee le <b>15 mars 1996</b> a Lyon (69000). Nationalite: francaise.`,
    },
    {
        keywords: ["lyon", "graffiti", "mur", "photo"],
        title: "Street Art Lyon — Mur celebre du 3e arrondissement",
        url: "lyon-streetart.fr/3eme",
        snippet: `Ce mur graffite situe dans le 3e arrondissement de <b>Lyon</b> est un lieu tres photographie. Visible sur les photos Instagram de nombreux lyonnais.`,
    },
    {
        keywords: ["sophie", "sophie_codes"],
        title: "Recherche: sophie_codes",
        url: "google.com/search?q=sophie_codes",
        snippet: `Plusieurs resultats pour "<b>sophie_codes</b>": compte Twitter, GitHub, et mentions sur des forums de developpeurs lyonnais.`,
    },
    {
        keywords: ["sophie", "osint"],
        title: "CTF OSINT — Sophie Martin",
        url: "ctf-challenges.fr/osint/sophie-martin",
        snippet: `<span style="color:#e95420;font-weight:bold;">OSINT{bravo_tu_as_retrouve_sophie_martin}</span> — Challenge OSINT resolu. Identite et localisation confirms.`,
    },
];

// ── BOOT SEQUENCE ──
const bootScreen = document.getElementById("boot-screen");
const bootLines = document.getElementById("boot-lines");

const bootMsgs = [
    "[    0.000] BIOS POST... OK",
    "[    0.001] Detecting hardware...",
    "[    0.042] CPU: Intel Core i7 @ 3.60GHz",
    "[    0.043] RAM: 16384 MB DDR4",
    "[    0.044] GPU: NVIDIA RTX 3060",
    "[    0.100] Storage: 512GB NVMe SSD detected",
    "[    0.200] Loading OSINT Toolkit v4.2...",
    "[    0.301] Module: theHarvester .............. loaded",
    "[    0.302] Module: Maltego ................... loaded",
    "[    0.303] Module: Sherlock ................. loaded",
    "[    0.304] Module: Google Dorking ........... loaded",
    "[    0.400] Initializing network interface...",
    "[    0.500] eth0: 192.168.1.42/24  [UP]",
    "[    0.600] Starting OSINT services...",
    "[    0.700] Enquete database: connected",
    "[    0.800] Flag vault: locked",
    "[    0.900] System ready.",
    "",
    "  ███████╗ ██████╗ ██████╗ ███████╗███████╗████████╗",
    "  ██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝",
    "  ███████╗██║   ██║██████╔╝█████╗  ███████╗   ██║   ",
    "  ╚════██║██║   ██║██╔═══╝ ██╔══╝  ╚════██║   ██║   ",
    "  ███████║╚██████╔╝██║     ███████╗███████║   ██║   ",
    "  ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚══════╝   ╚═╝   ",
    "",
    "  Enquete OSINT — Mission: Retrouver la cible",
    "  Agent, preparer votre equipment de recherche...",
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
}, 90);

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
            notify("Mission chargee. Retrouvez l'identite de la cible. Utilisez Google.", 6000);
        }, 500);
    } else if (e.key === "Enter") {
        lockErr.textContent = "Acces refuse. Essayez encore.";
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
<div class="term-line" style="color:#89b4fa">=== OSINT Recon Terminal v4.2 ===</div>
<div class="term-line" style="color:#89b4fa">Tapez 'help' pour les commandes.</div>
<div class="term-line"></div>
<div class="term-input-row">
<span class="term-prompt">detective@osint:~$</span>
<input class="term-input" type="text" spellcheck="false">
</div></div>`;
    const w = makeWin("Terminal OSINT", body, 720, 420);
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
        "help": "Commandes: <b>help, ls, cat, whoami, pwd, id, date, clear, google, nmap, theharvester</b>",
        "ls": "dossier_suspect/  identite.txt  briefing.txt  notes.txt  photo.jpg",
        "whoami": "detective_osint",
        "pwd": "/home/detective",
        "id": "uid=1000(detective) gid=1000(detective) groups=1000(detective),27(sudo)",
        "date": new Date().toString(),
        "clear": "__CLEAR__",
        "google": "Ouvrez l'application <b>Google Chrome</b> dans le dock pour lancer une recherche.",
        "nmap": `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for <b>192.168.1.42</b>
Host is up (0.0023s latency).
PORT     STATE  SERVICE
22/tcp   open   ssh
80/tcp   open   http
443/tcp  open   https
3306/tcp open   mysql`,
        "theharvester": `TheHarvester - OSINT Tool
Searching for: <b>sophie martin lyon</b>
Found: sophie.martin.dev@gmail.com
Found: @sophie_codes (Twitter)
Found: @sophie.martin.dev (Instagram)
Found: github.com/sophie-dev
Found: LinkedIn: Sophie Martin - Lyon`,
        "cat identite.txt": `<span style="color:#f9e2af">╔══════════════════════════════════╗</span>
<span style="color:#f9e2af">║       FICHIER IDENTITE           ║</span>
<span style="color:#f9e2af">╚══════════════════════════════════╝</span>

Nom: Sophie Martin
Age: 28 ans
Ville: Lyon (69000)
Metier: Developpeuse Web

Comptes reseaux sociaux:
  Twitter: @sophie_codes
  Instagram: @sophie.martin.dev
  GitHub: sophie-dev

Email: sophie.martin.dev@gmail.com

Indice: utilisez Google pour retrouver
plus d'infos sur cette personne.

<span style="color:#f38ba8">Hint: tapez 'google' pour ouvrir la recherche.</span>`,
        "cat briefing.txt": `<span style="color:#89b4fa">=== MISSION OSINT ===</span>

Agent,

Une cible a ete identifiee: <b>Sophie Martin</b>.
Votre mission: retrouver son identite complete
et sa localisation exacte grace a Google.

Fichier identite disponible: <b>cat identite.txt</b>

Utilisez le navigateur Google pour chercher
les informations manquantes.

Bonne enquete!`,
        "cat notes.txt": `<span style="color:#89b4fa">=== NOTES D'ENQUETE ===</span>

La cible utilise le pseudonyme <b>@sophie_codes</b>
sur Twitter. Elle parle souvent de Lyon.
Elle a un chat nomme <b>Pixel</b>.

Derniere photo Instagram: devant un mur
graffite celebre. Ce mur se trouve dans le
<b>3e arrondissement de Lyon</b>.

Elle conduit une <b>Clio grise</b>.

A retrouver via Google: son email, son age,
son ecole, et la plaque de sa voiture.`,
    };

    if (c === "") return null;
    if (m[c]) return m[c];
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

    const words = q.split(/\s+/);
    let results = googleDB.filter((entry) =>
        words.some((w) => entry.keywords.some((k) => k.includes(w) || w.includes(k)))
    );

    if (results.length === 0) {
        res.innerHTML = `<div class="g-no-results">Aucun resultat pour "<b>${q}</b>". Essayez avec le nom de la cible.</div>`;
        return;
    }

    let html = "";
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

// ── FILE VIEWS ──
function openFile(name) {
    const files = {
        "dossier_suspect": `<div class="text-view"><span style="color:#89b4fa">=== DOSSIER SUSPECT ===</span>

Nom: Sophie Martin
Age: 28 ans
Ville: Lyon

Comptes:
  Twitter: @sophie_codes
  Instagram: @sophie.martin.dev
  GitHub: sophie-dev

Email: sophie.martin.dev@gmail.com

<span style="color:#f9e2af">Utilisez Google pour en savoir plus!</span>
Tapez: <b>google</b> dans le terminal ou
cliquez sur l'icone Google.</div>`,
        "notes": `<div class="text-view"><span style="color:#89b4fa">=== NOTES D'ENQUETE ===</span>

La cible utilise le pseudonyme <b>@sophie_codes</b>
sur Twitter. Elle parle souvent de Lyon.
Elle a un chat nomme <b>Pixel</b>.

Derniere photo Instagram: devant un mur
graffite celebre. Ce mur se trouve dans le
<b>3e arrondissement de Lyon</b>.

Elle conduit une <b>Clio grise</b>.

A retrouver via Google: son email, son age,
son ecole, et la plaque de sa voiture.</div>`,
    };

    if (files[name]) {
        makeWin(name, files[name], 550, 400);
    } else {
        makeWin(name, `<div class="text-view">Fichier non disponible.</div>`, 400, 250);
    }
}

// ── APP LAUNCHER ──
function openApp(app) {
    switch (app) {
        case "browser": openGoogle(); break;
        case "terminal": openTerminal(); break;
        case "files": makeWin("Fichiers", `<div class="text-view">dossier_suspect/
identite.txt
briefing.txt
notes.txt
photo.jpg</div>`, 400, 300); break;
        case "notes": openFile("notes"); break;
        case "dossier": openFile("dossier_suspect"); break;
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

console.log("OSINT CTF loaded");
