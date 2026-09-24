'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent, ReactNode, TouchEvent } from 'react';
import Image from 'next/image';
import BrandLockup from '@/components/BrandLockup';
import CarouselNav from '@/components/CarouselNav';
import usePrefersReducedMotion from '@/components/hooks/usePrefersReducedMotion';
import { HERO_SLIDES } from '@/content/home';
import type { StatIconName } from '@/content/types';

const SLIDES = HERO_SLIDES;

const COUNT = SLIDES.length;

// 1 · 首屏轮播：3s 一张（09-24 用户定，原 7s），任一次手动操作后永久停止自动播放。
// 每一张的文字都在服务端输出到 HTML 里，浏览器里只切换 class。
export default function Hero() {
  const reduce = usePrefersReducedMotion();
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [userStopped, setUserStopped] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const autoOn = !reduce && !userStopped;

  const paint = (n: number) => {
    setPrev(cur);
    setCur(n);
  };
  const manual = (n: number) => {
    setUserStopped(true);
    paint(n);
  };

  useEffect(() => {
    if (!autoOn || paused) return;
    const t = setTimeout(() => {
      setPrev(cur);
      setCur((cur + 1) % COUNT);
    }, 3000);
    return () => clearTimeout(t);
  }, [cur, autoOn, paused]);

  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 520);
    return () => clearTimeout(t);
  }, [prev]);

  const onTouchEnd = (e: TouchEvent<HTMLElement>) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 48) return;
    manual((cur + (dx < 0 ? 1 : COUNT - 1)) % COUNT);
  };

  // 地址栏里已经是同一个锚点时（比如刚点过一次、或带着 #air-carrier 刷新），再点浏览器不会再滚——
  // 目标就在本页的话自己滚过去，并把地址同步上；目标不在本页（以后有了独立页面）才交给 Link 正常跳转
  const goSection = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const id = href.split('#')[1];
    const target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', href);
  };

  const tone = SLIDES[cur].tone;
  const showMark = !!SLIDES[cur].wordmark;

  return (
    <section
      className={`slab dark hero tone-${tone}`}
      data-label="品牌"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={onTouchEnd}
    >
      <div className="hero-top">
        {/* 字标只在 content 里标了 wordmark 的那几张出现；占位保留，切到别的张时淡出 */}
        <div className={`wordmark${showMark ? '' : ' is-off'}`} aria-hidden={showMark ? undefined : 'true'}>
          <BrandLockup />
        </div>
      </div>

      <div className="cbg">
        {SLIDES.map((s, i) => {
          const state = `${i === cur ? ' is-active' : ''}${i === prev && i !== cur ? ' is-prev' : ''}`;
          const photo = (
            <Image
              src={s.image}
              alt={s.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              placeholder="blur"
              style={{ objectFit: 'cover' }}
            />
          );
          return (
            <div
              key={s.id}
              data-i={i}
              className={`cart is-img tone-${s.tone} layout-${s.layout}${state}`}
              // CSS 自定义属性不在 CSSProperties 的字段里，需要断言一下
              style={s.position ? ({ '--pos': s.position, '--pos-m': s.positionMobile } as CSSProperties) : undefined}
            >
              {s.layout === 'top' ? (
                // 标题放在图片容器里，跟着图片一起缩放，才能一直压在拼图自带的顶部横条上
                <div className="cart-strip">
                  {photo}
                  <div className="strip-title">
                    <h2 className="h-title">
                      {s.title}
                      {s.tags?.map((t) => <small key={t}>{t}</small>)}
                    </h2>
                  </div>
                </div>
              ) : photo}
              {s.slogan && (
                // 设计稿上的手写标语，描成矢量后放回海报原处（CSS 背景图，不用 <img>：免得被 .cart img 那几条缩放规则牵连）；
                // 文字本身在下面的文字层里给爬虫和读屏
                <span className="slogan-art" aria-hidden="true" />
              )}
              {/* 整张海报可点，跳到对应栏目；每张的链接都输出在 HTML 里，只有当前这张能点、能被 Tab 到 */}
              <Link
                className="cart-link"
                href={s.cta.href}
                aria-label={s.cta.label}
                tabIndex={i === cur ? 0 : -1}
                draggable={false}
                onClick={(e) => goSection(e, s.cta.href)}
              />
            </div>
          );
        })}
      </div>

      {/* 焦点进到首屏里就先别动（写在 section 上），别把人正在读的那张换掉；交给用户之后才播报 */}
      <div
        className="cslides"
        id="cslides"
        aria-roledescription="轮播"
        aria-label="品牌主张"
        aria-live={userStopped ? 'polite' : undefined}
      >
        {SLIDES.map((s, i) => {
          // 整页只留一个 h1，其余幻灯片用 h2
          const Title = i === 0 ? 'h1' : 'h2';
          return (
            <div
              key={s.id}
              data-i={i}
              className={`cslide grid layout-${s.layout} is-${s.id}${s.wordmark ? ' has-mark' : ''}${i === cur ? ' is-active' : ''}`}
              role="group"
              aria-label={`第 ${i + 1} 张，共 ${COUNT} 张`}
            >
              {s.layout === 'left' && (
              <div className="h-copy">
                {s.kicker && <p className="h-kicker cline" data-c="1">{s.kicker}</p>}
                <Title className={`h-title cline${s.compact ? ' is-compact' : ''}`} data-c="1">
                  {s.title}
                  {s.sub && <small>{s.sub}</small>}
                </Title>

                {s.checks && (
                  <ul className="h-checks cline" data-c="2">
                    {s.checks.map((c) => (
                      <li key={c.text} className={c.hot ? 'is-hot' : undefined}>
                        <CheckIcon />
                        <span>{c.strong && <b>{c.strong}</b>}{c.text}{c.note && <small>{c.note}</small>}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.lines && (
                  <div className="h-lines cline" data-c="2">
                    {s.lines.map((l) => (
                      <p key={l.text} className={l.strong ? 'is-strong' : undefined}>{l.text}</p>
                    ))}
                  </div>
                )}

                {s.lead && (
                  <p className="h-lead cline" data-c="2">{s.lead[0]}<b>{s.lead[1]}</b>{s.lead[2]}</p>
                )}

                {s.stats && (
                  <ul className="h-stats cline" data-c="3">
                    {s.stats.map((st) => (
                      <li key={st.label}>
                        <StatIcon name={st.icon} />
                        <div>
                          <p className="h-stat-num"><b>{st.num}</b><small>{st.unit}</small></p>
                          <p className="h-stat-label">{st.label}</p>
                          <p className="h-stat-en">{st.en}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              )}

              {s.slogan && (
                <p className="h-slogan">{s.slogan.join('')}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* 翻页控件（09-24 照 earthrated.com 首屏）：海报底部居中一组——上一张圆钮、「3 / 4」、下一张圆钮。
          原来两侧的细线箭头和左下角的进度条去掉了。下面这一行 .cnav 留着当占位，首屏高度才不变 */}
      <CarouselNav cur={cur} count={COUNT} onPrev={() => manual((cur + COUNT - 1) % COUNT)} onNext={() => manual((cur + 1) % COUNT)} />
      <div className="grid">
        <div className="cnav" aria-hidden="true"></div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="h-check" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path d="M6.6 12.4l3.6 3.5 7.2-7.6" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const STAT_ICONS: Record<StatIconName, ReactNode> = {
  // 教学楼
  campus: <path d="M24 5l15 8v3h-3v17h4v4H8v-4h4V16H9v-3zM16 19v14h5v-8h6v8h5V19zM22 11h4v4h-4z" />,
  // 爪印
  stray: (
    <>
      <circle cx="11" cy="19" r="4.2" />
      <circle cx="19.5" cy="10" r="4.6" />
      <circle cx="29.5" cy="10" r="4.6" />
      <circle cx="38" cy="19" r="4.2" />
      <path d="M24.5 20c6 0 12 6 12 12 0 4-3 6.5-6.5 6.5-2 0-3.5-1-5.5-1s-3.5 1-5.5 1c-3.5 0-6.5-2.5-6.5-6.5 0-6 6-12 12-12z" />
    </>
  ),
  // 一摞钱币
  funds: <path d="M24 6c8 0 14 2 14 5s-6 5-14 5-14-2-14-5 6-5 14-5zM10 17c2 3 8 4 14 4s12-1 14-4v5c0 3-6 5-14 5s-14-2-14-5zm0 10c2 3 8 4 14 4s12-1 14-4v5c0 3-6 5-14 5s-14-2-14-5zm0 0" />,
  // 纸箱
  supplies: <path d="M24 5l16 7v20l-16 8-16-8V12zm0 5l-9 4 9 4 9-4zM12 17v12l10 5V22zm24 0l-10 5v12l10-5z" />,
};

function StatIcon({ name }: { name: StatIconName }) {
  return (
    <svg className="h-stat-icon" viewBox="0 0 48 44" fill="currentColor" aria-hidden="true">
      {STAT_ICONS[name]}
    </svg>
  );
}
