// 轮播翻页控件（照 earthrated.com 首屏）：一组居中——上一张圆钮、「3 / 4」、下一张圆钮。
// 首屏和校园公益两处轮播共用；位置和颜色由外层（.hero / .pcar）的样式决定。
export default function CarouselNav({ cur, count, onPrev, onNext }: {
  cur: number;
  count: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="hnav">
      <button className="hnav-btn" aria-label="上一张" onClick={onPrev}><Triangle dir="left" /></button>
      <span className="hnav-num" aria-live="polite">{cur + 1} / {count}</span>
      <button className="hnav-btn" aria-label="下一张" onClick={onNext}><Triangle dir="right" /></button>
    </div>
  );
}

// 实心三角，重心正好落在 12×12 画布的中心 (6,6)，放进圆钮里居中后三角的中心就和圆心重合。
// 底边竖直、长 7.4；尖到底边 6.4；重心在底边往尖方向 6.4/3 处。
function Triangle({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d={dir === 'left' ? 'M8.13 2.3L1.73 6L8.13 9.7Z' : 'M3.87 2.3L10.27 6L3.87 9.7Z'} fill="currentColor" />
    </svg>
  );
}
