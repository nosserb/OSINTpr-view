// =====================================================
//  OSINT CTF — HARD MODE — FIXED
// =====================================================

let score = 100;
const found = {};
const errors = [];

const TARGETS = {
    zoe: { name: "Zoé Rouleau", hint: "93210, ceramicienne dentaire, Geore2004" },
    kevin: { name: "Kevin Duval", hint: "Montpellier, DJ, Twingo rose, DJ_KevMaster_Fire" },
    brigitte: { name: "Brigitte Legrand", hint: "Nantes, 12 chats, MamieChat44" },
    mystere: { name: "Agent X", hint: "75013 Paris, Kali Linux, Python, ProtonMail" },
};

const ALL_FACTS = [
    // ═══ ZOÉ ═══
    { id:"z1", target:"zoe", cat:"identite", label:"Nom complet", value:"Zoé Rouleau", correct:true },
    { id:"z2", target:"zoe", cat:"identite", label:"Age", value:"22 ans", correct:true },
    { id:"z3", target:"zoe", cat:"identite", label:"Date de naissance", value:"25 janvier 2004", correct:true },
    { id:"z4", target:"zoe", cat:"identite", label:"Signe zodiacal", value:"Verseau", correct:true },
    { id:"z5", target:"zoe", cat:"identite", label:"Adresse", value:"9, rue de l'Aigle, 93210 La Plaine-Saint-Denis", correct:true },
    { id:"z6", target:"zoe", cat:"identite", label:"GPS", value:"48.960522, 2.432508", correct:true },
    { id:"z7", target:"zoe", cat:"identite", label:"Nom jeune fille mere", value:"Larocque", correct:true },
    { id:"z8", target:"zoe", cat:"contact", label:"Email", value:"ZoeRouleau@jourrapide.com", correct:true },
    { id:"z9", target:"zoe", cat:"contact", label:"Telephone", value:"01.66.22.76.72", correct:true },
    { id:"z10", target:"zoe", cat:"reseaux", label:"Pseudo", value:"Geore2004", correct:true },
    { id:"z11", target:"zoe", cat:"reseaux", label:"Twitter", value:"@Geore2004", correct:true },
    { id:"z12", target:"zoe", cat:"reseaux", label:"Instagram", value:"@Geore2004", correct:true },
    { id:"z13", target:"zoe", cat:"reseaux", label:"GitHub", value:"Geore2004", correct:true },
    { id:"z14", target:"zoe", cat:"emploi", label:"Metier", value:"Ceramicienne dentaire", correct:true },
    { id:"z15", target:"zoe", cat:"emploi", label:"Entreprise", value:"Laura Ashley", correct:true },
    { id:"z16", target:"zoe", cat:"vehicule", label:"Vehicule", value:"Audi TT 2012", correct:true },
    { id:"z17", target:"zoe", cat:"divers", label:"Couleur preferee", value:"Vert", correct:true },
    { id:"z18", target:"zoe", cat:"divers", label:"Site web", value:"SewingTags.fr", correct:true },
    { id:"z19", target:"zoe", cat:"divers", label:"Mot de passe", value:"Ohvaes4ipah", correct:true },
    { id:"z20", target:"zoe", cat:"divers", label:"Visa", value:"4485 9599 6861 8473", correct:true },
    { id:"z21", target:"zoe", cat:"divers", label:"FLAG", value:"OSINT{zoe_rouleau_93210_verseau_vert_audi}", correct:true },
    // Faux ZOE
    { id:"zf1", target:"zoe", cat:"erreurs", label:"Fausse Zoé Lyon", value:"Zoé Rouleau — Infirmiere a Lyon", correct:false },
    { id:"zf2", target:"zoe", cat:"erreurs", label:"Fausse Zoé Marseille", value:"Zoé Rouleau — Avocate a Marseille", correct:false },
    { id:"zf3", target:"zoe", cat:"erreurs", label:"Fausse Zoé Paris", value:"Zoé Rouleau — Dentiste a Paris 75001", correct:false },
    { id:"zf4", target:"zoe", cat:"erreurs", label:"Fausse Zoé Bordeaux", value:"Zoé Rouleau — Professeur a Bordeaux", correct:false },
    { id:"zf5", target:"zoe", cat:"erreurs", label:"Fausse Zoé Toulouse", value:"Zoé Rouleau — Ingenieure a Toulouse", correct:false },
    { id:"zf6", target:"zoe", cat:"erreurs", label:"Fausse Zoé Nantes", value:"Zoé Rouleau — Boulangerie a Nantes", correct:false },
    { id:"zf7", target:"zoe", cat:"erreurs", label:"Faux pseudo", value:"@zrouleau2004 (autre Zoé)", correct:false },
    { id:"zf8", target:"zoe", cat:"erreurs", label:"Faux email", value:"z.rouleau@gmail.com (autre Zoé)", correct:false },
    { id:"zf9", target:"zoe", cat:"erreurs", label:"Fausse voiture", value:"Peugeot 208 (Lyon)", correct:false },
    { id:"zf10", target:"zoe", cat:"erreurs", label:"Faux insta", value:"@zoe.rouleau.photography (Marseille)", correct:false },
    { id:"zf11", target:"zoe", cat:"erreurs", label:"Faux metier dentaire", value:"Chirurgienne dentaire (Paris)", correct:false },

    // ═══ KEVIN ═══
    { id:"k1", target:"kevin", cat:"identite", label:"Nom complet", value:"Kevin Duval", correct:true },
    { id:"k2", target:"kevin", cat:"identite", label:"Age", value:"27 ans", correct:true },
    { id:"k3", target:"kevin", cat:"identite", label:"Date de naissance", value:"14 aout 1997", correct:true },
    { id:"k4", target:"kevin", cat:"identite", label:"Adresse", value:"23 rue des Lilas, 34000 Montpellier", correct:true },
    { id:"k5", target:"kevin", cat:"reseaux", label:"Pseudo TikTok", value:"DJ_KevMaster_Fire", correct:true },
    { id:"k6", target:"kevin", cat:"contact", label:"Email", value:"kevin.duval.dj@gmail.com", correct:true },
    { id:"k7", target:"kevin", cat:"contact", label:"Telephone", value:"06 98 76 54 32", correct:true },
    { id:"k8", target:"kevin", cat:"emploi", label:"Metier", value:"DJ evenementiel", correct:true },
    { id:"k9", target:"kevin", cat:"emploi", label:"Societe", value:"KevMaster Events", correct:true },
    { id:"k10", target:"kevin", cat:"vehicule", label:"Vehicule", value:"Renault Twingo rose", correct:true },
    { id:"k11", target:"kevin", cat:"reseaux", label:"TikTok", value:"@dj_kevmaster_fire", correct:true },
    { id:"k12", target:"kevin", cat:"reseaux", label:"Instagram", value:"@kevmaster_dj", correct:true },
    { id:"k13", target:"kevin", cat:"reseaux", label:"YouTube", value:"KevMasterFire Official", correct:true },
    { id:"k14", target:"kevin", cat:"divers", label:"Site web", value:"dj-kevmaster.fr", correct:true },
    { id:"k15", target:"kevin", cat:"divers", label:"Signature musicale", value:"Zyedmikado sur flute a bec", correct:true },
    { id:"k16", target:"kevin", cat:"divers", label:"Nom du chat", value:"Monsieur Whiskers", correct:true },
    { id:"k17", target:"kevin", cat:"divers", label:"Couleur preferee", value:"Rose fluo", correct:true },
    { id:"k18", target:"kevin", cat:"divers", label:"Annee permis", value:"2016", correct:true },
    { id:"k19", target:"kevin", cat:"divers", label:"FLAG", value:"OSINT{kevin_duval_montpellier_dj_kevmaster_fire}", correct:true },
    // Faux KEVIN
    { id:"kf1", target:"kevin", cat:"erreurs", label:"Faux Kevin Paris", value:"Kevin Duval — Comptable a Paris", correct:false },
    { id:"kf2", target:"kevin", cat:"erreurs", label:"Faux Kevin Lyon", value:"Kevin Duval — Informaticien a Lyon", correct:false },
    { id:"kf3", target:"kevin", cat:"erreurs", label:"Faux Kevin Marseille", value:"Kevin Duval — Mecanicien a Marseille", correct:false },
    { id:"kf4", target:"kevin", cat:"erreurs", label:"Faux Kevin Toulouse", value:"Kevin Duval — Coach sportif a Toulouse", correct:false },
    { id:"kf5", target:"kevin", cat:"erreurs", label:"Faux pseudo DJ", value:"@DJ_Steve_Music (autre DJ)", correct:false },
    { id:"kf6", target:"kevin", cat:"erreurs", label:"Fausse voiture", value:"BMW M3 noire (Paris)", correct:false },
    { id:"kf7", target:"kevin", cat:"erreurs", label:"Faux age", value:"35 ans (Lyon)", correct:false },
    { id:"kf8", target:"kevin", cat:"erreurs", label:"Faux email", value:"kevin.duval@outlook.com (autre Kevin)", correct:false },

    // ═══ BRIGITTE ═══
    { id:"b1", target:"brigitte", cat:"identite", label:"Nom complet", value:"Brigitte Legrand", correct:true },
    { id:"b2", target:"brigitte", cat:"identite", label:"Age", value:"58 ans", correct:true },
    { id:"b3", target:"brigitte", cat:"identite", label:"Date de naissance", value:"3 decembre 1966", correct:true },
    { id:"b4", target:"brigitte", cat:"identite", label:"Adresse", value:"7 impasse des Rosiers, 44000 Nantes", correct:true },
    { id:"b5", target:"brigitte", cat:"reseaux", label:"Pseudo Facebook", value:"MamieChat44", correct:true },
    { id:"b6", target:"brigitte", cat:"contact", label:"Email", value:"brigitte.legrand.chat@orange.fr", correct:true },
    { id:"b7", target:"brigitte", cat:"contact", label:"Telephone", value:"02 40 88 12 34", correct:true },
    { id:"b8", target:"brigitte", cat:"emploi", label:"Metier", value:"Retraitee — ancienne institutrice", correct:true },
    { id:"b9", target:"brigitte", cat:"divers", label:"Nombre de chats", value:"12 chats", correct:true },
    { id:"b10", target:"brigitte", cat:"divers", label:"Noms des 3 premiers chats", value:"Mimi, Croquette, Patapouf", correct:true },
    { id:"b11", target:"brigitte", cat:"reseaux", label:"Facebook", value:"Brigitte Legrand — Nantes", correct:true },
    { id:"b12", target:"brigitte", cat:"reseaux", label:"YouTube", value:"MamieChat44 — Chats & Recettes", correct:true },
    { id:"b13", target:"brigitte", cat:"reseaux", label:"Instagram", value:"@mamie_chat_nantes", correct:true },
    { id:"b14", target:"brigitte", cat:"vehicule", label:"Vehicule", value:"Citroen C3 bleue", correct:true },
    { id:"b15", target:"brigitte", cat:"divers", label:"Plat prefere", value:"Quiche Lorraine", correct:true },
    { id:"b16", target:"brigitte", cat:"divers", label:"Emission preferee", value:"Fort Boyard", correct:true },
    { id:"b17", target:"brigitte", cat:"divers", label:"FLAG", value:"OSINT{brigitte_legrand_nantes_12_chats_mamiechat44}", correct:true },
    // Faux BRIGITTE
    { id:"bf1", target:"brigitte", cat:"erreurs", label:"Fausse Brigitte Paris", value:"Brigitte Legrand — Avocate a Paris", correct:false },
    { id:"bf2", target:"brigitte", cat:"erreurs", label:"Fausse Brigitte Marseille", value:"Brigitte Legrand — Directrice a Marseille", correct:false },
    { id:"bf3", target:"brigitte", cat:"erreurs", label:"Fausse Brigitte Lyon", value:"Brigitte Legrand — Medecin a Lyon", correct:false },
    { id:"bf4", target:"brigitte", cat:"erreurs", label:"Fausse Brigitte Bordeaux", value:"Brigitte Legrand — Pharmacienne a Bordeaux", correct:false },
    { id:"bf5", target:"brigitte", cat:"erreurs", label:"Faux pseudo chat", value:"@CatLover69 (Marseille, 3 chats)", correct:false },
    { id:"bf6", target:"brigitte", cat:"erreurs", label:"Faux age", value:"32 ans (Paris)", correct:false },
    { id:"bf7", target:"brigitte", cat:"erreurs", label:"Fausse voiture", value:"Porsche Cayenne (Lyon)", correct:false },
    { id:"bf8", target:"brigitte", cat:"erreurs", label:"Faux email", value:"brigitte.legrand@wanadoo.fr (Marseille)", correct:false },

    // ═══ AGENT X ═══
    { id:"x1", target:"mystere", cat:"identite", label:"Pseudo", value:"Agent_X_75013", correct:true },
    { id:"x2", target:"mystere", cat:"identite", label:"Adresse", value:"13 rue de la Malvernette, 75013 Paris", correct:true },
    { id:"x3", target:"mystere", cat:"contact", label:"Email", value:"agent.x.secour@protonmail.com", correct:true },
    { id:"x4", target:"mystere", cat:"reseaux", label:"GitHub", value:"agent-x-anonymous", correct:true },
    { id:"x5", target:"mystere", cat:"reseaux", label:"Reddit", value:"u/AgentX75013", correct:true },
    { id:"x6", target:"mystere", cat:"reseaux", label:"Telegram", value:"@agent_x_officiel", correct:true },
    { id:"x7", target:"mystere", cat:"divers", label:"Signature", value:"Des infos, pas des opinions", correct:true },
    { id:"x8", target:"mystere", cat:"divers", label:"Activite principale", value:"Fishing — Peche aux donnees", correct:true },
    { id:"x9", target:"mystere", cat:"divers", label:"Langage prefere", value:"Python", correct:true },
    { id:"x10", target:"mystere", cat:"divers", label:"OS prefere", value:"Kali Linux", correct:true },
    { id:"x11", target:"mystere", cat:"divers", label:"FLAG", value:"OSINT{agent_x_75013_kali_linux_protonmail}", correct:true },
    // Faux AGENT X
    { id:"xf1", target:"mystere", cat:"erreurs", label:"Faux Agent X 75001", value:"Agent X — 1 rue de la Paix, 75001", correct:false },
    { id:"xf2", target:"mystere", cat:"erreurs", label:"Faux Agent X Lyon", value:"Agent X — Lyon, hacker lyonnais", correct:false },
    { id:"xf3", target:"mystere", cat:"erreurs", label:"Faux pseudo", value:"@H4CK3R_FR (autre pseudo)", correct:false },
    { id:"xf4", target:"mystere", cat:"erreurs", label:"Faux email", value:"hacker@anonymous.fr", correct:false },
    { id:"xf5", target:"mystere", cat:"erreurs", label:"Faux OS", value:"Windows 11 (pas Kali)", correct:false },
    { id:"xf6", target:"mystere", cat:"erreurs", label:"Faux langage", value:"HTML (pas Python)", correct:false },
];

