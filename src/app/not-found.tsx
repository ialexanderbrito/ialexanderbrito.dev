import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Custom404() {
  return (
    <main className="max-w-screen-lg mx-auto px-4">
      <section className="h-[80vh] flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mt-8 mb-4">Página não encontrada</h1>

        <span className="flex-col gap-4 flex text-muted-foreground">
          A página que você tentou acessar não existe. Verifique o endereço digitado e tente novamente.
        </span>
        <Button className="mt-4" asChild>
          <Link href="/" className="flex items-center gap-2 mt-4">
            Voltar para a página inicial
          </Link>
        </Button>
      </section>
    </main>
  );
}
