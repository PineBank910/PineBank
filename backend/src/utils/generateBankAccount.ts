export function generateBankAccountNumber(): string {
  const bankCode = "9999";
  const accountBase = Math.floor(1000000 + Math.random() * 9000000);
  return `${bankCode}${accountBase}`;
}

export const generateRandomNumber = (length: number): string => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
};