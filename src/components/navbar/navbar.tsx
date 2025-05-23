'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { LanguageSwitcher } from './language-switcher';
import { SignInButton } from './sign-in-button';
import { UserDropdown } from './user-dropdown';

import * as m from '@/paraglide/messages';

export function Navbar() {
  const { data: session } = useSession();
  console.log('✅ Sessão:', session);

  return (
    <header className="w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-mono text-lg font-bold">
          {m.app_name()}
        </Link>
        <div className="flex items-center gap-2">
          {session?.user ? (
            <UserDropdown session={session} />
          ) : (
            <SignInButton />
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