// ═══ GOOGLE DB ═══
const googleDB = [
    // ── ZOÉ BON ──
    { kw:["zoe","rouleau","93210"], title:"Zoé Rouleau — La Plaine-Saint-Denis (93)", url:"pagesjaunes.fr/zoe-rouleau-93210", snippet:`<span class="osint-word" data-id="z1">Zoé Rouleau</span>, <span class="osint-word" data-id="z2">22 ans</span>. <span class="osint-word" data-id="z5">9, rue de l'Aigle, 93210 La Plaine-Saint-Denis</span>. Tel: <span class="osint-word" data-id="z9">01.66.22.76.72</span>. Email: <span class="osint-word" data-id="z8">ZoeRouleau@jourrapide.com</span>.` },
    { kw:["geore2004","twitter"], title:"@Geore2004 — Twitter", url:"x.com/Geore2004", snippet:`<span class="osint-word" data-id="z11">@Geore2004</span> — "Zoé, <span class="osint-word" data-id="z2">22 ans</span> | La Plaine-Saint-Denis | Geologie | <span class="osint-word" data-id="z17">Vert</span> | <span class="osint-word" data-id="z16">Audi TT</span>"` },
    { kw:["geore2004","instagram"], title:"@Geore2004 — Instagram", url:"instagram.com/geore2004", snippet:`<span class="osint-word" data-id="z12">@Geore2004</span> — <span class="osint-word" data-id="z14">Dental ceramist</span> | <span class="osint-word" data-id="z18">SewingTags.fr</span> | <span class="osint-word" data-id="z17">Vert</span>` },
    { kw:["geore2004","github"], title:"Geore2004 — GitHub", url:"github.com/Geore2004", snippet:`<span class="osint-word" data-id="z13">Geore2004</span> — Bio: "Zoé Rouleau — La Plaine-Saint-Denis. Geology & sewing."` },
    { kw:["zoe","rouleau","laura","ashley"], title:"Zoé — Laura Ashley Dental", url:"laura-ashley-dental.fr", snippet:`<span class="osint-word" data-id="z14">Zoé Rouleau — Ceramicienne dentaire</span> chez <span class="osint-word" data-id="z15">Laura Ashley</span>.` },
    { kw:["zoe","rouleau","audi","tt"], title:"Zoé — Audi TT 2012", url:"cartegrise.com", snippet:`Vehicule: <span class="osint-word" data-id="z16">Audi TT 2012</span>. Proprio: Zoé Rouleau.` },
    { kw:["sewingtags"], title:"SewingTags.fr", url:"sewingtags.fr", snippet:`<span class="osint-word" data-id="z18">SewingTags.fr</span> — Blog couture par Zoé Rouleau.` },
    { kw:["zoe","rouleau","25","janvier","2004"], title:"Zoé — Naissance", url:"annuaire-ville.fr", snippet:`Nee le <span class="osint-word" data-id="z3">25 janvier 2004</span>. <span class="osint-word" data-id="z4">Verseau</span>.` },
    { kw:["larocque","rouleau"], title:"Famille Rouleau-Larocque", url:"genealogie.fr", snippet:`Mere: nee <span class="osint-word" data-id="z7">Larocque</span>.` },
    { kw:["48.960522","2.432508"], title:"GPS: 48.960522, 2.432508", url:"google-maps.fr", snippet:`<span class="osint-word" data-id="z6">48.960522, 2.432508</span>. La Plaine-Saint-Denis.` },
    { kw:["zoerouleau","jourrapide"], title:"ZoeRouleau@jourrapide.com", url:"emailrep.io", snippet:`<span class="osint-word" data-id="z8">ZoeRouleau@jourrapide.com</span>. Zoé Rouleau. La Plaine-Saint-Denis.` },
    { kw:["ctf","osint","zoe","flag"], title:"CTF — Zoé Rouleau", url:"ctf-challenges.fr", snippet:`<span class="osint-word" data-id="z21" style="color:#e95420;font-weight:bold">OSINT{zoe_rouleau_93210_verseau_vert_audi}</span>` },

    // ── ZOÉ FAUSSES ──
    { kw:["zoe","rouleau","lyon","infirmiere"], title:"Zoé Rouleau — Infirmiere — Lyon (69)", url:"linkedin.com/zrouleau-lyon", snippet:`<span class="osint-word" data-id="zf1">Zoé Rouleau</span>, 28 ans. <span class="osint-word" data-id="zf1">Infirmiere</span> a l'Hopital de la Croix-Rousse, <span class="osint-word" data-id="zf1">Lyon</span>.` },
    { kw:["zoe","rouleau","marseille","avocate"], title:"Zoé Rouleau — Avocate — Marseille (13)", url:"linkedin.com/zrouleau-marseille", snippet:`<span class="osint-word" data-id="zf2">Zoé Rouleau</span>, 34 ans. <span class="osint-word" data-id="zf2">Avocate</span> penaliste a <span class="osint-word" data-id="zf2">Marseille</span>.` },
    { kw:["zoe","rouleau","paris","dentiste"], title:"Zoé Rouleau — Dentiste — Paris 1er", url:"doctolib.fr/zrouleau-paris", snippet:`<span class="osint-word" data-id="zf3">Zoé Rouleau</span>, 31 ans. <span class="osint-word" data-id="zf3">Dentiste</span> a Paris 75001.` },
    { kw:["zoe","rouleau","bordeaux","professeur"], title:"Zoé Rouleau — Professeur — Bordeaux", url:"academie-bordeaux.fr", snippet:`<span class="osint-word" data-id="zf4">Zoé Rouleau</span>, 26 ans. <span class="osint-word" data-id="zf4">Professeur des ecoles</span> a <span class="osint-word" data-id="zf4">Bordeaux</span>.` },
    { kw:["zoe","rouleau","toulouse","ingenieure"], title:"Zoé Rouleau — Ingenieure — Toulouse", url:"linkedin.com/zrouleau-toulouse", snippet:`<span class="osint-word" data-id="zf5">Zoé Rouleau</span>, 29 ans. <span class="osint-word" data-id="zf5">Ingenieure</span> a <span class="osint-word" data-id="zf5">Toulouse</span>. Airbus.` },
    { kw:["zoe","rouleau","nantes","boulanger"], title:"Zoé Rouleau — Boulangerie — Nantes", url:"pagesjaunes.fr/zrouleau-nantes", snippet:`<span class="osint-word" data-id="zf6">Zoé Rouleau</span>, 24 ans. Artisan <span class="osint-word" data-id="zf6">boulanger</span> a <span class="osint-word" data-id="zf6">Nantes</span>.` },
    { kw:["zrouleau2004"], title:"@zrouleau2004 — Twitter", url:"twitter.com/zrouleau2004", snippet:`<span class="osint-word" data-id="zf7">@zrouleau2004</span> — Etudiante en droit a Paris.` },
    { kw:["z.rouleau","gmail"], title:"z.rouleau@gmail.com", url:"emailrep.io", snippet:`<span class="osint-word" data-id="zf8">z.rouleau@gmail.com</span> — Autre Zoé Rouleau. Lyon.` },
    { kw:["zoe","rouleau","peugeot","208"], title:"Zoé Rouleau — Peugeot 208 — Lyon", url:"cartegrise.fr", snippet:`<span class="osint-word" data-id="zf9">Peugeot 208</span>. Proprio: Zoé Rouleau, Lyon.` },
    { kw:["zoe.rouleau.photography"], title:"@zoe.rouleau.photography — Instagram", url:"instagram.com/zoe.rouleau.photography", snippet:`<span class="osint-word" data-id="zf10">@zoe.rouleau.photography</span> — Photographe a Marseille.` },
    { kw:["zoe","rouleau","chirurgienne"], title:"Zoé Rouleau — Chirurgienne dentaire — Paris", url:"doctolib.fr/zrouleau-chirurgie", snippet:`<span class="osint-word" data-id="zf11">Zoé Rouleau</span>, 38 ans. <span class="osint-word" data-id="zf11">Chirurgienne dentaire</span> a Paris.` },

    // ── KEVIN BON ──
    { kw:["kevin","duval","montpellier","dj"], title:"Kevin Duval — DJ Montpellier (34)", url:"pagesjaunes.fr/kevin-duval-dj", snippet:`<span class="osint-word" data-id="k1">Kevin Duval</span>, <span class="osint-word" data-id="k2">27 ans</span>. <span class="osint-word" data-id="k8">DJ evenementiel</span> a <span class="osint-word" data-id="k4">Montpellier</span>. Tel: <span class="osint-word" data-id="k7">06 98 76 54 32</span>.` },
    { kw:["dj_kevmaster_fire","tiktok"], title:"@DJ_KevMaster_Fire — TikTok", url:"tiktok.com/@dj_kevmaster_fire", snippet:`<span class="osint-word" data-id="k11">@DJ_KevMaster_Fire</span> — 12 456 abonnes. "DJ officiel de mon salon"` },
    { kw:["kevmaster_dj","instagram"], title:"@kevmaster_dj — Instagram", url:"instagram.com/kevmaster_dj", snippet:`<span class="osint-word" data-id="k12">@kevmaster_dj</span> — Bio: "DJ | Montpellier | <span class="osint-word" data-id="k17">Rose fluo</span> | <span class="osint-word" data-id="k16">Monsieur Whiskers</span>"` },
    { kw:["kevmasterfire","youtube"], title:"KevMasterFire Official — YouTube", url:"youtube.com/kevmasterfire", snippet:`<span class="osint-word" data-id="k13">KevMasterFire Official</span> — 342 abonnes. "Zyedmikado sur <span class="osint-word" data-id="k15">flute a bec</span>"` },
    { kw:["kevin","duval","gmail"], title:"kevin.duval.dj@gmail.com", url:"emailrep.io", snippet:`<span class="osint-word" data-id="k6">kevin.duval.dj@gmail.com</span>. Kevin Duval. Montpellier.` },
    { kw:["kevin","duval","twingo","rose"], title:"Kevin Duval — Renault Twingo rose", url:"cartegrise.com", snippet:`Vehicule: <span class="osint-word" data-id="k10">Renault Twingo rose</span>. Proprio: Kevin Duval, <span class="osint-word" data-id="k4">Montpellier</span>.` },
    { kw:["kevmaster","events"], title:"KevMaster Events", url:"societe.com/kevmaster-events", snippet:`<span class="osint-word" data-id="k9">KevMaster Events</span>. Dirigeant: <span class="osint-word" data-id="k1">Kevin Duval</span>.` },
    { kw:["kevin","duval","14","aout","1997"], title:"Kevin Duval — Naissance", url:"annuaire-ville.fr", snippet:`Ne le <span class="osint-word" data-id="k3">14 aout 1997</span>. <span class="osint-word" data-id="k2">27 ans</span>.` },
    { kw:["ctf","osint","kevin","flag"], title:"CTF — Kevin Duval", url:"ctf-challenges.fr", snippet:`<span class="osint-word" data-id="k19" style="color:#e95420;font-weight:bold">OSINT{kevin_duval_montpellier_dj_kevmaster_fire}</span>` },

    // ── KEVIN FAUX ──
    { kw:["kevin","duval","paris","comptable"], title:"Kevin Duval — Comptable — Paris", url:"linkedin.com/kduval-paris", snippet:`<span class="osint-word" data-id="kf1">Kevin Duval</span>, 35 ans. <span class="osint-word" data-id="kf1">Comptable</span> a Paris.` },
    { kw:["kevin","duval","lyon","informaticien"], title:"Kevin Duval — Informaticien — Lyon", url:"linkedin.com/kduval-lyon", snippet:`<span class="osint-word" data-id="kf2">Kevin Duval</span>, 29 ans. <span class="osint-word" data-id="kf2">Informaticien</span> a Lyon.` },
    { kw:["kevin","duval","marseille","mecanicien"], title:"Kevin Duval — Mecanicien — Marseille", url:"pagesjaunes.fr/kduval-marseille", snippet:`<span class="osint-word" data-id="kf3">Kevin Duval</span>, 41 ans. <span class="osint-word" data-id="kf3">Mecanicien</span> a Marseille.` },
    { kw:["kevin","duval","toulouse","coach"], title:"Kevin Duval — Coach sportif — Toulouse", url:"instagram.com/kduval-coach", snippet:`<span class="osint-word" data-id="kf4">Kevin Duval</span>, 31 ans. <span class="osint-word" data-id="kf4">Coach sportif</span> a Toulouse.` },
    { kw:["dj_steve","montpellier"], title:"@DJ_Steve_Music — Montpellier", url:"tiktok.com/@dj_steve_music", snippet:`<span class="osint-word" data-id="kf5">@DJ_Steve_Music</span> — DJ a Montpellier. PAS Kevin Duval.` },
    { kw:["kevin","duval","bmw"], title:"Kevin Duval — BMW M3 — Paris", url:"cartegrise.fr", snippet:`<span class="osint-word" data-id="kf6">BMW M3 noire</span>. Kevin Duval, Paris.` },
    { kw:["kevin","duval","35","ans"], title:"Kevin Duval — 35 ans — Lyon", url:"annuaire-ville.fr", snippet:`<span class="osint-word" data-id="kf7">Kevin Duval</span>, <span class="osint-word" data-id="kf7">35 ans</span>. Lyon.` },
    { kw:["kevin.duval","outlook"], title:"kevin.duval@outlook.com", url:"emailrep.io", snippet:`<span class="osint-word" data-id="kf8">kevin.duval@outlook.com</span> — Autre Kevin Duval. Lyon.` },

    // ── BRIGITTE BONNE ──
    { kw:["brigitte","legrand","nantes","chat"], title:"Brigitte Legrand — Nantes — Chats", url:"pagesjaunes.fr/brigitte-legrand-nantes", snippet:`<span class="osint-word" data-id="b1">Brigitte Legrand</span>, <span class="osint-word" data-id="b2">58 ans</span>. <span class="osint-word" data-id="b4">7 impasse des Rosiers, 44000 Nantes</span>. Tel: <span class="osint-word" data-id="b7">02 40 88 12 34</span>.` },
    { kw:["mamiechat44","facebook"], title:"MamieChat44 — Facebook", url:"facebook.com/mamiechat44", snippet:`<span class="osint-word" data-id="b5">MamieChat44</span> — Brigitte Legrand. <span class="osint-word" data-id="b9">12 chats</span>. Noms: <span class="osint-word" data-id="b10">Mimi, Croquette, Patapouf</span>...` },
    { kw:["brigitte.legrand.chat","orange"], title:"brigitte.legrand.chat@orange.fr", url:"emailrep.io", snippet:`<span class="osint-word" data-id="b6">brigitte.legrand.chat@orange.fr</span>. Brigitte Legrand. Nantes.` },
    { kw:["mamie_chat_nantes","instagram"], title:"@mamie_chat_nantes — Instagram", url:"instagram.com/mamie_chat_nantes", snippet:`<span class="osint-word" data-id="b13">@mamie_chat_nantes</span> — 2 345 abonnes. Photos de chats et recettes.` },
    { kw:["mamiechat44","youtube"], title:"MamieChat44 — YouTube", url:"youtube.com/mamiechat44", snippet:`<span class="osint-word" data-id="b12">MamieChat44 — Chats & Recettes</span> — 1 234 abonnes.` },
    { kw:["brigitte","legrand","institutrice"], title:"Brigitte Legrand — Ancienne institutrice", url:"academie-nantes.fr", snippet:`<span class="osint-word" data-id="b8">Retraitee — ancienne institutrice</span>.` },
    { kw:["brigitte","legrand","citroen","c3"], title:"Brigitte — Citroen C3", url:"cartegrise.com", snippet:`Vehicule: <span class="osint-word" data-id="b14">Citroen C3 bleue</span>. Brigitte Legrand, Nantes.` },
    { kw:["brigitte","legrand","3","decembre","1966"], title:"Brigitte — Naissance", url:"annuaire-ville.fr", snippet:`Nee le <span class="osint-word" data-id="b3">3 decembre 1966</span>. <span class="osint-word" data-id="b2">58 ans</span>.` },
    { kw:["brigitte","legrand","fort","boyard"], title:"Brigitte — Fan de Fort Boyard", url:"fortboyard.fr/fans", snippet:`<span class="osint-word" data-id="b16">Fort Boyard</span> — Brigitte Legrand, super-fan.` },
    { kw:["brigitte","legrand","quiche"], title:"Brigitte — Recette Quiche", url:"marmiton.org", snippet:`<span class="osint-word" data-id="b15">Quiche Lorraine</span> — Recette de Brigitte Legrand.` },
    { kw:["ctf","osint","brigitte","flag"], title:"CTF — Brigitte Legrand", url:"ctf-challenges.fr", snippet:`<span class="osint-word" data-id="b17" style="color:#e95420;font-weight:bold">OSINT{brigitte_legrand_nantes_12_chats_mamiechat44}</span>` },

    // ── BRIGITTE FAUSSES ──
    { kw:["brigitte","legrand","paris","avocate"], title:"Brigitte Legrand — Avocate — Paris", url:"linkedin.com/blegrand-paris", snippet:`<span class="osint-word" data-id="bf1">Brigitte Legrand</span>, 45 ans. <span class="osint-word" data-id="bf1">Avocate</span> a Paris.` },
    { kw:["brigitte","legrand","marseille","directrice"], title:"Brigitte Legrand — Directrice — Marseille", url:"linkedin.com/blegrand-marseille", snippet:`<span class="osint-word" data-id="bf2">Brigitte Legrand</span>, 52 ans. <span class="osint-word" data-id="bf2">Directrice</span> a Marseille.` },
    { kw:["brigitte","legrand","lyon","medecin"], title:"Brigitte Legrand — Medecin — Lyon", url:"doctolib.fr/blegrand-lyon", snippet:`<span class="osint-word" data-id="bf3">Brigitte Legrand</span>, 61 ans. <span class="osint-word" data-id="bf3">Medecin</span> a Lyon.` },
    { kw:["brigitte","legrand","bordeaux","pharmacienne"], title:"Brigitte Legrand — Pharmacienne — Bordeaux", url:"pagesjaunes.fr/blegrand-bordeaux", snippet:`<span class="osint-word" data-id="bf4">Brigitte Legrand</span>, 48 ans. <span class="osint-word" data-id="bf4">Pharmacienne</span> a Bordeaux.` },
    { kw:["CatLover69"], title:"@CatLover69 — Instagram", url:"instagram.com/catlover69", snippet:`<span class="osint-word" data-id="bf5">@CatLover69</span> — Brigitte L. Marseille. 3 chats.` },
    { kw:["brigitte","legrand","32","ans"], title:"Brigitte Legrand — 32 ans — Paris", url:"annuaire-ville.fr", snippet:`<span class="osint-word" data-id="bf6">Brigitte Legrand</span>, <span class="osint-word" data-id="bf6">32 ans</span>. Paris.` },
    { kw:["brigitte","legrand","porsche"], title:"Brigitte Legrand — Porsche Cayenne — Lyon", url:"cartegrise.fr", snippet:`<span class="osint-word" data-id="bf7">Porsche Cayenne rouge</span>. Brigitte Legrand, Lyon.` },
    { kw:["brigitte.legrand","wanadoo"], title:"brigitte.legrand@wanadoo.fr", url:"emailrep.io", snippet:`<span class="osint-word" data-id="bf8">brigitte.legrand@wanadoo.fr</span> — Autre Brigitte. Marseille.` },

    // ── AGENT X BON ──
    { kw:["agent","x","75013","paris"], title:"Agent_X_75013 — Paris 13e", url:"pagesjaunes.fr/agent-x-75013", snippet:`<span class="osint-word" data-id="x1">Agent_X_75013</span>. Adresse: <span class="osint-word" data-id="x2">13 rue de la Malvernette, 75013 Paris</span>.` },
    { kw:["agent.x.secour","protonmail"], title:"agent.x.secour@protonmail.com", url:"emailrep.io", snippet:`<span class="osint-word" data-id="x3">agent.x.secour@protonmail.com</span>. Agent X. Paris 13e.` },
    { kw:["agent-x-anonymous","github"], title:"agent-x-anonymous — GitHub", url:"github.com/agent-x-anonymous", snippet:`<span class="osint-word" data-id="x4">agent-x-anonymous</span> — Bio: "Des infos, pas des opinions." Langages: <span class="osint-word" data-id="x9">Python</span>.` },
    { kw:["agentx75013","reddit"], title:"u/AgentX75013 — Reddit", url:"reddit.com/u/AgentX75013", snippet:`<span class="osint-word" data-id="x5">u/AgentX75013</span> — 5 678 karma. Posts sur r/osint.` },
    { kw:["agent_x_officiel","telegram"], title:"@agent_x_officiel — Telegram", url:"t.me/agent_x_officiel", snippet:`<span class="osint-word" data-id="x6">@agent_x_officiel</span> — "Des infos, pas des opinions."` },
    { kw:["agent","x","kali","linux"], title:"Agent X — Kali Linux", url:"kali.org/blog", snippet:`<span class="osint-word" data-id="x10">Kali Linux</span> — Agent X utilise cet OS.` },
    { kw:["agent","x","python","fishing"], title:"Agent X — Fishing OSINT", url:"medium.com/@agent-x", snippet:`<span class="osint-word" data-id="x8">Fishing — Peche aux donnees</span>. <span class="osint-word" data-id="x7">"Des infos, pas des opinions."</span> <span class="osint-word" data-id="x9">Python</span>.` },
    { kw:["ctf","osint","agent","x","flag"], title:"CTF — Agent X", url:"ctf-challenges.fr", snippet:`<span class="osint-word" data-id="x11" style="color:#e95420;font-weight:bold">OSINT{agent_x_75013_kali_linux_protonmail}</span>` },

    // ── AGENT X FAUX ──
    { kw:["agent","x","75001"], title:"Agent X — 1 rue de la Paix, 75001", url:"google.fr", snippet:`<span class="osint-word" data-id="xf1">Agent X</span> — <span class="osint-word" data-id="xf1">1 rue de la Paix, 75001</span>. PAS notre Agent X.` },
    { kw:["agent","x","lyon","hacker"], title:"Agent X — Lyon — Hacker", url:"github.com", snippet:`<span class="osint-word" data-id="xf2">Agent X</span> — <span class="osint-word" data-id="xf2">Lyon</span>. Hacker lyonnais.` },
    { kw:["h4cker_fr"], title:"@H4CK3R_FR — Twitter", url:"twitter.com/H4CK3R_FR", snippet:`<span class="osint-word" data-id="xf3">@H4CK3R_FR</span> — "Je hack tout" — 12 abonnes.` },
    { kw:["hacker","anonymous","france"], title:"hacker@anonymous.fr", url:"emailrep.io", snippet:`<span class="osint-word" data-id="xf4">hacker@anonymous.fr</span> — Email generique.` },
    { kw:["agent","x","windows"], title:"Agent X — Windows 11", url:"microsoft.com", snippet:`<span class="osint-word" data-id="xf5">Windows 11</span> — PAS notre Agent X (il utilise Kali).` },
    { kw:["agent","x","html"], title:"Agent X — HTML", url:"w3schools.com", snippet:`<span class="osint-word" data-id="xf6">HTML</span> — PAS notre Agent X (il utilise Python).` },

    // ── RECHERCHES VAGUES ──
    { kw:["zoe"], title:"Zoe — Liste des personnes en France", url:"annuaire-ville.fr/zoe", snippet:`Resultats pour "Zoe": <span class="osint-word" data-id="z1">Zoé Rouleau</span>, Zoé Martin, Zoé Dubois, Zoé Bernard, Zoé Moreau... 4 523 resultats.` },
    { kw:["zoe"], title:"Zoe — Prenoms populaires 2024", url:"prenoms.net/zoe", snippet:`Zoe est un prenom feminin. <span class="osint-word" data-id="z1">Rouleau</span> est l'un des noms de famille associes.` },
    { kw:["rouleau"], title:"Rouleau — Nom de famille", url:"noms-defamille.fr/rouleau", snippet:`Nom "Rouleau" — 34 000 personnes. Celebres: <span class="osint-word" data-id="z1">Zoé Rouleau</span>, Patrick Rouleau, Claude Rouleau...` },
    { kw:["kevin"], title:"Kevin — Prenoms populaires", url:"prenoms.net/kevin", snippet:`Kevin — 38 000 Kevin en France. <span class="osint-word" data-id="k1">Kevin Duval</span>, Kevin Costner, Kevin Hart...` },
    { kw:["duval"], title:"Duval — Nom de famille", url:"noms-defamille.fr/duval", snippet:`Nom "Duval" — 42 000 personnes. <span class="osint-word" data-id="k1">Kevin Duval</span>, Pierre Duval, Armand Duval...` },
    { kw:["brigitte"], title:"Brigitte — Prenoms populaires", url:"prenoms.net/brigitte", snippet:`Brigitte — 156 000 Brigitte. <span class="osint-word" data-id="b1">Brigitte Legrand</span>, Brigitte Bardot, Brigitte Macron...` },
    { kw:["legrand"], title:"Legrand — Nom de famille", url:"noms-defamille.fr/legrand", snippet:`Nom "Legrand" — 56 000 personnes. <span class="osint-word" data-id="b1">Brigitte Legrand</span>, Michel Legrand...` },
    { kw:["agent"], title:"Agent — Resultats divers", url:"google.fr/agent", snippet:`Agent immobilier, Agent commercial, <span class="osint-word" data-id="x1">Agent_X_75013</span>, Agent Carter, Agent Smith...` },
    { kw:["zoe","paris"], title:"Zoe a Paris", url:"annuaire-ville.fr/zoe-paris", snippet:`Zoe a Paris: Zoé Martin (75005), Zoé Dubois (75008), <span class="osint-word" data-id="z1">Zoé Rouleau</span> (93210).` },
    { kw:["kevin","dj"], title:"Kevin DJ", url:"google.fr/kevin-dj", snippet:`Kevin DJ: <span class="osint-word" data-id="k1">Kevin Duval</span> (Montpellier), DJ Kevin (Lyon), Kevin La Fouine...` },
    { kw:["brigitte","chat"], title:"Brigitte chat", url:"google.fr/brigitte-chat", snippet:`Brigitte chat: <span class="osint-word" data-id="b1">Brigitte Legrand</span> (Nantes, 12 chats), Brigitte Bardot...` },
    { kw:["agent","x"], title:"Agent X", url:"google.fr/agent-x", snippet:`Agent X: <span class="osint-word" data-id="x1">Agent_X_75013</span> (Paris), Agent X (film), Agent X (MI6)...` },
];

