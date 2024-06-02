'use client';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';

interface ResetPasswordProps {}

export default function SignUp(props: ResetPasswordProps) {
  const [email, setEmail] = useState('');

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
            Reset Password
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
            {/* Existing form fields remain here */}
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Sending"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}
              >
                Send Reset Link
              </Button>
            </Stack>
            {/* Existing link remains here */}
            <Stack pt={6}>
              <Text align={'center'}>
                Back to Login?{' '}
                <Link color={'blue.400'} href="/login">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
