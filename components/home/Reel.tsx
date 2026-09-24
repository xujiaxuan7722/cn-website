'use client';

import { useEffect, useRef, useState } from 'react';
import { BRAND_FILM } from '@/content/site';
import usePrefersReducedMotion from '@/components/hooks/usePrefersReducedMotion';
import poster from '@/public/videos/brand-film-poster.jpg';

// 品牌片卡片（照 ruffwear.com 首页的 Featured Story）：左边一栏白底文字，右边视频。
// 滚到这一块就静音循环播放（浏览器只允许静音自动播放），像一张会动的封面；
// 右下角圆钮暂停 / 继续；点视频本身或左栏「全屏观看」就进全屏、开声音、出进度条，退出全屏回到静音循环。
// 手动暂停过就不再自动播，直到再点圆钮。
// 视频文件不进仓库（.gitignore *.mp4），上线换 CDN 只改 content/site.tsx 的 BRAND_FILM.src。
//
// 只在原地播：UC、夸克、QQ、华为等手机浏览器会把"正在播放、又被滑出屏幕"的视频接管成悬浮小窗。
// 所以视频大部分（≥60%）在屏幕里才播，一开始往外滑就立刻暂停，浏览器来不及接管；
// 再加上 video 上的 x5 同层播放、禁画中画属性，不让浏览器换成自己的播放器。

// iPhone 上的 Safari 只能让 <video> 自己全屏（div 不行），用的是带 webkit 前缀的老接口
type IOSVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

// 手机（≤760px）不自动播（09-24 用户定）：视频中间一个圆形播放钮，点了才播（全屏、有声）
const isPhone = () => window.matchMedia('(max-width: 760px)').matches;

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
  const userPaused = useRef(false);
  const [watching, setWatching] = useState(false);
  const [playing, setPlaying] = useState(false);

  // 大部分在屏幕里才播，开始滑出就停；开了"减少动效"或手动暂停过就不自动播
  useEffect(() => {
    const v = video.current;
    if (!v || reduce || !('IntersectionObserver' in window) || isPhone()) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio >= PLAY_RATIO) { if (!userPaused.current) v.play().catch(() => {}); }
      else if (!document.fullscreenElement) v.pause();
    }, { threshold: [0, PLAY_RATIO, 1] });
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);

  // 退出全屏 → 回到静音循环（视频还在屏幕里、也没被手动暂停才接着播）
  useEffect(() => {
    const v = video.current;
    const reset = () => {
      if (!v) return;
      v.muted = true;
      v.controls = false;
      v.loop = true;
      setWatching(false);
      if (mostlyVisible(v) && !userPaused.current && !isPhone()) v.play().catch(() => {});
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
    userPaused.current = false;
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

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  const f = BRAND_FILM;
  return (
    // 「关于我们」板块照校园公益的结构（09-24 用户定）：品牌片卡片（对应公益海报轮播）→ 标题 → 四张卡片。
    // 卡片比内容线宽、但不通栏；点顶栏「关于我们」定位到这里
    <section className="slab grid film" id="about" data-label="关于我们">
      <div className="film-card" data-reveal="">
        <div className="film-copy">
          <div>
            <p className="film-eyebrow">{f.eyebrow} <span>{f.duration}</span></p>
            <h2 className="film-title">{f.headline}</h2>
            <p className="film-lede">{f.lede}</p>
            <p className="film-motto">{f.motto}</p>
          </div>
          <button type="button" className="film-cta" onClick={watch}>
            {f.cta}<i className="arrow sm" aria-hidden="true"></i>
          </button>
        </div>
        <div ref={box} className={`reel film-media${watching ? ' is-watching' : ''}`}>
          <video
            ref={video}
            className="reel-video"
            src={f.src}
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
            aria-label={f.alt}
            title={watching ? undefined : `点击全屏观看${f.title}`}
            onClick={watching ? undefined : watch}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => { if (document.fullscreenElement) document.exitFullscreen?.(); }}
          />
          {/* 手机：中间的播放钮（样式里只在手机上、没在播时显示） */}
          {!watching && !playing && (
            <button type="button" className="film-play" onClick={watch} aria-label={`播放${f.title}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 6.2v11.6a.8.8 0 0 0 1.2.7l9.2-5.8a.8.8 0 0 0 0-1.4L9.7 5.5a.8.8 0 0 0-1.2.7z" /></svg>
            </button>
          )}
          {!watching && (
            <button type="button" className="film-toggle" onClick={toggle} aria-label={playing ? '暂停品牌片' : '播放品牌片'}>
              {playing
                ? <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="6" width="3.2" height="12" rx="1" /><rect x="13.8" y="6" width="3.2" height="12" rx="1" /></svg>
                : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 6.2v11.6a.8.8 0 0 0 1.2.7l9.2-5.8a.8.8 0 0 0 0-1.4L9.7 5.5a.8.8 0 0 0-1.2.7z" /></svg>}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
