'use client';

import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Link,
  Center,
  Stack,
} from '@chakra-ui/react';
import ShippingMethod from './ShippingMethod';
import PaymentMethod from './PaymentMethod';

interface CheckoutForm {
  fullName: string;
  email: string;
  streetAddress: string;
  apartmentSuite: string; // Optional
  zipCode: string;
  city: string;
  state: string;
  country: string;
  phoneNumber: string;
  paymentType: string;
  cardNumber: string;
  expiryDate: string;
  cardName: string;
}

const initialCheckoutForm: CheckoutForm = {
  fullName: '',
  email: '',
  streetAddress: '',
  apartmentSuite: '',
  zipCode: '',
  city: '',
  state: '',
  country: '',
  phoneNumber: '',
  paymentType: '',
  cardNumber: '',
  expiryDate: '',
  cardName: '',
};

export default function CheckoutFormPage() {
  const [checkoutForm, setCheckoutForm] = useState(initialCheckoutForm);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setCheckoutForm({
      ...checkoutForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Checkout form submitted:', checkoutForm);
    // Implement form submission logic here (e.g., send data to server)
  };

  return (
    <Box p={6}>
      <Heading as="h1" fontSize="3xl" mb={8}>
        Checkout
      </Heading>

      <form onSubmit={handleSubmit}>
        <Heading as="h2" fontSize="lg" mb={4}>
          Shipping Address
        </Heading>

        <Flex mb={8} flexWrap="wrap" justifyContent="space-between">
          <FormControl isRequired w="full" mb={4}>
            <FormLabel htmlFor="streetAddress">Street Address</FormLabel>
            <Input
              name="streetAddress"
              value={checkoutForm.streetAddress}
              onChange={handleChange}
              width={500}
            />
          </FormControl>

          <Flex w="full" mb={4}>
            <FormControl mr={4} w="1/2">
              <FormLabel htmlFor="apartmentSuite">
                Apartment/Suite (Optional)
              </FormLabel>
              <Input
                name="apartmentSuite"
                value={checkoutForm.apartmentSuite}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired w="1/2">
              <FormLabel htmlFor="zipCode">Zip Code</FormLabel>
              <Input
                name="zipCode"
                value={checkoutForm.zipCode}
                onChange={handleChange}
                width={230}
              />
            </FormControl>
          </Flex>

          <FormControl isRequired w="full" mb={4}>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input
              name="city"
              value={checkoutForm.city}
              onChange={handleChange}
              width={500}
            />
          </FormControl>

          <Flex w="full" mb={4}>
            <FormControl mr={4} w="1/2">
              <FormLabel htmlFor="state">State</FormLabel>
              <Input
                name="state"
                value={checkoutForm.state}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired w="1/2">
              <FormLabel htmlFor="country">Country</FormLabel>
              <Select
                name="country"
                value={checkoutForm.country}
                onChange={handleChange}
                width={230}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="...">Other</option>
              </Select>
            </FormControl>
          </Flex>

          <FormControl isRequired w="full" mb={4}>
            <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
            <Input
              type="tel"
              name="phoneNumber"
              value={checkoutForm.phoneNumber}
              onChange={handleChange}
              width={500}
            />
          </FormControl>
          <ShippingMethod />
        </Flex>
        <Stack mt={-10}>
          <PaymentMethod />
        </Stack>
        <Button type="submit" colorScheme="teal" size="lg">
          <Link href="/shipping-method">Place Order</Link>
        </Button>
      </form>
    </Box>
  );
}
