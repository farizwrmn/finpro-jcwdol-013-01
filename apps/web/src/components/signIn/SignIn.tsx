'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Text, Stack } from '@chakra-ui/react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch } from '@/lib/hooks';
import { signIn } from '@/lib/features/auth/authSlice';

import { FormValues, FormProps } from './types';

import InnerForm from './components/innerForm';
import PageWrapper from '../pageWrapper';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const LoginForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      email: props.initialEmail || '',
      password: props.initialPassword || '',
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
      <Container>
        <Box
          display="flex"
          sx={{
            justifyContent: 'center',
            // textAlign: "center",
            marginTop: '2rem',
            padding: '2rem',
          }}
        >
          <Stack spacing={8}>
            <Text variant="h4" sx={{ textAlign: 'center' }}>
              Login Form
            </Text>
            <LoginForm />
          </Stack>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default LoginView;
