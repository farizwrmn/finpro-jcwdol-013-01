'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  ButtonGroup,
  Button,
  Flex,
  Input,
  Select,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAppSelector } from "@/lib/hooks";
import { getOrders } from "@/services/order.service";
import { FormatCurrency } from "@/utils/FormatCurrency";

const Page = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [data, setData] = useState({
    orders: [],
    pages: 1
  });
  const [filters, setFilters] = useState({
    keyword: '',
    page: 1,
    size: 10
  });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const result = await getOrders(filters);
      setData(result);
    })();
  }, [filters]);

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Transactions
      </Text>
      <Card my={10}>
        <CardBody>
          <Flex gap={4} pb={8}>
            <Input
              placeholder="Search..."
              value={filters.keyword}
              onChange={(e) => setFilters({ ...filters, keyword: e.target.value, page: 1 })}
            />
          </Flex>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Order Number</Th>
                  <Th>Order Date</Th>
                  <Th>User</Th>
                  <Th>Store</Th>
                  <Th>Items Price</Th>
                  <Th>Shipping Price</Th>
                  <Th>Items Discount</Th>
                  <Th>Shipping Discount</Th>
                  <Th>Voucher Discount</Th>
                  <Th>Referral Discount</Th>
                  <Th>Total Price</Th>
                  <Th>Order Status</Th>
                  <Th>Payment Method</Th>
                  <Th>Shipping Method</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.orders?.map((order: any, index: number) => (
                  <Tr key={order.id}>
                    <Td>{filters.size * (filters.page - 1) + index + 1}</Td>
                    <Td>{order.orderNumber}</Td>
                    <Td>{order.orderDate}</Td>
                    <Td>{order.user.email}</Td>
                    <Td>{order.store.name}</Td>
                    <Td>{FormatCurrency(order.itemsPrice)}</Td>
                    <Td>{FormatCurrency(order.shippingPrice)}</Td>
                    <Td>{FormatCurrency(-order.itemsDiscount)}</Td>
                    <Td>{FormatCurrency(-order.shippingDiscount)}</Td>
                    <Td>{FormatCurrency(-order.voucherDiscount)}</Td>
                    <Td>{FormatCurrency(-order.referralDiscount)}</Td>
                    <Td>{FormatCurrency(order.totalPrice)}</Td>
                    <Td>{order.orderStatus}</Td>
                    <Td>{order.paymentMethod}</Td>
                    <Td>{`${order.shippingCourier} - ${order.shippingService}`}</Td>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="blue"
                          onClick={() => {
                            router.push(`/users/orders/${order.id}`);
                          }}
                        >
                          Detail
                        </Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box pt={4} display="flex" justifyContent="space-between">
            <Select
              width="auto"
              value={filters.size}
              onChange={(e) => setFilters({ ...filters, size: parseInt(e.target.value), page: 1 })}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </Select>

            <Box display="flex">
              <IconButton
                aria-label="left"
                icon={<Icon as={FiChevronLeft} />}
                onClick={() => setFilters(prevFilters => ({
                  ...prevFilters,
                  page: Math.max(prevFilters.page - 1, 1)
                }))}
                isDisabled={filters.page === 1}
              />
              <Box p={2}>{filters.page} / {data.pages}</Box>
              <IconButton
                aria-label="right"
                icon={<Icon as={FiChevronRight} />}
                onClick={() =>
                  setFilters(prevFilters => ({
                    ...prevFilters,
                    page: Math.min(prevFilters.page + 1, data.pages)
                  }))
                }
                isDisabled={filters.page === data.pages}
              />
            </Box>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
