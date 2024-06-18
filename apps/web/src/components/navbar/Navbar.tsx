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
  Show,
  Avatar,
  VStack,
  HStack,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { FiChevronDown, FiShoppingCart } from 'react-icons/fi';
import { signOut } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import ShoppingCart from '../cart/ShoppingCart';

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { status, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <>
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
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Link href="/">
              <Image
                src="/assets/images/tokpedy.png"
                alt="logo"
                w={170}
                mt={2}
              />
            </Link>
            <Flex display={{ base: 'none', md: 'flex' }} m={'auto'}>
              <DesktopNav />
            </Flex>
          </Flex>
          {status.isLogin ? (
            <HStack spacing={{ base: '0', md: '6' }}>
              <Flex alignItems={'center'}>
                <Link href={'/shopping-cart'}>
                  <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiShoppingCart />}
                    ml={2}
                  />
                </Link>
              </Flex>
              <Flex alignItems={'center'}>
                <Menu>
                  <MenuButton
                    py={2}
                    transition="all 0.3s"
                    _focus={{ boxShadow: 'none' }}
                  >
                    <HStack>
                      <Avatar
                        size={{ base: 'sm', sm: 'md' }}
                        src={user.image}
                        ml={2}
                      />
                      <VStack
                        display={{ base: 'none', md: 'flex' }}
                        alignItems="flex-start"
                        spacing="1px"
                        ml="2"
                      >
                        <Text fontSize="sm">{user.email}</Text>
                        <Text fontSize="xs" color="gray.600">
                          {user.role}
                        </Text>
                      </VStack>
                      <Box display={{ base: 'none', md: 'flex' }}>
                        <FiChevronDown />
                      </Box>
                    </HStack>
                  </MenuButton>
                  <MenuList
                  // bg={useColorModeValue('white', 'gray.900')}
                  // borderColor={useColorModeValue('gray.200', 'gray.700')}
                  >
                    <MenuItem
                      onClick={() => {
                        router.push('/users/profile');
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        router.push('/users/change-password');
                      }}
                    >
                      Change Password
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        dispatch(signOut());
                        router.push('/');
                      }}
                    >
                      Sign out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </HStack>
          ) : (
            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              spacing={2}
            >
              <Link href="/sign-in">
                <Button
                  p={{ base: '2', sm: '5' }}
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
              <Show above="sm">
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
              </Show>
            </Stack>
          )}
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    </>
  );
}
