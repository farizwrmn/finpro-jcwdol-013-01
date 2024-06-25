import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';

interface IPaymentMethod {
  value: string;
  image: string;
}

const ewallets: IPaymentMethod[] = [
  {
    value: 'gopay',
    image: 'https://shop.rehan.id/assets/images/payment-methods/gopay.png',
  },
  {
    value: 'ovo',
    image: 'https://shop.rehan.id/assets/images/payment-methods/ovo.png',
  },
  {
    value: 'dana',
    image: 'https://shop.rehan.id/assets/images/payment-methods/dana.png',
  },
  {
    value: 'shopeepay',
    image:
      'https://shop.rehan.id/assets/images/payment-methods/shopeepay.png',
  },
];

const virtualAccounts: IPaymentMethod[] = [
  {
    value: 'bca',
    image: 'https://shop.rehan.id/assets/images/payment-methods/bca.png',
  },
  {
    value: 'bni',
    image: 'https://shop.rehan.id/assets/images/payment-methods/bni.png',
  },
  {
    value: 'bri',
    image: 'https://shop.rehan.id/assets/images/payment-methods/bri.png',
  },
  {
    value: 'bsi',
    image:
      'https://shop.rehan.id/assets/images/payment-methods/bsi.png',
  },
  {
    value: 'mandiri',
    image:
      'https://shop.rehan.id/assets/images/payment-methods/mandiri.png',
  },
  {
    value: 'permata',
    image:
      'https://shop.rehan.id/assets/images/payment-methods/permata.png',
  },
];

const transferBanks: IPaymentMethod[] = [
  {
    value: 'bank',
    image: 'https://www.bankeka.co.id/assets/img/layanan/logo-atm-bersama.png',
  },
];

const minimarkets: IPaymentMethod[] = [
  {
    value: 'alfamart',
    image: 'https://shop.rehan.id/assets/images/payment-methods/alfamart.png',
  },
  {
    value: 'indomaret',
    image: 'https://shop.rehan.id/assets/images/payment-methods/indomaret.png',
  },
];

type Props = {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
}

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod
}: Props) {
  return (
    <Stack spacing={8}>
      <Heading as="h1" fontSize="2xl">
        Payment Method
      </Heading>

      <Stack
        spacing={8}
        w={'full'}
      >
        <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
          <Stack spacing={8}>
            <Heading as="h3" fontSize="md">E-Wallet</Heading>
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8}>
              {ewallets.map((method, index) => (
                <Radio key={index} value={method.value}>
                  <Image src={method.image} alt={method.value} pl={2} />
                </Radio>
              ))}
            </SimpleGrid>

            <Heading as="h3" fontSize="md">Virtual Account</Heading>
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8}>
              {virtualAccounts.map((method, index) => (
                <Radio key={index} value={method.value}>
                  <Image src={method.image} alt={method.value} pl={2} />
                </Radio>
              ))}
            </SimpleGrid>

            <Heading as="h3" fontSize="md">Transfer Bank</Heading>
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8}>
              {transferBanks.map((method, index) => (
                <Radio key={index} value={method.value}>
                  <Box pl={2}>
                    <img width={90} height={25} src={method.image} alt={method.value} />
                  </Box>
                </Radio>
              ))}
            </SimpleGrid>

            <Heading as="h3" fontSize="md">Minimarket</Heading>
            <SimpleGrid columns={{ base: 2, md: 3 }} spacing={8}>
              {minimarkets.map((method, index) => (
                <Radio key={index} value={method.value}>
                  <Image src={method.image} alt={method.value} pl={2} />
                </Radio>
              ))}
            </SimpleGrid>
          </Stack>
        </RadioGroup>
      </Stack>
    </Stack>
  );
}
