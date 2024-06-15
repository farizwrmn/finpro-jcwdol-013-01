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
      <Card maxW="xs" shadow={'xl'} w={'full'}>
        <CardBody>
          <Image
            src="https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D"
            h={'170px'}
            w={'full'}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Sayur Bayam Segar</Heading>
            <Text noOfLines={4}>Bayam hijau hasil dari perkebunan sendiri</Text>
            <Text color="blue.600" fontSize="lg" mt={5} textAlign={'center'}>
              Rp. 7.000,-
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2" m={'auto'}>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductCard;
