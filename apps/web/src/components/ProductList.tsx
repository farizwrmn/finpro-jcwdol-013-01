'use client';

import React from 'react';
import productItems from '@/data/products.json';
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FormatCurrency } from '@/utils/FormatCurrency';
import { FaCartPlus } from 'react-icons/fa';
import Link from 'next/link';

const ProductList = () => {
  return (
    <>
      <Heading textAlign={'center'} mt={{ base: '10', sm: '10' }} mb={5}>
        Groceries Near You
      </Heading>
      <Divider />
      <Box flex={'1'} gap={5} mb={10} h={{ base: '550px', sm: '600px' }}>
        <SimpleGrid overflowX={'scroll'} pb={10} pt={5}>
          <Stack flex={'row'} direction={'row'} h={'full'}>
            {productItems.map((item) => (
              <Card maxW="xs" shadow={'xl'} w={'full'}>
                <CardBody>
                  <Link href={`/products/${item.slug}`}>
                    <Image
                      src={item.imgUrl}
                      alt="Green double couch with wooden legs"
                      borderRadius="lg"
                    />
                    <Stack mt="3" spacing="3">
                      <Heading size="md">{item.name}</Heading>
                      <Text noOfLines={4}>{item.caption}</Text>
                      <Text
                        color="blue.600"
                        fontSize="lg"
                        mt={5}
                        textAlign={'center'}
                      >
                        {FormatCurrency(item.price)}
                      </Text>
                    </Stack>
                  </Link>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2" m={'auto'}>
                    <Button variant="solid" colorScheme="blue" w={120}>
                      Buy now
                    </Button>
                    <Button variant="solid" colorScheme="green" w={120}>
                      <FaCartPlus size={'26'} />
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ))}
          </Stack>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ProductList;
