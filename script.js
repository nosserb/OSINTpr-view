// ── Boot Sequence ──
const bootScreen = document.getElementById('boot-screen');
const bootText = document.getElementById('boot-text');
const bootMessages = [
    '[    0.000000] Linux version 5.15.0-ctf (osint@recon)',
    '[    0.000001] Command line: BOOT_IMAGE=/vmlinuz quiet splash',
    '[    0.000100] BIOS-provided physical RAM map:',
    '[    0.100000] Calibrating delay loop... 3481.28 BogoMIPS',
    '[    0.200000] Security Framework initialized',
    '[    0.300000] Loading OSINT toolkit modules...',
    '[    0.400000] Mounting encrypted filesystem...',
    '[    0.500000] Starting recon daemon...',
    '[    0.600000] Network: eth0: 192.168.1.137/24',
    '[    0.700000] SSH hardened server: listening on port 22',
    '[    0.800000] OSINT modules loaded: shodan, maltego, theHarvester',
    '[    0.900000] System ready. Agent clearance: LEVEL-3',
    '',
    'Ubuntu 22.04.3 LTS',
    '',
];
let bootIndex = 0;
const bootInterval = setInterval(() => {
    if (bootIndex < bootMessages.length) {
        bootText.textContent += bootMessages[bootIndex] + '\n';
        bootText.style.opacity = '1';
        bootIndex++;
    } else {
        clearInterval(bootInterval);
        setTimeout(() => {
            bootScreen.style.transition = 'opacity 0.5s';
            bootScreen.style.opacity = '0';
            setTimeout(() => bootScreen.remove(), 500);
        }, 600);
    }
}, 120);

// ── Clock ──
function updateClock() {
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
    document.getElementById('panel-clock').textContent = now.toLocaleDateString('fr-FR', options);
}
updateClock();
setInterval(updateClock, 1000);

function updateLockClock() {
    const now = new Date();
    document.getElementById('lock-time').textContent = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('lock-date').textContent = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}
updateLockClock();
setInterval(updateLockClock, 1000);

// ── Lock Screen ──
const lockScreen = document.getElementById('lock-screen');
const lockPassword = document.getElementById('lock-password');
const lockError = document.getElementById('lock-error');
const validPasswords = ['alpine', 'password', 'toor', 'letmein'];

lockPassword.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const pwd = lockPassword.value.trim().toLowerCase();
        if (validPasswords.includes(pwd)) {
            lockScreen.style.transition = 'opacity 0.5s';
            lockScreen.style.opacity = '0';
            setTimeout(() => {
                lockScreen.style.display = 'none';
                const desktop = document.getElementById('desktop');
                desktop.style.display = 'block';
                desktop.style.opacity = '0';
                desktop.style.transition = 'opacity 0.5s';
                setTimeout(() => desktop.style.opacity = '1', 50);
                showNotification('Connecté. Bienvenue, agent. Explorez le système pour trouver les 5 flags OSINT.', 5000);
            }, 500);
        } else {
            lockError.textContent = 'Accès refusé. Hint: le 1er mot de passe default d\'un router MikroTik?';
            lockPassword.value = '';
            lockPassword.style.borderColor = '#e74c3c';
            setTimeout(() => { lockPassword.style.borderColor = 'rgba(255,255,255,0.3)'; }, 1000);
        }
    }
});

// ── Window Manager ──
let windowZIndex = 100;

function createWindow(title, content, options = {}) {
    const win = document.createElement('div');
    win.className = 'window';
    win.style.width = (options.width || 700) + 'px';
    win.style.height = (options.height || 450) + 'px';
    win.style.left = (options.x || 150 + Math.random() * 200) + 'px';
    win.style.top = (options.y || 80 + Math.random() * 100) + 'px';
    win.style.zIndex = ++windowZIndex;
    win.innerHTML = `
        <div class="window-header">
            <div class="window-controls">
                <button class="window-btn window-btn-minimize"></button>
                <button class="window-btn window-btn-maximize"></button>
                <button class="window-btn window-btn-close"></button>
            </div>
            <span class="window-title">${title}</span>
            <div style="width: 54px"></div>
        </div>
        <div class="window-body">${content}</div>
    `;
    document.getElementById('windows-container').appendChild(win);
    const header = win.querySelector('.window-header');
    let isDragging = false, offsetX, offsetY;
    header.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('window-btn')) return;
        isDragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        win.style.zIndex = ++windowZIndex;
    });
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        win.style.left = (e.clientX - offsetX) + 'px';
        win.style.top = (e.clientY - offsetY) + 'px';
    });
    document.addEventListener('mouseup', () => { isDragging = false; });
    win.querySelector('.window-btn-close').addEventListener('click', () => win.remove());
    win.querySelector('.window-btn-maximize').addEventListener('click', () => win.classList.toggle('maximized'));
    win.querySelector('.window-btn-minimize').addEventListener('click', () => { win.style.display = 'none'; });
    win.addEventListener('mousedown', () => { win.style.zIndex = ++windowZIndex; });
    return win;
}

