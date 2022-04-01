import { useState, useEffect } from 'react';

import { useKBar } from 'kbar';

import { ButtonPrimary } from '../components/ButtonPrimary';

export default function ShortcutHome() {
  const { query } = useKBar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    const isMac = /(Mac)/i.test(navigator.userAgent);
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

    if (isMobile) {
      return (
        <ButtonPrimary as="button" onClick={query.toggle}>
          Clique para começar →
        </ButtonPrimary>
      );
    } else if (isMac) {
      return (
        <ButtonPrimary as="button" onClick={query.toggle}>
          Pressione <kbd>⌘</kbd> <kbd>K</kbd> para iniciar →
        </ButtonPrimary>
      );
    } else {
      return (
        <ButtonPrimary as="button" onClick={query.toggle}>
          Pressione <kbd>ctrl</kbd> <kbd>K</kbd> para iniciar →
        </ButtonPrimary>
      );
    }
  }

  return <div />;
}
