'use client';

import { ScrollTextIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function OrdersButton() {
  return (
    <Button
      variant={'secondary'}
      size={'icon'}
      className="rounded-full"
      asChild
    >
      <Link href={'/orders'}>
        <ScrollTextIcon />
      </Link>
    </Button>
  );
}
