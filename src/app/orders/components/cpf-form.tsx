'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
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
import { isValidCpf, removeCpfPunctuation } from '@/lib/cpf';

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(1, { message: 'Campo obrigatório' })
    .refine((value) => isValidCpf(value), { message: 'CPF inválido' }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function CpfForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: '',
    },
    shouldUnregister: true,
  });

  function handleCancel() {
    router.back();
  }

  async function onSubmit(data: FormSchema) {
    try {
      startTransition(async () => {
        router.replace(`${pathname}?cpf=${removeCpfPunctuation(data.cpf)}`);
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Drawer open>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Pedidos por CPF</DrawerTitle>
            <DrawerDescription>
              Digite seu CPF abaixo para visualizar os pedidos.
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 p-4"
            >
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
                Confirmar
                {isPending && <Loader2Icon className="animate-spin" />}
              </Button>
            </form>
          </Form>
          <DrawerFooter className="pt-0">
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
