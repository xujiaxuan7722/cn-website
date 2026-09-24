'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { searchSite } from '@/content/search';

const HOT = ['航空包', '星选', '飞屋', '猫屋', '校园公益', '车载'];

// 顶栏放大镜打开的搜索面板：从菜单栏下方展开，输入即出结果，Esc 或点遮罩关闭
export default function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);
  const results = searchSite(q);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <>
      <div className="sp-mask" onClick={onClose} />
      <div className="search-panel" role="dialog" aria-label="站内搜索">
        <div className="search-in">
          <form className="search-box" role="search" onSubmit={(e) => e.preventDefault()}>
            <SearchIcon />
            <input ref={input} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜索产品系列、校园公益、品牌故事" aria-label="搜索关键词" />
            <button type="button" className="search-close" onClick={onClose} aria-label="关闭搜索">关闭</button>
          </form>
          {!q.trim() ? (
            <div className="search-hot">
              <span>大家在搜</span>
              {HOT.map((h) => <button key={h} type="button" onClick={() => setQ(h)}>{h}</button>)}
            </div>
          ) : results.length ? (
            <ul className="search-list">
              {results.map((r) => (
                <li key={r.kind + r.title}>
                  <Link href={r.href} onClick={onClose}>
                    <span className="search-thumb">{r.image && <Image src={r.image} alt="" sizes="56px" />}</span>
                    <span className="search-text">
                      <em>{r.kind}</em>
                      <b>{r.title}</b>
                      <small>{r.desc}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="search-empty">没有找到「{q.trim()}」相关的内容，换个词试试，比如“航空包”“猫屋”。</p>
          )}
        </div>
      </div>
    </>
  );
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ico-search">
      <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
