"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChooseAccount from "./ChooseAccount";
import GetProfileInput from "./GetProfileInput";
import { axiosInstance } from "@/lib/addedAxiosInstance";
import axios from "axios";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

export function TabsDemo() {
  const [amount, setAmount] = useState<number | "">("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setError] = useState("");
  const [toAccountId, setToAccountId] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  const createTransaction = async () => {
    if (!selectedAccountId) {
      setError("User is not authenticated or account is missing.");
      return;
    }

    if (!toAccountId || !amount || !reference) {
      setError("Please fill in all fields.");
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
      };

      const res = await axiosInstance.post("/transaction", transaction);

      if (res.status === 201) {
        alert("Transaction successful!");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "An error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

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

  const handleSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  return (
    <div className="h-screen mt-10">
      <span className="font-bold text-gray-900 dark:text-white hover:text-green-600">
        Гүйлгээ
      </span>
      <Tabs defaultValue="account" className="flex flex-row mt-10 gap-12">
        <TabsList className="flex flex-col w-[305px] h-35 gap-5 p-0 bg-white dark:bg-gray-800 rounded-lg border-none">
          <TabsTrigger
            value="account"
            className="flex items-center justify-center h-10 w-full text-sm uppercase
           hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white
           data-[state=active]:bg-black data-[state=active]:text-white
           transition-colors duration-400 shadow-lg"
          >
            банкны данс руу
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="flex items-center justify-center h-16 w-full text-sm uppercase
           hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white
           data-[state=active]:bg-black data-[state=active]:text-white
           transition-colors duration-400 shadow-lg"
          >
            Загварууд
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 min-w-[947px]">
          <TabsContent
            className="shadow-2xl rounded-lg bg-white dark:bg-gray-900"
            value="account"
          >
            <div className="flex flex-col gap-8 items-center">
              <CardHeader className="bg-black w-full h-[104px] justify-center items-center rounded-t-lg">
                <CardTitle className="text-white text-xs mt-5">
                  Гүйлгээний төрөл
                </CardTitle>
                <CardDescription className="text-black dark:text-white text-[12px] justify-center min-w-[740px] h-11 border rounded-lg flex items-center mb-5 bg-white dark:bg-gray-700 font-bold text-center">
                  PINE БАНКНЫ ДАНС РУУ
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 px-6 pb-2 w-[788px]">
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
                  <Switch onChange={handleSwitchChange} />
                  <span className="text-xs font-bold text-white">
                    Загвар хадгалах
                  </span>

                  {isSwitchChecked && (
                    <Input
                      type="text"
                      placeholder="Enter your text"
                      className="mt-2 p-2 border border-gray-300 rounded bg-transparent"
                    />
                  )}
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
                    className="border-0 w-full border-b border-gray-300 dark:border-white rounded-none focus:outline-none focus:ring-0 focus:border-black hover:border-black bg-transparent text-gray-900 dark:text-white duration-500"
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
                  {loading ? "Processing..." : "Шинэчлэх"}
                </Button>
                <Button
                  type="submit"
                  className="py-2 text-white bg-green-600 dark:bg-green-700 w-[280px] h-[50px] shadow duration-400 hover:bg-black hover:text-green-600 transition rounded-2xl font-semibold text-[16px]"
                  onClick={createTransaction}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Гүйлгээ хийх"}
                </Button>{" "}
              </CardFooter>
            </div>
          </TabsContent>

          <TabsContent value="password">
            <Card className="shadow-2xl rounded-lg bg-gray-800 dark:bg-gray-900 text-white">
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
                    className="text-xs font-medium text-gray-300"
                  >
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
                    className="text-xs font-medium text-gray-300"
                  >
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
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Нууц үг солих"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
