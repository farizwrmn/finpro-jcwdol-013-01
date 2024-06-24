import { Button, Flex, FormControl, FormLabel, Heading, Select, Stack, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react'
import { getAddresses } from "@/services/address.service";
import { useRouter } from "next/navigation";

type Props = {
  store: any;
  userAddressId: string;
  setUserAddressId: (id: string) => void;
  setDestination: (id: string) => void;
}

const ShippingAddress = ({
  store,
  userAddressId,
  setUserAddressId,
  setDestination,
}: Props) => {
  const router = useRouter();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [address, setAddress] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const data = await getAddresses({ size: 1000 });
      setAddresses(data?.addresses);
    })()
  }, []);

  const handleChangeAddress = (e: any) => {
    const newUserAddressId = e.target.value;
    setUserAddressId(newUserAddressId);

    const data = addresses.find(address => address.id === newUserAddressId);
    setAddress(data);

    setDestination(data?.subdistrictId);
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
          <FormLabel>Label</FormLabel>
          <Flex gap={4}>
            <Select
              width="auto"
              value={userAddressId}
              onChange={handleChangeAddress}
              flexGrow={1}
            >
              <option value=""></option>
              {addresses?.map((address: any) => (
                <option
                  key={address.id}
                  value={address.id}
                >{address.label}</option>
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
          <Text>{address?.address ? `${address?.address}, ${address?.subdistrictName}, ${address?.cityName}, ${address?.provinceName} ${address?.postalCode}` : '-'}</Text>
        </FormControl>
        <FormControl id="address">
          <FormLabel>Store Address</FormLabel>
          <Text>{store?.address ? `${store?.address}, ${store?.subdistrictName}, ${store?.cityName}, ${store?.provinceName} ${store?.postalCode}` : '-'}</Text>
        </FormControl>
      </Stack>
    </Stack>
  );
}

export default ShippingAddress