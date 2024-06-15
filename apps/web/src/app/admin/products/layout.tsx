'use client';

import {
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
import React from 'react';
import DashboardLayout from '../(dashboard)/layout';
import productItems from '@/data/products.json';
import { FormatCurrency } from '@/utils/FormatCurrenct';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
          {productItems.map((item) => (
            <Card maxW="xs" shadow={'xl'} w={'full'}>
              <CardBody>
                <Image
                  src={item.imgUrl}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
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
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing="2" m={'auto'}>
                  <Button variant="ghost" colorScheme="green" w={120}>
                    <FaEdit />
                  </Button>
                  <Button variant="solid" colorScheme="red" w={120}>
                    <FaTrash />
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default layoutProduct;
