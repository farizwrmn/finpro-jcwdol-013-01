import ProductList from '@/components/ProductList';
import Category from '@/components/category';
import Hero from '@/components/hero';
import GeoLocation from '@/components/navbar/GeoLocation';
import BannerPromo from '@/components/promo/bannerPromo/page';

export default function Home() {
  return (
    <>
      <GeoLocation />
      <Hero />
      <Category />
      <BannerPromo />
      <ProductList />
    </>
  );
}
