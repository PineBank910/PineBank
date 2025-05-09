import { TransactionType } from "@/app/types";
import jsPDF from "jspdf";

export const downloadPDF = (transactions:TransactionType[]) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Transaction Report", 20, 20);
  doc.setFontSize(12);

  let y = 30;
    transactions.forEach((transaction) => {
      doc.text(
        `Reference: ${transaction.reference} | Amount: ${transaction.amount}₮`,
        20,
        y
      );
      y += 10;
      doc.text(`Balance: ${transaction.runningBalance}₮`, 20, y);
      y += 10;
    });
    y += 5;

  doc.save("transaction_report.pdf");
};
