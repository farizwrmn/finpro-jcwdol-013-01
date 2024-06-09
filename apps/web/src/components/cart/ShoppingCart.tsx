'use client';

import React, { useState } from 'react';
import {
  Flex,
  Box,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  Image,
  Stack,
  Circle,
  Grid,
  AspectRatio,
  Button,
} from '@chakra-ui/react';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

function ShoppingCart() {
  const [cart, setCart] = useState<Product[]>([]);

  const handleQuantityDecrease = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? product.quantity > 1
            ? { ...product, quantity: product.quantity - 1 }
            : product
          : product,
      ),
    );
  };

  const handleQuantityIncrease = (productId: string) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      ),
    );
  };

  const handleRemoveProduct = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId),
    );
  };

  const calculateTotalPrice = (discount?: number) => {
    // Implement logic to calculate total price with discount (if applicable)
    return (
      cart.reduce((acc, product) => acc + product.price * product.quantity, 0) *
      (1 - (discount || 0))
    );
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} px={6} py={12}>
        <Heading fontSize="4xl" textAlign="center">
          Your Shopping Cart
        </Heading>
        {cart.length === 0 ? (
          <Text>Your cart is currently empty.</Text>
        ) : (
          <>
            {cart.map((product) => (
              <Flex
                key={product.id}
                mb={4}
                alignItems="center"
                justifyContent="space-between"
              >
                <Box mr={4}>
                  {product.imageUrl && (
                    <Image src={product.imageUrl} alt={product.name} />
                  )}
                </Box>
                <Stack spacing={2}>
                  <Text>{product.name}</Text>
                  <Text>Price: &#36;{product.price.toFixed(2)}</Text>
                  <Stack direction="row" alignItems="center">
                    <Text>Quantity: </Text>
                    <Button
                      size="xs"
                      mr={2}
                      disabled={product.quantity === 1}
                      onClick={() => handleQuantityDecrease(product.id)}
                    >
                      -
                    </Button>
                    <Text>{product.quantity}</Text>
                    <Button
                      size="xs"
                      onClick={() => handleQuantityIncrease(product.id)}
                    >
                      +
                    </Button>
                  </Stack>
                  <Button
                    colorScheme="red"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    Remove Item
                  </Button>
                </Stack>
              </Flex>
            ))}
            <Text fontSize="xl">
              Subtotal: &#36;{calculateTotalPrice().toFixed(2)}
            </Text>
            {/* Add section for displaying and applying discount (if applicable) */}
            <Text fontSize="xl">
              Total Price: &#36;{calculateTotalPrice(/* discount */).toFixed(2)}
            </Text>
          </>
        )}
        {/* Add buttons or sections for checkout or other functionalities here */}
      </Stack>
    </Flex>
  );
}

export default ShoppingCart;
