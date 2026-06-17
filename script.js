function updateClock() {
    const now = new Date();
    const options = { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
    document.getElementById('panel-clock').textContent = now.toLocaleDateString('fr-FR', options);
}

updateClock();
setInterval(updateClock, 1000);

console.log('CTF Ubuntu Desktop loaded');
