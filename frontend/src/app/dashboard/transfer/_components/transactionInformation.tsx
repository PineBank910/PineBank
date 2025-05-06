import { axiosInstance } from "@/lib/addedAxiosInstance";
import { CurrentUser } from "@/utils/currentUserContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

type Props = {
  selectedAccountId: string;
};

const Transaction = ({ selectedAccountId }: Props) => {
  const [transactionInfo, setTransactionInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const context = useContext(CurrentUser);
  const currentUserData = context?.currentUserData;

  useEffect(() => {
    const getTransactionInfo = async () => {
      if (!currentUserData) return;
      console.log("Current user data:", currentUserData);
      const accountNumber = currentUserData.accounts.find(
        (account) => account.id === selectedAccountId
      )?.accountNumber;
      if (!accountNumber) {
        setError("Account not found.");
        return;
      }
      console.log("Current account", accountNumber);
      setLoading(true);
      try {
        const response = await axiosInstance.post("users/transaction", {
          accountNumber,
        });
        console.log("Transaction data:", response.data);
        setTransactionInfo(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message || "Unknown error");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    getTransactionInfo();
  }, [selectedAccountId, currentUserData]);

  return (
    <div className="px-6 py-2 border-b">
      {loading && <p>Loading transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && transactionInfo.length > 0 && (
        <div>
          {/* You can map transactionInfo here */}
          {transactionInfo.map((tx: any, index: number) => (
            <div key={index}>
              <div className="flex items-center justify-between">
                <div></div>
                <div className="text-[1.5rem]">₮</div>
              </div>
              <div className="flex">
                <div>Үлдэгдэл: </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transaction;
