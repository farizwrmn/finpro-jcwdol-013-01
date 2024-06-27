"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Box,
  Text,
  FormControl,
  FormLabel,
  Stack,
  Button,
} from '@chakra-ui/react';
import { getOrderByID } from "@/services/order.service";
import { FormatCurrency } from "@/utils/FormatCurrency";
import { updatePaymentStatus } from "@/services/payment.service";
import { useRouter } from "next/navigation";

type Props = { params: { id: string } };

const Page = ({ params: { id } }: Props) => {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let data = await getOrderByID(id);

      if (data.paymentStatus === "UNPAID") {
        const formData = { paymentStatus: "CANCELED" };
        await updatePaymentStatus(id, formData);

        data = await getOrderByID(id);
        setOrder(data);
      } else {
        router.push(`/users/orders/${id}`);
      }
    })()
  }, [id, router]);

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Order {`"${order?.orderNumber}"`}
      </Text>
      <Card my={10}>
        <CardBody>
          <Stack
            spacing={6}
            w={'full'}
            rounded={'xl'}
            p={10}
            my={6}
          >
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Text>{order?.user.name}</Text>
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Text>{order?.user.email}</Text>
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Phone</FormLabel>
              <Text>{order?.user.phone}</Text>
            </FormControl>
            <FormControl id="address">
              <FormLabel>Address</FormLabel>
              <Text>{`${order?.userAddress.address}, ${order?.userAddress.subdistrictName}, ${order?.userAddress.cityName}, ${order?.userAddress.provinceName} ${order?.userAddress.postalCode || ''}`}</Text>
            </FormControl>
            <FormControl id="orderDate">
              <FormLabel>Order Date</FormLabel>
              <Text>{order?.orderDate}</Text>
            </FormControl>
            <FormControl id="totalPrice">
              <FormLabel>Total Price</FormLabel>
              <Text>{FormatCurrency(order?.totalPrice)}</Text>
            </FormControl>
            <FormControl id="paymentMethod">
              <FormLabel>Payment Method</FormLabel>
              <Text>{order?.paymentMethod}</Text>
            </FormControl>
            <FormControl id="paymentStatus">
              <FormLabel>Payment Status</FormLabel>
              <Text>{order?.paymentStatus}</Text>
            </FormControl>
            <FormControl id="paymentDate">
              <FormLabel>Payment Date</FormLabel>
              <Text>{order?.paymentDate}</Text>
            </FormControl>
            <FormControl id="shippingCourier">
              <FormLabel>Shipping Method</FormLabel>
              <Text>{`${order?.shippingCourier} - ${order?.shippingService}`}</Text>
            </FormControl>
            <FormControl id="shippingStatus">
              <FormLabel>Shipping Status</FormLabel>
              <Text>{order?.shippingStatus}</Text>
            </FormControl>
            <FormControl id="shippingDate">
              <FormLabel>Shipping Date</FormLabel>
              <Text>{order?.shippingDate}</Text>
            </FormControl>
            <Button
              onClick={() => {
                router.push(`/users/orders/${id}`)
              }}
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}>
              Back
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;