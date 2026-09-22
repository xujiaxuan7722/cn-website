import Ticker from './Ticker';
import { ANNOUNCEMENTS } from '@/content/home';

// 公告条
export default function Band() {
  return (
    <section className="band grid" data-label="品牌">
      <Ticker items={ANNOUNCEMENTS} />
    </section>
  );
}
