'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import SeriesGrid from '@/components/SeriesGrid';
import usePrefersReducedMotion from '@/components/hooks/usePrefersReducedMotion';
import { PRODUCTS_INTRO, PRODUCT_GROUPS } from '@/content/home';

// 首页产品区：三条产品线合成一块，右上角分页切换，像首屏轮播一样自动轮换。
// 自动轮换一直走（和首屏不同，手动操作后不停）：只在这一块露在屏幕里时走；
// 鼠标停在卡片上、或用键盘把焦点移进来时暂停；手动点分页、从菜单跳进来，切到那一页后多停一轮再继续。
// 开了"减少动效"不自动轮换。
// 三组卡片都由服务端输出到 HTML 里（叠在同一格，只切换显隐），爬虫能看到全部系列。
//
// 原来三块各有锚点（#air-carrier / #travel / #home-living），菜单和首屏按钮都指向它们：
// 锚点留在这一块顶上，点到哪条产品线就切到那一页。

const GROUPS = PRODUCT_GROUPS;
// 每页停留 3 秒（09-24 用户定）；手动选中的那一页停两倍
const DWELL = 3000;
const HOLD = DWELL * 2;

export default function ProductTabs() {
  const reduce = usePrefersReducedMotion();
  const box = useRef<HTMLElement>(null);
  const [cur, setCur] = useState(0);
  const [held, setHeld] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const autoOn = !reduce;
  const running = autoOn && inView && !hovering && !focused;
  const delay = held ? HOLD : DWELL;

  const pick = (i: number) => {
    setHeld(true);
    setCur(i);
  };

  // 露在屏幕里才轮换
  useEffect(() => {
    const el = box.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => {
      setHeld(false);
      setCur((c) => (c + 1) % GROUPS.length);
    }, delay);
    return () => clearTimeout(t);
  }, [cur, running, delay]);

  // 带着锚点进来、或在页面里点了指向某条产品线的链接：切到那一页
  useEffect(() => {
    const byHash = (hash: string) => GROUPS.findIndex((g) => `#${g.id}` === hash);
    const fromHash = () => {
      const i = byHash(window.location.hash);
      if (i >= 0) pick(i);
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href*="#"]');
      if (!a) return;
      const i = byHash('#' + (a.getAttribute('href') || '').split('#')[1]);
      if (i >= 0) pick(i);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    document.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener('hashchange', fromHash);
      document.removeEventListener('click', onClick, true);
    };
  }, []);

  return (
    <section
      ref={box}
      className="slab grid ptabs"
      id="products"
      data-label="产品"
      // 只认键盘焦点：鼠标点了分页按钮，焦点也会停在按钮上，那不算"在看"
      onFocus={(e) => { if (e.target.matches(':focus-visible')) setFocused(true); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false); }}
    >
      {GROUPS.map((x) => <span key={x.id} id={x.id} className="ptabs-anchor" aria-hidden="true" />)}

      <div className="ptabs-head" data-reveal="">
        <div>
          <h2 className="ptabs-title">{PRODUCTS_INTRO.title}</h2>
          <p className="ptabs-lede">{PRODUCTS_INTRO.lede}</p>
        </div>
        <div className="ptabs-tabs" role="tablist" aria-label="产品线">
          {GROUPS.map((x, i) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              id={`tab-${x.id}`}
              aria-controls={`panel-${x.id}`}
              aria-selected={i === cur}
              tabIndex={i === cur ? 0 : -1}
              className={i === cur ? 'is-on' : undefined}
              onClick={() => pick(i)}
              onKeyDown={(e) => {
                if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
                const n = (cur + (e.key === 'ArrowRight' ? 1 : GROUPS.length - 1)) % GROUPS.length;
                pick(n);
                document.getElementById(`tab-${GROUPS[n].id}`)?.focus();
              }}
            >
              {x.label}
              {/* 当前这一页的停留进度，和首屏轮播的进度条同一个意思 */}
              {i === cur && autoOn && (
                <i key={`${cur}-${held}`} className={`ptabs-bar${running ? '' : ' is-paused'}`} style={{ '--dwell': `${delay}ms` } as CSSProperties} aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="ptabs-panels" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        {GROUPS.map((x, i) => (
          <div
            key={x.id}
            role="tabpanel"
            id={`panel-${x.id}`}
            aria-labelledby={`tab-${x.id}`}
            className={`ptabs-panel${i === cur ? ' is-on' : ''}`}
            inert={i !== cur}
          >
            <SeriesGrid items={x.series} href={`/#${x.id}`} hrefBase="/series/" label={x.label} artOffset={i * 2} />
          </div>
        ))}
      </div>

      <div className="ptabs-more">
        {/* 统一叫「查看全部产品」（09-24 用户定），去全部产品页 */}
        <Link className="pill-btn" href="/products">查看全部产品</Link>
      </div>
    </section>
  );
}
