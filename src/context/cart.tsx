'use client';

import { createContext, ReactNode, useMemo, useState } from 'react';

import { CartProduct } from '@/types/cart';

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  totalInCents: number;
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  removeProduct: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  totalInCents: 0,
  toggleCart: () => {},
  addProduct: () => {},
  removeProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  clearCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const totalInCents = useMemo(
    () =>
      products.reduce(
        (acc, product) => acc + product.quantity * product.priceInCents,
        0,
      ),
    [products],
  );

  function toggleCart() {
    setIsOpen((prev) => !prev);
  }

  function addProduct(product: CartProduct) {
    setProducts((prev) => {
      const productOnCartIndex = prev.findIndex((p) => p.id === product.id);
      const isProductOnCart = productOnCartIndex !== -1;
      if (isProductOnCart) {
        const newProducts = [...prev];
        newProducts[productOnCartIndex].quantity += product.quantity;
        return newProducts;
      } else {
        return [...prev, product];
      }
    });
  }

  function removeProduct(productId: string) {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  }

  function decreaseProductQuantity(productId: string) {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === productId) {
          const quantity =
            product.quantity === 1 ? product.quantity : product.quantity - 1;
          return { ...product, quantity };
        }
        return product;
      }),
    );
  }

  function increaseProductQuantity(productId: string) {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === productId) {
          const quantity = product.quantity + 1;
          return { ...product, quantity };
        }
        return product;
      }),
    );
  }

  function clearCart() {
    setIsOpen(false);
    setProducts([]);
  }

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        removeProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        totalInCents,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
