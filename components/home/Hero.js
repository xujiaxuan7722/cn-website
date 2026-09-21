'use client';

import { useEffect, useRef, useState } from 'react';
import StarMark from '@/components/StarMark';
import usePrefersReducedMotion from '@/components/hooks/usePrefersReducedMotion';

const SLIDES = [
  {
    eyebrow: '宠物舒适方案 · 自 2001 年',
    title: ['让宠物在每一个环境里，', '都待得住'],
    lede: '宠适从一间小作坊起步，二十余年只做一件事：把室内的安顿和户外的自在接上。我们有自己的木作、缝制、金属三类工厂，从研发、制造到出货全程自控。',
    cta: { href: '#capability', label: '了解我们的能力' },
    art: null,
  },
  {
    eyebrow: '远径系列 · 新品',
    title: ['山路上的四个小时，', '让它能睡过去'],
    lede: '防水 TPU 箱底，整只可以直接冲洗；多舱位把水壶、零食和牵引绳分开放。徒步回来冲一遍就能收起来。',
    cta: { href: '#products', label: '查看远径系列' },
    art: (
      <svg viewBox="0 0 1336 767" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="1336" height="767" fill="#6f7a63" />
        <path d="M0 767V392l318 124 286-196 332 238 400-186v395z" fill="#59634f" />
        <path d="M0 767V566l286 78 350-108 330 122 370-96v205z" fill="#454d3d" />
        <circle cx="1046" cy="176" r="86" fill="#8a9479" />
      </svg>
    ),
  },
  {
    eyebrow: '自有制造 · 自 2005 年',
    title: ['木作、缝制、金属，', '三类工厂都是自己的'],
    lede: '2005 年起我们把生产的起点收回自己手里。二十年为 K&H、PETCO、TRIXIE 等品牌做 ODM，别人的品控标准，我们一条条走过来。',
    cta: { href: '#about', label: '看我们怎么做' },
    art: (
      <svg viewBox="0 0 1336 767" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="1336" height="767" fill="#7d6a57" />
        <rect x="0" y="470" width="1336" height="297" fill="#5f5145" />
        <rect x="128" y="150" width="268" height="320" fill="#6b5a4a" />
        <rect x="470" y="238" width="196" height="232" fill="#96806a" />
        <rect x="742" y="110" width="330" height="360" fill="#6b5a4a" />
        <circle cx="1188" cy="286" r="74" fill="#a08a72" />
      </svg>
    ),
  },
];

const COUNT = SLIDES.length;
const pad = (n) => String(n).padStart(2, '0');

// 1 · 首屏轮播：7s 一张，任一次手动操作后永久停止自动播放。
// 三张的文字都在服务端输出到 HTML 里，浏览器里只切换 class。
export default function Hero() {
  const reduce = usePrefersReducedMotion();
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(null);
  const [userStopped, setUserStopped] = useState(false);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const autoOn = !reduce && !userStopped;

  const paint = (n) => {
    setPrev(cur);
    setCur(n);
  };
  const manual = (n) => {
    setUserStopped(true);
    paint(n);
  };

  useEffect(() => {
    if (!autoOn || paused) return;
    const t = setTimeout(() => {
      setPrev(cur);
      setCur((cur + 1) % COUNT);
    }, 7000);
    return () => clearTimeout(t);
  }, [cur, autoOn, paused]);

  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 520);
    return () => clearTimeout(t);
  }, [prev]);

  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 48) return;
    manual((cur + (dx < 0 ? 1 : COUNT - 1)) % COUNT);
  };

  return (
    <section className="slab dark hero" data-label="品牌">
      <div className="hero-top">
        <div className="wordmark">
          <StarMark />
          宠适
        </div>
        <a className="btn" href="#contact">联系我们
          <i className="arrow sm" aria-hidden="true"></i>
        </a>
      </div>

      <div className="cbg" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            data-i={i}
            className={`cart${s.art ? ' is-art' : ''}${i === cur ? ' is-active' : ''}${i === prev && i !== cur ? ' is-prev' : ''}`}
          >
            {s.art}
          </div>
        ))}
      </div>

      {/* 焦点进到轮播里就先别动，别把人正在读的那张换掉；交给用户之后才播报 */}
      <div
        className="cslides"
        id="cslides"
        aria-roledescription="轮播"
        aria-label="品牌主张"
        aria-live={userStopped ? 'polite' : undefined}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={onTouchEnd}
      >
        {SLIDES.map((s, i) => (
          <div
            key={i}
            data-i={i}
            className={`cslide grid${i === cur ? ' is-active' : ''}`}
            role="group"
            aria-label={`第 ${i + 1} 张，共 ${COUNT} 张`}
          >
            <div className="c-head stack">
              <p className="eyebrow cline" data-c="1">{s.eyebrow}</p>
              <h1 className="display cline" data-c="2">{s.title[0]}<br className="pc" />{s.title[1]}</h1>
            </div>
            <div className="c-aside">
              <p className="lede cline" data-c="3">{s.lede}</p>
              <p className="cline" data-c="4" style={{ marginTop: 28 }}>
                <a className="tlink" href={s.cta.href}>{s.cta.label}<i className="arrow sm" aria-hidden="true"></i></a>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid">
        <div className="cnav">
          <span className="cnum"><b id="cnum">{pad(cur + 1)}</b> / {pad(COUNT)}</span>
          <div className="cbars" id="cbars">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`cbar${i === cur ? (autoOn ? ' is-on' : ' is-held') : ''}`}
                data-go={i}
                aria-label={`第 ${i + 1} 张`}
                onClick={() => manual(i)}
              >
                <i></i>
              </button>
            ))}
          </div>
          <button className="cnext" id="cnext" aria-label="下一张" onClick={() => manual((cur + 1) % COUNT)}>
            <i className="arrow" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
