'use client';

import { useContext } from 'react';

import CartProductItem from '@/components/cart-product-item';
import { ScrollArea } from '@/components/ui/scroll-area';
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
      <SheetContent className="flex w-[90%] flex-col gap-5">
        <SheetHeader>
          <SheetTitle className="text-left">Carrinho</SheetTitle>
          <SheetDescription className="sr-only">
            Carrinho de compras
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-20 flex-auto">
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <CartProductItem product={product} key={product.id} />
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
