export function generateBankAccountNumber(): string {
  const bankCode = "321";
  const branchCode = Math.floor(1000 + Math.random() * 9000);
  const accountBase = Math.floor(10000000 + Math.random() * 90000000);
  return `${bankCode}${branchCode}${accountBase}`;
}
