import { ConsumptionMethod } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  slug: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
}

export default function ConsumptionMethodCard({
  slug,
  buttonText,
  imageAlt,
  imageSrc,
  option,
}: Props) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <Image src={imageSrc} alt={imageAlt} width={78} height={78} />
        <Button variant={'secondary'} className="rounded-full" asChild>
          <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