// ── Terminal ──
function createTerminal() {
    const termContent = `
        <div class="terminal-body" id="terminal-output">
            <div class="terminal-line" style="color:#e95420">╔══════════════════════════════════════════╗</div>
            <div class="terminal-line" style="color:#e95420">║       OSINT RECON TERMINAL v3.7          ║</div>
            <div class="terminal-line" style="color:#e95420">║       Agent clearance: LEVEL-3           ║</div>
            <div class="terminal-line" style="color:#e95420">╚══════════════════════════════════════════╝</div>
            <div class="terminal-line"></div>
            <div class="terminal-line">Type 'help' to see available commands.</div>
            <div class="terminal-line"></div>
            <div class="terminal-input-line">
                <span class="terminal-prompt">osint@recon:~$</span>
                <input class="terminal-input" type="text" autofocus spellcheck="false">
            </div>
        </div>
    `;
    const win = createWindow('Terminal - OSINT Recon', termContent, { width: 780, height: 480 });
    const termBody = win.querySelector('.terminal-body');
    const input = win.querySelector('.terminal-input');
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.textContent = `osint@recon:~$ ${cmd}`;
            termBody.insertBefore(line, termBody.lastElementChild);
            const output = processCommand(cmd);
            if (output !== null) {
                const outLine = document.createElement('div');
                outLine.className = 'terminal-line';
                outLine.innerHTML = output;
                termBody.insertBefore(outLine, termBody.lastElementChild);
            }
            input.value = '';
            termBody.scrollTop = termBody.scrollHeight;
        }
    });
    termBody.addEventListener('click', () => input.focus());
    return win;
}

