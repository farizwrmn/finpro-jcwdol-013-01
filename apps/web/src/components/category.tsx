'use client';

import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getCategories } from '@/services/category.service';

const Category = () => {
  const [data, setData] = useState({
    categories: [],
    pages: 1,
  });

  console.log(data);

  const [filters, setFilters] = useState({
    keyword: '',
    page: 1,
    size: 10,
  });

  useEffect(() => {
    (async () => {
      const result = await getCategories(filters);
      setData(result);
    })();
  }, [filters]);

  return (
    <>
      <Heading
        textAlign={'center'}
        mt={{ base: '5', sm: '-20' }}
        p={5}
        fontFamily={'monospace'}
      >
        Select from Categories
      </Heading>
      <Divider />
      <Flex mt={{ base: '5', sm: '2' }} pt={5} pb={20}>
        <Container p={'auto'}>
          <Box justifyContent={'center'}>
            <Grid
              templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(5, 1fr)' }}
              gap={10}
              textAlign={'center'}
            >
              {data.categories?.map((category: any, index: number) => (
                <GridItem>
                  <Link href={'/'}>
                    <Image
                      key={index}
                      src={`http://localhost:8000/public/categories/${category.image}`}
                      _hover={{
                        transform: 'translateY(-5px)',
                        boxShadow: 'lg',
                      }}
                      objectFit={'cover'}
                      width={'120px'}
                      height={'80px'}
                      borderRadius={'xl'}
                    />
                    <Text
                      _hover={{ color: 'green' }}
                      as={'cite'}
                      noOfLines={15}
                    >
                      {category.name}
                    </Text>
                  </Link>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default Category;
