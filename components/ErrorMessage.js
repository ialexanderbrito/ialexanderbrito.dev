import { Box } from './Box';
import ShortcutError from './ShortcutError';

export default function ErrorMessage({ code }) {
  let title = '500';
  let description = 'Algo não está certo.';

  if (code === 404) {
    title = '404';
    description = 'Esta página não existe.';
  }

  return (
    <Box css={{ textAlign: 'center' }}>
      <h1>{title}</h1>
      <ShortcutError />
      <p>{description}</p>
    </Box>
  );
}
