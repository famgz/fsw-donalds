import { notFound } from 'next/navigation';

import ProductHeader from '@/app/[slug]/menu/[productId]/components/header';
import ProductDetails from '@/app/[slug]/menu/[productId]/components/product.details';
import { getProductById } from '@/services/product';
import { getRestaurantBySlug } from '@/services/resturant';

interface Props {
  params: ParamsProps;
}

export default async function ProductPage({ params }: Props) {
  const slug = (await params).slug;
  const productId = (await params).productId;
  if (!(slug && productId)) {
    return notFound();
  }
  const [product, restaurant] = await Promise.all([
    getProductById(productId),
    getRestaurantBySlug(slug),
  ]);
  if (!(product && restaurant)) {
    return notFound();
  }
  if (product.restaurantId !== restaurant.id) {
    return notFound();
  }

  return (
    <div className="flex flex-1 flex-col">
      <ProductHeader product={product} />
      <ProductDetails restaurant={restaurant} product={product} />
    </div>
  );
}
