import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { ZoomIn } from 'lucide-react';

interface DialogImageProps {
  src: string;
  alt: string;
}

export function DialogImage({ src, alt }: DialogImageProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="link" size="icon" className="absolute top-1 right-1 text-white w-4 h-4" asChild>
          <ZoomIn size={18} />
        </Button>
        <img src={src} alt={alt} className="cursor-zoom-in" loading="lazy" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogTitle>
          <VisuallyHidden>Visualização ampliada de {alt}</VisuallyHidden>
        </DialogTitle>
        <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />
      </DialogContent>
    </Dialog>
  );
}
