// SEO / GEO 用的站点信息。文字只取自已有材料（发展历程、栏目规划、首屏文案），不自己编。

// 正式域名还没定：上线前在环境变量里设 SITE_URL=https://正式域名，
// sitemap、robots、canonical、Open Graph、JSON-LD 里的绝对地址都从这里拼
export const SITE_URL = (process.env.SITE_URL || 'http://localhost:3200').replace(/\/$/, '');

export const SITE_NAME = '宠适 PETSFIT';

export const SITE_DESCRIPTION =
  '宠适 PETSFIT 是厦门吉信德 2013 年创立的宠物用品品牌，产品涵盖宠适航空包（星选、飞屋、乘风、云游）、带宠出行与宠物家居，并发起宠适之家校园公益。';

// 分享卡片默认图：首屏星选航空包海报
export const DEFAULT_OG_IMAGE = { url: '/images/hero/xingxuan.jpg', width: 1920, height: 800, alt: '宠适星选航空包' };

// 品牌与母公司，给 Organization 结构化数据用。社媒主页链接还没有，有了加进 sameAs
export const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '宠适',
  alternateName: ['PETSFIT', '宠适 PETSFIT'],
  url: SITE_URL,
  foundingDate: '2013',
  description: SITE_DESCRIPTION,
  parentOrganization: {
    '@type': 'Organization',
    name: '厦门吉信德电子商务有限公司',
    alternateName: '吉信德 SUNNYPET',
    foundingDate: '2001',
    address: { '@type': 'PostalAddress', addressLocality: '厦门', addressCountry: 'CN' },
  },
};

export const WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'zh-CN',
};
