'use client';
import React from 'react';
import CategoryFilter from '@/components/ProductPage/products/CategoryFilter';
import ProductList from '@/components/ProductList';

const page = () => {
  return (
    <>
      <CategoryFilter />
      <ProductList />
    </>
  );
};

export default page;
