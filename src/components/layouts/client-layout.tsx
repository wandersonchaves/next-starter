'use client';

import { PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

import { Footer } from '../footer';
import { Navbar } from '../navbar/navbar';
import { ThemeProvider } from '../theme-provider';
import { ThemeSwitcher } from '../theme-switcher';
import { Toaster } from '../ui/toaster';

export function ClientLayout({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ThemeSwitcher className="fixed bottom-5 right-5 z-10" />
          <Toaster />
        </div>
      </ThemeProvider>
    </SessionProvider>
  );
}
