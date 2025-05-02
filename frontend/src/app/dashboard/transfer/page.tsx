"use client";

import { axiosInstance } from "@/lib/addedAxiosInstance";
import axios from "axios";
import React, { useContext, useState } from "react";
import GetProfileInput from "./_components/GetProfileInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CurrentUser } from "@/utils/currentUserContext";
import { toast } from "react-toastify";
import ChooseAccount from "./_components/ChooseAccount";

const Page = () => {
  const [amount, setAmount] = useState<number | "">("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toAccountId, setToAccountId] = useState<string | null>(null);

  const { currentUserData } = useContext(CurrentUser);

  if (!currentUserData) {
    return <div>...Loading</div>;
  }

  const { accounts } = currentUserData;

  const createTransaction = async () => {
    if (!currentUserData || !accounts[0]?.id) {
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
        fromAccountId: accounts[0].id,
        toAccountId,
        amount: Number(amount),
        reference,
      };

      const res = await axiosInstance.post("/transaction", transaction);

      if (res.status === 201) {
        toast("Transaction successful!");
        console.log("Transaction successful", res.data.transaction);
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
      <ChooseAccount />
      <GetProfileInput setToAccountId={setToAccountId} />
      <Input
        id="amount"
        type="number"
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
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={createTransaction}
        disabled={loading}
      >
        {loading ? "Processing..." : "Гүйлгээ хийх"}
      </Button>
    </div>
  );
};

export default Page;
