"use client";
import BankCard from "@/components/dashboard/bankCard";
import Transaction from "@/components/dashboard/transaction";
import { Wallet, BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/context/userContext";
const Dashboard = () => {
  const { allAccounts } = useUser();
  const [currentAccountNumber, setCurrentAccountNumber] = useState(
    allAccounts[0]?.accountNumber
  );
  const [balance, setBalance] = useState(allAccounts[0]?.balance);
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
          <p className="font-semibold text-xl">
            Миний данс:{" "}
            <span className="text-3xl">{String(currentAccountNumber)}</span>
          </p>
          <p className="font-semibold text-lg cursor-pointer">Сонго дансаа</p>
        </div>
        <div className="mt-6 grid-cols-3 grid gap-10">
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
        <div className="flex gap-10 flex-wrap xl:flex-nowrap">
          <div>
            <p className="mt-6 font-semibold text-lg">My cards</p>
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
              <div className="w-80 min-w-80 h-48 rounded-2xl shadow-lg border flex justify-center items-center cursor-pointer">
                + Create a card
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="mt-6 font-semibold text-lg">
              Recent transactions
            </div>
            <div className="mt-6 w-full  border rounded-2xl h-96 overflow-y-auto">
              <Transaction
                date="12:43"
                amount="1234"
                balance="910910"
                type="deposit"
              />
              <Transaction
                date="12:43"
                amount="1234"
                balance="910910"
                type="deposit"
              />
              <Transaction
                date="12:43"
                amount="1234"
                balance="910910"
                type="deposit"
              />
              <Transaction
                date="12:43"
                amount="1234"
                balance="910910"
                type="deposit"
              />
              <Transaction
                date="12:43"
                amount="1234"
                balance="910910910910"
                type="deposit"
              />
              <Transaction
                date="12:43"
                amount="1234"
                balance="910910"
                type="deposit"
              />
              <Transaction
                date="12:43"
                amount="1234"
                balance="910910"
                type="deposit"
              />
              <Transaction
                date="12:43"
                amount="1234"
                balance="910910"
                type="deposit"
              />
              <Transaction
                date="12:43"
                amount="1234"
                balance="910910"
                type="deposit"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
