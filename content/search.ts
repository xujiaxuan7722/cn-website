// 站内搜索的索引：从各内容文件汇总，改了 content 里的数据这里自动跟着变，不用单独维护。
// 搜索在浏览器里做（全站内容很少，不需要后端），顶栏的放大镜打开。
import type { StaticImageData } from 'next/image';
import { PRODUCT_GROUPS, CAMPUS, ABOUT, MILESTONES } from '@/content/home';
import { SERIES } from '@/content/series';

export interface SearchEntry {
  /** 结果里的分类小标签 */
  kind: '产品系列' | '产品线' | '校园公益' | '品牌';
  title: string;
  desc: string;
  href: string;
  image?: StaticImageData;
  /** 参与匹配、但不显示的词 */
  keywords?: string;
}

export const SEARCH_INDEX: SearchEntry[] = [
  ...SERIES.map((s): SearchEntry => ({
    kind: '产品系列',
    title: s.name,
    desc: [s.group.label, s.note, s.tagline].filter(Boolean).join(' · '),
    href: `/series/${s.slug}`,
    image: s.studio,
    keywords: s.points.join(' '),
  })),
  { kind: '产品线', title: '全部产品', desc: '宠适航空包、带宠出行、宠物家居、校园公益猫屋', href: '/products', keywords: '产品列表 全部 所有产品' },
  ...PRODUCT_GROUPS.map((g): SearchEntry => ({
    kind: '产品线',
    title: g.label,
    desc: g.series.map((s) => s.name).join('、'),
    href: `/products?cat=${g.id}`,
  })),
  ...CAMPUS.houses.map((h): SearchEntry => ({
    kind: '产品系列',
    title: h.name,
    desc: ['校园公益猫屋', h.note].filter(Boolean).join(' · '),
    href: '/#campus',
    image: h.studio,
    keywords: '猫屋 木制 户外 流浪猫',
  })),
  ...CAMPUS.slides.map((s): SearchEntry => ({
    kind: '校园公益',
    title: s.title,
    desc: [s.kicker, s.sub, s.slogan].filter(Boolean).join(' · '),
    href: '/#campus',
    image: s.image,
  })),
  ...CAMPUS.news.map((n): SearchEntry => ({
    kind: '校园公益',
    title: n.text,
    desc: '宠适之家校园公益动态',
    href: n.href,
  })),
  { kind: '品牌', title: '品牌故事', desc: '发展历程、创始人卢孔知、价值观「爱，分享，乐在其中」、荣誉资质', href: '/brand-story', keywords: '吉信德 历程 创始人 董事长 荣誉 专利 资质 价值观' },
  ...MILESTONES.map((m): SearchEntry => ({
    kind: '品牌',
    title: `${m.year} ${m.title}`,
    desc: m.text,
    href: '/brand-story#history',
  })),
  ...ABOUT.columns.map((c): SearchEntry => ({
    kind: '品牌',
    title: c.title,
    desc: c.links.join('、'),
    href: c.href || '/#about',
  })),
];

// 匹配：去掉空格后，每个词都要出现在标题、说明或关键词里；标题命中的排前面
export function searchSite(query: string, limit = 12): SearchEntry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const scored: { e: SearchEntry; score: number }[] = [];
  for (const e of SEARCH_INDEX) {
    const title = e.title.toLowerCase();
    const all = `${title} ${e.desc} ${e.keywords || ''}`.toLowerCase();
    if (!words.every((w) => all.includes(w))) continue;
    scored.push({ e, score: words.filter((w) => title.includes(w)).length });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((x) => x.e);
}
