import { Trash2Icon } from 'lucide-react';
import { useContext } from 'react';

import { Button } from '@/components/ui/button';
import { CartContext } from '@/context/cart';

interface Props {
  productId: string;
}

export default function RemoveCartProductButton({ productId }: Props) {
  const { removeProduct } = useContext(CartContext);

  function handleRemoveProduct() {
    removeProduct(productId);
  }

  return (
    <Button
      variant={'outline'}
      className="size-6 rounded-lg p-0 sm:size-8"
      onClick={handleRemoveProduct}
    >
      <Trash2Icon />
    </Button>
  );
}