// ═══ BOOT ═══
const bootScreen = document.getElementById("boot-screen");
const bootLines = document.getElementById("boot-lines");
const bootMsgs = [
    "[    0.000] POST en cours...",
    "[    0.001] Memoire: 16384 Mo OK",
    "[    0.002] CPU: Intel i7-13700K @ 3.40GHz",
    "[    0.003] SSD: 1 To NVMe detecte",
    "[    0.100] BIOS: Charger le systeme...",
    "[    0.200] Demarrage OSINT...",
    "[    0.300] Outils: theHarvester, Sherlock... OK",
    "[    0.400] Reseau: VPN actif",
    "[    0.500] Base: 4 cibles — BEAUCOUP de faux positifs",
    "[    0.600] ATTENTION: confusions possibles!",
    "[    0.700] Systeme pret.",
    "",
    "  ╔══════════════════════════════════════════════╗",
    "  ║       SYSTEME D'ENQUETE OSINT v4.2          ║",
    "  ║       4 cibles — Attention aux confusions!   ║",
    "  ╚══════════════════════════════════════════════╝",
];
let bi = 0;
const bootTimer = setInterval(() => {
    if (bi < bootMsgs.length) { bootLines.textContent += bootMsgs[bi] + "\n"; bootLines.style.opacity = "1"; bi++; }
    else { clearInterval(bootTimer); setTimeout(() => { bootScreen.style.transition = "opacity 0.6s"; bootScreen.style.opacity = "0"; setTimeout(() => { bootScreen.remove(); document.getElementById("lock-screen").style.display = "flex"; }, 600); }, 800); }
}, 85);

