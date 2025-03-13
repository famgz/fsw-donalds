'use client';

import { useContext } from 'react';

import CartProductItem from '@/components/cart-product-item';
import CheckoutButton from '@/components/checkout-button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { CartContext } from '@/context/cart';
import { formatPrice } from '@/lib/utils';

export default function Cart() {
  const { isOpen, toggleCart, products, totalInCents } =
    useContext(CartContext);

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
            {products.length > 0 ? (
              products.map((product) => (
                <CartProductItem product={product} key={product.id} />
              ))
            ) : (
              <p className="py-10 text-center text-sm text-muted-foreground">
                O carrinho está vazio
              </p>
            )}
          </div>
        </ScrollArea>
        <Card>
          <CardContent className="p-5 text-sm">
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground">Total:</p>
              <p className="font-semibold">{formatPrice(totalInCents)}</p>
            </div>
          </CardContent>
        </Card>
        <CheckoutButton />
      </SheetContent>
    </Sheet>
  );
}
