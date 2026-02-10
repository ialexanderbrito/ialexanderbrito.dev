import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  House,
  MagnifyingGlass,
} from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

export default function Custom404() {
  return (
    <main className="max-w-(--breakpoint-lg) mx-auto px-4">
      <section className="min-h-[85vh] flex flex-col justify-center items-center animate-fade-in">
        {/* 404 Visual */}
        <div className="relative mb-8">
          <div className="text-[10rem] md:text-[14rem] font-bold text-muted-foreground/10 select-none leading-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-primary/10 p-6 backdrop-blur-sm border border-primary/20">
              <MagnifyingGlass
                className="w-12 h-12 md:w-16 md:h-16 text-primary"
                weight="duotone"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-3xl md:text-4xl font-bold">
            Página não encontrada
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Parece que você se perdeu no caminho. A página que você está
            procurando não existe ou foi movida.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button asChild variant="default" className="rounded-full px-6">
            <Link href="/" className="flex items-center gap-2">
              <House className="w-4 h-4" weight="bold" />
              Ir para o início
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="/projects" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Ver projetos
            </Link>
          </Button>
        </div>

        {/* Suggestions Card */}
        <div className="mt-12 rounded-xl border border-border/50 bg-card/30 p-6 max-w-md w-full">
          <h3 className="text-sm font-semibold mb-3">
            Talvez você esteja procurando:
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Sobre mim', href: '/about' },
              { label: 'Projetos', href: '/projects' },
              { label: 'Tecnologias', href: '/tech' },
              { label: 'Contato', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full bg-muted/50 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
