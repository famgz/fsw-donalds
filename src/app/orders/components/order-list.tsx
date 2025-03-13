import OrderItem from '@/app/orders/components/order-item';
import { OrderWithProductsAndRestaurant } from '@/types/order';

interface Props {
  orders: OrderWithProductsAndRestaurant[];
}

export default function OrdersList({ orders }: Props) {
  return (
    <div className="space-y-4">
      {orders &&
        orders.map((order) => <OrderItem key={order.id} order={order} />)}
    </div>
  );
}
