import React, { useContext, useEffect } from "react";

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

type ChooseAccountProps = {
  selectedAccountId: string;
  setSelectedAccountId: (accountId: string) => void;
};
const ChooseAccount = (props:ChooseAccountProps) => {
  const context = useContext(CurrentUser);
  const currentUserData = context?.currentUserData;
  const {selectedAccountId, setSelectedAccountId} = props

  useEffect(() => {
    if (
      currentUserData &&
      Array.isArray(currentUserData.accounts) &&
      currentUserData.accounts.length > 0
    ) {
      setSelectedAccountId(currentUserData.accounts[0].id);
    }
  }, [currentUserData]);

  if (!context || !context.currentUserData) {
    return <div>...Loading</div>;
  }

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
                {/* <span>{account.balance}</span> */}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ChooseAccount;
