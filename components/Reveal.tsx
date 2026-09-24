'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// 入场动效的观察者，不渲染任何东西。
// 内容本身由服务端输出且默认可见；这里只给首屏以下的文字节点 / 图片临时加上 pending / wipe，
// 滚到视口里再摘掉；滚出视口后再挂回去，下次进来再播一次（union.co 也是这样）。不支持 IntersectionObserver 或开启"减少动效"时什么都不做。
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    const fold = window.innerHeight;

    // 照 union.co 的做法：动的单位是"一个文字节点"（标题、段落、链接、列表项……各自一个），
    // 不是整块；图片只淡入不位移。交错感来自各节点在页面上的高度不同、先后过线，不另加延时。
    // [data-reveal] 仍写在区块/卡片上当作范围，这里把范围里的叶子文字节点和图片分别挑出来观察；
    // 范围里什么都挑不出来时（纯装饰块），退回整块滑入。
    const TEXT = 'h1,h2,h3,h4,p,li,dt,dd,blockquote,.tlink,.btn,.eyebrow,.capt,.small';
    const splitNodes = (scope: HTMLElement) => {
      const inOverlay = (n: Element) => n.closest('.overlay');
      // 本来就藏着、hover 才出现的（卡片悬停层、历程卡的说明文字）不归这里管
      const designHidden = (n: Element) => getComputedStyle(n).opacity === '0';
      let texts = [...scope.querySelectorAll<HTMLElement>(TEXT)].filter((n) => !n.querySelector(TEXT) && !inOverlay(n) && !designHidden(n));
      if (!texts.length && scope.matches(TEXT)) texts = [scope];
      const imgs = [...scope.querySelectorAll('img, svg.lockup, .shot > svg')].filter((n) => !inOverlay(n));
      return { texts, imgs };
    };

    // union.co 的入场是可重复的：节点滚出视口就复位，再滚回来再滑一次。
    // 两个观察者：一个带 -12% 边距负责"进来了→显示"，另一个不带边距负责"整个出去了→复位"，
    // 复位只在完全离开视口后做，人正看着的字不会在屏幕边上淡掉。
    const watch = (selector: string, cls: string, options: IntersectionObserverInit) => {
      const below = (el: Element) => el.getBoundingClientRect().top > fold - 40;
      const nodes: Element[] = [];
      document.querySelectorAll<HTMLElement>(selector).forEach((scope) => {
        const { texts, imgs } = splitNodes(scope);
        if (!texts.length && !imgs.length) {
          nodes.push(scope);
          return;
        }
        const level = scope.dataset.reveal;
        texts.forEach((n) => {
          n.classList.add('rv');
          if (level) n.dataset.rv = level;
          nodes.push(n);
        });
        imgs.forEach((n) => {
          n.classList.add('rv-img');
          nodes.push(n);
        });
      });
      // 首屏里已经看得见的不用等，其余先藏起来
      nodes.forEach((el) => { if (below(el)) el.classList.add(cls); });
      const show = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.remove(cls); });
      }, options);
      const rearm = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (!e.isIntersecting) e.target.classList.add(cls); });
      }, { threshold: 0 });
      nodes.forEach((el) => { show.observe(el); rearm.observe(el); });
      return () => {
        show.disconnect();
        rearm.disconnect();
        nodes.forEach((el) => el.classList.remove(cls));
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
function watchWipe(selector: string, fold: number): () => void {
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
