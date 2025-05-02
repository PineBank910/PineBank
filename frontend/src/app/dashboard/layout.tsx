"use client";
import FetchBankAccount from "@/utils/fetchBankAccount";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import DarkModeToggle from "@/components/dashboard/darkmode";
import NotificationBell from "@/components/dashboard/notificationBell";
import {
  Menu,
  House,
  Search,
  ArrowRightLeft,
  Settings,
  UserRound,
  Send,
} from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";
// import { join } from "path";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  FetchBankAccount();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedSidebar, setSelectedSidebar] = useState("Dashboard");
  ///////
  const sidebarRef = useRef<HTMLDivElement>(null);
  ///////

  // Handle click outside for mobile sidebar
  React.useEffect(() => {
    if (!isSidebarOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);
  //////////////
  return (
    <>
      <section className="flex relative">
        {isSidebarOpen && (
          <div
            id="SIDEBAR"
            className="hidden md:block md:w-[10rem] md:min-w-[10rem] lg:w-[15rem] lg:min-w-[15rem] min-h-screen bg-white dark:bg-gray-800 border-r">
            <div className="w-full h-21 text-2xl sm:text-3xl lg:text-4xl font-bold text-center mt-4">
              Pinebank
            </div>
            <div className="w-full">
              <div
                onClick={() => {
                  setSelectedSidebar("Dashboard");
                  router.push("/dashboard");
                }}
                className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
                  ${selectedSidebar === "Dashboard" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
                `}>
                <House /> Dashboard
              </div>
              <div
                onClick={() => {
                  setSelectedSidebar("Transfer");
                  router.push("/dashboard/transfer");
                }}
                className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
                  ${selectedSidebar === "Transfer" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
                `}>
                <Send /> Transfer
              </div>
              <div
                onClick={() => {
                  setSelectedSidebar("Transactions");
                  router.push("/dashboard/transactions");
                }}
                className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
                  ${selectedSidebar === "Transactions" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
                `}>
                <ArrowRightLeft /> Transactions
              </div>
              <div
                onClick={() => {
                  setSelectedSidebar("Accounts");
                  router.push("/dashboard/accounts");
                }}
                className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
                  ${selectedSidebar === "Accounts" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
                `}>
                <UserRound /> Accounts
              </div>
              <div
                onClick={() => {
                  setSelectedSidebar("Settings");
                  router.push("/dashboard/settings");
                }}
                className={`flex h-15 items-center pl-4 gap-4 rounded-3xl cursor-pointer transition
                  ${selectedSidebar === "Settings" ? "text-blue-600  dark:hover:bg-gray-700 hover:bg-gray-100" : "dark:hover:bg-gray-700 hover:bg-gray-100"}
                `}>
                <Settings /> Settings
              </div>
            </div>
          </div>
        )}

        <div className="w-full">
          <header className="flex items-center justify-between border-b h-24 w-full">
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="focus:outline-none ml-4 md:hidden"
              aria-label="Toggle sidebar">
              <Menu size={50} />
            </button>
            <div className="flex flex-col justify-between items-center sm:flex-row w-full">
              <div className="sm:text-4xl text-3xl md:ml-4  lg:ml-8 text-[#343C6A]">
                {selectedSidebar}
              </div>

              <div className="flex gap-4 md:gap-7 items-center mr-8">
                <div className="hidden  md:flex dark:bg-gray-900 items-center gap-4 pl-6 p-1 sm:w-[8rem] md:w-[13rem] lg:w-[20rem]  h-[3rem] bg-[#F5F7FA] rounded-4xl">
                  <Search color="#718EBF" />
                  <input
                    className="placeholder-[#718EBF] w-full focus:outline-0 dark:text-blue-500 "
                    placeholder="Search ..."
                  />
                </div>
                <DarkModeToggle />
                <NotificationBell />
                <SignedOut>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    <SignInButton />
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                    <SignUpButton />
                  </button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>

          <div className="md:hidden flex items-center gap-4 pl-5 p-1 w-auto h-[3rem] bg-[#F5F7FA] rounded-4xl mt-5 mx-4">
            <Search color="#718EBF" />
            <input
              className="placeholder-[#718EBF] w-full focus:outline-0 dark:text-black"
              placeholder="Search ..."
            />
          </div>
          {/* DASHBOARDS CONTENT FROM HERE */}
          {children}
        </div>
      </section>
    </>
  );
}
