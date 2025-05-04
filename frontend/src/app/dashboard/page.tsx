"use client";
import BankCard from "@/components/dashboard/bankCard";
import Transaction from "@/components/dashboard/transaction";
import { Wallet, BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/context/userContext";
const Dashboard = () => {
  const { allAccounts } = useUser();
  const [currentAccountNumber] = useState(allAccounts[0]?.accountNumber);
  const [balance] = useState(allAccounts[0]?.balance);
  // useEffect(() => {
  //   try {
  //     const response = fetch("", {
  //       method: "GET"
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    <>
      <div className="pl-[25px] pr-[25px] lg:pr-[40px] lg:pl-[40px] mt-6 text-[#343C6A] dark:text-[white] ">
        <div className="flex justify-between">
          <p className="text-xl font-semibold">
            Миний данс:{" "}
            <span className="text-3xl">{String(currentAccountNumber)}</span>
          </p>
          <p className="text-lg font-semibold cursor-pointer">Сонго дансаа</p>
        </div>
        <div className="grid grid-cols-3 gap-10 mt-6">
          <div className=" h-[8rem] border bg-white dark:bg-blue-950 rounded-2xl flex justify-center lg:gap-2 xl:gap-5 items-center px-4">
            <Wallet className="w-10 h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16" />
            <div className="flex flex-col gap-2">
              <div className="text-4xl font-semibold">Үлдэгдэл</div>
              <div className="text-2xl font-medium ">
                {" "}
                {String(balance ?? "N/A")}
              </div>
            </div>
          </div>
          <div className="h-[8rem] border bg-white dark:bg-blue-950 rounded-2xl flex justify-center lg:gap-2 xl:gap-5 items-center px-4">
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
          </div>
        </div>
        <div className="flex flex-wrap gap-10 xl:flex-nowrap">
          <div>
            <p className="mt-6 text-lg font-semibold">My cards</p>
            <div className="mt-5 flex gap-7 w-[675px] overflow-x-auto ">
              {/* Bankcard geed component deer backendeesee utga zaaj uguul*/}
              <BankCard
                cardType="Debit"
                bankName="Pine Bank"
                cardNumber="**** **** **** 4242"
                cardHolder="Jane Smith"
                expiry="08/27"
              />
              <BankCard
                cardType="Debit"
                bankName="Pine Bank"
                cardNumber="**** **** **** 4242"
                cardHolder="Jane Smith"
                expiry="08/27"
              />
              <BankCard
                cardType="Debit"
                bankName="Pine Bank"
                cardNumber="**** **** **** 4242"
                cardHolder="Jane Smith"
                expiry="08/27"
              />
              <div className="flex items-center justify-center h-48 border shadow-lg cursor-pointer w-80 min-w-80 rounded-2xl">
                + Create a card
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="mt-6 text-lg font-semibold">
              Recent transactions
            </div>
            <div className="w-full mt-6 overflow-y-auto border rounded-2xl h-96">
              <Transaction date="12:43" amount="1234" balance="910910" />
              <Transaction date="12:43" amount="1234" balance="910910" />
              <Transaction date="12:43" amount="1234" balance="910910" />
              <Transaction date="12:43" amount="1234" balance="910910" />
              <Transaction date="12:43" amount="1234" balance="910910910910" />
              <Transaction date="12:43" amount="1234" balance="910910" />
              <Transaction date="12:43" amount="1234" balance="910910" />
              <Transaction date="12:43" amount="1234" balance="910910" />
              <Transaction date="12:43" amount="1234" balance="910910" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
