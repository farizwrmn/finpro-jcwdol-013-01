'use client';
import ProductCard1 from '@/components/ProductPage/products/ayam';
import ProductCard2 from '@/components/ProductPage/products/beras';
import ProductCard3 from '@/components/ProductPage/products/minyak';
import ProductCard4 from '@/components/ProductPage/products/bumbu';
import ProductCard5 from '@/components/ProductPage/products/buah';
import ProductCard from '@/components/ProductPage/products/sayur';
import { Box, Divider, Heading, SimpleGrid, Stack } from '@chakra-ui/react';
import React from 'react';
import DashboardLayout from '../(dashboard)/layout';

const layoutProduct = () => {
  return (
    <>
      <DashboardLayout children />
      <Heading
        mb={5}
        ml={{ base: '0', sm: '320' }}
        textAlign={{ base: 'center', sm: 'initial' }}
      >
        Your Products
      </Heading>
      <Divider w={580} />
      <Box
        textAlign={'center'}
        gap={5}
        mb={10}
        h={{ base: '500px', sm: '520px' }}
        zIndex={99}
        w={'full'}
      >
        <SimpleGrid
          spacing={5}
          templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }}
          ml={{ base: '0', sm: '290' }}
        >
          <ProductCard />
          <ProductCard1 />
          <ProductCard2 />
          <ProductCard3 />
          <ProductCard4 />
          <ProductCard5 />
        </SimpleGrid>{' '}
      </Box>
    </>
  );
};

export default layoutProduct;
