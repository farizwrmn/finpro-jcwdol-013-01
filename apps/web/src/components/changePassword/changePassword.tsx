'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
  Box,
  Stack,
  Flex,
  useColorModeValue,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { FormValues, FormProps } from './types';
import { IUsers } from '@/interface/user.interface';
import InnerForm from './innerForm';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import PageWrapper from '../pageWrapper';
import { toast } from "react-toastify";
import { updatePassword } from "@/services/user.service";

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current Password is required'),
  newPassword: Yup.string().required('New Password is required'),
  confirmPassword: Yup.string().required('Confirm Password is required'),
});

const ChangePassword = () => {
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const ChangePasswordForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      currentPassword: props.initialCurrentPassword || '',
      newPassword: props.initialNewPassword || '',
      confirmPassword: props.initialConfirmPassword || '',
    }),
    validationSchema: PasswordSchema,
    enableReinitialize: true,
    async handleSubmit({ currentPassword, newPassword }: FormValues, { resetForm }) {
      try {
        const data = await updatePassword(user.id as string, { currentPassword, newPassword });
        resetForm();
        toast.success(data.message);
        router.push('/users/profile');
      } catch (err: any) {
        toast.error(err.message);
      }
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
            <Heading fontSize={'3xl'}>Change Password</Heading>
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
              <ChangePasswordForm />
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </PageWrapper>
  );
};

export default ChangePassword;
