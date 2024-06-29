'use client';

import Head from 'next/head';
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Image,
  Flex,
  Center,
  Link,
} from '@chakra-ui/react';

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Dear Mr. Alex {/* change with email / user id  */}
            <br />
            <Text as={'span'} color={'red.400'}>
              Your Payment Is Failed!
            </Text>
            <Flex alignContent="center" justifyContent="center">
              <Image
                rounded={'md'}
                alt={'feature image'}
                src={
                  'https://cdni.iconscout.com/illustration/premium/thumb/businessman-online-payment-got-failed-10103579-8181451.png?f=webp'
                }
                width={250}
              />
            </Flex>
          </Heading>
          <Text color={'red.500'}>
            Your order failed to process. Please complete the payment process
            first so that we can deliver your ordered items to your location.
            Thank you!
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Link href="/">
              <Button
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}
              >
                Back to Payment
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
