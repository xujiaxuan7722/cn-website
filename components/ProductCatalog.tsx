'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { StaticImageData } from 'next/image';

export interface CatalogItem {
  href: string;
  name: string;
  note: string;
  studio: StaticImageData;
  scene?: StaticImageData;
  alt: string;
}
export interface CatalogGroup {
  id: string;
  label: string;
  items: CatalogItem[];
}

// 全部产品页的分类切换 + 产品网格。
// 分类在浏览器里即时切换，并把地址同步成 /products?cat=xxx（可分享、可收藏、刷新还在）；
// 「全部」按分类分组列出，每组一个小标题。所有卡片都由服务端输出，搜索引擎能读到全部产品
export default function ProductCatalog({ groups, initial }: { groups: CatalogGroup[]; initial: string }) {
  const [cat, setCat] = useState(groups.some((g) => g.id === initial) ? initial : 'all');
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  const pick = (id: string) => {
    setCat(id);
    const url = id === 'all' ? '/products' : `/products?cat=${id}`;
    window.history.replaceState(null, '', url);
    const top = document.getElementById('catalog')?.getBoundingClientRect().top ?? 0;
    if (top < 0) document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tabs = [{ id: 'all', label: '全部', n: total }, ...groups.map((g) => ({ id: g.id, label: g.label, n: g.items.length }))];
  const shown = cat === 'all' ? groups : groups.filter((g) => g.id === cat);

  return (
    <div id="catalog" className="pl-catalog">
      <div className="pl-bar">
        <div className="pl-tabs" role="tablist" aria-label="产品分类">
          {tabs.map((t) => (
            <button key={t.id} type="button" role="tab" aria-selected={cat === t.id} className={cat === t.id ? 'is-on' : undefined} onClick={() => pick(t.id)}>
              {t.label}<span>{t.n}</span>
            </button>
          ))}
        </div>
      </div>
      {shown.map((g) => (
        <section key={g.id} className="pl-group" aria-labelledby={`pl-${g.id}`}>
          <div className="pl-group-head">
            <h2 id={`pl-${g.id}`}>{g.label}</h2>
            <span>{g.items.length} 款</span>
          </div>
          <ul className="pl-grid">
            {g.items.map((it) => (
              <li key={it.name}>
                <Link href={it.href} className="pl-card">
                  <span className={`pl-pic${it.scene ? ' has-scene' : ''}`}>
                    <Image src={it.studio} alt={it.alt} fill sizes="(max-width: 760px) 50vw, 22vw" placeholder="blur" style={{ objectFit: 'cover' }} />
                    {it.scene && <Image className="pl-scene" src={it.scene} alt="" aria-hidden="true" fill sizes="(max-width: 760px) 50vw, 22vw" style={{ objectFit: 'cover' }} />}
                  </span>
                  <b>{it.name}</b>
                  <small>{it.note || ' '}</small>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
