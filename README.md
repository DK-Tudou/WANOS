# 全景声 · 落霞来信 MVP

[在线 Demo](https://dk-tudou.github.io/WANOS/) · [查看源码](https://github.com/DK-Tudou/WANOS)

「全景声」定位为移动端声音内容 APP；本目录是从头建立的移动端网页验证 Demo。当前已完成加载态、声画廊首页、当天信件详情页和返回首页。五栏导航均可点击，暂只有声画廊有内容；其他四栏为保留状态栏和底栏的空白一级页。详情页归属声画廊，点击底栏声画廊返回首页。

启动时显示取自 Figma 开屏画板的静态画面，短暂淡出后进入首页；详情页「书信专区」入口沿用原有卡片视觉。

在本目录执行：

```sh
python3 -m http.server 4173
```

浏览器打开 `http://localhost:4173/`。页面使用本地保存的 Figma 素材和字体，不依赖临时 Figma 图片地址。

代码结构：`app.js` 负责路由、页面事件和正文折叠；`src/content.js` 保存演示内容与素材路径；`src/views.js` 生成页面模板；`src/player.js` 管理音频和迷你播放器。`styles.css` 保留页面样式。项目没有 npm 依赖或构建步骤。

第 2 步已加入按实际排版行数展开/收起正文、演示音频播放/暂停与各页面共用的迷你播放器。正文重新进入详情或刷新后默认收起；迷你播放器仅在点过播放后出现。关闭迷你播放器会暂停并归零音频，之后仍可从详情页重新播放。

迷你播放器在五个栏目间切换时保持播放或暂停状态，并固定在底栏上方；点击封面返回当天信件详情。当前栏再次点击时停留在该一级页顶部，详情页点击声画廊则返回首页。

临时演示：详情页的「书信专区」入口可进入独立的书信主题集合页；专区和「更多推荐」卡片可点播，复用同一条演示音频并更新迷你播放器标题与封面。此演示功能不写入 PRD，后续内容与真实音频仍待确定。

## 演示音乐来源与授权

`assets/demo-light-piano.m4a` 使用 [《In This Moment》](https://www.scottbuckley.com.au/library/in-this-moment/)：**‘In This Moment’ by Scott Buckley – released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). [www.scottbuckley.com.au](https://www.scottbuckley.com.au/)**。

音频由原始 MP3 转码为较小的 AAC 文件，未剪辑内容；这是本仓库对音频所做的格式变更。当前所有卡片复用这条演示音乐，正式播客文件可后续替换。[作者的使用说明](https://www.scottbuckley.com.au/library/using-this-music/)介绍了署名方式与其他使用条件。
