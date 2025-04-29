"use client";
import React from "react";
import DarkModeToggle from "@/components/darkmode";
import { Menu, House } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <>
      <section className="flex relative">
        {isSidebarOpen && (
          <div
            id="SIDEBAR"
            className="w-[15rem] min-w-[15rem] h-screen bg-amber-500 z-20 fixed left-0 top-0">
            <div className="w-full h-12 text-2xl font-bold">Pinebank</div>
            <div className="w-full">
              <div className="flex h-10 items-center">
                <House /> Dashboard
              </div>
              <div className="flex h-10 items-center">Transactions</div>
              <div>Accounts</div>
              <div>Settings</div>
            </div>
          </div>
        )}

        <header
          className={`w-full mt-4 ${isSidebarOpen ? "opacity-50 " : "opacity-100"}`}>
          <div className="flex items-center justify-between border-b">
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="focus:outline-none ml-4"
              aria-label="Toggle sidebar">
              <Menu size={50} />
            </button>

            <div className="text-2xl md:text-3xl">Dashboard</div>
            <div className="flex gap-7 items-center mr-4">
              <DarkModeToggle />
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

          <div className="w-full bg-blue-400 h-12 mt-5 mb-5">
            Search bar gsh
          </div>
        </header>
      </section>
    </>
  );
};
export default Dashboard;
