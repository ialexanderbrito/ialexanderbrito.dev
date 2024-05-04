import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ZoomIn } from 'lucide-react';
import Image from 'next/image';

interface DialogImageProps {
  src: string;
  alt: string;
}

export function DialogImage({ src, alt }: DialogImageProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="link" size="icon" className="absolute -top-1 -right-1 text-white">
          <ZoomIn size={18} />
        </Button>
        <Image src={src} alt={alt} width={500} height={500} className="cursor-zoom-in" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <Image src={src} alt={alt} width={1920} height={1080} />
      </DialogContent>
    </Dialog>
  );
}
