'use client';

import { HomeIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function HomeButton() {
  const router = useRouter();
  function handleBackClick() {
    router.push('/');
  }

  return (
    <Button
      variant={'secondary'}
      size={'icon'}
      className="rounded-full"
      onClick={handleBackClick}
    >
      <HomeIcon />
    </Button>
  );
}
