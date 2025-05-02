'use client';

import BlurText from '@/components/ui/blur-text';

interface HomeBlurTextProps {
  text: string;
  className?: string;
}

export default function HomeBlurText({ text, className }: HomeBlurTextProps) {
  return (
    <BlurText
      text={text}
      delay={250}
      animateBy="letters"
      direction="top"
      className={className}
      onAnimationComplete={() => {
        console.log('Animation complete');
      }}
    />
  );
}
