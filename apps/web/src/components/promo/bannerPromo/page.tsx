import { Box, Image } from '@chakra-ui/react';
import React from 'react';

const BannerPromo = () => {
  return (
    <div>
      <Box
        flex={'1'}
        display={'flex'}
        justifyContent={'center'}
        alignContent={'center'}
        p={{ base: 5, sm: 10 }}
        h={{ base: 'full', sm: 420 }}
      >
        <Image
          src="/assets/images/Gratis.gif"
          alt="BannerPromo"
          borderRadius={'3xl'}
          w={'fit'}
        />
      </Box>
    </div>
  );
};

export default BannerPromo;
