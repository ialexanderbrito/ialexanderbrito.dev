import { HeartEasterEgg } from '@/app/eastereggs';
import { Button } from '@/components/ui/button';
import { fetchHygraph } from '@/graphql/client';
import { GET_SOCIALS } from '@/graphql/queries';
import { SocialsResponse } from '@/interfaces/socials';
import Link from 'next/link';

import { TooltipMessage } from './tooltip';

const getSocials = async (): Promise<SocialsResponse> =>
  fetchHygraph(GET_SOCIALS);

export async function Footer() {
  const { socials } = await getSocials();

  return (
    <footer className="w-full mt-12 border-t border-border/50 bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-col gap-10">
          {/* Info e Socials */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-3">
                <img
                  src="/favicon.png"
                  alt="Logo"
                  className="w-8 h-8"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold">Alexander</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Front-end Developer & Mobile Developer
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {socials.map((social) => (
                <TooltipMessage key={social.id} title={`Abrir ${social.name}`}>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 rounded-full transition-all duration-300 hover:scale-110 hover:bg-accent/50 p-0 overflow-visible"
                  >
                    <Link
                      href={social.url}
                      aria-label={social.name}
                      target={social.target ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-full w-full"
                    >
                      <svg
                        dangerouslySetInnerHTML={{ __html: social.logoSvg }}
                        className="w-5 h-5 fill-current shrink-0"
                        viewBox="0 0 24 24"
                      />
                    </Link>
                  </Button>
                </TooltipMessage>
              ))}
            </div>
          </div>

          {/* Links internos */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-border/50">
            <nav className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-muted-foreground">
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="hover:text-foreground transition-colors"
              >
                Sobre
              </Link>
              <Link
                href="/projects"
                className="hover:text-foreground transition-colors"
              >
                Projetos
              </Link>
              <Link
                href="/tech"
                className="hover:text-foreground transition-colors"
              >
                Tecnologias
              </Link>
              <Link
                href="/contact"
                className="hover:text-foreground transition-colors"
              >
                Contato
              </Link>
            </nav>

            <HeartEasterEgg />
          </div>
        </div>
      </div>
    </footer>
  );
}
