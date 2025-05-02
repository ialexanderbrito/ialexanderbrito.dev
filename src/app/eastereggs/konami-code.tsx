'use client';

import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import { toast } from '@/hooks';

const konamiKeys = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function KonamiCodeEasterEgg() {
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (!konamiKeys.includes(key)) return setKeysPressed([]);

      setKeysPressed((prev) => [...prev, key].slice(-konamiKeys.length));
    };

    const checkKonamiCode = () => {
      if (JSON.stringify(keysPressed) === JSON.stringify(konamiKeys)) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        setShowConfetti(true);
        toast({
          title: '🎮 Código Konami',
          description:
            'Esse é apenas um dos easter eggs que você pode encontrar por aqui! Será que você consegue encontrar todos? 🤔',
          duration: 10000,
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    checkKonamiCode();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [keysPressed]);

  if (showConfetti)
    return (
      <div className="fixed inset-0 z-50 pointer-events-none">
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={700}
          gravity={0.2}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      </div>
    );

  return null;
}
