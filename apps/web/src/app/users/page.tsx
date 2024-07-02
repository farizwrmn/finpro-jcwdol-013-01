import { Button, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div>
      <Text fontSize="3xl" fontFamily="monospace" fontWeight="bold">
        User Dashboard
      </Text>
      <Stack flex={'1'} flexDirection={'row'} mt={5} align={'center'}>
        <Link href="/">
          <Button
            variant={'none'}
            color={'teal'}
            size={'md'}
            _hover={{ textDecoration: 'underline' }}
            mr={-4}
          >
            Homepage
          </Button>
        </Link>
        <Text>/</Text>
        <Text as={'b'} decoration={'underline'}>
          {' '}
          Dashboard
        </Text>
      </Stack>
    </div>
  );
};

export default Page;
