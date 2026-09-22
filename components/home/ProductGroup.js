import Link from 'next/link';
import Image from 'next/image';
import SeriesGrid from '@/components/SeriesGrid';

// 产品系列首页展示：一个主栏目一块。
// 横幅带 copy 时走「海报块」版式：横幅出血到石板两边、标题和链接都在横幅里、四张卡压着横幅底边；
// 不带时照旧：上方标题 + 右侧链接 + 栅格内横幅。栏目名由书脊竖排承担，不再单独放一行。
export default function ProductGroup({ group, artOffset }) {
  const href = `/#${group.id}`;
  const copy = group.banner?.copy;
  const more = <Link className="tlink" href={href}>查看{group.label}全部产品<i className="arrow sm" aria-hidden="true"></i></Link>;

  if (copy) {
    return (
      <section className={`slab ${group.tone} grid poster-block`} id={group.id} data-label={group.label}>
        <div className="group-banner has-copy" data-reveal="">
          <Image src={group.banner.image} alt={group.banner.alt} sizes="(max-width: 760px) 100vw, 96vw" placeholder="blur" />
          <div className="banner-copy">
            <p className="banner-eyebrow">{copy.eyebrow}</p>
            <h2 className="banner-title">{copy.title}</h2>
            {copy.lines.map((l) => <p key={l} className="banner-line">{l}</p>)}
            <p className="banner-more">{more}</p>
          </div>
        </div>
        <SeriesGrid items={group.series} href={href} label={group.label} artOffset={artOffset} />
      </section>
    );
  }

  return (
    <section className={`slab ${group.tone} grid series-block`} id={group.id} data-label={group.label}>
      {/* 标题行：标题和「查看全部」同一条基线，下面一条细线把"头"和内容分开 */}
      <div className="group-head" data-reveal="">
        <div>
          {group.title.length > 1 && <p className="eyebrow">{group.label}</p>}
          <h2 className="display">
            {group.title[0]}
            {group.title[1] && <><br className="pc" />{group.title[1]}</>}
          </h2>
        </div>
        {more}
      </div>
      {group.banner && (
        <div className="group-banner" data-reveal="">
          <Image src={group.banner.image} alt={group.banner.alt} sizes="(max-width: 760px) 100vw, 86vw" placeholder="blur" />
        </div>
      )}
      <SeriesGrid items={group.series} href={href} label={group.label} artOffset={artOffset} />
    </section>
  );
}
