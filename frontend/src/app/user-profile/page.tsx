"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Cloudinary from "@/components/ui/cloudinaryWidget";
import { profileSchema } from "@/validation/profileSchema";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@/context/userContext";

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { getToken } = useAuth();
  const { userId } = useUser();
  console.log("backend user id", userId);

  const handleContinue = () => {
    const result = profileSchema.safeParse({
      firstName,
      lastName,
      phone,
      address,
      image,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setFirstNameError(fieldErrors.firstName?.[0] || "");
      setLastNameError(fieldErrors.lastName?.[0] || "");
      setPhoneError(fieldErrors.phone?.[0] || "");
      setAddressError(fieldErrors.address?.[0] || "");
      return false;
    }

    setFirstNameError("");
    setLastNameError("");
    setPhoneError("");
    setAddressError("");
    return true;
  };
  const createBankAccount = async () => {
    const token = await getToken();

    if (!token) {
      console.error("No token available");
      return;
    }

    try {
      const response = await fetch("https://pinebank.onrender.com/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          balance: 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to create bank account:", data.error || data);
        return;
      }
      if (data.success) {
        console.log("Bank account created successfully:", data.account);
      } else {
        console.error("Failed to create bank account:", data.error || data);
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const createProfile = async (userProfile: {
    image: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
  }) => {
    const token = await getToken();

    if (!token) {
      console.error("No token available");
      return;
    }

    const response = await fetch("http://localhost:8000/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...userProfile, userId }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Profile created:", data);
    } else {
      console.error("Failed to create profile:", data);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = handleContinue();
    if (!isValid) return;

    try {
      setLoading(true);

      await createProfile({
        image,
        firstName,
        lastName,
        phone,
        address,
      });
      await createBankAccount();

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white px-4 overflow-hidden">
      <BackgroundBeams className="absolute inset-0 z-0" />

      <div className="relative z-10 w-full max-w-xl shadow-md rounded-lg p-8 backdrop-blur-md bg-white ">
        <h3 className="text-2xl font-semibold text-center mb-8">
          Хэрэглэгч үүсгэх хэсэг
        </h3>

        <div className="flex justify-center mb-8">
          <div className="flex justify-center items-center w-40 h-40 rounded-full bg-white mt-6 border-2 border-gray-400 border-dotted relative">
            <Cloudinary image={image} setImage={setImage} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Овог
            </label>
            <Input
              className="w-full text-black"
              type="text"
              placeholder="Овог оруулна уу"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {firstNameError && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <X className="mr-1 h-4 w-4" />
                {firstNameError}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Нэр
            </label>
            <Input
              className="w-full text-black"
              type="text"
              placeholder="Нэр оруулна уу"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {lastNameError && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <X className="mr-1 h-4 w-4" />
                {lastNameError}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black">
              Хаяг
            </label>
            <Input
              className="w-full h-[131px] text-black"
              type="text"
              placeholder="Хаягаа оруулна уу"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {addressError && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <X className="mr-1 h-4 w-4" />
                {addressError}
              </p>
            )}
          </div>
          <div className="relative">
            <span className="absolute start-0 bottom-3 text-gray-500 dark:text-gray-400">
              <svg
                className="w-4 h-4 rtl:rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 19 18"
              >
                <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
              </svg>
            </span>

            <input
              type="tel"
              id="floating-phone-number"
              className="block py-2.5 pl-6 pr-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            />

            <label
              htmlFor="floating-phone-number"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:pl-6 peer-focus:pl-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Утасны дугаар
            </label>
          </div>

          {phoneError && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <X className="mr-1 h-4 w-4" />
              {phoneError}
            </p>
          )}

          <div className="flex justify-center">
            <Button
              className="w-[246px] h-[40px] mt-2"
              type="submit"
              disabled={loading}
            >
              Continue
            </Button>
          </div>

          {loading && (
            <p className="text-center text-sm text-gray-500 mt-2">...loading</p>
          )}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Page;
