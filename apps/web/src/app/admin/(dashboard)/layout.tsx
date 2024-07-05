'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  AvatarBadge,
} from '@chakra-ui/react';
import { FiHome, FiMenu, FiBell, FiChevronDown, FiUser } from 'react-icons/fi';
import {
  FaApplePay,
  FaBirthdayCake,
  FaCashRegister,
  FaCcDiscover,
  FaChartArea,
  FaChartLine,
  FaIceCream,
  FaProductHunt,
  FaShopify,
  FaStore,
  FaTicketAlt,
  FaWolfPackBattalion,
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import AuthAdmin from '@/components/auth/AuthAdmin';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { signOut } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
  key: string;
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useAppSelector((state) => state.auth.user);
  const [linkItems, setLinkItems] = useState<Array<LinkItemProps>>([]);

  useEffect(() => {
    if (!user.role) return;
    const items = [{ name: 'Home', icon: FiHome, href: '/admin', key: 'Home' }];

    if (user.role === 'super_admin') {
      items.push(
        ...[
          { name: 'User', icon: FiUser, href: '/admin/users', key: 'User' },
          { name: 'Store', icon: FaStore, href: '/admin/stores', key: 'Store' },
        ],
      );
    }

    items.push(
      ...[
        {
          name: 'Category',
          icon: FaCcDiscover,
          href: '/admin/categories',
          key: 'Category',
        },
        {
          name: 'Product',
          icon: FaShopify,
          href: '/admin/products',
          key: 'Product',
        },
      ],
    );

    if (user.role === 'store_admin') {
      items.push({
        name: 'Discount',
        icon: FaTicketAlt,
        href: '/admin/discounts',
        key: 'Discount',
      });
    }

    items.push(
      ...[
        {
          name: 'Transaction',
          icon: FaCashRegister,
          href: '/admin/transactions',
          key: 'Transaction',
        },
        {
          name: 'Sales Report',
          icon: FaChartArea,
          href: '/admin/report/sales',
          key: 'Sales Report',
        },
        {
          name: 'Stock Report',
          icon: FaChartLine,
          href: '/admin/report/stock',
          key: 'Stock Report',
        },
      ],
    );

    setLinkItems(items);
  }, [user.role]);

  return (
    <AuthAdmin>
      <Box>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
          zIndex={100}
          linkItems={linkItems}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} linkItems={linkItems} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p={5}>
          {children}
        </Box>
      </Box>
    </AuthAdmin>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  linkItems: Array<LinkItemProps>;
}

const SidebarContent = ({ onClose, linkItems, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mb={10}
        mt={5}
        mx="8"
        justifyContent="space-between"
      >
        <Link href="/">
          <Image src="/assets/images/logo.png" alt="logo" w={150} />
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {linkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactText;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'blue.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { status, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <HStack spacing={{ base: '0', md: '6' }}>
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
                  src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/public/avatar/${user.image}`}
                  ml={2}
                >
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
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
                  router.push(
                    user.role === 'super_admin' || user.role === 'store_admin'
                      ? '/admin'
                      : '/users',
                  );
                }}
              >
                Dashboard
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
    </Flex>
  );
};
