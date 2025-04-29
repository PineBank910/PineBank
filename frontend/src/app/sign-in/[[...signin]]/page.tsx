"use client";

import { SignIn } from "@clerk/nextjs";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSession } from "@clerk/nextjs";
const LoginPage = () => {
  const { session, isLoaded } = useSession();

  useEffect(() => {
    console.log("Session Loaded: ", isLoaded);
    console.log("Session: ", session);
    const storeToken = async () => {
      if (isLoaded && session) {
        try {
          const token = await session.getToken();
          if (token) {
            console.log("Token retrieved:", token);
            Cookies.set("token", token, {
              expires: new Date(Date.now() + 10 * 60 * 1000),
              path: "/",
              sameSite: "strict",
            });
          } else {
            console.error("No token returned from session.");
          }
        } catch (error) {
          console.error("Error storing token:", error);
        }
      }
    };
    storeToken();
  }, [session, isLoaded]);

  const token = Cookies.get("token");
  if (!token) {
    console.error("Token not found in cookies.");
  }

  useEffect(() => {
    if (isLoaded && !session) {
      Cookies.remove("token", { path: "/" });
    }
  }, [session, isLoaded]);
  return (
    <>
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex items-center justify-center min-h-screen">
          <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
