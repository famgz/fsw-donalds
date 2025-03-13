'use client';

import { ClockIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import Products from '@/app/[slug]/menu/components/products';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  MenuCategoryWithProducts,
  RestaurantWithCategoriesAndProducts,
} from '@/types/restaurant';

interface Props {
  restaurant: RestaurantWithCategoriesAndProducts;
}

export default function RestaurantCategories({ restaurant }: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategoryWithProducts>(restaurant.menuCategories[0]);

  function handleCategoryClick(category: MenuCategoryWithProducts) {
    setSelectedCategory(category);
  }

  function getCategoryButtonVariant(category: MenuCategoryWithProducts) {
    return category === selectedCategory ? 'default' : 'secondary';
  }

  return (
    <div className="relative -mt-5 rounded-t-3xl border bg-white shadow-lg">
      <div className="flex flex-col p-5">
        <div className="flex items-center gap-3">
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
              variant={getCategoryButtonVariant(category)}
              size={'sm'}
              className="rounded-full"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
      <Products slug={restaurant.slug} products={selectedCategory.products} />
    </div>
  );
}
