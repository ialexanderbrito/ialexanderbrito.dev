import { Fragment, Suspense } from 'react';

import { CompanyThanksDialog } from './company-thanks';
import { ConsoleEasterEgg } from './console-easter-egg';
import { HeartEasterEgg } from './heart';
import { KonamiCodeEasterEgg } from './konami-code';

export function EasterEggs() {
  return (
    <Fragment>
      <ConsoleEasterEgg />
      <KonamiCodeEasterEgg />
      <Suspense>
        <CompanyThanksDialog />
      </Suspense>
    </Fragment>
  );
}

export { HeartEasterEgg };
