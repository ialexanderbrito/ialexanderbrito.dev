export function formatLastPlayed(lastPlayed?: string): string {
  const now = new Date();
  const lastPlayedDate = new Date(lastPlayed ?? 0);
  const diffInMs = now.getTime() - lastPlayedDate.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `há ${diffInMinutes} minutos`;
  } else if (diffInHours < 24) {
    return `há ${diffInHours} horas`;
  } else if (diffInDays === 1) {
    return `há 1 dia`;
  } else {
    return `há ${diffInDays} dias`;
  }
}
