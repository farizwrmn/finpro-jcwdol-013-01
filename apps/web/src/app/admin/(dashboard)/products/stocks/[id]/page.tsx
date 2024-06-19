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
  const [product, setProduct] = useState<any>(null);

  const [formData, setFormData] = useState({
    initialStock: '',
    initialStoreId: '',
  });

  useEffect(() => {
    (async () => {
      const resultProduct = await getProductByID(id);
      setProduct(resultProduct);

      const result = await getStocksByProductID(id);
      setStocks(result);
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
        Stock for Product "{product?.name}"
      </Text>
      <Card my={10}>
        <CardBody>
          <Flex gap={4} pb={8}>
            <Button
              colorScheme="blue"
              onClick={() => {
                router.push(`/admin/products/stocks/${id}/create`);
              }}
            >
              Add Store
            </Button>
          </Flex>
          <TableContainer>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Store Name</Th>
                  <Th>Base Stock</Th>
                  <Th>Used Stock</Th>
                  <Th>Remaining Stock</Th>
                  <Th textAlign={'start'}>Action</Th>
                </Tr>
              </Thead>
              <Tbody alignContent={'center'}>
                {stocks?.map((stock: any, index: number) => (
                  <Tr key={stock.id}>
                    <Td>{index + 1}</Td>
                    <Td>{stock.store.name}</Td>
                    <Td>{stock.baseStock}</Td>
                    <Td>{stock.usedStock}</Td>
                    <Td>{stock.remainingStock}</Td>
                    <Td>
                      <ButtonGroup>
                        <Button
                          colorScheme="green"
                          onClick={() => {
                            router.push(`/admin/products/stocks/${id}/edit`);
                          }}
                        >
                          Update Stock
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
