import { Text, Image, Flex } from '@chakra-ui/react';
import React from 'react';

const Page = () => {
  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Text fontSize="5xl" fontFamily="monospace" fontWeight="bold">
        Welcome to Admin Dashboard
      </Text>
      <Image src="/assets/images/admindashboard.jpg" alt="welcome" w={500} />
    </Flex>
  );
};

export default Page;
