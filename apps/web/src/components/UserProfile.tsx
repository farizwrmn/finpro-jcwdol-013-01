'use client';
import {
  Flex,
  Box,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  Image,
  Stack,
  Circle,
  Grid,
  AspectRatio,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react'; // Import useEffect for data fetching

// Assuming you have a service or mechanism to retrieve updated user data
function getUserData() {
  // Replace this with your logic to fetch user data from an API or local storage
  return {
    name: 'John Doe',
    gender: 'Male',
    birthdate: '1990-01-01',
    phoneNumber: '+1234567890',
    domicile: 'California', // Add domicile data
    city: 'Los Angeles', // Add city data
    userId: '123456', // Add user ID data
    profilePicture: 'https://example.com/profile.jpg', // Replace with actual image URL
  };
}

interface UserProfileProps {}

export default function UserProfile(props: UserProfileProps) {
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchedData = getUserData();
    setUserData(fetchedData);
  }, []);

  const {
    name,
    gender,
    birthdate,
    phoneNumber,
    domicile,
    city,
    userId,
    profilePicture,
  } = userData;

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      {/* ... */}
      <Stack spacing={8} px={6} py={12}>
        {/* ... */}
        <Stack align={'center'}>
          <Circle size="100px" bg={useColorModeValue('blue.500', 'teal.400')}>
            {profilePicture && (
              <Image src={profilePicture} alt="Profile Picture" />
            )}
          </Circle>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            {name}
          </Heading>
          {birthdate && ( // Check if birthdate exists before using slice
            <Text color={useColorModeValue('gray.600', 'gray.200')}>
              {gender} | {birthdate.slice(0, 10)}
            </Text>
          )}
          {/* Add sections for phone number, domicile, city, and user ID */}
          <Text color={useColorModeValue('gray.600', 'gray.200')}>
            Phone Number: {phoneNumber}
          </Text>
          <Text color={useColorModeValue('gray.600', 'gray.200')}>
            Domicile: {domicile}
          </Text>
          <Text color={useColorModeValue('gray.600', 'gray.200')}>
            City: {city}
          </Text>
          <Text color={useColorModeValue('gray.600', 'gray.200')}>
            User ID: {userId}
          </Text>
        </Stack>
        {/* ... */}
      </Stack>
      {/* ... */}
    </Flex>
  );
}