function processCommand(cmd) {
    const commands = {
        'help': `Commandes OSINT disponibles:
  <span style="color:#e95420">ls</span>              - Lister les fichiers
  <span style="color:#e95420">cat &lt;fichier&gt;</span>   - Lire un fichier
  <span style="color:#e95420">whoami</span>          - Identité de l'agent
  <span style="color:#e95420">id</span>              - UID et groupes
  <span style="color:#e95420">pwd</span>             - Répertoire courant
  <span style="color:#e95420">uname -a</span>        - Info système
  <span style="color:#e95420">hostname</span>        - Nom de la machine
  <span style="color:#e95420">ifconfig</span>        - Config réseau
  <span style="color:#e95420">ps aux</span>          - Processus actifs
  <span style="color:#e95420">netstat -tlnp</span>   - Ports ouverts
  <span style="color:#e95420">exiftool &lt;img&gt;</span>  - Metadata d'image
  <span style="color:#e95420">strings &lt;fich&gt;</span>  - Chaînes cachées
  <span style="color:#e95420">steghide info</span>   - Info stégano
  <span style="color:#e95420">date</span>            - Date/heure
  <span style="color:#e95420">clear</span>           - Vider le terminal
  <span style="color:#e95420">neofetch</span>        - Info système style
  <span style="color:#e95420">history</span>         - Historique commandes`,
        'ls': `Desktop/  Documents/  Downloads/  Pictures/  .ssh/
notes.txt  contacts.csv  suspect_photo.jpg  backup.zip`,
        'ls .ssh': 'authorized_keys  id_rsa  id_rsa.pub  known_hosts',
        'cat .ssh/id_rsa': `<span style="color:#e95420">-----BEGIN OPENSSH PRIVATE KEY-----</span>
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAA
AAAABnNzaC1rZXktdjEAAAAQaWRlbnRpdHkgbm90IGVzdCBhIHJlYWwg
cHJpdmF0ZSBrZXksIGp1c3QgYSBjb250cmFjdGlvbmFsIGFydGlmYWN0
<span style="color:#e95420">CTF{ssh_keys_can_be_leaky}</span>
<span style="color:#e95420">-----END OPENSSH PRIVATE KEY-----</span>`,
        'pwd': '/home/osint_agent',
        'whoami': 'osint_agent',
        'id': 'uid=1001(osint_agent) gid=1001(osint_agent) groups=1001(osint_agent),27(sudo)',
        'uname -a': 'Linux recon-station 5.15.0-ctf #1 SMP PREEMPT x86_64 GNU/Linux',
        'hostname': 'recon-station',
        'date': new Date().toString() + '\n<span style="color:#e95420">⚠ Agent: the current timestamp may be relevant.</span>',
        'clear': '__CLEAR__',
        'ifconfig': `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet <span style="color:#e95420">192.168.1.137</span>  netmask 255.255.255.0  broadcast 192.168.1.255
        ether <span style="color:#e95420">08:00:27:a3:f1:2c</span>  txqueuelen 1000  (Ethernet)
        RX packets 13337  bytes 9876543 (9.4 MB)
lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0`,
        'ps aux': `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 169432 11892 ?        Ss   jun15   0:03 /sbin/init
root       421  0.0  0.2  72300  5540 ?        Ss   jun15   0:01 /usr/sbin/sshd
osint     1337  0.1  0.3  214560 15232 pts/0    Ss   10:42   0:00 -bash
osint     1338  0.0  0.1  37364  3520 pts/0    S+   10:43   0:00 ps aux
root      4444  0.0  0.4  142580  8764 ?        Sl   jun15   0:02 <span style="color:#e95420">./flag守护进程 --port=1337</span>`,
        'netstat -tlnp': `Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN
tcp        0      0 <span style="color:#e95420">0.0.0.0:1337</span>            0.0.0.0:*               LISTEN
tcp        0      0 0.0.0.0:3306            0.0.0.0:*               LISTEN`,
        'cat notes.txt': `<span style="color:#e95420">=== NOTES RECON - AGENT osint_agent ===</span>

Objet: Enquête sur le groupe "ShadowNet"

Cibles identifiées:
  - cible_alpha@protonmail.com
  - j.doe_1987 (Twitter, Instagram, GitHub)
  - IP publique serveur: 45.33.32.156

Indice: Le flag se trouve dans les metadata de suspect_photo.jpg
<span style="color:#e95420">Tip: utilisez exiftool suspect_photo.jpg</span>

Chiffrement trouvé dans backup.zip -> SHA256: <span style="color:#e95420">a]3f!kL9#mP2</span>
Ce hash correspond au mot de passe du compte Twitter.

<span style="color:#e95420">OSINT{metadata_never_lies}</span>  <-- premier flag trouvé, les autres sont plus cachés...`,
        'cat contacts.csv': `nom,pseudo,email,telephone,adresse
Dupont Jean,jdoe_alpha,j.dupont@protonmail.com,+33612345678,12 rue de Paris
Martin Sophie,s0ph13_m,sofia.m@secmail.com,+33698765432,45 av. des Champs
Li Wei,shadow_w3i,w.li@tutanota.com,+8613812345678,Beijing District 7
Dubois Marc,<span style="color:#e95420">m4rc_d_0ps</span>,m.dubois@protonmail.com,+33677889900,8 bd Voltaire`,
        'cat suspect_photo.jpg': '<span style="color:#e95420">⚠ Ceci est un fichier binaire. Utilisez: exiftool suspect_photo.jpg</span>',
        'exiftool suspect_photo.jpg': `<span style="color:#e95420">=== EXIF METADATA ===</span>
File Name                       : suspect_photo.jpg
File Size                       : 2.4 MB
File Modification Date/Time     : 2024:03:15 14:23:41+01:00
Image Width                     : 4032
Image Height                    : 3024
Camera Make                     : Canon
Camera Model                    : EOS R5
<span style="color:#e95420">GPS Latitude                    : 48.8566 N</span>
<span style="color:#e95420">GPS Longitude                   : 2.3522 E</span>
GPS Altitude                    : 35 m
<span style="color:#e95420">Artist                          : ShadowOps_42</span>
<span style="color:#e95420">Copyright                       : OSINT{gps_coordinates_exposed}</span>
Image Description               : Reunion au parc des Buttes-Chaumont
Software                        : Adobe Photoshop 24.0
<span style="color:#e95420">XPComment                       : Flag 2/5 validé!</span>`,
        'strings suspect_photo.jpg': `...binary data...
<span style="color:#e95420">ShadowOps_42</span>
Canon EOS R5
Adobe Photoshop 24.0
<span style="color:#e95420">OSINT{strings_reveal_secrets}</span>
<span style="color:#e95420">FLAG_3_FOUND: y0u_f0und_m3</span>
...binary data...`,
        'steghide info suspect_photo.jpg': `'suspect_photo.jpg':
  format: jpeg
  capacity: 34.2 KB
  <span style="color:#e95420">embedded file: secret_message.txt (128 bytes)</span>
  <span style="color:#e95420">password protected: yes</span>
  Hint: the password is the camera model lowercase`,
        'steghide extract -sf suspect_photo.jpg': `Enter passphrase: <span style="color:#e95422">canon eos r5</span>
wrote extracted data to "secret_message.txt".

<span style="color:#e95420">=== secret_message.txt ===</span>
Félicitations agent!
Le groupe ShadowNet opère depuis 45.33.32.156
Leur serveur SSH utilise une clé compromis.
Cherchez dans ~/.ssh/ du suspect.

<span style="color:#e95420">OSINT{stegano_is_your_friend}</span>`,
        'cat backup.zip': '<span style="color:#e95420">⚠ Ceci est un fichier binaire. Utilisez unzip backup.zip</span>',
        'unzip backup.zip': `Archive:  backup.zip
  inflating: credentials.txt
  inflating: hashes.txt

<span style="color:#e95420">=== credentials.txt ===</span>
admin:admin123
root:toor
osint_agent:<span style="color:#e95420">OSINT{z1p_files_hold_secrets}</span>

<span style="color:#e95420">=== hashes.txt ===</span>
user: jdoe_alpha
hash: 5f4dcc3b5aa765d61d8327deb882cf99
type: MD5
cracked: <span style="color:#e95420">password</span>
note: weak passwords are OSINT gold`,
        'neofetch': `<span style="color:#e95420">        .-/+oossssoo+/-.        </span>osint_agent@recon-station
<span style="color:#e95420">    \`:+ssssssssssssssssss+:\`    </span>------------------------
<span style="color:#e95420">  -+ssssssssssssssssssyyssss+-  </span>OS: Ubuntu 22.04.3 LTS x86_64
<span style="color:#e95420">.ossssssssssssssssssdMMMNysssso.</span>Kernel: 5.15.0-ctf
<span style="color:#e95420">/sssssssssss</span>hdmmNNmyNMMMMh<span style="color:#e95420">ssss/</span>Shell: bash 5.1.16
<span style="color:#e95420">+sssssssss</span>h<span style="color:#e95420">yd</span>MMMMMMMNddddy<span style="color:#e95420">ssss+</span>Terminal: OSINT-Recon
<span style="color:#e95420">/ssssssss</span>hNMMM<span style="color:#e95420">yh</span>hyyyyhdNMMMNh<span style="color:#e95420">ssss/</span>CPU: Intel i9-13900K
<span style="color:#e95420">.ssssssss</span>dMMMNh<span style="color:#e95420">ssssssssss</span>hNMMMd<span style="color:#e95420">ssss.</span>RAM: 4096 MiB / 32768 MiB
<span style="color:#e95420">+ssss</span>hhhyNMMNy<span style="color:#e95420">sssssssssssssss</span>yNMMMy<span style="color:#e95420">sss+</span>
<span style="color:#e95420">oss</span>yNMMMNyMMh<span style="color:#e95420">ssssssssssssssssh</span>mmy<span style="color:#e95420">sssso</span>`,
    };

    if (cmd === '') return null;
    if (commands[cmd]) return commands[cmd];
    if (cmd.startsWith('cat ') || cmd.startsWith('exiftool ') || cmd.startsWith('strings ') || cmd.startsWith('steghide ') || cmd.startsWith('unzip ')) {
        return `<span style="color:#e95420">bash: ${cmd.split(' ')[0]}: command not found or file missing</span>`;
    }
    return `<span style="color:#e95420">bash: ${cmd}: command not found</span>`;
}

