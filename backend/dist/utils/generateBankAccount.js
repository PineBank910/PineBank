"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBankAccountNumber = generateBankAccountNumber;
function generateBankAccountNumber() {
    const bankCode = "9999";
    const accountBase = Math.floor(1000000 + Math.random() * 9000000);
    return `${bankCode}${accountBase}`;
}
