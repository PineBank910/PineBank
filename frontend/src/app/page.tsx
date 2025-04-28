
"use client";
import { redirect } from "next/navigation";
import DarkModeToggle from "@/components/darkmode";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useSession,
} from "@clerk/nextjs";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function Home() {
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
redirect(`/home`);
  return (
    <>
      <header className="w-full h-14 flex bg-amber-500 dark:bg-blue-600">
        <DarkModeToggle />
        <p>Example text to check font</p>
      </header>
      <div className="w-full">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </>
  );

}
