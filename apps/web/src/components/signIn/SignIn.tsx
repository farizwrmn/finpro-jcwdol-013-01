'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Heading,
  Flex,
  Stack,
  useColorModeValue,
  Divider,
  Center,
  Button,
  Text,
} from '@chakra-ui/react';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch } from '@/lib/hooks';
import { signIn } from '@/lib/features/auth/authSlice';
import { signIn as signInNextAuth } from 'next-auth/react';

import { FormValues, FormProps } from './types';

import InnerForm from '../signIn/components/innerForm';
import PageWrapper from '../pageWrapper';
import { FcGoogle } from 'react-icons/fc';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

type Props = {
  callbackUrl?: string;
  authError?: string | null;
};

const LoginView = ({ callbackUrl, authError }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const LoginForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || '',
      password: props.initialPassword || '',
      password1: props.initialPassword || '',
    }),
    validationSchema: LoginSchema,
    enableReinitialize: true,
    handleSubmit({ email, password }: FormValues, { resetForm }) {
      dispatch(signIn({ email, password }));
      resetForm();
      router.push('/');
    },
  })(InnerForm);

  return (
    <PageWrapper>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        shadow={'2xl'}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'3xl'}>Sign In</Heading>
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
              <Divider />
              <Center flex={'1'} flexDirection={'column'}>
                <Button
                  w={'full'}
                  maxW={'md'}
                  variant={'outline'}
                  leftIcon={<FcGoogle />}
                  onClick={() => {
                    signInNextAuth('google', { callbackUrl });
                  }}
                >
                  <Center>
                    <Text>Sign in with Google</Text>
                  </Center>
                </Button>
              </Center>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </PageWrapper>
  );
};

export default LoginView;
