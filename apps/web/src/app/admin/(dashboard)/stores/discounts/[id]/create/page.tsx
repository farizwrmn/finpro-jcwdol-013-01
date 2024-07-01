'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  TableContainer,
  Box,
  Input,
  Select,
  Text,
  Button,
  FormControl,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import { getStoreByID } from '@/services/store.service';
import { createDiscount, getDiscounts } from '@/services/discount.service';
import { getProducts } from '@/services/product.service';

type Props = { params: { id: string } };

const Page = ({ params: { id: storeId } }: Props) => {
  const [store, setStore] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    storeId,
    type: 'Product Discount',
    amount: 0,
    unit: '',
    minimumPrice: 0,
    maximumDiscount: 0,
    productId: '',
    freeShipping: 0,
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getProducts({});
      setProducts(data?.products);
      const dataStore = await getStoreByID(storeId);
      setStore(dataStore);
    })();
  }, []);

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
      const product = await createDiscount(formData);
      if (!product) throw new Error('Create discount failed!');
      alert('Create discount success');
      router.push(`/admin/stores/discounts/${storeId}`);
    } catch (err) {
      console.error(err);
      alert('Create discount failed');
    }
  };

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Discount Management
      </Text>
      <Card my={10}>
        <CardBody>
          <TableContainer>
            <form onSubmit={handleSubmit}>
              <Stack spacing={6} w={'full'} rounded={'xl'} p={10} my={6}>
                <FormControl id="store">
                  <FormLabel>Store</FormLabel>
                  <Text as={'b'}>{store?.name}</Text>
                </FormControl>
                <FormControl id="type" isRequired>
                  <FormLabel>Discount Type</FormLabel>
                  <Select
                    name="type"
                    width="auto"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="Product Discount">Product Discount</option>
                    <option value="Minimum Purchase">Minimum Purchase</option>
                    <option value="Buy 1 Get 1">Buy 1 Get 1</option>
                    <option value="Free Shipping">Free Shipping</option>
                    <option value="Referral Code">Referral Code</option>
                  </Select>
                </FormControl>
                {(formData.type === 'Product Discount' ||
                  formData.type === 'Minimum Purchase') && (
                  <>
                    <FormControl id="amount" isRequired>
                      <FormLabel>Amount</FormLabel>
                      <Input
                        name="amount"
                        placeholder="Amount"
                        _placeholder={{ color: 'gray.500' }}
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl id="unit" isRequired>
                      <FormLabel>Unit</FormLabel>
                      <Select
                        name="unit"
                        width="auto"
                        value={formData.unit}
                        onChange={handleChange}
                      >
                        <option value=""></option>
                        <option value="Amount">Amount</option>
                        <option value="Percentage">Percentage</option>
                      </Select>
                    </FormControl>
                  </>
                )}
                {formData.type === 'Minimum Purchase' && (
                  <>
                    <FormControl id="minimumPrice" isRequired>
                      <FormLabel>Minimum Price</FormLabel>
                      <Input
                        name="minimumPrice"
                        placeholder="Minimum Price"
                        _placeholder={{ color: 'gray.500' }}
                        type="number"
                        value={formData.minimumPrice}
                        onChange={handleChange}
                      />
                    </FormControl>
                    {formData.unit === 'Percentage' && (
                      <FormControl id="maximumDiscount" isRequired>
                        <FormLabel>Maximum Discount</FormLabel>
                        <Input
                          name="maximumDiscount"
                          placeholder="Maximum Discount"
                          _placeholder={{ color: 'gray.500' }}
                          type="number"
                          value={formData.maximumDiscount}
                          onChange={handleChange}
                        />
                      </FormControl>
                    )}
                  </>
                )}

                {formData.type === 'Free Shipping' && (
                  <>
                    <FormControl id="freeShipping" isRequired>
                      <FormLabel>Minimum Order</FormLabel>
                      <Input
                        name="freeShipping"
                        placeholder="Minimum Order"
                        _placeholder={{ color: 'gray.500' }}
                        type="number"
                        value={formData.freeShipping}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </>
                )}

                {(formData.type === 'Product Discount' ||
                  formData.type === 'Buy 1 Get 1') && (
                  <>
                    <FormControl id="productId" isRequired>
                      <FormLabel>Product</FormLabel>
                      <Select
                        name="productId"
                        width="auto"
                        value={formData.productId}
                        onChange={handleChange}
                      >
                        <option value=""></option>
                        {products?.map((product: any) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}

                <Stack spacing={6} direction={['column', 'row']}>
                  <Button
                    onClick={() => {
                      router.push(`/admin/stores/discounts/${storeId}`);
                    }}
                    bg={'red.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                      bg: 'red.500',
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    bg={'blue.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Create
                  </Button>
                </Stack>
              </Stack>
            </form>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
