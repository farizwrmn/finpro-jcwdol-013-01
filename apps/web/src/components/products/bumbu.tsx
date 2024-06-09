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
            src="https://images.unsplash.com/photo-1517646458010-ea6bd9f4a75f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2Vhc29uaW5nfGVufDB8fDB8fHww"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">Bumbu Racik Nasi Goreng</Heading>
            <Text noOfLines={4}>Bumbu racik praktis untuk nasi goreng</Text>
            <Text color="blue.600" fontSize="lg" mt={5} textAlign={'center'}>
              Rp. 3.000,-
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
