import Link from 'next/link';
import Image from 'next/image';
import PlaceholderArt from '@/components/PlaceholderArt';

// 一行 4 张的系列卡。
// 有 studio + image：平时显示灰底棚拍图，悬停淡成带人的场景图，没有遮罩、没有覆盖文字。
// 只有 image：直接显示；两者都没有：色块占位（沿用原型产品卡的悬停遮罩 + 系列名）。
export default function SeriesGrid({ items, href, hrefBase, label, artOffset = 0 }) {
  const to = (item) => (hrefBase && item.slug ? hrefBase + item.slug : href);
  return (
    <div className="work four">
      {items.map((item, i) => (
        <Link key={item.name} href={to(item)} data-reveal={i === 0 ? '' : String(i + 1)}>
          {item.studio ? (
            <span className="shot is-photo is-swap">
              <Image src={item.studio} alt={item.alt || item.name} sizes="(max-width: 760px) 50vw, 22vw" placeholder="blur" />
              <Image className="scene" src={item.image} alt="" sizes="(max-width: 760px) 50vw, 22vw" aria-hidden="true" />
            </span>
          ) : (
            <span className={`shot${item.image ? ' is-photo' : ''}`}>
              {item.image
                ? <Image src={item.image} alt={item.alt || item.name} sizes="(max-width: 760px) 50vw, 22vw" placeholder="blur" />
                : <PlaceholderArt index={artOffset + i} />}
              <span className="overlay">
                <span className="brandmark">{item.name}</span>
                <i className="arrow" aria-hidden="true"></i>
              </span>
            </span>
          )}
          <span className="capt">
            <span className="title">{item.name}</span>
            {item.note && <span className="client">{item.note}</span>}
          </span>
        </Link>
      ))}
    </div>
  );
}
