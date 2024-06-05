'use client';

import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  Image,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import Link from 'next/link';

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        shadow={'lg'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link href="/">
            <Image src="/assets/images/tokpedy.png" alt="logo" w={170} mt={2} />
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} m={'auto'}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={2}
        >
          <Link href="/sign-in">
            <Button
              p={5}
              bg={'blue.400'}
              color={'white'}
              fontSize={'sm'}
              fontWeight={600}
              borderRadius={'lg'}
              _hover={{ bg: 'blue.500' }}
              cursor={'pointer'}
            >
              Sign In
            </Button>
          </Link>
          <Link href={'/sign-up'}>
            <Button
              mr={0}
              px={5}
              bg={'green.400'}
              color={'white'}
              fontSize={'sm'}
              fontWeight={600}
              borderRadius={'lg'}
              _hover={{ bg: 'green.500' }}
              cursor={'pointer'}
            >
              Sign Up
            </Button>
          </Link>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
