'use client';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Divider,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

interface ResetPasswordProps {
  // Add a prop to store the reset token received from the URL
  token: string;
}

export default function ConfirmResetPassword(props: ResetPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isUsed, setIsUsed] = useState(false); // Flag to disable form if used

  // Fetch reset token usage status on component mount (assuming backend API)
  useEffect(() => {
    const checkTokenUsage = async () => {
      // Replace with your API call to check if token is used
      const response = await fetch(
        `/api/check-reset-token?token=${props.token}`,
      );
      const data = await response.json();
      setIsUsed(data.used); // Update flag based on API response
    };
    checkTokenUsage();
  }, [props.token]);

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
            Confirm Reset Password
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
            <FormControl id="newPassword" isRequired isDisabled={isUsed}>
              <FormLabel>New Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="confirmPassword" isRequired isDisabled={isUsed}>
              <FormLabel>Confirm New Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}
                disabled={isUsed}
              >
                Change Password
              </Button>
            </Stack>
          </Stack>
        </Box>
        {isUsed && (
          <Text align="center">This reset link has already been used.</Text>
        )}
      </Stack>
    </Flex>
  );
}
