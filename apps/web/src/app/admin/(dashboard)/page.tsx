import { Text, Image } from '@chakra-ui/react';
import React from 'react';

const Page = () => {
  return (
    <div>
      <Text fontSize="3xl" fontFamily="monospace" fontWeight="bold">
        Admin Dashboard
      </Text>
      <Image
        rounded={'md'}
        alt={'feature image'}
        src={
          'https://media.istockphoto.com/id/509981891/vector/monkey-with-a-banana.jpg?s=612x612&w=0&k=20&c=WE-R9YhMggcE0FfppCVmfrqje_APsJR5J_TIbEYSd3M='
        }
        width={250}
        mt={10}
      />
    </div>
  );
};

export default Page;
