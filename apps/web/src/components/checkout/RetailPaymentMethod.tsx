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

interface RetailPaymentMethod {
  imageSrc: string;
}

const RetailPaymentMethod: RetailPaymentMethod[] = [
  {
    imageSrc:
      'https://shop.rehan.id/assets/images/payment-methods/alfamart.png', // Replace with actual image URL
  },
  {
    imageSrc:
      'https://shop.rehan.id/assets/images/payment-methods/indomaret.png', // Replace with actual image URL
  },
];

export default function ShippingMethodPage() {
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<RetailPaymentMethod>();

  const handleMethodChange = (selectedMethod: any) => {
    setSelectedShippingMethod(selectedMethod);
  };

  return (
    <Box p={6}>
      <Text fontSize={20}>Virtual Account</Text>
      <RadioGroup
        value={selectedShippingMethod?.imageSrc}
        onChange={handleMethodChange}
      >
        {RetailPaymentMethod.map((method) => (
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
