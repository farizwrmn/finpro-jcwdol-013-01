'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
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
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { addStock, getStocksByProductID } from '@/services/stock.service';
import { getProductByID } from '@/services/product.service';
import { getStoreByID } from '@/services/store.service';
import {
  getDiscounts,
  getDiscountsByStoreID,
} from '@/services/discount.service';
import { FormatCurrency } from '@/utils/FormatCurrency';
import { useAppSelector } from '@/lib/hooks';

const Page = () => {
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [store, setStore] = useState<any>();
  const user = useAppSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    initialStock: '',
    initialStoreId: '',
  });

  useEffect(() => {
    (async () => {
      if (!user.storeId) return;
      const resultStore = await getStoreByID(user.storeId);
      setStore(resultStore);
      const resultDiscounts = await getDiscountsByStoreID(user.storeId);
      setDiscounts(resultDiscounts);
    })();
  }, [user.storeId]);

  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const handleChange = (e: ChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!user.storeId) return;
      const product = await addStock(user.storeId, formData);
      if (!product) throw new Error('Update product failed!');
      alert('Update product success');
      router.push(`/admin/products/stocks/${user.storeId}`);
    } catch (err) {
      console.error(err);
      alert('Update product failed');
    }
  };

  const router = useRouter();

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Discount for Store "{store?.name}"
      </Text>
      <Card my={10}>
        <CardBody>
          <Flex gap={4} pb={8}>
            <Button
              colorScheme="blue"
              onClick={() => {
                router.push(`/admin/discounts/create`);
              }}
            >
              Add Discount
            </Button>
          </Flex>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Discount Type</Th>
                  <Th>Amount</Th>
                  <Th>Unit</Th>
                  <Th>Minimum Price</Th>
                  <Th>Maximum Discount</Th>
                  <Th>Product</Th>
                  <Th textAlign={'start'}>Action</Th>
                </Tr>
              </Thead>
              <Tbody alignContent={'center'}>
                {discounts?.map((discount: any, index: number) => (
                  <Tr key={discount.id}>
                    <Td>{index + 1}</Td>
                    <Td>{discount.type}</Td>
                    <Td>
                      {discount.unit === 'Amount'
                        ? FormatCurrency(discount.amount)
                        : discount.amount + '%'}
                    </Td>
                    <Td>{discount.unit}</Td>
                    <Td>{FormatCurrency(discount.minimumPrice)}</Td>
                    <Td>{FormatCurrency(discount.maximumDiscount)}</Td>
                    <Td>{discount.product?.name}</Td>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="green"
                          onClick={() => {
                            router.push(`/admin/stores/discounts`);
                          }}
                        >
                          Edit
                        </Button>
                      </ButtonGroup>
                    </Td>
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
