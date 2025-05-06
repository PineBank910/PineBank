"use client";
import { CurrentUser } from "@/utils/currentUserContext";
import { useVisibility } from "@/context/visibilityContext";
import Transaction from "@/components/dashboard/transaction";
//import { Wallet } from "lucide-react";
import { useState, useContext, useEffect } from "react";
// import { useUser } from "@/context/userContext";
import ChooseAccount from "./transfer/_components/ChooseAccount";
import { formatNumber } from "@/lib/balanceFormat";
import { useAuth } from "@clerk/clerk-react";
const Dashboard = () => {
  const { getToken } = useAuth();
  // const { allAccounts } = useUser();
  const { isVisible } = useVisibility();
  const context = useContext(CurrentUser);
  // const [currentAccountNumber] = useState(allAccounts[0]?.accountNumber);
  // const [balance] = useState(allAccounts[0]?.balance);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  interface TransactionType {
    id: string;
    timestamp: string;
    amount: string;
    runningBalance: string;
    type: string;
    reference: string;
  }

  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const currentUserData = context?.currentUserData;
  const selectedAccount = currentUserData?.accounts?.find(
    (account) => account.id === selectedAccountId
  );
  const accountNumber = selectedAccount?.accountNumber;
  const rawBalance = selectedAccount?.balance;
  const balance =
    typeof rawBalance === "number" ? `${formatNumber(rawBalance)} MNT` : "...";

  // console.log("CURRENT DANS:", selectedAccountId);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const response = await fetch("http://localhost:8000/transaction", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Transaction fetch failed:", await response.text());
          return;
        }

        const data = await response.json();
        setTransactions(data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <>
      <div className="pl-[25px] pr-[25px] lg:pr-[40px] lg:pl-[40px] mt-6 text-[#343C6A] dark:text-[white] w-full block md:flex gap-10">
        <div className="w-full sm:w-1/2">
          <div className="flex justify-between">
            <div className="flex text-xl font-semibold">
              <div className="w-[100px] mb-2">Данс:</div>
              <ChooseAccount
                selectedAccountId={selectedAccountId}
                setSelectedAccountId={setSelectedAccountId}
              />
              {/* <span className="text-3xl">{String(currentAccountNumber)}</span> */}
            </div>
          </div>

          <div className="mt-6 mb-6 h-[6rem] sm:h-[144px] sm:w-full border bg-white dark:bg-blue-950 rounded-2xl flex  lg:gap-2 xl:gap-5 items-center px-2 sm:px-4">
            {/* <Wallet className="w-8 h-8 mr-2 sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 sm:mr-7" /> */}
            <div className="flex justify-between w-full gap-2 sm:flex-col">
              <h3 className="text-[11px] sm:text-[1rem]">
                ХАРИЛЦАХ/ ИРГЭД / MNT
              </h3>
              <div className="md:flex md:justify-between text-[11px] sm:text-[1rem]">
                {accountNumber}
                <div className="text-2xl font-medium ">
                  {isVisible ? (
                    // Show this div when isVisible is true
                    <div className="2xl:text-2xl text-[1rem] tex font-medium">
                      {selectedAccount ? balance : "..."}
                    </div>
                  ) : (
                    // Show this div when isVisible is false
                    <div className="text-lg tracking-widest select-none">
                      ••••
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-full gap-10 xl:flex-nowrap sm:w-1/2">
          <div className="w-full">
            <div className="text-lg font-semibold ">Сүүлийн гүйлгээ</div>
            <div className="w-full mt-2 overflow-y-auto border sm:mt-6 rounded-2xl h-96">
              {transactions.map((tx) => (
                <Transaction
                  key={tx.id}
                  date={new Date(tx.timestamp).toLocaleString()}
                  amount={tx.amount}
                  balance={tx.runningBalance}
                  type={tx.type}
                  reference={tx.reference}
                />
              ))}
            </div>
          </div>
        </div>

        {/* <div className="h-[8rem] border bg-white dark:bg-blue-950 rounded-2xl flex justify-center lg:gap-2 xl:gap-5 items-center px-4">
            <BanknoteArrowUp className="w-10 h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16" />
            <div className="flex flex-col gap-2">
              <div className="text-4xl font-semibold">Орлого</div>
              <div className="text-2xl font-medium ">1234567$</div>
            </div>
          </div>
          <div className="h-[8rem] border bg-white dark:bg-blue-950 rounded-2xl flex justify-center lg:gap-2 xl:gap-5 items-center px-4">
            <BanknoteArrowDown className="w-10 h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16" />
            <div className="flex flex-col gap-2">
              <div className="text-4xl font-semibold">Зарлага</div>
              <div className="text-2xl font-medium ">1234567$</div>
            </div>
          </div> */}
      </div>
    </>
  );
};
export default Dashboard;
