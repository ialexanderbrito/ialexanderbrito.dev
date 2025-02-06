import type { Metadata } from 'next';

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
    <main className="max-w-(--breakpoint-lg) mx-auto px-4">
      <section className="h-[77vh] flex flex-col justify-center items-center dark:[mask-image:radial-gradient(450px_circle_at_center,white,transparent)]">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold md:leading-relaxed text-center">
          Opa, eu sou Alexander -- Front-end Developer & Mobile Developer
        </h2>

        <h2 className="text-md font-regular text-muted-foreground text-center">
          um desenvolvedor de software apaixonado por interfaces e experiências incríveis.
        </h2>
      </section>
    </main>
  );
}
