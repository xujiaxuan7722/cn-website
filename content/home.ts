// 首页内容。文字只取自已有材料：首屏海报设计内容（pptx）、发展历程、栏目规划。
// 材料里没有的（系列介绍、产品卖点）留空，等文案补齐，不自己编。
import type { HeroSlide, TrustItem, ProductsIntro, ProductGroup, Campus, About, Milestone } from './types';
import heroXingxuan from '@/public/images/hero/xingxuan.jpg';
import heroFeiwu from '@/public/images/hero/feiwu.jpg';
import heroCampus from '@/public/images/hero/campus.jpg';
import heroBoarding from '@/public/images/hero/boarding.jpg';
import campusSpark from '@/public/images/banners/campus-spark.jpg';
import campusContest from '@/public/images/banners/campus-contest.jpg';
import campusGraduate600 from '@/public/images/banners/campus-graduate-600.jpg';
import seriesXingxuan from '@/public/images/series/air-xingxuan.jpg';
import seriesFeiwu from '@/public/images/series/air-feiwu.jpg';
import seriesChengfeng from '@/public/images/series/air-chengfeng.jpg';
import seriesYunyou from '@/public/images/series/air-yunyou.jpg';
import studioXingxuan from '@/public/images/series/air-xingxuan-studio.jpg';
import studioFeiwu from '@/public/images/series/air-feiwu-studio.jpg';
import studioChengfeng from '@/public/images/series/air-chengfeng-studio.jpg';
import studioYunyou from '@/public/images/series/air-yunyou-studio.jpg';
import sceneMeilade from '@/public/images/series/travel-meilade.jpg';
import studioMeilade from '@/public/images/series/travel-meilade-studio.jpg';
import sceneXueyuan from '@/public/images/series/travel-xueyuanpi.jpg';
import studioXueyuan from '@/public/images/series/travel-xueyuanpi-studio.jpg';
import sceneNiuzai from '@/public/images/series/travel-niuzai.jpg';
import studioNiuzai from '@/public/images/series/travel-niuzai-studio.jpg';
import sceneChezai from '@/public/images/series/travel-chezai.jpg';
import studioChezai from '@/public/images/series/travel-chezai-studio.jpg';
import sceneRuanwo from '@/public/images/series/home-ruanwo.jpg';
import studioRuanwo from '@/public/images/series/home-ruanwo-studio.jpg';
import sceneChuangtai from '@/public/images/series/home-maochuangtai.jpg';
import studioChuangtai from '@/public/images/series/home-maochuangtai-studio.jpg';
import sceneMaogui from '@/public/images/series/home-maogui.jpg';
import studioMaogui from '@/public/images/series/home-maogui-studio.jpg';
import sceneMaosha from '@/public/images/series/home-maosha.jpg';
import studioMaosha from '@/public/images/series/home-maosha-studio.jpg';
import sceneHouseL from '@/public/images/series/house-large.jpg';
import studioHouseL from '@/public/images/series/house-large-studio.jpg';
import sceneHouseM from '@/public/images/series/house-medium.jpg';
import studioHouseM from '@/public/images/series/house-medium-studio.jpg';
import sceneHouseS from '@/public/images/series/house-small.jpg';
import studioHouseS from '@/public/images/series/house-small-studio.jpg';
import sceneHouseC from '@/public/images/series/house-classic.jpg';
import studioHouseC from '@/public/images/series/house-classic-studio.jpg';

