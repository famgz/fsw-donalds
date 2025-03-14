import { OrderStatus } from '@prisma/client';

import { orderStatusMap } from '@/constants/order-status';
import { cn } from '@/lib/utils';

interface Props {
  orderStatus: OrderStatus;
}

export default function OrderStatusBadge({ orderStatus }: Props) {
  return (
    <div
      className={cn(
        'w-fit rounded-full bg-gray-400 px-2 py-1 text-[10px] font-medium text-white',
        {
          'bg-yellow-100 text-yellow-600':
            orderStatus === OrderStatus.IN_PREPARATION,
          'bg-green-500 text-white': orderStatus === OrderStatus.FINISHED,
          'bg-red-100 text-red-600': orderStatus === OrderStatus.CANCELED,
        },
      )}
    >
      {orderStatusMap[orderStatus] || ''}
    </div>
  );
}
