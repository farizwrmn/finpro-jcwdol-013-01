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

interface BankPaymentMethod {
  imageSrc: string;
}

const BankPaymentMethod: BankPaymentMethod[] = [
  {
    imageSrc: 'https://shop.rehan.id/assets/images/payment-methods/bca.png', // Replace with actual image URL
  },
  {
    imageSrc: 'https://shop.rehan.id/assets/images/payment-methods/bni.png', // Replace with actual image URL
  },
  {
    imageSrc: 'https://shop.rehan.id/assets/images/payment-methods/bri.png', // Replace with actual image URL
  },
  {
    imageSrc: 'https://shop.rehan.id/assets/images/payment-methods/bsi.png', // Replace with actual image URL
  },
  {
    imageSrc: 'https://shop.rehan.id/assets/images/payment-methods/mandiri.png', // Replace with actual image URL
  },
  {
    imageSrc: 'https://shop.rehan.id/assets/images/payment-methods/permata.png', // Replace with actual image URL
  },
];

export default function ShippingMethodPage() {
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<BankPaymentMethod>();

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
        {BankPaymentMethod.map((method) => (
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
