'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FormatCurrency } from '@/utils/FormatCurrency';
import Link from 'next/link';
import { getProducts } from '@/services/product.service';

const ProductList = () => {
  const [data, setData] = useState({
    products: [],
    pages: 1,
  });
  const [filters, setFilters] = useState({
    keyword: '',
    page: 1,
    size: 10,
  });

  useEffect(() => {
    (async () => {
      const result = await getProducts(filters);
      setData(result);
    })();
  }, [filters]);

  return (
    <>
      <Heading textAlign={'center'} mt={{ base: '10', sm: '10' }} mb={5}>
        Groceries Near You
      </Heading>
      <Divider />
      <Box flex={'1'} gap={5} mb={10} h={{ base: '550px', sm: '600px' }}>
        <SimpleGrid overflowX={'scroll'} pb={10} pt={5}>
          <Stack flex={'row'} direction={'row'} h={'full'}>
            {data.products?.map((product: any) => (
              <Card
                maxW="xs"
                shadow={'xl'}
                w={'full'}
                _hover={{
                  transform: 'translateY(5px)',
                  boxShadow: 'lg',
                }}
              >
                <CardBody>
                  <Link href={`/products/${product.slug}`}>
                    <Image
                      src={product.productImages}
                      alt="Green double couch with wooden legs"
                      borderRadius="lg"
                    />
                    <Stack mt="3" spacing="3">
                      <Heading size="md">{product.name}</Heading>
                      <Text noOfLines={4}>{product.description}</Text>
                      <Text
                        color="blue.600"
                        fontSize="lg"
                        mt={5}
                        textAlign={'center'}
                      >
                        {FormatCurrency(product.sellingPrice)}
                      </Text>
                      <Text
                        color="red.600"
                        fontSize="lg"
                        textAlign={'center'}
                        as={'s'}
                      >
                        {FormatCurrency(product.slicedPrice)}
                      </Text>
                    </Stack>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </Stack>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ProductList;
