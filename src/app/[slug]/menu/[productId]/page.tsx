import { notFound } from 'next/navigation';

import ProductHeader from '@/app/[slug]/menu/[productId]/components/header';
import { getProduct } from '@/services/product';

interface Props {
  params: ParamsProps;
}

export default async function ProductPage({ params }: Props) {
  const slug = (await params).slug;
  const productId = (await params).productId;
  if (!(slug && productId)) {
    return notFound();
  }
  const product = await getProduct(productId);
  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductHeader product={product} />
    </div>
  );
}
