import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

const createBankAccount = async (getToken: () => Promise<string | null>) => {
  const token = await getToken();

  if (!token) {
    console.error("No token found.");
    return false;
  }

  try {
    const response = await fetch("https://pinebank.onrender.com/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        balance: 10000,
      }),
    });

    if (!response.ok) {
      console.error("Failed to create account:", response);
      return false;
    }

    console.log("Account created successfully!");
    return true;
  } catch (error) {
    console.error("Error creating account:", error);
    return false;
  }
};

export function DialogDemo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const { getToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSuccess(null);
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  const handleCreateAccount = async (accountType: string) => {
    setLoading(true);
    setSuccess(null);

    try {
      const isSuccess = await createBankAccount(getToken);

      if (isSuccess) {
        setSuccess(true);
        console.log(`${accountType} account created`);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch (err) {
      setError("Failed to create account. Please try again.");
      console.error("Error creating account:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus /> Шинэ данс нээх
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 p-4">
            <div className="w-full h-6 bg-gray-300 rounded-md animate-pulse"></div>{" "}
            <div className="w-full h-4 bg-gray-300 rounded-md animate-pulse mt-2"></div>{" "}
            <div className="w-full h-12 bg-gray-300 rounded-md animate-pulse mt-4"></div>{" "}
            <div className="w-full h-12 bg-gray-300 rounded-md animate-pulse mt-4"></div>{" "}
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex justify-center text-sm uppercase">
                Дансны төрөл сонгоно уу
              </DialogTitle>
              <DialogDescription className="flex justify-center text-center text-xs">
                Данс нээх онлайн гэрээ таны бүртгэлтэй и-мэйл хаяг руу илгээгдэх
                тул и-мэйл хаягаа тохиргоо цэсээр орж зөв эсэхийг шалгана уу.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {success === true ? (
                <div className="text-center font-bold text-green-500">
                  <p>Данс амжилттай нээгдлээ</p>
                </div>
              ) : error ? (
                <div className="text-center text-red-500">
                  <p>{error}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-5">
                  <button
                    className="bg-blue-950 text-white flex items-center justify-center border-t shadow-xl dark:text-gray-200 dark:border-gray-200  px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 transition duration-500 w-[262px]"
                    onClick={() => handleCreateAccount("BUSINESS")}
                    disabled={loading}>
                    Харилцах данс
                  </button>
                  {/* <button
                    className="flex items-center justify-center border-t shadow-xl text-gray-800 dark:border-gray-200 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 transition duration-500 w-[262px]"
                    onClick={() => handleCreateAccount("SAVINGS")}
                    disabled={loading}>
                    Хугацаагүй хадгаламж
                  </button> */}
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
