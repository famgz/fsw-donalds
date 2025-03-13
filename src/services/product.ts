'use server';

import { Product } from '@prisma/client';

import { db } from '@/lib/prisma';

export async function getProductById(
  productId: string,
): Promise<Product | null> {
  return db.product.findUnique({ where: { id: productId } });
}

export async function getProductsByIds(
  productIds: string[],
): Promise<Product[] | null> {
  return db.product.findMany({ where: { id: { in: productIds } } });
}
