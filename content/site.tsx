// 全站共用的内容：导航、顶栏标语、社媒。来源：宠适网站栏目规划 20260708、社媒一览。
// 子页面还没做之前，导航先落到首页对应区块；做出来之后只改这里的 href。

import type { NavPrimaryItem, LinkItem, SocialAccount, SocialLink, BrandFilm, Company, Legal } from './types';

export const NAV_PRIMARY: NavPrimaryItem[] = [
  { href: '/#air-carrier', title: '宠适航空包', desc: '星选 · 飞屋 · 乘风 · 云游' },
  { href: '/#travel', title: '带宠出行', desc: '美拉德 · 学院π · 牛仔 · 车载沙发' },
  { href: '/#home-living', title: '宠物家居', desc: '软窝 · 猫窗台 · 猫柜 · 猫砂' },
  { href: '/#campus', title: '校园公益', desc: '宠适之家与校园猫屋' },
  { href: '/#about', title: '关于我们', desc: '品牌故事 · 媒体报道 · 答疑 · 联系' },
];

// 顶栏菜单栏的四个栏目（09-24 用户定）；抽屉菜单和页脚仍用上面的 NAV_PRIMARY
export const TOPBAR_NAV: LinkItem[] = [
  { href: '/', label: '首页' },
  { href: '/#products', label: '宠适产品' },
  { href: '/#campus', label: '校园公益' },
  { href: '/#about', label: '关于我们' },
];

// 顶栏最上面那条细条的标语（取自「关于我们」的标题）
export const TOPBAR_SLOGAN = '让宠物更舒服，让生活更舒心';

export const NAV_SECONDARY: LinkItem[] = [
  { href: '/brand-story#history', label: '品牌历程' },
  { href: '/#about', label: '社媒一览' },
  { href: '/#about', label: '加入我们' },
];

export const SOCIAL: SocialAccount[] = [
  { name: '宠适 PETSFIT 品牌官号', where: '小红书 / 抖音', handle: '@宠适PETSFIT' },
  { name: '宠适航空包官方号', where: '视频号 / 抖音 / 小红书', handle: '@宠适航空包' },
  { name: '宠适之家校园公益', where: '小红书 / 抖音 / 快手', handle: '@宠适之家校园公益' },
  { name: '宠适品牌公众号', where: '微信公众号 / 视频号', handle: '@宠适之家' },
  { name: '吉吉王国 PETSFIT 矩阵号', where: '视频号 / 抖音 / 小红书 / 快手', handle: '@吉吉王国PETSFIT' },
];

// 品牌片。src 现在指向本地 1080p 压缩版（不入库，见 .gitignore *.mp4）；上线时换成 CDN 地址即可
export const BRAND_FILM: BrandFilm = {
  title: '吉信德 SUNNYPET 宣传片 2024',
  src: '/videos/brand-film-1080p.mp4',
  duration: '3′17″',
  alt: '航拍的吉信德 SUNNYPET 厂区，玻璃幕墙办公楼与厂房',
  // 卡片文字都取自品牌片旁白（09-24 转写）：标题是片尾那句，正文是片中公司介绍的几组数字，标语是企业文化
  eyebrow: '品牌片',
  headline: '只有真诚的爱，才能创造有温度的产品',
  lede: '吉信德 2001 年成立于厦门，拥有运营总部、研发中心、大数据中心和两个生产基地。国内首创宠物行业实木智能生产线，拥有各类专利 500 多项，产品覆盖 20 余个细分品类，已服务全球超千万宠物和宠物主。',
  motto: '爱，分享，乐在其中。',
  cta: '全屏观看',
};

// 页脚用的公司信息与法务。地址 / 电话 / 邮箱 / 备案号材料里还没有：
// 09-24 先放占位文字（带 ×× 的都是假的，只为看版面），拿到真实信息后替换；备案号上线前必须填
export const COMPANY: Company = {
  name: '厦门吉信德电子商务有限公司',
  address: '福建省厦门市××区××路××号',
  phone: '0592-××××××××',
  email: 'service@××××.com',
};
export const LEGAL: Legal = {
  icp: '闽ICP备XXXXXXXX号',     // 占位，待导师给
  police: '',                  // 公安联网备案号，有再填
};
// 页脚社媒图标：href 待补主页链接；图标是单色线描，跟随文字色
export const SOCIAL_LINKS: SocialLink[] = [
  { name: '小红书', href: '#', icon: <><rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M7 15l2-6 2 4 2-4 2 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></> },
  { name: '抖音', href: '#', icon: <><path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><path d="M14 4c.6 2.4 2.2 3.8 4.5 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></> },
  { name: '视频号', href: '#', icon: <><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M10 9l5 3-5 3z" fill="currentColor" /></> },
  { name: '微信公众号', href: '#', icon: <><path d="M9 4C5.7 4 3 6.2 3 9c0 1.6.9 3 2.3 4L5 15l2.4-1.3c.5.1 1 .2 1.6.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M15 9c3.3 0 6 2 6 4.6 0 1.4-.8 2.6-2 3.4l.3 1.8-2.1-1.1c-.7.2-1.4.3-2.2.3-3.3 0-6-2-6-4.6S11.7 9 15 9z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></> },
];
