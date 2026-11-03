export const asset = name => `./assets/${name}`;

export const letterText = 'Hi，亲爱的橘居者，我们已经很少写情书了。喜欢一个人，可以发消息，可以分享一首歌，却和从前不一样。一封信要写很久，也要走很久。今天，想和你一起读一封很多年前写下的情书。那时我们总以为，喜欢一个人就要把每一个傍晚都寄给他。后来才明白，写下的句子即使迟到了，也能在某一天被好好听见。记得有一年秋天，我在傍晚走过一条很长的街，路灯一盏接一盏亮起来，风把树叶吹到脚边。我忽然想告诉你，那天的晚霞像一封没有写完的信，落在每个人匆忙回家的肩上。可我没有立刻按下发送，只是把想说的话留在心里，等它们慢慢变得清楚。如果你正在读到这里，或许窗外也正好有一点橘色的光。请替我停一会儿，听听城市安静下来的声音。我们不必把每一种心情都说得很完整，也不必急着给这封信一个答案。愿你在今天结束以前，遇见一件微小而温柔的事：一阵晚风、一杯热茶，或者一个终于愿意好好倾听你的人。等下次落日来临，我还会继续写给你。';

export const navItems = [
  ['gallery', '声画廊', 'nav-gallery.png'],
  ['theatre', '声剧场', 'nav-theatre.png'],
  ['hall', '乐厅', 'nav-hall.png'],
  ['soundscape', '声景', 'nav-soundscape.png'],
  ['mine', '我的', 'nav-mine.png'],
];

export const recommendations = [
  { id: 'rec-1', cover: 'rec-1.png', kind: '音乐 · MUSIC', title: '黄昏落在你肩上', description: '一首歌，留住不曾说完的话……', originPage: 'letter' },
  { id: 'rec-2', cover: 'rec-2.png', kind: '音乐 · MUSIC', title: '写给远方的晚风', description: '在风里，重新遇见旧日时光……', originPage: 'letter' },
  { id: 'rec-3', cover: 'rec-3.png', kind: '有声剧 · AUDIO DRAMA', title: '等一封迟来的信', description: '有些相遇，藏在故事的结尾……', originPage: 'letter' },
  { id: 'rec-4', cover: 'rec-4.png', kind: '声景 · SOUNDSCAPE', title: '日落时的海边', description: '让潮声把思念慢慢送远……', originPage: 'letter' },
];

// 临时演示内容，不纳入 PRD。
export const letterThemes = [
  { id: 'theme-dusk', cover: 'audio-cover.png', kind: '书信 · LETTERS', title: '落霞来信', description: '写给黄昏里的你', originPage: 'letters' },
  { id: 'theme-morning', cover: 'rec-2.png', kind: '书信 · LETTERS', title: '清晨来信', description: '把第一束光寄给你', originPage: 'letters' },
  { id: 'theme-rain', cover: 'rec-3.png', kind: '书信 · LETTERS', title: '雨夜来信', description: '在雨声里读一封信', originPage: 'letters' },
  { id: 'theme-faraway', cover: 'rec-4.png', kind: '书信 · LETTERS', title: '远方来信', description: '来自路上的一封回音', originPage: 'letters' },
];

export const tracks = new Map([
  ['letter', { id: 'letter', title: '写给很久没见的你', cover: 'mini-cover.png', originPage: 'letter' }],
  ...recommendations.map(item => [item.id, item]),
  ...letterThemes.map(item => [item.id, item]),
]);