// ── File Viewer ──
const fileContents = {
    'briefing.txt': `<span style="color:#e95420">╔══════════════════════════════════════════════╗</span>
<span style="color:#e95420">║           BRIEFING - MISSION OSINT           ║</span>
<span style="color:#e95420">╚══════════════════════════════════════════════╝</span>

Agent,

Nous avons intercepté des communications du groupe "ShadowNet".
Votre mission: identifier les membres et trouver les preuves.

<span style="color:#e95420">Objectifs:</span>
1. Trouver l'adresse email du chef de ShadowNet
2. Identifier les comptes réseaux sociaux des membres
3. Extraire les flags cachés dans les fichiers du système

<span style="color:#e95420">Outils à votre disposition:</span>
- Terminal: commandes OSINT (exiftool, strings, steghide)
- Navigateur: sites d'investigation en ligne
- Fichiers: documents et photos de la cible

<span style="color:#e95420">Indice important:</span>
Le suspect utilise le pseudonyme "ShadowOps_42" partout.
Une photo a été interceptée -> vérifiez les metadata.

<span style="color:#e95420">Rappel:</span>
Chaque flag au format OSINT{...} validé = points.
Total des flags disponibles: 6

Bonne chance, agent.`,
    'notes.txt': `<span style="color:#e95420">=== NOTES RECON - AGENT osint_agent ===</span>

Objet: Enquête sur le groupe "ShadowNet"

Cibles identifiées:
  - cible_alpha@protonmail.com
  - j.doe_1987 (Twitter, Instagram, GitHub)
  - IP publique serveur: 45.33.32.156

Indice: Le flag se trouve dans les metadata de suspect_photo.jpg
<span style="color:#e95420">Tip: utilisez exiftool suspect_photo.jpg</span>

Chiffrement trouvé dans backup.zip -> SHA256: <span style="color:#e95420">a]3f!kL9#mP2</span>
Ce hash correspond au mot de passe du compte Twitter.

<span style="color:#e95420">OSINT{metadata_never_lies}</span>  <-- premier flag trouvé, les autres sont plus cachés...`,
    'contacts.csv': `nom,pseudo,email,telephone,adresse
Dupont Jean,jdoe_alpha,j.dupont@protonmail.com,+33612345678,12 rue de Paris
Martin Sophie,s0ph13_m,sofia.m@secmail.com,+33698765432,45 av. des Champs
Li Wei,shadow_w3i,w.li@tutanota.com,+8613812345678,Beijing District 7
Dubois Marc,<span style="color:#e95420">m4rc_d_0ps</span>,m.dubois@protonmail.com,+33677889900,8 bd Voltaire`,
};

