"use client";

import { User } from "@/app/types";
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type CurrentUserProps = {
  currentUserData?: User;
  setCurrentUserData: (user: User) => void;
  error?: string;
  token: string | null;
};

export const CurrentUser = createContext<CurrentUserProps | null>(null);

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUserData, setCurrentUserData] = useState<User | undefined>();
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedToken = localStorage.getItem("authorization");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (e) {
        console.error("Failed to get token from localStorage", e);
      }
    }
  }, []);

  const axiosInstance = axios.create({
    baseURL: "https://pinebank.onrender.com",
  });

  const getUserData = async () => {
    if (!token) return;
    try {
      const response = await axiosInstance.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUserData(response.data.user);
    } catch (err) {
      console.error("Error fetching user data:", err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message || "Unknown error");
      }
    }
  };

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <CurrentUser.Provider
      value={{ error, token, currentUserData, setCurrentUserData }}>
      {children}
    </CurrentUser.Provider>
  );
};

export const useCurrent = (): CurrentUserProps => {
  const context = useContext(CurrentUser);
  if (!context) {
    throw new Error("useCurrent must be used within a CurrentUserProvider");
  }
  return context;
};
