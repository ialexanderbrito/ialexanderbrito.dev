import { EasterEggs } from '@/app/eastereggs';
import { Analytics } from '@/components/analytics';
import { ButtonTop } from '@/components/button-top';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { PatternBackground } from '@/components/pattern-bg';
import { ThemeProvider } from '@/components/theme-provider';
import { siteConfig } from '@/config/site';
import { ToasterProvider } from '@/context/toaster';
import { Analytics as AnalyticsVercel } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `${siteConfig.name} • %s`,
  },
  description: siteConfig.description,
};

const fontSans = Manrope({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={fontSans.className}>
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <Analytics />
        <AnalyticsVercel />
      </head>
      <body className="bg-background antialiased pb-24">
        <PatternBackground variant="checkered" />
        <NextTopLoader color="#a1a1aa" initialPosition={0.3} crawlSpeed={200} height={4} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
          <EasterEggs />
          <ToasterProvider />
          <ButtonTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
