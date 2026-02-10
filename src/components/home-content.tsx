'use client';

import HomeBlurText from '@/components/home-blur-text';
import { Button } from '@/components/ui/button';
import { Highlighter } from '@/components/ui/highlighter';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HomeContent() {
  return (
    <section className="flex flex-col justify-center items-center min-h-[85vh] relative z-10">
      <div className="space-y-6 text-center max-w-2xl animate-fade-in">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-muted-foreground">Opa, eu sou</span>
          <br />
          <span className="inline-flex justify-center w-full">
            <HomeBlurText text="Alexander" className="font-extrabold" />
          </span>
        </h1>

        {/* Subtitle with Highlighter */}
        <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-xl mx-auto">
          Desenvolvedor apaixonado por criar{' '}
          <Highlighter action="highlight" color="#a1a1aa40" isView>
            interfaces
          </Highlighter>{' '}
          e{' '}
          <Highlighter action="underline" color="#a1a1aa" isView>
            experiências incríveis
          </Highlighter>
          .
        </p>

        {/* Role Tags */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {['Front-end', 'Mobile', 'React', 'Next.js'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-muted/50 text-muted-foreground border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/projects">
            <Button
              variant="default"
              className="group rounded-full px-6 py-6 text-base transition-all hover:shadow-lg cursor-pointer"
            >
              Ver projetos
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/about">
            <Button
              variant="outline"
              className="rounded-full px-6 py-6 text-base transition-all hover:bg-muted/50 cursor-pointer"
            >
              Sobre mim
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
