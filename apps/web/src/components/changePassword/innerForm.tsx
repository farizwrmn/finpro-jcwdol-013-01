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

export default function InnerForm(props: FormikProps<FormValues>) {
  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } =
    props;

  const validateConfirmPassword = (pass: string, value: string) => {
    let error = '';
    if (pass && value) {
      if (pass !== value) {
        error = 'Password not matched';
      }
    }
    return error;
  };

  return (
    <Box>
      <Form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="currentPassword" isRequired>
            <FormLabel htmlFor="currentPassword">Current Password </FormLabel>
            <Field
              name="currentPassword"
              type="password"
              onChange={handleChange}
              value={values.currentPassword}
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
              }}
            />
            {touched.currentPassword && errors.currentPassword && (
              <Text
                m={'2'}
                textAlign={'center'}
                sx={{
                  color: 'red',
                }}
              >
                {errors.currentPassword}
              </Text>
            )}
          </FormControl>
          <FormControl id="newPassword" isRequired>
            <FormLabel htmlFor="newPassword">New Password </FormLabel>
            <Field
              name="newPassword"
              type="password"
              onChange={handleChange}
              value={values.newPassword}
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
              }}
            />
            {touched.newPassword && errors.newPassword && (
              <Text
                m={'2'}
                textAlign={'center'}
                sx={{
                  color: 'red',
                }}
              >
                {errors.newPassword}
              </Text>
            )}
          </FormControl>
          <FormControl id="confirmPassword" isRequired>
            <FormLabel htmlFor="password">Confirm Password </FormLabel>
            <Field
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              value={values.confirmPassword}
              style={{
                padding: '5px',
                border: '0.5px solid grey',
                borderRadius: '5px',
              }}
              validate={() =>
                validateConfirmPassword(values.newPassword, values.confirmPassword)
              }
            />
            {errors.confirmPassword && (
              <Text p={5} textAlign={'center'} color={'red'}>
                {errors.confirmPassword}
              </Text>
            )}
          </FormControl>
          {errors.confirmPassword ? (
            <Button
              sx={{
                marginTop: '15px',
              }}
              type="submit"
              disabled
              bg={'gray.400'}
              color={'white'}
              cursor={'not-allowed'}
            >
              Submit
            </Button>
          ) : (
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
              Submit
            </Button>
          )}
        </Stack>
      </Form>
    </Box>
  );
}
