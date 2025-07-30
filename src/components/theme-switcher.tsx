'use client';

import { ComponentProps } from 'react';
import { useTheme } from 'next-themes';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useMounted } from '@/hooks/use-mounted';
import * as m from '@/paraglide/messages';

type ThemeSwitcherProps = {
  className?: ComponentProps<'button'>['className'];
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const mounted = useMounted(); // ✅ usando o hook
  const { setTheme, resolvedTheme } = useTheme();

  // Evita renderização antes da montagem
  if (!mounted) return null;

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
