'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Text, Stack, Input, Button } from '@chakra-ui/react';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { FormValues, FormProps } from '@/types';
import { IUsers } from '@/interface/user.interface';

import InnerForm from '@/components/innerForm';
import instance from '@/utils/axiosInstance';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const RegisterView = () => {
  const router = useRouter();

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
    <Container>
      <Box
        display="flex"
        sx={{
          justifyContent: 'center',
          marginTop: '2rem',
          padding: '2rem',
        }}
      >
        <Stack spacing={8}>
          <Text variant="h4" sx={{ textAlign: 'center' }}>
            Register Form
          </Text>

          <LoginForm />
        </Stack>
      </Box>
    </Container>
  );
};

export default RegisterView;
