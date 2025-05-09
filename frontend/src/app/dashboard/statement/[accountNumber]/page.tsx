"use client";

import { useVisibility } from "@/context/visibilityContext";
import { axiosInstance } from "@/lib/addedAxiosInstance";
import axios from "axios";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { CurrentUser } from "@/lib/currentUserContext";
import { Button } from "@/components/ui/button";
import { TransactionType } from "@/app/types";
import { groupTransactionsByDay } from "@/utils/filterByDay";
import { jsPDF } from "jspdf";
import { DateRange } from "react-day-picker";
import { addDays, endOfDay, startOfDay, subDays } from "date-fns";
import { DatePickerWithRange } from "./_components/filterDate";
import ChooseAccountWithId from "./_components/ChooseAccountWithId";

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
  const today = new Date();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startOfDay(subDays(today, 0)),
    to: addDays(new Date(today), 0),
  });
  const params = useParams();
  const accountNumber = Array.isArray(params?.accountNumber)
    ? params.accountNumber[0]
    : params?.accountNumber;
  console.log("Account Number:", accountNumber);
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
        const response = await axiosInstance.post<{
          transactions: TransactionType[];
        }>(`transaction/all/${accountNumber}`, { dateRange });
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
  }, [accountNumber, dateRange]);

  const filteredTransactions = transactionInfo.filter((tx) => {
    if (filter === "ALL") return true;
    return tx.type === filter;
  });

  const setYesterday = () => {
    const yesterday = subDays(new Date(), 1);
    setDateRange({
      from: startOfDay(yesterday),
      to: endOfDay(new Date()),
    });
  };

  const setLast7Days = () => {
    const today = new Date();
    setDateRange({
      from: startOfDay(subDays(today, 6)),
      to: endOfDay(today),
    });
  };

  const setLastMonth = () => {
    const today = new Date();
    setDateRange({
      from: startOfDay(subDays(today, 29)),
      to: endOfDay(today),
    });
  };

  const groupedTransactions = groupTransactionsByDay(filteredTransactions);

  const totalIncome = filteredTransactions
    .filter((tx) => tx.type === "CREDIT")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalOutcome = filteredTransactions
    .filter((tx) => tx.type === "DEBIT")
    .reduce((sum, tx) => sum + tx.amount, 0);

  if (!context || !context.currentUserData) return <div>...Loading</div>;

  const accounts = currentUserData?.accounts ?? [];


  if (!accounts || accounts.length === 0) {
    return <div>No accounts available</div>;
  }

  const account = accounts.find(
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
      <div className="flex gap-3 items-center justify-between bg-secondary rounded-2xl p-4 mt-4 w-full">
        <ChooseAccountWithId
          selectedAccountId={selectedAccountId}
          setSelectedAccountId={setSelectedAccountId}
        />
        <Button onClick={downloadPDF} className="mt-4">
          Download PDF
        </Button>
      </div>
      <div className="flex items-center justify-between bg-secondary rounded-2xl p-4 mt-4 w-full">
        <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        <Button onClick={setYesterday}>Өчигдөр</Button>
        <Button onClick={setLast7Days}>7 хоног</Button>
        <Button onClick={setLastMonth}>1 сар</Button>
      </div>
      <div className="rounded-2xl flex justify-between items-center p-4 mt-4 w-full bg-secondary">
        <Button
          className={filter === "ALL" ? "bg-green-500 flex" : " flex"}
          onClick={() => setFilter("ALL")}
        >
          Бүгд
        </Button>
        <Button
          className={filter === "CREDIT" ? "bg-green-500 flex" : " flex"}
          onClick={() => setFilter("CREDIT")}
        >
          Орлого
        </Button>
        <Button
          className={filter === "DEBIT" ? "bg-green-500 flex" : " flex"}
          onClick={() => setFilter("DEBIT")}
        >
          Зарлага
        </Button>
        <p className=" text-xl bg-secondary p-2">
          Total Income: ₮{totalIncome}
        </p>
        <p className=" text-xl bg-secondary">Total Outcome: ₮{totalOutcome}</p>
      </div>
      {loading && <p>Loading transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && Object.keys(groupedTransactions).length > 0 && (
        <div className="rounded-2xl mt-4 p-4">
          {Object.keys(groupedTransactions).map((date) => (
            <div
              key={date}
              className="mb-4 border border-gray-200 rounded-lg p-4"
            >
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
                        hour12: false,
                      })}
                    </div>
                    <div>{transaction.reference}</div>
                    <div className="text-1xl"></div>
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
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
