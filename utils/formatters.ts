// formatters.ts — Indian Rupee (INR), Date, PAN, and Aadhaar formatting helpers.

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatCurrency = formatINR;

export const formatDateIN = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

export const formatDate = formatDateIN;

export const maskPAN = (pan: string): string => {
  if (!pan) return 'ABCXX1234X';
  const clean = pan.toUpperCase().trim();
  if (clean.length < 10) return 'ABCXX1234X';
  return `${clean.slice(0, 3)}XX${clean.slice(5, 9)}${clean.slice(-1)}`;
};

export const maskAadhaar = (aadhaar: string): string => {
  if (!aadhaar) return 'XXXX-XXXX-8492';
  const clean = aadhaar.replace(/\D/g, '');
  if (clean.length < 4) return 'XXXX-XXXX-8492';
  return `XXXX-XXXX-${clean.slice(-4)}`;
};

export const maskSSN = maskAadhaar;