// 首屏轮播 4 张，版式照《文案位置参考》：
// kicker = 标题上面那行小标题（保证登机计划那张的「国内首倡/践行」）
// tone  = 底图是浅色还是深色，决定文字和轮播控件用深青还是白
// position / positionMobile = 图片铺满时保留哪一段（桌面左文右图，手机上文下图，要露出的部分不一样）
// wordmark = 这一张左上角带不带 PETSFIT 字标（带字标的两张，文案相应往下让一点）
// layout = 'left' 文案在左；'top' 标题压在图片自带的顶部横条上（五联拼图不能裁，按原比例整张放）
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'xingxuan',
    wordmark: true,
    tone: 'light',
    layout: 'left',
    image: heroXingxuan,
    alt: '机场航站楼里，一位女士单肩背着宠适星选系列航空包，猫从包口探出头',
    position: '100% 50%',
    positionMobile: '86% 50%',
    title: '星选系列',
    sub: '宠适航空包',
    checks: [
      { text: '南方航空官方推荐', note: '（上线南航商城）' },
      { text: '李念、海陆、罗予彤等明星同款' },
      { strong: '10W+', text: '带宠进客舱用户的选择', hot: true },
    ],
    cta: { href: '/#air-carrier', label: '查看星选系列' },
  },
  {
    id: 'feiwu',
    wordmark: true,
    tone: 'light',
    layout: 'left',
    image: heroFeiwu,
    alt: '机场停机坪上，一位女士拉着宠适飞屋系列航空拉杆包，柯基从包里探出头',
    position: '100% 50%',
    positionMobile: '70% 50%',
    title: '飞屋系列',
    sub: '航空拉杆包',
    lines: [
      { text: '西部航空/海南航空共创版' },
      { text: '大狗进客舱首选', strong: true },
    ],
    cta: { href: '/#air-carrier', label: '查看飞屋系列' },
  },
  {
    id: 'boarding',
    wordmark: true,
    tone: 'light',
    layout: 'left',
    image: heroBoarding,
    alt: '一只白猫坐在客舱座位上望向舷窗外',
    position: '100% 50%',
    positionMobile: '70% 50%',
    kicker: '国内首倡/践行',
    title: '保证登机计划',
    lines: [
      { text: '几乎覆盖全球航司航空软包尺寸' },
      { text: '让每一个毛孩子都有机会飞向远方' },
    ],
    cta: { href: '/#air-carrier', label: '了解保证登机计划' },
  },
  {
    id: 'campus',
    tone: 'dark',
    layout: 'left',
    image: heroCampus,
    alt: '两只橘猫坐在户外的宠适白色木制猫屋上',
    position: '100% 50%',
    positionMobile: '100% 50%',
    title: '「宠适之家」校园公益',
    compact: true,
    lead: ['计划持续为', '2000', '所校园小流浪提供物资帮助'],
    stats: [
      { icon: 'campus', num: '800+', unit: '所', label: '合作校园', en: 'Partnered Campus' },
      { icon: 'stray', num: '100,000+', unit: '只', label: '受益小流浪', en: 'Assisted Strays' },
      { icon: 'funds', num: '350W+', unit: '元', label: '资金投入', en: 'Funds Invested' },
      { icon: 'supplies', num: '9,000+', unit: '件', label: '捐助物资', en: 'Supplies Donated' },
    ],
    slogan: ['每一个毛孩子', '都值得被呵护。'],
    cta: { href: '/#campus', label: '了解校园公益' },
  },
];


// 产品系列首页展示：三个主栏目，各 4 个系列（栏目规划原文）
// 首屏和品牌片之间的信任条。每一句都来自首屏海报、校园公益、发展历程里已有的说法
export const TRUST: TrustItem[] = [
  { text: '南方航空官方推荐' },
  { strong: '10W+', text: '带宠进客舱用户的选择' },
  { text: '李念、海陆、罗予彤等明星同款' },
  { strong: '800', text: '所高校校园公益' },
  { strong: '2013', text: '年创立于厦门' },
];

// 产品区：三条产品线合成一块，右上角分页切换，自动轮换
export const PRODUCTS_INTRO: ProductsIntro = {
  title: '宠适产品',
  lede: '从客舱到客厅，为带宠生活的每个场景设计',
};