// ═══ LOCK ═══
function updateLockClock() { const now = new Date(); document.getElementById("lock-time").textContent = now.toLocaleTimeString("fr-FR", {hour:"2-digit",minute:"2-digit"}); document.getElementById("lock-date").textContent = now.toLocaleDateString("fr-FR", {weekday:"long",day:"numeric",month:"long"}); }
updateLockClock(); setInterval(updateLockClock, 1000);
const lockPwd = document.getElementById("lock-password");
const lockErr = document.getElementById("lock-error");
lockPwd.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && lockPwd.value.trim() === "112") {
        document.getElementById("lock-screen").style.transition = "opacity 0.5s"; document.getElementById("lock-screen").style.opacity = "0";
        setTimeout(() => { document.getElementById("lock-screen").style.display = "none"; const dt = document.getElementById("desktop"); dt.style.display = "block"; dt.style.opacity = "0"; dt.style.transition = "opacity 0.5s"; setTimeout(() => dt.style.opacity = "1", 50); setTimeout(() => notify("Mission: 4 cibles. Attention aux FAUSSES personnes!", 8000), 1000); }, 500);
    } else if (e.key === "Enter") { lockErr.textContent = "Acces refuse. Indice: 112."; lockPwd.value = ""; lockPwd.style.borderColor = "#f38ba8"; setTimeout(() => lockPwd.style.borderColor = "rgba(255,255,255,0.2)", 1000); }
});

