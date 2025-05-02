import React, { useContext, useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrentUser } from "@/utils/currentUserContext";

const ChooseAccount = () => {
  const { currentUserData } = useContext(CurrentUser);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  useEffect(() => {
    if (currentUserData?.accounts?.length > 0) {
      setSelectedAccountId(currentUserData.accounts[0].id); // ✅ Default to first account
    }
  }, [currentUserData]);

  if (!currentUserData) {
    return <div>...Loading</div>;
  }

  const { accounts } = currentUserData;

  if (!accounts || accounts.length === 0) {
    return <div>No accounts available</div>;
  }

  return (
    <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an account" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          <SelectLabel>Данс</SelectLabel>
          {accounts.map((account) => (
            <SelectItem key={account.id} value={account.id}>
              <div className="flex justify-between w-full">
                <span>{account.accountNumber}</span>
                <span>{account.balance}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ChooseAccount;
