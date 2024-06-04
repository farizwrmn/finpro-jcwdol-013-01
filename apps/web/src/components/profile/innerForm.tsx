import {
  FormControl,
  FormLabel,
  Box,
  Button,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FormikProps, Form, Field } from 'formik';
import { FormValues } from '@/types';

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;

  return (
    <Box
      sx={{
        minWidth: '300px',
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="email">Email :</FormLabel>
            <Field
              name="email"
              type="email"
              onChange={handleChange}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text
                sx={{
                  color: 'red',
                }}
              >
                {errors.email}
              </Text>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password :</FormLabel>
            <Field
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text
                sx={{
                  color: 'red',
                }}
              >
                {errors.password}
              </Text>
            )}
          </FormControl>
          <Button
            sx={{
              marginTop: '15px',
            }}
            type="submit"
            disabled={isSubmitting}
          >
            Register
          </Button>
        </Stack>
      </Form>
    </Box>
  );
}