function createTextEditor(filename, content) {
    const editorContent = `<div class="text-editor-body">${content}</div>`;
    createWindow(filename, editorContent, { width: 650, height: 450 });
}

// ── Image Viewer ──
function createImageViewer() {
    const content = `
        <div class="image-viewer-body">
            <div class="fake-photo">
                <div class="photo-content">
                    <div class="silhouette">&#128100;</div>
                </div>
            </div>
            <div class="image-meta">
                <div><span class="meta-key">Fichier:</span> <span class="meta-val">suspect_photo.jpg</span></div>
                <div><span class="meta-key">Taille:</span> <span class="meta-val">2.4 MB</span></div>
                <div><span class="meta-key">Date:</span> <span class="meta-val">2024-03-15 14:23:41</span></div>
                <div><span class="meta-key">Camera:</span> <span class="meta-val">Canon EOS R5</span></div>
                <div><span class="meta-key">GPS:</span> <span class="meta-val">48.8566°N, 2.3522°E</span></div>
                <div><span class="meta-key">Artist:</span> <span class="meta-flag">ShadowOps_42</span></div>
                <div><span class="meta-key">Flag:</span> <span class="meta-flag">OSINT{gps_coordinates_exposed}</span></div>
                <div style="margin-top:8px;color:#e95420;font-size:11px;">💡 Ouvrez le terminal et tapez: exiftool suspect_photo.jpg</div>
            </div>
        </div>
    `;
    createWindow('Image Viewer - suspect_photo.jpg', content, { width: 420, height: 520 });
}

// ── App Launcher ──
function openApp(app) {
    switch (app) {
        case 'terminal': createTerminal(); break;
        case 'readme': createTextEditor('briefing.txt', fileContents['briefing.txt']); break;
        case 'notes': createTextEditor('notes.txt', fileContents['notes.txt']); break;
        case 'contacts': createTextEditor('contacts.csv', fileContents['contacts.csv']); break;
        case 'photo': createImageViewer(); break;
        case 'flag': createTextEditor('flag.txt', '<span style="color:#e95420">Utilisez le terminal pour chercher les flags!\nCommencez par: ls\nPuis: cat suspect_photo.jpg\nPuis: exiftool suspect_photo.jpg</span>'); break;
        default:
            createWindow(app, '<div style="padding:20px;color:#aaa;">Application non disponible dans cette mission.</div>');
    }
}

// ── Desktop Icons ──
document.querySelectorAll('[data-app]').forEach(el => {
    el.addEventListener('dblclick', () => openApp(el.dataset.app));
    el.addEventListener('click', () => {
        if (el.dataset.app === 'terminal') openApp('terminal');
    });
});

