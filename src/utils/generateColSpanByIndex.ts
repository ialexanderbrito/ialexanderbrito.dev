const invertColSpanIndex = [2, 3, 6, 7, 10, 11];

export const generateColSpanByIndex = (index: number, totalItems?: number) => {
  // Para 5 itens: padrão especial para melhor distribuição
  if (totalItems === 5) {
    const pattern = ['span 2', 'span 1', 'span 1', 'span 2', 'span 3'];
    return pattern[index] || 'span 1';
  }

  // Para outros casos, usa o padrão original
  if (invertColSpanIndex.includes(index)) {
    return index % 2 === 0 ? 'span 1' : 'span 2';
  }

  return index % 2 === 0 ? 'span 2' : 'span 1';
};
