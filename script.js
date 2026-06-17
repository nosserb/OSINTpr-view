function updateClock() {
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
    document.getElementById('panel-clock').textContent = now.toLocaleDateString('fr-FR', options);
}

updateClock();
setInterval(updateClock, 1000);

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

    win.querySelector('.window-btn-maximize').addEventListener('click', () => {
        win.classList.toggle('maximized');
    });

    win.querySelector('.window-btn-minimize').addEventListener('click', () => {
        win.style.display = 'none';
    });

    win.addEventListener('mousedown', () => { win.style.zIndex = ++windowZIndex; });

    return win;
}

function createTerminal() {
    const termContent = `
        <div class="terminal-body" id="terminal-output">
            <div class="terminal-line">Ubuntu 22.04.3 LTS</div>
            <div class="terminal-line"></div>
            <div class="terminal-input-line">
                <span class="terminal-prompt">ctf@ubuntu:~$</span>
                <input class="terminal-input" type="text" autofocus spellcheck="false">
            </div>
        </div>
    `;
    const win = createWindow('Terminal', termContent, { width: 750, height: 450 });

    const termBody = win.querySelector('.terminal-body');
    const input = win.querySelector('.terminal-input');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim();
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.textContent = `ctf@ubuntu:~$ ${cmd}`;
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
        'help': 'Commandes disponibles: help, ls, cat, pwd, whoami, id, uname, hostname, ifconfig, ps, date, clear, neofetch, sudo',
        'ls': 'Desktop  Documents  Downloads  flag.txt  hidden  README.txt  .ssh',
        'pwd': '/home/ctf',
        'whoami': 'ctf',
        'id': 'uid=1000(ctf) gid=1000(ctf) groups=1000(ctf),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev)',
        'uname': 'Linux',
        'hostname': 'ubuntu-ctf',
        'date': new Date().toString(),
        'clear': '__CLEAR__',
        'neofetch': `<span style="color:#e95420">            .-/+oossssoo+/-.            </span>ctf@ubuntu-ctf
<span style="color:#e95420">        \`:+ssssssssssssssssss+:\`        </span>---------------
<span style="color:#e95420">      -+ssssssssssssssssssyyssss+-      </span>OS: Ubuntu 22.04.3 LTS x86_64
<span style="color:#e95420">    .ossssssssssssssssss</span>dMMMNy<span style="color:#e95420">sssso.    </span>Kernel: 5.15.0-ctf
<span style="color:#e95420">   /sssssssssss</span>hdmmNNmmyNMMMMh<span style="color:#e95420">ssssss/   </span>Uptime: 1337 days, 4 hours
<span style="color:#e95420">  +sssssssss</span>hm<span style="color:#e95420">yd</span>MMMMMMMNddddy<span style="color:#e95420">ssssssss+  </span>Packages: 1337 (dpkg)
<span style="color:#e95420"> /ssssssss</span>hNMMM<span style="color:#e95420">yh</span>hyyyyhmNMMMNh<span style="color:#e95420">ssssssss/ </span>Shell: bash 5.1.16
<span style="color:#e95420">.ssssssss</span>dMMMNh<span style="color:#e95420">ssssssssss</span>hNMMMd<span style="color:#e95420">ssssssss.</span>Terminal: CTF-Term
<span style="color:#e95420">+ssss</span>hhhyNMMNy<span style="color:#e95420">ssssssssssss</span>yNMMMy<span style="color:#e95420">sssssss+</span>CPU: Flag Processor @ 3.50GHz
<span style="color:#e95420">oss</span>yNMMMNyMMh<span style="color:#e95420">ssssssssssssssss</span>hmmmh<span style="color:#e95420">ssssssso</span>Memory: 1337MiB / 8192MiB
<span style="color:#e95420">oss</span>yNMMMNyMMh<span style="color:#e95420">ssssssssssssssssh</span>mmy<span style="color:#e95420">ssssssso</span>
<span style="color:#e95420">+ssss</span>hhhyNMMNy<span style="color:#e95420">sssssssssssssss</span>yNMMMy<span style="color:#e95420">sssssss+</span>
<span style="color:#e95420">.ssssssss</span>dMMMNh<span style="color:#e95420">ssssssssssssss</span>hNMMMd<span style="color:#e95420">ssssssss.</span>
<span style="color:#e95420"> /ssssssss</span>hNMMM<span style="color:#e95420">yh</span>hyyyyhdNMMMNh<span style="color:#e95420">ssssssss/ </span>
<span style="color:#e95420">  +sssssssss</span>dm<span style="color:#e95420">yd</span>MMMMMMMMddddy<span style="color:#e95420">ssssssss+  </span>
<span style="color:#e95420">   /sssssssssss</span>hdmNNNNmyNMMMMh<span style="color:#e95420">ssssss/   </span>
<span style="color:#e95420">    .ossssssssssssssssssdMMMNy</span>sssso.    <span style="color:#e95420">
      -+sssssssssssssssssss</span>yyy<span style="color:#e95420">ssss+-   </span>
<span style="color:#e95420">        \`:+ssssssssssssssssss+:\`        </span>
<span style="color:#e95420">            .-/+oossssoo+/-.            </span>`,
        'cat flag.txt': '<span style="color:#e95420">CTF{</span>welcome_to_the_ubuntu_ctf_2024<span style="color:#e95420">}</span>',
        'cat README.txt': 'Bienvenue dans ce CTF!\nTrouvez le flag caché dans ce système.\nPensez à explorer les fichiers et les permissions.\nBonne chance!',
        'cat hidden': 'cat: hidden: Is a directory',
        'ls hidden': '.secret_data  password.txt',
        'cat hidden/.secret_data': '<span style="color:#e95420">CTF{</span>hidden_files_are_fun<span style="color:#e95420">}</span>',
        'cat hidden/password.txt': 'admin:SuperSecretPass123!\nroot:toor\nctf:flag_hunter',
        'ls .ssh': 'authorized_keys  id_rsa  id_rsa.pub',
        'cat .ssh/id_rsa': '<span style="color:#e95420">-----BEGIN OPENSSH PRIVATE KEY-----</span>\nb3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAA\n...(CTF{ssh_keys_can_be_leaky})...\n<span style="color:#e95420">-----END OPENSSH PRIVATE KEY-----</span>',
        'ifconfig': 'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 10.10.1337.7  netmask 255.255.255.0  broadcast 10.10.1337.255\n        ether 00:0c:29:aa:bb:cc  txqueuelen 1000  (Ethernet)',
        'ps': '  PID TTY          TIME CMD\n    1 ?        00:00:03 systemd\n  421 ?        00:00:01 sshd\n  666 ?        00:00:00 flag守护进程\n  1337 pts/0    00:00:00 bash',
        'sudo': '[sudo] password for ctf: <span style="color:#e95420">Nice try! But the real challenge is elsewhere...</span>',
    };

    if (cmd === '') return null;

    if (commands[cmd]) return commands[cmd];

    if (cmd.startsWith('cat ') || cmd.startsWith('ls ') || cmd.startsWith('cd ')) {
        return `<span style="color:#e95420">bash: ${cmd.split(' ')[0]}: command not found or permission denied</span>`;
    }

    return `<span style="color:#e95420">bash: ${cmd}: command not found</span>`;
}

