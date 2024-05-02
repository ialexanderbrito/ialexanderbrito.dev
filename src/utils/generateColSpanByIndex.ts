const invertColSpanIndex = [2, 3, 6, 7, 10, 11];

export const generateColSpanByIndex = (index: number) => {
  if (invertColSpanIndex.includes(index)) {
    return index % 2 === 0 ? 'span 1' : 'span 2';
  }

  return index % 2 === 0 ? 'span 2' : 'span 1';
};
