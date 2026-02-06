// Main logic engine for frame.html
// Imports
import { debounce, qs, on, createEl, Queue } from './utils.js';
import { searchYouTube, getSuggestions, getRelated } from './api.js';

// State
let player = null;
const queue = new Queue([]);

// Attach YouTube IFrame API
function loadYTScript() {
  const yts = document.createElement('script');
  yts.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(yts);
}

// Expose callback globally for IFrame API
window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    width: '100%',
    height: '100%',
    playerVars: { modestbranding: 1, rel: 0 },
    events: {
      onReady: () => {
        const vol = qs('#volume').value;
        player.setVolume(Number(vol));
      },
      onStateChange: e => {
        const t = qs('#toggle');
        t.textContent = (e.data === YT.PlayerState.PLAYING) ? '⏸' : '⏯';
      }
    }
  });
};

function loadVideoById(id) { if (player) player.loadVideoById(id); }
function playVideo() { if (player) player.playVideo(); }
function pauseVideo() { if (player) player.pauseVideo(); }

function updateControls() {
  const prev = qs('#prev');
  const next = qs('#next');
  prev.disabled = !queue.hasPrev();
  next.disabled = !queue.hasNext();
}

function renderResults(items) {
  const ul = qs('#results');
  ul.innerHTML = '';
  items.forEach(item => {
    const li = createEl('li', { className: 'result' });
    const img = createEl('img');
    img.src = item.thumb; img.width = 120; img.height = 67;
    const info = createEl('div', { className: 'info' });
    const title = createEl('div', { className: 'title' }); title.textContent = item.title;
    const channel = createEl('div', { className: 'channel' }); channel.textContent = item.channel;
    const desc = createEl('div', { className: 'desc' }); desc.textContent = item.description || '';
    info.appendChild(title); info.appendChild(channel); info.appendChild(desc);
    li.appendChild(img); li.appendChild(info);
    on(li, 'click', async () => {
      queue.pushUnique(item.id);
      queue.setIndexById(item.id);
      loadVideoById(item.id);
      updateControls();
      try {
        const related = await getRelated(item.id);
        related.forEach(id => queue.pushUnique(id));
        updateControls();
      } catch {}
    });
    ul.appendChild(li);
  });
}

async function handleSearch(q) {
  try {
    const items = await searchYouTube(q);
    renderResults(items);
    queue.setList(items.map(i => i.id));
    queue.index = -1;
    updateControls();
  } catch {}
}

function setupSuggestions() {
  const inputEl = qs('#query');
  const sugEl = qs('#suggestions');
  const run = debounce(async () => {
    const q = inputEl.value.trim();
    if (!q) { sugEl.style.display = 'none'; sugEl.innerHTML = ''; return; }
    try {
      const list = await getSuggestions(q);
      sugEl.innerHTML = '';
      if (!list.length) { sugEl.style.display = 'none'; return; }
      list.forEach(text => {
        const li = createEl('li');
        li.textContent = text;
        on(li, 'mousedown', () => { inputEl.value = text; sugEl.style.display = 'none'; handleSearch(text); });
        sugEl.appendChild(li);
      });
      sugEl.style.display = 'block';
    } catch {}
  }, 200);
  on(inputEl, 'input', run);
  on(document, 'click', e => { if (!qs('#search-form').contains(e.target)) sugEl.style.display = 'none'; });
}

function setupControls() {
  on(qs('#search-form'), 'submit', e => { e.preventDefault(); const q = qs('#query').value.trim(); if (q) handleSearch(q); });
  on(qs('#prev'), 'click', () => { const id = queue.prev(); if (id) loadVideoById(id); updateControls(); });
  on(qs('#toggle'), 'click', () => { if (!player) return; const s = player.getPlayerState(); if (s === YT.PlayerState.PLAYING) pauseVideo(); else playVideo(); });
  on(qs('#next'), 'click', () => { const id = queue.next(); if (id) loadVideoById(id); updateControls(); });
  on(qs('#volume'), 'input', e => { if (player) player.setVolume(Number(e.target.value)); });
}

function init() {
  setupSuggestions();
  setupControls();
  loadYTScript();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
