'use server';

import { ConsumptionMethod, OrderStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { removeCpfPunctuation } from '@/lib/cpf';
import { db } from '@/lib/prisma';
import { getProductsByIds } from '@/services/product';
import { getRestaurantBySlug } from '@/services/resturant';
import { CartProduct } from '@/types/cart';
import { OrderWithProductsAndRestaurant } from '@/types/order';

export interface CreateOrderInput {
  cartProducts: CartProduct[];
  consumptionMethod: ConsumptionMethod;
  customerCpf: string;
  customerName: string;
  restaurantSlug: string;
}

export async function getCompleteOrdersByCpf(
  cpf: string,
): Promise<OrderWithProductsAndRestaurant[]> {
  return await db.order.findMany({
    where: { customerCpf: removeCpfPunctuation(cpf) },
    include: {
      orderProducts: { include: { product: true } },
      restaurant: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createOrder({
  cartProducts,
  consumptionMethod,
  customerCpf,
  customerName,
  restaurantSlug,
}: CreateOrderInput) {
  customerCpf = removeCpfPunctuation(customerCpf);
  const restaurant = await getRestaurantBySlug(restaurantSlug);
  const restaurantId = restaurant?.id;
  if (!restaurantId) {
    throw new Error('Invalid restaurant');
  }
  const productsWithReliablePrices = await getProductsByIds(
    cartProducts.map((x) => x.id),
  );
  const orderProducts = cartProducts.map((cartProduct) => ({
    productId: cartProduct.id,
    quantity: cartProduct.quantity,
    priceInCents: productsWithReliablePrices!.find(
      (product) => product.id === cartProduct.id,
    )!.priceInCents,
  }));
  const totalInCents = orderProducts.reduce(
    (acc, orderProduct) =>
      acc + orderProduct.priceInCents * orderProduct.quantity,
    0,
  );
  await db.order.create({
    data: {
      consumptionMethod,
      customerName,
      customerCpf,
      restaurantId,
      status: OrderStatus.PENDING,
      orderProducts: {
        createMany: {
          data: orderProducts,
        },
      },
      totalInCents,
    },
  });
  revalidatePath('/orders');
}