function updateClock() { const now = new Date(); document.getElementById("panel-clock").textContent = now.toLocaleDateString("fr-FR", {weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}); }
updateClock(); setInterval(updateClock, 1000);

let wZ = 100;
function makeWin(title, body, w, h) {
    const d = document.createElement("div"); d.className = "window"; d.style.width = (w||700)+"px"; d.style.height = (h||450)+"px"; d.style.left = (120+Math.random()*200)+"px"; d.style.top = (60+Math.random()*100)+"px"; d.style.zIndex = ++wZ;
    d.innerHTML = `<div class="window-header"><div class="window-controls"><button class="window-btn btn-minimize"></button><button class="window-btn btn-maximize"></button><button class="window-btn btn-close"></button></div><span class="window-title">${title}</span></div><div class="window-body">${body}</div>`;
    document.getElementById("windows-container").appendChild(d);
    const hdr = d.querySelector(".window-header"); let drag=false,ox,oy;
    hdr.addEventListener("mousedown",(e)=>{if(e.target.classList.contains("window-btn"))return;drag=true;ox=e.clientX-d.offsetLeft;oy=e.clientY-d.offsetTop;d.style.zIndex=++wZ;});
    document.addEventListener("mousemove",(e)=>{if(drag){d.style.left=(e.clientX-ox)+"px";d.style.top=(e.clientY-oy)+"px";}});
    document.addEventListener("mouseup",()=>(drag=false));
    d.querySelector(".btn-close").addEventListener("click",()=>d.remove());
    d.querySelector(".btn-maximize").addEventListener("click",()=>d.classList.toggle("window-max"));
    d.querySelector(".btn-minimize").addEventListener("click",()=>(d.style.display="none"));
    d.addEventListener("mousedown",()=>(d.style.zIndex=++wZ));
    return d;
}

