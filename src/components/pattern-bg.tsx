import * as React from 'react';

type PatternProps = {
  variant?: 'radial' | 'dots' | 'checkered';
};

export const PatternBackground = ({ variant = 'radial' }: PatternProps) => {
  return (
    <div
      aria-hidden="true"
      data-variant={variant}
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
    >
      {/* Top subtle radial spotlight */}
      <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(161,161,170,0.08),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)] blur-2xl" />

      {/* Subtle vignette/secondary ambient glow */}
      <div className="absolute top-[40%] right-[-200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(161,161,170,0.04),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02),transparent_70%)] blur-3xl" />

      {/* Optional ultra-fine ambient dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.12] dark:opacity-[0.06] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};
