import Link from 'next/link';
import { ABOUT } from '@/content/home';

// 关于我们：标题行 + 四张小卡片，一张一个子栏目（上面是品牌片卡片，见 Reel）。
// 卡片平时只有栏目名；鼠标移上去（或键盘移到卡片上），下面展开这一栏的具体条目。
// 整张可点；子页面还没做，先指向首页锚点。
export default function AboutBlock() {
  const a = ABOUT;
  return (
    <section className="slab ground grid series-block about-block" data-label="关于我们">
      {/* 标题行和「宠适产品」「校园公益猫屋」同一套：蓝绿大标题 + 一句说明 */}
      <div className="ptabs-head" data-reveal="">
        <div>
          <h2 className="ptabs-title">关于我们</h2>
          <p className="ptabs-lede">{a.title.join('')}</p>
        </div>
      </div>
      <div className="tiles">
        {a.columns.map((col, i) => (
          <Link key={col.title} className="tile" href={col.href || '/#about'} data-reveal={i === 0 ? '' : String(i + 1)}>
            <span className="tile-head">
              <h3>{col.title}</h3>
              <span className="en">{col.en}</span>
            </span>
            <ul className="tile-more">
              {col.links.map((link) => <li key={link}>{link}</li>)}
            </ul>
            <i className="arrow sm" aria-hidden="true"></i>
          </Link>
        ))}
      </div>
    </section>
  );
}
