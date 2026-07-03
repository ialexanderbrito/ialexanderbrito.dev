import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { X, ZoomIn } from 'lucide-react';

interface DialogImageProps {
  src: string;
  alt: string;
}

export function DialogImage({ src, alt }: DialogImageProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="rounded-full gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white border border-white/20 transition-all shadow-xl h-10 px-5 cursor-zoom-in"
        >
          <ZoomIn size={18} />
          <span className="font-medium text-sm tracking-wide">
            Ampliar imagem
          </span>
        </Button>
      </DialogTrigger>

      {/* Make DialogContent fit the image so the DialogOverlay (background) can receive outside clicks */}
      <DialogContent className="max-w-[95vw] w-fit h-fit p-0 border-0 bg-transparent shadow-none [&>button]:hidden">
        <DialogTitle>
          <VisuallyHidden>Visualização ampliada de {alt}</VisuallyHidden>
        </DialogTitle>

        <img
          src={src}
          alt={alt}
          className="w-auto h-auto max-w-[95vw] max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] select-none"
          loading="lazy"
        />

        {/* Subtle, minimalist close button */}
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[60]">
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} strokeWidth={1.5} />
              <span className="sr-only">Fechar ampliação</span>
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
