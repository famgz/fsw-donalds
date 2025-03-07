import { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import { formatPrice } from '@/lib/utils';

interface Props {
  slug: string;
  products: Product[];
}

export default function Products({ slug, products }: Props) {
  return (
    <div className="divide-y px-5 py-3">
      {products.map((product) => (
        <Link
          href={`/${slug}/menu/${product.id}`}
          key={product.id}
          className="flex items-center justify-between gap-4 py-4"
        >
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="pt-3 text-sm font-semibold">
              {formatPrice(product.priceInCents)}
            </p>
          </div>
          <div className="relative min-h-20 min-w-32 overflow-hidden rounded-lg">
            <Image
              fill
              src={product.imageUrl}
              alt={product.name}
              className="object-cover"
              sizes="128px"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
