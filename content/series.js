// 系列详情页的数据。每个系列一条，slug 是 URL 里的英文名（/series/<slug>）。
// 产品信息、规格、更多产品图都还没到位：products 里除了系列代表图都是空位，specs 的值先用 '—'。
// 图直接复用首页系列卡的两张（studio 棚拍 / scene 场景）。
import { PRODUCT_GROUPS } from '@/content/home';

const SLUGS = {
  星选系列: 'xingxuan', 飞屋系列: 'feiwu', 乘风系列: 'chengfeng', 云游系列: 'yunyou',
  美拉德系列: 'meilade', 学院π系列: 'xueyuanpi', 牛仔系列: 'niuzai', 车载沙发系列: 'chezai',
  软窝系列: 'ruanwo', 猫窗台系列: 'maochuangtai', 多功能猫柜: 'maogui', 宠适猫砂: 'maosha',
};

// 一句话定位 + 卖点，只有航空包四款有材料（来自首屏文案和栏目规划），其余先留空
const COPY = {
  xingxuan: { tagline: '南方航空官方推荐的登机航空包', points: ['南方航空官方推荐，上线南航商城', '李念、海陆、罗予彤等明星同款', '10W+ 带宠进客舱用户的选择'] },
  feiwu: { tagline: '大狗进客舱首选的航空拉杆包', points: ['西部航空 / 海南航空共创版', '几乎覆盖全球航司航空软包尺寸', '拉杆 + 万向轮，机场一路推着走'] },
  chengfeng: { tagline: '可扩展的斜挎航空包', points: ['两侧可展开，客舱内给猫更大空间', '大面积透气网窗', '符合保证登机计划尺寸'] },
  yunyou: { tagline: '解放双手的航空背包', points: ['双肩背负，长途通勤不累', '顶部开口，猫可探头', '符合保证登机计划尺寸'] },
};

const SPEC_KEYS = ['型号', '尺寸', '重量', '面料', '适用宠物', '航司标准'];

export const SERIES = PRODUCT_GROUPS.flatMap((group) =>
  group.series.map((s) => {
    const slug = SLUGS[s.name];
    const copy = COPY[slug] || { tagline: '', points: [] };
    return {
      slug,
      name: s.name,
      note: s.note,
      group: { id: group.id, label: group.label },
      studio: s.studio,
      scene: s.image,
      alt: s.alt,
      tagline: copy.tagline,
      points: copy.points,
      // 产品清单：第一张用系列代表图，后面三个是空位
      products: [
        { name: `${s.name} · 代表款`, code: s.note || '型号待补', image: s.studio },
        { name: '产品待补', code: '', image: null },
        { name: '产品待补', code: '', image: null },
        { name: '产品待补', code: '', image: null },
      ],
      specs: SPEC_KEYS.map((k) => ({ k, v: k === '型号' && s.note ? s.note : '—' })),
      // 同栏目其他系列，页底推荐用
      siblings: group.series.filter((o) => o.name !== s.name).map((o) => ({ ...o, slug: SLUGS[o.name] })),
    };
  }),
);

export const findSeries = (slug) => SERIES.find((s) => s.slug === slug);
