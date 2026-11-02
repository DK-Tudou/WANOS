import { asset, letterText, navItems, recommendations, letterThemes } from './content.js';

export function renderNav() {
  return `<nav class="bottom-nav" aria-label="底部导航">
    <div class="nav-inner">${navItems.map(([id, label, icon], i) => `
      <button type="button" class="nav-item ${i === 0 ? 'is-current' : ''}" data-tab="${id}" ${i === 0 ? 'aria-current="page"' : ''}>
        <span class="nav-icon" style="--nav-mask:url('${asset(icon)}')" aria-hidden="true"></span>
        <span class="nav-label">${label}</span>
      </button>`).join('')}</div>
  </nav>`;
}

function renderStatusBar() {
  return `<div class="app-status-bar" aria-hidden="true"><span>9:41</span><img src="${asset('app-status-icons.png')}" alt="" width="72" height="16" /></div>`;
}

export function renderMiniPlayer(activeTrack) {
  return `<div class="mini-player" role="group" aria-label="迷你播放器">
    <button type="button" class="mini-cover-button" id="mini-open-source" aria-label="打开当前内容页面"><img class="mini-cover" src="${asset(activeTrack?.cover || 'mini-cover.png')}" alt="" width="40" height="40" /></button>
    <span class="mini-title">${activeTrack?.title || '写给很久没见的你'}</span>
    <span class="mini-track"><i class="mini-progress"></i></span>
    <span class="mini-time">00:00 / 03:20</span>
    <button type="button" class="mini-toggle" id="mini-toggle" aria-label="播放音频"><span class="mini-control-icon" aria-hidden="true"></span></button>
    <button type="button" class="mini-close" id="mini-close" aria-label="关闭迷你播放器"><span aria-hidden="true"></span></button>
  </div>`;
}

export function renderHome(hasPlayed) {
  return `<main class="screen home-screen ${hasPlayed ? 'has-mini' : ''}" data-page="home">
    <img class="home-art" src="${asset('home-background.png')}" alt="" />
    <header class="home-header">
      <div class="home-header-title"><button type="button" class="plain-entry" aria-label="时间选择入口，规则待定">今日特展<img src="${asset('chevron-down.png')}" alt="" width="12" height="12" /></button><a class="source-link" href="https://github.com/DK-Tudou/WANOS" target="_blank" rel="noopener noreferrer">查看源码 ↗</a></div>
      <div class="home-header-meta"><span>展览时间&nbsp; 11.02 — 11.08</span></div>
    </header>
    <div class="home-operation">
      <div class="home-hero">
        <div class="home-hero-title">
          <span class="eyebrow">A LETTER AT DUSK</span>
          <h1>落霞<br />来信</h1>
          <span class="home-title-rule" aria-hidden="true"></span>
        </div>
        <div class="home-hero-copy">
          <p class="edition">第 01 封 · 把傍晚写给你</p>
          <p class="teaser">在日落之前，收下一句想说的话。<br />今天，从这一封开始。</p>
          <div class="tags" aria-label="内容标签"><span>落霞来信</span><span>书信</span><span>黄昏</span></div>
        </div>
      </div>
      <button type="button" class="letter-cta" id="start-letter">
        <img class="letter-cta-art" src="${asset('envelope-button.png')}" alt="" />
        <span>开始读信</span><img class="letter-cta-arrow" src="${asset('arrow-right.png')}" alt="" width="24" height="24" />
      </button>
    </div>
    ${renderStatusBar()}
  </main>`;
}

export function renderEmpty(page) {
  const label = navItems.find(([id]) => id === page)?.[1] || '';
  return `<main class="screen empty-screen" data-page="${page}" aria-label="${label}页面">
    ${renderStatusBar()}
  </main>`;
}

function sectionTitle(number, english, chinese) {
  return `<header class="section-title"><span>${number} / ${english}</span><h2>${chinese}</h2><i aria-hidden="true"></i></header>`;
}

function renderTrackCards(items) {
  return items.map(({ id, cover, kind, title, description }) => `
    <button type="button" class="recommendation-card" data-track="${id}" data-track-title="${title}" aria-label="播放${title}的演示音频">
      <img class="recommendation-cover" src="${asset(cover)}" alt="" />
      <span class="recommendation-info"><span class="recommendation-copy"><span class="recommendation-kind">${kind}</span><span class="recommendation-title">${title}</span><span class="recommendation-description">${description}</span></span><span class="recommendation-duration">演示音频 · 03:20</span></span>
      <span class="recommendation-play" aria-hidden="true"><img src="${asset('rec-play.png')}" alt="" width="24" height="24" /></span>
    </button>`).join('');
}

