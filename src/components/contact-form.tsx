'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { LoadingSpinner } from './ui/spinner';

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
    message: z
      .string()
      .min(10, {
        message: 'Mensagem deve ter pelo menos 10 caracteres.',
      })
      .max(500, {
        message: 'Mensagem deve ter no máximo 500 caracteres.',
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

  const [messageLength, setMessageLength] = useState(0);

  async function onSubmit() {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.getValues()),
    });

    if (response.status === 429) {
      toast({
        title: '❌ Você está enviando muitas mensagens',
        description: 'Vai com calma, você pode tentar novamente mais tarde.',
        duration: 5000,
      });
      return;
    }

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

      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        action={onSubmit}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Seu nome"
                  {...field}
                  className={cn(
                    form.formState.errors.name && 'border-destructive',
                  )}
                />
              </FormControl>
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
                <Input
                  required
                  placeholder="Seu email"
                  {...field}
                  className={cn(
                    form.formState.errors.email && 'border-destructive',
                  )}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assunto *</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Assunto"
                  {...field}
                  className={cn(
                    form.formState.errors.subject && 'border-destructive',
                  )}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem *</FormLabel>
              <FormControl>
                <Textarea
                  required
                  placeholder="O que você gostaria de falar comigo?"
                  {...field}
                  maxLength={500}
                  onChange={(e) => {
                    field.onChange(e);
                    setMessageLength(e.target.value.length);
                  }}
                  className={cn(
                    'resize-none',
                    form.formState.errors.message && 'border-destructive',
                  )}
                />
              </FormControl>
              <div className="text-xs text-muted-foreground text-right">
                {500 - messageLength}{' '}
                {messageLength > 0 ? 'caracteres restantes' : 'caracteres'}
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">
          {form.formState.isSubmitting ? <LoadingSpinner /> : 'Enviar'}
        </Button>
      </form>
    </Form>
  );
}
