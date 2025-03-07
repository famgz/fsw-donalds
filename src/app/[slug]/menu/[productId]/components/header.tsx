import { Product } from '@prisma/client';
import Image from 'next/image';

import BackButton from '@/components/back-button';
import OrdersButton from '@/components/orders-button';

interface Props {
  product: Product;
}

export default function ProductHeader({ product }: Props) {
  return (
    <div className="relative flex h-80 w-full justify-between p-3">
      <BackButton />
      <OrdersButton />
      <Image
        fill
        src={product.imageUrl}
        alt={product.name}
        className="absolute -z-10 object-cover"
      />
    </div>
  );
}
