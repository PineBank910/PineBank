"use client";
import BankCard from "@/components/dashboard/bankCard";
import Transaction from "@/components/dashboard/transaction";
import { Wallet, BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";
const Dashboard = () => {
  return (
    <>
      <div className="pl-[25px] pr-[25px] lg:pr-[40px] lg:pl-[40px] mt-6 text-[#343C6A] dark:text-[white] overflow-y-auto">
        <div className="flex justify-between">
          <p className="font-semibold text-lg">Миний данс бөлгөө: 910910910 </p>
          <p className="font-semibold text-lg cursor-pointer">Сонго дансаа</p>
        </div>
        <div className="mt-6 grid-cols-3 grid gap-10">
          <div className="h-[8rem] border bg-white dark:bg-blue-950 rounded-2xl flex gap-5 items-center px-4">
            <Wallet size={70} />
            <div className="flex flex-col gap-2">
              <div className="text-4xl font-semibold">My balance</div>
              <div className="text-2xl font-medium ">1234567$</div>
            </div>
          </div>
          <div className="h-[8rem] border bg-white dark:bg-blue-950 rounded-2xl flex gap-5 items-center px-4">
            <BanknoteArrowUp size={70} />
            <div className="flex flex-col gap-2">
              <div className="text-4xl font-semibold">Орлого</div>
              <div className="text-2xl font-medium ">1234567$</div>
            </div>
          </div>
          <div className="h-[8rem] border bg-white dark:bg-blue-950 rounded-2xl flex gap-5 items-center px-4">
            <BanknoteArrowDown size={70} />
            <div className="flex flex-col gap-2">
              <div className="text-4xl font-semibold">Зарлага</div>
              <div className="text-2xl font-medium ">1234567$</div>
            </div>
          </div>
        </div>
        <div className="flex gap-10">
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
              a
              <div className="w-80 min-w-80 h-48 rounded-2xl shadow-lg border flex justify-center items-center cursor-pointer">
                + Create a card
              </div>
            </div>
          </div>
          <div>
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
