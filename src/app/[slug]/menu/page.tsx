import { ConsumptionMethod } from '@prisma/client';
import { notFound } from 'next/navigation';

import RestaurantCategories from '@/app/[slug]/menu/components/categories';
import RestaurantHeader from '@/app/[slug]/menu/components/header';
import { getRestaurantBySlugWithMenuCategoriesAndProducts } from '@/services/resturant';

interface Props {
  params: ParamsProps;
  searchParams: SearchParamsProps;
}

function isConsumptionMethodValid(consumptionMethod: string | undefined) {
  if (!consumptionMethod) {
    return false;
  }
  return Object.values(ConsumptionMethod).includes(
    consumptionMethod?.toUpperCase() as ConsumptionMethod,
  );
}

export default async function RestaurantMenuPage({
  params,
  searchParams,
}: Props) {
  const consumptionMethod = (await searchParams).consumptionMethod;
  const slug = (await params).slug;
  if (!slug || !isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }
  const restaurant =
    await getRestaurantBySlugWithMenuCategoriesAndProducts(slug);
  if (!restaurant) {
    return notFound();
  }
  return (
    <>
      <RestaurantHeader coverImageUrl={restaurant.coverImageUrl} />
      <RestaurantCategories restaurant={restaurant} />
    </>
  );
}
