'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import StarMark from '@/components/StarMark';

const NAV_PRIMARY = [
  { href: '#products', title: '产品', desc: '看看我们做出来的东西' },
  { href: '#capability', title: '能力', desc: '从研发到出货，全程在自己手里' },
  { href: '#about', title: '关于', desc: '二十余年，从一间小作坊开始' },
  { href: '#story', title: '公益', desc: '宠适之家与校园猫屋计划' },
];

const NAV_SECONDARY = [
  { href: '#contact', label: '联系我们' },
  { href: '#story', label: '品牌历程' },
  { href: '#contact', label: '加入我们' },
];

// 书脊（左侧竖条）+ 抽屉菜单。全站每一页共用，挂在根布局里。
export default function SiteChrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [burgerIn, setBurgerIn] = useState(false);
  const [label, setLabel] = useState('品牌');
  const [swapping, setSwapping] = useState(false);
  const [markOn, setMarkOn] = useState(false);

  const menuBtn = useRef(null);
  const drawer = useRef(null);
  const touched = useRef(false);

  // 汉堡图标入场
  useEffect(() => {
    const t = setTimeout(() => setBurgerIn(true), 260);
    return () => clearTimeout(t);
  }, []);

  // 书脊标签跟着滚动换字；滚过首屏顶栏后书脊上的星芒才出现
  useEffect(() => {
    const sections = [...document.querySelectorAll('[data-label]')];
    const heroTop = document.querySelector('.hero-top');
    let current = null;
    let swapTimer = null;
    let ticking = false;

    const swapTo = (text) => {
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
      let best = null;
      let bestDist = Infinity;
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        let dist = r.top > mid ? r.top - mid : 0;
        if (r.top <= mid && r.bottom >= mid) dist = -1;
        if (dist < bestDist) { bestDist = dist; best = s; }
      });
      if (best) swapTo(best.getAttribute('data-label'));
      setMarkOn(heroTop ? heroTop.getBoundingClientRect().bottom < 40 : true);
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

  // 抽屉：ESC 关闭
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // 焦点跟着走：打开落到第一个链接，关上回到菜单按钮（首次渲染不抢焦点）
  useEffect(() => {
    if (!touched.current) return;
    if (open) drawer.current?.querySelector('a')?.focus();
    else menuBtn.current?.focus();
  }, [open]);

  const toggle = (next) => {
    touched.current = true;
    setOpen(next);
  };

  // 抽屉里的链接点完就关，锚点跳转才看得见
  const onDrawerClick = (e) => {
    if (e.target.closest('a')) setTimeout(() => toggle(false), 60);
  };

  return (
    <>
      <div className="rail">
        <div className={`rail-mark${markOn ? ' on' : ''}`} aria-hidden="true">
          <StarMark />
        </div>
        <div className={`rail-label${swapping ? ' swapping' : ''}`} id="railLabel"><span>{label}</span></div>
        <button
          ref={menuBtn}
          className={`rail-menu${open ? ' is-open' : ''}`}
          id="menuBtn"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open ? 'true' : 'false'}
          aria-controls="drawer"
          onClick={() => toggle(!open)}
        >
          <svg className={`burger${burgerIn ? '' : ' wipe'}`} viewBox="0 0 24 20" width="24" height="20" aria-hidden="true">
            <g>
              <path className="b1" d="M0 16h24v1H0z" />
              <path className="b2" d="M0 0h24v1H0z" />
              <path className="b3" d="M0 8h24v1H0z" />
            </g>
          </svg>
        </button>
      </div>

      <div className={`backdrop${open ? ' on' : ''}`} id="backdrop" onClick={() => toggle(false)}></div>
      <nav
        ref={drawer}
        className={`drawer${open ? ' open' : ''}`}
        id="drawer"
        aria-label="主导航"
        aria-hidden={open ? 'false' : 'true'}
        onClick={onDrawerClick}
      >
        <div className="nav-primary">
          {NAV_PRIMARY.map((item) => (
            <a key={item.title} className="nav-item" href={item.href}>
              <h2>{item.title}<i className="arrow" aria-hidden="true"></i></h2>
              <p>{item.desc}</p>
            </a>
          ))}
        </div>
        <div className="nav-secondary">
          {NAV_SECONDARY.map((item) => (
            <a key={item.label} href={item.href}>{item.label}</a>
          ))}
        </div>
      </nav>
    </>
  );
}
