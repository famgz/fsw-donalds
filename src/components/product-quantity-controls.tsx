import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface Props {
  quantity: number;
  handleDecreaseQuantity: () => void;
  handleIncreaseQuantity: () => void;
}

export default function ProductQuantityControls({
  quantity,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
}: Props) {
  return (
    <div className="flex items-center gap-3 text-center">
      <Button
        variant={'outline'}
        className="size-6 rounded-lg p-0 sm:size-8"
        onClick={handleDecreaseQuantity}
        disabled={quantity <= 1}
      >
        <ChevronLeftIcon />
      </Button>
      <span className="inline-block w-4 sm:w-6 sm:text-lg">{quantity}</span>
      <Button
        variant={'destructive'}
        className="size-6 rounded-lg p-0 sm:size-8"
        onClick={handleIncreaseQuantity}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
}