export const PRODUCT_GROUPS: ProductGroup[] = [
  {
    id: 'air-carrier',
    label: '宠适航空包',
    // 简约版：只有标题 + 四张系列卡，和宠物家居那块一个样式；保证登机计划已经在首屏轮播第三张里讲了
    title: ['宠适航空包'],
    tone: 'paper',
    // 系列卡：平时是灰底 45° 棚拍（studio），悬停换成带人的场景图（image）
    series: [
      { name: '星选系列', slug: 'xingxuan', note: 'DHCE1980 系列', studio: studioXingxuan, image: seriesXingxuan, alt: '机场航站楼里，女士单肩背着宠适星选系列航空包，猫从包里探头' },
      { name: '飞屋系列', slug: 'feiwu', note: '航空拉杆包系列', studio: studioFeiwu, image: seriesFeiwu, alt: '停机坪旁，女士拉着宠适飞屋系列航空拉杆包，柯基坐在包里' },
      { name: '乘风系列', slug: 'chengfeng', note: 'DCC1800 系列', studio: studioChengfeng, image: seriesChengfeng, alt: '城市街头，女士斜挎宠适乘风系列航空包，猫从透气网窗望出来' },
      { name: '云游系列', slug: 'yunyou', note: '航空背包系列', studio: studioYunyou, image: seriesYunyou, alt: '城市天际线前，女士背着宠适云游系列航空背包，猫从背包顶探出头' },
    ],
  },
  {
    id: 'travel',
    label: '带宠出行',
    title: ['带宠出行'],
    tone: 'paper',
    series: [
      { name: '美拉德系列', slug: 'meilade', note: 'DBCD047 系列', studio: studioMeilade, image: sceneMeilade, alt: '海边，女士背着宠适美拉德系列宠物背包，猫从背包顶探出头' },
      { name: '学院π系列', slug: 'xueyuanpi', note: 'DBCD054 系列', studio: studioXueyuan, image: sceneXueyuan, alt: '街头斑马线上，女士背着宠适学院π系列绿色宠物背包' },
      { name: '牛仔系列', slug: 'niuzai', note: '', studio: studioNiuzai, image: sceneNiuzai, alt: '女士手提宠适牛仔系列宠物包，小狗从包侧透气窗望出来' },
      { name: '车载沙发系列', slug: 'chezai', note: '', studio: studioChezai, image: sceneChezai, alt: '汽车后座上，白色小狗坐在宠适车载沙发里' },
    ],
  },
  {
    id: 'home-living',
    label: '宠物家居',
    title: ['宠物家居'],
    tone: 'paper',
    series: [
      { name: '软窝系列', slug: 'ruanwo', note: '', studio: studioRuanwo, image: sceneRuanwo, alt: '客厅里，柯基趴在宠适软窝系列宠物窝里' },
      { name: '猫窗台系列', slug: 'maochuangtai', note: '', studio: studioChuangtai, image: sceneChuangtai, alt: '两只猫坐在窗边的宠适猫窗台上看风景' },
      { name: '多功能猫柜', slug: 'maogui', note: '', studio: studioMaogui, image: sceneMaogui, alt: '橘猫从宠适白色多功能猫柜里走出来' },
      { name: '宠适猫砂', slug: 'maosha', note: '', studio: studioMaosha, image: sceneMaosha, alt: '猫站在猫砂盆边，旁边放着宠适猫砂' },
    ],
  },
];

