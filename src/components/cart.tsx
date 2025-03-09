'use client';

import { useContext } from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { CartContext } from '@/context/cart';

export default function Cart() {
  const { isOpen, toggleCart, products } = useContext(CartContext);

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
          <SheetDescription className="sr-only">
            Carrinho de compras
          </SheetDescription>
        </SheetHeader>
        {products.map((product) => (
          <div key={product.id}>
            <h2>
              {product.name} - {product.quantity}
            </h2>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
}
