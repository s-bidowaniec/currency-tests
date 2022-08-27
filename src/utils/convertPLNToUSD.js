export const convertPLNToUSD = (PLN) => {
  if(PLN == null || typeof PLN === 'string'){
    return NaN
  }
  else if (typeof PLN !== "number"){
    return 'Error'
  }
  const positivePLN = PLN < 0.0 ? 0.0 : PLN
  const PLNtoUSD = positivePLN / 3.5;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}