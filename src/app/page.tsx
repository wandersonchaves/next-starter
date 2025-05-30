'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { HeroForm } from '@/components/form';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import * as m from '@/paraglide/messages';

const Home = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <section className="container mt-10 flex flex-col items-center gap-3 text-center md:absolute md:left-1/2 md:top-1/2 md:mt-0 md:-translate-x-1/2 md:-translate-y-1/2">
      <h1 className="mb-1 font-mono text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        {m.nextjs_starter_template_headline()}
      </h1>
      <p className="text-muted-foreground max-w-2xl">
        {m.nextjs_starter_template_description()}
      </p>
      <div className="mt-1">
        <HeroForm />
      </div>
      <div className="mt-2 flex gap-4">
        <Button asChild>
          <Link
            href="https://github.com/wandersonchaves/next-starter/blob/main/README.md#getting-started"
            target="_blank"
          >
            {m.get_started()}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link
            href="https://github.com/wandersonchaves/next-starter"
            target="_blank"
          >
            <Icons.github className="mr-2 size-4" /> {m.github()}
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Home;
