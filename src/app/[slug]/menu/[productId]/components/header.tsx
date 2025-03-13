import { Product } from '@prisma/client';
import Image from 'next/image';

import BackButton from '@/components/back-button';
import OrdersButton from '@/components/orders-button';

interface Props {
  product: Product;
}

export default function ProductHeader({ product }: Props) {
  return (
    <div className="relative min-h-80 w-full bg-muted-foreground/5">
      <div className="relative z-50 flex justify-between p-3">
        <BackButton />
        <OrdersButton />
      </div>
      <Image
        fill
        src={product.imageUrl}
        alt={product.name}
        className="absolute object-cover"
      />
    </div>
  );
}
