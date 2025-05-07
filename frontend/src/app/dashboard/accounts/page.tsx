"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  ArrowRightLeft,
  ReceiptText,
  HandCoins,
} from "lucide-react";
import { useCurrent } from "@/utils/currentUserContext";
import { formatNumber } from "@/lib/balanceFormat";
import { useVisibility } from "@/context/visibilityContext";
import { useRouter } from "next/navigation";
import { DialogDemo } from "./_components/Dialog";
import { useSidebar } from "@/context/sidebarContext";
export default function Page() {
  const { currentUserData } = useCurrent();
  const allAccounts = currentUserData?.accounts || [];
  const { isVisible } = useVisibility();
  const router = useRouter();
  const { setSelectedSidebar } = useSidebar();
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 flex flex-col items-center h-screen">
      <div className="w-full max-w-[1252px] px-1  ">
        <h1 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100 text-left">
          Дансны жагсаалт
        </h1>
        <h2 className="text-sm font-medium text-green mb-4 dark:text-blue-400">
          ДЕПОЗИТ ДАНС
        </h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 w-full max-w-[1252px] shadow-2xl">
        <div className="flex flex-col sm:flex-row gap-2 mb-5 ml-3 mt-3">
          <DialogDemo />
        </div>

        {allAccounts.map((account, index) => {
          const accountNumber = account?.accountNumber || "Данс олдсонгүй";
          const rawBalance = account?.balance;
          const balance =
            typeof rawBalance === "number"
              ? `${formatNumber(rawBalance)} MNT`
              : "Үлдэгдэл байхгүй";

          return (
            <Card
              key={index}
              className=" dark:bg-gray-700 ml-3 shadow-none border-none">
              <CardContent className="flex justify-between items-center pb-4 border-b">
                <div className="flex gap-25 ">
                  <div className="flex  items-center space-x-2 mb-2">
                    <div className="rounded-full flex items-center justify-center">
                      <HandCoins className="w-9 h-9 text-green-700" />
                    </div>

                    <div className=" flex flex-col">
                      <span className="font-semibold text-sm text-black dark:text-gray-100 mb-2">
                        ХАРИЛЦАХ/ ИРГЭД / MNT
                      </span>
                      <span className="text-xs">
                        MN
                        <span className="font-bold text-xs ml-2">
                          {accountNumber}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="text-sm text-black dark:text-gray-200 mb-1">
                      Барит хийсэн /Хүлээгдэж буй дүн:{" "}
                    </div>
                    {isVisible ? (
                      <span className="font-semibold text-sm text-black dark:text-white">
                        0.00 MNT
                      </span>
                    ) : (
                      <span className="font-semibold text-sm text-black dark:text-white">
                        *****
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="text-sm text-gray-700 dark:text-gray-200 mb-1">
                      Боломжит үлдэгдэл:
                    </div>
                    {isVisible ? (
                      <span className="font-semibold text-sm text-black dark:text-white">
                        {balance ? balance : "N/A"}
                      </span>
                    ) : (
                      <span className="font-semibold text-sm text-black dark:text-white">
                        *****
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 gap-8">
                  <Button
                    onClick={() =>
                      router.push(`/dashboard/statement/${accountNumber}`)
                    }
                    variant="ghost"
                    className="w-[66px] h-[66px] flex flex-col  rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.15)] dark:border-gray-200 dark:text-gray-200 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 transition duration-500 ">
                    <ReceiptText className="!w-5 !h-5 shrink-0" />
                    <span className="text-[10px]">Хуулга</span>
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-[66px] h-[66px] flex flex-col rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.15)] dark:border-gray-200 dark:text-gray-200 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 transition duration-500 ">
                    <MoreHorizontal className="!w-5 !h-5 shrink-0" />
                    <span className="text-[10px] leading-none mt-1">
                      Дэлгэрэнгүй
                    </span>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => {
                      router.push("/dashboard/transfer");
                      setSelectedSidebar("Гүйлгээ");
                    }}
                    className="w-[66px] h-[66px] flex flex-col rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.15)] dark:border-gray-200 dark:text-gray-200 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 transition duration-500 ">
                    <ArrowRightLeft className="!w-5 !h-5 shrink-0 font-black" />
                    <span className="text-[10px]">Гүйлгээ</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
