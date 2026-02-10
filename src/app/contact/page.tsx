import { ContactForm } from '@/components/contact-form';
import {
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import Link from 'next/link';

const thumbnail = {
  url: 'https://ialexanderbrito.dev/contact.jpeg',
  width: 1200,
  height: 630,
  alt: 'Contact',
};

const defaultMetadata = {
  title: 'Contato',
  description:
    'Entre em contato comigo para discutir oportunidades de colaboração, projetos de código aberto, oportunidades de emprego ou apenas para dizer olá!',
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
    siteName: 'Contato',
  },
};

const socials = [
  {
    name: 'Email',
    description: 'eu@ialexanderbrito.dev',
    href: 'mailto:eu@ialexanderbrito.dev',
    icon: EnvelopeSimple,
  },
  {
    name: 'LinkedIn',
    description: '@ialexanderbrito',
    href: 'https://linkedin.com/in/ialexanderbrito',
    icon: LinkedinLogo,
  },
  {
    name: 'GitHub',
    description: '@ialexanderbrito',
    href: 'https://github.com/ialexanderbrito',
    icon: GithubLogo,
  },
  {
    name: 'X (Twitter)',
    description: '@ialexanderbrito',
    href: 'https://x.com/ialexanderbrito',
    icon: XLogo,
  },
];

const reasons = [
  'Oportunidades de trabalho ou freelance',
  'Colaboração em projetos open source',
  'Parcerias e networking',
  'Dúvidas sobre meus projetos',
  'Ou só pra trocar uma ideia!',
];

export default async function Contact() {
  return (
    <main className="max-w-(--breakpoint-lg) mx-auto px-4">
      {/* Hero Section */}
      <section className="flex flex-col justify-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold">Vamos conversar?</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Adoro conhecer pessoas novas e ouvir sobre seus projetos. Se você tem
          uma ideia, uma pergunta ou só quer bater um papo, ficarei feliz em
          responder!
        </p>
      </section>

      {/* Main Content */}
      <section className="grid lg:grid-cols-5 gap-12 pb-16">
        {/* Left Side - Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Reasons to contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Como posso ajudar?</h3>
            <ul className="space-y-3">
              {reasons.map((reason, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Outras formas de contato
            </h3>
            <div className="grid gap-3">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card hover:border-border transition-all duration-200"
                >
                  <div className="p-2.5 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                    <social.icon
                      size={20}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{social.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {social.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:col-span-3">
          <div className="rounded-2xl border border-border/50 bg-card/30 p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-2">Envie uma mensagem</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Respondo geralmente em até 24 horas.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
