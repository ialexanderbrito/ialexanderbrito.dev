import dayjs from 'dayjs';

export function calcDuration(
  startedAt: string,
  finishedAt: Date | null | string,
) {
  const durationXP = dayjs(finishedAt).diff(dayjs(startedAt), 'month');
  if (durationXP >= 12) {
    const years = Math.floor(durationXP / 12);
    const months = durationXP % 12;
    return `${years} ${years > 1 ? 'anos' : 'ano'} e ${months} ${months > 1 ? 'meses' : 'mês'}`;
  } else {
    return `${durationXP} ${durationXP > 1 ? 'meses' : 'mês'}`;
  }
}
