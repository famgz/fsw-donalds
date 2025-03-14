import { notFound } from 'next/navigation';

import ConsumptionMethodCard from '@/app/[slug]/components/consumption-method-card';
import RestaurantItem from '@/components/restaurant-item';
import { getRestaurantBySlug } from '@/services/resturant';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function RestaurantPage({ params }: Props) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <RestaurantItem restaurant={restaurant} />
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo</h3>
        <p className="text-muted-foreground">
          Escolha como prefere aproveitar sua refeição. Oferecemos praticidade e
          sabor em cada detalhe!
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodCard
          slug={slug}
          buttonText="Para comer aqui"
          imageAlt="Imagem hamburguer"
          imageSrc="/dine_in.png"
          option="DINE_IN"
        />
        <ConsumptionMethodCard
          slug={slug}
          buttonText="Para levar"
          imageAlt="Imagem sacola"
          imageSrc="/takeaway.png"
          option="TAKEAWAY"
        />
      </div>
    </div>
  );
}
