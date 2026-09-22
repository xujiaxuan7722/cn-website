import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SERIES, findSeries } from '@/content/series';
import SeriesGrid from '@/components/SeriesGrid';

export function generateStaticParams() {
  return SERIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = findSeries(slug);
  return { title: s ? `${s.name} · ${s.group.label} · 宠适` : '宠适' };
}

// 系列详情页。三种头图排版用 ?layout=a|b|c 切换（试排版用，定稿后只留一种）：
// a 左文右图（同首屏几何） / b 通幅大图，标题压在图上（同校园公益海报） / c 图居中、文在下（以产品为主的系列）
export default async function SeriesPage({ params, searchParams }) {
  const { slug } = await params;
  const { layout = 'a' } = await searchParams;
  const s = findSeries(slug);
  if (!s) notFound();
  const L = ['a', 'b', 'c'].includes(layout) ? layout : 'a';

  const crumbs = (
    <nav className="crumbs" aria-label="位置">
      <Link href="/">首页</Link><span>/</span>
      <Link href={`/#${s.group.id}`}>{s.group.label}</Link><span>/</span>
      <b>{s.name}</b>
    </nav>
  );
  const copy = (
    <>
      <h1 className="sp-title">{s.name}{s.note && <small>{s.note}</small>}</h1>
      {s.tagline ? <p className="sp-tagline">{s.tagline}</p> : <p className="sp-tagline tbd">一句话定位待补</p>}
      {s.points.length > 0 && (
        <ul className="h-checks sp-points">
          {s.points.map((p) => <li key={p}><CheckIcon /><span>{p}</span></li>)}
        </ul>
      )}
    </>
  );

  return (
    <>
      {/* 头图区 */}
      {L === 'a' && (
        <section className="slab paper grid sp-hero sp-a" data-label={s.group.label}>
          <div className="sp-a-copy">{crumbs}{copy}</div>
          <div className="sp-a-pic"><Image src={s.scene} alt={s.alt} sizes="(max-width: 760px) 100vw, 50vw" placeholder="blur" style={{ width: '100%', height: '100%', objectFit: 'cover' }} priority /></div>
        </section>
      )}
      {L === 'b' && (
        <section className="slab flush sp-hero sp-b" data-label={s.group.label}>
          <div className="sp-b-pic"><Image src={s.scene} alt={s.alt} fill sizes="100vw" placeholder="blur" style={{ objectFit: 'cover', objectPosition: '70% 50%' }} priority /></div>
          <div className="grid sp-b-copy"><div>{crumbs}{copy}</div></div>
        </section>
      )}
      {L === 'c' && (
        <section className="slab paper grid sp-hero sp-c" data-label={s.group.label}>
          <div className="sp-c-in">
            {crumbs}
            <div className="sp-c-pic"><Image src={s.studio} alt={s.alt} sizes="(max-width: 760px) 100vw, 60vw" placeholder="blur" style={{ width: '100%', height: 'auto' }} priority /></div>
            <div className="sp-c-copy">{copy}</div>
          </div>
        </section>
      )}

      {/* 产品清单 */}
      <section className="slab paper grid series-block sp-products" data-label={s.group.label}>
        <div className="group-head" data-reveal="">
          <div><h2 className="display">{s.name}产品</h2></div>
          <span className="small">{s.products.filter((p) => p.image).length} / {s.products.length} 款已有资料</span>
        </div>
        <ul className="sp-list">
          {s.products.map((p, i) => (
            <li key={i} className={p.image ? '' : 'is-empty'} data-reveal={i === 0 ? '' : String(i + 1)}>
              <span className="sp-shot">
                {p.image
                  ? <Image src={p.image} alt={p.name} sizes="(max-width: 760px) 50vw, 22vw" placeholder="blur" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <span className="sp-empty">产品图待补</span>}
              </span>
              <span className="capt"><span className="title">{p.name}</span>{p.code && <span className="client">{p.code}</span>}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 规格 */}
      <section className="slab ground grid sp-specs" data-label={s.group.label}>
        <div className="c-head"><h2 className="display sp-h2">规格参数</h2></div>
        <dl className="c-aside sp-dl">
          {s.specs.map((row) => (<div key={row.k}><dt>{row.k}</dt><dd className={row.v === '—' ? 'tbd' : ''}>{row.v}</dd></div>))}
        </dl>
      </section>

      {/* 同栏目其他系列 */}
      <section className="slab paper grid series-block" data-label={s.group.label}>
        <div className="group-head" data-reveal="">
          <div><h2 className="display">{s.group.label}其他系列</h2></div>
          <Link className="tlink" href={`/#${s.group.id}`}>返回{s.group.label}<i className="arrow sm" aria-hidden="true"></i></Link>
        </div>
        <SeriesGrid items={s.siblings} hrefBase="/series/" label={s.group.label} />
      </section>

      {/* 排版切换，试排版期间用 */}
      <nav className="sp-switch" aria-label="排版试样">
        {['a', 'b', 'c'].map((k) => <Link key={k} href={`/series/${s.slug}?layout=${k}`} className={k === L ? 'is-on' : ''}>{k.toUpperCase()}</Link>)}
      </nav>
    </>
  );
}

function CheckIcon() {
  return (
    <svg className="h-check" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path d="M6.6 12.4l3.6 3.5 7.2-7.6" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
