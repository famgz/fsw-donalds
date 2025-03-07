import { Product } from '@prisma/client';

import { db } from '@/lib/prisma';

export async function getProduct(productId: string): Promise<Product | null> {
  return db.product.findUnique({ where: { id: productId } });
}
