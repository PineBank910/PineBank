"use client";
import { CurrentUser } from "@/lib/currentUserContext";
import { useVisibility } from "@/context/visibilityContext";
import { TransactionType } from "../types";
import { useState, useContext, useEffect } from "react";
import ChooseAccount from "./transfer/_components/ChooseAccount";
import { formatNumber } from "@/utils/balanceFormat";
import { useAuth } from "@clerk/clerk-react";
import { groupTransactionsByDay } from "@/utils/filterByDay";
import Transaction from "@/components/dashboard/transaction";
const Dashboard = () => {
  const { getToken } = useAuth();
  const { isVisible } = useVisibility();
  const context = useContext(CurrentUser);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const currentUserData = context?.currentUserData;

  const selectedAccount = currentUserData?.accounts?.find(
    (account) => account.id === selectedAccountId
  );
  const accountNumber = selectedAccount?.accountNumber;
  const rawBalance = selectedAccount?.balance;
  const balance =
    typeof rawBalance === "number" ? `${formatNumber(rawBalance)} MNT` : "...";
  
  useEffect(() => {
    if (!accountNumber) return;

    const fetchTransactions = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const response = await fetch("https://pinebank.onrender.com/transaction/get", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ accountNumber }),
        });

        if (!response.ok) {
          console.error("Transaction fetch failed:", await response.text());
          return;
        }
        const data = await response.json();
        setTransactions(data.transactions);
        console.log("Fetched transactions:", data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [accountNumber]);

  const groupedTransactions = groupTransactionsByDay(transactions.slice(0, 10));
  return (
    <>
      <div className="pl-[25px] pr-[25px] lg:pr-[40px] lg:pl-[40px] pt-6 text-[#343C6A] dark:text-[white] w-full block md:flex gap-14 max-w-[1500px] h-screen ">
        <div className="w-full  sm:w-1/2">
          <div className="flex justify-between">
            <div className="flex text-xl font-semibold">
              <div className="w-[100px] mb-2">Данс:</div>
              <ChooseAccount
                selectedAccountId={selectedAccountId}
                setSelectedAccountId={setSelectedAccountId}
              />
            </div>
          </div>
          <div className="mt-6 mb-6 h-[6rem] sm:h-[144px] sm:w-full border bg-white dark:bg-blue-950 rounded-2xl flex  lg:gap-2 xl:gap-5 items-center px-2 sm:px-4">

            <div className="flex justify-between w-full gap-2 sm:flex-col">
              <h3 className="text-[11px] sm:text-[1rem]">
                ХАРИЛЦАХ/ ИРГЭД / MNT
              </h3>
              <div className="md:flex md:justify-between text-[11px] sm:text-[1rem]">
                {accountNumber}
                <div className="text-2xl font-medium ">
                  {isVisible ? (
                    <div className="2xl:text-2xl text-[1rem] tex font-medium">

                      {selectedAccount ? balance : "..."}
                    </div>
                  ) : (
                    <div className="text-lg tracking-widest select-none">
                      ****
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between">
              <div className="text-xl font-semibold">Хадгалсан загварууд</div>
              <div
                onClick={handleClickZagvar}
                className="text-[orange] hover:underline cursor-pointer">
                нийт
              </div>
            </div>
            <div className="flex gap-6 mt-6">
              <button className="cursor-pointer  w-[96px] h-[96px] rounded-2xl border flex flex-col items-center justify-center dark:bg-[#343434] bg-[rgb(243,243,243)] dark:hover:bg-blue-950 hover:bg-[#85bb65] hover:text-white transition duration-400 ease-in-out">
                <div className="text-orange-400 text-2xl">+</div>
                <div>
                  <div className="text-sm">Загвар</div>
                  <div className="text-sm">нэмэх</div>
                </div>
              </button>
              <div className="w-full  border rounded-2xl py-3 px-6 shadow-2xl">
                <div className="text-3xl font-semibold pb-2 dark:text-zinc-100 ">
                  Амархан гүйлгээ
                </div>
                <hr></hr>
                <div className="pt-2 dark:text-gray-200 ">
                  Тогтмол харьцдаг дансны загвараа хадгалаад гүйлгээгээ
                  амарханаар хийгээрэй.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-full gap-10 xl:flex-nowrap sm:w-1/2">
          <div className="w-full">
            <div className="text-lg font-semibold ">Сүүлийн гүйлгээ</div>
            <div className="w-full mt-2 overflow-y-auto border sm:mt-6 rounded-2xl p-4">
              {Object.keys(groupedTransactions).length > 0 && (
                <div className="">
                  {Object.keys(groupedTransactions)

                    .map((date) => (
                      <div key={date} className="">
                        <h3 className="text-l font-semibold bg-[#F8F8F8]">
                          {date}
                        </h3>
                        {groupedTransactions[date].map((transaction) => (
                          <Transaction
                            key={transaction.id}
                            date={new Date(
                              transaction.timestamp
                            ).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            })}
                            amount={String(transaction.amount)}
                            balance={String(transaction.runningBalance)}
                            type={transaction.type}
                            reference={transaction.reference}
                            fromAccountId={transaction.fromAccountId}
                            toAccountId={transaction.toAccountId}
                          />
                        ))}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