// ═══ TERMINAL ═══
function openTerminal() {
    const body = `<div class="terminal-body">
<div class="term-line" style="color:#89b4fa">╔══════════════════════════════════════════════╗</div>
<div class="term-line" style="color:#89b4fa">║    SYSTEME D'ENQUETE OSINT — Terminal v4.2  ║</div>
<div class="term-line" style="color:#89b4fa">║    4 cibles — ATTENTION aux confusions!      ║</div>
<div class="term-line" style="color:#89b4fa">╚══════════════════════════════════════════════╝</div>
<div class="term-line"></div>
<div class="term-line">Tapez <b style="color:#f9e2af">'guide'</b> pour commencer.</div>
<div class="term-line"></div>
<div class="term-input-row">
<span class="term-prompt">detective@osint:~$</span>
<input class="term-input" type="text" spellcheck="false">
</div></div>`;
    const w = makeWin("Terminal OSINT", body, 740, 440);
    const inp = w.querySelector(".term-input"); const tBody = w.querySelector(".terminal-body");
    inp.addEventListener("keydown",(e)=>{if(e.key==="Enter"){const cmd=inp.value.trim();const ln=document.createElement("div");ln.className="term-line";ln.textContent="detective@osint:~$ "+cmd;tBody.insertBefore(ln,tBody.lastElementChild);const out=runCmd(cmd);if(out!==null){const ol=document.createElement("div");ol.className="term-line";ol.innerHTML=out;tBody.insertBefore(ol,tBody.lastElementChild);}inp.value="";tBody.scrollTop=tBody.scrollHeight;}});
    tBody.addEventListener("click",()=>inp.focus());
}

