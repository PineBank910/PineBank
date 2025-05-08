"use client";

import React, { useState, useEffect, useContext } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import CloudinaryUploader from "@/components/ui/cloudninaryUploader";
import { profileSchema } from "@/validation/profileSchema";
import { useAuth } from "@clerk/nextjs";
import { useUser as useClerkUser } from "@clerk/nextjs";
import { useUser as useAppUser } from "@/context/userContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "react-toastify";
//////////
import { CurrentUser } from "@/lib/currentUserContext";
//////////
const ProfilePage = () => {
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
  const { getToken } = useAuth();
  const router = useRouter();
  const { user } = useClerkUser();
  const { userId } = useAppUser();
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = await getToken();

        const response = await fetch("https://pinebank.onrender.com/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileId(data.user.userProfile.id);
          setFirstName(data.user.userProfile.firstName);
          setLastName(data.user.userProfile.lastName);
          setPhone(data.user.userProfile.phone);
          setAddress(data.user.userProfile.address);
          setImage(data.user.userProfile.image);
        } else {
          setError("Failed to fetch profile data.");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to fetch profile data.");
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [getToken, userId]);

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

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = handleContinue();
    if (!isValid) return;

    try {
      setLoading(true);
      const token = await getToken();
      if (!token) {
        setError("No token available");
        return;
      }

      const profileData = { phone, address, image };
      console.log("Sending profile update data:", profileData);

      if (!profileId) {
        setError("Profile ID is missing.");
        return;
      }

      const response = await fetch(
        `https://pinebank.onrender.com/profile/${profileId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profileData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast("🅿 Амжилттай", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        router.push("/dashboard");
      } else {
        setError(data.message || "An error occurred while updating profile.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  // Transaction password functions from here //////////////////////////

  const context = useContext(CurrentUser);
  const currentUserData = context?.currentUserData;
  const currentTransactionPassword = currentUserData?.transactionPassword;
  console.log("Current:", currentTransactionPassword);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [validatingError, setValidatingError] = useState(
    "Password must contain at least one number and one symbol."
  );
  const [matchingError, setMatchingError] = useState("Passwords do not match.");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const validatePassword = (password: string): boolean => {
    // Regex to check for at least one number and one capital letter and 8-16 characters
    const regex: RegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()\-_=+]{8,20}$/;
    if (!regex.test(password)) {
      setValidatingError(
        "Password must contain at least one number and 8-20 characters."
      );
      return false;
    }
    setValidatingError("");
    return true;
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = (e.target as HTMLInputElement).value;
    setPassword(value);
    if (value) {
      validatePassword(value);
    } else {
      setValidatingError("");
    }
    if (value !== confirmPassword) {
      setMatchingError("Passwords do not match.");
    } else {
      setMatchingError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setMatchingError("Passwords do not match.");
    } else {
      setMatchingError("");
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      document.getElementById("submitButton")?.click();
    }
  };
  return (
    <div className="relative min-h-screen flex flex-col items-center px-4 py-8 bg-gray-100 dark:bg-gray-950">
      <div className="relative z-10 w-full max-w-3xl shadow-md rounded-lg p-6 bg-white dark:bg-gray-900 backdrop-blur-md">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Тохиргоо</TabsTrigger>
            <TabsTrigger value="transactionPassword">
              Гүйлгээний нууц үг
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactionPassword">
            <div className="">
              <div>Гүйлгээний нууц үг өөрчлөх</div>
              <div className="w-full flex flex-col gap-6">
                <div className="login-top">
                  Create a strong password
                  <br />
                  <span className="login-mid">
                    Create a strong password with letters and numbers.
                  </span>
                </div>
                <input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  className={`rounded-md w-1/2 border h-[2.25rem] pl-3 ${
                    validatingError
                      ? "border-[#ef4444] border-opacity-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Password"
                  onChange={(e) => {
                    handlePasswordChange(e);
                  }}
                  value={password}
                />
                <input
                  id="checkpassword"
                  className={`rounded-md w-1/2 border h-[2.25rem] pl-3 ${
                    matchingError
                      ? "border-[#ef4444] border-opacity-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Confirm"
                  type={isPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onKeyDown={handleKeyDown}
                />
                {validatingError && (
                  <p className="login-warning">{validatingError}</p>
                )}
                {matchingError && (
                  <p className="login-warning">{matchingError}</p>
                )}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={(e) => setIsPasswordVisible(e.target.checked)}
                  />
                  <span className="ml-2">Show password</span>
                </div>
                <div>
                  <button
                    id="submitButton"
                    disabled={!isPasswordValid}
                    className="w-full  bg-[#18181B] text-[#fafafa] rounded-md h-[2.25rem]"
                    style={{
                      opacity: isPasswordValid ? 1 : 0.2,
                      cursor: isPasswordValid ? "pointer" : "not-allowed",
                    }}>
                    Let&apos;s go
                  </button>
                </div>
                <div className="inline-block">
                  Already have an account?
                  <span className="text-[#2563EB] cursor-pointer inline-block p-2">
                    Log in
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="profile">
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="flex justify-start gap-5 mb-6">
                <CloudinaryUploader image={image} setImage={setImage} />
              </div>

              <div className="text-black dark:text-white">
                Welcome, {user?.username}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-black dark:text-white">
                  Овог
                </label>
                <Input
                  disabled
                  className="w-full text-black dark:text-white bg-transparent border dark:border-gray-700"
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
                <label className="block text-sm font-medium mb-1 text-black dark:text-white">
                  Нэр
                </label>
                <Input
                  disabled
                  className="w-full text-black dark:text-white bg-transparent border dark:border-gray-700"
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
                <label className="block text-sm font-medium mb-1 text-black dark:text-white">
                  Хаяг
                </label>
                <textarea
                  className="w-full text-black dark:text-white bg-transparent border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:border-gray-700"
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
                <input
                  type="tel"
                  id="floating-phone-number"
                  className="block py-2.5 pl-6 w-full text-sm text-black dark:text-white bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                />
                <label
                  htmlFor="floating-phone-number"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:pl-6 peer-focus:pl-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
                  disabled={loading}>
                  Хадгалах
                </Button>
              </div>

              {loading && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                  ...loading
                </p>
              )}
              {error && (
                <p className="text-red-500 text-center mt-4">{error}</p>
              )}
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
