import { useContext } from 'react';

import { Button } from '@/components/ui/button';
import { CART_SUMMARY_CARD_HEIGHT } from '@/constants/layout';
import { CartContext } from '@/context/cart';
import { formatPrice } from '@/lib/utils';

export default function CartSummaryCard() {
  const { hasProducts, totalInCents, totalItems, toggleCart } =
    useContext(CartContext);
  return (
    hasProducts && (
      <div
        className="fixed bottom-0 left-0 right-0 w-full border-t bg-background shadow-[0_5px_15px_rgba(0,0,0,0.35)]"
        style={{
          height: CART_SUMMARY_CARD_HEIGHT,
        }}
      >
        <div className="mx-auto flex w-full max-w-md items-center justify-between gap-4 p-4">
          <div className="text-sm text-muted-foreground">
            <p className="">Total dos pedidos</p>
            <p>
              <span className="text-lg font-semibold text-foreground">
                {formatPrice(totalInCents)}
              </span>
              <span className="">{`/ ${totalItems} ${totalItems > 1 ? 'itens' : 'item'}`}</span>
            </p>
          </div>
          <Button variant={'destructive'} size={'lg'} onClick={toggleCart}>
            Ver Sacola
          </Button>
        </div>
      </div>
    )
  );
}
