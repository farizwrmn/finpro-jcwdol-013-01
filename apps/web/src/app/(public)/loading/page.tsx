import Loading from '@/components/loading/Loading';
import { Stack } from '@chakra-ui/react';
import React from 'react';

const page = () => {
  return (
    <Stack justifyContent="center" alignItems="center" mt={100} mb={250}>
      <Loading />;
    </Stack>
  );
};

export default page;
