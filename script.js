// =====================================================
//  OSINT CTF — Enquete Numerique (3e) — HARD MODE
// =====================================================

// ── FAKE IDENTITY (the target — harder, less clues in the file) ──
const SUSPECT = {
    nom: "Thomas Beaumont",
    prenom: "Thomas",
    nom_famille: "Beaumont",
    age: 31,
    anniversaire: "22/07/1993",
    ville: "Bordeaux",
    quartier: "Chartrons",
    metier: "Photographe freelance",
    pseudo_twitter: "@t_beaumont_photo",
    pseudo_insta: "@thomas.beaumont.photography",
    pseudo_github: "tbeaumont",
    email: "thomas.beaumont.pro@gmail.com",
    telephone: "06 12 34 56 78",
    voiture: "Peugeot 208 blanche, immatriculation: EF-456-GH",
    ecole: "Ecole de Condé - Paris (promo 2015)",
    chat: "Mochi",
    plats_favoris: "Ramen, sushi",
    groupe_sport: "USMB Handball (supporteur)",
    compte_strava: "Thomas Beaumont — 1247 km ce mois",
    linkedin: "Thomas Beaumont — Photographe a Bordeaux",
    site_perso: "thomas-beaumont-photography.fr",
    evenement: "Exposition 'Lumieres de Bordeaux' — Galerie du Marche des Capucins, 15-30 mars 2024",
};

