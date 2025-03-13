import Image from 'next/image';

import OrderStatusBadge from '@/app/orders/components/order-status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { OrderWithProductsAndRestaurant } from '@/types/order';

interface Props {
  order: OrderWithProductsAndRestaurant;
}

export default function OrderItem({ order }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="space-y-4">
          <OrderStatusBadge orderStatus={order.status} />
          <div className="flex items-center gap-2">
            <Image
              src={order.restaurant.avatarImageUrl}
              alt={order.restaurant.name}
              height={20}
              width={20}
            />
            <p>{order.restaurant.name}</p>
          </div>
        </CardTitle>
        <CardContent className="space-y-3 p-0 text-sm">
          <div className="space-y-4 border-y py-3">
            {order.orderProducts.map((orderProduct) => (
              <div key={orderProduct.id} className="flex items-center gap-2">
                <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground text-xs text-white">
                  {orderProduct.quantity}
                </div>
                <span>{orderProduct.product.name}</span>
              </div>
            ))}
          </div>
          <p>{formatPrice(order.totalInCents)}</p>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
