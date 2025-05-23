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
      <ThemeProvider attribute="class">
        <Navbar />
        {children}
        <ThemeSwitcher className="absolute bottom-5 right-5 z-10" />
        <Footer />
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}