// ── MASSIVE FAKE GOOGLE DATABASE (50+ results) ──
const googleDB = [
    // ── Name searches ──
    { kw: ["thomas", "beaumont", "bordeaux"], title: "Thomas Beaumont — Photographe Freelance — Bordeaux", url: "linkedin.com/in/thomas-beaumont-photographe", snippet: `<b>Thomas Beaumont</b>, 31 ans. Photographe freelance base a <b>Bordeaux</b>. Diplome de l'Ecole de Condé (Paris, 2015). Specialise dans la photographie de rue et de paysage urbain. <b>thomas.beaumont.pro@gmail.com</b>. Tel: <b>06 12 34 56 78</b>.` },
    { kw: ["thomas", "beaumont", "linkedin"], title: "Thomas Beaumont — Photographe | LinkedIn", url: "linkedin.com/in/tbeaumont", snippet: `<b>Thomas Beaumont</b> — Photographe freelance chez independant. Ecole de Condé, Paris. Experience: 8 ans. Localisation: <b>Bordeaux, France</b>. Compte connecte a 342 professionnels.` },
    { kw: ["thomas", "beaumont"], title: "Thomas Beaumont — Photographe a Bordeaux", url: "thomas-beaumont-photography.fr", snippet: `Site officiel de <b>Thomas Beaumont</b>, photographe freelance a <b>Bordeaux</b>. Portfolio, contact et blog. Basé aux <b>Chartrons</b>. Disponible pour mariages, portraits et projets corporate.` },

    // ── Instagram ──
    { kw: ["thomas", "beaumont", "instagram", "photo"], title: "@thomas.beaumont.photography — Instagram", url: "instagram.com/thomas.beaumont.photography", snippet: `<b>Thomas Beaumont Photography</b> — 4 521 abonnes. Bio: "📸 Freelance | Bordeaux | 🔥 Lumieres de Bordeaux 2024 | Mail: thomas.beaumont.pro@gmail.com". Derniere photo: "Matin aux Chartrons 🌅" Il y a 2 heures.` },
    { kw: ["thomas", "beaumont", "insta"], title: "thomas.beaumont.photography — Instagram", url: "instagram.com/thomas.beaumont.photography", snippet: `4 521 abonnes. 312 publications. "Photographe freelance a Bordeaux. Expo 'Lumieres de Bordeaux' en cours — Galerie du Marche des Capucins."` },
    { kw: ["thomas.beaumont", "instagram"], title: "Recherche Instagram — thomas.beaumont", url: "instagram.com/explore/search/thomas.beaumont", snippet: `Plusieurs comptes trouves. Le plus pertinient: <b>@thomas.beaumont.photography</b> (4.5k abonnes, Bordeaux).` },

    // ── Twitter ──
    { kw: ["t_beaumont_photo", "twitter"], title: "@t_beaumont_photo — Twitter / X", url: "x.com/t_beaumont_photo", snippet: `<b>@t_beaumont_photo</b> — "Photographe freelance 📸 | Bordeaux | Fan de handball 🤾 | USMB 🇫🇷 | Mochi le chat 🐱 | thomas.beaumont.pro@gmail.com" — 1 892 abonnes.` },
    { kw: ["thomas", "beaumont", "twitter"], title: "@t_beaumont_photo — Thomas Beaumont — Twitter", url: "twitter.com/t_beaumont_photo", snippet: `Dernier tweet: "Expo 'Lumieres de Bordeaux' demain a la Galerie du Marche des Capucins! Venez nombreux 🎨 #Bordeaux #Photo" — il y a 3 heures.` },
    { kw: ["t_beaumont_photo", "handball", "usmb"], title: "@t_beaumont_photo — Tweets sur le handball", url: "twitter.com/t_beaumont_photo/status/12345", snippet: `<b>@t_beaumont_photo</b>: "ALLEZ L'USMB!!! 🤾‍♂️🔥 Grande finale ce soir! #USMB #Handball #Bordeaux" — 12/03/2024, 20:15.` },
    { kw: ["t_beaumont_photo", "mochi"], title: "@t_beaumont_photo — Tweet sur Mochi", url: "twitter.com/t_beaumont_photo/status/67890", snippet: `<b>@t_beaumont_photo</b>: "Mochi a encore grimpé sur mon equipement... 🐱😂 #PhotographerLife" — 05/01/2024.` },

    // ── GitHub ──
    { kw: ["tbeaumont", "github"], title: "tbeaumont (Thomas Beaumont) — GitHub", url: "github.com/tbeaumont", snippet: `<b>tbeaumont</b> has 18 repositories. Top languages: JavaScript, Python, HTML. Member of Bordeaux Dev Community. Joined 2016. Bio: "Photographe le jour, codeur la nuit. Bordeaux."` },
    { kw: ["thomas", "beaumont", "github", "code"], title: "Thomas Beaumont — GitHub Profile", url: "github.com/tbeaumont", snippet: `"Photographe le jour, codeur la nuit. Bordeaux." — Repos: photo-manager, portfolio-site, bordeaux-map. 18 repos, 45 stars.` },

    // ── Site perso ──
    { kw: ["thomas-beaumont-photography", "site"], title: "Thomas Beaumont Photography — Site Officiel", url: "thomas-beaumont-photography.fr", snippet: `Bienvenue sur le portfolio de <b>Thomas Beaumont</b>, photographe freelance a <b>Bordeaux</b>. Basé aux <b>Chartrons</b>. Contact: <b>thomas.beaumont.pro@gmail.com</b> | <b>06 12 34 56 78</b>. Exposition en cours: "Lumieres de Bordeaux".` },
    { kw: ["thomas", "beaumont", "site", "portfolio"], title: "Portfolio — Thomas Beaumont Photography", url: "thomas-beaumont-photography.fr/portfolio", snippet: `Portfolio de <b>Thomas Beaumont</b>. Collections: Lumieres de Bordeaux, Portraits de Rue, Nuit Bordelaise. Basé aux <b>Chartrons, Bordeaux</b>.` },
    { kw: ["thomas", "beaumont", "contact"], title: "Contact — Thomas Beaumont Photography", url: "thomas-beaumont-photography.fr/contact", snippet: `Contactez <b>Thomas Beaumont</b>: Email: <b>thomas.beaumont.pro@gmail.com</b> | Tel: <b>06 12 34 56 78</b> | Adresse: Quartier des Chartrons, 33000 Bordeaux.` },

    // ── Strava ──
    { kw: ["thomas", "beaumont", "strava"], title: "Thomas Beaumont — Strava Athlete", url: "strava.com/athletes/tbeaumont", snippet: `<b>Thomas Beaumont</b> — 1 247 km ce mois. 156 km cette semaine. Derniere course: "Running matinal aux Chartrons — 12.3 km, 54:21". Sportif regulier, coureur a pied a <b>Bordeaux</b>.` },
    { kw: ["thomas", "beaumont", "running", "strava"], title: "Thomas Beaumont — Running — Strava", url: "strava.com/athletes/tbeaumont/activities", snippet: `Activites recentes: "Running — Chartrons — 12.3 km", "Velo — Garonne — 25.8 km", "Running — Parc Bordelais — 8.7 km". Athlete base a <b>Bordeaux</b>.` },

    // ── Voiture ──
    { kw: ["thomas", "beaumont", "voiture"], title: "Thomas Beaumont — Vehicule", url: "cartegrise.com/thomas-beaumont", snippet: `Vehicule: <b>Peugeot 208 blanche</b>, immatriculation: <b>EF-456-GH</b>. Proprietaire: <b>Thomas Beaumont</b>, ne le 22/07/1993 a Bordeaux. Assure chez MAIF.` },
    { kw: ["thomas", "beaumont", "peugeot", "208"], title: "Peugeot 208 blanche — EF-456-GH — Proprietaire", url: "infoplaque.fr/EF-456-GH", snippet: `Plaque <b>EF-456-GH</b>: Vehicule <b>Peugeot 208 blanche</b>. Proprietaire: <b>Thomas Beaumont</b>. Immatricule a Bordeaux.` },

    // ── Ecole ──
    { kw: ["thomas", "beaumont", "ecole", "conde"], title: "Thomas Beaumont — Ecole de Condé — Promo 2015", url: "ecoleconde.com/alumni/thomas-beaumont", snippet: `<b>Thomas Beaumont</b>, promotion 2015 — Ecole de Condé, Paris. Diplome en Arts Visuels et Photographie. Actuellement photographe freelance a <b>Bordeaux</b>.` },
    { kw: ["ecole", "conde", "2015", "photo"], title: "Ecole de Condé — Promotion 2015 — Photographie", url: "ecoleconde.com/promo2015", snippet: `Promotion 2015 — Mention Photographie. Diplomes notables: <b>Thomas Beaumont</b> (photographe freelance, Bordeaux), ...` },

    // ── Exposition ──
    { kw: ["lumieres", "bordeaux", "exposition", "galerie"], title: "Exposition 'Lumieres de Bordeaux' — Galerie du Marche des Capucins", url: "sortir-a-bordeaux.fr/lumieres-de-bordeaux", snippet: `Exposition <b>"Lumieres de Bordeaux"</b> par <b>Thomas Beaumont</b>. Galerie du Marche des Capucins, 33000 Bordeaux. Du 15 au 30 mars 2024. Vernissage le 15 mars a 18h. Entree libre.` },
    { kw: ["thomas", "beaumont", "exposition", "mars"], title: "Thomas Beaumont — Exposition a Bordeaux — Mars 2024", url: "agenda-bordeaux.fr/thomas-beaumont", snippet: `Photographe <b>Thomas Beaumont</b> presente son exposition <b>"Lumieres de Bordeaux"</b> a la Galerie du Marche des Capucins. 15-30 mars 2024. Basé aux Chartrons.` },
    { kw: ["galerie", "marche", "capucins", "bordeaux"], title: "Galerie du Marche des Capucins — Bordeaux", url: "marchecapucins-bordeaux.fr/galerie", snippet: `La Galerie du Marche des Capucins accueille actuellement l'exposition <b>"Lumieres de Bordeaux"</b> par <b>Thomas Beaumont</b>. Adresse: Place du Marche des Chartrons, 33000 Bordeaux.` },

    // ── Quartier Chartrons ──
    { kw: ["chartrons", "bordeaux", "quartier"], title: "Quartier des Chartrons — Bordeaux", url: "bordeaux.fr/chartrons", snippet: `Le quartier des <b>Chartrons</b>, 3e arrondissement de <b>Bordeaux</b>. Quartier historique du port de wine. Galeries d'art, cafes et marche des Capucins. Code postal: <b>33000</b>.` },

    // ── Email ──
    { kw: ["thomas.beaumont.pro", "gmail"], title: "thomas.beaumont.pro@gmail.com — Gmail", url: "support.google.com/accounts/thomas.beaumont.pro", snippet: `Adresse email: <b>thomas.beaumont.pro@gmail.com</b>. Compte actif. Utilise pour LinkedIn, Instagram, Twitter, GitHub, Strava et site web personnel.` },
    { kw: ["thomas.beaumont.pro", "email", "contact"], title: "Contact — Thomas Beaumont Photography", url: "thomas-beaumont-photography.fr/contact", snippet: `Email professionnel: <b>thomas.beaumont.pro@gmail.com</b>. Telephone: <b>06 12 34 56 78</b>. Adresse: Quartier des Chartrons, 33000 Bordeaux.` },

    // ── Telephone ──
    { kw: ["06", "12", "34", "56", "78", "thomas"], title: "Numero de telephone — 06 12 34 56 78", url: "pagesjaunes.fr/06-12-34-56-78", snippet: `Numero: <b>06 12 34 56 78</b>. Nom: <b>Thomas Beaumont</b>. Localisation: <b>Bordeaux (33)</b>. Categorie: Photographie. Compte verified.` },

    // ── Handball ──
    { kw: ["usmb", "handball", "bordeaux"], title: "USMB Handball — Supporters", url: "usmb-handball.fr/supporters", snippet: `Les supporters de l'<b>USMB Handball</b> a <b>Bordeaux</b>. Forum et fan club. Membres actifs dont <b>Thomas Beaumont</b> (@t_beaumont_photo).` },
    { kw: ["usmb", "handball", "thomas"], title: "Thomas Beaumont — USMB Supporter", url: "usmb-handball.fr/forum/thomas-b", snippet: `<b>Thomas Beaumont</b> — Membre depuis 2018. Posts: 47. Dernier message: "ALLEZ L'USMB!! Grande finale!! 🤾‍♂️🔥"` },

    // ── Chat Mochi ──
    { kw: ["mochi", "chat", "thomas", "beaumont"], title: "Mochi — Le chat de Thomas Beaumont", url: "instagram.com/mochi_the_cat_bdx", snippet: `@mochi_the_cat_bdx — <b>Mochi</b>, chat de <b>Thomas Beaumont</b> a <b>Bordeaux</b>. 892 abonnes. Bio: "Mochi 🐱 | Je vis aux Chartrons avec mon humain photographe 📸 | #Bordeaux #CatOfInstagram"` },
    { kw: ["mochi", "chat", "bordeaux"], title: "Mochi the cat — Bordeaux — Instagram", url: "instagram.com/mochi_the_cat_bdx", snippet: `Chat roux. Habite aux <b>Chartrons, Bordeaux</b>. Proprietaire: <b>Thomas Beaumont</b>, photographe. Derniere photo: "Mochi sur le materiel photo de papa 📷🐱"` },

    // ── Ramen / Sushi ──
    { kw: ["thomas", "beaumont", "ramen", "bordeaux"], title: "Thomas Beaumont — avis restaurant", url: "tripadvisor.fr/thomas-beaumont-bordeaux", snippet: `<b>Thomas Beaumont</b> a laisse un avis sur "Ippon Ramen" a Bordeaux: "Meilleur ramen de la ville! Je vais y aller tous les vendredis." ⭐⭐⭐⭐⭐` },
    { kw: ["thomas", "beaumont", "sushi"], title: "Thomas Beaumont — Sushi Lover", url: "tripadvisor.fr/profile/thomas-beaumont", snippet: `Avis de <b>Thomas Beaumont</b>: "Sakura Sushi" a Bordeaux — "Les meilleurs sushis du quartier des Chartrons!" ⭐⭐⭐⭐⭐` },

    // ── Adresse / Ville ──
    { kw: ["thomas", "beaumont", "adresse", "bordeaux"], title: "Thomas Beaumont — Adresse", url: "pagesjaunes.fr/thomas-beaumont-bordeaux", snippet: `<b>Thomas Beaumont</b>, Photographe freelance. Adresse: Quartier des <b>Chartrons</b>, <b>33000 Bordeaux</b>. Email: thomas.beaumont.pro@gmail.com. Tel: 06 12 34 56 78.` },
    { kw: ["bordeaux", "33000", "chartrons", "thomas"], title: "Bordeaux — 33000 — Chartrons", url: "bordeaux.fr/code-postal/33000", snippet: `Code postal <b>33000</b> — Quartier des <b>Chartrons</b>, Bordeaux. Habitants notables: <b>Thomas Beaumont</b>, photographe freelance.` },

    // ── Anniversaire ──
    { kw: ["thomas", "beaumont", "naissance", "1993"], title: "Thomas Beaumont — Etat civil", url: "annuaire-ville.fr/thomas-beaumont", snippet: `<b>Thomas Beaumont</b>, ne le <b>22 juillet 1993</b> a Bordeaux (33000). Nationalite: francaise. Age: <b>31 ans</b>.` },
    { kw: ["thomas", "beaumont", "22", "juillet"], title: "Thomas Beaumont — Date de naissance", url: "publicrecords.fr/thomas-beaumont-1993", snippet: `Nom: <b>Thomas Beaumont</b>. Date de naissance: <b>22/07/1993</b>. Lieu: Bordeaux, France. Age actuel: 31 ans.` },

    // ── Code promo / bonus ──
    { kw: ["thomas", "beaumont", "photo", "bordeaux", "chartrons"], title: "Thomas Beaumont — Photographe a Bordeaux — Chartrons", url: "thomas-beaumont-photography.fr/about", snippet: `A propos de <b>Thomas Beaumont</b>: "Je suis Thomas, 31 ans, photographe freelance a <b>Bordeaux</b>. Je vis aux <b>Chartrons</b> avec mon chat <b>Mochi</b>. Diplome de l'<b>Ecole de Condé</b> (Paris, 2015). Fan de <b>USMB Handball</b> et de ramen. Contact: <b>thomas.beaumont.pro@gmail.com</b>"` },
    { kw: ["thomas", "beaumont", "31", "ans"], title: "Thomas Beaumont — Age et profil", url: "facebook.com/thomas.beaumont.93", snippet: `<b>Thomas Beaumont</b>, 31 ans. Photographe a <b>Bordeaux</b>. Travail: Freelance. Etudes: Ecole de Condé. Ville natale: Bordeaux. Relation: celibataire. Chat: <b>Mochi</b>.` },

    // ── Flag ──
    { kw: ["osint", "flag", "ctf"], title: "CTF OSINT — Challenge: Thomas Beaumont", url: "ctf-challenges.fr/osint/thomas-beaumont", snippet: `<span style="color:#e95420;font-weight:bold;">OSINT{thomas_beaumont_bordeaux_chartrons_1993}</span> — Challenge OSINT resolu. Identite et localisation confirmees: Thomas Beaumont, 31 ans, photographe a Bordeaux, quartier des Chartrons.` },
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
            setTimeout(() => notify("Mission chargee. Lisez le briefing puis utilisez Google.", 7000), 1000);
            setTimeout(() => notify("Indice: commencez par 'cat briefing.txt' dans le terminal.", 6000), 3000);
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
<div class="term-line">Commencez par: <b style="color:#f9e2af">'cat briefing.txt'</b></div>
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
  <span style="color:#f9e2af">nmap 192.168.1.0/24</span> — Scanner le reseau
  <span style="color:#f9e2af">theharvester &lt;nom&gt;</span>  — Outil OSINT
  <span style="color:#f9e2af">sherlock &lt;pseudo&gt;</span>   — Chercher un pseudo en ligne
  <span style="color:#f9e2af">exif &lt;image&gt;</span>        — Lire les metadata d'une photo`,

        "ls": `fichier_id.txt   briefing.txt   notes.txt   photo.jpg   dossier_suspect/`,
        "whoami": "detective_osint",
        "pwd": "/home/detective",
        "date": new Date().toString(),
        "clear": "__CLEAR__",

        // ── Briefing ──
        "cat briefing.txt": `<span style="color:#89b4fa">╔══════════════════════════════════════════════╗</span>
<span style="color:#89b4fa">║              MISSION BRIEFING                 ║</span>
<span style="color:#89b4fa">╚══════════════════════════════════════════════╝</span>

Agent,

Nous avons intercepte un fichier d'identite partiel
concernant une cible. Ce fichier contient peu
d'informations — vous devez completer l'enquete.

<span style="color:#f9e2af">ETAPES:</span>
1. Lisez le fichier d'identite: <b>cat fichier_id.txt</b>
2. Utilisez Google pour chercher la cible
3. Retrouvez: nom complet, age, ville, metier,
   comptes reseaux sociaux, et autres details

<span style="color:#f9e2af">OUTILS:</span>
- <b>google</b> : recherche web simulee
- <b>theharvester &lt;nom&gt;</b> : collecte d'emails
- <b>sherlock &lt;pseudo&gt;</b> : recherche de pseudonymes
- <b>nmap</b> : scan reseau
- <b>exif photo.jpg</b> : metadata d'image

<span style="color:#f38ba8">Le flag se trouve dans les resultats Google.</span>

Bonne enquete, agent!`,

        // ── Fichier identite (reduit) ──
        "cat fichier_id.txt": `<span style="color:#f9e2af">╔══════════════════════════════════════════════╗</span>
<span style="color:#f9e2af">║       FICHIER D'IDENTITE — PARTIEL            ║</span>
<span style="color:#f9e2af">╚══════════════════════════════════════════════╝</span>

Nom: <b>T. Beaumont</b>  (prenom inconnu)
Age: <b>inconnu</b>
Ville: <b>Bordeaux</b>  (quartier inconnu)
Metier: <b>Photographe</b> (freelance?)
Pseudo Instagram: <b>@thomas.beaumont.photography</b>

<span style="color:#f38ba8">⚠ Ce fichier est INCOMPLET.</span>
<span style="color:#f38ba8">Vous devez retrouver via Google:</span>
  - Prenom complet
  - Age / date de naissance
  - Quartier exact
  - Compte Twitter
  - Compte GitHub
  - Email
  - Telephone
  - Immatriculation voiture
  - Ecole / formation
  - Details personnels (animal, sport, etc.)

Utilisez: <b>google</b> ou ouvrez Chrome.`,

        // ── Notes ──
        "cat notes.txt": `<span style="color:#89b4fa">=== NOTES D'ENQUETE ===</span>

La cible utilise le pseudo <b>@thomas.beaumont.photography</b>
sur Instagram. Elle parle de <b>Bordeaux</b>.

Elle a un animal de compagnie — a retrouver via Google.

Elle conduit une voiture — marque et plaque inconnues.

Elle est fan d'un sport — a determiner.

<span style="color:#f9e2af">Indice: cherchez le pseudo sur differentes plateformes.</span>`,

        // ── Nmap ──
        "nmap 192.168.1.0/24": `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for 192.168.1.0/24
HOST           PORT     STATE  SERVICE
192.168.1.1    80/tcp   open   http    (Routeur)
192.168.1.42   22/tcp   open   ssh     (Recon-station)
192.168.1.42   80/tcp   open   http    (Web server)
192.168.1.42   443/tcp  open   https
192.168.1.100  3306/tcp open   mysql   (Base de donnees)`,

        // ── theHarvester ──
        "theharvester thomas beaumont": `TheHarvester v3.2 — OSINT Email Collector
Searching for: thomas beaumont
Domain: gmail.com
----------------------
Found: <b>thomas.beaumont.pro@gmail.com</b>
Found: thomas.b@ecole-conde.com (ancien)
Found: t.beaumont@usmb-supporters.fr
Results: 3 emails found`,

        "theharvester beaumont": `TheHarvester v3.2 — OSINT Email Collector
Searching for: beaumont
Domain: all
----------------------
Found: <b>thomas.beaumont.pro@gmail.com</b>
Found: sophie.beaumont@wanadoo.fr (pas la cible)
Results: 2 emails found — verifier le bon`,

        // ── Sherlock ──
        "sherlock thomas.beaumont.photography": `Sherlock — Search username across platforms
Username: thomas.beaumont.photography
---------------------------------------
[+] Instagram: instagram.com/thomas.beaumont.photography
[+] Twitter: PAS TROUVE (essayez: t_beaumont_photo)
[+] GitHub: PAS TROUVE (essayez: tbeaumont)
[+] Facebook: facebook.com/thomas.beaumont
Result: 1/3 plateformes trouvées`,

        "sherlock t_beaumont_photo": `Sherlock — Search username across platforms
Username: t_beaumont_photo
---------------------------------------
[+] Twitter/X: x.com/t_beaumont_photo
[+] Instagram: PAS TROUVE
[+] GitHub: PAS TROUVE
Result: 1/3 — Twitter trouve!`,

        "sherlock tbeaumont": `Sherlock — Search username across platforms
Username: tbeaumont
---------------------------------------
[+] GitHub: github.com/tbeaumont
[+] Twitter: PAS TROUVE
[+] Instagram: PAS TROUVE
Result: 1/3 — GitHub trouve!`,

        // ── Exif ──
        "exif photo.jpg": `<span style="color:#f9e2af">=== EXIF METADATA — photo.jpg ===</span>
Fichier: photo.jpg
Taille: 3.2 Mo
Date: 14/03/2024 17:42:33
Camera: Canon EOS R6
Objectif: 24-70mm f/2.8
<span style="color:#f9e2af">GPS Latitude: 44.8378 N</span>
<span style="color:#f9e2af">GPS Longitude: -0.5712 E</span>
<span style="color:#f9e2af">Lieu: Marche des Capucins, Bordeaux</span>
Artist: <b>Thomas Beaumont</b>
Copyright: <b>thomas.beaumont.pro@gmail.com</b>`,

        // ── Flags via commandes directes ──
        "cat photo.jpg": "Fichier binaire. Utilisez: <b>exif photo.jpg</b>",
    };

    if (c === "") return null;
    if (m[c]) return m[c];

    if (c.startsWith("sherlock ")) return `<span style="color:#f38ba8">Utilisez un pseudo trouve dans les indices (ex: sherlock tbeaumont)</span>`;
    if (c.startsWith("theharvester ")) return `<span style="color:#f38ba8">Utilisez le nom de la cible (ex: theharvester thomas beaumont)</span>`;
    if (c.startsWith("nmap")) return `<span style="color:#f38ba8">Syntaxe: nmap 192.168.1.0/24</span>`;
    if (c.startsWith("exif")) return `<span style="color:#f38ba8">Syntaxe: exif photo.jpg</span>`;

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

    // Remove duplicates by title
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
                <span style="color:#888">Conseils pour les debutants:</span><br>
                - Essayez: <b>Thomas Beaumont Bordeaux</b><br>
                - Essayez: <b>@thomas.beaumont.photography</b><br>
                - Essayez: <b>t_beaumont_photo</b><br>
                - Essayez: <b>tbeaumont</b><br>
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

