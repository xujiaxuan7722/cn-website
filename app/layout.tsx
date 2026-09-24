import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Hanken_Grotesk, Noto_Sans_SC } from 'next/font/google';
import SiteChrome from '@/components/SiteChrome';
import Reveal from '@/components/Reveal';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import JsonLd from '@/components/JsonLd';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, ORGANIZATION, WEBSITE } from '@/content/seo';
import './globals.css';

// 拉丁字形走 Hanken，汉字回落到思源黑体。构建时下载并自托管，运行时不请求 Google。
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  weight: ['100', '300', '400', '500', '700'],
  variable: '--font-noto-sc',
  display: 'swap',
  preload: false,
});

// 子页只给自己的标题，模板自动补「 · 宠适」；Open Graph 各页没写的沿用这里
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: '宠适 PETSFIT · 航空包 · 带宠出行 · 宠物家居', template: '%s · 宠适' },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: SITE_NAME,
    url: '/',
    images: [DEFAULT_OG_IMAGE],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="zh-CN"
      className={`js ${hanken.variable} ${notoSansSC.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <JsonLd data={ORGANIZATION} />
        <JsonLd data={WEBSITE} />
        <SiteChrome />
        <div className="stage">
          {children}
          <Footer />
        </div>
        <BackToTop />
        <Reveal />
      </body>
    </html>
  );
}
