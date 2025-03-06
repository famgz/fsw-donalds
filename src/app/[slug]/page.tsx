import Image from 'next/image';
import { notFound } from 'next/navigation';

import ConsumptionMethodCard from '@/app/[slug]/components/consumption-method-card';
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
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo</h3>
        <p className="text-muted-foreground">
          Escolha como prefere aproveitar sua refeição. Oferecemos praticidade e
          sabor em cada detalhe!
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodCard
          imageSrc="/dine_in.png"
          imageAlt="Imagem hamburguer"
          buttonText="Para comer aqui"
        />
        <ConsumptionMethodCard
          imageSrc="/takeaway.png"
          imageAlt="Imagem sacola"
          buttonText="Para levar"
        />
      </div>
    </div>
  );
}
