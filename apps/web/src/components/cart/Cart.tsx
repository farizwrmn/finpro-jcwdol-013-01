'use client';

import {
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  Image,
  useDisclosure,
} from '@chakra-ui/react';

interface CartItemProps {
  item: {
    title: string;
    price: number;
    amount: number;
    image: string;
    id: number; // Assuming an ID for each item
  };
  addToCart: (clickedItem: any) => void;
  removeFromCart: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  addToCart,
  removeFromCart,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="article" display="flex" p={4} shadow="base" rounded="lg">
      <Flex flexGrow={1}>
        <Box mr={4}>
          <Heading as="h3" size="md">
            {item.title}
          </Heading>
          <Flex mt={2} alignItems="center" justifyContent="space-between">
            <Text>Price: ${item.price}</Text>
            <Text>Total: ${(item.amount * item.price).toFixed(2)}</Text>
          </Flex>
        </Box>
        <Image src={item.image} alt={item.title} borderRadius="lg" />
      </Flex>
      <Flex direction="column" justifyContent="space-between" ml={4}>
        <IconButton
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C6.47 22 2 17.53 2 12S6.47 2 12 2s10 4.47 10 10-4.47 10-10 10zm0-18a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                fill="currentColor"
              />
            </svg>
          }
          variant="ghost"
          size="sm"
          onClick={removeFromCart.bind(null, item.id)}
          aria-label={''}
        />
        <Text fontSize="lg" textAlign="center">
          {item.amount}
        </Text>
        <IconButton
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 13h-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v11H4c-1 1 0 2 1 2h14a1 1 0 0 0 1-2zM7 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
                fill="currentColor"
              />
            </svg>
          }
          variant="ghost"
          size="sm"
          onClick={() => addToCart(item)}
          aria-label={''}
        />
      </Flex>
    </Box>
  );
};

export default CartItem;
