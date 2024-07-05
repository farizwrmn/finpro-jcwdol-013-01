'use client';

import {
  CloseButton,
  Flex,
  Link,
  Select,
  SelectProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { PriceTag } from './PriceTag';
import { CartProductMeta } from './CartProductMeta';

const QuantitySelect = (props: SelectProps) => (
  <Select
    maxW="64px"
    aria-label="Select quantity"
    focusBorderColor={useColorModeValue('blue.500', 'blue.200')}
    {...props}
  >
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </Select>
);

type Props = {
  item: any,
  handleRemoveCartItem: (id: string) => void;
}

export const CartItem = ({ item, handleRemoveCartItem }: Props) => {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={item.name}
        slug={item.slug}
        description={item.description}
        image={`${process.env.NEXT_PUBLIC_BASE_API_URL}/public/products/${item.image}`}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{ base: 'none', md: 'flex' }}
      >
        <QuantitySelect
          value={item.quantity}
          onChange={(e) => {
            // onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
        <PriceTag price={item.price} currency="" />
        <CloseButton
          aria-label={`Delete ${name} from cart`}
          onClick={() => {
            handleRemoveCartItem(item.id);
          }}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{ base: 'flex', md: 'none' }}
      >
        <Link fontSize="sm" textDecor="underline">
          Delete
        </Link>
        <QuantitySelect
          value={item.quantity}
          onChange={(e) => {
            // onChangeQuantity?.(+e.currentTarget.value);
          }}
        />
        <PriceTag price={item.price} currency={''} />
      </Flex>
    </Flex>
  );
};