// 校园公益
export const CAMPUS: Campus = {
  // 顶部海报轮播（1920×600，三张顺序：星火计划 → 创新大赛 → 毕业生礼包）。文字都是 HTML 压在图上；
  // layout = 文案在图上的位置：top（顶部居中）/ left（左侧垂直居中）/ center（中部偏左）
  slides: [
    {
      id: 'spark',
      image: campusSpark,
      alt: '宠适之家校园公益星火计划：各地校园里安装的猫屋与流浪猫拼图',
      layout: 'top',
      kicker: '宠适之家校园公益',
      title: '星火计划',
      slogan: '每一度为爱发的电，都值得被鼓舞',
      cta: { href: '/#campus', label: '了解星火计划' },
    },
    {
      id: 'contest',
      image: campusContest,
      alt: '宠适杯首届全国大学生创新创意大赛：学生在电脑前设计宠物用品，右侧是参赛作品',
      layout: 'left',
      title: '宠适杯首届全国大学生创新创意大赛',
      sub: '为爱发电 · 为爱创新',
      cta: { href: '/#campus', label: '了解创新大赛' },
    },
    {
      id: 'graduate',
      image: campusGraduate600,
      alt: '穿学士服的毕业生抱着一只橘猫走在校园里',
      layout: 'center',
      title: '2026毕业生领养礼包开放申请中…',
      sub: '从校园走向社会的爱与责任，总有宠适护航',
      cta: { href: '/#campus', label: '申请毕业生领养礼包' },
    },
  ],
  eyebrow: '校园公益 · 宠适之家',
  title: ['给校园里的流浪猫', '一个屋檐'],
  lede: '2024 年宠适之家校园公益启动，20 名员工分批实地到访全国 60 所大学，安装猫屋 300 余座。2025 年设立校园公益基金，公益广告登陆厦门、福州机场。',
  stats: [
    { num: '800', unit: '所合作高校' },
    { num: '600 万+', unit: '元累计投入' },
    { num: '30 万+', unit: '只校园流浪动物受益' },
  ],
  news: [
    { text: '宠适之家校园公益合作高校达 800 所，累计投入资金超 600 万元', href: '/#campus', label: '查看' },
    { text: '宠适之家校园公益获厦门市政府认可，公益广告登陆厦门、福州机场', href: '/#campus', label: '查看' },
    { text: '设立宠适之家校园公益基金，合作高校达 433 所', href: '/#campus', label: '查看' },
  ],
  // 猫屋区块的标题和说明（说明取自上面 lede 里的实地数字）
  housesTitle: '校园公益猫屋',
  // 两个数字取自首屏公益海报（09-24 用户定只留这两句）
  housesLede: '合作高校已达 800+ 所，捐助物资 9,000+ 件',
  // 猫屋卡：平时灰底棚拍（产品图 13–16 灰底版），悬停换成校园实景
  houses: [
    { name: '校园公益大猫屋', note: 'CHWE012010G1', studio: studioHouseL, image: sceneHouseL, alt: '校园草坪上的宠适大猫屋，猫从窗口探出' },
    { name: '校园公益中猫屋', note: 'CHW2042050B1', studio: studioHouseM, image: sceneHouseM, alt: '教学楼前树下的宠适中猫屋，猫坐在门口' },
    { name: '校园公益小猫屋', note: 'CHWF008010W1', studio: studioHouseS, image: sceneHouseS, alt: '草地上的宠适小猫屋，橘猫在屋前' },
    { name: '经典大猫屋', note: 'CHWD033010A1', studio: studioHouseC, image: sceneHouseC, alt: '校园小路边的宠适经典大猫屋，猫在屋顶上' },
  ],
};

// 关于我们（其他信息栏目）
export const ABOUT: About = {
  eyebrow: '关于我们',
  title: ['让宠物更舒服，', '让生活更舒心'],
  lede: '吉信德 2001 年成立于厦门，2013 年创立宠适 PETSFIT 品牌，集宠物用品开发设计、智能制造与品牌销售于一体。',
  cta: { href: '/#about', label: '了解品牌历程' },
  // 四格：中文标题 + 英文小注 + 子栏目；href 是整格的去向（子页做好后改这里）
  columns: [
    { title: '品牌故事', en: 'Brand Story', href: '/brand-story', links: ['发展历程', '创始人', '团队风采', '企业荣誉', '品牌资质', '宣传片', '下载品牌手册'] },
    { title: '媒体报道', en: 'Media Coverage', href: '/#about', links: ['新闻报道'] },
    { title: '答疑解惑', en: 'FAQ', href: '/#about', links: ['常见问题'] },
    { title: '联系我们', en: 'Contact', href: '/#about', links: ['社媒一览', '客服渠道', '加入我们'] },
  ],
};

// 品牌历程（取自发展历程表）
export const MILESTONES: Milestone[] = [
  { year: '2025', title: '启动保证登机计划', text: '开发航空软包系列，与西部航空、南方航空合作，宠适航空包成为航司推荐产品。' },
  { year: '2024', title: '宠适之家校园公益启动', text: '致力持续为全国 2000 所大学校园的小流浪提供救助物资。' },
  { year: '2013', title: '宠适品牌诞生', text: '成立厦门吉信德电子商务公司，创立宠适 PETSFIT 自主品牌。' },
];
