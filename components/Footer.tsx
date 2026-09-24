import Link from 'next/link';
import BrandLockup from '@/components/BrandLockup';
import { NAV_PRIMARY, COMPANY, SOCIAL_LINKS, LEGAL } from '@/content/site';

// 页脚（紧凑版）：字标 + 五栏目 / 公司信息 + 社媒图标 / 细线 + 版权·备案·隐私·条款。
// 不再是一个"联系我们"板块（书脊上没有它）；联系方式的正式入口在「关于我们」里。
export default function Footer() {
  return (
    <footer className="foot grid">
      <div className="foot-top">
        <Link className="foot-mark" href="/" aria-label="宠适 PETSFIT 首页"><BrandLockup /></Link>
        <nav className="foot-nav" aria-label="页脚导航">
          {NAV_PRIMARY.map((item) => <Link key={item.title} href={item.href}>{item.title}</Link>)}
        </nav>
      </div>
      <div className="foot-mid">
        <p className="foot-info">
          <span>{COMPANY.name}</span>
          {COMPANY.address && <span>{COMPANY.address}</span>}
          {COMPANY.phone && <span>{COMPANY.phone}</span>}
          {COMPANY.email && <span>{COMPANY.email}</span>}
        </p>
        <ul className="foot-icons" aria-label="社交媒体">
          {SOCIAL_LINKS.map((s) => (
            <li key={s.name}>
              <a href={s.href} title={s.name} aria-label={s.name} target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" aria-hidden="true">{s.icon}</svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="foot-rule"></div>
      <div className="foot-legal">
        <span>© {new Date().getFullYear()} {COMPANY.name}</span>
        {LEGAL.icp && <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">{LEGAL.icp}</a>}
        {LEGAL.police && <a href="https://beian.mps.gov.cn/" target="_blank" rel="noopener">{LEGAL.police}</a>}
        <Link href="/#about">隐私政策</Link>
        <Link href="/#about">服务条款</Link>
      </div>
    </footer>
  );
}
