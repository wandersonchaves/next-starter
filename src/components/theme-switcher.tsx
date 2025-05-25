'use client';

import { ComponentProps } from 'react';
import { useTheme } from 'next-themes';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import * as m from '@/paraglide/messages';

type ThemeSwitcherProps = {
  className?: ComponentProps<'button'>['className'];
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { setTheme, resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      className={className}
      variant="secondary"
      size="icon"
      aria-label={m.theme_toggle_label()}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Icons.sun className="hidden dark:inline-block" />
      <Icons.moon className="inline-block dark:hidden" />
    </Button>
  );
};
