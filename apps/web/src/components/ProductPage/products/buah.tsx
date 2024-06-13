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
            src="https://images.unsplash.com/photo-1591206369811-4eeb2f03bc95?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b3JhbmdlJTIwZnJ1aXR8ZW58MHx8MHx8fDA%3D"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Jeruk California</Heading>
            <Text noOfLines={4}>Jeruk segar California</Text>
            <Text color="blue.600" fontSize="lg" mt={5} textAlign={'center'}>
              Rp. 10.000,-
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
