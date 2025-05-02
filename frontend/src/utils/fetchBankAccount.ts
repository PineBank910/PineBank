import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@/context/userContext";

export const FetchBankAccount = () => {
  const { setAllAccounts } = useUser();
  const { getToken } = useAuth();
  useEffect(() => {
    try {
      const zontix = async () => {
        const token = await getToken();
        const res = await fetch("https://pinebank.onrender.com/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("DATA:", data);
        setAllAccounts(data.user.accounts);
        console.log("All accounts", data.user.accounts);
      };
      zontix();
    } catch (error) {
      console.log(error);
    }
  }, []);
};

export default FetchBankAccount;
