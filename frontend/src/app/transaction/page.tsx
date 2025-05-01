"use client";

import { axiosInstance } from "@/lib/addedAxiosInstance";
import axios from "axios";
import React, { useContext, useState } from "react";
import GetProfileInput from "./_components/GetProfileInput";
import { Button } from "react-scroll";
import { Input } from "@/components/ui/input";
import { CurrentUser } from "@/utils/currentUserContext";

const Page = () => {
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toAccountId, setToAccountId] = useState<[] | null>(null);
  // const [response, setResponse] = useState<{} | any>({});
  const { currentUserData} = useContext(CurrentUser);
  if(!currentUserData){
    return <div className="">...Loading</div>
  }
  const {accounts} = currentUserData;

  const createTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUserData) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const transaction = {
        fromAccountId: accounts[0].id,
        toAccountId,
        amount,
        reference,
      };

      const res = await axiosInstance.post("/transaction", { transaction });

      if (res.status === 200) {
        const { transaction } = res.data;
        // setResponse(transaction);
        console.log("Transaction successful", transaction);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-3xl font-bold">Transaction Page</h2>
        <p className="text-gray-500">This is the transaction page.</p>
        <GetProfileInput setToAccountId={setToAccountId} />
      </div>
      <form onSubmit={createTransaction} className="flex flex-col space-y-4">
        <Input
          id="amount"
          type="text"
          placeholder="Enter the amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          id="reference"
          type="text"
          placeholder="Enter your reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded z-30">
          Гүйлгээ хийх
        </Button>
      </form>
    </div>
  );
};

export default Page;
