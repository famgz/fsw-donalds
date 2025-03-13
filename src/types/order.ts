import { Prisma } from '@prisma/client';

export type OrderWithProductsAndRestaurant = Prisma.OrderGetPayload<{
  include: {
    orderProducts: { include: { product: true } };
    restaurant: true;
  };
}>;
