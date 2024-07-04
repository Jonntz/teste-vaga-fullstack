export const formatToBRL = (valueBRL: number): string => {
  const formattedValueToBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueBRL);
  
  return formattedValueToBRL;
};