import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import poster from '@/public/videos/brand-film-poster.jpg';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/content/seo';
import {
  STORY_INTRO, STORY_STATS, STORY_ERAS, STORY_FOUNDER, STORY_VALUES, STORY_HONOR_HIGHLIGHTS, STORY_HONORS,
} from '@/content/story';

export const metadata: Metadata = {
  title: '品牌故事',
  description: '宠适 PETSFIT 品牌故事：吉信德 2001 年成立于厦门，2013 年创立宠适 PETSFIT。发展历程、创始人、企业价值观与荣誉资质。',
  alternates: { canonical: '/brand-story' },
};

// 品牌故事（09-24）：关于我们「品牌故事」卡片的落地页。
// 首屏 → 数字条 → 发展历程（三段）→ 创始人 → 价值观 → 荣誉资质 → 团队风采 → 宣传片 / 品牌手册。
// 文字全部摘自资料准备里的历程、荣誉、资质表和董事长专访；缺的（创始人照片、团队照片、品牌手册）留占位
const JUMPS = [
  { id: 'history', label: '发展历程' },
  { id: 'founder', label: '创始人' },
  { id: 'values', label: '价值观' },
  { id: 'honors', label: '荣誉资质' },
  { id: 'team', label: '团队风采' },
  { id: 'film', label: '宣传片' },
];

export default function BrandStoryPage() {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: '宠适品牌故事',
    url: `${SITE_URL}/brand-story`,
    about: { '@type': 'Organization', name: '厦门吉信德集团有限公司', foundingDate: '2001', founder: { '@type': 'Person', name: STORY_FOUNDER.name } },
  };
  return (
    <>
      <JsonLd data={org} />

      {/* 首屏 */}
      <section className="bs-hero">
        <div className="bs-hero-copy">
          <nav className="crumbs" aria-label="位置">
            <Link href="/">首页</Link><span>/</span><Link href="/#about">关于我们</Link><span>/</span><b>品牌故事</b>
          </nav>
          <h1 className="bs-title">{STORY_INTRO.title}</h1>
          <p className="bs-slogan">{STORY_INTRO.slogan}</p>
          <p className="bs-lede">{STORY_INTRO.lede}</p>
          <ul className="bs-jumps">
            {JUMPS.map((j) => <li key={j.id}><a href={`#${j.id}`}>{j.label}</a></li>)}
          </ul>
        </div>
        <div className="bs-hero-pic">
          <Image src={poster} alt="航拍的吉信德厂区，玻璃幕墙办公楼与厂房" fill sizes="(max-width: 1100px) 100vw, 50vw" placeholder="blur" priority style={{ objectFit: 'cover' }} />
        </div>
      </section>

      {/* 数字条 */}
      <section className="bs-stats" aria-label="吉信德一览">
        <ul>
          {STORY_STATS.map((s) => (
            <li key={s.label}><b>{s.num}<small>{s.unit}</small></b><span>{s.label}</span></li>
          ))}
        </ul>
      </section>

      {/* 发展历程 */}
      <section className="bs-sec" id="history">
        <div className="bs-head">
          <h2 className="ptabs-title">发展历程</h2>
          <p className="ptabs-lede">从厦门的一家外贸工厂，到拥有自主品牌与智慧工厂的宠物用品企业</p>
        </div>
        {STORY_ERAS.map((era) => (
          <div className="bs-era" key={era.range}>
            <div className="bs-era-head">
              <span>{era.range}</span>
              <h3>{era.title}</h3>
            </div>
            <ol className="bs-events">
              {era.events.map((e) => (
                <li key={e.year + e.text.slice(0, 6)}><b>{e.year}</b><p>{e.text}</p></li>
              ))}
            </ol>
          </div>
        ))}
      </section>

      {/* 创始人 */}
      <section className="bs-sec" id="founder">
        <div className="bs-founder">
          <div className="bs-founder-pic"><span className="pd-empty">创始人照片待补</span></div>
          <div className="bs-founder-copy">
            <p className="bs-kicker">创始人</p>
            <h2>{STORY_FOUNDER.name}</h2>
            <p className="bs-role">{STORY_FOUNDER.role}</p>
            <blockquote>「{STORY_FOUNDER.quote}」</blockquote>
            {STORY_FOUNDER.paragraphs.map((p) => <p key={p.slice(0, 8)} className="bs-para">{p}</p>)}
          </div>
        </div>
      </section>

      {/* 价值观 */}
      <section className="bs-values" id="values">
        <p className="bs-kicker">核心价值观</p>
        <h2>{STORY_VALUES.title}</h2>
        <ul>
          {STORY_VALUES.items.map((v) => <li key={v.word}><b>{v.word}</b><p>{v.text}</p></li>)}
        </ul>
      </section>

      {/* 荣誉资质 */}
      <section className="bs-sec" id="honors">
        <div className="bs-head">
          <h2 className="ptabs-title">荣誉资质</h2>
          <p className="ptabs-lede">专利 500 余项，国家知识产权优势企业</p>
        </div>
        <ul className="bs-honors">
          {STORY_HONOR_HIGHLIGHTS.map((h) => (
            <li key={h.title}><span>{h.year}</span><b>{h.title}</b>{h.by && <small>{h.by}</small>}</li>
          ))}
        </ul>
        <details className="bs-all">
          <summary>查看全部荣誉资质（{STORY_HONORS.length} 项）</summary>
          <table>
            <tbody>
              {STORY_HONORS.map((h) => (
                <tr key={h.year + h.title}><th>{h.year}</th><td>{h.title}</td><td>{h.by || ''}</td></tr>
              ))}
            </tbody>
          </table>
        </details>
      </section>

      {/* 团队风采 */}
      <section className="bs-sec" id="team">
        <div className="bs-head">
          <h2 className="ptabs-title">团队风采</h2>
          <p className="ptabs-lede">从几个人的创业小团队，到 700 多人的集团公司</p>
        </div>
        <ul className="bs-team">
          {[0, 1, 2].map((i) => <li key={i}><span className="pd-empty">团队照片待补</span></li>)}
        </ul>
      </section>

      {/* 宣传片 / 品牌手册 */}
      <section className="bs-sec bs-last" id="film">
        <div className="bs-links">
          <Link className="bs-link" href="/#about">
            <span className="bs-link-pic"><Image src={poster} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectFit: 'cover' }} /><i aria-hidden="true" /></span>
            <b>观看品牌宣传片</b>
            <small>吉信德 SUNNYPET 宣传片 · 3′17″</small>
          </Link>
          <div className="bs-link is-off" aria-disabled="true">
            <span className="bs-link-pic"><span className="pd-empty">品牌手册待补</span></span>
            <b>下载品牌手册</b>
            <small>PDF 待补</small>
          </div>
        </div>
      </section>
    </>
  );
}
