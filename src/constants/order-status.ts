import { OrderStatus } from '@prisma/client';

export const orderStatusMap = {
  [OrderStatus.PENDING]: 'Pendente',
  [OrderStatus.IN_PREPARATION]: 'Em preparo',
  [OrderStatus.FINISHED]: 'Finalizado',
  [OrderStatus.CANCELED]: 'Cancelado',
};
