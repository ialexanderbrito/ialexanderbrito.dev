import { Button } from '@/components/ui/button';
import { fetchHygraph } from '@/graphql/client';
import { GET_SOCIALS } from '@/graphql/queries';
import { SocialsResponse } from '@/interfaces/socials';
import Link from 'next/link';

const getSocials = async (): Promise<SocialsResponse> => fetchHygraph(GET_SOCIALS);

export async function Footer() {
  const { socials } = await getSocials();

  return (
    <footer className="mx-auto flex max-w-5xl flex-col justify-start gap-2 overflow-hidden py-5 px-5 lg:px-0">
      <div className="rounded-xl border bg-accent/50 dark:backdrop-blur-2xl text-accent-foreground">
        <div className="items-center m-0 flex justify-center p-5">
          <div className="grid grid-cols-5 items-center gap-3 md:flex md:gap-2">
            {socials.map((social) => (
              <Button asChild key={social.id} variant="outline" size="icon">
                <Link href={social.url} aria-label={social.name} target="_blank">
                  <div className="p-2 transition-all rounded-lg hover:bg-muted">
                    <svg dangerouslySetInnerHTML={{ __html: social.logoSvg }} className="w-6 h-6 fill-current" />
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
