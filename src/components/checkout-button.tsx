import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
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
import { isValidCpf } from '@/lib/cpf';

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
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      cpf: '',
    },
    shouldUnregister: true,
  });

  function onSubmit(data: FormSchema) {
    console.log(data);
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-full rounded-full">Finalizar Pedido</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
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
              <Button type="submit" className="w-full rounded-full">
                Finalizar
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
