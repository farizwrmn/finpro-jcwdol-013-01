import React from 'react';
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  CardFooter,
} from '@chakra-ui/react';

const ProductCard = () => {
  return (
    <>
      <Card maxW="xs" shadow={'xl'}>
        <CardBody>
          <Image
            src="https://gratisongkir-storage.com/products/900x900/FC6WmSRVFl6Z.jpg"
            h={'175px'}
            w={'full'}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Beras Pulen Petruk 5kg</Heading>
            <Text noOfLines={4}>Beras asli Jawa Tengah</Text>
            <Text color="blue.600" fontSize="lg" mt={5} textAlign={'center'}>
              Rp. 75.000,-
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2" m={'auto'}>
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductCard;
