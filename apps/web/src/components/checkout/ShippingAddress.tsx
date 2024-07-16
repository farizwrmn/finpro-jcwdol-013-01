import { Alert, AlertIcon, Button, Flex, FormControl, FormLabel, Heading, Select, Stack, Text } from "@chakra-ui/react"
import React, { useEffect, useMemo, useState } from 'react'
import { getAddresses } from "@/services/address.service";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateCartDestinationState } from "@/lib/features/cart/cartSlice";

type Props = {
  store: any;
}

const ShippingAddress = ({ store }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const cart = useAppSelector((state) => state.cart);
  const [addresses, setAddresses] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getAddresses({ userId: user.id as string, size: 1000 });
      setAddresses(data?.addresses || []);

      // const defaultAddress = data?.addresses?.find((address: any) => Boolean(address.isDefault));
      // if (defaultAddress) handleChangeAddress(defaultAddress.id);
    })()
  }, [user.id]);

  const address = useMemo(() => addresses?.find(address => address.id === cart.userAddressId), [addresses, cart.userAddressId]);

  const defaultAddress = useMemo(() => addresses?.find(address => Boolean(address.isDefault)), [addresses]);

  useEffect(() => {
    if (!defaultAddress?.id) return;
    handleChangeAddress(defaultAddress.id);
  }, [defaultAddress]);

  const handleChangeAddress = (userAddressId: string) => {
    if (!userAddressId) return;
    const data = addresses?.find(address => address.id === userAddressId);

    dispatch(updateCartDestinationState({
      destination: data?.subdistrictId,
      userAddressId: userAddressId
    }));
  }

  return (
    <Stack spacing={8}>
      <Heading as="h1" fontSize="2xl">
        Shipping Address
      </Heading>

      <Stack
        spacing={8}
        w={'full'}
      >
        <FormControl id="label">
          <FormLabel>Label Address</FormLabel>
          <Flex gap={4}>
            <Select
              width="auto"
              value={cart.userAddressId}
              onChange={(e) => handleChangeAddress(e.target.value)}
              flexGrow={1}
            >
              <option value="">- Select Label Address -</option>
              {addresses?.map((address: any) => (
                <option
                  key={address.id}
                  value={address.id}
                >{address.label + `${Boolean(address.isDefault) ? ' (Utama)' : ''}`}</option>
              ))}
            </Select>
            <Button
              colorScheme="blue"
              onClick={() => {
                router.push(`/users/address`);
              }}
            >
              Add
            </Button>
          </Flex>
        </FormControl>
        <FormControl id="address">
          <FormLabel>Customer Address</FormLabel>
          {cart.userAddressId ? (
            <Text>{address?.address ? `${address?.address}, ${address?.subdistrictName}, ${address?.cityName}, ${address?.provinceName} ${address?.postalCode || ''}` : '-'}</Text>
          ) : (
            <Alert status='info' borderRadius={5} mt={4}>
              <AlertIcon />
              Please select label address first!
            </Alert>
          )}
        </FormControl>
        <FormControl id="address">
          <FormLabel>Store Address</FormLabel>
          <Text>{store?.address ? `${store?.name}, ${store?.address}, ${store?.subdistrictName}, ${store?.cityName}, ${store?.provinceName} ${store?.postalCode || ''}` : '-'}</Text>
        </FormControl>
      </Stack>
    </Stack>
  );
}

export default ShippingAddress