'use client';

import { Product, Restaurant } from '@prisma/client';
import { ChefHatIcon } from 'lucide-react';
import Image from 'next/image';
import { useContext, useState } from 'react';

import ProductQuantityControls from '@/components/product-quantity-controls';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CartContext } from '@/context/cart';
import { formatPrice } from '@/lib/utils';

interface Props {
  restaurant: Restaurant;
  product: Product;
}

export default function ProductDetails({ restaurant, product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { toggleCart, addProduct } = useContext(CartContext);

  function handleIncreaseQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecreaseQuantity() {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  }

  function handleAddToCart() {
    addProduct({ ...product, quantity });
    toggleCart();
  }

  return (
    <div className="-mt-4 flex flex-auto flex-col overflow-hidden rounded-t-3xl bg-white p-5 shadow-lg">
      <div className="flex items-center gap-1.5">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={32}
          height={32}
          className="rounded-full"
        />
        <p className="space-x-1 text-xs text-muted-foreground">
          {restaurant.name}
        </p>
      </div>
      <h2 className="mt-2 text-xl font-semibold">{product.name}</h2>
      <div className="mt-3 flex justify-between">
        <h3 className="text-xl font-semibold">
          {formatPrice(product.priceInCents)}
        </h3>
        <ProductQuantityControls
          quantity={quantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          handleIncreaseQuantity={handleIncreaseQuantity}
        />
      </div>
      <ScrollArea className="h-10 flex-auto">
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">Sobre</h4>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
        {product.ingredients.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-1">
              <ChefHatIcon size={18} />
              <h4 className="font-semibold">Ingredientes</h4>
            </div>
            <div className="text-sm text-muted-foreground">
              <ul className="list-disc px-5 text-sm text-muted-foreground">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </ScrollArea>
      <Button className="mt-6 w-full rounded-full" onClick={handleAddToCart}>
        Adicionar ao carrinho
      </Button>
    </div>
  );
}
