export function getSessionStorageItem(key: string) {
  const isServer = typeof window === 'undefined';

  if (isServer) return undefined;

  return sessionStorage.getItem(key);
}
