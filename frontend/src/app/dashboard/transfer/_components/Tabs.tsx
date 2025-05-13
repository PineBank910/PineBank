"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import ChooseAccount from "./ChooseAccount";
import GetProfileInput from "./GetProfileInput";
import { axiosInstance } from "@/lib/addedAxiosInstance";
import axios from "axios";
import React, { useState, useContext } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CurrentUser } from "@/context/currentUserContext";
import { SwitchDemo } from "./SwitchSave";
import { useAuth } from "@clerk/nextjs";

export const TabsDemo = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [reference, setReference] = useState("");
  const [design, setDesign] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toAccountId, setToAccountId] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [, setAccountNumber] = useState("");
  const [success, setSuccess] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactionPassword, setTransactionPassword] = useState("");
  const context = useContext(CurrentUser);
  const currentUserData = context?.currentUserData;
  const userTransactionPassword = currentUserData?.transactionPassword;
  const { getToken } = useAuth();
  const [dataResponse, setDataResponse] = useState({});

  const createTransaction = async () => {
    // if (!selectedAccountId || !transactionPassword) {
    //   setError("Хэрэглэгчийн мэдээлэл хоосон байна.");
    //   openDialog();
    //   return;
    // }

    // if (!toAccountId || !amount || !reference) {
    //   setError("Хэрэглэгчийн мэдээлэл хоосон байна.");
    //   openDialog();
    //   return;
    // }
    if (!toAccountId) {
      setError("Хүлээн авагчийн данс хоосон байна.");
      openDialog();
      return;
    }
    if (!amount) {
      setError("Гүйлгээний дүн хоосон байна.");
      openDialog();
      return;
    }
    if (!reference) {
      setError("Гүйлгээний утга хоосон байна.");
      openDialog();
      return;
    }

    if (transactionPassword !== userTransactionPassword) {
      setError("Гүйлгээний нууц үг буруу байна.");
      openDialog();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const transaction = {
        fromAccountId: selectedAccountId,
        toAccountId,
        amount: Number(amount),
        reference,
        transactionPassword,
      };
      const res = await axiosInstance.post("/transaction", transaction);

      if (res.status === 201) {
        const response = res.data.transaction;
        setSuccess("Transaction successful!");
        openDialog();
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1500);
        setDataResponse(response);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "An error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
      openDialog();
    } finally {
      setLoading(false);
    }
  };
  console.log(dataResponse, "data");
  const createDesign = async () => {
    const token = await getToken();
    if (!toAccountId) {
      setError("Хүлээн авагчийн данс хоосон байна.");
      openDialog();
      return;
    }

    if (!design || design === "") {
      return;
    }
    setLoading(true);
    setError("");

    try {
      const saveDesign = {
        toAccountId,
        designName: design,
      };
      const res = await axiosInstance.post("/design", saveDesign, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 201) {
        console.log(res)
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "An error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
      openDialog();
    } finally {
      setLoading(false);
    }
  };
  const openDialog = () => setIsDialogOpen(true);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, "");
    if (value !== "") {
      const numericValue = parseFloat(value);
      setAmount(isNaN(numericValue) ? "" : numericValue);
    } else {
      setAmount("");
    }
  };

  const formatAmount = (amount: number | "") => {
    if (amount === "") return "";
    return amount.toLocaleString();
  };
  return (
    <div className="min-h-screen h-auto mt-10 mb-10">
      <span className="font-bold text-gray-900 dark:text-white hover:text-green-600">
        Гүйлгээ
      </span>
      <Tabs
        defaultValue="account"
        className="flex xl:flex-col mt-1 lg:gap-6 2xl:gap-12"
      >
        {/* <TabsList className="flex flex-col w-[305px] h-11  p-0 bg-white dark:bg-gray-800 rounded-lg border-none">
          {/* <TabsTrigger
            value="account"
            className="flex items-center justify-center h-10 w-full text-sm uppercase
           hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white
           data-[state=active]:bg-black data-[state=active]:text-white
           transition-colors duration-400 shadow-lg">
            банкны данс руу
          </TabsTrigger> 
          {/* <TabsTrigger
            value="password"
            className="flex items-center justify-center h-16 w-full text-sm uppercase
           hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white
           data-[state=active]:bg-black data-[state=active]:text-white
           transition-colors duration-400 shadow-lg">
            Загварууд
          </TabsTrigger> 
        </TabsList> */}

        <div className="flex-1 w-auto">
          <TabsContent
            className="shadow-2xl rounded-lg bg-white dark:bg-gray-900"
            value="account"
          >
            <div className="flex flex-col gap-8 items-center">
              <CardHeader className="bg-black w-full h-[104px]  rounded-t-lg">
                <CardTitle className="text-white text-xs mt-5">
                  Гүйлгээний төрөл
                </CardTitle>
                <CardDescription className="text-black dark:text-white text-[12px] justify-center min-w-full w-full h-11 border rounded-lg flex items-center mb-5 bg-white dark:bg-gray-700 font-bold text-center">
                  PINE БАНКНЫ ДАНС РУУ
                </CardDescription>
              </CardHeader>
              {/* ////////////////////////////////////////////////// */}
              <CardContent className="space-y-6 px-6 pb-2 w-full">
                <div className="space-y-2 mb-2">
                  <Label
                    htmlFor="from-account"
                    className="font-medium text-gray-700 dark:text-gray-300 text-xs"
                  >
                    <span className="text-red-600">*</span> Шилжүүлэх дансаа
                    сонгох
                  </Label>
                  <ChooseAccount
                    selectedAccountId={selectedAccountId}
                    setSelectedAccountId={setSelectedAccountId}
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="to-account"
                    className="font-medium text-gray-700 dark:text-gray-300 text-xs"
                  ></Label>
                  <GetProfileInput setToAccountId={setToAccountId} />
                </div>
                <div className="flex gap-4">
                  <SwitchDemo design={design} setDesign={setDesign} />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="amount"
                    className="font-medium text-gray-700 dark:text-gray-300 text-xs"
                  >
                    <span className="text-red-600">*</span> Гүйлгээний дүн
                  </Label>
                  <input
                    id="amount"
                    value={formatAmount(amount)}
                    onChange={handleAmountChange}
                    className="border-0 border-b w-full border-gray-300 dark:border-gray-500 rounded-none focus:outline-none focus:ring-0 focus:border-black hover:border-black bg-transparent text-gray-900 dark:text-white duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="reference"
                    className="font-medium text-gray-700 dark:text-gray-300 text-xs"
                  >
                    <span className="text-red-600">*</span> Гүйлгээний утга
                  </Label>
                  <input
                    id="reference"
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="border-0 w-full border-b border-gray-300 dark:border-gray-500 rounded-none focus:outline-none focus:ring-0 focus:border-black hover:border-black bg-transparent text-gray-900 dark:text-white duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="transaction-password"
                    className="font-medium text-gray-700 dark:text-gray-300 text-xs"
                  >
                    <span className="text-red-600">*</span> Гүйлгээний нууц үг
                  </Label>
                  <input
                    id="transaction-password"
                    type="password"
                    value={transactionPassword}
                    onChange={(e) => setTransactionPassword(e.target.value)}
                    className="border-0 border-b w-full border-gray-300 dark:border-gray-500 rounded-none focus:outline-none focus:ring-0 focus:border-black hover:border-black bg-transparent text-gray-900 dark:text-white duration-500"
                  />
                </div>
              </CardContent>

              <CardFooter className="px-6 pb-6 gap-5 justify-center">
                <Button
                  type="submit"
                  className="py-2 text-gray-900 dark:text-white border w-[280px] h-[50px] bg-white dark:bg-gray-700 duration-400 hover:bg-black hover:text-white transition rounded-2xl font-semibold text-[16px]"
                  onClick={() => {
                    setAccountNumber("");
                    setAmount("");
                    setReference("");
                    setToAccountId(null);
                  }}
                  disabled={loading}
                >
                  {loading ? "Шинэчлэл хийгдлээ" : "Шинэчлэх"}
                </Button>
                <Button
                  type="submit"
                  className="py-2 text-white bg-black dark:bg-green-700 w-[280px] h-[50px] shadow duration-400 hover:bg-[var(--foreground)]/60 hover:text-[var(--background)] transition rounded-2xl font-semibold text-[16px]"
                  onClick={() => {
                    createTransaction();
                    createDesign();
                  }}
                  disabled={loading}
                >
                  {loading ? "Гүйлгээ хийгдэж байна" : "Гүйлгээ хийх"}
                </Button>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogContent className="p-8 dark:bg-gray-700 bg-white rounded-lg shadow-lg w-[400px] flex flex-col items-center">
                    <DialogTitle className="w-full flex justify-center items-center ext-xl font-semibold text-center">
                      {success ? "Гүйлгээ амжилттай" : `${error}`}
                    </DialogTitle>
                    <div className="">
                      <p className="">Reference</p>
                      {dataResponse.reference}
                    </div>
                    <div className="">
                      <p className="">Reference</p>
                      {dataResponse.reference}
                    </div>
                    <div className="">
                      <p className="">Reference</p>
                      {dataResponse.reference}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </div>
          </TabsContent>

          <TabsContent value="password">
            {/* <Card className="shadow-2xl rounded-lg bg-gray-800 dark:bg-gray-900 text-white">
              <CardHeader className="bg-black text-white rounded-t-lg py-6">
                <CardTitle className="text-xs">Нууц үг солих</CardTitle>
                <CardDescription className="text-white text-sm mt-1">
                  Нууц үгээ шинэчилсний дараа та системээс гарна.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 px-6 pt-4 pb-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="current"
                    className="text-xs font-medium text-gray-300">
                    Одоогийн нууц үг
                  </Label>
                  <Input
                    id="current"
                    type="password"
                    className="bg-transparent text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="new"
                    className="text-xs font-medium text-gray-300">
                    Шинэ нууц үг
                  </Label>
                  <Input
                    id="new"
                    type="password"
                    className="bg-transparent text-white"
                  />
                </div>
              </CardContent>

              <CardFooter className="px-6 pb-6">
                <Button
                  type="submit"
                  className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 transition rounded font-semibold text-sm"
                  disabled={loading}>
                  {loading ? "Processing..." : "Нууц үг солих"}
                </Button>
              </CardFooter>
            </Card> */}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
