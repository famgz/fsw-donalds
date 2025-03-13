'use client';

import Image from 'next/image';

import BackButton from '@/components/back-button';
import OrdersButton from '@/components/orders-button';

interface Props {
  coverImageUrl: string;
}

export default function RestaurantHeader({ coverImageUrl }: Props) {
  return (
    <div className="relative h-[250px] w-full">
      <div className="relative z-50 flex justify-between p-3">
        <BackButton />
        <OrdersButton />
      </div>
      <Image
        src={coverImageUrl}
        alt="Imagem restaurante"
        fill
        className="absolute object-cover"
      />
    </div>
  );
}
