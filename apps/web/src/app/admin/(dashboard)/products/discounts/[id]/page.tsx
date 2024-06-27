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

type Props = { params: { id: string } };

const Page = ({ params: { id } }: Props) => {
  const [stocks, setStocks] = useState<any[]>([]);
  const [product, setProduct] = useState<any>();

  const [formData, setFormData] = useState({
    initialStock: '',
    initialStoreId: '',
  });

  useEffect(() => {
    (async () => {
      const resultProduct = await getProductByID(id);
      setProduct(resultProduct);
    })();
  }, [id]);

  useEffect(() => {
    async () => {
      const data = await getStocksByProductID(id);
      setFormData(data);
    };
  });

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
      const product = await addStock(id, formData);
      if (!product) throw new Error('Update product failed!');
      alert('Update product success');
      router.push(`/admin/products/stocks/${id}`);
    } catch (err) {
      console.error(err);
      alert('Update product failed');
    }
  };

  const router = useRouter();

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Discount for Product "{product?.name}"
      </Text>
      <Card my={10}>
        <CardBody>
          <Flex gap={4} pb={8}>
            <Button
              colorScheme="blue"
              onClick={() => {
                router.push(`/admin/products/discounts/${id}/create`);
              }}
            >
              Add product
            </Button>
          </Flex>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Product Name</Th>
                  <Th>Base Discount</Th>
                  <Th>Used Discount</Th>
                  <Th>Remaining Discount</Th>
                  <Th textAlign={'start'}>Action</Th>
                </Tr>
              </Thead>
              <Tbody alignContent={'center'}>
                {/* {product?.map((product: any, index: number) => ( */}
                {/* <Tr key={product.id}> */}
                {/* <Td>{index + 1}</Td> */}
                {/* <Td>{product.name}</Td> */}
                {/* <Td>{product.baseStock}</Td> */}
                {/* <Td>{product.usedStock}</Td> */}
                {/* <Td>{product.remainingStock}</Td> */}
                {/* <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="green"
                          onClick={() => {
                            router.push(`/admin/products/discounts`);
                          }}
                        >
                          Update Stock
                        </Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))} */}
              </Tbody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;
