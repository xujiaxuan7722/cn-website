'use client';

import { useEffect, useRef, useState } from 'react';
import { BRAND_FILM } from '@/content/site';
import usePrefersReducedMotion from '@/components/hooks/usePrefersReducedMotion';
import poster from '@/public/videos/brand-film-poster.jpg';

// 3 · 品牌片：滚到这一块就静音循环播放（浏览器只允许静音自动播放），像一张会动的封面；
// 中间不放按钮，点视频本身就进全屏、开声音、出进度条，退出全屏回到静音循环。
// 视频文件不进仓库（.gitignore *.mp4），上线换 CDN 只改 content/site.js 的 BRAND_FILM.src。
export default function Reel() {
  const reduce = usePrefersReducedMotion();
  const box = useRef(null);
  const video = useRef(null);
  const [watching, setWatching] = useState(false);

  // 进视口播、出视口停；开了"减少动效"就不自动播
  useEffect(() => {
    const v = video.current;
    if (!v || reduce || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else if (!document.fullscreenElement) v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  // 退出全屏 → 回到静音循环
  useEffect(() => {
    const onChange = () => {
      if (document.fullscreenElement) return;
      const v = video.current;
      if (!v) return;
      v.muted = true;
      v.controls = false;
      v.loop = true;
      setWatching(false);
      v.play().catch(() => {});
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const watch = async () => {
    const v = video.current;
    if (!v) return;
    v.muted = false;
    v.controls = true;
    v.loop = false;
    v.currentTime = 0;
    setWatching(true);
    try { await (box.current.requestFullscreen?.() ?? v.requestFullscreen?.()); } catch { /* 不支持全屏就原地播 */ }
    v.play().catch(() => {});
  };

  return (
    <section className="slab flush" data-label="品牌">
      <div ref={box} className={`reel${watching ? ' is-watching' : ''}`}>
        <video
          ref={video}
          className="reel-video"
          src={BRAND_FILM.src}
          poster={poster.src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={BRAND_FILM.alt}
          title={watching ? undefined : `点击全屏观看${BRAND_FILM.title}`}
          onClick={watching ? undefined : watch}
          onEnded={() => { if (document.fullscreenElement) document.exitFullscreen?.(); }}
        />
      </div>
    </section>
  );
}
