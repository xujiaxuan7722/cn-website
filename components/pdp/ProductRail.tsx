'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { StaticImageData } from 'next/image';
import usePrefersReducedMotion from '@/components/hooks/usePrefersReducedMotion';

export interface RailItem {
  href: string;
  name: string;
  sub: string;
  image: StaticImageData;
  alt: string;
}

const SPEED = 40;   // 匀速滑动：每秒 40px
const NUDGE = 0.45; // 点箭头后挪一张卡的时长（秒）

// 推荐搭配（09-24，照 ruffwear 的 What Dogs Are Digging）：全站产品卡排成一条，匀速向左滑，首尾相接循环；
// 一屏最多 4 张（手机 2 张）；两侧圆形箭头各挪一张；鼠标停在卡片上、或键盘焦点在里面时暂停。
// 列表排两遍首尾相接，滑过一遍的宽度就回到起点，看不出接缝；第二遍只给眼睛看，读屏和 Tab 跳过
export default function ProductRail({ items }: { items: RailItem[] }) {
  const reduce = usePrefersReducedMotion();
  const track = useRef<HTMLUListElement>(null);
  const pos = useRef(0);
  const nudge = useRef<{ from: number; to: number; t: number } | null>(null);
  const paused = useRef(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const half = () => el.scrollWidth / 2;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const n = nudge.current;
      if (n) {
        n.t = Math.min(1, n.t + dt / NUDGE);
        const e = 1 - Math.pow(1 - n.t, 3);
        pos.current = n.from + (n.to - n.from) * e;
        if (n.t >= 1) nudge.current = null;
      } else if (!paused.current && !reduce) {
        pos.current += SPEED * dt;
      }
      const w = half();
      if (w > 0) pos.current = ((pos.current % w) + w) % w;
      el.style.transform = `translate3d(${-pos.current}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const w = card.getBoundingClientRect().width + gap;
    // 挪到下一张 / 上一张卡的边上（对齐卡片，不停在半张）
    const base = dir > 0 ? Math.floor(pos.current / w + 0.001) + 1 : Math.ceil(pos.current / w - 0.001) - 1;
    const half = el.scrollWidth / 2;
    let from = pos.current;
    if (dir < 0 && base < 0) from += half;
    nudge.current = { from, to: (dir < 0 && base < 0 ? base * w + half : base * w), t: 0 };
  };

  const card = (it: RailItem, i: number, hidden: boolean) => (
    <li key={`${hidden ? 'b' : 'a'}${i}`} aria-hidden={hidden || undefined}>
      <Link href={it.href} tabIndex={hidden ? -1 : undefined}>
        <span className="pd-card-pic"><Image src={it.image} alt={hidden ? '' : it.alt} fill sizes="(max-width: 760px) 50vw, 22vw" style={{ objectFit: 'cover' }} /></span>
        <b>{it.name}</b>
        <small>{it.sub}</small>
      </Link>
    </li>
  );

  return (
    <div
      className="pd-rail"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
      onFocus={() => { paused.current = true; }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) paused.current = false; }}
    >
      <div className="pd-rail-view">
        <ul className="pd-rail-track" ref={track}>
          {items.map((it, i) => card(it, i, false))}
          {items.map((it, i) => card(it, i, true))}
        </ul>
      </div>
      <button type="button" className="pd-rail-arrow is-prev" aria-label="上一个产品" onClick={() => step(-1)}><Chev dir="left" /></button>
      <button type="button" className="pd-rail-arrow is-next" aria-label="下一个产品" onClick={() => step(1)}><Chev dir="right" /></button>
    </div>
  );
}

function Chev({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={dir === 'left' ? 'M14.5 6l-6 6 6 6' : 'M9.5 6l6 6-6 6'} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
