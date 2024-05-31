'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { isOpen, onClose } = useDisclosure();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Implementasikan logika untuk ubah password di sini (misalnya, API call)
    // Ini placeholder, ganti dengan implementasi Anda
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Password baru tidak cocok');
      return;
    }

    setError(null); // Bersihkan pesan error sebelumnya
    // Lakukan tindakan setelah ubah password berhasil (misalnya, redirect ke profil)
    router.push('/profile');
  };

  return (
    <Container>
      <Box mt={100}>
        {/* Tampilan formulir */}
        <form onSubmit={handleSubmit}>
          <Heading as="h2" size="md" mb={4}>
            Ubah Password
          </Heading>
          <FormControl isRequired>
            <FormLabel htmlFor="currentPassword">Password Saat Ini</FormLabel>
            <Input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="newPassword">Password Baru</FormLabel>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="confirmPassword">
              Konfirmasi Password Baru
            </FormLabel>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </FormControl>
          {error && <Text color="red">{error}</Text>}
          <Button type="submit" mt={4}>
            Ubah Password
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ChangePassword;
