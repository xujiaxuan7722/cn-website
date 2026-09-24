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

      <section className="slab paper grid series-block" data-label="校园公益">
        <div className="group-head" data-reveal="">
          <div><h2 className="display">校园公益猫屋</h2></div>
          <Link className="tlink" href="/#campus">查看木制产品<i className="arrow sm" aria-hidden="true"></i></Link>
        </div>
        <SeriesGrid items={c.houses} href="/#campus" label="木制产品" artOffset={4} />
      </section>
    </>
  );
}
