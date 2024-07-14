'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FormatCurrency } from '@/utils/FormatCurrency';
import Link from 'next/link';
import {
  getAvailableProductsByStoreID,
  getProducts,
} from '@/services/product.service';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getStores } from '@/services/store.service';
import { FaStore } from 'react-icons/fa';

const ProductList = () => {
  const [stores, setStores] = useState<any[]>([]);
  const [data, setData] = useState({
    products: [],
    pages: 1,
  });
  const [filters, setFilters] = useState({
    keyword: '',
    page: 1,
    size: 8,
  });

  useEffect(() => {
    (async () => {
      const location = JSON.parse(localStorage.getItem('location') || '{}');
      const storeId = location.storeId;
      if (storeId) {
        const result = await getAvailableProductsByStoreID({
          ...filters,
          storeId,
        });
        setData(result);
      } else {
        const result = await getProducts(filters);
        setData(result);
      }
    })();
  }, [filters]);

  useEffect(() => {
    (async () => {
      const data = await getStores({});
      setStores(data.stores);
    })();
  }, []);

  return (
    <>
      <Heading
        textAlign={'center'}
        mt={{ base: '10', sm: '10' }}
        mb={5}
        fontFamily={'monospace'}
      >
        Groceries Near You
      </Heading>
      <Divider mb={10} />
      <Stack
        pb={10}
        pt={5}
        bg={'teal'}
        bgGradient={'linear(to-r, teal.200, green.500)'}
      >
        <Grid
          templateColumns={{ base: 'repeat(1, 2fr)', sm: 'repeat(4, 2fr)' }}
          gap={6}
        >
          {data.products?.map((product: any, index: number) => (
            <GridItem w={'full'} flexDirection={'column'} p={5} key={index}>
              <Card
                h={'100%'}
                key={index}
                maxW="xl"
                shadow={'xl'}
                w={'full'}
                transition={'0.25s all ease-in-out'}
                _hover={{
                  transform: 'translateY(-15px)',
                  boxShadow: 'lg',
                }}
                borderRadius={'2xl'}
              >
                <CardBody>
                  <Link href={`/products/${product.slug}`}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/public/products/${product.productImages[0]?.image}`}
                      alt="Green double couch with wooden legs"
                      borderRadius="2xl"
                      width={'500px'}
                      height={'200px'}
                      fit={'cover'}
                    />
                    <Stack mt="3" spacing="3" textAlign={'center'}>
                      <Heading size="md" noOfLines={4}>
                        {product.name}
                      </Heading>
                      <Text>{product.category.name}</Text>
                      <Text color="blue.600" fontSize="lg" mt={5} as={'b'}>
                        {FormatCurrency(product.price)}
                      </Text>
                    </Stack>
                  </Link>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
        {data.pages > 1 && (
          <Box pt={4} display="flex" justifyContent="center">
            <Box display="flex">
              <IconButton
                aria-label="left"
                icon={<Icon as={FiChevronLeft} />}
                onClick={() =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    page: Math.max(prevFilters.page - 1, 1),
                  }))
                }
                isDisabled={filters.page === 1}
              />
              <Box p={2}>
                {filters.page} / {data.pages}
              </Box>
              <IconButton
                aria-label="right"
                icon={<Icon as={FiChevronRight} />}
                onClick={() =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    page: Math.min(prevFilters.page + 1, data.pages),
                  }))
                }
                isDisabled={filters.page === data.pages}
              />
            </Box>
          </Box>
        )}
        {data.pages === 0 && (
          <Stack flexDirection={'column'} textAlign={'center'} h={'full'}>
            <Text as={'b'} fontSize={'4xl'}>
              Our Products only available in Stores below:{' '}
            </Text>
            <Box m={2} justifyContent={'center'} mt={10}>
              {stores.map((store: any, index: number) => (
                <Flex
                  key={index}
                  display="inline-flex"
                  backgroundColor={'white'}
                  cursor={'default'}
                  m={2}
                  alignItems="center"
                  borderRadius={5}
                  width="max-content"
                  p={1}
                  pr={4}
                >
                  <Icon as={FaStore} color="green.500" m={2} />
                  {store.name}
                </Flex>
              ))}
            </Box>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default ProductList;
