import { ScrollTextIcon } from 'lucide-react';
import { patternFormatter } from 'react-number-format';

import CpfForm from '@/app/orders/components/cpf-form';
import OrdersList from '@/app/orders/components/order-list';
import BackButton from '@/components/back-button';
import HomeButton from '@/components/home-button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { isValidCpf } from '@/lib/cpf';
import { getCompleteOrdersByCpf } from '@/services/order';

interface Props {
  searchParams: SearchParamsProps;
}

export default async function OrdersPage({ searchParams }: Props) {
  const cpf = (await searchParams).cpf;

  if (!cpf || !isValidCpf(cpf)) return <CpfForm />;

  const orders = await getCompleteOrdersByCpf(cpf);

  return (
    <div className="expand gap-6 p-5">
      <div className="flex justify-between">
        <BackButton />
        <HomeButton />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ScrollTextIcon />
          <h2 className="text-lg font-semibold">Meus Pedidos</h2>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          CPF {patternFormatter(cpf, { format: '###.###.###-##' })}
        </span>
      </div>
      <ScrollArea className="h-20 flex-auto">
        <OrdersList orders={orders} />
      </ScrollArea>
    </div>
  );
}
