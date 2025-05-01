"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import Cloudinary from "@/components/ui/cloudinaryWidget"; // Cloudinary widget for uploading image
import { profileSchema } from "@/validation/profileSchema"; // Your schema validation for form
import { useAuth } from "@clerk/nextjs"; // For auth token
import { useUser } from "@/context/userContext"; // For getting userId from context
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Tab UI components

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
  const { userId } = useUser();
  const router = useRouter();
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
      console.log("Sending profile update data:", profileData); // Debugging log

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
          body: JSON.stringify(profileData), // Correct body data
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Profile updated successfully.");
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

  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center px-4 py-8">
      <div className="relative z-10 w-full max-w-3xl shadow-md rounded-lg p-6 bg-white backdrop-blur-md">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="w-40 h-40 rounded-full bg-white border-2 border-gray-400 border-dotted flex items-center justify-center relative">
                  <Cloudinary image={image} setImage={setImage} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-black">
                  Овог
                </label>
                <Input
                  disabled
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
                  disabled
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
                <input
                  type="tel"
                  id="floating-phone-number"
                  className="block py-2.5 pl-6 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                />
                <label
                  htmlFor="floating-phone-number"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:pl-6 peer-focus:pl-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                  Хадгалах
                </Button>
              </div>

              {loading && (
                <p className="text-center text-sm text-gray-500 mt-2">
                  ...loading
                </p>
              )}
              {error && (
                <p className="text-red-500 text-center mt-4">{error}</p>
              )}
            </form>
          </TabsContent>

          <TabsContent value="security">
            <p className="text-gray-600">Security tab content goes here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
