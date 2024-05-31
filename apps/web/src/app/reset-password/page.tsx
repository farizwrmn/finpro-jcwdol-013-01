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

const ResetPassword: React.FC = () => {
  const [formData, setFormData] = useState<{
    email: string;
  }>({
    email: '',
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
    if (formData.email === '') {
      setError('Email Harus Diisi');
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
            Reset Password
          </Heading>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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

export default ResetPassword;
