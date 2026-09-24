// 全站内容数据的类型。content/ 下每份数据都按这里的结构写，
// 以后补产品资料、改文案时少字段或写错字段名，编辑器和 `npx tsc` 会直接报出来。
import type { ReactNode } from 'react';
import type { StaticImageData } from 'next/image';

/** 站内链接：去向 + 按钮/读屏文字 */
export interface LinkItem {
  href: string;
  label: string;
}

/* ---------------- 全站 ---------------- */

export interface NavPrimaryItem {
  href: string;
  title: string;
  desc: string;
}

export interface SocialAccount {
  name: string;
  where: string;
  handle: string;
}

export interface SocialLink {
  name: string;
  href: string;
  /** 24×24 画布里的单色线描，跟随文字色 */
  icon: ReactNode;
}

export interface BrandFilm {
  title: string;
  /** 视频地址；上线时换成 CDN 地址 */
  src: string;
  duration: string;
  alt: string;
  /** 首页品牌片卡片左侧的文字：小标签、标题、正文、底部按钮 */
  eyebrow: string;
  headline: string;
  lede: string;
  motto: string;
  cta: string;
}

export interface Company {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface Legal {
  /** ICP 备案号，上线前必须填 */
  icp: string;
  /** 公安联网备案号 */
  police: string;
}

/* ---------------- 信任条 ---------------- */

/** 首屏下面那条滚动的信任条，一项一句；strong 是句首要突出的数字 */
export interface TrustItem {
  strong?: string;
  text: string;
}

/* ---------------- 首屏轮播 ---------------- */

export type Tone = 'light' | 'dark';

export interface HeroCheck {
  text: string;
  /** 文字前加粗的部分，比如「10W+」 */
  strong?: string;
  /** 文字后的小字补充 */
  note?: string;
  /** 红色强调 */
  hot?: boolean;
}

export interface HeroLine {
  text: string;
  strong?: boolean;
}

export type StatIconName = 'campus' | 'stray' | 'funds' | 'supplies';

export interface HeroStat {
  icon: StatIconName;
  num: string;
  unit: string;
  label: string;
  en: string;
}

export interface HeroSlide {
  id: string;
  /** 左上角是否带 PETSFIT 字标 */
  wordmark?: boolean;
  /** 底图浅色还是深色，决定文字和控件用深青还是白 */
  tone: Tone;
  /** left = 文案在左；top = 标题压在图片自带的顶部横条上 */
  layout: 'left' | 'top';
  image: StaticImageData;
  alt: string;
  /** 桌面端图片铺满时保留的位置（CSS object-position） */
  position?: string;
  /** 手机端图片铺满时保留的位置 */
  positionMobile?: string;
  kicker?: string;
  title: string;
  sub?: string;
  /** 标题字号收一档（标题较长时用） */
  compact?: boolean;
  /** layout 为 top 时跟在标题后的小标签 */
  tags?: string[];
  checks?: HeroCheck[];
  lines?: HeroLine[];
  /** [前半句, 加粗大数字, 后半句] */
  lead?: [string, string, string];
  stats?: HeroStat[];
  slogan?: string[];
  cta: LinkItem;
}

/* ---------------- 产品系列 ---------------- */

/** 首页系列卡 / 猫屋卡 */
export interface SeriesCard {
  name: string;
  /** 详情页地址里的英文名（/series/<slug>）；没有详情页的卡不填 */
  slug?: string;
  /** 卡片下方的小字，一般是型号 */
  note: string;
  /** 灰底棚拍图，平时显示 */
  studio?: StaticImageData;
  /** 场景图，悬停时换上 */
  image?: StaticImageData;
  alt: string;
}

export interface GroupBanner {
  image: StaticImageData;
  alt: string;
  copy?: {
    eyebrow: string;
    title: string;
    lines: string[];
  };
}

export interface ProductGroup {
  /** 首页锚点 id */
  id: string;
  label: string;
  /** 一行或两行标题 */
  title: [string] | [string, string];
  tone: 'paper' | 'ground' | 'dark';
  banner?: GroupBanner;
  series: SeriesCard[];
}

/** 首页产品区（三条产品线合成一块，分页切换）的标题 */
export interface ProductsIntro {
  title: string;
  lede: string;
}

/* ---------------- 校园公益 ---------------- */

export interface CampusSlide {
  id: string;
  image: StaticImageData;
  alt: string;
  /** 文案在图上的位置 */
  layout: 'top' | 'left' | 'center';
  kicker?: string;
  title: string;
  sub?: string;
  slogan?: string;
  cta: LinkItem;
}

export interface Stat {
  num: string;
  unit: string;
}

export interface NewsItem extends LinkItem {
  text: string;
}

export interface Campus {
  slides: CampusSlide[];
  eyebrow: string;
  title: string[];
  lede: string;
  stats: Stat[];
  news: NewsItem[];
  housesTitle: string;
  housesLede: string;
  houses: SeriesCard[];
}

/* ---------------- 关于我们 ---------------- */

export interface AboutColumn {
  title: string;
  en: string;
  href: string;
  links: string[];
}

export interface About {
  eyebrow: string;
  title: string[];
  lede: string;
  cta: LinkItem;
  columns: AboutColumn[];
}

export interface Milestone {
  year: string;
  title: string;
  text: string;
}
