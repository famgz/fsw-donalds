'use server';

import { db } from '@/lib/prisma';
import { RestaurantWithCategoriesAndProducts } from '@/types/restaurant';

export async function getRestaurantBySlug(slug: string) {
  return await db.restaurant.findUnique({ where: { slug } });
}

export async function getAllRestaurants() {
  return await db.restaurant.findMany();
}

export async function getRestaurantBySlugWithMenuCategoriesAndProducts(
  slug: string,
): Promise<RestaurantWithCategoriesAndProducts | null> {
  return await db.restaurant.findUnique({
    where: { slug },
    include: { menuCategories: { include: { products: true } } },
  });
}
