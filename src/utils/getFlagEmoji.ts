export function getFlagEmoji(country: string) {
  if (!country) return String.fromCodePoint(127397 + '🌍'.charCodeAt(0));

  const codePoints = country
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
