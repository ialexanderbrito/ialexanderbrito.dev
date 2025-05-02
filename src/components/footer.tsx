import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { fetchHygraph } from '@/graphql/client';
import { GET_SOCIALS } from '@/graphql/queries';
import { SocialsResponse } from '@/interfaces/socials';
import { Heart } from 'lucide-react';
import Link from 'next/link';

import { TooltipMessage } from './tooltip';

const getSocials = async (): Promise<SocialsResponse> => fetchHygraph(GET_SOCIALS);

const currentYear = new Date().getFullYear();

export async function Footer() {
  const { socials } = await getSocials();

  return (
    <footer className="w-full py-6 mt-12 border-t border-border/30 bg-background">
      <div className="mx-auto max-w-5xl px-5 lg:px-0">
        <div className="flex flex-col gap-6">
          {/* Links e Socials */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Alexander</h3>
              <p className="text-sm text-muted-foreground">Front-end Developer & Mobile Developer</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {socials.map((social) => (
                <TooltipMessage key={social.id} title={`Abrir ${social.name}`}>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 rounded-full transition-all duration-300 hover:scale-110 hover:bg-accent/50 p-0"
                  >
                    <Link
                      href={social.url}
                      aria-label={social.name}
                      target={social.target ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-full w-full"
                    >
                      <svg dangerouslySetInnerHTML={{ __html: social.logoSvg }} className="w-6 h-6 fill-current" />
                    </Link>
                  </Button>
                </TooltipMessage>
              ))}
            </div>
          </div>

          <Separator className="opacity-50" />

          {/* Links internos */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/about" className="hover:text-foreground transition-colors">
                Sobre
              </Link>
              <Link href="/projects" className="hover:text-foreground transition-colors">
                Projetos
              </Link>
              <Link href="/tech" className="hover:text-foreground transition-colors">
                Tecnologias
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contato
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>por Alexander © {currentYear}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
