'use client';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export function ContactForm() {
  const FormSchema = z.object({
    name: z.string().min(2, {
      message: 'Nome deve ter pelo menos 2 caracteres.',
    }),
    email: z.string().email({
      message: 'Email inválido.',
    }),
    subject: z.string().min(2, {
      message: 'Assunto deve ter pelo menos 2 caracteres.',
    }),
    message: z.string().min(10, {
      message: 'Mensagem deve ter pelo menos 10 caracteres.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit() {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.getValues()),
    });

    console.log('response', response);

    if (!response.ok) {
      toast({
        title: '❌ Erro ao enviar a mensagem',
        description: 'Por favor, tente novamente mais tarde.',
        duration: 5000,
      });
      return;
    }

    if (response.ok) {
      toast({
        title: '✅ Mensagem enviada com sucesso',
        description: 'Entrarei em contato em breve.',
        duration: 5000,
      });

      setTimeout(() => {
        form.reset();
      }, 1000);
    }
  }

  return (
    <Form {...form}>
      <form action={onSubmit} onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assunto</FormLabel>
              <FormControl>
                <Input placeholder="Assunto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} className="resize-none" placeholder="O que você gostaria de falar comigo?" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
