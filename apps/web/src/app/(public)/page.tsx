import ProductList from '@/components/ProductList';
import Category from '@/components/category';
import Hero from '@/components/hero';
import GeoLocation from '@/components/navbar/GeoLocation';
import BannerPromo from '@/components/promo/bannerPromo/page';
import { Divider } from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <GeoLocation />
      <Hero />
      <Category />
      <Divider />
      <BannerPromo />
      <ProductList />
    </>
  );
}
