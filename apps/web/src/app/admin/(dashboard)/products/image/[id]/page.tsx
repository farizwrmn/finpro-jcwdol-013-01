"use client";

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
  Textarea,
  Grid,
} from '@chakra-ui/react';
import { useRouter } from "next/navigation";
import { createProductImage, getProductByID } from "@/services/product.service";
import Image from "next/image";

type Props = { params: { id: string } };

const Page = ({ params: { id } }: Props) => {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await getProductByID(id);
      setProduct(data);
    })()
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const inputFile = document.getElementById("image") as HTMLInputElement;
      formData.append("image", inputFile?.files?.item(0) as File);
      formData.append("productId", id);

      const productImage = await createProductImage(formData);
      if (!productImage) throw new Error("Upload product image failed!");
      alert("Upload product image success");
      // router.push(`/admin/products/image/${id}`)

      const data = await getProductByID(id);
      setProduct(data);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Upload product image failed");
    }
  }

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Images for Product {`"${product?.name}"`}
      </Text>
      <Card my={10} p={10}>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={6}
              w={'full'}
              rounded={'xl'}
              my={6}
              mb={16}
            >
              <FormControl id="name" isRequired>
                <FormLabel>Image</FormLabel>
                <Input
                  id="image"
                  name="image"
                  _placeholder={{ color: 'gray.500' }}
                  type="file"
                />
              </FormControl>
              <Stack spacing={6} direction={['column', 'row']}>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Upload
                </Button>
              </Stack>
            </Stack>
          </form>
          <TableContainer>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
              {product?.productImages.map((item: any) => (
                <img
                  src={`http://localhost:8000/public/products/${item.image}`}
                  alt=""
                  key={item.id}
                />
              ))}
              {/* <GridItem w='100%' h='10' bg='blue.500' /> */}
            </Grid>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;