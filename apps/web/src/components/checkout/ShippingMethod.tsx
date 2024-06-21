import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Button,
  Stack,
  Image,
} from '@chakra-ui/react';

interface ShippingMethod {
  name: string;
  deliveryTime: string;
  price: number;
}

const shippingMethods: ShippingMethod[] = [
  {
    name: 'DHL Free',
    deliveryTime: '10-12 business days',
    price: 0,
  },
  {
    name: 'DHL Express',
    deliveryTime: '3-4 business days',
    price: 5,
  },
  {
    name: 'FedEx 2-3 Day',
    deliveryTime: '2-3 business days',
    price: 6,
  },
  {
    name: 'UPS 2-3 Day',
    deliveryTime: '2-3 business days',
    price: 7,
  },
];

export default function ShippingMethodPage() {
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<ShippingMethod>();

  const handleMethodChange = (selectedMethod: any) => {
    setSelectedShippingMethod(selectedMethod);
  };

  return (
    <Box p={6}>
      <Heading as="h1" fontSize="3xl" mb={8}>
        Shipping Method
      </Heading>

      <RadioGroup
        value={selectedShippingMethod?.name}
        onChange={handleMethodChange}
      >
        {shippingMethods.map((method) => (
          <Stack>
            <Radio key={method.name} value={method.name}>
              <Box flexDirection="column" mb={8}>
                {' '}
                {/* Increased spacing between options */}
                <Stack direction="row" alignItems="center" spacing={4}>
                  <Box>
                    <Heading as="h4" fontSize="md">
                      {method.name}
                    </Heading>
                    <Text fontSize="sm" color="gray.500">
                      {method.deliveryTime}
                    </Text>
                  </Box>
                </Stack>
                <Text fontSize="lg" fontWeight="bold" mt={2}>
                  ${method.price}
                </Text>
              </Box>
            </Radio>
          </Stack>
        ))}
      </RadioGroup>
    </Box>
  );
}
