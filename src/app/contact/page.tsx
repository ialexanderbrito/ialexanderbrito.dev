import { ContactForm } from '@/components/contact-form';
import Metadata from 'next';
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

export default async function Contact() {
  return (
    <main className="max-w-screen-lg mx-auto px-4">
      <section className="flex flex-col sm:h-[77vh]">
        <h1 className="text-4xl font-bold mt-8 mb-4">Contato</h1>

        <div className="flex flex-row items-center text-muted-foreground">
          <span>
            Se você deseja entrar em contato comigo para discutir oportunidades de colaboração, projetos de código
            aberto, oportunidades de emprego, entre em contato pelo email{' '}
            <Link
              href="mailto:eu@ialexanderbrito.dev"
              className="dark:text-white underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              eu@ialexanderbrito.dev
            </Link>
            {' '}
            {' '}ou pelo Linkedin{' '}
            <Link
              href="https://linkedin.com/in/ialexanderbrito"
              className="dark:text-white underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              @ialexanderbrito
            </Link>
            .
          </span>
        </div>

        <h3 className="text-2xl font-bold mt-8 mb-4">Me envie um email </h3>
        <ContactForm />
      </section>
    </main>
  );
}
