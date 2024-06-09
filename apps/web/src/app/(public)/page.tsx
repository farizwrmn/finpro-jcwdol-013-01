import ProductList from '@/components/products/ProductList';
import Category from '@/components/category';
import Hero from '@/components/hero';

export default function Home() {
  return (
    <>
      <Hero />
      <Category />
      <ProductList />
    </>
  );
}
