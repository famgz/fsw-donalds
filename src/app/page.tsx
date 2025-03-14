import Link from 'next/link';

import RestaurantItem from '@/components/restaurant-item';
import { getAllRestaurants } from '@/services/resturant';

export default async function Home() {
  const restaurants = await getAllRestaurants();

  return (
    <div className="space-y-10 p-6">
      <h1 className="pt-20 text-center text-2xl font-semibold">
        Bem vindo ao Food Hub
      </h1>
      {restaurants.length > 0 ? (
        <>
          <p className="text-center text-muted-foreground">
            Selecione um de nossos restaurantes para começar
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            {restaurants.map((restaurant) => (
              <>
                <Link href={`/${restaurant.slug}`} key={restaurant.id}>
                  <RestaurantItem restaurant={restaurant} />
                </Link>
              </>
            ))}
          </div>
        </>
      ) : (
        <p>Ainda não temos nenhum restaurante cadastrado no momento.</p>
      )}
    </div>
  );
}
