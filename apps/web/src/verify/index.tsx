'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Text,
  Stack,
  Button,
  Flex,
  useColorModeValue,
  Heading,
  Divider,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import instance from '@/utils/axiosInstance';
import Link from 'next/link';
import { Field } from 'formik';

const VerifyView = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const verify = async () => {
    try {
      const param = params.toString().replace('token=', '');
      await instance.post('/auth/verify', {
        headers: {
          Authorization: `Bearer ${param}`,
        },
      });
      alert('Account verified');
      router.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Set Password
          </Heading>
          <Divider />
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="setPassword" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input type={showPassword1 ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword1((showPassword1) => !showPassword1)
                    }
                  >
                    {showPassword1 ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default VerifyView;