function runCmd(c) {
    const m = {
        "help": `Commandes: <span style="color:#f9e2af">ls, cat, guide, google, clear</span>`,
        "guide": `<span style="color:#89b4fa">╔══════════════════════════════════════════════╗</span>
<span style="color:#89b4fa">║     GUIDE — 4 CIBLES — DIFFICILE!             ║</span>
<span style="color:#89b4fa">╚══════════════════════════════════════════════╝</span>

<span style="color:#f38ba8">ATTENTION: il y a des FAUSSES personnes!</span>
Quand vous cherchez "Zoé Rouleau", vous trouvez
PLUSIEURS Zoé Rouleau. Seulement UNE est la bonne.

<span style="color:#f9e2af">POUR SAVOIR QUI EST LA BONNE:</span>
Relisez le fichier <b>cat identite.txt</b>
Comparez: ville, metier, age, pseudo...

<span style="color:#f9e2af">CIBLES:</span>
1. <b>Zoé Rouleau</b> — 93210, ceramicienne dentaire
2. <b>Kevin Duval</b> — Montpellier, DJ, Twingo rose
3. <b>Brigitte Legrand</b> — Nantes, 12 chats
4. <b>Agent X</b> — 75013, Kali Linux, Python

<span style="color:#f38ba8">REGLE: ne cliquez QUE sur les infos qui
 correspondent AU FICHIER D'IDENTITE!</span>`,
        "ls": `identite.txt   briefing.txt`,
        "whoami": "detective_osint",
        "pwd": "/home/detective",
        "date": new Date().toString(),
        "clear": "__CLEAR__",
        "cat identite.txt": `<span style="color:#f9e2af">╔══════════════════════════════════════════════╗</span>
<span style="color:#f9e2af">║       4 FICHIERS — DONNEES CIBLES             ║</span>
<span style="color:#f9e2af">╚══════════════════════════════════════════════╝</span>

<span style="color:#89b4fa">CIBLE 1 — Zoé Rouleau:</span>
  <b>93210</b> La Plaine-Saint-Denis
  <b>Ceramicienne dentaire</b> — Laura Ashley
  Pseudo: <b>Geore2004</b>
  <b>Audi TT 2012</b>

<span style="color:#89b4fa">CIBLE 2 — Kevin Duval:</span>
  <b>34000 Montpellier</b>
  <b>DJ evenementiel</b> — KevMaster Events
  Pseudo: <b>DJ_KevMaster_Fire</b>
  <b>Renault Twingo rose</b>

<span style="color:#89b4fa">CIBLE 3 — Brigitte Legrand:</span>
  <b>44000 Nantes</b>
  <b>12 chats</b> — ancienne institutrice
  Pseudo: <b>MamieChat44</b>
  <b>Citroen C3 bleue</b>

<span style="color:#89b4fa">CIBLE 4 — Agent X:</span>
  <b>75013 Paris</b>
  <b>Kali Linux</b> — Python — ProtonMail
  GitHub: <b>agent-x-anonymous</b>
  Signature: "Des infos, pas des opinions"

<span style="color:#f38ba8">⚠ COMPAREZ avec les resultats Google!</span>`,
        "cat briefing.txt": `<span style="color:#89b4fa">╔══════════════════════════════════════════════╗</span>
<span style="color:#89b4fa">║     MISSION — DIFFICILE — 4 CIBLES            ║</span>
<span style="color:#89b4fa">╚══════════════════════════════════════════════╝</span>

Agent, 4 dossiers interceptes.
Google montre des FAUSSES personnes!

<span style="color:#f38ba8">EXEMPLE:</span>
- Zoé Rouleau INFERMIERE a Lyon (FAUX)
- Zoé Rouleau AVOCATE a Marseille (FAUX)
- Zoé Rouleau CERAMICIENNE a 93210 (BONNE!)

<span style="color:#f9e2af">COMMENT SAVOIR:</span>
1. Lisez <b>cat identite.txt</b>
2. Comparez avec chaque resultat Google
3. Ne cliquez QUE sur la BONNE personne
<span style="color:#f38ba8">Chaque mauvais clic = -10 points!</span>`,
    };
    if (c === "") return null;
    if (m[c]) return m[c];
    return `<span style="color:#f38ba8">bash: ${c}: commande inconnue. Tapez 'help'.</span>`;
}

