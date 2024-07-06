'use client';

import {
  Box,
  CloseButton,
  Flex,
  Icon,
  IconButton,
  Input,
  Link,
  Select,
  SelectProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { PriceTag } from './PriceTag';
import { CartProductMeta } from './CartProductMeta';
import { FiMinus } from "react-icons/fi";

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
        {/* <Box display="inline-flex" mr={5}>
          <IconButton
            aria-label="left"
            icon={<Icon as={FiMinus} />}
            borderRightRadius={0}
            onClick={decrementQuantity}
            isDisabled={!stock?.remainingStock || !formData.quantity}
          />
          <Input
            name="quantity"
            placeholder="Quantity"
            width={'50%'}
            type="number"
            borderRadius={0}
            value={formData.quantity}
            onChange={handleChange}
            onBlur={validateQuantity}
            isDisabled={!stock?.remainingStock}
          />
          <IconButton
            aria-label="right"
            icon={<Icon as={FiPlus} />}
            borderLeftRadius={0}
            onClick={incrementQuantity}
            isDisabled={!stock?.remainingStock || formData.quantity === stock?.remainingStock}
          />
        </Box> */}
        <QuantitySelect
          value={item.quantity}
          onChange={(e) => {
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
