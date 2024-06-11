"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Input,
  Select,
  IconButton,
  Icon,
  Text,
  ButtonGroup,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  SelectField,
} from '@chakra-ui/react';
import { useRouter } from "next/navigation";
import instance from "@/utils/axiosInstance";

export const getProvinces = async () => {
  try {
    const { data } = await instance.get('http://localhost:3000/api/provinces');
    const provinces = data?.provinces;
    return provinces;
  } catch (err) {
    console.error(err);
  }
};

export const getCities = async (provinceId: string) => {
  try {
    const { data } = await instance.get(`http://localhost:3000/api/cities?provinceId=${provinceId}`);
    const cities = data?.cities;
    return cities;
  } catch (err) {
    console.error(err);
  }
};

export const getSubdistricts = async (cityId: string) => {
  try {
    const { data } = await instance.get(`http://localhost:3000/api/subdistricts?cityId=${cityId}`);
    const subdistricts = data?.subdistricts;
    return subdistricts;
  } catch (err) {
    console.error(err);
  }
};

const Page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    provinceId: '',
    provinceName: '',
    cityId: '',
    cityName: '',
    subdistrictId: '',
    subdistrictName: '',
  });

  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [subdistricts, setSubdistricts] = useState<any[]>([]);

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

  return (
    <Box>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Store Management
      </Text>
      <Card mt={10}>
        <CardBody>
          <TableContainer>
            <Stack
              spacing={6}
              w={'full'}
              rounded={'xl'}
              p={10}
              my={6}
            >
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  placeholder="Name"
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                  value={formData.name}
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
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="password"
                  _placeholder={{ color: 'gray.500' }}
                  type="password"
                />
              </FormControl>
              <Stack spacing={6} direction={['column', 'row']}>
                <Button
                  bg={'red.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'red.500',
                  }}>
                  Cancel
                </Button>
                <Button
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
          </TableContainer>
        </CardBody>
      </Card>
    </Box>
  );
};

export default Page;