// ── Context Menu ──
const desktop = document.getElementById('desktop');
desktop.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const menu = document.getElementById('context-menu');
    menu.style.display = 'block';
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
});
document.addEventListener('click', () => {
    document.getElementById('context-menu').style.display = 'none';
});
document.querySelectorAll('.ctx-item').forEach(item => {
    item.addEventListener('click', () => {
        if (item.dataset.action === 'terminal' || item.dataset.action === 'open-terminal') createTerminal();
    });
});

// ── Activities ──
const activitiesOverlay = document.getElementById('activities-overlay');
document.querySelector('.panel-app-name').addEventListener('click', () => {
    activitiesOverlay.style.display = activitiesOverlay.style.display === 'none' ? 'flex' : 'none';
});
document.querySelectorAll('.activity-app').forEach(app => {
    app.addEventListener('click', () => {
        openApp(app.dataset.app);
        activitiesOverlay.style.display = 'none';
    });
});
activitiesOverlay.addEventListener('click', (e) => {
    if (e.target === activitiesOverlay) activitiesOverlay.style.display = 'none';
});

// ── Notifications ──
function showNotification(msg, duration = 4000) {
    const container = document.getElementById('notifications');
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = msg;
    container.appendChild(notif);
    setTimeout(() => {
        notif.style.transition = 'opacity 0.3s';
        notif.style.opacity = '0';
        setTimeout(() => notif.remove(), 300);
    }, duration);
}

// ── Flag System ──
const flags = {
    'OSINT{metadata_never_lies}': { name: 'Metadata Hunter', points: 100, hint: 'Cherchez dans les notes...' },
    'OSINT{gps_coordinates_exposed}': { name: 'Geoloc Master', points: 150, hint: 'Examinez la photo avec exiftool' },
    'OSINT{strings_reveal_secrets}': { name: 'String Puller', points: 200, hint: 'Les chaînes cachées dans les binaires...' },
    'OSINT{z1p_files_hold_secrets}': { name: 'Archive Raider', points: 200, hint: 'Le fichier backup.zip contient des trésors' },
    'OSINT{stegano_is_your_friend}': { name: 'Stegano Sleuth', points: 250, hint: 'steghide extract -sf suspect_photo.jpg (mot de passe: camera model)' },
    'OSINT{ssh_keys_can_be_leaky}': { name: 'Key Leaker', points: 250, hint: 'Regardez dans .ssh/...' },
};

let score = 0;
const solved = [];

document.getElementById('flag-fab').addEventListener('click', () => {
    const panel = document.getElementById('flag-panel');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
});
document.getElementById('flag-panel-close').addEventListener('click', () => {
    document.getElementById('flag-panel').style.display = 'none';
});
document.getElementById('flag-submit').addEventListener('click', submitFlag);
document.getElementById('flag-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') submitFlag(); });

function submitFlag() {
    const input = document.getElementById('flag-input');
    const result = document.getElementById('flag-result');
    const flag = input.value.trim();
    if (flags[flag] && !solved.includes(flag)) {
        score += flags[flag].points;
        solved.push(flag);
        result.innerHTML = `<span style="color:#4e9a06">&#10003; Correct! ${flags[flag].name} +${flags[flag].points} pts</span>`;
        showNotification(`Flag trouvé: ${flags[flag].name} (+${flags[flag].points} pts)`);
        updateScoreboard();
        input.value = '';
    } else if (solved.includes(flag)) {
        result.innerHTML = '<span style="color:#f1c40f">Déjà trouvé!</span>';
    } else {
        result.innerHTML = '<span style="color:#e74c3c">Flag incorrect...</span>';
        input.style.borderColor = '#e74c3c';
        setTimeout(() => { input.style.borderColor = '#555'; }, 1000);
    }
}

function updateScoreboard() {
    const list = document.getElementById('scoreboard-list');
    list.innerHTML = '';
    solved.forEach(flag => {
        const entry = document.createElement('div');
        entry.className = 'scoreboard-entry';
        entry.innerHTML = `<span class="challenge-name">${flags[flag].name}</span><span>${flags[flag].points} pts</span>`;
        list.appendChild(entry);
    });
    const total = document.createElement('div');
    total.className = 'scoreboard-entry';
    total.innerHTML = `<strong>Total</strong><strong>${score} / 1150 pts</strong>`;
    list.appendChild(total);
}

console.log('OSINT CTF Desktop loaded');
