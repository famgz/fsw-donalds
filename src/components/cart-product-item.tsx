import { Trash2Icon } from 'lucide-react';
import Image from 'next/image';

import ProductQuantityControls from '@/components/product-quantity-controls';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { CartProduct } from '@/types/cart';

interface Props {
  product: CartProduct;
}

export default function CartProductItem({ product }: Props) {
  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <div className="relative aspect-square size-[64px] h-full shrink-0 rounded-xl bg-muted-foreground/10 sm:size-20">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
          sizes="80px"
        />
      </div>
      <div className="flex-auto space-y-1 text-xs sm:text-sm">
        <p className="truncate">{product.name}</p>
        <p className="font-semibold">{formatPrice(product.priceInCents)}</p>
        <ProductQuantityControls
          quantity={product.quantity}
          handleDecreaseQuantity={() => {}}
          handleIncreaseQuantity={() => {}}
        />
      </div>
      <Button variant={'outline'} className="size-6 rounded-lg p-0 sm:size-8">
        <Trash2Icon />
      </Button>
    </div>
  );
}
