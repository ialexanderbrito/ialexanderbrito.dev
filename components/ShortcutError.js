import { useState, useEffect } from 'react';

import { ButtonPrimary } from '../components/ButtonPrimary';

import Intl from '../i18n';

export default function ShortcutError() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

    if (isMobile) {
      return (
        <ButtonPrimary as="a" href="/">
          {Intl.text('ERRO_MOBILE')} →
        </ButtonPrimary>
      );
    }

    return (
      <ButtonPrimary as="a" href="/">
        {Intl.text('INICIAL_PRESSIONE')} <kbd>G</kbd> <kbd>H</kbd>{' '}
        {Intl.text('ERRO_INICIO')} →
      </ButtonPrimary>
    );
  }

  return <div />;
}
