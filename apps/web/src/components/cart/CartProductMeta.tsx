'use client';

import {
  Box,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';

export type CartProductMetaProps = {
  name: string;
  slug: string;
  description: string;
  image: string;
};

export const CartProductMeta = (props: CartProductMetaProps) => {
  const { name, slug, description, image } = props;
  return (
    <Stack direction="row" spacing="5" width="full">
      <Link href={`/products/${slug}`}>
        <Image
          rounded="lg"
          width="100px"
          height="100px"
          fit="cover"
          src={image}
          alt={name}
          draggable="false"
          loading="lazy"
        />
      </Link>
      <Box pt="4">
        <Stack spacing="0.5">
          <Text fontWeight="medium">{name}</Text>
          <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
            {description}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};
