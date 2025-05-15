export type ProfileDetail = {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  phone: number;
};

export type UserContextProps = {
  token: string | null;
  userId: number | null;
  setToken: (token: string | null) => void;
  setUserId: (id: number | null) => void;
};

export type Accounts = {
  accountNumber: string;
  balance: number;
  type: string;
  id: string;
  userId: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  profile?: ProfileDetail;
  accounts?: Accounts[] | [];
  transactionPassword?: string;
  userProfile: string;
};

export type TransactionType = {
  id: string;
  timestamp: string;
  type: "DEBIT" | "CREDIT";
  amount: number;
  reference: string;
  runningBalance: number;
  fromAccountId: string;
  toAccountId: string;
};
