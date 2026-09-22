import Hero from '@/components/home/Hero';
import Band from '@/components/home/Band';
import Reel from '@/components/home/Reel';
import ProductGroup from '@/components/home/ProductGroup';
import AllProducts from '@/components/home/AllProducts';
import Campus from '@/components/home/Campus';
import AboutBlock from '@/components/home/AboutBlock';
import { PRODUCT_GROUPS } from '@/content/home';

// 首页，自上而下对应《宠适网站栏目规划》：
// 形象海报 → 产品系列（航空包 / 带宠出行 / 宠物家居）→ 校园公益 → 关于我们
export default function HomePage() {
  return (
    <>
      <Hero />
      <Band />
      <Reel />
      {PRODUCT_GROUPS.map((group, i) => (
        <ProductGroup key={group.id} group={group} artOffset={i * 2} />
      ))}
      <AllProducts />
      <Campus />
      <AboutBlock />
    </>
  );
}
