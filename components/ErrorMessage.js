import { Box } from './Box';
import ShortcutError from './ShortcutError';

import Intl from '../i18n';

export default function ErrorMessage({ code }) {
  let title = '500';
  let description = Intl.text('ERROR_500');

  if (code === 404) {
    title = '404';
    description = Intl.text('ERROR_404');
  }

  return (
    <Box css={{ textAlign: 'center' }}>
      <h1>{title}</h1>
      <ShortcutError />
      <p>{description}</p>
    </Box>
  );
}
