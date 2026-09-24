import { TRUST } from '@/content/home';

// 首屏下面的信任条：蓝绿底一行字，缓慢向左滚动，鼠标移上去停。
// 同一组内容排两遍首尾相接，滚完一遍正好接上；第二遍只给眼睛看，读屏跳过。
// 开了"减少动效"就不滚，停在第一遍。
export default function TrustStrip() {
  const row = (hidden: boolean) => (
    <ul className="trust-row" aria-hidden={hidden || undefined}>
      {TRUST.map((t) => (
        <li key={t.text}>{t.strong && <b>{t.strong}</b>}{t.text}</li>
      ))}
    </ul>
  );
  return (
    <section className="trust" data-label="品牌" aria-label="宠适品牌背书">
      <div className="trust-track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
