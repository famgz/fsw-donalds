'use client';

import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function BackButton() {
  const router = useRouter();
  function handleBackClick() {
    router.back();
  }

  return (
    <Button
      variant={'secondary'}
      size={'icon'}
      className="rounded-full"
      onClick={handleBackClick}
    >
      <ChevronLeftIcon />
    </Button>
  );
}
