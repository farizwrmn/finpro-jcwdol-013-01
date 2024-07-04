import { Text, Image } from '@chakra-ui/react';
import React from 'react';

const Page = () => {
  return (
    <div>
      <Text fontSize="3xl" fontFamily="monospace" fontWeight="bold">
        Admin Dashboard
      </Text>
      <Text fontSize="5xl" fontFamily="monospace" fontWeight="bold"></Text>
      <Image src="/assets/images/welcome.jpg" alt="welcome" w={300} />
    </div>
  );
};

export default Page;
