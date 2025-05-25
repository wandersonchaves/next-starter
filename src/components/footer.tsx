import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="text-muted-foreground w-full border-t py-4 text-center text-sm">
      © {new Date().getFullYear()} —{' '}
      <Button
        variant="link"
        className="text-muted-foreground hover:text-primary p-0"
        asChild
      >
        <a
          href="https://wandersonchaves.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wanderson Chaves
        </a>
      </Button>
    </footer>
  );
};
