import { PrismaClient, Cart, CartItem } from '@prisma/client';
import { ICart, ICartItem } from '../interfaces/cart.interface';

const prisma = new PrismaClient();

const getCartByUserIDQuery = async (userId: string): Promise<Cart | null> => {
  try {
    const cart = await prisma.cart.findFirst({
      include: {
        cartItems: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    });

    return cart;
  } catch (err) {
    throw err;
  }
};

const getCartByIDQuery = async (id: string): Promise<Cart | null> => {
  try {
    const cart = await prisma.cart.findUnique({
      where: {
        id,
      },
    });

    return cart;
  } catch (err) {
    throw err;
  }
};

const createCartQuery = async (data: ICart): Promise<Cart> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const cart = await prisma.cart.create({
          data: {
            ...data,
          },
        });

        return cart;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const updateCartQuery = async (id: string, data: ICart): Promise<Cart> => {
  try {
    const cart = await prisma.cart.update({
      data: {
        ...data,
      },
      where: {
        id,
      },
    });

    return cart;
  } catch (err) {
    throw err;
  }
};

const deleteCartQuery = async (id: string): Promise<Cart> => {
  try {
    const cart = await prisma.cart.delete({
      where: {
        id,
      },
    });

    return cart;
  } catch (err) {
    throw err;
  }
};

const getCartItemByProductIDQuery = async (
  cartId: string,
  productId: string,
): Promise<CartItem | null> => {
  try {
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        AND: {
          cart: {
            id: cartId,
          },
          product: {
            id: productId,
          },
        },
      },
    });

    return cartItem;
  } catch (err) {
    throw err;
  }
};

const createCartItemQuery = async (data: ICartItem): Promise<CartItem> => {
  try {
    const trx = await prisma.$transaction(async (prisma) => {
      try {
        const cartItem = await prisma.cartItem.create({
          data: {
            ...data,
          },
        });

        return cartItem;
      } catch (err) {
        throw err;
      }
    });

    return trx;
  } catch (err) {
    throw err;
  }
};

const updateCartItemQuery = async (
  id: string,
  data: ICartItem,
): Promise<CartItem> => {
  try {
    const cartItem = await prisma.cartItem.update({
      data: {
        ...data,
      },
      where: {
        id,
      },
    });

    return cartItem;
  } catch (err) {
    throw err;
  }
};

const deleteCartItemQuery = async (id: string): Promise<CartItem> => {
  try {
    const cartItem = await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    return cartItem;
  } catch (err) {
    throw err;
  }
};

export {
  updateCartItemQuery,
  deleteCartItemQuery,
  createCartItemQuery,
  getCartByUserIDQuery,
  getCartByIDQuery,
  createCartQuery,
  updateCartQuery,
  deleteCartQuery,
  getCartItemByProductIDQuery,
};
