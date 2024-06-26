import {
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Link,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavItem } from './Navbar';
import DesktopSubNav from './DesktopSubNav';

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Products',
    children: [
      {
        label: 'Explore Product',
        subLabel: 'Grocery for you',
        href: '#',
      },
      {
        label: 'New Arrival',
        subLabel: 'Up-and-coming Product',
        href: '#',
      },
    ],
  },
  {
    label: 'About us',
    children: [
      {
        label: 'Contact',
        subLabel: 'Customer Service',
        href: '#',
      },
      {
        label: 'History',
        subLabel: '',
        href: '#',
      },
    ],
  },
];

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4} mr={24}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'md'}
                fontWeight={600}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

export default DesktopNav;
