import Link from 'next/link';
import { ABOUT } from '@/content/home';

// 关于我们：和产品区块同一套标题行（只有栏目名 + 右侧链接 + 细线），下面四个白格，一格一个子栏目。
// 整格可点；子页面还没做，先指向首页锚点。
export default function AboutBlock() {
  const a = ABOUT;
  return (
    <section className="slab ground grid series-block about-block" id="about" data-label="关于我们">
      <div className="group-head" data-reveal="">
        <div><h2 className="display">关于我们</h2></div>
        <Link className="tlink" href={a.cta.href}>{a.cta.label}<i className="arrow sm" aria-hidden="true"></i></Link>
      </div>
      <div className="tiles">
        {a.columns.map((col, i) => (
          <Link key={col.title} className="tile" href={col.href || '/#about'} data-reveal={i === 0 ? '' : String(i + 1)}>
            <span className="tile-head">
              <h3>{col.title}</h3>
              <span className="en">{col.en}</span>
            </span>
            <ul>
              {col.links.map((link) => <li key={link}>{link}</li>)}
            </ul>
            <i className="arrow sm" aria-hidden="true"></i>
          </Link>
        ))}
      </div>
    </section>
  );
}
