const $ = s => document.querySelector(s);
const loader = $('#loader');
window.addEventListener('load', () => setTimeout(() => loader.classList.add('hide'), 450), { once: true });
const menuBtn = $('#menuBtn'), navMenu = $('#navMenu');
menuBtn?.addEventListener('click', () => { const open = navMenu.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', open) });
navMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));
const sections = [...document.querySelectorAll('main section[id]')], links = [...document.querySelectorAll('#navMenu a')];
const setActive = () => { let id = 'home'; for (const s of sections) if (scrollY >= s.offsetTop - 180) id = s.id; links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id)) };
addEventListener('scroll', setActive, { passive: true }); setActive();
const clock = $('#clock');
function tick() { clock.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Bangkok' }).format(new Date()) } tick(); setInterval(tick, 1000);
const visitor = $('#visitorCount'); let count = Number(localStorage.getItem('noxera_visitors') || 0); if (!sessionStorage.getItem('noxera_counted')) { count++; localStorage.setItem('noxera_visitors', count); sessionStorage.setItem('noxera_counted', '1') } visitor.textContent = count.toLocaleString();
const blox = ['16204747500539194642094460758259', '72104127933230502243737090611448', '07540993386381794024085210280842', '92125489101084303473419769142746', '54016185307417005476421554108815'];
const king = ['01630052334175009770485431624826', '11569879223998213444919094262058', '45665867776372394849029317993331', '48568425355306886266738085472093', '38745517533896458309107008258393'];
function renderServers(id, game, gameId, codes) {
    const root = $(id);
    if (!root) return;
    const isBlox = game === 'BLOX FRUITS';
    const gameName = isBlox ? 'Blox Fruits' : 'King Legacy';
    const logo = isBlox ? './assets/blox.png' : './assets/king.png';
    root.innerHTML = codes.map((code, i) => {
        const server = i + 1;
        const url = `https://www.roblox.com/games/${gameId}?privateServerLinkCode=${code}`;
        return `<a class="card server-card" href="${url}" target="_blank" rel="noopener noreferrer" data-game="${game}" data-server="${server}" data-private-code="${code}" aria-label="Open ${gameName} Private Server ${server}">
   <div class="game-logo"><img src="${logo}" alt="${gameName}"></div>
   <div class="game-info"><small>ROBLOX</small><strong>${gameName}</strong><span>SERVER ${String(server).padStart(2, '0')}</span></div>
   <div class="server-meta"><small>PRIVATE SERVER</small><b>↗</b></div>
  </a>`;
    }).join('');
}
renderServers('#bloxfruitsServers', 'BLOX FRUITS', '2753915549', blox); renderServers('#kinglegacyServers', 'KING LEGACY', '4520749081', king);
const music = $('#bgMusic'), play = $('#musicPlay'), status = $('#musicStatus'), player = $('#musicPlayer'), sound = $('#soundBtn');
function musicState() { const on = !music.paused; play.textContent = on ? '❚❚' : '▶'; status.textContent = on ? 'MUSIC PLAYING' : 'MUSIC OFF'; player.classList.toggle('playing', on); sound.textContent = on ? '♫' : '♪' }
play.addEventListener('click', async () => { if (music.paused) { try { await music.play() } catch (e) { status.textContent = 'CLICK TO PLAY' } } else music.pause(); musicState() }); sound.addEventListener('click', () => play.click()); music.addEventListener('play', musicState); music.addEventListener('pause', musicState);
$('#fullscreenBtn').addEventListener('click', () => { if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.() });
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { const cards = document.querySelectorAll('.card,.btn'); cards.forEach(c => c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', `${e.clientX - r.left}px`); c.style.setProperty('--my', `${e.clientY - r.top}px`) })); }
