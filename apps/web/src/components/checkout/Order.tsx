import React from 'react';
import {
  Box,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Input,
} from '@chakra-ui/react';

interface OrderItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const orderItems: OrderItem[] = [
  // Replace with your actual order items
  { name: 'Item 1', image: 'image1.png', price: 10, quantity: 1 },
  { name: 'Item 2', image: 'image2.png', price: 20, quantity: 2 },
];

const OrderPage: React.FC = () => {
  return (
    <div>
      {/* Header Section */}
      <Box>
        <HStack>
          <Text>Your Store Logo</Text>
          {/* Add user information here (optional) */}
        </HStack>
      </Box>

      {/* Order Details Section */}
      <Box mt={4} mb={4}>
        <Text fontSize="xl">Order Details</Text>
        <Text>Order ID: e70cebbf-a4d5-429b-a4da-7d62f867687c</Text>
        <Text>Order Date: 2024-06-21</Text>
        <Text color="green">Order Status: Processing</Text>{' '}
        {/* Adjust color based on status */}
      </Box>

      {/* Billing Information Section */}
      <Box mt={4} mb={4}>
        <Text fontSize="xl">Billing Information</Text>
        <Text>Name: Alex Joshua</Text>
        <Text>Email: alexjoshua@gmail.com</Text>
        <Text>Billing Address: 123 Main Street, Anytown, CA 12345</Text>
      </Box>

      {/* Shipping Information Section */}
      <Box mt={4} mb={4}>
        <Text fontSize="xl">Shipping Information</Text>
        <Text>Name: Alex Joshua</Text>
        <Text>Shipping Address: 123 Main Street, Anytown, CA 12345</Text>
        <Text>Phone: (555) 555-5555 (optional)</Text> /
      </Box>
      {/* Add phone number if applicable */}

      {/* Order Items Section */}
      <Box mt={4} mb={4}>
        <Text fontSize="xl">Order Items</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orderItems.map((item) => (
              <Tr key={''}>
                <Td>
                  <Image
                    boxSize="50px"
                    objectFit="cover"
                    src={item.image}
                    alt={item.name}
                  />
                </Td>
                <Td>{item.name}</Td>
                <Td>
                  <Input isDisabled value={item.quantity.toString()} />
                </Td>
                <Td>Rp{item.price.toLocaleString('id-ID')}</Td>
                <Td>
                  Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Purchase Information Section */}
      <Box mt={4} mb={4}>
        <Text fontSize="xl">Purchase Information</Text>
        <Text>Payment Method: Credit Card</Text>
        <Text>
          Total Price: Rp
          {orderItems
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toLocaleString('id-ID')}
        </Text>
      </Box>
    </div>
  );
};

export default OrderPage;
