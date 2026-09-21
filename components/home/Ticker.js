'use client';

import { useEffect, useState } from 'react';
import usePrefersReducedMotion from '@/components/hooks/usePrefersReducedMotion';

const TICKS = [
  { text: '「远径」徒步宠物背包系列上市，防水 TPU 箱底', href: '#products', label: '查看系列' },
  { text: '宠适之家：校园猫屋计划已覆盖 318 所高校', href: '#story', label: '了解公益' },
  { text: '十个海外仓发货，3–7 个工作日送达，30 天试用', href: '#capability', label: '查看服务' },
];

// 公告条文字轮播：4s 一条，纵向翻动
export default function Ticker() {
  const reduce = usePrefersReducedMotion();
  const [on, setOn] = useState(0);
  const [out, setOut] = useState(null);

  useEffect(() => {
    if (reduce || TICKS.length < 2) return;
    const t = setTimeout(() => {
      setOut(on);
      setOn((on + 1) % TICKS.length);
    }, 4000);
    return () => clearTimeout(t);
  }, [on, reduce]);

  useEffect(() => {
    if (out === null) return;
    const t = setTimeout(() => setOut(null), 520);
    return () => clearTimeout(t);
  }, [out]);

  return (
    <div className="ticker" id="ticker">
      {TICKS.map((tick, i) => (
        <div key={tick.text} className={`tick${i === on ? ' is-on' : ''}${i === out ? ' is-out' : ''}`}>
          <p>{tick.text}</p>
          <a className="tlink" href={tick.href}>{tick.label}<i className="arrow sm" aria-hidden="true"></i></a>
        </div>
      ))}
    </div>
  );
}
