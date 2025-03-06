import { ConsumptionMethod } from '@prisma/client';
import { notFound } from 'next/navigation';

import RestaurantHeader from '@/app/[slug]/menu/components/header';
import { getRestaurantBySlug } from '@/services/resturant';

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
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantHeader coverImageUrl={restaurant.coverImageUrl} />
    </div>
  );
}
