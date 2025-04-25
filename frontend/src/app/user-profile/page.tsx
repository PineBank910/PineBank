"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Cloudinary from "@/components/ui/cloudinaryWidget";
import { profileSchema } from "@/validation/profileSchema";

import { useCurrent } from "@/utils/currentUserContext";

const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [adress, setAdress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adressError, setAdressError] = useState("");
  const [image, setImage] = useState("");
  const { push } = useRouter();
  const { currentUserData, token } = useCurrent();
  const axiosInstance = axios.create({ baseURL: "http://localhost:8000" });
  const handleContinue = () => {
    const result = profileSchema.safeParse({
      firstName,
      lastName,
      phone,
      adress,
      image,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setFirstNameError(fieldErrors.firstName?.[0] || "");
      setLastNameError(fieldErrors.lastName?.[0] || "");
      setPhoneError(fieldErrors.phone?.[0] || "");
      setAdressError(fieldErrors.adress?.[0] || "");

      return false;
    }
    setFirstNameError("");
    setLastNameError("");
    setPhoneError("");
    setAdressError("");

    return true;
  };

  const CreateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = handleContinue();
    if (!isValid) return;

    if (!currentUserData && !token) {
      setError("User is not authenticated. Please log in.");
      return;
    }

    try {
      setLoading(true);

      const profileData = {
        image,
        firstName,
        lastName,
        phone,
        adress,
        userId: currentUserData?.id,
      };

      const res = await axiosInstance.post("users/profile", profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        push("/");
      }
    } catch (err) {
      console.error("Error while creating profile:", err);
      setLoading(false);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong");
      } else {
        setError("Unexpected error occurred");
      }
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

        <form onSubmit={CreateProfile} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Овог</label>
            <Input
              className="w-full"
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
            <label className="block text-sm font-medium mb-1">Нэр</label>
            <Input
              className="w-full"
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
            <label className="block text-sm font-medium mb-1">Хаяг</label>
            <Input
              className="w-full h-[131px]"
              type="text"
              placeholder="Хаягаа оруулна уу"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
            />
            {adressError && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <X className="mr-1 h-4 w-4" />
                {adressError}
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
              onClick={handleContinue}
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
