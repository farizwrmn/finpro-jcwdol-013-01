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
  imageSrc: string; // Added for image display
}

const shippingMethods: ShippingMethod[] = [
  {
    name: 'DHL Free',
    deliveryTime: '10-12 business days',
    price: 0,
    imageSrc: 'https://cdn.worldvectorlogo.com/logos/dhl-3.svg', // Replace with actual image URL
  },
  {
    name: 'DHL Express',
    deliveryTime: '3-4 business days',
    price: 5,
    imageSrc:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/DHL_Express_logo.svg/2560px-DHL_Express_logo.svg.png', // Replace with actual image URL
  },
  {
    name: 'FedEx 2-3 Day',
    deliveryTime: '2-3 business days',
    price: 6,
    imageSrc:
      'https://w7.pngwing.com/pngs/698/928/png-transparent-fedex-express-hd-logo.png', // Replace with actual image URL
  },
  {
    name: 'UPS 2-3 Day',
    deliveryTime: '2-3 business days',
    price: 7,
    imageSrc: 'https://logowik.com/content/uploads/images/ups-icon3837.jpg', // Replace with actual image URL
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
                  <Image
                    src={method.imageSrc}
                    alt={method.name}
                    width="40px"
                    height="40px"
                  />
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
