import { navItems } from './src/content.js';
import { renderNav, renderHome, renderEmpty, renderDetail, renderLetters } from './src/views.js';
import { createPlayer } from './src/player.js';

const app = document.querySelector('#app');
const loading = document.querySelector('#loading');
let routeContent;
const player = createPlayer(app, navigateTo);
let letterExpanded = false;
let refreshLetterLayout = () => {};
const validPages = new Set(['home', 'letter', 'letters', ...navItems.map(([id]) => id)]);

function pageFromHash() {
  const page = location.hash.slice(1);
  if (page === 'gallery') return 'home';
  return validPages.has(page) ? page : 'home';
}

function setActiveNav(page) {
  const activeTab = page === 'home' || page === 'letter' || page === 'letters' ? 'gallery' : page;
  const nav = app.querySelector('.bottom-nav');
  nav.classList.toggle('detail-bottom-nav', page === 'letter' || page === 'letters');
  nav.querySelectorAll('.nav-item').forEach(button => {
    const active = button.dataset.tab === activeTab;
    button.classList.toggle('is-current', active);
    if (active) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
}

function onNavClick(event) {
  const button = event.target.closest('.nav-item');
  if (!button) return;
  const tab = button.dataset.tab;
  navigateTo(tab === 'gallery' ? 'home' : tab);
}

function setupLetter() {
  const letter = app.querySelector('#letter-text');
  const toggle = app.querySelector('#toggle-letter');
  const measure = () => {
    const lineHeight = parseFloat(getComputedStyle(letter).lineHeight);
    const fullHeight = letter.scrollHeight;
    const lineCount = Math.round(fullHeight / lineHeight);
    const needsCollapse = lineCount > 5;
    letter.style.setProperty('--letter-full-height', `${fullHeight}px`);
    toggle.hidden = !needsCollapse;
    letter.classList.toggle('is-collapsed', needsCollapse && !letterExpanded);
    toggle.querySelector('span').textContent = letterExpanded ? '收起全部' : '展开全部';
    toggle.classList.toggle('is-expanded', letterExpanded);
  };
  toggle.addEventListener('click', () => { letterExpanded = !letterExpanded; measure(); });
  refreshLetterLayout = measure;
  letter.classList.add('no-height-motion');
  measure();
  requestAnimationFrame(() => requestAnimationFrame(() => letter.classList.remove('no-height-motion')));
  document.fonts.ready.then(() => { if (app.contains(letter)) measure(); });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let currentPage = pageFromHash();
let routeAnimationVersion = 0;
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

function navigateTo(page) {
  if (page === currentPage && page === pageFromHash()) {
    window.scrollTo(0, 0);
    return;
  }
  location.hash = page;
}

function onRouteChange() {
  const nextPage = pageFromHash();
  const version = ++routeAnimationVersion;
  app.classList.remove('route-entering-from-right', 'route-entering-from-left', 'route-entering-from-tab');
  if (!reducedMotion.matches) app.classList.add(nextPage === 'letter' ? 'route-entering-from-right' : currentPage === 'letter' && nextPage === 'home' ? 'route-entering-from-left' : 'route-entering-from-tab');
  render();
  currentPage = nextPage;
  if (!reducedMotion.matches) requestAnimationFrame(() => requestAnimationFrame(() => {
    if (version === routeAnimationVersion) app.classList.remove('route-entering-from-right', 'route-entering-from-left', 'route-entering-from-tab');
  }));
}

function syncDetailTopbar() {
  const scrolled = window.scrollY > 16;
  const bar = app.querySelector('.detail-topbar');
  if (bar) bar.classList.toggle('is-scrolled', scrolled);
  const nav = app.querySelector('.detail-bottom-nav');
  if (nav) nav.classList.toggle('is-scrolled', scrolled);
}

function render() {
  const page = pageFromHash();
  letterExpanded = false;
  refreshLetterLayout = () => {};
  const label = navItems.find(([id]) => id === page)?.[1];
  document.title = page === 'letter' ? '落霞来信 · 当天信件' : page === 'letters' ? '书信专区 · 全景声' : page === 'home' ? '全景声 · 落霞来信' : `全景声 · ${label}`;
  routeContent.innerHTML = page === 'letter' ? renderDetail(player.hasPlayed) : page === 'letters' ? renderLetters(player.hasPlayed) : page === 'home' ? renderHome(player.hasPlayed) : renderEmpty(page);
  if (page === 'home') {
    routeContent.querySelector('#start-letter').addEventListener('click', () => navigateTo('letter'));
  } else if (page === 'letter') {
    routeContent.querySelector('#back-home').addEventListener('click', () => navigateTo('home'));
    routeContent.querySelector('#podcast-toggle').addEventListener('click', () => player.selectTrack('letter'));
    routeContent.querySelector('#open-letters').addEventListener('click', () => navigateTo('letters'));
    setupLetter();
  } else if (page === 'letters') {
    routeContent.querySelector('#back-letter').addEventListener('click', () => navigateTo('letter'));
  }
  routeContent.querySelectorAll('[data-track]').forEach(card => card.addEventListener('click', () => player.selectTrack(card.dataset.track)));
  setActiveNav(page);
  player.updateAudioUI();
  window.scrollTo(0, 0);
  syncDetailTopbar();
}

window.addEventListener('hashchange', onRouteChange);
window.addEventListener('scroll', syncDetailTopbar, { passive: true });
window.addEventListener('resize', () => { if (location.hash === '#letter') refreshLetterLayout(); });
app.innerHTML = `<div class="route-content" id="route-content"></div>${renderNav()}`;
routeContent = app.querySelector('#route-content');
app.querySelector('.bottom-nav').addEventListener('click', onNavClick);
render();
Promise.all([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 1400))]).then(() => {
  loading.classList.add('is-hidden');
  setTimeout(() => loading.remove(), 350);
});
