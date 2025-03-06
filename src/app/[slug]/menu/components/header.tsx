'use client';

import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface Props {
  coverImageUrl: string;
}

export default function RestaurantHeader({ coverImageUrl }: Props) {
  const router = useRouter();
  function handleBackClick() {
    router.back();
  }
  return (
    <div className="relative flex h-[250px] w-full justify-between p-3">
      <Button
        variant={'secondary'}
        size={'icon'}
        className="rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button variant={'secondary'} size={'icon'} className="rounded-full">
        <ScrollTextIcon />
      </Button>
      <Image
        src={coverImageUrl}
        alt="Imagem restaurante"
        fill
        className="absolute -z-10 object-cover"
      />
    </div>
  );
}
