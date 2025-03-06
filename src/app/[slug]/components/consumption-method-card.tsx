import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
}

export default function ConsumptionMethodCard({
  buttonText,
  imageAlt,
  imageSrc,
}: Props) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <Image src={imageSrc} alt={imageAlt} width={78} height={78} />
        <Button variant={'secondary'} className="rounded-full">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
