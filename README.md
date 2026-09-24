# 宠适官网（petsfit 中文站）

国内「宠适」品牌官网。Next.js 16（App Router）+ TypeScript，服务端渲染，面向 SEO 与 GEO。

## 运行

```bash
npm install
npm run dev      # 开发：http://localhost:3000，保存即热更新
npm run build    # 构建
npm run start    # 生产模式运行
npm run lint
npm run typecheck  # TypeScript 类型检查，构建时也会自动跑
```

## 结构

```
app/
  layout.tsx       根布局：字体、书脊 + 抽屉菜单、页脚、入场动效
  page.tsx         首页：按栏目规划自上而下拼各区块
  series/[slug]/   系列详情页
  globals.css      全站样式（设计变量在 :root）
components/
  SiteChrome.tsx   书脊（左侧竖条）+ 抽屉菜单        客户端组件
  Reveal.tsx       滚动入场动效的观察者              客户端组件
  Footer.tsx       页脚
  LogoMark.tsx     P 形品牌标
  home/            首页各区块；Hero、Reel、Ticker、CampusCarousel 是客户端组件，其余是服务端组件
content/
  types.ts         全部内容数据的类型定义
  site.tsx         全站共用：导航、社媒、品牌片、公司信息
  home.ts          首页各区块的文案与图片
  series.ts        系列详情页数据
```

内容区块都是服务端组件，文字直接输出在 HTML 里；只有需要交互的部分才是客户端组件。

`components/home/` 下 About、Capability、Charity、Clients、Cta、Products 六个 B2B 区块首页暂未使用，留给 M3。

## 约定

- 色调、字体、整体版式以现有设计为准，调细节不改风格。设计变量集中在 `app/globals.css` 的 `:root`，
  其中 `--rail`、`--gut`、`--pad-y` 在 1100px / 760px 两个断点里各有一份。
- 字体经 `next/font` 在构建时下载并自托管，运行时不请求 Google Fonts。
- 视频不进仓库，放 CDN；页面只引用地址。
- URL 用英文。
- 上线前设环境变量 `SITE_URL=https://正式域名`（不设则为 `http://localhost:3200`）；sitemap、robots、canonical、分享卡片、结构化数据里的绝对地址都由它拼出，站点信息集中在 `content/seo.ts`。
- 文案和图片只改 `content/` 里的数据文件，字段以 `content/types.ts` 为准；少填或填错字段，`npm run typecheck` 会报出来。

## 进度

- [x] M1 由单文件原型 1:1 迁移到 Next 工程
- [x] M2 首页按栏目规划改造，接入海报与真实文案
- [x] M2.1 系列详情页首版、抽屉菜单改版
- [x] M2.2 品牌片接入首页
- [x] 迁移 TypeScript；手机紧凑版（手机保留电脑版构图，整体缩小）
- [ ] M3 关于我们各子页（历程 / 荣誉 / 资质 / 社媒 / 创始人）
- [x] M4 基础：每页 metadata（描述、canonical、Open Graph）、Organization / WebSite / 面包屑 JSON-LD、sitemap、robots
- [ ] M4 其余：Product / FAQPage / VideoObject 结构化数据（等产品资料、FAQ、宣传片上传日期）
- [ ] M5 系列页与产品详情页（待产品数据）
