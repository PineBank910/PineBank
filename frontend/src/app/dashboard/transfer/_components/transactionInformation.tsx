import { axiosInstance } from "@/lib/addedAxiosInstance";
import { CurrentUser } from "@/utils/currentUserContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

const Transaction = (selectedAccountId:string) => {
  const [transactionInfo, setTransactionInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const context = useContext(CurrentUser);
  const currentUserData = context?.currentUserData;

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

  const accountNumber = accounts.find((account) => account.id === selectedAccountId)?.accountNumber;
  const getTransactionInfo = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/users/transaction", {accountNumber});
      console.log("Transaction data:", response.data);       
      setTransactionInfo(response.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="px-6 py-2 border-b ">
        <div className="flex items-center justify-between">
          <div></div>
          <div className="text-[1.5rem]">₮</div>
        </div>
        <div className="flex">
          <div>Үлдэгдэл: </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  );
};
export default Transaction;
