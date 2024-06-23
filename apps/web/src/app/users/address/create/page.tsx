"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  TableContainer,
  Box,
  Input,
  Select,
  Text,
  Button,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useRouter } from "next/navigation";
import { useAppSelector } from '@/lib/hooks';
import { getCities, getProvinces, getSubdistricts } from "@/services/shipping.service";
import { createAddress } from "@/services/address.service";

const Page = () => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [subdistricts, setSubdistricts] = useState<any[]>([]);
  const user = useAppSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    userId: user.id,
    label: '',
    address: '',
    provinceId: '',
    provinceName: '',
    cityId: '',
    cityName: '',
    subdistrictId: '',
    subdistrictName: '',
    postalCode: '',
  });

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getProvinces();
      setProvinces(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getCities(formData.provinceId);
      setCities(data);
    })();
  }, [formData.provinceId]);

  useEffect(() => {
    (async () => {
      const data = await getSubdistricts(formData.cityId);
      setSubdistricts(data);
    })();
  }, [formData.cityId]);

  type ChangeEvent = (
    React.ChangeEvent<HTMLInputElement> |
    React.ChangeEvent<HTMLTextAreaElement> |
    React.ChangeEvent<HTMLSelectElement>
  )

  const handleChange = (e: ChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provinceId = e.target.value
    const provinceName = provinces.find(
      (province) => province.province_id === provinceId
    )?.province || '';

    setFormData({
      ...formData,
      provinceId,
      provinceName,
      cityId: '',
      cityName: '',
      subdistrictId: '',
      subdistrictName: ''
    })
  }

  const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value
    const cityName = cities.find(
      city => city.city_id === cityId
    )?.city_name || ''

    setFormData({
      ...formData,
      cityId,
      cityName,
      subdistrictId: '',
      subdistrictName: ''
    })
  }

  const handleChangeSubdistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subdistrictId = e.target.value
    const subdistrictName = subdistricts.find(
      subdistrict => subdistrict.subdistrict_id === subdistrictId
    )?.subdistrict_name || ''

    setFormData({
      ...formData,
      subdistrictId,
      subdistrictName
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const address = await createAddress(formData);
      if (!address) throw new Error("Create address failed!");
      alert("Create address success");
      router.push("/users/address")
    } catch (err) {
      console.error(err);
      alert("Create address failed");
    }
  }

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Address Management
      </Text>
      <Card my={10}>
        <CardBody>
          <TableContainer>
            <form onSubmit={handleSubmit}>
              <Stack
                spacing={6}
                w={'full'}
                rounded={'xl'}
                p={10}
                my={6}
              >
                <FormControl id="label" isRequired>
                  <FormLabel>Label</FormLabel>
                  <Input
                    name="label"
                    placeholder="Label"
                    _placeholder={{ color: 'gray.500' }}
                    type="text"
                    value={formData.label}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="address" isRequired>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    name="address"
                    placeholder="Address"
                    _placeholder={{ color: 'gray.500' }}
                    value={formData.address}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="province" isRequired>
                  <FormLabel>Province</FormLabel>
                  <Select
                    width="auto"
                    value={formData.provinceId}
                    onChange={handleChangeProvince}
                  >
                    <option value=""></option>
                    {provinces?.map((province: any) => (
                      <option
                        key={province.province_id}
                        value={province.province_id}
                      >{province.province}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="city" isRequired>
                  <FormLabel>City</FormLabel>
                  <Select
                    width="auto"
                    value={formData.cityId}
                    onChange={handleChangeCity}
                  >
                    <option value=""></option>
                    {cities?.map(city => (
                      <option
                        key={city.city_id}
                        value={city.city_id}
                      >{`${city.type} ${city.city_name}`}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="subdistrict" isRequired>
                  <FormLabel>Subdistrict</FormLabel>
                  <Select
                    width="auto"
                    value={formData.subdistrictId}
                    onChange={handleChangeSubdistrict}
                  >
                    <option value=""></option>
                    {subdistricts?.map(subdistrict => (
                      <option
                        key={subdistrict.subdistrict_id}
                        value={subdistrict.subdistrict_id}
                      >{subdistrict.subdistrict_name}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl id="postalCode">
                  <FormLabel>Postal Code</FormLabel>
                  <Input
                    name="postalCode"
                    placeholder="Postal Code"
                    _placeholder={{ color: 'gray.500' }}
                    type="text"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                  <Button
                    onClick={() => {
                      router.push("/users/address");
                    }}
                    bg={'red.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                      bg: 'red.500',
                    }}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    bg={'blue.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Create
                  </Button>
                </Stack>
              </Stack>
            </form>
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;