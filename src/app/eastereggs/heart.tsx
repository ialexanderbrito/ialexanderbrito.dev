'use client';

import { useEffect, useState } from 'react';

import { useLanguage } from '@/context/language';
import { toast } from '@/hooks';
import { getSessionStorageItem } from '@/utils/getSessionStorageItem';
import { FavouriteIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export function HeartEasterEgg() {
  const { locale } = useLanguage();
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
        title:
          locale === 'en'
            ? '💖 Easter Egg Discovered!'
            : '💖 Easter Egg Encontrado!',
        description:
          locale === 'en'
            ? 'You discovered the secret heart in 7 clicks!'
            : 'Você encontrou o coração secreto com 7 cliques!',
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
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground select-none">
      <span>{locale === 'en' ? 'Made with' : 'Feito com'}</span>
      <HugeiconsIcon
        icon={FavouriteIcon}
        size={14}
        strokeWidth={1.5}
        className={`cursor-pointer ${isFilled ? 'fill-red-500' : ''} text-red-500 transition-transform active:scale-125`}
        onClick={handleHeartClick}
      />
      <span>
        {locale === 'en' ? 'by Alexander' : 'por Alexander'} © {currentYear}
      </span>
    </div>
  );
}
