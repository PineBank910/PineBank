"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type UserContextType = {
  userId: string | null;
  setUserId: (id: string) => void;
  allAccounts: Array<Account | undefined | null>; // Declare allAccounts as an array
  setAllAccounts: (accounts: Array<Account | undefined | null>) => void; // Setter for allAccounts
};
type Account = {
  accountNumber: string;
  balance: string;
  type: string;
  id: string;
  userId: string;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [allAccounts, setAllAccounts] = useState<
    Array<Account | undefined | null>
  >([]);
  return (
    <UserContext.Provider
      value={{ userId, setUserId, allAccounts, setAllAccounts }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside a UserProvider");
  }
  return context;
};
