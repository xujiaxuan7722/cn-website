'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { usePathname } from 'next/navigation';
import LogoMark from '@/components/LogoMark';
import { NAV_PRIMARY, NAV_SECONDARY, RAIL_EN, COMPANY } from '@/content/site';

// 书脊（左侧竖条）+ 抽屉菜单。全站每一页共用，挂在根布局里。
// 书脊自上而下：菜单按钮 → 当前区块标签 → 品牌标。
export default function SiteChrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [burgerIn, setBurgerIn] = useState(false);
  const [label, setLabel] = useState('品牌');
  const [swapping, setSwapping] = useState(false);

  const menuBtn = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLElement>(null);
  const touched = useRef(false);

  // 记下最近一次操作用的是键盘还是鼠标/触屏，样式据此决定要不要画焦点框
  useEffect(() => {
    const root = document.documentElement;
    const onPointer = () => { root.dataset.input = 'pointer'; };
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      root.dataset.input = 'keyboard';
    };
    document.addEventListener('pointerdown', onPointer, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('pointerdown', onPointer, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, []);

  // 汉堡图标入场
  useEffect(() => {
    const t = setTimeout(() => setBurgerIn(true), 260);
    return () => clearTimeout(t);
  }, []);

  // 书脊标签跟着滚动换字
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-label]')];
    let current: string | null = null;
    let swapTimer: ReturnType<typeof setTimeout> | undefined;
    let ticking = false;

    const swapTo = (text: string) => {
      if (text === current) return;
      const first = current === null;
      current = text;
      if (first) { setLabel(text); return; }
      setSwapping(true);
      clearTimeout(swapTimer);
      swapTimer = setTimeout(() => {
        setLabel(text);
        setSwapping(false);
      }, 400);
    };

    const update = () => {
      const mid = window.innerHeight * 0.45;
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) continue;
        let dist = r.top > mid ? r.top - mid : 0;
        if (r.top <= mid && r.bottom >= mid) dist = -1;
        if (dist < bestDist) { bestDist = dist; best = s; }
      }
      const text = best?.dataset.label;
      if (text) swapTo(text);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(swapTimer);
    };
  }, [pathname]);

  // 抽屉：ESC 关闭；开着的时候在 <html> 上留个记号给样式用（书脊的悬停效果要停掉）
  useEffect(() => {
    document.documentElement.classList.toggle('nav-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // 焦点跟着走：打开落到第一个链接，关上回到菜单按钮（首次渲染不抢焦点）
  useEffect(() => {
    if (!touched.current) return;
    // 键盘打开：焦点落到第一项，直接能操作。鼠标打开：落到抽屉容器上，
    // 这样不会有哪一项看起来像被选中了，接下来按 Tab 也还是从第一项开始
    const byKeyboard = document.documentElement.dataset.input === 'keyboard';
    if (open) (byKeyboard ? drawer.current?.querySelector('a') : drawer.current)?.focus();
    else menuBtn.current?.focus();
  }, [open]);

  const toggle = (next: boolean) => {
    touched.current = true;
    setOpen(next);
  };

  // 抽屉里的链接点完就关，锚点跳转才看得见
  const onDrawerClick = (e: MouseEvent<HTMLElement>) => {
    if ((e.target as Element).closest('a')) setTimeout(() => toggle(false), 60);
  };

  return (
    <>
      {/* 整条书脊都能点开菜单；真正的按钮仍是 #menuBtn，键盘和读屏走它，点击事件冒泡到这里统一处理 */}
      <div className="rail" onClick={() => toggle(!open)}>
        <button
          ref={menuBtn}
          className={`rail-menu${open ? ' is-open' : ''}`}
          id="menuBtn"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open ? 'true' : 'false'}
          aria-controls="drawer"
        >
          <svg className={`burger${burgerIn ? '' : ' wipe'}`} viewBox="0 0 24 20" width="24" height="20" aria-hidden="true">
            <g>
              <path className="b1" d="M0 16h24v1H0z" />
              <path className="b2" d="M0 0h24v1H0z" />
              <path className="b3" d="M0 8h24v1H0z" />
            </g>
          </svg>
        </button>
        <div className={`rail-label${swapping ? ' swapping' : ''}`} id="railLabel">
          <span>{label}</span>
          {RAIL_EN[label] && <em>{RAIL_EN[label]}</em>}
        </div>
        <div className="rail-mark" aria-hidden="true">
          <LogoMark />
        </div>
      </div>

      <div className={`backdrop${open ? ' on' : ''}`} id="backdrop" onClick={() => toggle(false)}></div>
      <nav
        ref={drawer}
        className={`drawer${open ? ' open' : ''}`}
        id="drawer"
        tabIndex={-1}
        aria-label="主导航"
        aria-hidden={open ? 'false' : 'true'}
        onClick={onDrawerClick}
      >
        <div className="nav-primary">
          {NAV_PRIMARY.map((item) => (
            <Link key={item.title} className="nav-item" href={item.href}>
              <h2>{item.title}<i className="arrow" aria-hidden="true"></i></h2>
              <p>{item.desc}</p>
            </Link>
          ))}
        </div>
        {/* 次级链接沉到抽屉底部，中间的空白是留白不是剩余 */}
        <div className="nav-foot">
          <div className="nav-secondary">
            {NAV_SECONDARY.map((item) => (
              <Link key={item.label} href={item.href}>{item.label}</Link>
            ))}
          </div>
          <p className="nav-copy">{COMPANY.name} · 始于 2001</p>
        </div>
      </nav>
    </>
  );
}
