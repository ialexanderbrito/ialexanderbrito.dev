import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import HomeBlurText from '@/components/home-blur-text';
import ShinyText from '@/components/ui/shiny-text';

const thumbnail = {
  url: 'https://ialexanderbrito.dev/og.jpeg',
  width: 1200,
  height: 630,
  alt: 'Home',
};

const defaultMetadata = {
  title: 'Alexander',
  description: 'Opa, eu sou Alexander -- Front-end Developer & Mobile Developer',
  images: [thumbnail],
};

export const metadata: Metadata = {
  ...defaultMetadata,
  twitter: {
    ...defaultMetadata,
    card: 'summary_large_image',
    site: '@ialexanderbrito',
    creator: '@ialexanderbrito',
  },
  openGraph: {
    ...defaultMetadata,
    type: 'website',
    url: 'https://ialexanderbrito.dev',
    siteName: 'Alexander',
  },
};

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-8 relative overflow-hidden">

      <section className="flex flex-col justify-center items-center min-h-[85vh] animate-fade-in relative z-10">
        <div className="space-y-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight flex flex-wrap items-center justify-center">
            <span>Opa, eu sou </span>
            <HomeBlurText
              text="Alexander"
              className="font-extrabold ml-2"
            />
          </h1>

          <h2 className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
            Front-end Developer & Mobile Developer, apaixonado por criar interfaces e experiências <span className="italic">incríveis</span>.
          </h2>

          <div className="pt-6">
            <Link href="/projects">
              <Button variant="outline" className="group rounded-full px-6 py-6 text-base transition-all hover:shadow-lg cursor-pointer">
                <ShinyText text="Conheça meus projetos" />
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
