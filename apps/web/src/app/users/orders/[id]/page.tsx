"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  TableContainer,
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';
import { useRouter } from "next/navigation";
import { getOrderByID } from "@/services/order.service";
import { FormatCurrency } from "@/utils/FormatCurrency";
import { createPayment, updatePaymentStatus } from "@/services/payment.service";
import { toast } from "react-toastify";
import { ORDER_STATUS } from "@/constants/order.constant";

type Props = { params: { id: string } };

const Page = ({ params: { id } }: Props) => {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await getOrderByID(id);
      setOrder(data);
    })()
  }, [id]);

  const handlePay = async () => {
    try {
      const payment = await createPayment({ orderId: id });
      if (!payment.url) throw new Error("Pay order failed");
      router.push(payment.url);
    } catch (err) {
      toast.error("Pay order failed");
    }
  }

  const handleCancel = async () => {
    try {
      const formData = { orderStatus: ORDER_STATUS.dibatalkan };
      const order = await updatePaymentStatus(id, formData);
      if (!order?.id) throw new Error("Cancel order failed");

      const data = await getOrderByID(id);
      setOrder(data);
      toast.success("Cancel order success");
    } catch (err) {
      toast.error("Cancel order failed");
    }
  }

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
            <FormControl id="orderStatus">
              <FormLabel>Order Status</FormLabel>
              <Text>{order?.orderStatus}</Text>
            </FormControl>
            <FormControl id="paymentMethod">
              <FormLabel>Payment Method</FormLabel>
              <Text>{order?.paymentMethod}</Text>
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
            {order?.paymentMethod === "BANK" &&
              order?.orderStatus === ORDER_STATUS.menungguKonfirmasiPembayaran &&
              order?.paymentImage && (
                <FormControl id="orderStatus">
                  <FormLabel>Payment Proof</FormLabel>
                  <img
                    src={`http://localhost:8000/public/confirmation/${order?.paymentImage}`}
                    style={{ height: 300 }}
                    alt="Payment Proof"
                  />
                </FormControl>
              )}
            {order?.orderStatus && order?.orderStatus === ORDER_STATUS.menungguPembayaran ? (
              <Stack spacing={6} direction={['column', 'row']} mt={15}>
                <Button
                  onClick={handleCancel}
                  bg={'red.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'red.500',
                  }}>
                  Cancel Order
                </Button>
                <Button
                  onClick={handlePay}
                  bg={'blue.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Pay Order
                </Button>
              </Stack>
            ) : (
              <Stack spacing={6} direction={['column', 'row']} mt={15}>
                <Button
                  onClick={() => {
                    router.push(`/users/orders`)
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
            )}
          </Stack>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Product Name</Th>
                  <Th>Description</Th>
                  <Th>Quantity</Th>
                  <Th>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {order?.orderItems?.map((item: any, index: number) => (
                  <Tr key={item.id}>
                    <Td>{index + 1}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.description}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{FormatCurrency(item.price)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;