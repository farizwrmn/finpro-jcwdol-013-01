import React from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { FormatCurrency } from "@/utils/FormatCurrency";

interface ShippingMethod {
  name: string;
  deliveryTime: string;
  price: number;
}

type Props = {
  couriers: any[],
  setShippingCourier: (courier: string) => void;
  setShippingService: (service: string) => void;
  setShippingPrice: (cost: number) => void;
}

export default function ShippingMethod({
  couriers = [],
  setShippingCourier,
  setShippingService,
  setShippingPrice,
}: Props) {
  const handleChange = (value: string) => {
    const courier = value.split('|')[0] || ''
    const service = value.split('|')[1] || ''
    const cost = Number(value.split('|')[2]) || 0

    setShippingCourier(courier);
    setShippingService(service);
    setShippingPrice(cost);
  }

  return (
    <Stack spacing={8}>
      <Heading as="h1" fontSize="2xl">
        Shipping Method
      </Heading>

      <Stack
        spacing={8}
        w={'full'}
      >
        <RadioGroup onChange={handleChange}>
          {couriers.map((courier, index) => (
            <Box key={index} mb={6}>
              <Heading as="h2" fontSize="lg" mb={4}>
                {courier.name}
              </Heading>
              {courier.costs.map((service: any, index: number) => (
                <Flex key={index} justifyContent="space-between" mb={2}>
                  <Radio size='md' value={`${courier.code.toUpperCase()}|${service.service}|${service.cost[0].value}`} colorScheme='green'>
                    {`${service.description} (${service.cost[0].etd} days)`}
                  </Radio>
                  <Text>
                    {FormatCurrency(service.cost[0].value)}
                  </Text>
                </Flex>
              ))}
            </Box>
          ))}
        </RadioGroup>
      </Stack>
    </Stack>
  );
}