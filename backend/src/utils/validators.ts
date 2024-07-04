export const validateAndFormatCPF = (cpfString: string): boolean => {
  
  cpfString = cpfString.replace(/[^\d]+/g, '');
  if(cpfString.length !== 11){
    return false;
  }

  return true;
};

export const validateAndFormatCNPJ = (cnpjString: string): boolean => {
  cnpjString = cnpjString.replace(/[^\d]+/g, ''); 

  if (cnpjString.length !== 14) {
    return false
  }

  return true;
};