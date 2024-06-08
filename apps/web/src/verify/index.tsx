'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Box, Container, Text, Stack, Button } from '@chakra-ui/react';

import instance from '@/utils/axiosInstance';
import Link from 'next/link';

const VerifyView = () => {
  const params = useSearchParams();
  const router = useRouter();

  const verify = async () => {
    try {
      const param = params.toString().replace('token=', '');
      await instance.get('/auth/verify', {
        headers: {
          Authorization: `Bearer ${param}`,
        },
      });
      router.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container pb={{ base: '40', sm: '60' }} h={'full'}>
      <Box
        display="flex"
        shadow={'lg'}
        sx={{
          marginTop: '5rem',
          padding: '5rem',
          justifyContent: 'center',
        }}
      >
        <Stack spacing={8} alignItems="center">
          <Text variant="h5" sx={{ textAlign: 'center' }}>
            Welcome to Tokopedya app, click the button below to verify your
            account
          </Text>
          <Link href={'/sign-in'}>
            <Button
              colorScheme="cyan"
              sx={{
                width: '5rem',
              }}
              onClick={() => verify()}
            >
              Verify
            </Button>
          </Link>
        </Stack>
      </Box>
    </Container>
  );
};

export default VerifyView;
