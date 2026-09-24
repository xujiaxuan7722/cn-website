import type { Metadata } from 'next';
import Link from 'next/link';
import { PRODUCT_GROUPS, CAMPUS } from '@/content/home';
import ProductCatalog from '@/components/ProductCatalog';
import type { CatalogGroup } from '@/components/ProductCatalog';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/content/seo';

export const metadata: Metadata = {
  title: '全部产品',
  description: '宠适全部产品：宠适航空包、带宠出行、宠物家居与校园公益猫屋，按分类浏览。',
  alternates: { canonical: '/products' },
};

// 全部产品：首页「查看全部产品」的落地页。数据取自首页的产品区和校园公益猫屋，改一处两边都变
const GROUPS: CatalogGroup[] = [
  ...PRODUCT_GROUPS.map((g) => ({
    id: g.id,
    label: g.label,
    items: g.series.flatMap((s) => (s.studio ? [{ href: s.slug ? `/series/${s.slug}` : `/#${g.id}`, name: s.name, note: s.note, studio: s.studio, scene: s.image, alt: s.alt }] : [])),
  })),
  {
    id: 'houses',
    label: '校园公益猫屋',
    items: CAMPUS.houses.flatMap((h) => (h.studio ? [{ href: '/#campus', name: h.name, note: h.note, studio: h.studio, scene: h.image, alt: h.alt }] : [])),
  },
];

export default async function ProductsPage({ searchParams }: PageProps<'/products'>) {
  const { cat } = await searchParams;
  const total = GROUPS.reduce((n, g) => n + g.items.length, 0);
  const list = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '宠适全部产品',
    itemListElement: GROUPS.flatMap((g) => g.items).map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: `${SITE_URL}${it.href}` })),
  };
  return (
    <>
      <JsonLd data={list} />
      <section className="pl-head">
        <nav className="crumbs" aria-label="位置">
          <Link href="/">首页</Link><span>/</span><b>全部产品</b>
        </nav>
        <h1 className="ptabs-title">全部产品</h1>
        <p className="ptabs-lede">共 {total} 款，涵盖宠适航空包、带宠出行、宠物家居与校园公益猫屋</p>
      </section>
      <ProductCatalog groups={GROUPS} initial={typeof cat === 'string' ? cat : 'all'} />
    </>
  );
}
