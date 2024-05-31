import {
  TableContainer,
  Heading,
  Table,
  Tbody,
  Stack,
  Divider,
  Tr,
} from '@chakra-ui/react';
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
  return (
    <>
      <Heading textAlign={'center'} mt={{ base: '5', sm: '-20' }} mb={5}>
        Products Near You
      </Heading>
      <Divider />
      <TableContainer flex={'1'} gap={5} mb={10} h={'520px'}>
        <Table>
          <Stack flex={'row'} direction={'row'}>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </Stack>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProductList;
