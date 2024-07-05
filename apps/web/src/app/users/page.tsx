import { Button, Flex, Stack, Text, Image } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Text fontSize="5xl" fontFamily="monospace" fontWeight="bold">
          Welcome to User Dashboard
        </Text>
        <Image src="/assets/images/userdashboard.svg" alt="welcome" w={500} />
      </Flex>
    </div>
  );
};

export default Page;
