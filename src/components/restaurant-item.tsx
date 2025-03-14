import { Restaurant } from '@prisma/client';
import Image from 'next/image';

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantItem({ restaurant }: Props) {
  return (
    <div className="flex w-fit flex-col items-center gap-2">
      <Image
        src={restaurant.avatarImageUrl}
        alt={restaurant.name}
        width={82}
        height={82}
      />
      <h2 className="font-semibold">{restaurant.name}</h2>
    </div>
  );
}