function renderTopbar(title, backId, backLabel) {
  return `<div class="detail-topbar">
    ${renderStatusBar()}
    <header class="detail-header"><button type="button" class="back-button" id="${backId}" aria-label="${backLabel}"><img src="${asset('back.png')}" alt="" width="20" height="20" /></button><span>${title}</span></header>
  </div>`;
}

export function renderDetail(hasPlayed) {
  return `<main class="screen detail-screen ${hasPlayed ? 'has-mini' : ''}" data-page="letter">
    <div class="detail-art" aria-hidden="true">
      <img class="detail-art-main" src="${asset('detail-art.png')}" alt="" />
      <img class="detail-art-fade" src="${asset('detail-fade.png')}" alt="" />
      <img class="detail-art-paper" src="${asset('detail-background.png')}" alt="" />
    </div>
    <div class="detail-content">
      <section class="letter-intro" aria-label="当天信件">
        <div class="detail-heading"><h1>落霞来信</h1><span class="detail-heading-rule" aria-hidden="true"></span><p><i aria-hidden="true"></i>写给橘居者的一封信</p></div>
        <div class="letter-body"><p id="letter-text">${letterText}</p><button type="button" class="expand-toggle" id="toggle-letter" hidden><span>展开全部</span><img src="${asset('expand.png')}" alt="" width="12" height="12" /></button></div>
      </section>
      <section class="content-section podcast-section" aria-label="本期内容">
        ${sectionTitle('01', 'LISTEN', '本期内容')}
        <div class="podcast-card"><div class="podcast-primary"><img class="podcast-cover" src="${asset('audio-cover.png')}" alt="" /><div class="podcast-intro"><span>从这封信延伸的声音</span><h3>那些没说出口的话<br />后来去了哪里</h3></div></div><div class="podcast-controls"><a class="audio-note" href="https://www.scottbuckley.com.au/library/in-this-moment/" target="_blank" rel="noopener noreferrer" aria-label="演示音乐 In This Moment，Scott Buckley，CC BY 4.0，查看来源">演示音乐 · Scott Buckley · CC BY 4.0</a><span class="podcast-track"><i class="podcast-progress"></i><b class="podcast-thumb"></b></span><span class="podcast-time-start">00:00</span><span class="podcast-time-end">03:20</span><button type="button" class="podcast-toggle" id="podcast-toggle" aria-label="播放本期内容"><img src="${asset('audio-play.png')}" alt="" width="46" height="46" /><span class="podcast-pause-icon" aria-hidden="true"></span></button></div></div>
      </section>
      <section class="content-section book-section" aria-label="书信专区">
        ${sectionTitle('02', 'READ', '书信专区')}
        <button type="button" class="book-card" id="open-letters" aria-label="进入书信专区"><span class="book-rings" aria-hidden="true"></span><span class="book-decor" aria-hidden="true">落<br />霞</span><span class="book-copy"><span>一封未曾寄出的信</span><span class="book-quote">「有些黄昏，我们很多年以后才想起来。」</span></span><span class="book-entry">立即阅读<img src="${asset('book-arrow.png')}" alt="" width="20" height="20" /></span></button>
      </section>
      <section class="content-section recommendations-section" aria-label="更多推荐">
        ${sectionTitle('03', 'DISCOVER', '更多推荐')}
        <div class="recommendations-list">${renderTrackCards(recommendations)}</div>
      </section>
    </div>
  </main>
  ${renderTopbar('落霞来信', 'back-home', '返回声画廊首页')}`;
}

export function renderLetters(hasPlayed) {
  return `<main class="screen collection-screen ${hasPlayed ? 'has-mini' : ''}" data-page="letters">
    <div class="collection-hero" aria-hidden="true"><img src="${asset('detail-art.png')}" alt="" /></div>
    <div class="collection-content">
      <span class="collection-eyebrow">LETTERS / COLLECTION</span>
      <h1>写给你的信</h1>
      <span class="collection-rule" aria-hidden="true"></span>
      <div class="recommendations-list collection-list">${renderTrackCards(letterThemes)}</div>
    </div>
  </main>
  ${renderTopbar('书信专区', 'back-letter', '返回当天信件详情页')}`;
}

