import { asset, tracks } from './content.js';
import { renderMiniPlayer } from './views.js';

export function createPlayer(app, navigateTo) {
  const audio = new Audio(asset('demo-light-piano.m4a'));
  audio.preload = 'metadata';
  audio.volume = 0.75;
  let hasPlayed = false;
  let miniRemovalTimer = 0;
  let activeTrack = null;

  function formatTime(seconds) {
    const value = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
    return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
  }

  function updateAudioUI() {
    const duration = Number.isFinite(audio.duration) ? audio.duration : 199.51;
    const progress = duration ? Math.min(1, audio.currentTime / duration) : 0;
    const isLetterAudio = activeTrack?.id === 'letter';
    const podcastToggle = app.querySelector('#podcast-toggle');
    if (podcastToggle) {
      podcastToggle.classList.toggle('is-playing', isLetterAudio && !audio.paused);
      podcastToggle.setAttribute('aria-label', isLetterAudio && !audio.paused ? '暂停本期内容' : '播放本期内容');
      app.querySelector('.podcast-progress').style.width = `${(isLetterAudio ? progress : 0) * 100}%`;
      app.querySelector('.podcast-thumb').style.left = `calc(${(isLetterAudio ? progress : 0) * 100}% - 5px)`;
      app.querySelector('.podcast-time-start').textContent = formatTime(isLetterAudio ? audio.currentTime : 0);
      app.querySelector('.podcast-time-end').textContent = formatTime(Math.ceil(duration));
    }
    app.querySelectorAll('[data-track]').forEach(card => {
      const selected = hasPlayed && activeTrack?.id === card.dataset.track;
      const playing = selected && !audio.paused;
      card.classList.toggle('is-current', selected);
      card.classList.toggle('is-playing', playing);
      card.setAttribute('aria-label', `${playing ? '暂停' : '播放'}${card.dataset.trackTitle}的演示音频`);
    });
    const miniToggle = app.querySelector('#mini-toggle');
    if (miniToggle && !miniToggle.closest('.mini-player').classList.contains('is-leaving')) {
      miniToggle.classList.toggle('is-playing', !audio.paused);
      miniToggle.setAttribute('aria-label', audio.paused ? '播放音频' : '暂停音频');
      app.querySelector('.mini-progress').style.width = `${progress * 100}%`;
      app.querySelector('.mini-time').textContent = `${formatTime(audio.currentTime)} / ${formatTime(Math.ceil(duration))}`;
      app.querySelector('.mini-title').textContent = activeTrack?.title || '写给很久没见的你';
      const coverSrc = asset(activeTrack?.cover || 'mini-cover.png');
      const miniCover = app.querySelector('.mini-cover');
      if (miniCover.getAttribute('src') !== coverSrc) miniCover.src = coverSrc;
      app.querySelector('#mini-open-source').setAttribute('aria-label', activeTrack?.originPage === 'letters' ? '打开书信专区' : '打开当前信件详情页');
    }
  }

  async function toggleAudio() {
    if (audio.paused) {
      if (!activeTrack) activeTrack = tracks.get('letter');
      if (Number.isFinite(audio.duration) && audio.currentTime >= audio.duration) audio.currentTime = 0;
      try {
        await audio.play();
        hasPlayed = true;
        syncMiniPlayer();
      } catch (error) { console.warn('演示音频无法播放', error); }
    } else {
      audio.pause();
    }
    updateAudioUI();
  }

  async function selectTrack(id) {
    const track = tracks.get(id);
    if (!track) return;
    if (activeTrack?.id === id) return toggleAudio();
    audio.pause();
    audio.currentTime = 0;
    activeTrack = track;
    updateAudioUI();
    await toggleAudio();
  }

  function bindMiniPlayer() {
    app.querySelector('#mini-open-source')?.addEventListener('click', () => navigateTo(activeTrack?.originPage || 'letter'));
    app.querySelector('#mini-toggle')?.addEventListener('click', toggleAudio);
    app.querySelector('#mini-close')?.addEventListener('click', closeMiniPlayer);
  }

  function syncMiniPlayer() {
    const screen = app.querySelector('.screen');
    screen?.classList.toggle('has-mini', hasPlayed);
    let mini = app.querySelector('.mini-player');
    if (hasPlayed && !mini) {
      app.insertAdjacentHTML('beforeend', renderMiniPlayer(activeTrack));
      mini = app.querySelector('.mini-player');
      mini.classList.add('is-entering');
      bindMiniPlayer();
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (mini.isConnected) mini.classList.remove('is-entering');
      }));
    } else if (hasPlayed && mini?.classList.contains('is-leaving')) {
      clearTimeout(miniRemovalTimer);
      miniRemovalTimer = 0;
      mini.classList.remove('is-leaving');
    } else if (!hasPlayed && mini) {
      mini.classList.add('is-leaving');
      clearTimeout(miniRemovalTimer);
      miniRemovalTimer = window.setTimeout(() => {
        mini.remove();
        miniRemovalTimer = 0;
      }, 240);
    }
    updateAudioUI();
  }

  function closeMiniPlayer() {
    audio.pause();
    audio.currentTime = 0;
    hasPlayed = false;
    activeTrack = null;
    syncMiniPlayer();
  }

  for (const event of ['play', 'pause', 'timeupdate', 'loadedmetadata', 'ended']) {
    audio.addEventListener(event, updateAudioUI);
  }

  return {
    get hasPlayed() { return hasPlayed; },
    updateAudioUI,
    selectTrack,
  };
}
