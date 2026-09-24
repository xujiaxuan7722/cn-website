import Hero from '@/components/home/Hero';
import TrustStrip from '@/components/home/TrustStrip';
import Reel from '@/components/home/Reel';
import ProductTabs from '@/components/home/ProductTabs';
import Campus from '@/components/home/Campus';
import AboutBlock from '@/components/home/AboutBlock';

// 首页，自上而下对应《宠适网站栏目规划》：
// 形象海报 → 信任条 → 产品系列（航空包 / 带宠出行 / 宠物家居，分页切换）→ 校园公益 → 关于我们（品牌片卡片 → 标题 → 四张卡片）
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ProductTabs />
      <Campus />
      <Reel />
      <AboutBlock />
    </>
  );
}
