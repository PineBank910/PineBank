"use client";

import { axiosInstance } from "@/lib/addedAxiosInstance";
import axios from "axios";
import React, { useState } from "react";
import GetProfileInput from "./_components/GetProfileInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import ChooseAccount from "./_components/ChooseAccount";
import { TabsDemo } from "./_components/Tabs";

const Page = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toAccountId, setToAccountId] = useState<string | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

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
        toast("Transaction successful!");
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

  return (
    <div className="flex flex-col w-1/3 h-screen space-y-4">
      <div className="">
        <ChooseAccount
          selectedAccountId={selectedAccountId}
          setSelectedAccountId={setSelectedAccountId}
        />
        <GetProfileInput setToAccountId={setToAccountId} />
        <Input
          id="amount"
          placeholder="Enter the amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Input
          id="reference"
          type="text"
          placeholder="Enter your reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
          onClick={createTransaction}
          disabled={loading}
        >
          {loading ? "Processing..." : "Гүйлгээ хийх"}
        </Button>
      </div>
    </div>
  );
};

export default Page;
