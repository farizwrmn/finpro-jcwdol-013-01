'use client';

import { FormatCurrency } from '@/utils/FormatCurrency';
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  FormControl,
  FormLabel,
  Select,
  Input,
} from '@chakra-ui/react';
import { FaCartPlus } from 'react-icons/fa';
import ImageSlider from './ImageSlider';
import { toast } from 'react-toastify';
import {
  getCartByUserID,
  createCartItem,
  resetCartItems,
  updateCart,
} from '@/services/cart.service';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { getDistanceStores } from '@/services/store.service';
import {
  updateCartItemsState,
  updateCartStoreState,
} from '@/lib/features/cart/cartSlice';

type Props = {
  product: any;
};

export default function ProductDetails({ product }: Props) {
  const textColor = useColorModeValue('gray.900', 'gray.400');
  const dividerColor = useColorModeValue('gray.200', 'gray.600');
  const user = useAppSelector((state) => state.auth.user);
  const [isAllow, setIsAllow] = useState(false);
  const [stores, setStores] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    cartId: '',
    productId: product.id,
    name: product.name,
    slug: product.slug,
    image: product.productImages[0]?.image,
    description: product.description,
    slicedPrice: product.slicedPrice,
    sellingPrice: product.sellingPrice,
    quantity: 0,
  });

  useEffect(() => {
    (async () => {
      if (!user.id || user.role !== 'customer' || !user.isVerified) return;

      const dataCart = await getCartByUserID(user.id);
      if (!dataCart.id) return;

      setFormData((prevFormData) => ({
        ...prevFormData,
        cartId: dataCart.id,
      }));
      setIsAllow(true);

      const dataStores = await getDistanceStores({
        longitude: user.longitude,
        latitude: user.latitude,
      });

      setStores(dataStores);

      if (dataCart.storeId) {
        dispatch(
          updateCartStoreState({
            storeId: dataCart.storeId,
          }),
        );
      }
    })();
  }, [dispatch, user]);

  type ChangeEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
    | React.ChangeEvent<HTMLSelectElement>;

  const handleChange = (e: ChangeEvent) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeStore = async (e: ChangeEvent) => {
    const newStoreId = e.target.value;
    if (!newStoreId) return;
    if (
      !confirm(
        `Update store will remove all cart items, do you want to continue?`,
      )
    )
      return;

    try {
      const resultUpdate = await updateCart(formData.cartId, {
        storeId: newStoreId,
      });
      if (!resultUpdate) throw new Error('Update cart failed!');

      const resultReset = await resetCartItems(formData.cartId);
      if (!resultReset) throw new Error('Reset cart items failed!');

      dispatch(
        updateCartStoreState({
          storeId: newStoreId,
        }),
      );
      dispatch(
        updateCartItemsState({
          itemsCount: 0,
          itemsPrice: 0,
        }),
      );
      toast.success('Update store success');
    } catch (err) {
      console.error(err);
      toast.error('Update store failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const cartItem = await createCartItem(formData);
      if (!cartItem) throw new Error('Add to cart failed!');

      if (user.id) {
        const dataCart = await getCartByUserID(user.id);
        dispatch(
          updateCartItemsState({
            itemsCount: dataCart.cartItems.length,
            itemsPrice: dataCart.itemsPrice,
          }),
        );
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        quantity: 0,
      }));
      toast.success('Add to cart success');
    } catch (err) {
      console.error(err);
      toast.error('Add to cart failed');
    }
  };

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Box>
          <ImageSlider
            images={product.productImages?.map((item: any) => item.image)}
          />
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {product.name}
              </Heading>
            </Box>
            <Flex direction={'row'} gap={5} alignItems={'center'}>
              <Text color={textColor} fontWeight={500} fontSize={'2xl'}>
                {FormatCurrency(product.sellingPrice)}
              </Text>
              <Text
                color={textColor}
                fontWeight={400}
                fontSize={'xl'}
                textDecoration={'line-through'}
              >
                {FormatCurrency(product.slicedPrice)}
              </Text>
            </Flex>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={<StackDivider borderColor={dividerColor} />}
            >
              <Text fontSize={'xl'} fontWeight={'300'}>
                {product.description}
              </Text>
              {isAllow && (
                <Stack spacing={4}>
                  <FormControl id="province">
                    <FormLabel>Store</FormLabel>
                    <Select
                      value={cart.storeId}
                      onChange={handleChangeStore}
                      placeholder="Select Store"
                    >
                      {stores?.map((store: any) => (
                        <option
                          key={store.id}
                          value={store.id}
                        >{`${store.name} - ${parseFloat(store.distance).toFixed(2)} km`}</option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl id="quantity">
                    <FormLabel>Quantity</FormLabel>
                    <Input
                      name="quantity"
                      placeholder="Quantity"
                      width={'50%'}
                      mr={5}
                      type="number"
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                    <FormLabel display={'inline'}>Stock:</FormLabel>
                    <Text as={'span'}>100</Text>
                  </FormControl>
                </Stack>
              )}
            </Stack>
            {isAllow && (
              <Button
                rounded={'full'}
                w={'full'}
                mt={8}
                size={'lg'}
                py={'7'}
                bg={'green.600'}
                color={'white'}
                textTransform={'uppercase'}
                _hover={{ transform: 'translateY(2px)', boxShadow: 'lg' }}
                type="submit"
              >
                <FaCartPlus />
                <Text as={'span'} ml={5}>
                  Add to Cart
                </Text>
              </Button>
            )}
            <FormControl id="quantity">
              <FormLabel display={'inline'}>Category:</FormLabel>
              <Text as={'span'}>{product.category.name}</Text>
            </FormControl>
          </Stack>
        </form>
      </SimpleGrid>
    </Container>
  );
}
