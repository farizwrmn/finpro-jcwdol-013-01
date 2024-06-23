import {
  FormControl,
  FormLabel,
  Box,
  Button,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from './types';
import Link from 'next/link';

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;

  return (
    <Box>
      <Form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel htmlFor="email">Email </FormLabel>
            <Field
              name="email"
              type="email"
              onChange={handleChange}
              value={values.email}
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
              }}
            />
            {touched.email && errors.email && (
              <Text
                m={'2'}
                textAlign={'center'}
                sx={{
                  color: 'red',
                }}
              >
                {errors.email}
              </Text>
            )}
          </FormControl>
          <Button
            sx={{
              marginTop: '15px',
            }}
            type="submit"
            disabled={isSubmitting}
            bg={'green.400'}
            color={'white'}
            _hover={{
              bg: 'green.500',
            }}
          >
            Send Reset Link
          </Button>
          <Link href="/sign-in">
            <Text
              color={'blue.400'}
              textAlign={'center'}
              _hover={{ color: 'blue.500' }}
            >
              Back to Login
            </Text>
          </Link>
        </Stack>
      </Form>
    </Box>
  );
}