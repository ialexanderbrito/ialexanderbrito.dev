'use client';

import { useEffect, useState } from 'react';

import { toast } from '@/hooks';
import { getSessionStorageItem } from '@/utils/getSessionStorageItem';
import { Heart } from 'lucide-react';

export function HeartEasterEgg() {
  const currentYear = new Date().getFullYear();
  const [clickCount, setClickCount] = useState(0);
  const [isFilled, setIsFilled] = useState(false);
  const heartFoundKey = '@ialexanderbrito:heartEasterEggFound';

  const handleHeartClick = () => {
    if (getSessionStorageItem(heartFoundKey)) {
      setIsFilled(true);
      return;
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 7) {
      setIsFilled(true);
      sessionStorage.setItem(heartFoundKey, 'true');
      toast({
        title: '💖 Easter Egg Encontrado!',
        description: 'Você encontrou o coração secreto com 7 cliques!',
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsFilled(!!getSessionStorageItem(heartFoundKey));
    }
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground animate-fade-in">
      <span>Feito com</span>
      <Heart
        className={`w-4 h-4 ${isFilled ? 'fill-red-500' : ''} text-red-500 animate-pulse`}
        onClick={handleHeartClick}
      />
      <span>por Alexander © {currentYear}</span>
    </div>
  );
}
