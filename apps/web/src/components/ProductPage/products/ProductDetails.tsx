'use client';

import { FormatCurrency } from '@/utils/FormatCurrency';
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react';
import { MdLocalShipping } from 'react-icons/md';
import ProductSlider from '../slider/ProductSlider';
import DummyStoreListPage from './DummyStore';

type Props = {
  product: any;
};

export default function ProductDetails({ product }: Props) {
  const textColor = useColorModeValue('gray.900', 'gray.400');
  const dividerColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Container maxW={'7xl'}>
      {/* <ProductSlider /> */}
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Box>
          <ProductSlider />
          {/* <Image
            rounded={'md'}
            alt={'product image'}
            src={'/'}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          /> */}
        </Box>

        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              <p>{product.name}</p>
            </Heading>
            <Text color={textColor} fontWeight={300} fontSize={'2xl'}>
              {FormatCurrency(product.sellingPrice)}
            </Text>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={<StackDivider borderColor={dividerColor} />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}
              >
                {product.description}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Product Details
              </Text>
              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Category :
                  </Text>{' '}
                  {product.category.name}
                </ListItem>
                <ListItem></ListItem>
                {/* Add more product details as needed */}
              </List>
            </Box>
          </Stack>
          <DummyStoreListPage />
          <Text as={'span'} fontWeight={'bold'}>
            Stock:100 {/* Dummy */}
          </Text>
          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{ transform: 'translateY(2px)', boxShadow: 'lg' }}
          >
            Add to cart
          </Button>
          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
