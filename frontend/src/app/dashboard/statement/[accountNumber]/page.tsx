"use client";

import { useVisibility } from "@/context/visibilityContext";
import { axiosInstance } from "@/lib/addedAxiosInstance";
import axios from "axios";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import ChooseAccount from "../../transfer/_components/ChooseAccount";
import { CurrentUser } from "@/lib/currentUserContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRightIcon } from "lucide-react";
import { TransactionType } from "@/app/types";
import { groupTransactionsByDay } from "@/utils/filterByDay";
import { jsPDF } from "jspdf";
 

type Account = {
  accountNumber: string;
  balance: number;
};

const Page = () => {
  const [transactionInfo, setTransactionInfo] = useState<TransactionType[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [filter, setFilter] = useState<"ALL" | "CREDIT" | "DEBIT">("ALL");

  const params = useParams();
  const accountNumber = Array.isArray(params?.accountNumber)
    ? params.accountNumber[0]
    : params?.accountNumber;

  const { isVisible } = useVisibility();
  const context = useContext(CurrentUser);
  const currentUserData = context?.currentUserData;

  useEffect(() => {
    const getTransactionInfo = async () => {
      if (!accountNumber) {
        setError("Account not found.");
        return;
      }
      setLoading(true);
      try {
        const response = await axiosInstance.get<{
          transactions: TransactionType[];
        }>(`transaction/all/${accountNumber}`);
        setTransactionInfo(response.data.transactions);
        console.log("Fetched transactions:", response.data.transactions);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Axios error");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    getTransactionInfo();
  }, [accountNumber]);

  const filterByDays = (
    transactions: TransactionType[],
    days: number
  ): TransactionType[] => {
    const now = new Date();
    return transactions.filter((t) => {
      const txDate = new Date(t.timestamp);
      const diffTime = now.getTime() - txDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays <= days;
    });
  };

  const transactionsByDays = filterByDays(transactionInfo, 7);

  const filteredTransactions = transactionsByDays.filter((tx) => {
    if (filter === "ALL") return true;
    return tx.type === filter;
  });

  const groupedTransactions = groupTransactionsByDay(filteredTransactions);

  const totalIncome = filteredTransactions
    .filter((tx) => tx.type === "CREDIT")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalOutcome = filteredTransactions
    .filter((tx) => tx.type === "DEBIT")
    .reduce((sum, tx) => sum + tx.amount, 0);

  if (!context || !context.currentUserData) return <div>...Loading</div>;

  const { accounts } = currentUserData;

  if (!accounts || accounts.length === 0) {
    return <div>No accounts available</div>;
  }

  const account: Account | undefined = accounts.find(
    (acc: Account) => acc.accountNumber === accountNumber
  );

  const downloadPDF = () => {
    const doc = new jsPDF();
 
    doc.setFontSize(16);
    doc.text("Transaction Report", 20, 20);
    doc.setFontSize(12);
 
    let y = 30; // Starting Y position
    Object.entries(groupedTransactions).forEach(([date, transactions]) => {
      doc.text(`Date: ${date}`, 20, y);
      y += 10;
 
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
    });
 
    doc.save("transaction_report.pdf");
  };
 
  return (
    <div className="max-w-6xl flex flex-col mx-auto px-6 py-2 border-b">
      <div className="flex">
        <ChooseAccount
          selectedAccountId={selectedAccountId}
          setSelectedAccountId={setSelectedAccountId}
        />
        <p className=" text-xl">Total Income: ₮{totalIncome}</p>
        <p className=" text-xl">Total Outcome: ₮{totalOutcome}</p>
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl flex justify-between items-center p-4 mt-4 w-full">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl flex justify-between items-center p-4 mt-4 w-full">
          <Button onClick={() => setFilter("ALL")}>Бүгд</Button>
          <Button onClick={() => setFilter("CREDIT")}>Орлого</Button>
          <Button onClick={() => setFilter("DEBIT")}>Зарлага</Button>
        </div>
      </div>
      <Button onClick={downloadPDF} className="mt-4">
        Download PDF
      </Button>
      {loading && <p>Loading transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && Object.keys(groupedTransactions).length > 0 && (
        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl mt-4 p-4">
          {Object.keys(groupedTransactions).map((date) => (
            <div key={date} className="mb-4">
              <h3 className="text-xl font-semibold">{date}</h3>
              {groupedTransactions[date].map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center p-4 border-b"
                >
                  <div className="flex flex-col items-start justify-between">
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div>{transaction.reference}</div>
                    <div className="text-1xl">
                      <div className="flex items-center">
                        Үлдэгдэл:
                        {isVisible ? (
                          <div className=" font-medium">
                            {account
                              ? account.balance + transaction.runningBalance
                              : "—"}
                          </div>
                        ) : (
                          <div className="text-lg tracking-widest select-none">
                            •••••
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div
                      className={
                        transaction.type === "DEBIT"
                          ? "text-red-500 flex"
                          : "text-green-500 flex"
                      }
                    >
                      {transaction.type === "DEBIT" ? "-" : "+"}
                      {isVisible ? (
                        <div className="font-medium">{transaction.amount}₮</div>
                      ) : (
                        <div className="text-lg tracking-widest select-none">
                          •••••
                        </div>
                      )}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-8 h-8">
                          <ChevronRightIcon />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Transaction Details</DialogTitle>
                          <DialogDescription>
                            {transaction.reference}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
