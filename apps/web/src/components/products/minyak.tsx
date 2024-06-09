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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2ZHrJKh6VWh61mXwCRKNYr9TO3UDhNW_VXA&s"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Minyak Sawit Kita</Heading>
            <Text noOfLines={4}>Minyak dari kelapa sawit asli</Text>
            <Text color="blue.600" fontSize="lg" mt={5} textAlign={'center'}>
              Rp. 13.500,-
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2" flexDirection="column" m={'auto'}>
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
