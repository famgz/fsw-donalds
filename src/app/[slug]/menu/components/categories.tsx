import { ClockIcon } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { RestaurantWithCategoriesAndProducts } from '@/types/restaurant';

interface Props {
  restaurant: RestaurantWithCategoriesAndProducts;
}

export default function RestaurantCategories({ restaurant }: Props) {
  return (
    <div className="relative -mt-1.5 rounded-t-3xl border bg-white">
      <div className="flex items-center gap-3 p-5">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          height={44}
          width={44}
        />
        <div>
          <h2 className="text-lg font-semibold">{restaurant.name}</h2>
          <p className="text-xs opacity-55">{restaurant.description}</p>
        </div>
        <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
          <ClockIcon size={12} />
          <p>Aberto</p>
        </div>
      </div>
      <ScrollArea className="w-full">
        <div className="flex w-max gap-4 p-4 pt-0">
          {restaurant.menuCategories.map((category) => (
            <Button
              key={category.id}
              variant={'secondary'}
              size={'sm'}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
