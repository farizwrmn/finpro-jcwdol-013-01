import ProductCatalog from '@/components/ProductPage/products/ProductCatalog';
import React, { Suspense } from 'react';

const page = () => {
  return (
    <Suspense>
      <ProductCatalog />
    </Suspense>
  );
};

export default page;