// ── FILE VIEWS ──
function openFile(name) {
    const files = {
        "dossier_suspect": `<div class="text-view"><span style="color:#89b4fa">╔══════════════════════════════════╗</span>
<span style="color:#89b4fa">║       DOSSIER SUSPECT            ║</span>
<span style="color:#89b4fa">╚══════════════════════════════════╝</span>

Nom: <b>T. Beaumont</b> (prenom ?)
Age: <b>?</b>
Ville: <b>Bordeaux</b>
Metier: <b>Photographe</b>

Instagram: @thomas.beaumont.photography

<span style="color:#f9e2af">Ce fichier est INCOMPLET.</span>
<span style="color:#f9e2af">Utilisez Google pour retrouver le reste!</span>
<br><br>
Ouvrez Google Chrome ou tapez <b>google</b>
dans le terminal.</div>`,
        "notes": `<div class="text-view"><span style="color:#89b4fa">=== NOTES D'ENQUETE ===</span>

La cible utilise le pseudo <b>@thomas.beaumont.photography</b>
sur Instagram. Elle parle de <b>Bordeaux</b>.

Elle a un animal de compagnie — a retrouver via Google.

Elle conduit une voiture — marque et plaque inconnues.

Elle est fan d'un sport — a determiner.

<span style="color:#f9e2af">Indice: cherchez le pseudo sur differentes plateformes.</span></div>`,
    };

    if (files[name]) {
        makeWin(name === "dossier_suspect" ? "Dossier Suspect" : "Notes", files[name], 520, 380);
    }
}

// ── APP LAUNCHER ──
function openApp(app) {
    switch (app) {
        case "browser": openGoogle(); break;
        case "terminal": openTerminal(); break;
        case "files": makeWin("Fichiers", `<div class="text-view">fichier_id.txt
briefing.txt
notes.txt
photo.jpg
dossier_suspect/</div>`, 360, 260); break;
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

console.log("OSINT CTF loaded — Hard Mode");
