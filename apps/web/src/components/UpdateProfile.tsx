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
  Image,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

interface UpdateProfileProps {}

export default function UpdateProfile(props: UpdateProfileProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isValidImage(file)) {
      alert('Invalid file type. Please choose a JPG, JPEG, PNG, or GIF image.');
      return;
    }

    if (file.size > 1024 * 1024) {
      // 1MB in bytes
      alert('Image size exceeds 1MB. Please choose a smaller image.');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setPreviewImage(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  const isValidImage = (file: File) => {
    const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return acceptedTypes.includes(file.type);
  };

  // Existing form fields (email, current password, etc.) remain here

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
              <FormLabel>Phone</FormLabel>
              <Input type="number" />
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
            {/* Existing form fields (current password, etc.)  */}
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{ bg: 'blue.500' }}
              >
                Update Profile
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
