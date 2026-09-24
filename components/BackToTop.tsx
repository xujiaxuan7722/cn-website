'use client';

import { useEffect, useState } from 'react';

// 右下角「顶部」按钮：滚过大半屏才出现，点一下回到页面最上面。
// 不出现时用 visibility 藏起来，Tab 也跳不到它。
export default function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button type="button" className={`totop${shown ? ' is-on' : ''}`} onClick={toTop} aria-label="返回顶部">
      <svg viewBox="0 0 40 16" aria-hidden="true">
        <path d="M2 14 20 2l18 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>顶部</span>
    </button>
  );
}