function createTextEditor(filename, content) {
    const editorContent = `<div class="text-editor-body" contenteditable="false">${content}</div>`;
    createWindow(filename, editorContent, { width: 600, height: 400 });
}

const fileContents = {
    'README.txt': 'Bienvenue dans ce CTF!\n\nTrouvez le flag caché dans ce système.\nPensez à explorer les fichiers et les permissions.\n\nIndice: Le flag se trouve quelque part dans /home/ctf\nBonne chance!',
    'flag.txt': '<span style="color:#e95420">CTF{welcome_to_the_ubuntu_ctf_2024}</span>\n\n...ou est-ce le vrai flag? Continuez à chercher!',
};

document.querySelectorAll('[data-app]').forEach(el => {
    el.addEventListener('dblclick', () => {
        const app = el.dataset.app;
        openApp(app);
    });
    el.addEventListener('click', () => {
        const app = el.dataset.app;
        if (app === 'terminal') openApp(app);
    });
});

function openApp(app) {
    switch (app) {
        case 'terminal':
            createTerminal();
            break;
        case 'readme':
            createTextEditor('README.txt', fileContents['README.txt']);
            break;
        case 'flag':
            createTextEditor('flag.txt', fileContents['flag.txt']);
            break;
        case 'files':
            createWindow('Files', '<div style="padding:20px;color:#aaa;">File manager coming soon...</div>');
            break;
        case 'browser':
            createWindow('Firefox', '<div style="padding:20px;color:#aaa;">Browser coming soon...</div>');
            break;
        case 'settings':
            createWindow('Settings', '<div style="padding:20px;color:#aaa;">Settings coming soon...</div>');
            break;
        default:
            break;
    }
}

const desktop = document.getElementById('desktop');
const lockScreen = document.getElementById('lock-screen');
const lockPassword = document.getElementById('lock-password');
const lockError = document.getElementById('lock-error');
const validPasswords = ['flag', 'ctf', 'password', 'admin', 'root'];

function updateLockClock() {
    const now = new Date();
    document.getElementById('lock-time').textContent = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('lock-date').textContent = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}
updateLockClock();
setInterval(updateLockClock, 1000);

lockPassword.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const pwd = lockPassword.value.trim().toLowerCase();
        if (validPasswords.includes(pwd)) {
            lockScreen.style.transition = 'opacity 0.5s';
            lockScreen.style.opacity = '0';
            setTimeout(() => {
                lockScreen.style.display = 'none';
                desktop.style.display = 'block';
                desktop.style.opacity = '0';
                desktop.style.transition = 'opacity 0.5s';
                setTimeout(() => desktop.style.opacity = '1', 50);
            }, 500);
        } else {
            lockError.textContent = 'Mot de passe incorrect. Essayez encore...';
            lockPassword.value = '';
            lockPassword.style.borderColor = '#e74c3c';
            setTimeout(() => { lockPassword.style.borderColor = 'rgba(255,255,255,0.3)'; }, 1000);
        }
    }
});

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
        const action = item.dataset.action;
        if (action === 'terminal' || action === 'open-terminal') {
            createTerminal();
        }
    });
});

console.log('CTF Ubuntu Desktop loaded');
