'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Text,
  Stack,
  Flex,
  useColorModeValue,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { FormValues, FormProps } from '@/types';
import { IUsers } from '@/interface/user.interface';
import InnerForm from './components/innerForm';
import instance from '@/utils/axiosInstance';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const RegisterView = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const register = async ({ email, password }: IUsers) => {
    try {
      const form = new FormData();
      form.append('email', email);
      form.append('password', password);
      const { data } = await instance.post('/auth/register', form);
      alert(data?.message);
    } catch (err) {
      console.log('error', err);
    }
  };

  const LoginForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || '',
      password: props.initialPassword || '',
    }),
    validationSchema: RegisterSchema,
    enableReinitialize: true,
    handleSubmit({ email, password }: FormValues, { resetForm }) {
      console.log('masuk1', email, password);
      register({ email, password });
      resetForm();
      router.push('/sign-in');
    },
  })(InnerForm);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      shadow={'2xl'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'3xl'}>Sign Up</Heading>
        </Stack>
        <Divider />
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={{ base: '6', sm: '12' }}
          display="flex"
          sx={{
            justifyContent: 'center',
          }}
        >
          <Stack spacing={8}>
            <LoginForm />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterView;
