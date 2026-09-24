'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { StaticImageData } from 'next/image';

export interface GalleryShot {
  image: StaticImageData | null;
  alt: string;
}

// 详情页左侧产品图：大图 + 左右切换 + 缩略图。没有图的位置显示「图片待补」占位
export default function Gallery({ shots }: { shots: GalleryShot[] }) {
  const [cur, setCur] = useState(0);
  const n = shots.length;
  const go = (d: number) => setCur((c) => (c + d + n) % n);
  const s = shots[cur];
  return (
    <div className="pd-gal">
      <div className="pd-main">
        {s.image
          ? <Image key={cur} src={s.image} alt={s.alt} fill sizes="(max-width: 760px) 100vw, 55vw" placeholder="blur" priority={cur === 0} style={{ objectFit: 'contain' }} />
          : <span className="pd-empty">图片待补</span>}
        <button type="button" className="pd-arrow is-prev" aria-label="上一张" onClick={() => go(-1)}><Chev dir="left" /></button>
        <button type="button" className="pd-arrow is-next" aria-label="下一张" onClick={() => go(1)}><Chev dir="right" /></button>
      </div>
      <ul className="pd-thumbs">
        {shots.map((t, i) => (
          <li key={i}>
            <button type="button" className={i === cur ? 'is-on' : undefined} aria-label={`第 ${i + 1} 张`} aria-current={i === cur} onClick={() => setCur(i)}>
              {t.image ? <Image src={t.image} alt="" fill sizes="96px" style={{ objectFit: 'cover' }} /> : <span className="pd-empty sm">待补</span>}
            </button>
          </li>
        ))}
      </ul>
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
