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

type CartItemProps = {
  isGiftWrapping?: boolean;
  name: string;
  description: string;
  quantity: number;
  price: number;
  // currency: 'IDR';
  imageUrl: string;
  onChangeQuantity?: (quantity: number) => void;
  onClickGiftWrapping?: () => void;
  onClickDelete?: () => void;
};

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

  // const {
  //   isGiftWrapping,
  //   name,
  //   description,
  //   quantity,
  //   imageUrl,
  //   // currency,
  //   price,
  //   onChangeQuantity,
  //   onClickDelete,
  // } = props;

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justify="space-between"
      align="center"
    >
      <CartProductMeta
        name={item.name}
        description={item.description}
        image={`http://localhost:8000/public/products/${item.image}`}
        isGiftWrapping={false}
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
        <PriceTag price={item.sellingPrice} currency="" />
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
        <PriceTag price={item.sellingPrice} currency={''} />
      </Flex>
    </Flex>
  );
};
