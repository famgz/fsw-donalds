import { Prisma } from '@prisma/client';

export type RestaurantWithCategoriesAndProducts = Prisma.RestaurantGetPayload<{
  include: { menuCategories: { include: { products: true } } };
}>;

export type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;
