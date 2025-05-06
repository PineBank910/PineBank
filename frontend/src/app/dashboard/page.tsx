"use client";
import { CurrentUser } from "@/utils/currentUserContext";
import { useVisibility } from "@/context/visibilityContext";
import Transaction from "@/components/dashboard/transaction";
import { Wallet } from "lucide-react";
import { useState, useContext } from "react";
// import { useUser } from "@/context/userContext";
import ChooseAccount from "./transfer/_components/ChooseAccount";
const Dashboard = () => {
  // const { allAccounts } = useUser();
  const { isVisible } = useVisibility();
  const context = useContext(CurrentUser);
  // const [currentAccountNumber] = useState(allAccounts[0]?.accountNumber);
  // const [balance] = useState(allAccounts[0]?.balance);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  const currentUserData = context?.currentUserData;
  const selectedAccount = currentUserData?.accounts.find(
    (account) => account.id === selectedAccountId
  );
  // console.log("CURRENT DANS:", selectedAccountId);
  // console.log("LEL:", currentUserData);
  return (
    <>
      <div className="pl-[25px] pr-[25px] lg:pr-[40px] lg:pl-[40px] mt-6 text-[#343C6A] dark:text-[white] w-full block sm:flex gap-10">
        <div className="w-full sm:w-1/2">
          <div className="flex justify-between">
            <div className="text-xl font-semibold lg:flex">
              <div className="w-[250px] mb-2">Миний данс:</div>
              <ChooseAccount
                selectedAccountId={selectedAccountId}
                setSelectedAccountId={setSelectedAccountId}
              />
              {/* <span className="text-3xl">{String(currentAccountNumber)}</span> */}
            </div>
          </div>
          <div className=" mt-6 mb-6">
            <div className="h-[4rem] sm:h-[144px] sm:w-full border bg-white dark:bg-blue-950 rounded-2xl flex  lg:gap-2 xl:gap-5 items-center px-2 sm:px-4">
              <Wallet className="w-8 h-8  sm:w-12 sm:h-12 2xl:w-16 2xl:h-16 mr-2 sm:mr-7" />
              <div className="w-full flex justify-between sm:flex-col gap-2 ">
                <div className="text-[16px]  sm:text-4xl font-semibold">
                  Үлдэгдэл
                </div>
                <div className="text-2xl font-medium ">
                  {isVisible ? (
                    // Show this div when isVisible is true
                    <div className="text-2xl font-medium">
                      ₮ {selectedAccount ? selectedAccount.balance : "N/A"}
                    </div>
                  ) : (
                    // Show this div when isVisible is false
                    <div className="text-lg tracking-widest select-none">
                      •••••••
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-10 xl:flex-nowrap w-full sm:w-1/2">
          <div className="w-full">
            <div className=" text-lg font-semibold">Сүүлийн гүйлгээ</div>
            <div className="w-full mt-2 sm:mt-6 overflow-y-auto border rounded-2xl h-96">
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
