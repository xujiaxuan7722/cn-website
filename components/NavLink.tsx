'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// 站内导航链接：已经在首页时点「首页」，平滑回到顶部（同一页面的 Link 不会自己滚）；其余照常跳转
export default function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const toTop = href === '/' && pathname === '/';
  return (
    <Link
      href={href}
      onClick={toTop ? (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        if (window.location.hash) window.history.pushState(null, '', '/');
      } : undefined}
    >{children}</Link>
  );
}
