export function scrollToTop() {
  const isServer = typeof window === 'undefined';

  if (isServer) return undefined;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
