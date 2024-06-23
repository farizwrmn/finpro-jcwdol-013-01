'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { getProductBySlug } from '@/services/product.service';
import ProductDetails from '@/components/ProductPage/products/ProductDetails';

type Props = { params: { slug: string } };

const Page = ({ params: { slug } }: Props) => {
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getProductBySlug(slug);
      setProduct(data);
    })();
  }, [slug]);

  if (!product) return <></>;

  return <ProductDetails product={product} />;
};

export default Page;
