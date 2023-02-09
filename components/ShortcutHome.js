import { useState, useEffect } from 'react';

import { useKBar } from 'kbar';

import { ButtonPrimary } from '../components/ButtonPrimary';

import Intl from '../i18n';

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
          {Intl.text('INICIAL_MOBILE')} →
        </ButtonPrimary>
      );
    } else if (isMac) {
      return (
        <ButtonPrimary as="button" onClick={query.toggle}>
          {Intl.text('INICIAL_PRESSIONE')} <kbd>⌘</kbd> <kbd>K</kbd>{' '}
          {Intl.text('INICIAL_INICIAR')} →
        </ButtonPrimary>
      );
    } else {
      return (
        <ButtonPrimary as="button" onClick={query.toggle}>
          {Intl.text('INICIAL_PRESSIONE')} <kbd>ctrl</kbd> <kbd>K</kbd>{' '}
          {Intl.text('INICIAL_INICIAR')} →
        </ButtonPrimary>
      );
    }
  }

  return <div />;
}
