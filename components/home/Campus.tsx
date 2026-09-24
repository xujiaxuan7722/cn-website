import Link from 'next/link';
import Ticker from './Ticker';
import CampusCarousel from './CampusCarousel';
import SeriesGrid from '@/components/SeriesGrid';
import { CAMPUS } from '@/content/home';

// 校园公益：三张海报轮播 → 最新新闻 → 四款猫屋
export default function Campus() {
  const c = CAMPUS;
  return (
    <>
      <section className="slab flush" id="campus" data-label="校园公益">
        <h2 className="sr-only">校园公益</h2>
        <CampusCarousel slides={c.slides} />
      </section>

      <section className="band grid" data-label="校园公益">
        <Ticker items={c.news} />
      </section>

      {/* 猫屋卡：和上面「宠适产品」同一套样式（大标题 + 一句说明、系列名蓝绿粗体、圆角图、底部胶囊按钮） */}
      <section className="slab grid ptabs houses" data-label="校园公益">
        <div className="ptabs-head" data-reveal="">
          <div>
            <h2 className="ptabs-title">{c.housesTitle}</h2>
            <p className="ptabs-lede">{c.housesLede}</p>
          </div>
        </div>
        <SeriesGrid items={c.houses} href="/#campus" label="木制产品" artOffset={4} />
        <div className="ptabs-more">
          <Link className="pill-btn" href="/products?cat=houses">查看全部产品</Link>
        </div>
      </section>
    </>
  );
}
