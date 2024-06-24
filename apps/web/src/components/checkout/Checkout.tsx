'use client';

import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { CartOrderSummary } from '../cart/CartOrderSummary';
import { deleteCartItem, getCartByUserID } from "@/services/cart.service";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { refreshCart } from "@/lib/features/cart/cartSlice";
import { toast } from "react-toastify";
import PaymentMethod from './EwalletPaymentMethod';
import Summary from './Summary';
import EwalletPaymentMethod from './EwalletPaymentMethod';
import BankPaymentMethod from './BankPaymentMethod';
import RetailPaymentMethod from './RetailPaymentMethod';
import ShippingAddress from "./ShippingAddress";
import ShippingMethod from './ShippingMethod';
import { getStoreByID } from "@/services/store.service";
import { getCouriers } from "@/services/shipping.service";

const Checkout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [cart, setCart] = useState<any>(null);
  const [store, setStore] = useState<any>(null);
  const [userAddressId, setUserAddressId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [couriers, setCouriers] = useState<any[]>([]);
  const [shippingCourier, setShippingCourier] = useState('');
  const [shippingService, setShippingService] = useState('');
  const [shippingPrice, setShippingPrice] = useState(0);

  useEffect(() => {
    (async () => {
      if (!user.id) return;
      const dataCart = await getCartByUserID(user.id);
      setCart(dataCart);

      const dataStore = await getStoreByID(dataCart?.storeId);
      setStore(dataStore);
      setOrigin(dataStore?.subdistrictId);
    })()
  }, [user]);

  useEffect(() => {
    (async () => {
      if (!origin || !destination) return;
      const data = await getCouriers(origin, destination);
      setCouriers(data);
    })()
  }, [origin, destination]);

  return (
    <Box
      maxW={{ base: '3xl', lg: '7xl' }}
      mx="auto"
      px={{ base: '4', md: '8', lg: '12' }}
      py={{ base: '6', md: '8', lg: '12' }}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        align={{ lg: 'flex-start' }}
        spacing={{ base: '8', md: '16' }}
      >
        <Stack spacing={{ base: '8', md: '10' }} flex="2">
          <Heading fontSize="3xl" fontWeight="extrabold" textAlign={'center'}>
            Checkout
          </Heading>
          <Divider />

          <Stack spacing={10}>
            <ShippingAddress
              store={store}
              userAddressId={userAddressId}
              setUserAddressId={setUserAddressId}
              setDestination={setDestination}
            />
            <Divider />
            <ShippingMethod
              couriers={couriers}
              setShippingCourier={setShippingCourier}
              setShippingService={setShippingService}
              setShippingPrice={setShippingPrice}
            />
            <Divider />
            <Stack mt={-10}>
              <EwalletPaymentMethod />
              <BankPaymentMethod />
              <RetailPaymentMethod />
            </Stack>
          </Stack>
        </Stack>

        <Flex
          direction="column"
          align="center"
          flex="1"
          mt={{ base: 0, sm: 100 }}
        >
          <CartOrderSummary />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link
              style={{ color: "rgb(49, 130, 206)" }}
              href="/products"
            >
              Continue shopping
            </Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
}

export default Checkout;
