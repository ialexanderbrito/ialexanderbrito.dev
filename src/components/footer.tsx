import { HeartEasterEgg } from '@/app/eastereggs';
import {
  Github01Icon,
  Linkedin02Icon,
  Mail01Icon,
  NewTwitterIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full mt-auto select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="border-t border-border/30 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground text-center sm:text-left">
          {/* Left: Easter egg & Copyright unificados */}
          <HeartEasterEgg />

          {/* Right: Redes sociais */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Link
              href="https://github.com/ialexanderbrito"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors touch-manipulation"
              title="GitHub"
            >
              <HugeiconsIcon icon={Github01Icon} size={16} strokeWidth={1.5} />
            </Link>
            <Link
              href="https://linkedin.com/in/ialexanderbrito"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors touch-manipulation"
              title="LinkedIn"
            >
              <HugeiconsIcon
                icon={Linkedin02Icon}
                size={16}
                strokeWidth={1.5}
              />
            </Link>
            <Link
              href="https://x.com/ialexanderbrito"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors touch-manipulation"
              title="X / Twitter"
            >
              <HugeiconsIcon
                icon={NewTwitterIcon}
                size={16}
                strokeWidth={1.5}
              />
            </Link>
            <Link
              href="mailto:eu@ialexanderbrito.dev"
              className="p-2 sm:p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors touch-manipulation"
              title="E-mail"
            >
              <HugeiconsIcon icon={Mail01Icon} size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
