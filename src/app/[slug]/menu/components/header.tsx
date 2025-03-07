'use client';

import Image from 'next/image';

import BackButton from '@/components/back-button';
import OrdersButton from '@/components/orders-button';

interface Props {
  coverImageUrl: string;
}

export default function RestaurantHeader({ coverImageUrl }: Props) {
  return (
    <div className="relative flex h-[250px] w-full justify-between p-3">
      <BackButton />
      <OrdersButton />
      <Image
        src={coverImageUrl}
        alt="Imagem restaurante"
        fill
        className="absolute -z-10 object-cover"
      />
    </div>
  );
}