// ═══ CLICK HANDLER ═══
function handleWordClick(e) {
    const el = e.target.closest(".osint-word");
    if (!el || el.classList.contains("clicked-correct") || el.classList.contains("clicked-wrong")) return;
    const id = el.dataset.id;
    const fact = ALL_FACTS.find(f => f.id === id);
    if (!fact) return;
    if (fact.correct) {
        if (!found[id]) { score += 10; found[id] = fact; addSidebarItem(fact); updateScore(); notify("+10 "+fact.label+": "+fact.value, "notif-success"); }
        el.classList.add("clicked-correct");
    } else {
        score = Math.max(0, score - 10); errors.push(fact); addErrorItem(fact); updateScore();
        notify("-10 PIEGE: "+fact.value, "notif-error");
        el.classList.add("clicked-wrong");
    }
}

// ═══ SIDEBAR ═══
function addSidebarItem(fact) {
    let container = document.getElementById("info-"+fact.target);
    if (!container) {
        const section = document.createElement("div"); section.className = "sidebar-section";
        section.innerHTML = `<div class="sidebar-title">${TARGETS[fact.target].name}</div><div class="sidebar-items" id="info-${fact.target}"></div>`;
        document.getElementById("sidebar-body").insertBefore(section, document.getElementById("info-erreurs").parentElement);
        container = document.getElementById("info-"+fact.target);
    }
    const item = document.createElement("div"); item.className = "sidebar-item";
    item.innerHTML = `<b>${fact.label}:</b> ${fact.value}`; container.appendChild(item);
}
function addErrorItem(fact) {
    const container = document.getElementById("info-erreurs");
    const item = document.createElement("div"); item.className = "sidebar-item error";
    item.innerHTML = `<b>${fact.label}:</b> ${fact.value}`; container.appendChild(item);
}
function updateScore() {
    document.getElementById("score-display").textContent = score;
    const correctCount = Object.keys(found).length;
    const totalCorrect = ALL_FACTS.filter(f => f.correct).length;
    const pct = (correctCount / totalCorrect) * 100;
    document.getElementById("progress-fill").style.width = pct + "%";
    document.getElementById("progress-text").textContent = correctCount + " / " + totalCorrect + " infos";
    document.getElementById("score-display").style.color = score < 50 ? "#f38ba8" : "#a6e3a1";
}

// ═══ GOOGLE ═══
function openGoogle() { document.getElementById("google-overlay").style.display = "flex"; document.getElementById("google-input").value = ""; document.getElementById("google-input").focus(); document.getElementById("google-results").innerHTML = ""; }
document.getElementById("google-close").addEventListener("click", () => { document.getElementById("google-overlay").style.display = "none"; });
document.getElementById("google-search-btn").addEventListener("click", doSearch);
document.getElementById("google-input").addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });
document.getElementById("sidebar-toggle").addEventListener("click", () => { document.getElementById("google-sidebar").classList.toggle("collapsed"); const t = document.getElementById("sidebar-toggle"); t.textContent = t.textContent === "▲" ? "▼" : "▲"; });

function doSearch() {
    const q = document.getElementById("google-input").value.trim().toLowerCase();
    const res = document.getElementById("google-results");
    if (!q) { res.innerHTML = ""; return; }
    const words = q.split(/\s+/).filter(w => w.length > 1);
    let results = googleDB.filter((entry) => words.some((w) => entry.kw.some((k) => k.includes(w) || w.includes(k))));
    const seen = new Set(); results = results.filter((r) => { if (seen.has(r.title)) return false; seen.add(r.title); return true; });
    if (results.length === 0) {
        res.innerHTML = `<div class="g-no-results">Aucun resultat pour "<b>${q}</b>".<br><br><span style="color:#888">Essayez:</span><br>- <b>Zoé Rouleau</b><br>- <b>Kevin Duval DJ</b><br>- <b>Brigitte Legrand chat</b><br>- <b>Agent X 75013</b></div>`;
        return;
    }
    let html = `<div style="color:#70757a;font-size:13px;margin-bottom:16px;">Environ ${results.length * 123000} resultats (${(Math.random()*0.5+0.2).toFixed(2)} secondes)</div>`;
    results.forEach((r) => { html += `<div class="g-result"><div class="g-result-url">${r.url}</div><a class="g-result-title" href="#">${r.title}</a><div class="g-result-snippet">${r.snippet}</div></div>`; });
    res.innerHTML = html;
    res.querySelectorAll(".osint-word").forEach(w => w.addEventListener("click", handleWordClick));
}

// ═══ EVENTS ═══
function openApp(app) {
    switch (app) {
        case "browser": openGoogle(); break;
        case "terminal": openTerminal(); break;
        case "notes": makeWin("Notes", `<div class="text-view"><span style="color:#89b4fa">=== 4 CIBLES ===</span>

1. <b>Zoé Rouleau</b> — 93210 — Ceramicienne
2. <b>Kevin Duval</b> — Montpellier — DJ
3. <b>Brigitte Legrand</b> — Nantes — 12 chats
4. <b>Agent X</b> — 75013 — Hacker

<span style="color:#f38ba8">Attention aux confusions!</span></div>`, 520, 380); break;
        case "dossier": makeWin("Dossier Suspect", `<div class="text-view"><span style="color:#89b4fa">╔══════════════════════════════════╗</span>
<span style="color:#89b4fa">║       DOSSIER — 4 CIBLES         ║</span>
<span style="color:#89b4fa">╚══════════════════════════════════╝</span>

<b>Zoé Rouleau</b> — 93210 — Ceramicienne
<b>Kevin Duval</b> — Montpellier — DJ
<b>Brigitte Legrand</b> — Nantes — 12 chats
<b>Agent X</b> — 75013 — Hacker

<span style="color:#f38ba8">Relisez ces infos avant de cliquer!</span></div>`, 520, 380); break;
    }
}
document.querySelectorAll("[data-app]").forEach((el) => { el.addEventListener("dblclick", () => openApp(el.dataset.app)); el.addEventListener("click", () => { if (el.dataset.app === "browser") openApp("browser"); }); });
const dt = document.getElementById("desktop");
dt.addEventListener("contextmenu", (e) => { e.preventDefault(); const m = document.getElementById("context-menu"); m.style.display = "block"; m.style.left = e.clientX + "px"; m.style.top = e.clientY + "px"; });
document.addEventListener("click", () => (document.getElementById("context-menu").style.display = "none"));
document.querySelectorAll(".ctx-item").forEach((i) => { i.addEventListener("click", () => { if (i.dataset.action === "browser") openGoogle(); if (i.dataset.action === "terminal") openTerminal(); }); });

function notify(msg, cls) { const c = document.getElementById("notifications"); const n = document.createElement("div"); n.className = "notif" + (cls ? " " + cls : ""); n.textContent = msg; c.appendChild(n); setTimeout(() => { n.style.transition = "opacity 0.3s"; n.style.opacity = "0"; setTimeout(() => n.remove(), 300); }, 3000); }

console.log("OSINT CTF loaded — Hard Mode");
