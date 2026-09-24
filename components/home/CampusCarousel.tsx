'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { TouchEvent } from 'react';
import usePrefersReducedMotion from '@/components/hooks/usePrefersReducedMotion';
import type { CampusSlide } from '@/content/types';
import CarouselNav from '@/components/CarouselNav';

// 校园公益海报轮播：1920×600 通宽，交叉淡入，7s 一张，手动操作后停止自动播放。
// 文字是 HTML 压在图上；翻页控件在底部居中（和首屏同一套）。这一组只是展示，不做整张点击跳转。
export default function CampusCarousel({ slides }: { slides: CampusSlide[] }) {
  const reduce = usePrefersReducedMotion();
  const count = slides.length;
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [stopped, setStopped] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const autoOn = !reduce && !stopped;

  const paint = (n: number) => { setPrev(cur); setCur(n); };
  const manual = (n: number) => { setStopped(true); paint(n); };

  useEffect(() => {
    if (!autoOn || paused) return;
    const t = setTimeout(() => paint((cur + 1) % count), 7000);
    return () => clearTimeout(t);
  }, [cur, autoOn, paused]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 700);
    return () => clearTimeout(t);
  }, [prev]);

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 48) return;
    manual((cur + (dx < 0 ? 1 : count - 1)) % count);
  };

  return (
    <div
      className="pcar"
      aria-roledescription="轮播"
      aria-label="校园公益活动"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((s, i) => {
        const state = `${i === cur ? ' is-active' : ''}${i === prev && i !== cur ? ' is-prev' : ''}`;
        return (
          <div key={s.id} className={`pslide layout-${s.layout} is-${s.id}${state}`} role="group" aria-label={`第 ${i + 1} 张，共 ${count} 张`} aria-hidden={i === cur ? undefined : 'true'}>
            {/* 图和手写标语放在同一层里一起缓推放大（和首屏一样 7s 到 1.06），文字层不动 */}
            <div className="pshot">
              <Image src={s.image} alt={s.alt} fill sizes="100vw" placeholder="blur" style={{ objectFit: 'cover' }} priority={false} />
              {s.slogan && <span className="p-slogan-art" aria-hidden="true" />}
            </div>
            <div className="pcopy">
              {s.kicker && <p className="p-kicker">{s.kicker}</p>}
              <h3 className="p-title">{s.title}</h3>
              {s.sub && <p className="p-sub">{s.sub}</p>}
            </div>
            {/* 手写标语的文字留给读屏和爬虫；画面上显示的是 .pshot 里的矢量 */}
            {s.slogan && <p className="p-slogan">{s.slogan}</p>}
          </div>
        );
      })}

      {/* 翻页控件和首屏同一套：底部居中，上一张 /「1 / 3」/ 下一张 */}
      <CarouselNav cur={cur} count={count} onPrev={() => manual((cur + count - 1) % count)} onNext={() => manual((cur + 1) % count)} />
    </div>
  );
}
