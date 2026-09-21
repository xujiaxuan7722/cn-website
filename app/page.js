import Hero from '@/components/home/Hero';
import Band from '@/components/home/Band';
import Reel from '@/components/home/Reel';
import About from '@/components/home/About';
import Products from '@/components/home/Products';
import AllProducts from '@/components/home/AllProducts';
import Capability from '@/components/home/Capability';
import Clients from '@/components/home/Clients';
import Cta from '@/components/home/Cta';
import Charity from '@/components/home/Charity';
import Story from '@/components/home/Story';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Band />
      <Reel />
      <About />
      <Products />
      <AllProducts />
      <Capability />
      <Clients />
      <Cta />
      <Charity />
      <Story />
    </>
  );
}
