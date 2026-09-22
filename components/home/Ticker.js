'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import usePrefersReducedMotion from '@/components/hooks/usePrefersReducedMotion';

// 公告条文字轮播：4s 一条，纵向翻动
export default function Ticker({ items }) {
  const reduce = usePrefersReducedMotion();
  const [on, setOn] = useState(0);
  const [out, setOut] = useState(null);

  useEffect(() => {
    if (reduce || items.length < 2) return;
    const t = setTimeout(() => {
      setOut(on);
      setOn((on + 1) % items.length);
    }, 4000);
    return () => clearTimeout(t);
  }, [on, reduce, items.length]);

  useEffect(() => {
    if (out === null) return;
    const t = setTimeout(() => setOut(null), 520);
    return () => clearTimeout(t);
  }, [out]);

  return (
    <div className="ticker">
      {items.map((tick, i) => (
        <div key={tick.text} className={`tick${i === on ? ' is-on' : ''}${i === out ? ' is-out' : ''}`}>
          <p>{tick.text}</p>
          <Link className="tlink" href={tick.href}>{tick.label}<i className="arrow sm" aria-hidden="true"></i></Link>
        </div>
      ))}
    </div>
  );
}
