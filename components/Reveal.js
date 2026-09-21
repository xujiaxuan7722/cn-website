'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// 入场动效的观察者，不渲染任何东西。
// 内容本身由服务端输出且默认可见；这里只给首屏以下的元素临时加上 pending / wipe，
// 滚到视口里再摘掉。不支持 IntersectionObserver 或开启"减少动效"时什么都不做。
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    const fold = window.innerHeight;
    const watch = (selector, cls, options) => {
      const parked = [...document.querySelectorAll(selector)].filter(
        (el) => el.getBoundingClientRect().top > fold - 40,
      );
      parked.forEach((el) => el.classList.add(cls));
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.remove(cls);
          obs.unobserve(e.target);
        });
      }, options);
      parked.forEach((el) => obs.observe(el));
      return () => {
        obs.disconnect();
        parked.forEach((el) => el.classList.remove(cls));
      };
    };

    const stopReveal = watch('[data-reveal]', 'pending', { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    const stopWipe = watchWipe('.band, .reel', fold);
    return () => {
      stopReveal();
      stopWipe();
    };
  }, [pathname]);

  return null;
}

// 擦入动效用 clip-path 把元素裁成零高度，被完全裁掉的元素在 IntersectionObserver 眼里
// 永远"不相交"，观察者等不到它（原型里品牌片因此一直不出现）。
// 所以这里按元素盒子的位置判断：getBoundingClientRect 不受 clip-path 影响。
function watchWipe(selector, fold) {
  let parked = [...document.querySelectorAll(selector)].filter(
    (el) => el.getBoundingClientRect().top > fold - 40,
  );
  if (!parked.length) return () => {};
  parked.forEach((el) => el.classList.add('wipe'));
  const all = parked;
  let ticking = false;

  const check = () => {
    ticking = false;
    const vh = window.innerHeight;
    parked = parked.filter((el) => {
      const r = el.getBoundingClientRect();
      const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      if (visible < r.height * 0.12) return true;
      el.classList.remove('wipe');
      return false;
    });
    if (!parked.length) window.removeEventListener('scroll', onScroll);
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(check);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => {
    window.removeEventListener('scroll', onScroll);
    all.forEach((el) => el.classList.remove('wipe'));
  };
}
