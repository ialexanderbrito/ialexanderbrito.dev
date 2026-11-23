import { EasterEggs } from '@/app/eastereggs';
import { Analytics } from '@/components/analytics';
import { ButtonTop } from '@/components/button-top';
import { Footer } from '@/components/footer';
import { JsonLd } from '@/components/json-ld';
import { Navbar } from '@/components/navbar';
import { PatternBackground } from '@/components/pattern-bg';
import { ThemeProvider } from '@/components/theme-provider';
import { siteConfig } from '@/config/site';
import { Locale } from '@/config/translations';
import { LanguageProvider } from '@/context/language';
import { ToasterProvider } from '@/context/toaster';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s • ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  generator: 'Next.js',
  keywords: siteConfig.keywords,
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'technology',
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
      'en-US': '/',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: [{ url: '/favicon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'profile',
    locale: siteConfig.locale,
    alternateLocale: siteConfig.localeAlternate,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    site: '@ialexanderbrito',
    creator: '@ialexanderbrito',
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const fontSans = Geist({ subsets: ['latin'], variable: '--font-sans' });
const fontMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as
    Locale | undefined;
  const locale: Locale = localeCookie === 'en' ? 'en' : 'pt_BR';

  return (
    <html
      lang={locale === 'en' ? 'en' : 'pt-BR'}
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} font-sans`}
    >
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="LLMs.txt"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms-full.txt"
          title="LLMs-full.txt"
        />
        <JsonLd />
        <Analytics />
      </head>
      <body className="bg-background antialiased overflow-x-hidden min-h-[100dvh]">
        <PatternBackground variant="checkered" />
        <NextTopLoader
          color="#a1a1aa"
          initialPosition={0.3}
          crawlSpeed={200}
          height={4}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider initialLocale={locale}>
            <div className="min-h-[100dvh] flex flex-col justify-between">
              <Navbar />
              <div className="flex-1 flex flex-col">{children}</div>
              <Footer />
            </div>
            <EasterEggs />
            <ToasterProvider />
            <ButtonTop />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
