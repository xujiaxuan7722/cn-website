'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { usePathname } from 'next/navigation';
import BrandLockup from '@/components/BrandLockup';
import NavLink from '@/components/NavLink';
import SearchPanel, { SearchIcon } from '@/components/SearchPanel';
import { NAV_PRIMARY, NAV_SECONDARY, TOPBAR_NAV, TOPBAR_SLOGAN, COMPANY } from '@/content/site';

// 顶栏（09-24 取代左侧书脊，照 earthrated.com）+ 抽屉菜单。全站每一页共用，挂在根布局里。
// 顶栏两层：最上面一条蓝绿细条（标语居中），随页面滚走；下面白底菜单栏吸顶——
// 左字标、中间栏目、右边搜索（09-24 删去购物车和蓝条里的「联系我们」）。窄屏（≤1100px）栏目收进右边的菜单按钮，点开是原来的抽屉。
export default function SiteChrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [burgerIn, setBurgerIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

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

  // 首页里的页内锚点链接（/#about、/#campus……）统一自己滚过去：
  // 地址栏已经是同一个锚点时（比如点过一次「关于我们」又滚回上面），浏览器认为地址没变，再点就不会滚——
  // 所以在首页点这类链接时，一律拦下来自己平滑滚到目标，并把地址同步上
  useEffect(() => {
    const onClick = (e: globalThis.MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (window.location.pathname !== '/') return;
      const a = (e.target as Element | null)?.closest?.('a[href^="/#"], a[href^="#"]');
      if (!a) return;
      const id = (a.getAttribute('href') || '').split('#')[1];
      const target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `/#${id}`);
    };
    // 捕获阶段：抢在 Next 的 Link 之前处理（Link 见到 defaultPrevented 就不再自己跳）
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // 菜单栏吸顶后，页面滚动时底下加一道细阴影，和内容分开
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // 抽屉：ESC 关闭；开着的时候在 <html> 上留个记号给样式用
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
    // preventScroll：点抽屉里的锚点链接时页面正在平滑滚过去，焦点回到菜单按钮不能把这次滚动打断
    if (open) (byKeyboard ? drawer.current?.querySelector('a') : drawer.current)?.focus({ preventScroll: true });
    else menuBtn.current?.focus({ preventScroll: true });
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
      <div className="announce">
        <p>{TOPBAR_SLOGAN}</p>
      </div>
      <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
        <div className="topbar-in">
          <Link className="topbar-mark" href="/" aria-label="宠适 PETSFIT 首页"><BrandLockup /></Link>
          <nav className="topbar-nav" aria-label="栏目">
            {TOPBAR_NAV.map((item) => <NavLink key={item.label} href={item.href}>{item.label}</NavLink>)}
          </nav>
          <div className="topbar-tools">
            <button type="button" className="tool-btn" aria-label="站内搜索" aria-expanded={searchOpen} onClick={() => setSearchOpen((v) => !v)}>
              <SearchIcon />
            </button>
          <button
            ref={menuBtn}
            className={`topbar-menu${open ? ' is-open' : ''}`}
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
        </div>
        <SearchPanel open={searchOpen} onClose={closeSearch} />
      </header>

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
