import { zodResolver } from '@hookform/resolvers/zod';
import { ConsumptionMethod } from '@prisma/client';
import { Loader2Icon } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CartContext } from '@/context/cart';
import { isValidCpf, removeCpfPunctuation } from '@/lib/cpf';
import { delay } from '@/lib/utils';
import { createOrder } from '@/services/order';

const formSchema = z.object({
  name: z.string().trim().min(1, { message: 'Campo obrigatório' }),
  cpf: z
    .string()
    .trim()
    .min(1, { message: 'Campo obrigatório' })
    .refine((value) => isValidCpf(value), { message: 'CPF inválido' }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CheckoutButton() {
  const params = useParams();
  const restaurantSlug = params.slug as string;
  const { products, clearCart } = useContext(CartContext);
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      cpf: '',
    },
    shouldUnregister: true,
  });

  async function onSubmit(data: FormSchema) {
    try {
      const consumptionMethod = searchParams.get(
        'consumptionMethod',
      ) as ConsumptionMethod;
      startTransition(async () => {
        await delay(1000);
        await createOrder({
          consumptionMethod,
          customerCpf: data.cpf,
          customerName: data.name,
          cartProducts: products,
          restaurantSlug,
        });
        setOpen(false);
        clearCart();
        toast.success('Pedido finalizado com sucesso!');
        router.push(`/orders?cpf=${removeCpfPunctuation(data.cpf)}`);
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full rounded-full">Finalizar Pedido</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Finalizar Pedido</DrawerTitle>
            <DrawerDescription>
              Preencha os campos abaixo para concluir a compra.
            </DrawerDescription>
          </DrawerHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        placeholder="Digite seu cpf..."
                        format="###.###.###-##"
                        customInput={Input}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full gap-2 rounded-full"
                disabled={isPending}
              >
                Finalizar
                {isPending && <Loader2Icon className="animate-spin" />}
              </Button>
            </form>
          </Form>

          <DrawerFooter className="mt-4 p-0 pb-6">
            <DrawerClose asChild>
              <Button variant="outline" className="rounded-full">
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
