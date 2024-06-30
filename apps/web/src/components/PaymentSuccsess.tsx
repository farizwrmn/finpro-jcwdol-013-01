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
            Dear Mr. Alex <br />
            <Text as={'span'} color={'green.400'}>
              Your Payment Is Success!
            </Text>
            <Flex alignContent="center" justifyContent="center">
              <Image
                rounded={'md'}
                alt={'feature image'}
                src={
                  'https://niceillustrations.com/wp-content/uploads/2021/03/Successful-Payment-color-800px.png'
                }
                width={250}
              />
            </Flex>
          </Heading>
          <Text color={'gray.500'}>
            Your payment has been processed. Your order will be delivered to
            your address within 24 hours.
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
                Back to Home
              </Button>
            </Link>
            <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
