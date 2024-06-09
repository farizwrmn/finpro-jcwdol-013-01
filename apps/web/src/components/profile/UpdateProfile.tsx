'use client';

import {
  Flex,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { FormValues, FormProps } from './types';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import InnerForm from './innerForm';
import { updateProfile } from '@/lib/features/auth/authSlice';

const UpdateProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address format')
    .required('Email is required'),
});

export default function UserProfileEdit(): JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  const UpdateProfileForm = withFormik<FormProps, FormValues>({
    mapPropsToValues: (props) => ({
      id: props.initialId || user.id || '',
      name: props.initialName || user.name || '',
      email: props.initialEmail || user.email || '',
      image: props.initialImage || user.image || '',
      phone: props.initialPhone || user.phone || '',
      gender: props.initialGender || user.gender || '',
      birthDate: props.initialBirthDate || user.birthDate || '',
    }),
    validationSchema: UpdateProfileSchema,
    enableReinitialize: true,
    handleSubmit({ name, email, phone, gender, birthDate }: FormValues, { resetForm }) {
      dispatch(updateProfile(user.id as string, { name, email, phone, gender, birthDate }));
      resetForm();
      alert("Update user profile success");
      router.push('/users/profile');
    },
  })(InnerForm);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <UpdateProfileForm />
      </Stack>
    </Flex>
  );
}
