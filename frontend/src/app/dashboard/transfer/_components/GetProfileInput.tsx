"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/addedAxiosInstance";
import axios from "axios";
import React, { useEffect, useState } from "react";

const GetProfileInput = ({ setToAccountId }: { setToAccountId: (toAccountId: string) => void }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getProfile = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axiosInstance.post("/profile/user", {
        accountNumber,
      });
      if (response.status === 200) {
        const { userProfile, accounts } = response.data.userInfo;
        const fullName = userProfile
          ? `${userProfile.firstName} ${userProfile.lastName}`
          : "No name found";
        setFullName(fullName);
        setToAccountId(accounts[0].id);
      } else {
        console.log("Error fetching user data");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accountNumber.length === 11) {
      getProfile();
    }
  }, [accountNumber]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <label
        htmlFor="accountNumber"
        className="text-sm font-medium text-gray-700"
      >
        Account Number
      </label>
      <Input
        id="accountNumber"
        type="text"
        placeholder="Enter your account number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex gap-2 mt-4">
        <div className="text-gray-800 font-semibold">Full Name:</div>
        <div>{fullName}</div>
      </div>
    </div>
  );
};

export default GetProfileInput;
