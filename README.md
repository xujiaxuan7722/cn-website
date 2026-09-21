# 宠适官网（petsfit 中文站）

国内「宠适」品牌官网。Next.js（App Router）+ JavaScript，服务端渲染，面向 SEO 与 GEO。

## 运行

```bash
npm install
npm run dev      # 开发：http://localhost:3000，保存即热更新
npm run build    # 构建
npm run start    # 生产模式运行
npm run lint
```

## 结构

```
app/
  layout.js        根布局：字体、书脊 + 抽屉菜单、页脚、入场动效
  page.js          首页：按顺序拼 11 个区块
  globals.css      全站样式（设计变量在 :root）
components/
  SiteChrome.js    书脊（左侧竖条）+ 抽屉菜单        客户端组件
  Reveal.js        滚动入场动效的观察者              客户端组件
  Footer.js        页脚
  StarMark.js      星芒图形
  home/            首页各区块；Hero（轮播）和 Ticker（公告条）是客户端组件，其余是服务端组件
```

内容区块都是服务端组件，文字直接输出在 HTML 里；只有需要交互的部分才是客户端组件。

## 约定

- 色调、字体、整体版式以现有设计为准，调细节不改风格。设计变量集中在 `app/globals.css` 的 `:root`，
  其中 `--rail`、`--gut`、`--pad-y` 在 1100px / 760px 两个断点里各有一份。
- 字体经 `next/font` 在构建时下载并自托管，运行时不请求 Google Fonts。
- 视频不进仓库，放 CDN；页面只引用地址。
- URL 用英文。

## 进度

- [x] M1 由单文件原型 1:1 迁移到 Next 工程
- [ ] M2 首页按栏目规划改造，接入海报与真实文案
- [ ] M3 关于我们各子页（历程 / 荣誉 / 资质 / 社媒 / 创始人）
- [ ] M4 SEO / GEO：每页 metadata、JSON-LD、sitemap、robots
- [ ] M5 系列页与产品详情页（待产品数据）
