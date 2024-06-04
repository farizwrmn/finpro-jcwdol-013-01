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
  Divider,
  Image,
  Select,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface UpdateProfileProps {}

export default function UpdateProfile(props: UpdateProfileProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  }

  // ... existing file handling logic ...

  // ... existing form fields (email, current password, etc.) ...

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
            Update Profile
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
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Phone Number</FormLabel>
              <Input type="number" />
            </FormControl>
            <FormControl id="domicile">
              <FormLabel>Domicile</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="city">
              <FormLabel>City</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="userId">
              <FormLabel>User ID</FormLabel>
              <Input type="text" disabled /> {/* Disable user ID editing */}
            </FormControl>
            <FormControl id="gender">
              <FormLabel>Gender</FormLabel>
              <Select placeholder="Select Gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </FormControl>

            <FormControl id="birthdate">
              <FormLabel>Birthdate</FormLabel>
              <Input type="date" />
            </FormControl>
            <FormControl id="profilePicture">
              <FormLabel>Profile Picture</FormLabel>
              <Input type="file" onChange={handleFileChange} />
              {previewImage && (
                <Image
                  boxSize="150px"
                  src={previewImage}
                  alt="Profile Preview"
                />
              )}
            </FormControl>
            {/* Existing form fields ... */}
            <Stack spacing={10} pt={2}>
              <Link color={'blue.400'} href="/user-profile">
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{ bg: 'blue.500' }}
                >
                  Update Profile
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
