import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Hanken_Grotesk, Noto_Sans_SC } from 'next/font/google';
import SiteChrome from '@/components/SiteChrome';
import Reveal from '@/components/Reveal';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
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

export const metadata: Metadata = {
  title: '宠适',
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
