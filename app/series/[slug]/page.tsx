import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SERIES, findSeries } from '@/content/series';
import JsonLd from '@/components/JsonLd';
import Gallery from '@/components/pdp/Gallery';
import InfoTabs from '@/components/pdp/InfoTabs';
import ProductRail from '@/components/pdp/ProductRail';
import { CAMPUS } from '@/content/home';
import { SITE_URL } from '@/content/seo';

export function generateStaticParams() {
  return SERIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<'/series/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const s = findSeries(slug);
  if (!s) return {};
  // 有定位文案的用文案，没有的先给一句栏目归属，等材料补齐自动替换
  const description = s.tagline
    ? `宠适${s.name}：${s.tagline}。${s.points.join('；')}。`
    : `宠适${s.group.label}·${s.name}${s.note ? `（${s.note}）` : ''}。`;
  const path = `/series/${s.slug}`;
  return {
    title: `${s.name} · ${s.group.label}`,
    description,
    alternates: { canonical: path },
    openGraph: { url: path, title: `${s.name} · 宠适${s.group.label}`, description, images: [{ url: s.scene.src, width: s.scene.width, height: s.scene.height, alt: s.alt }] },
  };
}

// 系列详情页（09-24 照 ruffwear.com 商品页）：
// 首屏左产品图 / 右白色信息卡 → 通栏场景图组 → 深色信息区（产品详情 / 规格参数，只放文字）→ 其他产品推荐。
// 产品资料还没到位：没有的图显示「待补」占位，没有的文字写「待补」，不编内容
export default async function SeriesPage({ params }: PageProps<'/series/[slug]'>) {
  const { slug } = await params;
  const s = findSeries(slug);
  if (!s) notFound();

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: s.group.label, item: `${SITE_URL}/#${s.group.id}` },
      { '@type': 'ListItem', position: 3, name: s.name, item: `${SITE_URL}/series/${s.slug}` },
    ],
  };
  // 其他产品推荐：首页出现过的全部产品卡（航空包 / 带宠出行 / 宠物家居 12 个系列 + 4 款校园公益猫屋），
  // 去掉当前这一款，从它后面一款开始排，看完一圈再接回前面
  const all = [
    ...SERIES.map((o) => ({ href: `/series/${o.slug}`, name: o.name, sub: [o.group.label, o.note].filter(Boolean).join(' · '), image: o.studio, alt: o.alt, slug: o.slug })),
    ...CAMPUS.houses.flatMap((h) => (h.studio ? [{ href: '/#campus', name: h.name, sub: ['校园公益猫屋', h.note].filter(Boolean).join(' · '), image: h.studio, alt: h.alt, slug: '' }] : [])),
  ];
  const at = all.findIndex((o) => o.slug === s.slug);
  const picks = [...all.slice(at + 1), ...all.slice(0, at)].map(({ slug: _slug, ...rest }) => rest);

  return (
    <>
      <JsonLd data={breadcrumb} />

      {/* 首屏：左产品图，右信息卡 */}
      <section className="pd-top">
        <nav className="crumbs pd-crumbs" aria-label="位置">
          <Link href="/">首页</Link><span>/</span>
          <Link href={`/#${s.group.id}`}>{s.group.label}</Link><span>/</span>
          <b>{s.name}</b>
        </nav>
        <div className="pd-top-grid">
          <Gallery shots={[
            { image: s.studio, alt: s.alt },
            { image: s.scene, alt: s.alt },
            { image: null, alt: '' },
            { image: null, alt: '' },
          ]} />
          <div className="pd-buy" id="pd-buy">
            <p className="pd-group">{s.group.label}</p>
            <h1 className="pd-title">{s.name}</h1>
            {s.note && <p className="pd-code">{s.note}</p>}
            <p className={`pd-tagline${s.tagline ? '' : ' tbd'}`}>{s.tagline || '一句话定位待补'}</p>
            {s.points.length > 0 && (
              <ul className="pd-points">
                {s.points.map((p) => <li key={p}><CheckIcon />{p}</li>)}
              </ul>
            )}
            <div className="pd-field">
              <span className="pd-label">尺码</span>
              <div className="pd-sizes"><span className="tbd">尺码信息待补</span></div>
              <a className="pd-chart" href="#pd-info">尺码表</a>
            </div>
            <ul className="pd-perks">
              <li><PerkIcon kind="factory" />自有工厂制造</li>
              <li><PerkIcon kind="patent" />专利 500+ 项</li>
              <li><PerkIcon kind="since" />2013 年创立</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 通栏场景图组：一大两小 */}
      <section className="pd-mosaic" aria-label="场景图">
        <div className="pd-m-big"><Image src={s.scene} alt={s.alt} fill sizes="66vw" style={{ objectFit: 'cover' }} /></div>
        <div className="pd-m-small"><span className="pd-empty">场景图待补</span></div>
        <div className="pd-m-small"><span className="pd-empty">场景图待补</span></div>
      </section>

      {/* 深色信息区 */}
      <section className="pd-info" id="pd-info">
        <InfoTabs tabs={[
          {
            id: 'detail', label: '产品详情', body: (
              <div className="pd-prose">
                {s.tagline ? <p>宠适{s.name}，{s.tagline}。{s.points.join('；')}。</p> : <p className="tbd">产品介绍待补。</p>}
                <p className="tbd">更详细的使用场景、设计说明待补。</p>
              </div>
            ),
          },
          {
            id: 'specs', label: '规格参数', body: (
              <div className="pd-cols">
                <div>
                  <h3>规格</h3>
                  <dl className="pd-dl">
                    {s.specs.map((row) => (<div key={row.k}><dt>{row.k}</dt><dd className={row.v === '—' ? 'tbd' : ''}>{row.v === '—' ? '待补' : row.v}</dd></div>))}
                  </dl>
                </div>
                <div>
                  <h3>清洁与保养</h3>
                  <p className="tbd">清洁与保养说明待补。</p>
                </div>
              </div>
            ),
          },
        ]} />
      </section>

      {/* 其他产品推荐 */}
      <section className="pd-more">
        <h2 className="ptabs-title">其他产品推荐</h2>
        <ProductRail items={picks} />
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <svg className="pd-check" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path d="M6.6 12.4l3.6 3.5 7.2-7.6" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 信息卡底部三枚品牌背书小图标（内容取自品牌片旁白与发展历程）
function PerkIcon({ kind }: { kind: 'factory' | 'patent' | 'since' }) {
  const d = {
    factory: <><path d="M3 20V10l5 3V10l5 3V6h4l1 14z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M3 20h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></>,
    patent: <><circle cx="12" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M8.5 15l-1.5 6 5-2.5 5 2.5-1.5-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></>,
    since: <><rect x="4" y="5" width="16" height="15" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M4 10h16M9 3v4M15 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></>,
  }[kind];
  return <svg viewBox="0 0 24 24" aria-hidden="true">{d}</svg>;
}
