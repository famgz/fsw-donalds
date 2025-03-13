'use client';

import { useContext } from 'react';

import CartSummaryCard from '@/components/cart-summary-card';
import { CART_SUMMARY_CARD_HEIGHT } from '@/constants/layout';
import { CartContext } from '@/context/cart';

export default function RestaurantContentTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { hasProducts } = useContext(CartContext);

  return (
    <div
      style={{ paddingBottom: hasProducts ? CART_SUMMARY_CARD_HEIGHT : 0 }}
      className="expand relative"
    >
      {children}
      <CartSummaryCard />
    </div>
  );
}
