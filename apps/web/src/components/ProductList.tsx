import { Heading, Stack, Divider, SimpleGrid, Box } from '@chakra-ui/react';
import React from 'react';
import ProductCard1 from './ProductPage/products/ayam';
import ProductCard from './ProductPage/products/beras';
import ProductCard2 from './ProductPage/products/buah';
import ProductCard3 from './ProductPage/products/minyak';
import ProductCard4 from './ProductPage/products/sayur';
import ProductCard5 from './ProductPage/products/bumbu';

const ProductList = () => {
  return (
    <>
      <Heading textAlign={'center'} mt={{ base: '10', sm: '10' }} mb={5}>
        Groceries Near You
      </Heading>
      <Divider />
      <Box flex={'1'} gap={5} mb={10} h={{ base: '500px', sm: '520px' }}>
        <SimpleGrid overflowX={'scroll'} pb={10} pt={5}>
          <Stack flex={'row'} direction={'row'} h={'full'}>
            <ProductCard />
            <ProductCard1 />
            <ProductCard2 />
            <ProductCard3 />
            <ProductCard4 />
            <ProductCard5 />
          </Stack>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ProductList;
