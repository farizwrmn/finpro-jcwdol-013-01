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

interface EwalletShippingMethod {
  imageSrc: string;
}

const EwalletshippingMethods: EwalletShippingMethod[] = [
  {
    imageSrc: 'https://shop.rehan.id/assets/images/payment-methods/gopay.png', // Replace with actual image URL
  },
  {
    imageSrc: 'https://shop.rehan.id/assets/images/payment-methods/ovo.png', // Replace with actual image URL
  },
  {
    imageSrc: 'https://shop.rehan.id/assets/images/payment-methods/dana.png', // Replace with actual image URL
  },
  {
    imageSrc:
      'https://shop.rehan.id/assets/images/payment-methods/shopeepay.png', // Replace with actual image URL
  },
];

export default function ShippingMethodPage() {
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<EwalletShippingMethod>();

  const handleMethodChange = (selectedMethod: any) => {
    setSelectedShippingMethod(selectedMethod);
  };

  return (
    <Box p={6}>
      <Heading as="h1" fontSize="3xl" mb={8}>
        Shipping Method
      </Heading>
      <Text fontSize={20}>E-Wallet</Text>
      <RadioGroup
        value={selectedShippingMethod?.imageSrc}
        onChange={handleMethodChange}
      >
        {EwalletshippingMethods.map((method) => (
          <Radio>
            <Flex mb={4} alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing="4">
                <Image src={method.imageSrc} m={10} />
                <Box></Box>
              </Stack>
            </Flex>
          </Radio>
        ))}
      </RadioGroup>
    </Box>
  );
}
