'use client';

import { createContext, ReactNode, useState } from 'react';

import { CartProduct } from '@/types/cart';

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCart: () => {},
  addProduct: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
