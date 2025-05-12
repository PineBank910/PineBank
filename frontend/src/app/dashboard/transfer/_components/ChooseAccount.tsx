import React, { useContext, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { CurrentUser } from "@/context/currentUserContext";
import { formatNumber } from "@/utils/balanceFormat";
type ChooseAccountProps = {
  selectedAccountId: string;
  setSelectedAccountId: (accountId: string) => void;
};
const ChooseAccount = (props: ChooseAccountProps) => {
  const context = useContext(CurrentUser);
  const currentUserData = context?.currentUserData;
  const { selectedAccountId, setSelectedAccountId } = props;

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
      <SelectTrigger className="w-full flex items-center text-left justify-center min-h-16  border-0 shadow-[0_10px_25px_rgba(0,0,0,0.1)] rounded-lg">
        {selectedAccountId ? (
          <div className="flex justify-between items-center w-full">
            <div className="flex flex-col justify-between w-full">
              <div className="text-sm font-semibold">ХАРИЛЦАХ/PINE</div>

              <span className="text-sm font-semibold text-gray-500 block">
                MN{" "}
                {
                  accounts.find((acc) => acc.id === selectedAccountId)
                    ?.accountNumber
                }
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-500 block">
              {formatNumber(
                Number(
                  accounts.find((acc) => acc.id === selectedAccountId)?.balance
                ) || 0
              )}{" "}
              MNT
            </span>
          </div>
        ) : (
          <span className="text-gray-400">Данс сонгоно уу</span>
        )}
      </SelectTrigger>

      <SelectContent className="max-h-[500px]">
        <SelectGroup>
          <SelectLabel className="ml-5.5 uppercase">Данс</SelectLabel>
          {accounts.map((account) => (
            <SelectItem
              className="h-16 py-4 flex justify-center"
              key={account.id}
              value={account.id}
            >
              <div className="flex flex-col gap-2">
                <div className="text-sm font-semibold">ХАРИЛЦАХ/PINE</div>
                <div className="flex justify-between w-[650px]">
                  <span className="text-sm font-semibold text-gray-500 block">
                    {account.accountNumber}
                  </span>
                  <span className="text-sm font-semibold text-gray-500 block">
                    {formatNumber(Number(account?.balance || 0))} MNT
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ChooseAccount;
