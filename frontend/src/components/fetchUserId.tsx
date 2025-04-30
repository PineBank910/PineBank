"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@/context/userContext";

const FetchUserId = () => {
  const { getToken } = useAuth();
  const { setUserId } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getToken();

        const res = await fetch("https://pinebank.onrender.com/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error("Failed to fetch backend user");
          return;
        }

        const data = await res.json();

        if (data.user?.id) {
          setUserId(data.user.id);
          console.log("Fetched real userId:", data.user.id);
        } else {
          console.error("No user id returned from backend");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [getToken, setUserId]);

  return null;
};

export default FetchUserId;
