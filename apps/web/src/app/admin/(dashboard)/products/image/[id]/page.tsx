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
} from '@chakra-ui/react';
import { useRouter } from "next/navigation";

type Props = { params: { id: string } };

const Page = ({ params: { id } }: Props) => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // try {
    //   const product = await updateProduct(id, formData);
    //   if (!product) throw new Error("Update product failed!");
    //   alert("Update product success");
    //   router.push("/admin/products")
    // } catch (err) {
    //   console.error(err);
    //   alert("Update product failed");
    // }
  }

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Product Image Management
      </Text>
      <Card my={10}>
        <CardBody>
          <TableContainer>
            <form onSubmit={handleSubmit}>
              <Stack
                spacing={6}
                w={'full'}
                rounded={'xl'}
                p={10}
                my={6}
              >
                <FormControl id="name" isRequired>
                  <FormLabel>Image</FormLabel>
                  <Input
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
                    Update
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