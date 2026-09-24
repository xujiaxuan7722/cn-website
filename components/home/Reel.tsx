'use client';

import { useEffect, useRef, useState } from 'react';
import { BRAND_FILM } from '@/content/site';
import usePrefersReducedMotion from '@/components/hooks/usePrefersReducedMotion';
import poster from '@/public/videos/brand-film-poster.jpg';

// 3 · 品牌片：滚到这一块就静音循环播放（浏览器只允许静音自动播放），像一张会动的封面；
// 中间不放按钮，点视频本身就进全屏、开声音、出进度条，退出全屏回到静音循环。
// 视频文件不进仓库（.gitignore *.mp4），上线换 CDN 只改 content/site.js 的 BRAND_FILM.src。
//
// 只在原地播：UC、夸克、QQ、华为等手机浏览器会把"正在播放、又被滑出屏幕"的视频接管成悬浮小窗。
// 所以视频大部分（≥60%）在屏幕里才播，一开始往外滑就立刻暂停，浏览器来不及接管；
// 再加上 video 上的 x5 同层播放、禁画中画属性，不让浏览器换成自己的播放器。

// iPhone 上的 Safari 只能让 <video> 自己全屏（div 不行），用的是带 webkit 前缀的老接口
type IOSVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

// 视频露出多少才播；低于这个比例就停
const PLAY_RATIO = 0.6;
const mostlyVisible = (el: Element) => {
  const r = el.getBoundingClientRect();
  const shown = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
  return r.height > 0 && shown / r.height >= PLAY_RATIO;
};

export default function Reel() {
  const reduce = usePrefersReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [watching, setWatching] = useState(false);

  // 大部分在屏幕里才播，开始滑出就停；开了"减少动效"就不自动播
  useEffect(() => {
    const v = video.current;
    if (!v || reduce || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio >= PLAY_RATIO) v.play().catch(() => {});
      else if (!document.fullscreenElement) v.pause();
    }, { threshold: [0, PLAY_RATIO, 1] });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  // 退出全屏 → 回到静音循环（视频还在屏幕里才接着播）
  useEffect(() => {
    const v = video.current;
    const reset = () => {
      if (!v) return;
      v.muted = true;
      v.controls = false;
      v.loop = true;
      setWatching(false);
      if (mostlyVisible(v)) v.play().catch(() => {});
      else v.pause();
    };
    const onChange = () => { if (!document.fullscreenElement) reset(); };
    document.addEventListener('fullscreenchange', onChange);
    // iPhone 全屏退出时不发 fullscreenchange，而是在 video 上发这个
    v?.addEventListener('webkitendfullscreen', reset);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      v?.removeEventListener('webkitendfullscreen', reset);
    };
  }, []);

  const watch = async () => {
    const v: IOSVideo | null = video.current;
    if (!v) return;
    v.muted = false;
    v.controls = true;
    v.loop = false;
    v.currentTime = 0;
    setWatching(true);
    if (!box.current?.requestFullscreen && v.webkitEnterFullscreen) {
      // iPhone：先播再让视频自己全屏
      v.play().catch(() => {});
      v.webkitEnterFullscreen();
      return;
    }
    try { await (box.current?.requestFullscreen?.() ?? v.requestFullscreen?.()); } catch { /* 不支持全屏就原地播 */ }
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
          // 不给画中画，也不让国内手机浏览器（X5 内核等）接管成自己的播放器或悬浮窗
          disablePictureInPicture
          controlsList="nopictureinpicture nodownload"
          x5-playsinline="true"
          webkit-playsinline="true"
          x5-video-player-type="h5-page"
          aria-label={BRAND_FILM.alt}
          title={watching ? undefined : `点击全屏观看${BRAND_FILM.title}`}
          onClick={watching ? undefined : watch}
          onEnded={() => { if (document.fullscreenElement) document.exitFullscreen?.(); }}
        />
        {/* 手机上告诉人：点视频能全屏有声看完整版 */}
        {!watching && (
          <span className="reel-tag" aria-hidden="true">
            <svg viewBox="0 0 10 12"><path d="M0 0l10 6-10 6z" fill="currentColor" /></svg>
            品牌片 {BRAND_FILM.duration}
          </span>
        )}
      </div>
    </section>
  );
}
